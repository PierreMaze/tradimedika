import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { RiHistoryLine } from "react-icons/ri";

import { BUTTON_HISTORY } from "../../../../constants/buttonLabels";
import {
  BUTTON_PRIMARY_STYLES,
  BUTTON_SECONDARY_STYLES,
} from "../../../../constants/buttonStyles";
import { useCookieConsent } from "../../../cookie-consent";
import { useSettingsModal } from "../../../settings";

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
  const { openSettingsWithCookies } = useSettingsModal();

  // States pour le tooltip du bouton historique
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipClickOpen, setIsTooltipClickOpen] = useState(false);
  const tooltipRef = useRef(null);

  // States pour le tooltip du bouton principal
  const [showPrimaryTooltip, setShowPrimaryTooltip] = useState(false);
  const [isPrimaryTooltipClickOpen, setIsPrimaryTooltipClickOpen] =
    useState(false);
  const primaryTooltipRef = useRef(null);

  // Fermer le tooltip historique au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        isTooltipClickOpen
      ) {
        setIsTooltipClickOpen(false);
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTooltipClickOpen]);

  // Fermer le tooltip du bouton principal au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        primaryTooltipRef.current &&
        !primaryTooltipRef.current.contains(event.target) &&
        isPrimaryTooltipClickOpen
      ) {
        setIsPrimaryTooltipClickOpen(false);
        setShowPrimaryTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPrimaryTooltipClickOpen]);

  // Handlers pour le bouton principal
  const handlePrimaryButtonClick = (e) => {
    if (isDisabled && !isLoading) {
      e.preventDefault();
      setIsPrimaryTooltipClickOpen(!isPrimaryTooltipClickOpen);
      setShowPrimaryTooltip(!isPrimaryTooltipClickOpen);
    } else {
      onSubmit(e);
    }
  };

  const handlePrimaryMouseEnter = () => {
    if (isDisabled && !isLoading) {
      setShowPrimaryTooltip(true);
    }
  };

  const handlePrimaryMouseLeave = () => {
    if (isDisabled && !isLoading && !isPrimaryTooltipClickOpen) {
      setShowPrimaryTooltip(false);
    }
  };

  // Handlers pour le bouton historique
  const handleHistoryButtonClick = () => {
    if (!isHistoryAccepted) {
      setIsTooltipClickOpen(!isTooltipClickOpen);
      setShowTooltip(!isTooltipClickOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isHistoryAccepted) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isHistoryAccepted && !isTooltipClickOpen) {
      setShowTooltip(false);
    }
  };

  const handleOpenSettings = (e) => {
    e.stopPropagation();
    openSettingsWithCookies();
    setIsTooltipClickOpen(false);
    setShowTooltip(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row lg:mt-2">
      {/* Bouton principal de recherche */}
      <div
        ref={primaryTooltipRef}
        className="relative"
        onMouseEnter={handlePrimaryMouseEnter}
        onMouseLeave={handlePrimaryMouseLeave}
      >
        <motion.button
          onClick={handlePrimaryButtonClick}
          disabled={isLoading}
          aria-label={
            isDisabled
              ? "Sélectionnez au moins un symptôme"
              : "Découvrir les remèdes naturels"
          }
          aria-busy={isLoading}
          aria-disabled={isDisabled}
          aria-expanded={
            isDisabled && !isLoading ? showPrimaryTooltip : undefined
          }
          whileHover={!isDisabled && !isLoading}
          whileTap={!isDisabled && !isLoading}
          transition={{ duration: 0.2 }}
          className={`flex min-w-[280px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${
            isDisabled || isLoading
              ? "cursor-pointer bg-neutral-400 text-neutral-950 opacity-50 dark:bg-neutral-600 dark:text-neutral-100"
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

        {/* Tooltip pour bouton désactivé */}
        {isDisabled && !isLoading && showPrimaryTooltip && (
          <div className="absolute -top-30 left-1/2 z-50 w-72 -translate-x-1/2 rounded-lg bg-neutral-100 px-4 py-3 text-center shadow-2xl dark:bg-neutral-900">
            <p className="font-semibold text-black dark:text-white">
              Aucun symptôme sélectionné
            </p>
            <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
              Veuillez choisir au moins un symptôme dans le champ de recherche
              ci-dessus pour découvrir nos remèdes naturels
            </p>
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-neutral-100 border-r-transparent border-l-transparent dark:border-t-neutral-900"></div>
          </div>
        )}
      </div>

      {/* Bouton historique */}
      <div
        ref={tooltipRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.button
          onClick={isHistoryAccepted ? onHistoryOpen : handleHistoryButtonClick}
          aria-label={
            isHistoryAccepted
              ? `${BUTTON_HISTORY} - ${historyCount} recherches`
              : "Historique désactivé - Activez-le dans les paramètres"
          }
          aria-disabled={!isHistoryAccepted}
          aria-expanded={!isHistoryAccepted ? showTooltip : undefined}
          whileHover={isHistoryAccepted}
          whileTap={isHistoryAccepted}
          transition={{ duration: 0.2 }}
          className={`group flex min-w-[280px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-semibold shadow-lg transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${
            isHistoryAccepted
              ? `cursor-pointer ${BUTTON_SECONDARY_STYLES}`
              : "cursor-pointer bg-neutral-400 text-neutral-950 opacity-50 dark:bg-neutral-600 dark:text-neutral-100"
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
          <div className="absolute -top-40 left-1/2 z-50 w-72 -translate-x-1/2 rounded-lg bg-neutral-100 px-4 py-3 text-center shadow-2xl dark:bg-neutral-900">
            <p className="font-semibold text-black dark:text-white">
              Historique désactivé
            </p>
            <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
              Activez-le dans Paramètres &gt; Gestion des cookies, il est
              nécessaire pour des raisons de confidentialité (RGPD)
            </p>
            <button
              onClick={handleOpenSettings}
              className="mt-3 w-full cursor-pointer rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
            >
              Ouvrir les paramètres
            </button>
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-neutral-100 border-r-transparent border-l-transparent dark:border-t-neutral-900"></div>
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
