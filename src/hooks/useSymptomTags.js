// hooks/useSymptomTags.js
import { useState } from "react";
import { normalizeSymptom, normalizeForMatching } from "../utils/normalizeSymptom";

/**
 * Hook personnalisé pour gérer la sélection de symptômes
 * - Limite max: 5 symptômes
 * - Anti-doublon flexible (avec/sans accents)
 * - Stockage avec accents pour affichage correct
 * - Ajout/suppression avec validation
 *
 * @returns {Object} { selectedSymptoms, addSymptom, removeSymptom, isAtLimit }
 */
export function useSymptomTags() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  /**
   * Ajoute un symptôme à la liste avec validation
   * - Stocke avec accents pour affichage correct
   * - Détection de doublons insensible aux accents
   * @param {string} symptom - Symptôme à ajouter
   */
  const addSymptom = (symptom) => {
    const normalizedDisplay = normalizeSymptom(symptom.trim()); // Avec accents
    const normalizedMatching = normalizeForMatching(symptom.trim()); // Sans accents

    // Limite max de 5 symptômes
    if (selectedSymptoms.length >= 5) {
      return;
    }

    // Vérification anti-doublon (insensible aux accents)
    const isDuplicate = selectedSymptoms.some(
      (s) => normalizeForMatching(s) === normalizedMatching
    );

    if (!isDuplicate) {
      setSelectedSymptoms([...selectedSymptoms, normalizedDisplay]);
    }
  };

  /**
   * Supprime un symptôme de la liste
   * @param {string} symptomToRemove - Symptôme à supprimer
   */
  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== symptomToRemove));
  };

  // Indicateur de limite atteinte
  const isAtLimit = selectedSymptoms.length >= 5;

  return {
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    isAtLimit,
  };
}
