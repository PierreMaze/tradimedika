// hooks/useLocalStorage.js
import { useCallback, useState } from "react";
import { createLogger } from "../utils/logger";

const logger = createLogger("useLocalStorage");

/**
 * Hook pour gérer localStorage avec React state
 * Compatible SSR et gère les erreurs localStorage
 *
 * @param {string} key - Clé localStorage
 * @param {*} initialValue - Valeur initiale si rien dans localStorage
 * @returns {[*, Function]} - [valeur, setter]
 */
export function useLocalStorage(key, initialValue) {
  // Fonction d'initialisation (appelée une seule fois)
  const [storedValue, setStoredValue] = useState(() => {
    // Protection SSR
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour localStorage et le state
  const setValue = useCallback(
    (value) => {
      try {
        // Permet de passer une fonction comme pour useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        // Protection SSR
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        logger.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}
