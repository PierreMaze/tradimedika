import { useEffect, useRef } from "react";

/**
 * Hook pour détecter les clics en dehors d'un élément
 * Utile pour fermer tooltips, modals, dropdowns, etc.
 *
 * @param {Function} callback - Fonction appelée lors d'un clic externe
 * @param {Object} [options] - Options de configuration
 * @param {boolean} [options.isActive=true] - Active/désactive la détection
 * @returns {React.RefObject} Ref à attacher à l'élément à surveiller
 */
export function useClickOutside(callback, options = {}) {
  const { isActive = true } = options;
  const elementRef = useRef(null);
  const callbackRef = useRef(callback);

  // Mise à jour de la ref callback pour éviter dépendances stales
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;

    /**
     * Handler pour détecter les clics externes
     * Utilise mousedown pour capturer avant les events de clic
     */
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    // mousedown au lieu de click pour capturer plus tôt
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return elementRef;
}
