import allergensList from "../../../data/allergensList.json";
import { createLogger } from "../../../utils/logger";

const logger = createLogger("validationAllergies");

/**
 * Valide qu'un ID d'allergène existe dans la liste des allergènes
 * @param {string} allergenId - L'ID de l'allergène à valider
 * @returns {boolean} - true si l'ID est valide, false sinon
 */
export function validateAllergen(allergenId) {
  if (typeof allergenId !== "string" || !allergenId) {
    logger.warn("validateAllergen: allergenId must be a non-empty string");
    return false;
  }

  // Trim et lowercase pour comparaison
  const normalizedId = allergenId.trim().toLowerCase();

  // Vérifier que l'ID existe dans la liste
  const allergenExists = allergensList.some(
    (allergen) => allergen.id.toLowerCase() === normalizedId,
  );

  if (!allergenExists) {
    logger.warn(`validateAllergen: unknown allergen ID "${allergenId}"`);
  }

  return allergenExists;
}

/**
 * Valide et nettoie un paramètre query string contenant des allergènes
 * @param {string} allergiesParam - Query parameter contenant des allergènes séparés par des virgules
 * @returns {string[]} - Tableau d'IDs d'allergènes valides
 */
export function validateAllergies(allergiesParam) {
  if (!allergiesParam || typeof allergiesParam !== "string") {
    return [];
  }

  // Limite de taille pour éviter les abus
  const MAX_QUERY_LENGTH = 200;
  if (allergiesParam.length > MAX_QUERY_LENGTH) {
    logger.warn(
      `validateAllergies: query parameter too long (${allergiesParam.length} > ${MAX_QUERY_LENGTH})`,
    );
    return [];
  }

  // Split et nettoyage
  const rawAllergies = allergiesParam.split(",").map((allergen) => {
    try {
      return decodeURIComponent(allergen.trim());
    } catch (error) {
      logger.warn(
        `validateAllergies: failed to decode allergen "${allergen}"`,
        error,
      );
      return null;
    }
  });

  // Filtrer les valeurs nulles et invalides
  const validAllergies = rawAllergies
    .filter((allergen) => allergen !== null && allergen !== "")
    .filter((allergenId) => validateAllergen(allergenId));

  logger.debug(
    `validateAllergies: ${validAllergies.length}/${rawAllergies.length} allergies valides`,
  );

  return validAllergies;
}

/**
 * Récupère tous les IDs d'allergènes valides
 * @returns {string[]} - Liste de tous les IDs d'allergènes
 */
export function getAllAllergenIds() {
  return allergensList.map((allergen) => allergen.id);
}
