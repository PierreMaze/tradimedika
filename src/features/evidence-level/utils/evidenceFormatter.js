/**
 * Utilitaires pour formater les données d'évidence pour l'affichage
 */

/**
 * Formate le niveau d'évidence hiérarchique en texte lisible
 *
 * @param {number} level - Niveau (1-4)
 * @returns {string} - Label formaté
 */
export function formatEvidenceLevel(level) {
  const labels = {
    1: "Niveau 1 - Méta-analyses, revues systématiques",
    2: "Niveau 2 - Essais contrôlés randomisés (RCT)",
    3: "Niveau 3 - Études de cohorte, cas-témoins",
    4: "Niveau inférieur - Études observationnelles",
  };

  return labels[level] || `Niveau ${level}`;
}

/**
 * Formate le type d'étude en français
 *
 * @param {string} studyType - Type d'étude en anglais
 * @returns {string} - Type formaté en français
 */
export function formatStudyType(studyType) {
  const types = {
    "meta-analysis": "Méta-analyse",
    rct: "Essai contrôlé randomisé (RCT)",
    "controlled trial": "Essai contrôlé",
    observational: "Étude observationnelle",
    cohort: "Étude de cohorte",
    "case-control": "Étude cas-témoins",
    "pilot study": "Étude pilote",
    "case series": "Série de cas",
    review: "Revue narrative",
  };

  return types[studyType?.toLowerCase()] || studyType;
}

/**
 * Formate l'hétérogénéité I² avec interprétation
 *
 * @param {number} i2 - Valeur I²
 * @returns {Object} - { value, interpretation, color }
 */
export function formatHeterogeneity(i2) {
  if (i2 === null || i2 === undefined) {
    return {
      value: "N/A",
      interpretation: "Non calculable",
      color: "gray",
    };
  }

  let interpretation = "";
  let color = "";

  if (i2 < 25) {
    interpretation = "Faible";
    color = "green";
  } else if (i2 < 50) {
    interpretation = "Modérée";
    color = "blue";
  } else if (i2 < 75) {
    interpretation = "Importante";
    color = "yellow";
  } else {
    interpretation = "Très importante";
    color = "red";
  }

  return {
    value: `${i2}%`,
    interpretation,
    color,
  };
}

/**
 * Formate le risque de biais RoB 2
 *
 * @param {string} risk - low, some_concerns, high
 * @returns {Object} - { label, color }
 */
export function formatRiskOfBias(risk) {
  const riskMap = {
    low: { label: "Faible", color: "green" },
    some_concerns: { label: "Modéré", color: "yellow" },
    high: { label: "Élevé", color: "red" },
  };

  return riskMap[risk] || { label: risk, color: "gray" };
}

/**
 * Formate une référence bibliographique complète
 *
 * @param {Object} ref - Objet référence
 * @returns {string} - Référence formatée
 */
export function formatReference(ref) {
  if (!ref) return "";

  const parts = [];

  if (ref.authors) parts.push(ref.authors);
  if (ref.year) parts.push(`(${ref.year})`);
  if (ref.title) parts.push(`"${ref.title}"`);
  if (ref.journal) parts.push(ref.journal);
  if (ref.volume) parts.push(ref.volume);
  if (ref.pages) parts.push(`pp. ${ref.pages}`);
  if (ref.doi) parts.push(`DOI: ${ref.doi}`);

  return parts.join(". ");
}

/**
 * Formate le nombre de participants
 *
 * @param {number} count - Nombre de participants
 * @returns {string} - Formaté avec séparateurs de milliers
 */
export function formatParticipantCount(count) {
  if (!count && count !== 0) return "N/A";
  return count.toLocaleString("fr-FR");
}

/**
 * Formate une p-value avec notation scientifique si nécessaire
 *
 * @param {number} pValue - p-value
 * @returns {string} - p-value formatée
 */
export function formatPValue(pValue) {
  if (pValue === null || pValue === undefined) return "N/A";

  if (pValue < 0.001) {
    return "<0.001";
  } else if (pValue < 0.01) {
    return pValue.toFixed(3);
  } else {
    return pValue.toFixed(2);
  }
}

/**
 * Formate un intervalle de confiance
 *
 * @param {Array} ci - Intervalle [min, max]
 * @param {number} decimals - Nombre de décimales
 * @returns {string} - IC formaté
 */
export function formatConfidenceInterval(ci, decimals = 2) {
  if (!ci || ci.length !== 2) return "N/A";

  return `[${ci[0].toFixed(decimals)}, ${ci[1].toFixed(decimals)}]`;
}

/**
 * Formate une date au format français
 *
 * @param {string} dateString - Date ISO ou string
 * @returns {string} - Date formatée
 */
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formate la sévérité d'une alerte
 *
 * @param {string} severity - critical, high, moderate, low
 * @returns {Object} - { label, color, icon }
 */
export function formatAlertSeverity(severity) {
  const severityMap = {
    critical: { label: "Critique", color: "red", icon: "🚫" },
    high: { label: "Élevé", color: "red", icon: "⚠" },
    moderate: { label: "Modéré", color: "yellow", icon: "⚠" },
    low: { label: "Faible", color: "blue", icon: "ℹ" },
  };

  return severityMap[severity] || { label: severity, color: "gray", icon: "•" };
}

/**
 * Tronque un texte avec ellipse
 *
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur max
 * @returns {string} - Texte tronqué
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Formate le score AMSTAR 2
 *
 * @param {string|number} score - high, moderate, low ou numérique
 * @returns {Object} - { label, color }
 */
export function formatAmstarScore(score) {
  if (typeof score === "string") {
    const scoreMap = {
      high: { label: "Élevée", color: "green" },
      moderate: { label: "Modérée", color: "blue" },
      low: { label: "Faible", color: "yellow" },
      "critically low": { label: "Très faible", color: "red" },
    };
    return scoreMap[score] || { label: score, color: "gray" };
  }

  // Score numérique sur 16
  if (score >= 13) return { label: "Élevée", color: "green" };
  if (score >= 10) return { label: "Modérée", color: "blue" };
  if (score >= 7) return { label: "Faible", color: "yellow" };
  return { label: "Très faible", color: "red" };
}

/**
 * Génère un résumé court d'une évidence pour le tableau
 *
 * @param {Object} evidence - Objet évidence
 * @returns {string} - Résumé
 */
export function generateEvidenceSummary(evidence) {
  if (!evidence) return "";

  const parts = [];

  // Niveau hiérarchie
  if (evidence.studyHierarchy?.highestLevel) {
    parts.push(`Niveau ${evidence.studyHierarchy.highestLevel}`);
  }

  // Nombre d'études
  const totalStudies = evidence.studyHierarchy?.studies?.reduce(
    (sum, s) => sum + (s.count || 0),
    0,
  );
  if (totalStudies) {
    parts.push(`${totalStudies} études`);
  }

  // Grade
  if (evidence.gradeLevel) {
    parts.push(`Grade ${evidence.gradeLevel}`);
  }

  return parts.join(" • ");
}

export default {
  formatEvidenceLevel,
  formatStudyType,
  formatHeterogeneity,
  formatRiskOfBias,
  formatReference,
  formatParticipantCount,
  formatPValue,
  formatConfidenceInterval,
  formatDate,
  formatAlertSeverity,
  truncateText,
  formatAmstarScore,
  generateEvidenceSummary,
};
