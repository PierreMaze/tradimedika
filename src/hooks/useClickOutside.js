// hooks/useClickOutside.js
import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside of a referenced element
 *
 * @param {React.RefObject} ref - Reference to the element to monitor
 * @param {Function} handler - Callback function to execute when clicking outside
 * @param {boolean} [isActive=true] - Whether the listener is active
 *
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => setIsOpen(false), isOpen);
 */
export function useClickOutside(ref, handler, isActive = true) {
  useEffect(() => {
    // Ne pas ajouter le listener si désactivé
    if (!isActive) return;

    const handleClickOutside = (event) => {
      // Vérifier si le clic est en dehors de l'élément
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Ajouter le listener sur mousedown (plus rapide que click)
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: retirer le listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, isActive]);
}
