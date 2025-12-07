// src/hooks/useSymptomSubmit.js

import { useState } from "react";
import db from "../data/db.json";
import { findMatchingRemedies } from "../utils/remedyMatcher";

/**
 * Hook personnalisé pour gérer la soumission des symptômes
 *
 * Fonctionnalités :
 * - Validation (empêche soumission si aucun symptôme)
 * - État de chargement avec délai simulé (300-500ms)
 * - Recherche des remèdes correspondants
 * - Logging structuré des résultats
 *
 * @returns {Object} { handleSubmit, isLoading, results, hasSubmitted, isDisabled }
 */
export function useSymptomSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Soumet les symptômes et recherche les remèdes correspondants
   * @param {string[]} selectedSymptoms - Symptômes sélectionnés (normalisés)
   */
  const handleSubmit = (selectedSymptoms) => {
    // Validation : empêcher soumission vide
    if (!selectedSymptoms || selectedSymptoms.length === 0) {
      console.warn("[useSymptomSubmit] Impossible de soumettre sans symptômes");
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

        // Logging structuré pour debug
        console.group("🔍 Résultats de recherche");
        console.log("Symptômes recherchés:", selectedSymptoms);
        console.log("Remèdes trouvés:", matchingRemedies.length);

        if (matchingRemedies.length > 0) {
          console.table(
            matchingRemedies.map((r) => ({
              nom: r.remedy.name,
              type: r.remedy.type,
              matches: r.matchCount,
              symptômes: r.matchedSymptoms.join(", "),
            })),
          );
        } else {
          console.log("⚠️ Aucun remède trouvé pour ces symptômes");
        }

        console.groupEnd();
      } catch (err) {
        console.error("[useSymptomSubmit] Erreur lors de la recherche:", err);
        setError("Une erreur est survenue lors de la recherche");
      } finally {
        setIsLoading(false);
      }
    }, delay);
  };

  return {
    handleSubmit,
    isLoading,
    results,
    hasSubmitted,
    error,
  };
}
