// hooks/useLocalStorage.js
import { useCallback, useEffect, useRef, useState } from "react";
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

  // Ref pour garder la valeur actuelle toujours à jour
  const storedValueRef = useRef(storedValue);

  // Synchroniser le ref avec le state
  useEffect(() => {
    storedValueRef.current = storedValue;
  }, [storedValue]);

  // Fonction pour mettre à jour localStorage et le state
  const setValue = useCallback(
    (value) => {
      try {
        // IMPORTANT: Calculer la nouvelle valeur AVANT le setState
        // en utilisant le ref pour avoir la valeur la plus récente
        const currentValue = storedValueRef.current;
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        logger.debug(`🚀 useLocalStorage[${key}] valueToStore:`, valueToStore);

        // Validation de type avant sauvegarde
        // Exception: si initialValue est null, accepter n'importe quel type
        if (
          initialValue !== null &&
          typeof valueToStore !== typeof initialValue
        ) {
          logger.warn(
            `Type mismatch in setValue for key "${key}": expected ${typeof initialValue}, got ${typeof valueToStore}. Ignoring setValue.`,
          );
          return; // Ne pas mettre à jour
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
          return; // Ne pas mettre à jour
        }

        // CRITICAL: Écrire dans localStorage AVANT setState
        // Cela garantit la persistance même si React ignore le setState
        // (ex: démontage immédiat du composant après navigation)
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            logger.debug(
              `🚀 useLocalStorage[${key}] saved to localStorage (synchronous)`,
            );
          } catch (error) {
            logger.warn(`Error writing localStorage key "${key}":`, error);
            return; // Ne pas mettre à jour le state si l'écriture échoue
          }
        }

        // Puis mettre à jour le state React (peut être ignoré si démontage)
        setStoredValue(valueToStore);
      } catch (error) {
        logger.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue],
  );

  return [storedValue, setValue];
}
