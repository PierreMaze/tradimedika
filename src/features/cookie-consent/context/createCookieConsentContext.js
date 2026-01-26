import { createContext } from "react";

/**
 * Contexte pour la gestion du consentement des cookies
 * @type {React.Context<undefined | Object>}
 */
export const CookieConsentContext = createContext(undefined);
