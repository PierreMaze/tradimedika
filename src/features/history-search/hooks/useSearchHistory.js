// hooks/useSearchHistory.js
import { useCallback } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useCookieConsent } from "../../cookie-consent";
import { normalizeForMatching } from "../../product-search/utils/normalize";
import { createLogger } from "../../../utils/logger";

const logger = createLogger("useSearchHistory");

// Constantes
const STORAGE_KEY = "tradimedika-search-history";
const MAX_HISTORY_ENTRIES = 10;

/**
 * Génère un ID unique pour une entrée d'historique
 * @returns {string} ID unique
 */
const generateId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
};

/**
 * Compare deux tableaux de produits pour détecter les doublons
 * - Insensible à l'ordre
 * - Insensible aux accents
 *
 * @param {string[]} products1
 * @param {string[]} products2
 * @returns {boolean}
 */
const areProductsEqual = (products1, products2) => {
  if (!Array.isArray(products1) || !Array.isArray(products2)) {
    return false;
  }

  if (products1.length !== products2.length) {
    return false;
  }

  const normalized1 = products1.map((s) => normalizeForMatching(s)).sort();
  const normalized2 = products2.map((s) => normalizeForMatching(s)).sort();

  return normalized1.every((product, index) => product === normalized2[index]);
};

/**
 * Valide une entrée d'historique
 * Rétrocompatible : accepte aussi bien `products` que `symptoms`
 * @param {Object} entry
 * @returns {boolean}
 */
const isValidEntry = (entry) => {
  const products = entry?.products ?? entry?.symptoms;
  return (
    entry &&
    typeof entry === "object" &&
    typeof entry.id === "string" &&
    Array.isArray(products) &&
    products.length > 0 &&
    typeof entry.timestamp === "number"
  );
};

/**
 * Extrait les produits d'une entrée d'historique (rétrocompatible)
 * @param {Object} entry
 * @returns {string[]}
 */
const getEntryProducts = (entry) => entry?.products ?? entry?.symptoms ?? [];

/**
 * Hook personnalisé pour gérer l'historique de recherche
 *
 * Structure de données :
 * {
 *   id: "1735123456789-abc123",
 *   products: ["Citron", "Lavande"],
 *   timestamp: 1735123456789,
 *   resultCount: 2,
 * }
 *
 * @returns {Object} { history, addSearch, removeSearch, clearHistory }
 */
export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage(STORAGE_KEY, []);
  const { isHistoryAccepted } = useCookieConsent();

  /**
   * Ajoute une nouvelle recherche à l'historique
   * @param {string[]} products - Tableau de produits recherchés
   * @param {number} [resultCount] - Nombre de résultats trouvés
   */
  const addSearch = useCallback(
    (products, resultCount) => {
      if (!isHistoryAccepted) {
        logger.debug("History disabled - consent not given");
        return;
      }

      if (!Array.isArray(products) || products.length === 0) {
        logger.warn("addSearch: products must be a non-empty array");
        return;
      }

      try {
        setHistory((prevHistory) => {
          const validHistory = Array.isArray(prevHistory)
            ? prevHistory.filter(isValidEntry)
            : [];

          // Vérifier si cette recherche existe déjà (rétrocompatible)
          const existingIndex = validHistory.findIndex((entry) =>
            areProductsEqual(getEntryProducts(entry), products),
          );

          let newHistory;

          if (existingIndex !== -1) {
            const existingEntry = validHistory[existingIndex];
            const updatedEntry = {
              ...existingEntry,
              products: [...products],
              timestamp: Date.now(),
              resultCount: resultCount ?? existingEntry.resultCount,
            };
            // Supprimer l'ancien champ symptoms si présent
            delete updatedEntry.symptoms;

            newHistory = [
              updatedEntry,
              ...validHistory.filter((_, index) => index !== existingIndex),
            ];

            logger.info("Search already exists, moved to top:", products);
          } else {
            const newEntry = {
              id: generateId(),
              products: [...products],
              timestamp: Date.now(),
              resultCount: resultCount ?? 0,
            };

            newHistory = [newEntry, ...validHistory];

            logger.info("New search added to history:", products);
          }

          if (newHistory.length > MAX_HISTORY_ENTRIES) {
            newHistory = newHistory.slice(0, MAX_HISTORY_ENTRIES);
          }

          return newHistory;
        });
      } catch (error) {
        logger.error("Error adding search to history:", error);
      }
    },
    [setHistory, isHistoryAccepted],
  );

  /**
   * Supprime une recherche spécifique par son ID
   * @param {string} id
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
   * Efface tout l'historique
   */
  const clearHistory = useCallback(() => {
    try {
      setHistory([]);
      logger.info("History cleared");
    } catch (error) {
      logger.error("Error clearing history:", error);
    }
  }, [setHistory]);

  // Normaliser les entrées : migrer symptoms → products pour rétrocompatibilité
  const validHistory = Array.isArray(history)
    ? history.filter(isValidEntry).map((entry) => ({
        ...entry,
        products: getEntryProducts(entry),
      }))
    : [];

  return {
    history: validHistory,
    addSearch,
    removeSearch,
    clearHistory,
  };
}
