/**
 * Logique de filtrage des produits par tags de propriétés
 * Système multi-sélection avec ET entre catégories, OU au sein d'une catégorie
 */

/**
 * Filtre les produits selon les filtres de tags sélectionnés
 *
 * Logique de filtrage optimisée :
 * - ET entre catégories : toutes les catégories actives doivent être satisfaites
 * - OU au sein d'une catégorie : au moins un filtre de la catégorie doit correspondre
 *
 * Exemple :
 * - Filtres : { pregnancy: { interdit: true }, verified: { verified: true } }
 * - Résultat : produits qui sont À LA FOIS interdits pour grossesse ET reconnus
 *
 * @param {Array} products - Tableau des produits à filtrer
 * @param {Object} activeFilters - Objet contenant les filtres actifs par catégorie
 * @param {Object} activeFilters.pregnancy - Filtres grossesse { ok: bool, variant: bool, interdit: bool }
 * @param {Object} activeFilters.verified - Filtres reconnaissance { verified: bool, traditional: bool }
 * @param {Object} activeFilters.children - Filtres âge enfants { allAges: bool, withLimit: bool }
 * @returns {Array} - Produits filtrés
 */
export function filterProductsByTags(products, activeFilters = {}) {
  const pregnancy = activeFilters.pregnancy ?? {};
  const verified = activeFilters.verified ?? {};
  const ageLimit = activeFilters.ageLimit ?? {};

  const hasPregnancyFilters = Object.values(pregnancy).some(Boolean);
  const hasVerifiedFilters = Object.values(verified).some(Boolean);
  const hasChildrenFilters = Object.values(ageLimit).some(Boolean);

  if (!hasPregnancyFilters && !hasVerifiedFilters && !hasChildrenFilters) {
    return products;
  }

  return products.filter((result) => {
    const product = result.product;

    if (hasPregnancyFilters) {
      const matchesPregnancy =
        (pregnancy.ok && product.pregnancySafe === true) ||
        (pregnancy.variant && product.pregnancySafe === null) ||
        (pregnancy.interdit && product.pregnancySafe === false);

      if (!matchesPregnancy) return false;
    }

    if (hasVerifiedFilters) {
      const matchesVerified =
        (verified.verified && product.verifiedByProfessional === true) ||
        (verified.traditional && product.verifiedByProfessional === false);

      if (!matchesVerified) return false;
    }

    if (hasChildrenFilters) {
      const matchesChildren =
        (ageLimit.adultOnly && product.childrenAge === null) ||
        (ageLimit.withLimit && product.childrenAge !== null) ||
        (ageLimit.allAges && product.childrenAge !== null);

      if (!matchesChildren) return false;
    }

    return true;
  });
}

/**
 * État initial des filtres (tous désactivés)
 */
export const INITIAL_FILTERS = {
  pregnancy: {
    ok: false,
    variant: false,
    interdit: false,
  },
  verified: {
    verified: false,
    traditional: false,
  },
  ageLimit: {
    allAges: false,
    withLimit: false,
    adultOnly: false,
  },
};
