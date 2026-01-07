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
      if (!item) return initialValue;

      const parsed = JSON.parse(item);

      // Validation de type : refuser si différent de initialValue
      // Exception: si initialValue est null, accepter n'importe quel type
      if (initialValue !== null && typeof parsed !== typeof initialValue) {
        logger.warn(
          `Type mismatch in localStorage key "${key}": expected ${typeof initialValue}, got ${typeof parsed}. Using initialValue.`,
        );
        return initialValue;
      }

      // Validation spéciale pour arrays vs objects (typeof array = "object")
      // Exception: si initialValue est null, accepter n'importe quel type
      if (
        initialValue !== null &&
        Array.isArray(initialValue) !== Array.isArray(parsed)
      ) {
        logger.warn(
          `Type mismatch in localStorage key "${key}": expected ${Array.isArray(initialValue) ? "array" : "object"}, got ${Array.isArray(parsed) ? "array" : "object"}. Using initialValue.`,
        );
        return initialValue;
      }

      return parsed;
    } catch (error) {
      logger.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour localStorage et le state
  const setValue = useCallback(
    (value) => {
      try {
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

          // Validation de type avant sauvegarde
          // Exception: si initialValue est null, accepter n'importe quel type
          if (
            initialValue !== null &&
            typeof valueToStore !== typeof initialValue
          ) {
            logger.warn(
              `Type mismatch in setValue for key "${key}": expected ${typeof initialValue}, got ${typeof valueToStore}. Ignoring setValue.`,
            );
            return currentValue; // Garde l'état actuel
          }

          // Validation spéciale pour arrays vs objects
          // Exception: si initialValue est null, accepter n'importe quel type
          if (
            initialValue !== null &&
            Array.isArray(initialValue) !== Array.isArray(valueToStore)
          ) {
            logger.warn(
              `Type mismatch in setValue for key "${key}": expected ${Array.isArray(initialValue) ? "array" : "object"}, got ${Array.isArray(valueToStore) ? "array" : "object"}. Ignoring setValue.`,
            );
            return currentValue;
          }

          // queueMicrotask garantit l'exécution avant le prochain tick
          // Tout en restant asynchrone (meilleur pour Concurrent Features)
          queueMicrotask(() => {
            if (typeof window !== "undefined") {
              try {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                logger.debug(
                  `🚀 useLocalStorage[${key}] saved to localStorage`,
                );
              } catch (error) {
                logger.warn(`Error writing localStorage key "${key}":`, error);
              }
            }
          });

          return valueToStore;
        });
      } catch (error) {
        logger.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue],
  );

  return [storedValue, setValue];
}
