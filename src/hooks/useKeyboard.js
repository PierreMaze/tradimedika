import { useEffect, useRef, useMemo } from "react";

/**
 * Hook pour gérer les événements clavier globaux
 * Utile pour fermer avec Escape, navigation, etc.
 *
 * @param {string|string[]} keys - Touche(s) à écouter (ex: 'Escape', ['Tab', 'Enter'])
 * @param {Function} callback - Fonction appelée lors de l'appui sur la touche
 * @param {Object} [options] - Options de configuration
 * @param {boolean} [options.isActive=true] - Active/désactive l'écoute
 * @returns {void}
 */
export function useKeyboard(keys, callback, options = {}) {
  const { isActive = true } = options;
  const callbackRef = useRef(callback);

  // Memoize keysArray to avoid recreating on every render
  const keysArray = useMemo(
    () => (Array.isArray(keys) ? keys : [keys]),
    [keys],
  );

  // Mise à jour de la ref callback pour éviter dépendances stales
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      if (keysArray.includes(event.key) || keysArray.includes(event.code)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keysArray, isActive]);
}
