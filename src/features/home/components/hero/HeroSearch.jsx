import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import { useScrollOnMobileFocus } from "../../../../hooks/useScrollOnMobileFocus";
import { AllergySectionToggle } from "../../../allergens";
import { SearchHistoryModal } from "../../../history-search";
import { useSymptomSearchForm } from "../../../symptom-search/hooks/useSymptomSearchForm";
import SearchButtons from "../../../symptom-search/components/SearchButtons";
import SymptomSearchSection from "../../../symptom-search/components/SymptomSearchSection";

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
    results,
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
      <SearchButtons
        onSubmit={onSubmit}
        isDisabled={isDisabled}
        isLoading={isLoading}
        hasSubmitted={hasSubmitted}
        onHistoryOpen={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Affichage des résultats */}
      <AnimatePresence>
        {results !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-2 w-full rounded-lg border-2 p-4 md:max-w-xl"
            style={{
              borderColor:
                results && results.length > 0 ? "#10b981" : "#f59e0b",
              backgroundColor:
                results && results.length > 0
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(245, 158, 11, 0.1)",
            }}
          >
            {results && results.length > 0 ? (
              <div>
                <p className="text-lg font-semibold text-emerald-700 transition duration-300 ease-in-out dark:text-emerald-400">
                  ✅ {results.length} remède{results.length > 1 ? "s" : ""}{" "}
                  trouvé{results.length > 1 ? "s" : ""}
                </p>
                <p className="mt-1 text-sm text-neutral-600 transition duration-300 ease-in-out dark:text-neutral-400">
                  Consultez la console pour voir les détails (F12)
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-amber-700 transition duration-300 ease-in-out dark:text-amber-400">
                  ⚠️ Aucun remède trouvé
                </p>
                <p className="mt-1 text-sm text-neutral-600 transition duration-300 ease-in-out dark:text-neutral-400">
                  Essayez d&apos;autres symptômes ou reformulez votre recherche
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
