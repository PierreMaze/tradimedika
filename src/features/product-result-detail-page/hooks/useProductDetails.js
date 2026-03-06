import { useMemo } from "react";
import db from "../../../data/db.json";
import { getProductBySlug } from "../../product-result-page";
import { getSafeImageUrl } from "../utils/productImageValidator";

/**
 * Hook to fetch and validate product details by slug
 * @param {string} slug - The product slug from URL params
 * @returns {Object} { product, safeImageUrl, notFound }
 */
export function useProductDetails(slug) {
  const product = useMemo(() => getProductBySlug(slug, db), [slug]);

  const safeImageUrl = useMemo(
    () => (product ? getSafeImageUrl(product.image) : null),
    [product],
  );

  return {
    product,
    safeImageUrl,
    notFound: !product,
  };
}
