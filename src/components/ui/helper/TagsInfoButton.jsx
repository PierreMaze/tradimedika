// tradimedika/src/components/ui/helper/TagsInfoButton.jsx

import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";
import { useReducedMotion } from "../../../features/settings/hooks/useReducedMotion";
import TagsInfoContent from "./TagsInfoContent";

/**
 * TagsInfoButton Component
 *
 * Bouton affichant un popover contextuel avec explications des tags.
 * Comportement adaptatif selon le device.
 *
 * Props:
 * - label: Texte à afficher avant l'icône (optionnel)
 * - size: 'sm' | 'md' (défaut: 'md')
 * - variant: 'inline' | 'standalone' (défaut: 'inline')
 * - className: Classes CSS additionnelles
 *
 * Comportement:
 * - Desktop (≥ 1024px):
 *   - Hover pour ouvrir
 *   - MouseLeave du popover pour fermer
 *   - Bloque le scroll de la page (body overflow:hidden)
 *   - Scroll uniquement dans le popover
 *   - Flèche visible pointant vers le bouton
 * - Mobile (< 1024px):
 *   - Clic pour toggle
 *   - Clic extérieur ou Escape pour fermer
 *
 * Accessibilité WCAG 2.2 AA:
 * - aria-expanded pour indiquer l'état
 * - aria-label descriptif
 * - Navigation clavier (Tab, Enter, Space, Escape)
 * - Cibles tactiles ≥ 44x44px
 * - role="region" avec aria-live="polite"
 */
function TagsInfoButton({
  label,
  size = "md",
  variant = "inline",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    placement: "bottom-right",
  });
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculatePosition = () => {
    if (!buttonRef.current || !isDesktop) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popoverWidth = 640;
    const popoverMaxHeight = window.innerHeight * 0.8;
    const spacing = 12;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let placement = "bottom-right";

    const spaceRight = viewportWidth - buttonRect.right;
    const spaceLeft = buttonRect.left;
    const spaceBelow = viewportHeight - buttonRect.bottom;

    if (spaceRight >= popoverWidth + spacing) {
      left = buttonRect.right + spacing;
      top = Math.max(
        spacing,
        Math.min(buttonRect.top, viewportHeight - popoverMaxHeight - spacing),
      );
      placement = "right";
    } else if (spaceLeft >= popoverWidth + spacing) {
      left = buttonRect.left - popoverWidth - spacing;
      top = Math.max(
        spacing,
        Math.min(buttonRect.top, viewportHeight - popoverMaxHeight - spacing),
      );
      placement = "left";
    } else if (spaceBelow >= 300) {
      top = buttonRect.bottom + spacing;
      left = Math.max(
        spacing,
        Math.min(buttonRect.left, viewportWidth - popoverWidth - spacing),
      );
      placement = "bottom";
    } else {
      top = Math.max(spacing, buttonRect.top - 300 - spacing);
      left = Math.max(
        spacing,
        Math.min(buttonRect.left, viewportWidth - popoverWidth - spacing),
      );
      placement = "top";
    }

    setPopoverPosition({ top, left, placement });
  };

  const openTooltip = () => {
    setIsOpen(true);
  };

  const closeTooltip = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(false);
  };

  const handlePopoverClick = (e) => {
    e.stopPropagation();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isDesktop) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      calculatePosition();
      openTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      closeTooltip();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeTooltip();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeTooltip();
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isDesktop && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  const buttonSizeClasses = {
    sm: "min-h-[44px] min-w-[44px] h-fit w-fit text-sm",
    md: "min-h-[44px] min-w-[44px] h-fit w-fit text-base",
  };

  return (
    <div
      className={`relative ${variant === "inline" ? "inline-flex" : "flex"} ${className}`}
    >
      {/* Bouton Info (?) */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label={
          label ? `${label} - Informations` : "Informations sur les labels"
        }
        className={`group inline-flex cursor-help items-center gap-2 rounded-full bg-transparent font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 dark:text-white ${buttonSizeClasses[size]}`}
      >
        {label && (
          <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
            {label}
          </span>
        )}
        <GrCircleQuestion className="h-4 w-4 text-inherit" aria-hidden="true" />
      </button>

      {/* Backdrop et Toggletip montés au niveau body via Portal */}
      {isOpen &&
        createPortal(
          <>
            {/* Backdrop - bloque les clics sur les cards */}
            <AnimatePresence>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50 lg:pointer-events-none lg:bg-transparent"
                onClick={closeTooltip}
                aria-hidden="true"
              />
            </AnimatePresence>

            {/* Toggletip Content */}
            <AnimatePresence>
              <motion.div
                ref={tooltipRef}
                role="region"
                aria-label="Aide sur les labels"
                aria-live="polite"
                onClick={handlePopoverClick}
                onMouseLeave={handleMouseLeave}
                initial={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: 0,
                        y: isDesktop ? -10 : 20,
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
                        y: isDesktop ? -10 : 20,
                        scale: 0.95,
                      }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={
                  isDesktop
                    ? {
                        top: `${popoverPosition.top}px`,
                        left: `${popoverPosition.left}px`,
                      }
                    : {}
                }
                className={` ${
                  isDesktop
                    ? "fixed w-full max-w-3xl"
                    : "fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
                } z-60 max-h-[80vh] overflow-auto rounded-xl bg-white p-6 shadow-2xl ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-700`}
              >
                {/* Bouton Fermer (mobile only) */}
                {!isDesktop && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTooltip(e);
                    }}
                    aria-label="Fermer l'aide"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                  >
                    <HiXMark className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}

                {/* Titre */}
                <h3
                  className={`border-b-2 border-dashed border-emerald-200 pb-4 text-xl font-bold text-neutral-900 lg:text-2xl dark:border-emerald-700 dark:text-neutral-50 ${!isDesktop ? "pr-8" : ""}`}
                >
                  <GrCircleQuestion className="mr-2 inline-block h-5 w-5 lg:h-6 lg:w-6" />
                  Signification des labels
                </h3>

                {/* Contenu partagé */}
                <TagsInfoContent variant="full" />
              </motion.div>
            </AnimatePresence>
          </>,
          document.body,
        )}
    </div>
  );
}

TagsInfoButton.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  variant: PropTypes.oneOf(["inline", "standalone"]),
  className: PropTypes.string,
};

export default TagsInfoButton;
