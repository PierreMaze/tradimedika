import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";

/**
 * Hook custom pour accéder au contexte d'accessibilité
 * Doit être utilisé à l'intérieur d'un AccessibilityProvider
 *
 * @throws {Error} Si utilisé en dehors d'un AccessibilityProvider
 * @returns {Object} Valeurs et fonctions du contexte d'accessibilité
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }
  return context;
}
