import { useState, useCallback } from "react";
import { INITIAL_FILTERS } from "../utils/filterRemedies";

/**
 * Hook personnalisé pour gérer l'état des filtres de remèdes
 *
 * Gère :
 * - L'état des filtres appliqués (effectifs dans la liste)
 * - L'état des filtres temporaires (dans la modal avant validation)
 * - La modal ouverte/fermée
 * - Les actions de toggle et reset
 *
 * @returns {Object} - État et fonctions de gestion des filtres
 */
export function useRemedyFilters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [tempFilters, setTempFilters] = useState(INITIAL_FILTERS);

  const openModal = useCallback(() => {
    setTempFilters(appliedFilters);
    setIsModalOpen(true);
  }, [appliedFilters]);

  const closeModal = useCallback(() => {
    setTempFilters(appliedFilters);
    setIsModalOpen(false);
  }, [appliedFilters]);

  const toggleTempFilter = useCallback((category, filterId) => {
    setTempFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filterId]: !prev[category][filterId],
      },
    }));
  }, []);

  const resetTempFilters = useCallback(() => {
    setTempFilters(INITIAL_FILTERS);
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(tempFilters);
    setIsModalOpen(false);
  }, [tempFilters]);

  const resetAndApplyFilters = useCallback(() => {
    setTempFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
  }, []);

  const hasAppliedFilters = Object.values(appliedFilters).some((category) =>
    Object.values(category).some((value) => value === true),
  );

  const getAppliedFiltersCount = useCallback(() => {
    let count = 0;
    Object.values(appliedFilters).forEach((category) => {
      Object.values(category).forEach((value) => {
        if (value === true) count++;
      });
    });
    return count;
  }, [appliedFilters]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    appliedFilters,
    tempFilters,
    toggleTempFilter,
    resetTempFilters,
    applyFilters,
    resetAndApplyFilters,
    hasAppliedFilters,
    appliedFiltersCount: getAppliedFiltersCount(),
  };
}
