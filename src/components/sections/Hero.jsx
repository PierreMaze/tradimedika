// tradimedika-v1/src/components/sections/Hero.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiSprout } from "react-icons/gi";
import { IoMdArrowForward } from "react-icons/io";
import { BUTTON_PRIMARY_STYLES } from "../../constants/buttonStyles";
import { useScrollOnMobileFocus } from "../../hooks/useScrollOnMobileFocus";
import { useSymptomSubmit } from "../../hooks/useSymptomSubmit";
import { useSymptomTags } from "../../hooks/useSymptomTags";
import SymptomsSelector from "../input/SymptomsSelector";
import ListSymptomTag from "../tag/ListSymptomTag";

/**
 * Composant wrapper pour isoler le state des symptômes
 * Défini en dehors de Hero pour éviter re-création à chaque render
 *
 * Pure component : dépend uniquement de ses propres hooks internes
 * Pas besoin de React.memo car c'est un composant racine de composition
 */
function SymptomsSection() {
  const { selectedSymptoms, addSymptom, removeSymptom } = useSymptomTags();
  const { handleSubmit, isLoading, results, hasSubmitted } = useSymptomSubmit();

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

  const onSubmit = () => {
    handleSubmit(selectedSymptoms);
  };

  const isDisabled = selectedSymptoms.length === 0;

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-y-4">
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

      {/* Bouton de soumission */}
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
        className={`mx-auto flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out md:max-w-80 lg:text-base 2xl:text-lg ${
          isDisabled || isLoading
            ? "cursor-not-allowed bg-neutral-400 opacity-50 dark:bg-neutral-600"
            : BUTTON_PRIMARY_STYLES
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
    <div className="container mx-auto mt-8 mb-4 flex flex-col items-center justify-center px-4">
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
