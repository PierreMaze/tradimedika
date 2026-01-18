import { useCallback } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../features/settings";

/**
 * Hook personnalisé pour gérer le scroll automatique vers un élément lors du focus sur mobile
 *
 * Améliore l'UX mobile en scrollant automatiquement vers le container d'input quand il prend le focus,
 * évitant que le clavier mobile ne cache le contenu. Respecte les préférences d'accessibilité.
 *
 * @param {Object} [options={}] - Options de configuration du scroll
 * @param {string} [options.behavior='smooth'] - Comportement du scroll ('smooth' | 'instant' | 'auto')
 * @param {string} [options.block='start'] - Position verticale ('start' | 'center' | 'end' | 'nearest')
 * @param {string} [options.inline='nearest'] - Position horizontale ('start' | 'center' | 'end' | 'nearest')
 * @param {number} [options.keyboardDelay=300] - Délai en ms avant le scroll (pour attendre l'ouverture du clavier)
 * @returns {{
 *   handleScrollToContainer: (element: HTMLElement) => void,
 *   isMobile: boolean
 * }} Object contenant la fonction de scroll et le statut mobile
 *
 * @example
 * const { handleScrollToContainer, isMobile } = useScrollOnMobileFocus({
 *   behavior: 'smooth',
 *   block: 'start',
 *   keyboardDelay: 300
 * });
 *
 * const handleInputFocus = () => {
 *   handleScrollToContainer(containerRef.current);
 * };
 */
export function useScrollOnMobileFocus(options = {}) {
  const {
    behavior = "smooth",
    block = "start",
    inline = "nearest",
    keyboardDelay = 300,
  } = options;

  const isMobile = useMediaQuery("(max-width: 1023px)");
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToContainer = useCallback(
    (element) => {
      if (!isMobile || !element) return;

      const scrollBehavior = prefersReducedMotion ? "instant" : behavior;

      setTimeout(() => {
        if (typeof element.scrollIntoView === "function") {
          element.scrollIntoView({
            behavior: scrollBehavior,
            block,
            inline,
          });
        } else {
          const rect = element.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 20;

          window.scrollTo({
            top: targetY,
            behavior: scrollBehavior,
          });
        }
      }, keyboardDelay);
    },
    [isMobile, prefersReducedMotion, behavior, block, inline, keyboardDelay],
  );

  return { handleScrollToContainer, isMobile };
}
