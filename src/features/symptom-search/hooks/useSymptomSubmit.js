// src/hooks/useSymptomSubmit.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../../data/db.json";
import { findMatchingRemedies } from "../../remedy";
import { createLogger } from "../../../utils/logger";

const logger = createLogger("useSymptomSubmit");

/**
 * Hook personnalisé pour gérer la soumission des symptômes et allergies
 *
 * Fonctionnalités :
 * - Validation (empêche soumission si aucun symptôme)
 * - État de chargement avec délai simulé (300-500ms)
 * - Recherche des remèdes correspondants
 * - Logging structuré des résultats (symptômes + allergies)
 * - Navigation avec query params (symptoms + allergies)
 * - État "Recherche effectuée" pendant 2 secondes
 *
 * @param {Function} addSearch - Fonction pour ajouter une recherche à l'historique (symptoms, resultCount, allergies)
 * @returns {Object} { handleSubmit, isLoading, results, hasSubmitted, error }
 */
export function useSymptomSubmit(addSearch) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Soumet les symptômes et allergies, puis recherche les remèdes correspondants
   * @param {string[]} selectedSymptoms - Symptômes sélectionnés (normalisés)
   * @param {string[]} userAllergies - Allergies sélectionnées (IDs normalisés)
   * @param {boolean} isFilteringEnabled - Si le filtrage des allergies est activé
   */
  const handleSubmit = (
    selectedSymptoms,
    userAllergies = [],
    isFilteringEnabled = false,
  ) => {
    // Validation : empêcher soumission vide
    if (!selectedSymptoms || selectedSymptoms.length === 0) {
      logger.warn("Impossible de soumettre sans symptômes");
      return;
    }

    // Reset les états précédents
    setError(null);
    setIsLoading(true);

    // Simuler un délai de recherche (300-500ms pour UX fluide)
    const delay = Math.floor(Math.random() * 200) + 300; // 300-500ms

    setTimeout(() => {
      try {
        // Rechercher les remèdes correspondants
        const matchingRemedies = findMatchingRemedies(selectedSymptoms, db);

        // Mettre à jour les résultats
        setResults(matchingRemedies);
        setHasSubmitted(true);

        // Ne prendre en compte les allergies que si le filtrage est activé
        const allergiesToSave = isFilteringEnabled ? userAllergies : [];

        // Calculer le nombre de remèdes filtrés (masqués par allergies)
        let filteredCount = 0;
        if (isFilteringEnabled && allergiesToSave.length > 0) {
          filteredCount = matchingRemedies.filter((item) => {
            const remedy = item.remedy;
            if (!remedy || !Array.isArray(remedy.allergens)) return false;
            if (remedy.allergens.length === 0) return false;
            return remedy.allergens.some((allergenId) =>
              allergiesToSave.includes(allergenId),
            );
          }).length;
        }

        // Ajouter à l'historique de recherche (avec allergies si filtrage actif)
        logger.debug("About to call addSearch with:", {
          addSearch: typeof addSearch,
          symptoms: selectedSymptoms,
          allergies: allergiesToSave,
          resultCount: matchingRemedies.length,
          filteredCount,
          isFilteringEnabled,
        });
        if (typeof addSearch === "function") {
          addSearch(
            selectedSymptoms,
            matchingRemedies.length,
            allergiesToSave,
            filteredCount,
          );
        } else {
          logger.error("addSearch is not a function!", addSearch);
        }

        // Navigation vers la page des résultats avec query params ET state
        // Query params: persistance après refresh + URLs partageables
        // State: fallback pour backward compatibility
        const symptomsParam = encodeURIComponent(selectedSymptoms.join(","));
        const allergiesParam =
          allergiesToSave.length > 0
            ? `&allergies=${encodeURIComponent(allergiesToSave.join(","))}`
            : "";
        navigate(`/remedes?symptoms=${symptomsParam}${allergiesParam}`, {
          state: { symptoms: selectedSymptoms, allergies: allergiesToSave },
        });

        // Logging structuré pour debug
        logger.group("🔍 Résultats de recherche");
        logger.debug("Symptômes recherchés:", selectedSymptoms);
        logger.debug("Allergies actives:", allergiesToSave);
        logger.debug("Filtrage activé:", isFilteringEnabled);
        logger.debug("Remèdes trouvés:", matchingRemedies.length);

        if (matchingRemedies.length > 0) {
          logger.table(
            matchingRemedies.map((r) => ({
              nom: r.remedy.name,
              type: r.remedy.type,
              matches: r.matchCount,
              symptômes: r.matchedSymptoms.join(", "),
            })),
          );
        } else {
          logger.debug("⚠️ Aucun remède trouvé pour ces symptômes");
        }

        logger.groupEnd();
      } catch (err) {
        logger.error("Erreur lors de la recherche:", err);
        setError("Une erreur est survenue lors de la recherche");
      } finally {
        setIsLoading(false);
      }
    }, delay);
  };

  // Auto-reset de hasSubmitted après 2 secondes (pour l'état du bouton uniquement)
  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setHasSubmitted(false);
      }, 2000); // 2 secondes

      return () => clearTimeout(timer);
    }
  }, [hasSubmitted]);

  return {
    handleSubmit,
    isLoading,
    results,
    hasSubmitted,
    error,
  };
}
