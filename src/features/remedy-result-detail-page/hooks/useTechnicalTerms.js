import { useCallback, useMemo } from "react";
import { TECHNICAL_TERMS_DATA } from "../../../data/technicalTermsDefinitions";

/**
 * Hook personnalisé pour accéder aux définitions de termes techniques
 *
 * Fournit des fonctions memoizées pour:
 * - Récupérer la définition d'un terme par son ID
 * - Récupérer tous les termes d'une catégorie
 *
 * @returns {Object} Fonctions de lookup
 */
export function useTechnicalTerms() {
  /**
   * Récupère la définition d'un terme par son ID
   * @param {string} termId - ID du terme (sera normalisé en kebab-case)
   * @returns {Object|null} Définition du terme ou null si non trouvé
   */
  const getTermDefinition = useCallback((termId) => {
    if (!termId) return null;

    // Normaliser l'ID (kebab-case, lowercase)
    const normalized = termId
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return TECHNICAL_TERMS_DATA[normalized] || null;
  }, []);

  /**
   * Récupère tous les termes d'une catégorie spécifique
   * @param {string} category - Catégorie (properties, allergens, medical)
   * @returns {Array} Liste des termes de la catégorie
   */
  const getTermsByCategory = useCallback((category) => {
    if (!category) return [];

    return Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes(category))
      .map(([id, data]) => ({
        id,
        ...data,
      }));
  }, []);

  /**
   * Vérifie si un terme existe dans la base de données
   * @param {string} termId - ID du terme à vérifier
   * @returns {boolean} true si le terme existe
   */
  const termExists = useCallback(
    (termId) => {
      return getTermDefinition(termId) !== null;
    },
    [getTermDefinition],
  );

  /**
   * Récupère toutes les catégories disponibles
   * @returns {Array} Liste des catégories uniques
   */
  const getAllCategories = useCallback(() => {
    const categories = new Set(
      Object.values(TECHNICAL_TERMS_DATA).map((term) => term.category),
    );
    return Array.from(categories);
  }, []);

  return useMemo(
    () => ({
      getTermDefinition,
      getTermsByCategory,
      termExists,
      getAllCategories,
    }),
    [getTermDefinition, getTermsByCategory, termExists, getAllCategories],
  );
}
