// hooks/useDarkMode.js
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

/**
 * Hook personnalisé pour gérer le dark mode
 * - Persiste la préférence utilisateur dans localStorage
 * - Détecte automatiquement la préférence système
 * - Applique la classe 'dark' sur <html>
 * - Évite le FOUC (Flash of Unstyled Content)
 *
 * @returns {Object} { isDarkMode, toggleDarkMode, enableDark, disableDark }
 */
export const useDarkMode = () => {
  // Détecte la préférence système de l'utilisateur
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Récupère/stocke la préférence dans localStorage
  // Si pas de valeur, utilise la préférence système
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "tradimedika-theme",
    null,
  );

  // Dérive isDarkMode de storedTheme et prefersDarkMode
  // Plus besoin d'état séparé ni d'effet de synchronisation
  const isDarkMode =
    storedTheme !== null ? storedTheme === "dark" : prefersDarkMode;

  // Applique le thème au DOM (classe 'dark' sur <html>)
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  // Toggle entre dark et light mode
  const toggleDarkMode = useCallback(() => {
    setStoredTheme((prev) => {
      const currentValue = prev !== null ? prev === "dark" : prefersDarkMode;
      return currentValue ? "light" : "dark";
    });
  }, [prefersDarkMode, setStoredTheme]);

  // Active explicitement le dark mode
  const enableDark = useCallback(() => {
    setStoredTheme("dark");
  }, [setStoredTheme]);

  // Désactive explicitement le dark mode
  const disableDark = useCallback(() => {
    setStoredTheme("light");
  }, [setStoredTheme]);

  return {
    isDarkMode,
    toggleDarkMode,
    enableDark,
    disableDark,
  };
};
