import PropTypes from "prop-types"; // Validation des props
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Z_INDEX_CLASSES } from "../../../constants/zIndexLevels";
import { TECHNICAL_TERMS_DATA } from "../../../data/technicalTermsDefinitions";
import { useExternalLink } from "../../../features/external-link/hooks/useExternalLink";
import { useHoverDelay } from "../../../utils/hoverDelay";

/**
 * TermPopover - Popover interactif pour afficher les définitions de termes techniques
 *
 * Comportement:
 * - Desktop: Hover (300ms délai) ou clic pour afficher
 * - Mobile: Clic pour afficher
 * - Échap pour fermer, focus retourne au terme
 * - Lien Wikipedia cliquable dans le popover
 *
 * Accessibilité:
 * - role="dialog" (car contenu interactif avec lien)
 * - aria-haspopup="dialog" sur le trigger
 * - Navigation clavier: Tab vers lien, Échap ferme
 * - Focus management complet
 *
 * @param {string} termId - ID du terme en kebab-case (ex: "antioxydant")
 * @param {ReactNode} children - Contenu wrappé (le texte du terme)
 * @param {string} variant - Type de terme (property, allergen, medical)
 * @param {string} className - Classes CSS additionnelles
 */
function TermPopover({
  termId,
  children,
  variant = "property",
  className = "",
}) {
  const [showPopover, setShowPopover] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const titleId = useId();
  const { openConfirmation } = useExternalLink();

  // Normaliser le termId et récupérer la définition
  const normalizedTermId = termId.toLowerCase().replace(/\s+/g, "-");
  const termData = TECHNICAL_TERMS_DATA[normalizedTermId];

  // Utiliser le hook useHoverDelay pour gérer le délai de hover
  const handleHoverDelay = useCallback(
    (isHovering) => {
      if (isLocked) return;
      if (isHovering) {
        setShowPopover(true);
      } else if (!isLocked) {
        setShowPopover(false);
      }
    },
    [isLocked],
  );

  const { onMouseEnter, onMouseLeave } = useHoverDelay(handleHoverDelay, 300);

  // Calculer la position du popover
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const spacing = 12;

    let top = 0;
    let left = 0;

    // Desktop: Au-dessus du terme, centré
    if (window.innerWidth >= 1024) {
      top = triggerRect.top - popoverRect.height - spacing;
      left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;

      // Ajuster si déborde à gauche
      if (left < spacing) {
        left = spacing;
      }

      // Ajuster si déborde à droite
      if (left + popoverRect.width > window.innerWidth - spacing) {
        left = window.innerWidth - popoverRect.width - spacing;
      }

      // Si pas assez de place en haut, afficher en bas
      if (top < spacing) {
        top = triggerRect.bottom + spacing;
      }
    }
    // Mobile: En bas du terme, centré sur viewport
    else {
      top = triggerRect.bottom + spacing;
      left = Math.max(
        spacing,
        Math.min(
          triggerRect.left,
          window.innerWidth - popoverRect.width - spacing,
        ),
      );

      // Ajuster si déborde en bas
      if (top + popoverRect.height > window.innerHeight - spacing) {
        top = Math.max(
          spacing,
          window.innerHeight - popoverRect.height - spacing,
        );
      }
    }

    popoverRef.current.style.top = `${top}px`;
    popoverRef.current.style.left = `${left}px`;
  }, []);

  // Gérer le clic (verrouille/déverrouille le popover)
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      if (isLocked) {
        setIsLocked(false);
        setShowPopover(false);
      } else {
        setIsLocked(true);
        setShowPopover(true);
      }
    },
    [isLocked],
  );

  // Gérer la navigation clavier
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(e);
      } else if (e.key === "Escape" && showPopover) {
        e.preventDefault();
        setShowPopover(false);
        setIsLocked(false);
        triggerRef.current?.focus();
      }
    },
    [showPopover, handleClick],
  );

  // Fermer au clic extérieur
  const handleClickOutside = useCallback(
    (e) => {
      if (
        showPopover &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setShowPopover(false);
        setIsLocked(false);
      }
    },
    [showPopover],
  );

  // Recalculer position au resize
  useEffect(() => {
    if (!showPopover) return;

    calculatePosition();

    const handleUpdate = () => calculatePosition();
    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true);

    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [showPopover, calculatePosition]);

  // Listener clic extérieur
  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopover, handleClickOutside]);

  // Si pas de définition trouvée, ne pas afficher le popover
  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  // Classes CSS pour le trigger selon le variant
  const triggerClasses =
    variant === "medical"
      ? "inline-block cursor-pointer rounded-sm underline underline-offset-2 decoration-neutral-800 dark:decoration-neutral-200 hover:decoration-emerald-500 decoration-2 transition-color duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:decoration-emerald-400"
      : "inline-block cursor-pointer rounded-sm underline underline-offset-2 decoration-neutral-700 dark:decoration-neutral-200 hover:decoration-emerald-500 decoration-2 transition-color duration-150 dark:decoration-emerald-400 dark:hover:decoration-emerald-500 border-b border-dotted border-neutral-400 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-neutral-500";

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={showPopover}
        className={triggerClasses}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </span>

      {showPopover && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={`animate-in fade-in zoom-in-95 fixed ${Z_INDEX_CLASSES.TERM_POPOVER} w-64 rounded-lg bg-white p-4 shadow-xl drop-shadow-2xl transition-all duration-150 dark:bg-neutral-800`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Annonce pour lecteurs d'écran */}
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {showPopover ? `Définition de ${termData.name} affichée` : ""}
          </div>

          {/* Header avec titre et bouton fermer */}
          <div className="mb-2 flex items-start justify-between">
            <h3
              id={titleId}
              className="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
            >
              {termData.name}
            </h3>
            <button
              onClick={() => {
                setShowPopover(false);
                setIsLocked(false);
                triggerRef.current?.focus();
              }}
              className="transition-color flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-neutral-500 duration-150 hover:text-neutral-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label="Fermer"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>

          {/* Définition */}
          <p className="mb-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
            {termData.definition}
          </p>

          {/* Lien Wikipedia si disponible */}
          {termData.wikipediaUrl && (
            <button
              type="button"
              onClick={() =>
                openConfirmation(termData.wikipediaUrl, "Wikipedia")
              }
              className="inline-flex items-center gap-1 rounded text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-emerald-500 dark:hover:text-emerald-400"
              aria-label={`En savoir plus sur ${termData.name} sur Wikipedia (ouvre dans une nouvelle fenêtre)`}
            >
              En savoir plus
              <BiLinkExternal
                className="h-3 w-3 text-current"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      )}
    </span>
  );
}

// Validation des props pour éviter les bugs en runtime
TermPopover.propTypes = {
  termId: PropTypes.string.isRequired, // ID du terme technique (requis)
  children: PropTypes.node.isRequired, // Contenu wrappé dans le popover (requis)
  variant: PropTypes.oneOf(["property", "allergen", "medical"]), // Type de terme (optionnel)
  className: PropTypes.string, // Classes CSS additionnelles (optionnel)
};

export default TermPopover;
