// src/utils/remedyMatcher.js
import { createLogger } from "./logger";
import { normalizeForMatching } from "./normalizeSymptom";
import { validateSlugFormat } from "./validation";

const logger = createLogger("remedyMatcher");

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
    logger.warn("Aucun symptôme sélectionné");
    return [];
  }

  if (!Array.isArray(database) || database.length === 0) {
    logger.error("Base de données invalide ou vide");
    return [];
  }

  // Matching et scoring
  const matches = database
    .map((remedy) => {
      // Vérifier que le remède a un champ symptoms valide
      if (!Array.isArray(remedy.symptoms)) {
        logger.warn(`Remède "${remedy.name}" sans champ symptoms valide`);
        return null;
      }

      // Trouver les symptômes qui matchent (matching flexible, insensible aux accents)
      const matchedSymptoms = selectedSymptoms.filter((selectedSymptom) =>
        remedy.symptoms.some(
          (remedySymptom) =>
            normalizeForMatching(selectedSymptom) ===
            normalizeForMatching(remedySymptom),
        ),
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

/**
 * Récupère un remède par son ID depuis la base de données
 *
 * @param {string|number} id - L'ID du remède à récupérer
 * @param {Array} database - Base de données des remèdes (db.json)
 * @returns {Object|null} - Le remède trouvé ou null
 *
 * @example
 * const remedy = getRemedyById("0", db);
 * const remedy = getRemedyById(0, db);
 */
export function getRemedyById(id, database) {
  // Validation des entrées
  if (id === undefined || id === null || id === "") {
    logger.warn("ID invalide fourni à getRemedyById");
    return null;
  }

  if (!Array.isArray(database) || database.length === 0) {
    logger.error("Base de données invalide ou vide");
    return null;
  }

  // Convertir l'ID en nombre (vient de useParams comme string)
  const numericId = Number(id);

  // Vérifier que la conversion a réussi
  if (isNaN(numericId)) {
    logger.warn(`ID "${id}" n'est pas convertible en nombre`);
    return null;
  }

  // Rechercher le remède
  const remedy = database.find((item) => item.id === numericId);

  if (!remedy) {
    logger.warn(`Aucun remède trouvé avec l'ID ${numericId}`);
    return null;
  }

  return remedy;
}

/**
 * Génère un slug URL-safe depuis le nom d'un remède
 *
 * @param {string} name - Le nom du remède
 * @returns {string} - Le slug formaté (lowercase, tirets, accents préservés)
 *
 * @example
 * generateSlug("Citron") // "citron"
 * generateSlug("Jus de Citron") // "jus-de-citron"
 * generateSlug("Thé Vert") // "thé-vert"
 */
export function generateSlug(name) {
  if (!name || typeof name !== "string") {
    logger.warn("Nom invalide fourni à generateSlug");
    return "";
  }

  return name
    .toLowerCase() // Lowercase
    .trim() // Supprime les espaces début/fin
    .replace(/\s+/g, "-") // Espaces → tirets
    .replace(/[^a-z0-9àâäéèêëïîôùûüÿçœ-]/g, ""); // Garde lettres, chiffres, accents français, tirets
}

/**
 * Récupère un remède par son slug depuis la base de données
 *
 * Cette fonction gère automatiquement le décodage des URLs encodées.
 * Les navigateurs encodent souvent les accents (ex: "thé-vert" → "th%C3%A9-vert").
 * Cette fonction décode le slug avant de faire la recherche pour garantir le matching.
 *
 * @param {string} slug - Le slug du remède (ex: "citron", "thé-vert", "th%C3%A9-vert")
 * @param {Array} database - Base de données des remèdes (db.json)
 * @returns {Object|null} - Le remède trouvé ou null
 *
 * @example
 * const remedy = getRemedyBySlug("citron", db);
 * const remedy = getRemedyBySlug("thé-vert", db);
 * const remedy = getRemedyBySlug("th%C3%A9-vert", db); // URL encodée → trouve "Thé Vert"
 */
export function getRemedyBySlug(slug, database) {
  // Validation des entrées
  if (!slug || typeof slug !== "string") {
    logger.warn("Slug invalide fourni à getRemedyBySlug");
    return null;
  }

  if (!Array.isArray(database) || database.length === 0) {
    logger.error("Base de données invalide ou vide");
    return null;
  }

  // Décoder le slug au cas où il serait encodé (ex: th%C3%A9-vert → thé-vert)
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch (error) {
    logger.warn(`Erreur lors du décodage du slug "${slug}"`, error);
    // Continue avec le slug original si le décodage échoue
  }

  // Valider le format du slug décodé (protection contre injections)
  if (!validateSlugFormat(decodedSlug)) {
    logger.warn(
      `Format de slug invalide après décodage: "${decodedSlug}" (original: "${slug}")`,
    );
    return null;
  }

  // Rechercher le remède dont le slug correspond
  const remedy = database.find((item) => {
    if (!item.name) return false;
    return generateSlug(item.name) === decodedSlug;
  });

  if (!remedy) {
    logger.warn(`Aucun remède trouvé avec le slug "${decodedSlug}"`);
    return null;
  }

  return remedy;
}
