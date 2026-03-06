import { useMemo } from "react";
import allergensList from "../../../data/allergensList.json";
import { useAllergies } from "../../allergens-search";

/**
 * Hook to check if product contains user allergens
 * @param {Object} product - The product object
 * @returns {Object} { hasUserAllergens, allergenNames, matchingAllergens }
 */
export function useProductAllergyCheck(product) {
  const { userAllergies, isFilteringEnabled } = useAllergies();

  const matchingAllergens = useMemo(() => {
    if (!product || !Array.isArray(product.allergens)) return [];
    return product.allergens.filter((allergenId) =>
      userAllergies.includes(allergenId),
    );
  }, [product, userAllergies]);

  const allergenNames = useMemo(() => {
    return matchingAllergens
      .map((id) => {
        const allergen = allergensList.find((a) => a.id === id);
        return allergen ? allergen.name.toLowerCase() : null;
      })
      .filter(Boolean)
      .join(", ");
  }, [matchingAllergens]);

  const hasUserAllergens =
    isFilteringEnabled &&
    userAllergies.length > 0 &&
    matchingAllergens.length > 0;

  return {
    hasUserAllergens,
    allergenNames,
    matchingAllergens,
  };
}
