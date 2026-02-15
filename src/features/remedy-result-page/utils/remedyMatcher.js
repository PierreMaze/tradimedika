// src/utils/remedyMatcher.js
import { createLogger } from "../../../utils/logger";
import { normalizeForMatching } from "../../symptom-search/utils/normalizeSymptom";
import { validateSlugFormat } from "../../symptom-search/utils/validationSymptom";

const logger = createLogger("remedyMatcher");

/**
 * Valide les entrées pour le matching de remèdes
 *
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @param {Array} database - Base de données des remèdes
 * @returns {boolean} - true si les entrées sont valides
 *
 * @private
 */
function validateRemedyMatcherInputs(selectedSymptoms, database) {
  if (!Array.isArray(selectedSymptoms) || selectedSymptoms.length === 0) {
    logger.warn("Aucun symptôme sélectionné");
    return false;
  }

  if (!Array.isArray(database) || database.length === 0) {
    logger.error("Base de données invalide ou vide");
    return false;
  }

  return true;
}

/**
 * Vérifie si un remède est contre-indiqué pour les symptômes sélectionnés
 *
 * @param {Object} remedy - Le remède à évaluer
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @returns {string[]} - Liste des symptômes pour lesquels le remède est mauvais
 *
 * @private
 */
function findBadSymptomMatches(remedy, selectedSymptoms) {
  // Si pas de badForSymptoms, pas de contre-indication
  if (
    !Array.isArray(remedy.badForSymptoms) ||
    remedy.badForSymptoms.length === 0
  ) {
    return [];
  }

  // Trouver les symptômes sélectionnés qui sont dans badForSymptoms
  return selectedSymptoms.filter((selectedSymptom) =>
    remedy.badForSymptoms.some(
      (badSymptom) =>
        normalizeForMatching(selectedSymptom) ===
        normalizeForMatching(badSymptom),
    ),
  );
}

/**
 * Calcule le match entre un remède et les symptômes sélectionnés
 *
 * Logique de filtrage :
 * 1. Trouve les symptômes qui matchent positivement (remedy.symptoms)
 * 2. Vérifie si le remède est contre-indiqué pour certains symptômes (remedy.badForSymptoms)
 * 3. Si contre-indiqué → exclut le remède
 *
 * @param {Object} remedy - Le remède à évaluer
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @returns {{remedy: Object, matchCount: number, matchedSymptoms: string[]}|null}
 *
 * @private
 */
function calculateRemedyMatch(remedy, selectedSymptoms) {
  // Vérifier que le remède a un champ symptoms valide
  if (!Array.isArray(remedy.symptoms)) {
    logger.warn(`Produit "${remedy.name}" sans champ symptoms valide`);
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

  // Vérifier les contre-indications (badForSymptoms)
  const badMatches = findBadSymptomMatches(remedy, selectedSymptoms);
  if (badMatches.length > 0) {
    logger.info(
      `Produit "${remedy.name}" exclu : mauvais pour ${badMatches.join(", ")}`,
    );
    return null;
  }

  // Retourner le remède avec son score
  return {
    remedy,
    matchCount: matchedSymptoms.length,
    matchedSymptoms,
  };
}

/**
 * Trie les remèdes par pertinence
 * Critères de tri (dans l'ordre) :
 * 1. matchCount DESC (nombre de symptômes matchés)
 * 2. verifiedByProfessional DESC (remèdes vérifiés en priorité)
 * 3. nom alphabétique ASC
 *
 * @param {Array<{remedy: Object, matchCount: number, matchedSymptoms: string[]}>} matches
 * @returns {Array<{remedy: Object, matchCount: number, matchedSymptoms: string[]}>}
 *
 * @private
 */
function sortRemediesByRelevance(matches) {
  return matches.sort((a, b) => {
    // 1. D'abord par matchCount (décroissant)
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }

    // 2. En cas d'égalité, prioriser les remèdes vérifiés par un professionnel
    const aVerified = a.remedy.verifiedByProfessional === true ? 1 : 0;
    const bVerified = b.remedy.verifiedByProfessional === true ? 1 : 0;
    if (bVerified !== aVerified) {
      return bVerified - aVerified;
    }

    // 3. En cas d'égalité, tri alphabétique
    return a.remedy.name.localeCompare(b.remedy.name, "fr", {
      sensitivity: "base",
    });
  });
}

/**
 * Vérifie si un remède contient des allergènes de l'utilisateur
 *
 * @param {Object} remedy - Le remède à vérifier
 * @param {string[]} userAllergies - IDs des allergènes de l'utilisateur
 * @returns {boolean} - true si le remède contient un allergène de l'utilisateur
 *
 * @private
 */
function hasUserAllergens(remedy, userAllergies) {
  if (!userAllergies || userAllergies.length === 0) {
    return false;
  }
  if (
    !remedy ||
    !Array.isArray(remedy.allergens) ||
    remedy.allergens.length === 0
  ) {
    return false;
  }
  return remedy.allergens.some((allergenId) =>
    userAllergies.includes(allergenId),
  );
}

/**
 * Trouve les remèdes correspondant aux symptômes sélectionnés
 *
 * Logique de matching :
 * 1. Matching flexible (insensible aux accents) entre symptômes sélectionnés et DB
 * 2. Filtre les remèdes qui ont au moins 1 symptôme en commun
 * 3. Exclut les remèdes contre-indiqués (badForSymptoms)
 * 4. Calcule le score de pertinence (nombre de symptômes matchés)
 * 5. Trie par : matchCount DESC, verifiedByProfessional DESC, alphabétique ASC
 * 6. Marque comme "isRecommended" le premier résultat sans allergène utilisateur
 *
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés (avec ou sans accents)
 * @param {Array} database - Base de données des remèdes (db.json)
 * @param {string[]} [userAllergies=[]] - IDs des allergènes de l'utilisateur (optionnel)
 * @returns {Array<{remedy: Object, matchCount: number, matchedSymptoms: string[], isRecommended: boolean}>}
 *
 * @example
 * const results = findMatchingRemedies(
 *   ["fatigue", "diarrhée"],  // Accepte avec/sans accents
 *   db,
 *   ["citrus"]  // Allergies de l'utilisateur
 * );
 * // Le premier remède sans allergène "citrus" sera isRecommended: true
 */
export function findMatchingRemedies(
  selectedSymptoms,
  database,
  userAllergies = [],
) {
  // Validation des entrées
  if (!validateRemedyMatcherInputs(selectedSymptoms, database)) {
    return [];
  }

  // Matching et scoring
  const matches = database
    .map((remedy) => calculateRemedyMatch(remedy, selectedSymptoms))
    .filter((match) => match !== null);

  // Tri par pertinence
  const sortedMatches = sortRemediesByRelevance(matches);

  // Marquer comme "Recommandé" le premier résultat sans allergène utilisateur
  let recommendedAssigned = false;
  return sortedMatches.map((match) => {
    const containsUserAllergen = hasUserAllergens(match.remedy, userAllergies);
    const isRecommended = !recommendedAssigned && !containsUserAllergen;

    if (isRecommended) {
      recommendedAssigned = true;
    }

    return {
      ...match,
      isRecommended,
    };
  });
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
    logger.warn(`Aucun produit naturel trouvé avec l'ID ${numericId}`);
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
    logger.warn(`Aucun produit naturel trouvé avec le slug "${decodedSlug}"`);
    return null;
  }

  return remedy;
}
