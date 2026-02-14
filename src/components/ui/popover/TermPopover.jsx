import PropTypes from "prop-types"; // Validation des props
import { useCallback, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BiLinkExternal } from "react-icons/bi";
import { Z_INDEX_CLASSES } from "../../../constants/zIndexLevels";
import { TECHNICAL_TERMS_DATA } from "../../../data/technicalTermsDefinitions";
import { useExternalLink } from "../../../features/external-link/hooks/useExternalLink";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useTooltipPosition } from "../../../hooks/useTooltipPosition";

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

  const hoverTimeoutRef = useRef(null);
  const titleId = useId();
  const { openConfirmation } = useExternalLink();

  // Normaliser le termId et récupérer la définition
  const normalizedTermId = termId.toLowerCase().replace(/\s+/g, "-");
  const termData = TECHNICAL_TERMS_DATA[normalizedTermId];

  // Utiliser le nouveau hook de positionnement
  const {
    triggerRef,
    tooltipRef: popoverRef,
    position,
  } = useTooltipPosition({
    placement: "top",
    offset: 12,
    autoUpdate: true, // Recalcule au scroll/resize
  });

  // Handlers hover avec lock state
  const handleMouseEnter = useCallback(() => {
    if (isLocked) return;

    hoverTimeoutRef.current = setTimeout(() => {
      setShowPopover(true);
    }, 300); // Délai 300ms comme avant
  }, [isLocked]);

  const handleMouseLeave = useCallback(() => {
    if (isLocked) return;

    clearTimeout(hoverTimeoutRef.current);
    setShowPopover(false);
  }, [isLocked]);

  // Fermeture au clic externe (utilise le nouveau hook)
  const containerRef = useClickOutside(
    () => {
      if (showPopover) {
        setShowPopover(false);
        setIsLocked(false);
      }
    },
    { isActive: showPopover },
  );

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
    [showPopover, handleClick, triggerRef],
  );

  // Si pas de définition trouvée, ne pas afficher le popover
  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  // Classes CSS pour le trigger selon le variant
  const triggerClasses =
    variant === "medical"
      ? "inline-block cursor-pointer rounded-sm underline underline-offset-2 decoration-neutral-800 dark:decoration-neutral-200 hover:decoration-emerald-500 decoration-2 transition-color duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:decoration-emerald-400"
      : "inline-block cursor-pointer rounded-sm underline underline-offset-2 decoration-neutral-700 dark:decoration-neutral-200 hover:decoration-emerald-500 decoration-2 transition-color duration-150 dark:decoration-emerald-400 dark:hover:decoration-emerald-500 border-b border-dotted border-neutral-400 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-neutral-500";

  // Contenu du popover
  const popoverContent = showPopover && (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className={`animate-in fade-in zoom-in-95 fixed ${Z_INDEX_CLASSES.TERM_POPOVER} w-64 rounded-lg bg-white p-4 shadow-xl drop-shadow-2xl transition-all duration-150 dark:bg-neutral-800`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          onClick={() => openConfirmation(termData.wikipediaUrl, "Wikipedia")}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-emerald-500 dark:hover:text-emerald-400"
          aria-label={`En savoir plus sur ${termData.name} sur Wikipedia (ouvre dans une nouvelle fenêtre)`}
        >
          En savoir plus
          <BiLinkExternal className="h-3 w-3 text-current" aria-hidden="true" />
        </button>
      )}
    </div>
  );

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={showPopover}
        className={triggerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </span>

      {popoverContent && createPortal(popoverContent, document.body)}
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
