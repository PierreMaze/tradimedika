// tradimedika/src/components/ui/helper/TagsInfoButton.jsx

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { GrCircleQuestion } from "react-icons/gr";

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

  const handleButtonClick = () => {
    setIsTooltipClickOpen(!isTooltipClickOpen);
    setShowTooltip(!isTooltipClickOpen);
  };

  const handleMouseEnter = () => {
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
      ref={tooltipRef}
      className={`relative ${variant === "inline" ? "inline-flex" : "flex"} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        aria-expanded={showTooltip}
        aria-label={
          label
            ? `${label} - Informations`
            : "Informations sur les indications d'usage"
        }
        className={`group inline-flex cursor-help items-center gap-2 rounded-full bg-transparent font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 dark:text-white ${buttonSizeClasses[size]}`}
      >
        {label && (
          <span className="text-xs font-semibold text-neutral-700 lg:text-sm 2xl:text-base dark:text-neutral-200">
            {label}
          </span>
        )}
        <GrCircleQuestion className="h-4 w-4 text-inherit" aria-hidden="true" />
      </button>

      {showTooltip && (
        <div className="absolute -top-32 left-0 z-50 w-80 rounded-lg bg-white px-4 py-3 shadow-2xl lg:w-100 dark:bg-neutral-900">
          <p className="text-lg font-semibold text-black dark:text-white">
            Indications d&apos;usage
          </p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-800 lg:text-base dark:text-neutral-200">
            Les badges résument le niveau de fiabilité et les conditions
            d&apos;usage. Cliquez sur un badge pour en savoir plus.
          </p>
          <div className="absolute right-44 -bottom-2 h-0 w-0 border-t-8 border-r-8 border-l-8 border-t-neutral-100 border-r-transparent border-l-transparent lg:right-54 dark:border-t-neutral-900"></div>
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
