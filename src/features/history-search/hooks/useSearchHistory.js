// hooks/useSearchHistory.js
import { useCallback } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { normalizeForMatching } from "../../../utils/normalizeSymptom";
import { createLogger } from "../../../utils/logger";

const logger = createLogger("useSearchHistory");

// Constantes
const STORAGE_KEY = "tradimedika-search-history";
const MAX_HISTORY_ENTRIES = 10;

/**
 * Génère un ID unique pour une entrée d'historique
 * Format : timestamp-randomString
 * @returns {string} ID unique
 */
const generateId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
};

/**
 * Compare deux tableaux de symptômes pour détecter les doublons
 * - Insensible à l'ordre : ["stress", "fatigue"] === ["fatigue", "stress"]
 * - Insensible aux accents : "diarrhée" === "diarrhee"
 * - Normalisation via normalizeForMatching()
 *
 * @param {string[]} symptoms1 - Premier tableau de symptômes
 * @param {string[]} symptoms2 - Deuxième tableau de symptômes
 * @returns {boolean} true si les tableaux contiennent les mêmes symptômes
 */
const areSymptomsEqual = (symptoms1, symptoms2) => {
  if (!Array.isArray(symptoms1) || !Array.isArray(symptoms2)) {
    return false;
  }

  if (symptoms1.length !== symptoms2.length) {
    return false;
  }

  // Normaliser et trier pour comparaison
  const normalized1 = symptoms1.map((s) => normalizeForMatching(s)).sort();
  const normalized2 = symptoms2.map((s) => normalizeForMatching(s)).sort();

  return normalized1.every((symptom, index) => symptom === normalized2[index]);
};

/**
 * Valide une entrée d'historique
 * @param {Object} entry - Entrée à valider
 * @returns {boolean} true si l'entrée est valide
 */
const isValidEntry = (entry) => {
  return (
    entry &&
    typeof entry === "object" &&
    typeof entry.id === "string" &&
    Array.isArray(entry.symptoms) &&
    entry.symptoms.length > 0 &&
    typeof entry.timestamp === "number"
  );
};

/**
 * Hook personnalisé pour gérer l'historique de recherche
 *
 * Fonctionnalités :
 * - Stockage dans localStorage avec clé "tradimedika-search-history"
 * - Limite de 10 entrées maximum (FIFO si dépassement)
 * - Déduplication intelligente (insensible à l'ordre et aux accents)
 * - Suppression individuelle et effacement complet
 * - Tri chronologique (plus récent en premier)
 *
 * Structure de données :
 * {
 *   id: "1735123456789-abc123",      // timestamp-random
 *   symptoms: ["fatigue", "stress"],  // Array normalisés (avec accents)
 *   timestamp: 1735123456789,         // Date.now()
 *   resultCount: 5,                   // Nombre de résultats (optionnel)
 *   filteredCount: 2,                 // Nombre de remèdes masqués (optionnel)
 *   allergies: ["citrus", "pollen"]   // IDs d'allergènes (optionnel)
 * }
 *
 * @returns {Object} { history, addSearch, removeSearch, clearHistory }
 */
export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEY, []);

  /**
   * Ajoute une nouvelle recherche à l'historique
   * - Si la recherche existe déjà, elle est remontée au top avec nouveau timestamp
   * - Si la limite est atteinte, la plus ancienne entrée est supprimée (FIFO)
   * - Les symptômes doivent être un tableau non vide
   *
   * @param {string[]} symptoms - Tableau de symptômes recherchés
   * @param {number} [resultCount] - Nombre de résultats trouvés (optionnel)
   * @param {string[]} [allergies] - Tableau d'IDs d'allergènes (optionnel)
   * @param {number} [filteredCount] - Nombre de remèdes masqués par filtrage (optionnel)
   */
  const addSearch = useCallback(
    (symptoms, resultCount, allergies = [], filteredCount = 0) => {
      logger.debug("🔥 addSearch START", {
        symptoms,
        resultCount,
        allergies,
        filteredCount,
      });

      // Validation
      if (!Array.isArray(symptoms) || symptoms.length === 0) {
        logger.warn("addSearch: symptoms must be a non-empty array");
        return;
      }

      logger.debug("🔥 Validation passed");

      try {
        logger.debug("🔥 About to call setHistory");
        setHistory((prevHistory) => {
          logger.debug("🔥 Inside setHistory callback", { prevHistory });
          // Filtrer les entrées invalides
          const validHistory = Array.isArray(prevHistory)
            ? prevHistory.filter(isValidEntry)
            : [];

          // Vérifier si cette recherche existe déjà
          const existingIndex = validHistory.findIndex((entry) =>
            areSymptomsEqual(entry.symptoms, symptoms),
          );

          let newHistory;

          if (existingIndex !== -1) {
            // Recherche existante → la remonter au top avec nouveau timestamp
            const existingEntry = validHistory[existingIndex];
            const updatedEntry = {
              ...existingEntry,
              timestamp: Date.now(),
              resultCount: resultCount ?? existingEntry.resultCount,
              allergies: Array.isArray(allergies) ? allergies : [],
              filteredCount: filteredCount ?? existingEntry.filteredCount ?? 0,
            };

            newHistory = [
              updatedEntry,
              ...validHistory.filter((_, index) => index !== existingIndex),
            ];

            logger.info("Search already exists, moved to top:", symptoms);
          } else {
            // Nouvelle recherche → créer une nouvelle entrée
            const newEntry = {
              id: generateId(),
              symptoms: [...symptoms], // Clone pour éviter mutation
              timestamp: Date.now(),
              resultCount: resultCount ?? 0,
              allergies: Array.isArray(allergies) ? allergies : [],
              filteredCount: filteredCount ?? 0,
            };

            newHistory = [newEntry, ...validHistory];

            logger.info("New search added to history:", symptoms);
          }

          // Limiter à MAX_HISTORY_ENTRIES (FIFO)
          if (newHistory.length > MAX_HISTORY_ENTRIES) {
            newHistory = newHistory.slice(0, MAX_HISTORY_ENTRIES);
            logger.info(`History limited to ${MAX_HISTORY_ENTRIES} entries`);
          }

          return newHistory;
        });
      } catch (error) {
        logger.error("Error adding search to history:", error);
      }
    },
    [setHistory],
  );

  /**
   * Supprime une recherche spécifique de l'historique par son ID
   *
   * @param {string} id - ID de la recherche à supprimer
   */
  const removeSearch = useCallback(
    (id) => {
      if (typeof id !== "string") {
        logger.warn("removeSearch: id must be a string");
        return;
      }

      try {
        setHistory((prevHistory) => {
          const validHistory = Array.isArray(prevHistory)
            ? prevHistory.filter(isValidEntry)
            : [];

          const newHistory = validHistory.filter((entry) => entry.id !== id);

          logger.info("Search removed from history:", id);
          return newHistory;
        });
      } catch (error) {
        logger.error("Error removing search from history:", error);
      }
    },
    [setHistory],
  );

  /**
   * Efface tout l'historique de recherche
   */
  const clearHistory = useCallback(() => {
    try {
      setHistory([]);
      logger.info("History cleared");
    } catch (error) {
      logger.error("Error clearing history:", error);
    }
  }, [setHistory]);

  // S'assurer que history est toujours un tableau valide
  const validHistory = Array.isArray(history)
    ? history.filter(isValidEntry)
    : [];

  return {
    history: validHistory,
    addSearch,
    removeSearch,
    clearHistory,
  };
}
