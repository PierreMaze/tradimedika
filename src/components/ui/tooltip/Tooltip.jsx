import { useId, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useTooltip } from "../../../hooks/useTooltip";
import { useTooltipPosition } from "../../../hooks/useTooltipPosition";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useReducedMotion } from "../../../features/settings/hooks/useReducedMotion";
import { Z_INDEX_CLASSES } from "../../../constants/zIndexLevels";

/**
 * Composant Tooltip vanilla React avec positionnement intelligent
 * Accessible WCAG 2.2 AA, mobile-first, 0 dépendance externe
 *
 * @component
 * @example
 * <Tooltip content="Information utile" placement="top">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export function Tooltip({
  children,
  content,
  placement = "top",
  offset = 8,
  hoverDelay = 200,
  hideDelay = 100,
  closeOnEsc = true,
  closeOnClickOutside = true,
  className = "",
  ariaLabel,
  disabled = false,
  portal = true,
}) {
  const tooltipId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Gestion de l'état ouvert/fermé
  const { isOpen, open, close, closeImmediate, bind } = useTooltip({
    hoverDelay,
    hideDelay,
    closeOnEsc,
  });

  // Calcul de position intelligente
  const { triggerRef, tooltipRef, position, actualPlacement } =
    useTooltipPosition({
      placement,
      offset,
      autoUpdate: false, // Sera true si besoin après tests
    });

  // Fermeture au clic externe
  const containerRef = useClickOutside(
    () => {
      if (closeOnClickOutside) {
        closeImmediate();
      }
    },
    { isActive: isOpen },
  );

  // Si désactivé, retourner juste les children
  if (disabled) {
    return <>{children}</>;
  }

  // Classes pour animations
  const animationClass = prefersReducedMotion
    ? "opacity-100"
    : "transition-opacity duration-200 ease-in-out opacity-100";

  // Classes de base du tooltip
  const tooltipClasses = `
    ${Z_INDEX_CLASSES.TOOLTIP}
    rounded-lg shadow-lg px-3 py-2 text-sm
    bg-white text-gray-900 border border-gray-200
    dark:bg-gray-800 dark:text-white dark:border-gray-700
    ${animationClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Wrapper pour gérer les refs et props ARIA
  const triggerElement = isValidElement(children)
    ? cloneElement(children, {
        ref: triggerRef,
        ...bind,
        "aria-describedby": isOpen ? tooltipId : undefined,
        "aria-expanded": isOpen,
        "aria-label": ariaLabel,
      })
    : children;

  // Contenu du tooltip
  const tooltipContent = (
    <div
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      aria-live="polite"
      aria-atomic="true"
      className={tooltipClasses}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: "auto", // Permet hover sur le tooltip lui-même
      }}
      data-placement={actualPlacement}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {content}
    </div>
  );

  return (
    <div ref={containerRef} style={{ display: "inline-block" }}>
      {triggerElement}

      {isOpen &&
        content &&
        (portal ? createPortal(tooltipContent, document.body) : tooltipContent)}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node,
  placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  offset: PropTypes.number,
  hoverDelay: PropTypes.number,
  hideDelay: PropTypes.number,
  closeOnEsc: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  portal: PropTypes.bool,
};
