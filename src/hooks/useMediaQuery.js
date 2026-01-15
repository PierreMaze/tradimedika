// hooks/useMediaQuery.js
import { useSyncExternalStore } from "react";

/**
 * Hook pour détecter les media queries CSS
 * Compatible SSR (ne plante pas côté serveur)
 * Utilise useSyncExternalStore pour une synchronisation optimale
 *
 * @param {string} query - Media query CSS (ex: '(prefers-color-scheme: dark)')
 * @returns {boolean} - true si la media query correspond
 */
export function useMediaQuery(query) {
  const subscribe = (callback) => {
    // Protection SSR
    if (typeof window === "undefined") return () => {};

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
