import { useCallback, useMemo, useReducer } from "react";
import db from "../../../data/db.json";
import useGAEvent from "../../../hooks/useGAEvent";
import {
  advancedFilterProducts,
  extractUniqueProperties,
  sortProducts,
} from "../utils/advancedFilterProducts";

const INITIAL_STATE = {
  textSearch: "",
  alphabet: [],
  types: {},
  categories: {},
  properties: {},
  pregnancy: {},
  childrenAge: {},
  excludedAllergens: [],
  evidenceLevel: {},
  verification: {},
  sortBy: "name",
  sortOrder: "asc",
};

function searchReducer(state, action) {
  switch (action.type) {
    case "SET_TEXT_SEARCH":
      return { ...state, textSearch: action.payload };

    case "TOGGLE_FILTER": {
      const { category, filterId } = action.payload;
      return {
        ...state,
        [category]: {
          ...state[category],
          [filterId]: !state[category][filterId],
        },
      };
    }

    case "TOGGLE_ALLERGEN": {
      const allergenId = action.payload;
      const current = state.excludedAllergens;
      const next = current.includes(allergenId)
        ? current.filter((id) => id !== allergenId)
        : [...current, allergenId];
      return { ...state, excludedAllergens: next };
    }

    case "TOGGLE_ALPHABET": {
      const letter = action.payload;
      const current = state.alphabet;
      const next = current.includes(letter)
        ? current.filter((l) => l !== letter)
        : [...current, letter];
      return { ...state, alphabet: next };
    }

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    case "RESET_ALL":
      return { ...INITIAL_STATE };

    case "RESET_CATEGORY":
      if (
        action.payload === "excludedAllergens" ||
        action.payload === "alphabet"
      ) {
        return { ...state, [action.payload]: [] };
      }
      return { ...state, [action.payload]: {} };

    default:
      return state;
  }
}

/**
 * Hook principal pour la recherche avancée
 * Orchestre tous les filtres et le tri avec useReducer
 */
export function useAdvancedSearch() {
  const trackEvent = useGAEvent();
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  // Propriétés uniques extraites de tous les produits
  const uniqueProperties = useMemo(() => extractUniqueProperties(db), []);

  // Résultats filtrés
  const filteredProducts = useMemo(
    () => advancedFilterProducts(db, state),
    [state],
  );

  // Résultats triés
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, state.sortBy, state.sortOrder),
    [filteredProducts, state.sortBy, state.sortOrder],
  );

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (state.textSearch.trim()) count++;
    [
      "types",
      "categories",
      "properties",
      "pregnancy",
      "childrenAge",
      "evidenceLevel",
      "verification",
    ].forEach((key) => {
      Object.values(state[key]).forEach((v) => {
        if (v === true) count++;
      });
    });
    count += state.excludedAllergens.length;
    count += state.alphabet.length;
    return count;
  }, [state]);

  const setTextSearch = useCallback((value) => {
    dispatch({ type: "SET_TEXT_SEARCH", payload: value });
  }, []);

  const toggleFilter = useCallback((category, filterId) => {
    dispatch({ type: "TOGGLE_FILTER", payload: { category, filterId } });
  }, []);

  const toggleAllergen = useCallback((allergenId) => {
    dispatch({ type: "TOGGLE_ALLERGEN", payload: allergenId });
  }, []);

  const toggleAlphabet = useCallback((letter) => {
    dispatch({ type: "TOGGLE_ALPHABET", payload: letter });
  }, []);

  const setSort = useCallback((sortBy, sortOrder) => {
    dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
    trackEvent("advanced_search_reset");
  }, [trackEvent]);

  const resetCategory = useCallback((category) => {
    dispatch({ type: "RESET_CATEGORY", payload: category });
  }, []);

  return {
    // State
    filters: state,
    filteredProducts: sortedProducts,
    totalProducts: db.length,
    activeFiltersCount,
    uniqueProperties,

    // Actions
    setTextSearch,
    toggleFilter,
    toggleAllergen,
    toggleAlphabet,
    setSort,
    resetAll,
    resetCategory,
  };
}
