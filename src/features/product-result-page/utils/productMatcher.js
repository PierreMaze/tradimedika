// src/utils/productMatcher.js
import { createLogger } from "../../../utils/logger";
import { normalizeForMatching } from "../../product-search/utils/normalize";
import { validateSlugFormat } from "../../product-search/utils/validation";

const logger = createLogger("productMatcher");

/**
 * Valide les entrées pour le matching de produits
 *
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @param {Array} database - Base de données des produits
 * @returns {boolean} - true si les entrées sont valides
 *
 * @private
 */
function validateProductMatcherInputs(selectedSymptoms, database) {
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
 * Vérifie si un produit est contre-indiqué pour les symptômes sélectionnés
 *
 * @param {Object} product - Le produit à évaluer
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @returns {string[]} - Liste des symptômes pour lesquels le produit est mauvais
 *
 * @private
 */
function findBadSymptomMatches(product, selectedSymptoms) {
  // Si pas de badForSymptoms, pas de contre-indication
  if (
    !Array.isArray(product.badForSymptoms) ||
    product.badForSymptoms.length === 0
  ) {
    return [];
  }

  // Trouver les symptômes sélectionnés qui sont dans badForSymptoms
  return selectedSymptoms.filter((selectedSymptom) =>
    product.badForSymptoms.some(
      (badSymptom) =>
        normalizeForMatching(selectedSymptom) ===
        normalizeForMatching(badSymptom),
    ),
  );
}

/**
 * Calcule le match entre un produit et les symptômes sélectionnés
 *
 * Logique de filtrage :
 * 1. Trouve les symptômes qui matchent positivement (product.symptoms)
 * 2. Vérifie si le produit est contre-indiqué pour certains symptômes (product.badForSymptoms)
 * 3. Si contre-indiqué → exclut le produit
 *
 * @param {Object} product - Le produit à évaluer
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés
 * @returns {{product: Object, matchCount: number, matchedSymptoms: string[]}|null}
 *
 * @private
 */
function calculateProductMatch(product, selectedSymptoms) {
  // Vérifier que le produit a un champ symptoms valide
  if (!Array.isArray(product.symptoms)) {
    logger.warn(`Produit "${product.name}" sans champ symptoms valide`);
    return null;
  }

  // Trouver les symptômes qui matchent (matching flexible, insensible aux accents)
  const matchedSymptoms = selectedSymptoms.filter((selectedSymptom) =>
    product.symptoms.some(
      (productSymptom) =>
        normalizeForMatching(selectedSymptom) ===
        normalizeForMatching(productSymptom),
    ),
  );

  // Si aucun match, on exclut ce produit
  if (matchedSymptoms.length === 0) {
    return null;
  }

  // Vérifier les contre-indications (badForSymptoms)
  const badMatches = findBadSymptomMatches(product, selectedSymptoms);
  if (badMatches.length > 0) {
    logger.info(
      `Produit "${product.name}" exclu : mauvais pour ${badMatches.join(", ")}`,
    );
    return null;
  }

  // Retourner le produit avec son score
  return {
    product,
    matchCount: matchedSymptoms.length,
    matchedSymptoms,
  };
}

/**
 * Trie les produits par pertinence
 * Critères de tri (dans l'ordre) :
 * 1. matchCount DESC (nombre de symptômes matchés)
 * 2. verifiedByProfessional DESC (produits vérifiés en priorité)
 * 3. nom alphabétique ASC
 *
 * @param {Array<{product: Object, matchCount: number, matchedSymptoms: string[]}>} matches
 * @returns {Array<{product: Object, matchCount: number, matchedSymptoms: string[]}>}
 *
 * @private
 */
function sortProductsByRelevance(matches) {
  return matches.sort((a, b) => {
    // 1. D'abord par matchCount (décroissant)
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }

    // 2. En cas d'égalité, prioriser les produits vérifiés par un professionnel
    const aVerified = a.product.verifiedByProfessional === true ? 1 : 0;
    const bVerified = b.product.verifiedByProfessional === true ? 1 : 0;
    if (bVerified !== aVerified) {
      return bVerified - aVerified;
    }

    // 3. En cas d'égalité, tri alphabétique
    return a.product.name.localeCompare(b.product.name, "fr", {
      sensitivity: "base",
    });
  });
}

/**
 * Vérifie si un produit contient des allergènes de l'utilisateur
 *
 * @param {Object} product - Le produit à vérifier
 * @param {string[]} userAllergies - IDs des allergènes de l'utilisateur
 * @returns {boolean} - true si le produit contient un allergène de l'utilisateur
 *
 * @private
 */
function hasUserAllergens(product, userAllergies) {
  if (!userAllergies || userAllergies.length === 0) {
    return false;
  }
  if (
    !product ||
    !Array.isArray(product.allergens) ||
    product.allergens.length === 0
  ) {
    return false;
  }
  return product.allergens.some((allergenId) =>
    userAllergies.includes(allergenId),
  );
}

/**
 * Trouve les produits correspondant aux symptômes sélectionnés
 *
 * Logique de matching :
 * 1. Matching flexible (insensible aux accents) entre symptômes sélectionnés et DB
 * 2. Filtre les produits qui ont au moins 1 symptôme en commun
 * 3. Exclut les produits contre-indiqués (badForSymptoms)
 * 4. Calcule le score de pertinence (nombre de symptômes matchés)
 * 5. Trie par : matchCount DESC, verifiedByProfessional DESC, alphabétique ASC
 * 6. Marque comme "isRecommended" le premier résultat sans allergène utilisateur
 *
 * @param {string[]} selectedSymptoms - Symptômes sélectionnés (avec ou sans accents)
 * @param {Array} database - Base de données des produits (db.json)
 * @param {string[]} [userAllergies=[]] - IDs des allergènes de l'utilisateur (optionnel)
 * @returns {Array<{product: Object, matchCount: number, matchedSymptoms: string[], isRecommended: boolean}>}
 *
 * @example
 * const results = findMatchingProducts(
 *   ["fatigue", "diarrhée"],  // Accepte avec/sans accents
 *   db,
 *   ["citrus"]  // Allergies de l'utilisateur
 * );
 * // Le premier produit sans allergène "citrus" sera isRecommended: true
 */
export function findMatchingProducts(
  selectedSymptoms,
  database,
  userAllergies = [],
) {
  // Validation des entrées
  if (!validateProductMatcherInputs(selectedSymptoms, database)) {
    return [];
  }

  // Matching et scoring
  const matches = database
    .map((product) => calculateProductMatch(product, selectedSymptoms))
    .filter((match) => match !== null);

  // Tri par pertinence
  const sortedMatches = sortProductsByRelevance(matches);

  // Marquer comme "Recommandé" le premier résultat sans allergène utilisateur
  let recommendedAssigned = false;
  return sortedMatches.map((match) => {
    const containsUserAllergen = hasUserAllergens(match.product, userAllergies);
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
 * Récupère un produit par son ID depuis la base de données
 *
 * @param {string|number} id - L'ID du produit à récupérer
 * @param {Array} database - Base de données des produits (db.json)
 * @returns {Object|null} - Le produit trouvé ou null
 *
 * @example
 * const product = getProductById("0", db);
 * const product = getProductById(0, db);
 */
export function getProductById(id, database) {
  // Validation des entrées
  if (id === undefined || id === null || id === "") {
    logger.warn("ID invalide fourni à getProductById");
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

  // Rechercher le produit
  const product = database.find((item) => item.id === numericId);

  if (!product) {
    logger.warn(`Aucun produit naturel trouvé avec l'ID ${numericId}`);
    return null;
  }

  return product;
}

/**
 * Génère un slug URL-safe depuis le nom d'un produit
 *
 * @param {string} name - Le nom du produit
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
 * Récupère un produit par son slug depuis la base de données
 *
 * Cette fonction gère automatiquement le décodage des URLs encodées.
 * Les navigateurs encodent souvent les accents (ex: "thé-vert" → "th%C3%A9-vert").
 * Cette fonction décode le slug avant de faire la recherche pour garantir le matching.
 *
 * @param {string} slug - Le slug du produit (ex: "citron", "thé-vert", "th%C3%A9-vert")
 * @param {Array} database - Base de données des produits (db.json)
 * @returns {Object|null} - Le produit trouvé ou null
 *
 * @example
 * const product = getProductBySlug("citron", db);
 * const product = getProductBySlug("thé-vert", db);
 * const product = getProductBySlug("th%C3%A9-vert", db); // URL encodée → trouve "Thé Vert"
 */
export function getProductBySlug(slug, database) {
  // Validation des entrées
  if (!slug || typeof slug !== "string") {
    logger.warn("Slug invalide fourni à getProductBySlug");
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

  // Rechercher le produit dont le slug correspond
  const product = database.find((item) => {
    if (!item.name) return false;
    return generateSlug(item.name) === decodedSlug;
  });

  if (!product) {
    logger.warn(`Aucun produit naturel trouvé avec le slug "${decodedSlug}"`);
    return null;
  }

  return product;
}
