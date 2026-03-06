import { useCallback, useState } from "react";

import { useAllergies } from "../../allergens-search";
import { useConsent } from "../../consent";
import { useSearchHistory } from "../../history-search";
import { useProductSubmit } from "./useProductSubmit";
import { useProductTags } from "./useProductTags";

/**
 * Hook personnalisé pour gérer le formulaire de recherche de produits
 *
 * Centralise toute la logique :
 * - Gestion des produits sélectionnés (useProductTags)
 * - Gestion des allergies (useAllergies)
 * - Historique de recherche (useSearchHistory)
 * - Soumission et résultats (useProductSubmit)
 * - États des modales
 * - Callbacks partagés
 *
 * @returns {Object} État et fonctions pour gérer le formulaire
 */
export function useProductSearchForm() {
  // Hooks métier
  const { selectedProducts, addProduct, removeProduct, setSelectedProducts } =
    useProductTags();
  const { history, addSearch, removeSearch, clearHistory } = useSearchHistory();
  const {
    userAllergies,
    setAllergies,
    isFilteringEnabled,
    enableFiltering,
    disableFiltering,
  } = useAllergies();
  const { hasConsent, openConsentModal } = useConsent();
  const { handleSubmit, isLoading, results, hasSubmitted } =
    useProductSubmit(addSearch);

  // États locaux des modales
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAllergySectionExpanded, setIsAllergySectionExpanded] =
    useState(false);

  /**
   * Handler pour la soumission du formulaire
   */
  const onSubmit = useCallback(() => {
    if (!hasConsent) {
      openConsentModal();
      return;
    }
    handleSubmit(selectedProducts);
  }, [hasConsent, openConsentModal, handleSubmit, selectedProducts]);

  /**
   * Handler pour relancer une recherche depuis l'historique
   * @param {Object} search - Entrée d'historique sélectionnée
   */
  const handleSearchSelect = useCallback(
    (search) => {
      if (!hasConsent) {
        openConsentModal();
        return;
      }
      // Remplacer les produits actuels par ceux de l'historique
      setSelectedProducts(search.products);
      // Soumettre automatiquement
      handleSubmit(search.products);
    },
    [hasConsent, openConsentModal, handleSubmit, setSelectedProducts],
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
    // Produits
    selectedProducts,
    addProduct,
    removeProduct,
    setSelectedProducts,
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
    // Consentement
    hasConsent,
  };
}
