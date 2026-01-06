// hooks/useLocalStorage.js
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
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
        // Utiliser flushSync pour forcer l'exécution synchrone du setState
        // Cela garantit que localStorage est mis à jour AVANT que le composant
        // ne se démonte (important quand navigation immédiate après)
        flushSync(() => {
          setStoredValue((currentValue) => {
            logger.debug(`🚀 useLocalStorage[${key}] callback START`, {
              currentValue,
              valueIsFunction: value instanceof Function,
            });

            // Permet de passer une fonction comme pour useState
            const valueToStore =
              value instanceof Function ? value(currentValue) : value;

            logger.debug(
              `🚀 useLocalStorage[${key}] valueToStore:`,
              valueToStore,
            );

            // Protection SSR - Stocker SYNCHRONEMENT dans localStorage
            // AVANT que React mette à jour le state, pour éviter la perte
            // de données si le composant est démonté rapidement
            if (typeof window !== "undefined") {
              window.localStorage.setItem(key, JSON.stringify(valueToStore));
              logger.debug(`🚀 useLocalStorage[${key}] saved to localStorage`);
            }

            return valueToStore;
          });
        });
      } catch (error) {
        logger.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
