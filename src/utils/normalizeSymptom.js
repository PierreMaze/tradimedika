// src/utils/normalizeSymptom.js

/**
 * Normalise un symptôme selon des règles strictes
 *
 * Règles de normalisation :
 * - Minuscules uniquement
 * - Sans accents (é→e, à→a, è→e, ô→o, etc.)
 * - Sans tirets (-) ni underscores (_)
 * - Espaces uniquement comme séparateurs
 * - Pas d'espaces multiples
 *
 * @param {string} symptom - Le symptôme à normaliser
 * @returns {string} - Le symptôme normalisé
 *
 * @example
 * normalizeSymptom("Immunité") // "immunite"
 * normalizeSymptom("mal de tête") // "mal de tete"
 * normalizeSymptom("rétention_eau") // "retention eau"
 * normalizeSymptom("CHOLESTÉROL") // "cholesterol"
 */
export function normalizeSymptom(symptom) {
  if (typeof symptom !== "string") {
    console.warn(`[normalizeSymptom] Expected string, got ${typeof symptom}`);
    return "";
  }

  return symptom
    .toLowerCase() // Convertir en minuscules
    .normalize("NFD") // Décomposer les caractères accentués (é → e + ́)
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les diacritiques (accents)
    .replace(/[-_]/g, " ") // Remplacer tirets et underscores par espaces
    .replace(/\s+/g, " ") // Normaliser espaces multiples en un seul
    .trim(); // Supprimer espaces début/fin
}
