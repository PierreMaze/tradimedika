// context/ThemeContext.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

// Contexte privé - utilisé seulement dans ce fichier
const ThemeContext = createContext(undefined);

/**
 * Provider pour partager le dark mode dans toute l'app
 * Évite les prop drilling et optimise les re-renders
 */
export function ThemeProvider({ children }) {
  const { isDarkMode, toggleDarkMode, enableDark, disableDark } = useDarkMode();

  // Memoize context value to prevent unnecessary re-renders
  // Only re-create when darkMode values actually change
  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
      enableDark,
      disableDark,
    }),
    [isDarkMode, toggleDarkMode, enableDark, disableDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook pour accéder au dark mode depuis n'importe quel composant
 * Doit être utilisé à l'intérieur d'un ThemeProvider
 *
 * @returns {Object} { isDarkMode, toggleDarkMode, enableDark, disableDark }
 * @throws {Error} Si utilisé en dehors d'un ThemeProvider
 */
// eslint-disable-next-line react-refresh/only-export-components -- Structure recommandée par React: hook avec son Provider
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
