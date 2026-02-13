import { useCallback, useEffect, useRef } from "react";

/**
 * Hook pour gérer le hover delay (remplace Framer Motion hover timeout)
 * Utilisé par TermPopover pour éviter l'ouverture accidentelle
 *
 * @param {Function} callback - Fonction appelée avec true/false selon l'état hover
 * @param {number} delay - Délai en ms avant d'ouvrir (défaut: 300ms)
 * @returns {Object} Handlers onMouseEnter et onMouseLeave
 *
 * @example
 * const { onMouseEnter, onMouseLeave } = useHoverDelay(setIsOpen, 300);
 * <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>...</span>
 */
export function useHoverDelay(callback, delay = 300) {
  const timeoutRef = useRef(null);

  const onMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callback(true);
    }, delay);
  }, [callback, delay]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    callback(false);
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { onMouseEnter, onMouseLeave };
}
