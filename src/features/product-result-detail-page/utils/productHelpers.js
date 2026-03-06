/**
 * Returns type color classes for product types
 * @returns {Object} Mapping of product types to Tailwind classes
 */
export function getTypeColors() {
  return {
    aliment:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    boisson: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    épice:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    plante: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };
}

/**
 * Generates SEO metadata for a product
 * @param {Object} product - The product object
 * @param {string} slug - The product slug
 * @returns {Object} SEO metadata (pageTitle, pageDescription, canonicalUrl)
 */
export function generateProductSEOMeta(product, slug) {
  const pageTitle = `${product.name} - Produit naturel | TRADIMEDIKA`;
  const pageDescription =
    product.description ||
    `Découvrez ${product.name}, un produit naturel de type ${product.type}`;
  const canonicalUrl = `https://tradimedika.com/products/${slug}`;

  return { pageTitle, pageDescription, canonicalUrl };
}
