import { useCallback, useState } from "react";

import { useAllergies } from "../../allergens-search";
import { useSearchHistory } from "../../history-search";
import { useSymptomSubmit } from "./useSymptomSubmit";
import { useSymptomTags } from "./useSymptomTags";

/**
 * Hook personnalisé pour gérer le formulaire de recherche de symptômes
 *
 * Centralise toute la logique de SymptomsSection :
 * - Gestion des symptômes sélectionnés (useSymptomTags)
 * - Gestion des allergies (useAllergies)
 * - Historique de recherche (useSearchHistory)
 * - Soumission et résultats (useSymptomSubmit)
 * - États des modales
 * - Callbacks partagés
 *
 * @returns {Object} État et fonctions pour gérer le formulaire
 */
export function useSymptomSearchForm() {
  // Hooks métier
  const { selectedSymptoms, addSymptom, removeSymptom, setSelectedSymptoms } =
    useSymptomTags();
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();
  const {
    userAllergies,
    setAllergies,
    isFilteringEnabled,
    enableFiltering,
    disableFiltering,
  } = useAllergies();
  const { handleSubmit, isLoading, results, hasSubmitted } =
    useSymptomSubmit(addSearch);

  // États locaux des modales
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAllergySectionExpanded, setIsAllergySectionExpanded] =
    useState(false);

  /**
   * Handler pour la soumission du formulaire
   */
  const onSubmit = useCallback(() => {
    handleSubmit(selectedSymptoms, userAllergies, isFilteringEnabled);
  }, [handleSubmit, selectedSymptoms, userAllergies, isFilteringEnabled]);

  /**
   * Handler pour relancer une recherche depuis l'historique
   * @param {Object} search - Entrée d'historique sélectionnée
   */
  const handleSearchSelect = useCallback(
    (search) => {
      // Remplacer les symptômes actuels par ceux de l'historique
      setSelectedSymptoms(search.symptoms);
      // Restaurer les allergies depuis l'historique (rétrocompatibilité avec ??)
      const historicAllergies = search.allergies ?? [];
      setAllergies(historicAllergies);
      // Si l'historique contient des allergies, cela signifie que le filtrage était activé
      const wasFilteringEnabled = historicAllergies.length > 0;
      if (wasFilteringEnabled) {
        enableFiltering();
      }
      // Soumettre automatiquement avec les symptômes, allergies et état filtrage
      handleSubmit(search.symptoms, historicAllergies, wasFilteringEnabled);
    },
    [handleSubmit, setSelectedSymptoms, setAllergies, enableFiltering],
  );

  /**
   * Handler pour fermer la modal d'historique
   */
  const handleCloseHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  /**
   * Handler pour gérer le changement de checkbox du filtrage allergies
   * @param {boolean} isChecked - État de la checkbox
   */
  const handleFilteringChange = useCallback(
    (isChecked) => {
      if (isChecked) {
        enableFiltering();
      } else {
        disableFiltering();
      }
    },
    [enableFiltering, disableFiltering],
  );

  return {
    // Symptômes
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    setSelectedSymptoms,
    // Allergies
    userAllergies,
    setAllergies,
    isFilteringEnabled,
    enableFiltering,
    disableFiltering,
    handleFilteringChange,
    // Historique
    history,
    addSearch,
    removeSearch,
    clearHistory,
    handleSearchSelect,
    handleCloseHistory,
    // Soumission
    onSubmit,
    isLoading,
    results,
    hasSubmitted,
    // États UI
    isHistoryOpen,
    setIsHistoryOpen,
    isAllergySectionExpanded,
    setIsAllergySectionExpanded,
  };
}
