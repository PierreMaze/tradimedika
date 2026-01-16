import { useRef } from "react";

import { useScrollOnMobileFocus } from "../../../../hooks/useScrollOnMobileFocus";
import { AllergySectionToggle } from "../../../allergens";
import { SearchHistoryModal } from "../../../history-search";
import { useSymptomSearchForm } from "../../../symptom-search/hooks/useSymptomSearchForm";
import SymptomSearchSection from "../../../symptom-search/components/SymptomSearchSection";
import HeroButtons from "./HeroButtons";

/**
 * Composant HeroSearch - Section formulaire de recherche de symptômes
 *
 * Composant wrapper qui orchestre tous les sous-composants du formulaire :
 * - AllergySectionToggle (section allergies avec checkbox/dropdown)
 * - SymptomsForm (input avec autocomplétion)
 * - ListSymptomTag (liste des symptômes sélectionnés)
 * - SymptomCounter (compteur X/5)
 * - SearchButtons (boutons recherche + historique)
 * - SearchHistoryModal (modal d'historique)
 * - Affichage des résultats
 *
 * Utilise le hook useSymptomSearchForm pour centraliser toute la logique
 *
 * @returns {JSX.Element}
 */
export default function HeroSearch() {
  const {
    // Symptômes
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    // Allergies
    userAllergies,
    isFilteringEnabled,
    handleFilteringChange,
    // Historique
    history,
    removeSearch,
    clearHistory,
    handleSearchSelect,
    handleCloseHistory,
    // Soumission
    onSubmit,
    isLoading,
    hasSubmitted,
    // États UI
    isHistoryOpen,
    setIsHistoryOpen,
    isAllergySectionExpanded,
    setIsAllergySectionExpanded,
  } = useSymptomSearchForm();

  // Mobile scroll au focus de l'input
  const containerRef = useRef(null);
  const { handleScrollToContainer } = useScrollOnMobileFocus({
    behavior: "smooth",
    block: "start",
  });

  const handleInputFocus = () => {
    if (containerRef.current) {
      handleScrollToContainer(containerRef.current);
    }
  };

  const isDisabled = selectedSymptoms.length === 0;

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-y-4">
      {/* Section allergies avec checkbox + dropdown */}
      <AllergySectionToggle
        isFilteringEnabled={isFilteringEnabled}
        onFilteringChange={handleFilteringChange}
        userAllergies={userAllergies}
        isExpanded={isAllergySectionExpanded}
        onExpandChange={setIsAllergySectionExpanded}
      />

      {/* Section de recherche de symptômes */}
      <SymptomSearchSection
        onSymptomSelect={addSymptom}
        onRemoveSymptom={removeSymptom}
        selectedSymptoms={selectedSymptoms}
        onSubmit={onSubmit}
        onFocus={handleInputFocus}
        placeholder="Entrez vos symptômes (ex: fatigue, digestion...)"
      />

      {/* Boutons de soumission et historique */}
      <HeroButtons
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        isLoading={isLoading}
        hasSubmitted={hasSubmitted}
        onHistoryOpen={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Modal historique de recherche */}
      <SearchHistoryModal
        isOpen={isHistoryOpen}
        onClose={handleCloseHistory}
        history={history}
        onSearchSelect={handleSearchSelect}
        onClearHistory={clearHistory}
        onRemoveItem={removeSearch}
      />
    </div>
  );
}
