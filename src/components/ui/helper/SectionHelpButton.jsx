import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { GrCircleQuestion } from "react-icons/gr";

/**
 * SectionHelpButton - Bouton d'aide avec tooltip d'instruction
 *
 * Design identique à TagsInfoButton pour cohérence visuelle.
 * Affiche un petit bouton "?" avec tooltip personnalisable par section.
 *
 * @param {string} title - Titre du tooltip
 * @param {string} message - Message personnalisé à afficher dans le tooltip
 * @param {string} size - Taille du bouton ('sm' | 'md')
 * @param {string} iconColor - Couleur de l'icône (ex: 'text-red-600', 'text-sky-600')
 * @param {string} className - Classes CSS additionnelles
 */
function SectionHelpButton({
  title,
  message,
  size = "sm",
  iconColor = "",
  className = "",
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipClickOpen, setIsTooltipClickOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  // Gérer clic extérieur
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
    const tooltipWidth = window.innerWidth < 640 ? 288 : 320; // w-72 = 288px, w-80 = 320px
    const tooltipHeight = 80; // Estimation de la hauteur du tooltip
    const spacing = 8; // mb-2 = 8px

    let top = rect.top - tooltipHeight - spacing;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // Ajuster si déborde à gauche
    if (left < 8) {
      left = 8;
    }

    // Ajuster si déborde à droite
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }

    // Si pas assez de place en haut, afficher en bas
    if (top < 8) {
      top = rect.bottom + spacing;
    }

    setTooltipPosition({ top, left });
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!isTooltipClickOpen) {
      calculatePosition();
    }
    setIsTooltipClickOpen(!isTooltipClickOpen);
    setShowTooltip(!isTooltipClickOpen);
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
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <div ref={tooltipRef} className={`relative inline-flex ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={showTooltip}
        aria-label="Aide sur l'utilisation des termes"
        className={`group inline-flex cursor-help items-center gap-x-2 rounded-full bg-transparent font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 ${iconColor || "dark:text-white"} ${buttonSizeClasses[size]}`}
      >
        <GrCircleQuestion className="h-4 w-4 text-inherit" aria-hidden="true" />
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-80 rounded-lg bg-white px-4 py-3 shadow-2xl sm:w-80 lg:w-72 dark:bg-neutral-900"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <p className="text-sm font-semibold text-black dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

SectionHelpButton.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  iconColor: PropTypes.string,
  className: PropTypes.string,
};

export default SectionHelpButton;
