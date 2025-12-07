// hooks/useSymptomTags.js
import { useState } from "react";
import { normalizeSymptom } from "../utils/normalizeSymptom";

/**
 * Hook personnalisé pour gérer la sélection de symptômes
 * - Limite max: 5 symptômes
 * - Anti-doublon avec normalisation complète (trim + lowercase + accents + tirets)
 * - Ajout/suppression avec validation
 *
 * @returns {Object} { selectedSymptoms, addSymptom, removeSymptom, isAtLimit }
 */
export function useSymptomTags() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  /**
   * Ajoute un symptôme à la liste avec validation
   * @param {string} symptom - Symptôme à ajouter
   */
  const addSymptom = (symptom) => {
    const normalized = normalizeSymptom(symptom.trim());

    // Limite max de 5 symptômes
    if (selectedSymptoms.length >= 5) {
      return;
    }

    // Vérification anti-doublon
    if (!selectedSymptoms.includes(normalized)) {
      setSelectedSymptoms([...selectedSymptoms, normalized]);
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
