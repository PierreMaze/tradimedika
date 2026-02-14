import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Hook de gestion d'état pour tooltips
 * Gère l'ouverture/fermeture, les délais hover, et le support clavier
 *
 * @param {Object} options - Options de configuration
 * @param {number} [options.hoverDelay=200] - Délai avant affichage au hover (ms)
 * @param {number} [options.hideDelay=100] - Délai avant masquage (ms)
 * @param {boolean} [options.closeOnEsc=true] - Fermer avec la touche Escape
 * @returns {Object} État et handlers du tooltip
 */
export function useTooltip(options = {}) {
  const { hoverDelay = 200, hideDelay = 100, closeOnEsc = true } = options;

  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  /**
   * Ouvre le tooltip après le délai configuré
   */
  const open = useCallback(() => {
    clearTimeout(hideTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, hoverDelay);
  }, [hoverDelay]);

  /**
   * Ferme le tooltip après le délai configuré
   */
  const close = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, hideDelay);
  }, [hideDelay]);

  /**
   * Ferme immédiatement le tooltip sans délai
   */
  const closeImmediate = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current);
    clearTimeout(hideTimeoutRef.current);
    setIsOpen(false);
  }, []);

  /**
   * Toggle l'état du tooltip
   */
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  /**
   * Gestion de la touche Escape pour fermer le tooltip
   */
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeImmediate();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, closeImmediate]);

  /**
   * Cleanup des timeouts au démontage
   */
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  /**
   * Props à binder sur l'élément trigger
   * Gère hover et focus pour accessibilité clavier
   */
  const bind = {
    onMouseEnter: open,
    onMouseLeave: close,
    onFocus: open,
    onBlur: close,
  };

  return {
    isOpen,
    open,
    close,
    closeImmediate,
    toggle,
    bind,
  };
}
