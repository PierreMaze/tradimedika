// src/utils/remedyMatcher.js
import { normalizeForMatching } from "./normalizeSymptom";

/**
 * Trouve les remèdes correspondant aux symptômes sélectionnés
 *
 * Logique de matching :
 * 1. Matching flexible (insensible aux accents) entre symptômes sélectionnés et DB
 * 2. Filtre les remèdes qui ont au moins 1 symptôme en commun
 * 3. Calcule le score de pertinence (nombre de symptômes matchés)
 * 4. Trie par score décroissant, puis alphabétiquement
 *
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés (avec ou sans accents)
 * @param {Array} database - Base de données des remèdes (db.json)
 * @returns {Array<{remedy: Object, matchCount: number, matchedSymptoms: string[]}>}
 *
 * @example
 * const results = findMatchingRemedies(
 *   ["fatigue", "diarrhée"],  // Accepte avec/sans accents
 *   db
 * );
 * // [
 * //   { remedy: {...}, matchCount: 2, matchedSymptoms: ["fatigue", "diarrhée"] },
 * //   { remedy: {...}, matchCount: 1, matchedSymptoms: ["fatigue"] }
 * // ]
 */
export function findMatchingRemedies(selectedSymptoms, database) {
  // Validation des entrées
  if (!Array.isArray(selectedSymptoms) || selectedSymptoms.length === 0) {
    console.warn("[remedyMatcher] Aucun symptôme sélectionné");
    return [];
  }

  if (!Array.isArray(database) || database.length === 0) {
    console.error("[remedyMatcher] Base de données invalide ou vide");
    return [];
  }

  // Matching et scoring
  const matches = database
    .map((remedy) => {
      // Vérifier que le remède a un champ symptoms valide
      if (!Array.isArray(remedy.symptoms)) {
        console.warn(
          `[remedyMatcher] Remède "${remedy.name}" sans champ symptoms valide`,
        );
        return null;
      }

      // Trouver les symptômes qui matchent (matching flexible, insensible aux accents)
      const matchedSymptoms = selectedSymptoms.filter((selectedSymptom) =>
        remedy.symptoms.some(
          (remedySymptom) =>
            normalizeForMatching(selectedSymptom) ===
            normalizeForMatching(remedySymptom)
        )
      );

      // Si aucun match, on exclut ce remède
      if (matchedSymptoms.length === 0) {
        return null;
      }

      // Retourner le remède avec son score
      return {
        remedy,
        matchCount: matchedSymptoms.length,
        matchedSymptoms,
      };
    })
    .filter((match) => match !== null); // Supprimer les null

  // Tri par pertinence (score DESC, puis nom alphabétique ASC)
  matches.sort((a, b) => {
    // D'abord par score (décroissant)
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }

    // En cas d'égalité, tri alphabétique
    return a.remedy.name.localeCompare(b.remedy.name, "fr", {
      sensitivity: "base",
    });
  });

  return matches;
}
