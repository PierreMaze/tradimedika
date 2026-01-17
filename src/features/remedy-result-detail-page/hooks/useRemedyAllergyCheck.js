import { useMemo } from "react";
import allergensList from "../../../data/allergensList.json";
import { useAllergies } from "../../allergens-search";

/**
 * Hook to check if remedy contains user allergens
 * @param {Object} remedy - The remedy object
 * @returns {Object} { hasUserAllergens, allergenNames, matchingAllergens }
 */
export function useRemedyAllergyCheck(remedy) {
  const { userAllergies, isFilteringEnabled } = useAllergies();

  const matchingAllergens = useMemo(() => {
    if (!remedy || !Array.isArray(remedy.allergens)) return [];
    return remedy.allergens.filter((allergenId) =>
      userAllergies.includes(allergenId),
    );
  }, [remedy, userAllergies]);

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
