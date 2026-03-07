// Barrel export for product-result-detail-page feature

// Components
export { default as ProductResultDetailsHeader } from "./components/ProductResultDetailsHeader";
export { default as ProductResultDetailsNavigation } from "./components/ProductResultDetailsNavigation";
export { default as ProductResultDetailsAllergyWarning } from "./components/ProductResultDetailsAllergyWarning";
export { default as ProductResultDetailsRecommendedBanner } from "./components/ProductResultDetailsRecommendedBanner";
export { default as ProductResultDetailsPropertiesSection } from "./components/ProductResultDetailsPropertiesSection";
export { default as ProductResultDetailsSymptomsSection } from "./components/ProductResultDetailsSymptomsSection";
export { default as ProductResultDetailsUsagesList } from "./components/ProductResultDetailsUsagesList";
export { default as ProductResultDetailsContraindicationsSection } from "./components/ProductResultDetailsContraindicationsSection";
export { default as ProductResultDetailsTipsSection } from "./components/ProductResultDetailsTipsSection";
export { default as ProductResultDetailsAllergensSection } from "./components/ProductResultDetailsAllergensSection";
export { default as ImageCredit } from "./components/ImageCredit";
export { default as ProductResultDetailsEfficacyScore } from "./components/ProductResultDetailsEfficacyScore";
export { default as ProductResultDetailsInteractionsSection } from "./components/ProductResultDetailsInteractionsSection";
export { default as ProductResultDetailsSimilarProducts } from "./components/ProductResultDetailsSimilarProducts";
export { default as ProductResultDetailsSourcesSection } from "./components/ProductResultDetailsSourcesSection";

// Hooks
export { useProductDetails } from "./hooks/useProductDetails";
export { useProductAllergyCheck } from "./hooks/useProductAllergyCheck";

// Utils
export {
  isValidImageUrl,
  getSafeImageUrl,
} from "./utils/productImageValidator";
export { getTypeColors, generateProductSEOMeta } from "./utils/productHelpers";
