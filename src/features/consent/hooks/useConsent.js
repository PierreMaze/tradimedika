import { useContext } from "react";
import { ConsentContext } from "../context/createConsentContext";

/**
 * Hook pour accéder au contexte de consentement
 * Doit être utilisé à l'intérieur d'un ConsentProvider
 *
 * @returns {Object} État et méthodes du consentement
 * @throws {Error} Si utilisé en dehors d'un ConsentProvider
 */
export function useConsent() {
  const context = useContext(ConsentContext);

  // Vérification de sécurité : le hook doit être utilisé dans un Provider
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }

  return context;
}
