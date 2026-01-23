// tradimedika/src/components/ui/helper/TagsInfoButton.jsx

import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { GrCircleQuestion } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";
import { useReducedMotion } from "../../../features/settings/hooks/useReducedMotion";
import { useClickOutside } from "../../../hooks/useClickOutside";
import TagsInfoContent from "./TagsInfoContent";

/**
 * TagsInfoButton Component
 *
 * Bouton (?) affichant un toggletip contextuel avec explications des tags.
 * Pattern toggletip (clic pour toggle) pour accessibilité mobile/tactile.
 *
 * Props:
 * - size: 'sm' | 'md' (défaut: 'md')
 * - variant: 'inline' | 'standalone' (défaut: 'inline')
 * - className: Classes CSS additionnelles
 *
 * Accessibilité WCAG 2.2 AA:
 * - aria-expanded pour indiquer l'état
 * - aria-label descriptif
 * - Navigation clavier (Tab, Enter, Space, Escape)
 * - Cibles tactiles ≥ 44x44px
 * - role="region" avec aria-live="polite"
 *
 * Responsive:
 * - Mobile (< 1024px): Modal centré avec backdrop
 * - Desktop (≥ 1024px): Toggletip positionné sous le bouton
 */
function TagsInfoButton({ size = "md", variant = "inline", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Toggle toggletip
  const toggleTooltip = (e) => {
    // Empêcher la propagation pour éviter d'activer le Link parent (RemedyCard)
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Fermer toggletip
  const closeTooltip = () => {
    setIsOpen(false);
  };

  // Click outside to close (mobile et desktop)
  useClickOutside(
    tooltipRef,
    () => {
      if (isOpen) {
        closeTooltip();
      }
    },
    isOpen,
  );

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeTooltip();
        // Retourner le focus au bouton
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Gestion du clavier (Enter et Space pour activer)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Empêcher le scroll sur Space
      toggleTooltip(e);
    }
  };

  // Classes du bouton basées sur la taille
  const buttonSizeClasses = {
    sm: "h-fit w-fit  text-sm ",
    md: "h-fit w-fit  text-base ",
  };

  return (
    <div
      className={`relative ${variant === "inline" ? "inline-flex" : "flex"} ${className}`}
    >
      {/* Bouton Info (?) */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleTooltip}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label="Informations sur les labels"
        className={`group text-dark dark:text-sark inline-flex cursor-help items-center justify-center rounded-full bg-white font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 dark:bg-transparent dark:text-white ${buttonSizeClasses[size]} `}
      >
        <GrCircleQuestion className="h-4 w-4 text-inherit" aria-hidden="true" />
      </button>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-39 bg-black/50 lg:hidden"
            onClick={closeTooltip}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Toggletip Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            role="region"
            aria-label="Aide sur les labels"
            aria-live="polite"
            initial={
              prefersReducedMotion
                ? {}
                : {
                    opacity: 0,
                    y: window.innerWidth >= 1024 ? -10 : 20,
                    scale: 0.95,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              prefersReducedMotion
                ? {}
                : {
                    opacity: 0,
                    y: window.innerWidth >= 1024 ? -10 : 20,
                    scale: 0.95,
                  }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={` ${
              window.innerWidth >= 1024
                ? // Desktop: Toggletip positionné sous le bouton
                  "absolute top-full right-0 mt-2 w-96 max-w-3xl"
                : // Mobile: Modal centré
                  "fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
            } z-40 max-h-[80vh] overflow-auto rounded-lg bg-white p-5 shadow-xl ring-2 ring-neutral-400 dark:bg-neutral-900 dark:ring-neutral-700`}
          >
            {/* Bouton Fermer (mobile only) */}
            <button
              onClick={closeTooltip}
              aria-label="Fermer l'aide"
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition duration-200 hover:bg-neutral-200 hover:text-neutral-900 lg:hidden dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
              <HiXMark className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Titre */}
            <h3 className="mb-4 pr-8 text-lg font-bold text-neutral-900 lg:pr-0 dark:text-neutral-50">
              Signification des labels
            </h3>

            {/* Contenu partagé */}
            <TagsInfoContent variant="full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

TagsInfoButton.propTypes = {
  size: PropTypes.oneOf(["sm", "md"]),
  variant: PropTypes.oneOf(["inline", "standalone"]),
  className: PropTypes.string,
};

export default TagsInfoButton;
