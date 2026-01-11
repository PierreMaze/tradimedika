import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const PerformanceContext = createContext(undefined);

/**
 * Provider pour gérer les préférences de performance
 * Contrôle l'activation/désactivation des animations coûteuses (ex: LeafFall)
 */
export function PerformanceProvider({ children }) {
  const [performanceMode, setPerformanceMode] = useLocalStorage(
    "tradimedika-performance",
    "high",
  );

  const togglePerformance = useCallback(() => {
    setPerformanceMode((prev) => (prev === "high" ? "low" : "high"));
  }, [setPerformanceMode]);

  const value = useMemo(
    () => ({
      performanceMode,
      isHighPerformance: performanceMode === "high",
      togglePerformance,
    }),
    [performanceMode, togglePerformance],
  );

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

PerformanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook pour accéder aux préférences de performance
 * Doit être utilisé à l'intérieur d'un PerformanceProvider
 *
 * @returns {Object} { performanceMode, isHighPerformance, togglePerformance }
 * @throws {Error} Si utilisé en dehors d'un PerformanceProvider
 */
// eslint-disable-next-line react-refresh/only-export-components -- Structure recommandée par React: hook avec son Provider
export function usePerformance() {
  const context = useContext(PerformanceContext);

  if (context === undefined) {
    throw new Error("usePerformance must be used within PerformanceProvider");
  }

  return context;
}
