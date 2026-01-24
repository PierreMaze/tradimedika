import { useCallback } from "react";
import ReactGA from "react-ga4";

/**
 * Hook personnalisé pour envoyer des événements à Google Analytics 4
 *
 * @returns {Function} trackEvent - Fonction pour envoyer des événements GA4
 *
 * @example
 * ```jsx
 * const trackEvent = useGAEvent();
 *
 * // Événement simple
 * trackEvent('search', { search_term: 'mal de tête' });
 *
 * // Événement avec catégorie et label
 * trackEvent('filter_applied', {
 *   category: 'remedy_filter',
 *   label: 'pregnancy_safe',
 *   value: 'ok'
 * });
 * ```
 */
const useGAEvent = () => {
  const trackEvent = useCallback((action, params = {}) => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (measurementId) {
      ReactGA.event(action, params);

      if (import.meta.env.DEV) {
        console.log("GA4 event:", action, params);
      }
    }
  }, []);

  return trackEvent;
};

export default useGAEvent;
