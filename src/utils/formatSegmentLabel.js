// src/utils/formatSegmentLabel.js

/**
 * Formate un segment d'URL en label lisible pour le BreadCrumb
 *
 * Transformations appliquées :
 * 1. Décode les caractères URI encodés (ex: %C3%A9 → é)
 * 2. Remplace les tirets par des espaces
 * 3. Capitalise la première lettre de chaque mot
 *
 * @param {string} segment - Segment d'URL brut (ex: "thé-vert", "th%C3%A9-vert", "huile-de-coco")
 * @returns {string} Label formaté (ex: "Thé Vert", "Huile De Coco")
 *
 * @example
 * formatSegmentLabel("thé-vert") // "Thé Vert"
 * formatSegmentLabel("th%C3%A9-vert") // "Thé Vert"
 * formatSegmentLabel("huile-de-coco") // "Huile De Coco"
 * formatSegmentLabel("menthe-poivr%C3%A9e") // "Menthe Poivrée"
 */
export function formatSegmentLabel(segment) {
  // Validation des entrées
  if (!segment || typeof segment !== "string") {
    console.warn(
      "[formatSegmentLabel] Segment invalide fourni à formatSegmentLabel",
    );
    return "";
  }

  try {
    // 1. Décoder les caractères URI (ex: %C3%A9 → é)
    const decoded = decodeURIComponent(segment);

    // 2. Remplacer les tirets par des espaces
    const withSpaces = decoded.replace(/-/g, " ");

    // 3. Capitaliser la première lettre de chaque mot
    const capitalized = withSpaces
      .split(" ")
      .map((word) => {
        if (!word) return word; // Gérer les espaces multiples
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return capitalized;
  } catch (error) {
    // Fallback si le décodage URI échoue
    console.warn(
      `[formatSegmentLabel] Erreur lors du décodage de "${segment}"`,
      error,
    );

    // Continuer sans décodage URI
    return segment
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => {
        if (!word) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}
