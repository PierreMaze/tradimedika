// context/ThemeContext.jsx
import { createContext, useContext, useMemo } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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

/**
 * Hook pour accéder au dark mode depuis n'importe quel composant
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
