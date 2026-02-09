// Barrel export for remedy-result-detail-page feature

// Components
export { default as RemedyResultDetailsHeader } from "./components/RemedyResultDetailsHeader";
export { default as RemedyResultDetailsNavigation } from "./components/RemedyResultDetailsNavigation";
export { default as RemedyResultDetailsAllergyWarning } from "./components/RemedyResultDetailsAllergyWarning";
export { default as RemedyResultDetailsRecommendedBanner } from "./components/RemedyResultDetailsRecommendedBanner";
export { default as RemedyResultDetailsPropertiesSection } from "./components/RemedyResultDetailsPropertiesSection";
export { default as RemedyResultDetailsSymptomsSection } from "./components/RemedyResultDetailsSymptomsSection";
export { default as RemedyResultDetailsUsagesList } from "./components/RemedyResultDetailsUsagesList";
export { default as RemedyResultDetailsContraindicationsSection } from "./components/RemedyResultDetailsContraindicationsSection";
export { default as RemedyResultDetailsTipsSection } from "./components/RemedyResultDetailsTipsSection";
export { default as RemedyResultDetailsAllergensSection } from "./components/RemedyResultDetailsAllergensSection";
export { default as ImageCredit } from "./components/ImageCredit";

// Hooks
export { useRemedyDetails } from "./hooks/useRemedyDetails";
export { useRemedyAllergyCheck } from "./hooks/useRemedyAllergyCheck";

// Utils
export { isValidImageUrl, getSafeImageUrl } from "./utils/remedyImageValidator";
export { getTypeColors, generateRemedySEOMeta } from "./utils/remedyHelpers";
