import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useCookieConsent } from "../../features/cookie-consent/hooks/useCookieConsent";

/**
 * GoogleAnalytics Component
 *
 * Initialise Google Analytics 4 avec Google Consent Mode v2 et suit automatiquement les changements de page.
 *
 * Configuration:
 * - Définir la variable d'environnement VITE_GA_MEASUREMENT_ID dans .env
 * - Format: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * - Le Consent Mode v2 est initialisé dans index.html AVANT React
 *
 * Features:
 * - Intégration Google Consent Mode v2 (RGPD)
 * - Initialisation GA4 uniquement si consentement déterminé
 * - Suivi automatique des pages via useLocation
 * - Tracking anonyme activé même en cas de refus (Consent Mode Advanced)
 * - Mode debug en développement
 *
 * @example
 * ```jsx
 * <GoogleAnalytics />
 * ```
 */
const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const { consentData, isAccepted } = useCookieConsent();

  useEffect(() => {
    if (consentData !== null && measurementId) {
      ReactGA.initialize(measurementId, {
        gaOptions: {
          debug_mode: import.meta.env.DEV,
        },
      });

      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: isAccepted ? "granted" : "denied",
          functionality_storage: isAccepted ? "granted" : "denied",
        });
      }

      if (import.meta.env.DEV) {
        console.log("Google Analytics 4 initialisé avec ID:", measurementId);
        console.log(
          "Consent Mode:",
          isAccepted ? "granted" : "denied (tracking anonyme actif)",
        );
      }
    } else if (!measurementId && import.meta.env.DEV) {
      console.warn(
        "VITE_GA_MEASUREMENT_ID non défini. Google Analytics n'est pas activé.",
      );
    }
  }, [consentData, isAccepted, measurementId]);

  // Suivi des changements de page
  useEffect(() => {
    if (measurementId) {
      const page = location.pathname + location.search;

      ReactGA.send({
        hitType: "pageview",
        page: page,
        title: document.title,
      });

      if (import.meta.env.DEV) {
        console.log("GA4 pageview:", page);
      }
    }
  }, [location, measurementId]);

  return null; // Composant sans rendu visuel
};

export default GoogleAnalytics;
