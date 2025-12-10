// src/utils/normalizeSymptom.js

/**
 * Normalise un symptôme pour l'AFFICHAGE (conserve les accents)
 *
 * Règles de normalisation :
 * - Minuscules uniquement
 * - CONSERVE les accents (é, è, à, ô, etc.)
 * - Sans tirets (-) ni underscores (_)
 * - Espaces uniquement comme séparateurs
 * - Pas d'espaces multiples
 *
 * Utilisez cette fonction pour afficher les symptômes avec l'orthographe française correcte.
 *
 * @param {string} symptom - Le symptôme à normaliser
 * @returns {string} - Le symptôme normalisé (avec accents)
 *
 * @example
 * normalizeSymptom("Immunité") // "immunité"
 * normalizeSymptom("mal de tête") // "mal de tête"
 * normalizeSymptom("DIARRHÉE") // "diarrhée"
 */
export function normalizeSymptom(symptom) {
  if (typeof symptom !== "string") {
    console.warn(`[normalizeSymptom] Expected string, got ${typeof symptom}`);
    return "";
  }

  return symptom
    .toLowerCase() // Convertir en minuscules
    .replace(/[-_]/g, " ") // Remplacer tirets et underscores par espaces
    .replace(/\s+/g, " ") // Normaliser espaces multiples en un seul
    .trim(); // Supprimer espaces début/fin
}

/**
 * Normalise un symptôme pour le MATCHING (supprime les accents)
 *
 * Règles de normalisation :
 * - Minuscules uniquement
 * - SUPPRIME les accents (é→e, à→a, è→e, ô→o, etc.)
 * - Sans tirets (-) ni underscores (_)
 * - Espaces uniquement comme séparateurs
 * - Pas d'espaces multiples
 *
 * Utilisez cette fonction pour le matching flexible où "diarrhee" doit matcher "diarrhée".
 *
 * @param {string} symptom - Le symptôme à normaliser
 * @returns {string} - Le symptôme normalisé (sans accents)
 *
 * @example
 * normalizeForMatching("Immunité") // "immunite"
 * normalizeForMatching("mal de tête") // "mal de tete"
 * normalizeForMatching("DIARRHÉE") // "diarrhee"
 */
export function normalizeForMatching(symptom) {
  if (typeof symptom !== "string") {
    console.warn(`[normalizeForMatching] Expected string, got ${typeof symptom}`);
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
