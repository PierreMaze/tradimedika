// tradimedika/src/components/ui/helper/TagsInfoButton.jsx

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { GrCircleQuestion } from "react-icons/gr";
import { Z_INDEX_CLASSES } from "../../../constants/zIndexLevels";

/**
 * TagsInfoButton Component
 *
 * Bouton affichant un tooltip avec définition générale des indications d'usage.
 * Pattern simplifié inspiré de HeroButtons.jsx.
 *
 * Props:
 * - label: Texte à afficher avant l'icône (optionnel)
 * - size: 'sm' | 'md' (défaut: 'md')
 * - variant: 'inline' | 'standalone' (défaut: 'inline')
 * - className: Classes CSS additionnelles
 *
 * Comportement:
 * - Hover: Affiche le tooltip
 * - Clic: Verrouille le tooltip (reste affiché)
 * - Clic extérieur: Déverrouille et masque le tooltip
 * - MouseLeave: Masque le tooltip (si non verrouillé)
 *
 * Accessibilité:
 * - aria-expanded pour indiquer l'état
 * - aria-label descriptif
 * - Cibles tactiles ≥ 44x44px
 */
function TagsInfoButton({
  label,
  size = "md",
  variant = "inline",
  className = "mt-4 -mb-2",
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipClickOpen, setIsTooltipClickOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        isTooltipClickOpen
      ) {
        setIsTooltipClickOpen(false);
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTooltipClickOpen]);

  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const tooltipWidth = window.innerWidth < 1024 ? 320 : 400; // w-80 = 320px, lg:w-100 = 400px
    const tooltipHeight = 128; // Estimation (~8rem)
    const spacing = 8;

    let top = rect.top - tooltipHeight - spacing;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // Ajuster si déborde à gauche
    if (left < spacing) {
      left = spacing;
    }

    // Ajuster si déborde à droite
    if (left + tooltipWidth > window.innerWidth - spacing) {
      left = window.innerWidth - tooltipWidth - spacing;
    }

    // Si pas assez de place en haut, afficher en bas
    if (top < spacing) {
      top = rect.bottom + spacing;
    }

    setTooltipPosition({ top, left });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isTooltipClickOpen) {
      calculatePosition();
    }
    setIsTooltipClickOpen(!isTooltipClickOpen);
    setShowTooltip(!isTooltipClickOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (!isTooltipClickOpen) {
        calculatePosition();
      }
      setIsTooltipClickOpen(!isTooltipClickOpen);
      setShowTooltip(!isTooltipClickOpen);
    }
  };

  const handleMouseEnter = () => {
    calculatePosition();
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!isTooltipClickOpen) {
      setShowTooltip(false);
    }
  };

  const buttonSizeClasses = {
    sm: "min-h-[44px] min-w-[44px] h-fit w-fit text-sm",
    md: "min-h-[44px] min-w-[44px] h-fit w-fit text-base",
  };

  return (
    <div
      className={`relative ${variant === "inline" ? "inline-flex" : "flex"} ${className}`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={showTooltip}
        aria-label={
          label
            ? `${label} - Informations`
            : "Informations sur les indications d'usage"
        }
        className={`group transition-color inline-flex cursor-help items-center gap-2 rounded-full bg-transparent font-bold duration-150 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 dark:text-white ${buttonSizeClasses[size]}`}
      >
        {label && (
          <span className="text-xs font-semibold text-neutral-700 lg:text-sm 2xl:text-base dark:text-neutral-200">
            {label}
          </span>
        )}
        <GrCircleQuestion className="h-4 w-4 text-inherit" aria-hidden="true" />
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className={`fixed ${Z_INDEX_CLASSES.TOOLTIP} w-80 rounded-lg bg-white px-4 py-3 shadow-2xl lg:w-100 dark:bg-neutral-900`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p className="text-lg font-semibold text-black dark:text-white">
            Indications d&apos;usage
          </p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-800 lg:text-base dark:text-neutral-200">
            Les badges résument le niveau de fiabilité et les conditions
            d&apos;usage. Cliquez sur un badge pour en savoir plus.
          </p>
        </div>
      )}
    </div>
  );
}

TagsInfoButton.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  variant: PropTypes.oneOf(["inline", "standalone"]),
  className: PropTypes.string,
};

export default TagsInfoButton;
