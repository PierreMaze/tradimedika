import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { calculateTooltipPosition } from "../utils/tooltipPositioning";

/**
 * Throttle une fonction pour limiter sa fréquence d'exécution
 * @param {Function} func - Fonction à throttle
 * @param {number} limit - Délai minimum entre exécutions (ms)
 * @returns {Function} Fonction throttled
 */
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Hook de positionnement intelligent pour tooltips
 * Calcule la position optimale avec gestion des collisions viewport
 *
 * @param {Object} options - Options de configuration
 * @param {string} [options.placement='top'] - Position initiale ('top', 'bottom', 'left', 'right')
 * @param {number} [options.offset=8] - Espacement en pixels
 * @param {boolean} [options.autoUpdate=false] - Recalculer au resize/scroll
 * @param {boolean} [options.isOpen=true] - Le tooltip est-il ouvert/visible
 * @returns {Object} { triggerRef, tooltipRef, position, actualPlacement, updatePosition }
 */
export function useTooltipPosition(options = {}) {
  const {
    placement = "top",
    offset = 8,
    autoUpdate = false,
    isOpen = true,
  } = options;

  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  // Position initiale hors viewport pour éviter flash en (0,0)
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [actualPlacement, setActualPlacement] = useState(placement);

  /**
   * Calcule et met à jour la position du tooltip
   */
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const { x, y, finalPlacement } = calculateTooltipPosition(
      triggerRect,
      tooltipRect,
      placement,
      offset,
    );

    setPosition({ x, y });
    setActualPlacement(finalPlacement);
  }, [placement, offset]);

  /**
   * Calcul de position quand le tooltip est ouvert
   * Évite les flickers en calculant avant le paint
   */
  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [updatePosition, isOpen]);

  /**
   * Auto-update optionnel au resize/scroll
   */
  useLayoutEffect(() => {
    if (!autoUpdate) return;

    const throttledUpdate = throttle(updatePosition, 100);

    window.addEventListener("resize", throttledUpdate);
    window.addEventListener("scroll", throttledUpdate, true); // capture phase

    return () => {
      window.removeEventListener("resize", throttledUpdate);
      window.removeEventListener("scroll", throttledUpdate, true);
    };
  }, [autoUpdate, updatePosition]);

  return {
    triggerRef,
    tooltipRef,
    position,
    actualPlacement,
    updatePosition,
  };
}
