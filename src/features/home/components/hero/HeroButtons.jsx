import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";

import { BUTTON_HISTORY } from "../../../../constants/buttonLabels";
import {
  BUTTON_PRIMARY_STYLES,
  BUTTON_SECONDARY_STYLES,
} from "../../../../constants/buttonStyles";

/**
 * Composant HeroButtons - Boutons de recherche et historique
 *
 * Affiche :
 * - Bouton principal de recherche avec 3 états (normal, loading, completed)
 * - Bouton d'accès à l'historique avec badge de compteur
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback lors du clic sur le bouton de recherche
 * @param {boolean} props.isDisabled - Si true, désactive le bouton de recherche
 * @param {boolean} props.isLoading - Si true, affiche l'état de chargement
 * @param {boolean} props.hasSubmitted - Si true, affiche l'état de succès
 * @param {Function} props.onHistoryOpen - Callback lors du clic sur le bouton d'historique
 * @param {number} props.historyCount - Nombre d'entrées dans l'historique
 * @returns {JSX.Element}
 */
export default function HeroButtons({
  onSubmit,
  isDisabled,
  isLoading,
  hasSubmitted,
  onHistoryOpen,
  historyCount,
}) {
  return (
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
        onClick={onHistoryOpen}
        aria-label={`${BUTTON_HISTORY} - ${historyCount} recherches`}
        whileHover
        whileTap
        transition={{ duration: 0.2 }}
        className={`group flex min-w-[280px] cursor-pointer items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${BUTTON_SECONDARY_STYLES}`}
      >
        <span>
          <RiHistoryLine />
        </span>
        <span>{BUTTON_HISTORY}</span>
        {historyCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white transition-colors group-hover:bg-white group-hover:text-emerald-600 dark:bg-emerald-500 dark:group-hover:text-emerald-400">
            {historyCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}

HeroButtons.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  onHistoryOpen: PropTypes.func.isRequired,
  historyCount: PropTypes.number.isRequired,
};
