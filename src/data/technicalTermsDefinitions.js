/**
 * Base de données centralisée des définitions de termes techniques
 * Utilisée par les popovers TermPopover pour afficher les explications
 *
 * Format : IDs en kebab-case pour cohérence avec les slugs
 * Catégories : properties, allergens, medical (un terme peut avoir plusieurs catégories)
 * Structure : { name, definition, wikipediaUrl, categories: ["cat1", "cat2"] }
 */

export const TECHNICAL_TERMS_DATA = {
  // ==================== PROPRIÉTÉS THÉRAPEUTIQUES ====================

  propriété: {
    name: "Propriété",
    definition:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante finibus facilisis. Nullam nec metus vel ante finibus facilisis.",
    wikipediaUrl: "https://www.wikiphyto.org/wiki/Accueil",
    categories: ["properties"],
  },

  // ==================== ALLERGÈNES ET SENSIBILITÉS ====================

  allergie: {
    name: "Allergie",
    definition:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante finibus facilisis. Nullam nec metus vel ante finibus facilisis.",
    wikipediaUrl: "https://www.wikiphyto.org/wiki/Accueil",
    categories: ["allergens"],
  },

  // ==================== TERMES MÉDICAUX ====================

  consectetur: {
    name: "Lorem",
    definition:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante finibus facilisis. Nullam nec metus vel ante finibus facilisis.",
    wikipediaUrl: "https://www.wikiphyto.org/wiki/Accueil",
    categories: ["medical"],
  },
};

/**
 * Configuration des catégories pour l'affichage organisé
 * (Utile si on ajoute un popover modal avec accordéons plus tard)
 */
export const TECHNICAL_TERMS_CATEGORIES = [
  {
    id: "properties",
    label: "Propriétés thérapeutiques",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("properties"))
      .map(([id, data]) => ({ id, ...data })),
  },
  {
    id: "allergens",
    label: "Allergènes et sensibilités",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("allergens"))
      .map(([id, data]) => ({ id, ...data })),
  },
  {
    id: "medical",
    label: "Symptômes et conditions",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("medical"))
      .map(([id, data]) => ({ id, ...data })),
  },
];
