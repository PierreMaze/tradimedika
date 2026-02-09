import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useTheme } from "./ThemeContext";

const AccessibilityContext = createContext(undefined);

export function AccessibilityProvider({ children }) {
  // État localStorage pour les 2 préférences d'accessibilité
  const [isHighContrast, setIsHighContrast] = useLocalStorage(
    "tradimedika-high-contrast",
    false,
  );
  const [isExternalLinkConfirmEnabled, setIsExternalLinkConfirmEnabled] =
    useLocalStorage("tradimedika-external-link-confirm", true);

  // Accès au ThemeContext pour désactiver dark mode si contraste élevé
  const { disableDark } = useTheme();

  // Toggle contraste élevé
  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => !prev);
  }, [setIsHighContrast]);

  // Toggle confirmation liens externes
  const toggleExternalLinkConfirm = useCallback(() => {
    setIsExternalLinkConfirmEnabled((prev) => !prev);
  }, [setIsExternalLinkConfirmEnabled]);

  // EFFET CRITIQUE: Forcer light mode quand contraste élevé activé
  useEffect(() => {
    if (isHighContrast) {
      disableDark();
    }
  }, [isHighContrast, disableDark]);

  // Appliquer les classes CSS sur <html>
  useEffect(() => {
    const root = document.documentElement;

    // Gérer le contraste élevé
    if (isHighContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    return () => {
      root.classList.remove("high-contrast");
    };
  }, [isHighContrast]);

  const value = useMemo(
    () => ({
      isHighContrast,
      toggleHighContrast,
      isExternalLinkConfirmEnabled,
      toggleExternalLinkConfirm,
    }),
    [
      isHighContrast,
      toggleHighContrast,
      isExternalLinkConfirmEnabled,
      toggleExternalLinkConfirm,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

AccessibilityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return context;
}
