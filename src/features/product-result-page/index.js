// Composants
export { default as ProductCard } from "./components/ProductCard";
export { default as ProductResultList } from "./components/ProductResultList";
export { default as ProductResultNotFound } from "./components/ProductResultNotFound";
export { default as FilterProductResult } from "./components/FilterProductResult";
export { default as CatalogSearch } from "./components/CatalogSearch";

// Utils
export {
  findMatchingProducts,
  getProductBySlug,
  generateSlug,
} from "./utils/productMatcher";
