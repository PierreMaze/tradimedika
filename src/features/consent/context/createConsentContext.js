import { createContext } from "react";

/**
 * Context pour le consentement RGPD
 * Stocke l'état global du consentement partagé dans toute l'application
 */
export const ConsentContext = createContext(null);
