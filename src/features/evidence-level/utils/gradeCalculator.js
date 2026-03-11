/**
 * Utilitaires pour calculer et interpréter les niveaux de preuve GRADE
 */

/**
 * Informations complètes sur chaque niveau GRADE
 */
export const GRADE_LEVELS = {
  A: {
    label: "A - Preuve élevée",
    shortLabel: "Élevée",
    color: "green",
    description:
      "Niveau de confiance élevé : données robustes, RCT multiples de qualité, cohérence des résultats",
    recommendation:
      "Forte confiance : les bénéfices sont bien établis, recommandation forte",
    evidenceLevelRange: [1],
  },
  B: {
    label: "B - Preuve modérée",
    shortLabel: "Modérée",
    color: "blue",
    description:
      "Niveau de confiance modéré : RCT de qualité acceptable, certaines limites méthodologiques",
    recommendation:
      "Confiance modérée : bénéfices probables, recommandation conditionnelle",
    evidenceLevelRange: [2],
  },
  C: {
    label: "C - Preuve faible",
    shortLabel: "Faible",
    color: "yellow",
    description:
      "Niveau de confiance limité : études observationnelles, hétérogénéité importante, biais possibles",
    recommendation:
      "Confiance faible : bénéfices incertains, utilisation prudente",
    evidenceLevelRange: [2, 3],
  },
  D: {
    label: "D - Preuve très faible",
    shortLabel: "Très faible",
    color: "red",
    description:
      "Niveau de confiance très faible : usage traditionnel documenté, données scientifiques insuffisantes",
    recommendation:
      "Très faible confiance : repose sur usage traditionnel, preuves scientifiques manquantes",
    evidenceLevelRange: [3, 4],
  },
};

/**
 * Calcule le niveau GRADE basé sur plusieurs facteurs
 *
 * @param {Object} params - Paramètres pour le calcul
 * @param {number} params.evidenceLevel - Niveau hiérarchie (1-4)
 * @param {Object} params.rob2 - Résultats RoB 2
 * @param {number} params.jadad - Score JADAD
 * @param {number} params.i2 - Hétérogénéité I²
 * @param {boolean} params.publicationBias - Biais de publication détecté
 * @param {boolean} params.imprecision - Imprécision des résultats
 * @returns {string} - Niveau GRADE (A, B, C, D)
 */
export function calculateGradeLevel({
  evidenceLevel = 4,
  rob2 = null,
  jadad = 0,
  i2 = null,
  publicationBias = false,
  imprecision = false,
}) {
  let baseGrade = "D"; // Par défaut

  // Déterminer le grade de base selon le niveau d'évidence
  if (evidenceLevel === 1) {
    baseGrade = "A"; // Méta-analyses RCT
  } else if (evidenceLevel === 2) {
    baseGrade = "B"; // RCT individuels
  } else if (evidenceLevel === 3) {
    baseGrade = "C"; // Études observationnelles
  } else {
    baseGrade = "D"; // Usage traditionnel, cas cliniques
  }

  // Facteurs de downgrade
  let downgrades = 0;

  // RoB 2 - Risque de biais élevé
  if (rob2?.overall === "high") {
    downgrades += 2;
  } else if (rob2?.overall === "some_concerns") {
    downgrades += 1;
  }

  // JADAD faible (<3)
  if (jadad > 0 && jadad < 3) {
    downgrades += 1;
  }

  // Hétérogénéité importante
  if (i2 !== null) {
    if (i2 > 75) {
      downgrades += 2; // Très importante
    } else if (i2 > 50) {
      downgrades += 1; // Importante
    }
  }

  // Biais de publication
  if (publicationBias) {
    downgrades += 1;
  }

  // Imprécision
  if (imprecision) {
    downgrades += 1;
  }

  // Appliquer les downgrades
  const gradeOrder = ["A", "B", "C", "D"];
  const currentIndex = gradeOrder.indexOf(baseGrade);
  const newIndex = Math.min(currentIndex + downgrades, gradeOrder.length - 1);

  return gradeOrder[newIndex];
}

/**
 * Obtient la couleur Tailwind associée à un grade
 *
 * @param {string} grade - Niveau GRADE (A, B, C, D)
 * @returns {Object} - Classes Tailwind CSS
 */
export function getGradeColor(grade) {
  const colorMap = {
    A: {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-800 dark:text-green-200",
      border: "border-green-500 dark:border-green-400",
      ring: "ring-green-500 dark:ring-green-400",
    },
    B: {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-800 dark:text-blue-200",
      border: "border-blue-500 dark:border-blue-400",
      ring: "ring-blue-500 dark:ring-blue-400",
    },
    C: {
      bg: "bg-yellow-100 dark:bg-yellow-900",
      text: "text-yellow-800 dark:text-yellow-200",
      border: "border-yellow-500 dark:border-yellow-400",
      ring: "ring-yellow-500 dark:ring-yellow-400",
    },
    D: {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-800 dark:text-red-200",
      border: "border-red-500 dark:border-red-400",
      ring: "ring-red-500 dark:ring-red-400",
    },
  };

  return colorMap[grade] || colorMap.D;
}

/**
 * Compare deux niveaux GRADE
 *
 * @param {string} gradeA - Premier grade
 * @param {string} gradeB - Second grade
 * @returns {number} - -1 si A < B, 0 si égal, 1 si A > B
 */
export function compareGrades(gradeA, gradeB) {
  const order = ["A", "B", "C", "D"];
  const indexA = order.indexOf(gradeA);
  const indexB = order.indexOf(gradeB);

  if (indexA < indexB) return -1;
  if (indexA > indexB) return 1;
  return 0;
}

/**
 * Obtient une description détaillée d'un niveau GRADE
 *
 * @param {string} grade - Niveau GRADE
 * @returns {Object} - Informations complètes
 */
export function getGradeInfo(grade) {
  return GRADE_LEVELS[grade] || GRADE_LEVELS.D;
}

export default {
  GRADE_LEVELS,
  calculateGradeLevel,
  getGradeColor,
  compareGrades,
  getGradeInfo,
};
