import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";

import { BUTTON_HISTORY } from "../../../../constants/buttonLabels";
import {
  BUTTON_PRIMARY_STYLES,
  BUTTON_SECONDARY_STYLES,
} from "../../../../constants/buttonStyles";
import { useCookieConsent } from "../../../cookie-consent";

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
  const { isHistoryAccepted } = useCookieConsent();
  const [showTooltip, setShowTooltip] = useState(false);

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
            ? "bg-neutral-400 text-neutral-950 opacity-50 dark:bg-neutral-600 dark:text-neutral-100"
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
      <div
        className="relative"
        onMouseEnter={() => !isHistoryAccepted && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.button
          onClick={isHistoryAccepted ? onHistoryOpen : undefined}
          aria-label={
            isHistoryAccepted
              ? `${BUTTON_HISTORY} - ${historyCount} recherches`
              : "Historique désactivé - Activez-le dans les paramètres"
          }
          aria-disabled={!isHistoryAccepted}
          whileHover={isHistoryAccepted}
          whileTap={isHistoryAccepted}
          transition={{ duration: 0.2 }}
          className={`group flex min-w-[280px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${
            isHistoryAccepted
              ? `cursor-pointer ${BUTTON_SECONDARY_STYLES}`
              : "cursor-not-allowed bg-neutral-400 text-neutral-950 opacity-50 dark:bg-neutral-600 dark:text-neutral-100"
          }`}
        >
          <span>
            <RiHistoryLine />
          </span>
          <span>{BUTTON_HISTORY}</span>
          {isHistoryAccepted && historyCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white transition-colors group-hover:bg-white group-hover:text-emerald-600 dark:bg-emerald-500 dark:group-hover:text-emerald-400">
              {historyCount}
            </span>
          )}
        </motion.button>

        {/* Tooltip */}
        {!isHistoryAccepted && showTooltip && (
          <div className="absolute -top-30 left-1/2 z-50 w-72 -translate-x-1/2 rounded-lg bg-neutral-900 px-4 py-3 text-center shadow-2xl dark:bg-neutral-100">
            <p className="font-semibold text-white dark:text-neutral-900">
              Historique désactivé
            </p>
            <p className="mt-1 text-xs text-neutral-200 dark:text-neutral-700">
              Activez-le dans Paramètres &gt; Gestion des cookies, il est
              nécessaire pour des raisons de confidentialité (RGPD)
            </p>
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-neutral-900 border-r-transparent border-l-transparent dark:border-t-neutral-100"></div>
          </div>
        )}
      </div>
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
