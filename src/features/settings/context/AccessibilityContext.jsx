import { createContext, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const AccessibilityContext = createContext(undefined);

export function AccessibilityProvider({ children }) {
  // État localStorage pour les 2 préférences d'accessibilité
  const [isHighContrast, setIsHighContrast] = useLocalStorage(
    "tradimedika-high-contrast",
    false,
  );
  const [isExternalLinkConfirmEnabled, setIsExternalLinkConfirmEnabled] =
    useLocalStorage("tradimedika-external-link-confirm", true);

  // Toggle contraste élevé
  // Note: Si high contrast activé, on force le light mode directement
  // via localStorage et manipulation DOM pour éviter le couplage avec ThemeContext
  const toggleHighContrast = useCallback(() => {
    setIsHighContrast((prev) => {
      const newValue = !prev;

      // Si on active le contraste élevé, forcer light mode immédiatement
      if (newValue && typeof window !== "undefined") {
        // Écriture synchrone dans localStorage
        window.localStorage.setItem(
          "tradimedika-theme",
          JSON.stringify("light"),
        );

        // Forcer la classe dark sur <html> immédiatement
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }

      return newValue;
    });
  }, [setIsHighContrast]);

  // Toggle confirmation liens externes
  const toggleExternalLinkConfirm = useCallback(() => {
    setIsExternalLinkConfirmEnabled((prev) => !prev);
  }, [setIsExternalLinkConfirmEnabled]);

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
