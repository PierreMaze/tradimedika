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
export function filterRemediesByTags(remedies, activeFilters) {
  // Vérifier quelles catégories ont au moins un filtre actif
  const hasPregnancyFilters = Object.values(activeFilters.pregnancy).some(
    (value) => value === true,
  );
  const hasVerifiedFilters = Object.values(activeFilters.verified).some(
    (value) => value === true,
  );
  const hasChildrenFilters = Object.values(activeFilters.children).some(
    (value) => value === true,
  );

  // Si aucune catégorie n'a de filtres actifs, retourner tous les remèdes
  if (!hasPregnancyFilters && !hasVerifiedFilters && !hasChildrenFilters) {
    return remedies;
  }

  return remedies.filter((result) => {
    const remedy = result.remedy;

    // Vérifier chaque catégorie active (ET logique entre catégories)

    // Catégorie Grossesse (OU logique au sein de la catégorie)
    if (hasPregnancyFilters) {
      const matchesPregnancy =
        (activeFilters.pregnancy.ok && remedy.pregnancySafe === true) ||
        (activeFilters.pregnancy.variant && remedy.pregnancySafe === null) ||
        (activeFilters.pregnancy.interdit && remedy.pregnancySafe === false);

      // Si aucun filtre de grossesse ne correspond, rejeter le remède
      if (!matchesPregnancy) {
        return false;
      }
    }

    // Catégorie Reconnaissance (OU logique au sein de la catégorie)
    if (hasVerifiedFilters) {
      const matchesVerified =
        (activeFilters.verified.verified &&
          remedy.verifiedByProfessional === true) ||
        (activeFilters.verified.traditional &&
          remedy.verifiedByProfessional === false);

      // Si aucun filtre de reconnaissance ne correspond, rejeter le remède
      if (!matchesVerified) {
        return false;
      }
    }

    // Catégorie Âge Enfants (OU logique au sein de la catégorie)
    if (hasChildrenFilters) {
      const matchesChildren =
        (activeFilters.children.allAges && remedy.childrenAge === null) ||
        (activeFilters.children.withLimit && remedy.childrenAge !== null);

      // Si aucun filtre d'âge ne correspond, rejeter le remède
      if (!matchesChildren) {
        return false;
      }
    }

    // Toutes les catégories actives sont satisfaites
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
  children: {
    allAges: false,
    withLimit: false,
  },
};

/**
 * Configuration des catégories de filtres pour la modal
 * Utilisé pour générer les accordéons et checkboxes
 */
export const FILTER_CATEGORIES = [
  {
    id: "pregnancy",
    label: "Grossesse",
    icon: "pregnancy",
    options: [
      {
        id: "ok",
        label: "Sans danger",
        description: "Compatible avec la grossesse",
        color: "green",
      },
      {
        id: "variant",
        label: "À vérifier",
        description: "Données insuffisantes ou usage conditionnel",
        color: "amber",
      },
      {
        id: "interdit",
        label: "Non recommandé",
        description: "Contre-indiqué pendant la grossesse",
        color: "red",
      },
    ],
  },
  {
    id: "verified",
    label: "Usage",
    icon: "verified",
    options: [
      {
        id: "verified",
        label: "Reconnu",
        description: "Soutenu scientifiquement ou par des professionnels",
        color: "green",
      },
      {
        id: "traditional",
        label: "Traditionnel",
        description:
          "Usage traditionnel sans soutien scientifique (remède de grand-mère)",
        color: "amber",
      },
    ],
  },
  {
    id: "children",
    label: "Âge Enfants",
    icon: "children",
    options: [
      {
        id: "allAges",
        label: "Tout âge",
        description: "Utilisable chez l'enfant sans limite d'âge",
        color: "green",
      },
      {
        id: "withLimit",
        label: "Avec limite d'âge",
        description: "Limite d'âge minimum requise",
        color: "teal",
      },
    ],
  },
];
