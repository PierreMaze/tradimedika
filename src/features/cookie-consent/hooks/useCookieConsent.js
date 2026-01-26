import { useContext } from "react";
import { CookieConsentContext } from "../context/createCookieConsentContext";

/**
 * Hook pour accéder au contexte de consentement des cookies
 * @throws {Error} Si utilisé en dehors de CookieConsentProvider
 * @returns {Object} L'objet de contexte contenant les données et méthodes de consentement
 */
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }
  return context;
}
