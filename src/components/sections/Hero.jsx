// tradimedika-v1/src/components/sections/Hero.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiSprout } from "react-icons/gi";
import { IoMdArrowDropdown, IoMdArrowForward } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";

import { BUTTON_HISTORY } from "../../constants/buttonLabels";
import {
  BUTTON_PRIMARY_STYLES,
  BUTTON_SECONDARY_STYLES,
} from "../../constants/buttonStyles";
import { useAllergies } from "../../context/AllergiesContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useScrollOnMobileFocus } from "../../hooks/useScrollOnMobileFocus";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { useSymptomSubmit } from "../../hooks/useSymptomSubmit";
import { useSymptomTags } from "../../hooks/useSymptomTags";
import AllergySelector from "../input/AllergySelector";
import SymptomsSelector from "../input/SymptomsSelector";
import SearchHistoryModal from "../search/SearchHistoryModal";
import ListSymptomTag from "../tag/ListSymptomTag";

/**
 * Composant wrapper pour isoler le state des symptômes
 * Défini en dehors de Hero pour éviter re-création à chaque render
 *
 * Pure component : dépend uniquement de ses propres hooks internes
 * Pas besoin de React.memo car c'est un composant racine de composition
 */
function SymptomsSection() {
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAllergySectionExpanded, setIsAllergySectionExpanded] =
    useState(false);

  // Ref pour la section allergies complète
  const allergySectionRef = useRef(null);

  // Mobile scroll au focus de l'input
  const containerRef = useRef(null);
  const { handleScrollToContainer } = useScrollOnMobileFocus({
    behavior: "smooth",
    block: "start",
  });

  const handleInputFocus = useCallback(() => {
    if (containerRef.current) {
      handleScrollToContainer(containerRef.current);
    }
  }, [handleScrollToContainer]);

  const onSubmit = useCallback(() => {
    handleSubmit(selectedSymptoms, userAllergies, isFilteringEnabled);
  }, [handleSubmit, selectedSymptoms, userAllergies, isFilteringEnabled]);

  // Relancer une recherche depuis l'historique
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

  const handleCloseHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  // Fermer la section allergies au clic extérieur (refactoré avec hook réutilisable)
  useClickOutside(
    allergySectionRef,
    () => setIsAllergySectionExpanded(false),
    isAllergySectionExpanded, // Actif seulement quand la section est expanded
  );

  const isDisabled = selectedSymptoms.length === 0;

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-y-4">
      {/* Section allergies avec checkbox + dropdown */}
      <div
        ref={allergySectionRef}
        className="relative mx-auto w-full max-w-2xl space-y-3"
      >
        {/* Checkbox + Badge + Dropdown button */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={isFilteringEnabled}
              onChange={() => {
                if (isFilteringEnabled) {
                  // Décocher : désactiver le filtrage + fermer le dropdown
                  disableFiltering();
                  setIsAllergySectionExpanded(false);
                } else {
                  // Cocher : activer le filtrage + ouvrir le dropdown
                  enableFiltering();
                  setIsAllergySectionExpanded(true);
                }
              }}
              className="h-4 w-4 cursor-pointer border-neutral-300 text-emerald-600 accent-emerald-700 focus:ring-2 dark:border-neutral-600 dark:accent-emerald-500"
              aria-label="Activer le filtrage des allergies"
            />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Vous avez des allergies ?
            </span>
          </label>
          {/* Compteur + Bouton (visible uniquement si checkbox cochée) */}
          {isFilteringEnabled && (
            <div className="flex flex-row">
              {/* Badge compteur (visible quand allergies > 0) */}
              {userAllergies.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 lg:text-sm 2xl:text-base dark:bg-emerald-900/40 dark:text-emerald-300"
                >
                  {userAllergies.length} allergie
                  {userAllergies.length > 1 ? "s" : ""}
                </motion.span>
              )}

              {/* Bouton dropdown pour expand/collapse */}
              <button
                onClick={() =>
                  setIsAllergySectionExpanded(!isAllergySectionExpanded)
                }
                aria-expanded={isAllergySectionExpanded}
                aria-label={
                  isAllergySectionExpanded
                    ? "Masquer les allergies"
                    : "Afficher les allergies"
                }
                className="ml-auto flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-neutral-600 transition-colors hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-500"
              >
                <span className="text-xs font-medium lg:text-sm 2xl:text-base">
                  {isAllergySectionExpanded ? "Masquer" : "Afficher"}
                </span>
                <motion.div
                  animate={{ rotate: isAllergySectionExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoMdArrowDropdown className="text-lg" />
                </motion.div>
              </button>
            </div>
          )}
        </div>

        {/* Section collapse avec AllergySelector */}
        <AnimatePresence>
          {isAllergySectionExpanded && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "top" }}
            >
              <div className="dark:bg-dark rounded-lg border-2 border-dashed border-emerald-600 bg-neutral-50 p-4 dark:border-emerald-500">
                <AllergySelector />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SymptomsSelector
        onSymptomSelect={addSymptom}
        onRemoveSymptom={removeSymptom}
        selectedSymptoms={selectedSymptoms}
        onSubmit={onSubmit}
        onFocus={handleInputFocus}
        placeholder="Entrez vos symptômes (ex: fatigue, digestion...)"
      />

      <ListSymptomTag
        symptoms={selectedSymptoms}
        onRemoveSymptom={removeSymptom}
      />
      {/* Compteur de symptômes */}
      {selectedSymptoms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <span className="text-sm font-medium text-neutral-600 transition duration-300 ease-in-out dark:text-neutral-400">
            {selectedSymptoms.length}/5 symptômes sélectionnés
          </span>
        </motion.div>
      )}

      {/* Boutons de soumission et historique */}
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row lg:mt-2">
        {/* Bouton principal de recherche */}
        <motion.button
          onClick={onSubmit}
          disabled={isDisabled || isLoading}
          aria-label={
            isDisabled
              ? "Sélectionnez au moins un symptôme"
              : "Découvrir les remèdes naturels"
          }
          aria-busy={isLoading}
          aria-disabled={isDisabled}
          whileHover={!isDisabled && !isLoading}
          whileTap={!isDisabled && !isLoading}
          transition={{ duration: 0.2 }}
          className={`flex min-w-[280px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${
            isDisabled || isLoading
              ? "bg-neutral-400 opacity-50 dark:bg-neutral-600"
              : `cursor-pointer ${BUTTON_PRIMARY_STYLES}`
          }`}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
              />
              <span>Recherche en cours...</span>
            </>
          ) : hasSubmitted ? (
            <>
              <FaCheck className="text-xl" />
              <span>Recherche effectuée</span>
            </>
          ) : (
            <>
              <span>Découvrir nos solutions</span>
              <IoMdArrowForward className="text-xl" />
            </>
          )}
        </motion.button>

        {/* Bouton historique */}
        <motion.button
          onClick={() => setIsHistoryOpen(true)}
          aria-label={`${BUTTON_HISTORY} - ${history.length} recherches`}
          whileHover
          whileTap
          transition={{ duration: 0.2 }}
          className={`group flex min-w-[280px] cursor-pointer items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${BUTTON_SECONDARY_STYLES}`}
        >
          <span>
            <RiHistoryLine />
          </span>
          <span>{BUTTON_HISTORY}</span>
          {history.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white transition-colors group-hover:bg-white group-hover:text-emerald-600 dark:bg-emerald-500 dark:group-hover:text-emerald-400">
              {history.length}
            </span>
          )}
        </motion.button>
      </div>

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

/**
 * Composant Hero principal
 *
 * Pure component de composition - Ne contient que de la structure et de la présentation
 * Le state est isolé dans SymptomsSection pour éviter les re-renders inutiles
 */
export default function Hero() {
  return (
    <div className="mx-auto mt-8 mb-4 flex h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-20 flex flex-col items-center justify-center gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16 2xl:gap-y-20"
      >
        <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
          {/* Tag "Medecine douce & naturelle" */}
          <div className="mx-auto w-fit">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-dark/60 text-dark flex items-center gap-2 rounded-lg border-2 bg-white px-4 py-2 shadow-md transition duration-300 ease-in-out dark:border-emerald-500/60 dark:bg-emerald-950 dark:text-emerald-400"
            >
              <GiSprout className="text-lg text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-400" />
              <span className="font-sans text-sm font-semibold lg:text-base 2xl:text-lg">
                Méthode Douce & Naturelle
              </span>
            </motion.div>
          </div>
          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
              <span className="text-dark dark:text-light transition duration-300 ease-in-out">
                Soulagez vos symptômes
              </span>
              <br />
              <span className="text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-500">
                naturellement
              </span>
            </h1>
          </motion.div>

          {/* Texte descriptif */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl text-center text-base text-neutral-600 transition duration-300 ease-in-out lg:text-lg 2xl:max-w-4xl 2xl:text-2xl dark:text-neutral-400"
          >
            Les bienfaits de la méthode douce pour traiter vos maux du
            quotidien.
          </motion.p>
        </div>

        {/* GROUP 2: Symptom Selector with Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <SymptomsSection />
        </motion.div>

        {/* GROUP 3: Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-12"
        >
          {[
            "+100 plantes & aliments",
            "Santé naturelle",
            "Gratuit",
            "Ne stocke pas vos données",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <FaCheck className="text-sm text-emerald-600/80 dark:text-emerald-500/80" />
              <span className="text-sm font-semibold text-neutral-600 transition duration-300 ease-in-out lg:text-base 2xl:text-lg dark:text-neutral-400">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
