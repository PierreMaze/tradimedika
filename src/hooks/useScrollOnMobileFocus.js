import { useCallback } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

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
