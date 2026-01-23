/**
 * Logique de filtrage des remèdes par tags de propriétés
 * Système multi-sélection avec ET entre catégories, OU au sein d'une catégorie
 */

/**
 * Filtre les remèdes selon les filtres de tags sélectionnés
 *
 * Logique de filtrage optimisée :
 * - ET entre catégories : toutes les catégories actives doivent être satisfaites
 * - OU au sein d'une catégorie : au moins un filtre de la catégorie doit correspondre
 *
 * Exemple :
 * - Filtres : { pregnancy: { interdit: true }, verified: { verified: true } }
 * - Résultat : remèdes qui sont À LA FOIS interdits pour grossesse ET reconnus
 *
 * @param {Array} remedies - Tableau des remèdes à filtrer
 * @param {Object} activeFilters - Objet contenant les filtres actifs par catégorie
 * @param {Object} activeFilters.pregnancy - Filtres grossesse { ok: bool, variant: bool, interdit: bool }
 * @param {Object} activeFilters.verified - Filtres reconnaissance { verified: bool, traditional: bool }
 * @param {Object} activeFilters.children - Filtres âge enfants { allAges: bool, withLimit: bool }
 * @returns {Array} - Remèdes filtrés
 */
export function filterRemediesByTags(remedies, activeFilters = {}) {
  const pregnancy = activeFilters.pregnancy ?? {};
  const verified = activeFilters.verified ?? {};
  const ageLimit = activeFilters.ageLimit ?? {};

  const hasPregnancyFilters = Object.values(pregnancy).some(Boolean);
  const hasVerifiedFilters = Object.values(verified).some(Boolean);
  const hasChildrenFilters = Object.values(ageLimit).some(Boolean);

  if (!hasPregnancyFilters && !hasVerifiedFilters && !hasChildrenFilters) {
    return remedies;
  }

  return remedies.filter((result) => {
    const remedy = result.remedy;

    if (hasPregnancyFilters) {
      const matchesPregnancy =
        (pregnancy.ok && remedy.pregnancySafe === true) ||
        (pregnancy.variant && remedy.pregnancySafe === null) ||
        (pregnancy.interdit && remedy.pregnancySafe === false);

      if (!matchesPregnancy) return false;
    }

    if (hasVerifiedFilters) {
      const matchesVerified =
        (verified.verified && remedy.verifiedByProfessional === true) ||
        (verified.traditional && remedy.verifiedByProfessional === false);

      if (!matchesVerified) return false;
    }

    if (hasChildrenFilters) {
      const matchesChildren =
        (ageLimit.adultOnly && remedy.childrenAge === null) ||
        (ageLimit.withLimit && remedy.childrenAge !== null) ||
        (ageLimit.allAges && remedy.childrenAge !== null);

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
