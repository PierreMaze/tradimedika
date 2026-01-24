import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

/**
 * GoogleAnalytics Component
 *
 * Initialise Google Analytics 4 et suit automatiquement les changements de page.
 *
 * Configuration:
 * - Définir la variable d'environnement VITE_GA_MEASUREMENT_ID dans .env
 * - Format: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Features:
 * - Initialisation GA4 au montage du composant
 * - Suivi automatique des pages via useLocation
 * - Désactivation en mode développement (optionnel)
 * - Compatibilité avec le basename de React Router
 *
 * @example
 * ```jsx
 * <GoogleAnalytics />
 * ```
 */
const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  // Initialisation de GA4 au montage du composant
  useEffect(() => {
    if (measurementId) {
      ReactGA.initialize(measurementId, {
        gaOptions: {
          debug_mode: import.meta.env.DEV, // Active le mode debug en développement
        },
      });

      if (import.meta.env.DEV) {
        console.log("Google Analytics 4 initialisé avec ID:", measurementId);
      }
    } else if (import.meta.env.DEV) {
      console.warn(
        "VITE_GA_MEASUREMENT_ID non défini. Google Analytics n'est pas activé.",
      );
    }
  }, [measurementId]);

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
