// hooks/useReducedMotion.js
import { useState, useEffect } from "react";

/**
 * Hook pour détecter la préférence utilisateur "prefers-reduced-motion"
 * Respecte les paramètres d'accessibilité du système d'exploitation
 *
 * @returns {boolean} - true si l'utilisateur préfère des animations réduites
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * if (!prefersReducedMotion) {
 *   // Afficher animations complètes
 * }
 */
export function useReducedMotion() {
  // Initialiser avec la valeur actuelle (lazy initialization pour éviter setState dans effect)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // SSR safety
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mediaQuery.matches;
  });

  useEffect(() => {
    // Vérifier si le navigateur supporte matchMedia
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    // Créer la media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Fonction de callback pour les changements
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Écouter les changements (pour React 18+)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback pour anciens navigateurs
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}
