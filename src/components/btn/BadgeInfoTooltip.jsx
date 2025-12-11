// tradimedika-v1/src/components/btn/BadgeInfoTooltip.jsx

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrCircleQuestion } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";
import VerifiedBadge from "../badge/VerifiedBadge";
import PregnancyBadge from "../badge/PregnancyBadge";
import ChildrenAgeBadge from "../badge/ChildrenAgeBadge";

/**
 * BadgeInfoTooltip Component
 *
 * Affiche un bouton "?" qui révèle un tooltip explicatif des badges
 * (Vérifié, Grossesse OK, Enfants X+ ans).
 *
 * Comportement:
 * - Mobile: Click pour toggle, overlay modal centré, slide from bottom
 * - Desktop (lg:): Hover pour afficher, fade from top, positionné en dessous
 * - Click outside et Escape key pour fermer
 * - Backdrop semi-transparent sur mobile
 */

function BadgeInfoTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle tooltip (mobile click)
  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  // Fermer tooltip
  const closeTooltip = () => {
    setIsOpen(false);
  };

  // Desktop: Open on hover
  const handleMouseEnter = () => {
    // Only on desktop (lg breakpoint)
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  };

  // Desktop: Close on mouse leave
  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false);
    }
  };

  // Click outside to close (mobile)
  useEffect(() => {
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeTooltip();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Bouton "?" */}
      <button
        ref={buttonRef}
        onClick={toggleTooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Informations sur les badges"
        aria-expanded={isOpen}
        className="inline-flex h-12 w-12 items-center justify-center rounded-lg ring-2 ring-neutral-300 bg-white text-neutral-800 shadow-md transition duration-200 hover:ring-emerald-600 hover:text-emerald-600 focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:ring-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:ring-emerald-500 dark:hover:text-emerald-500"
      >
        <GrCircleQuestion className="h-6 w-6" />
      </button>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeTooltip}
          />
        )}
      </AnimatePresence>

      {/* Tooltip Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            role="tooltip"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg ring ring-neutral-300 bg-neutral-100 p-5 shadow-xl dark:ring-neutral-600 dark:bg-neutral-800 lg:absolute lg:left-0 lg:top-full lg:mt-2 lg:translate-x-0 lg:translate-y-0"
            style={{
              // Desktop: slide from top
              ...(window.innerWidth >= 1024 && {
                y: -10,
              }),
            }}
          >
            {/* Bouton Fermer (mobile) */}
            <button
              onClick={closeTooltip}
              aria-label="Fermer"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition duration-200 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 lg:hidden"
            >
              <HiXMark className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Titre */}
            <h3 className="mb-4 pr-8 text-lg font-bold text-neutral-800 dark:text-neutral-100 lg:pr-0">
              Signification des badges
            </h3>

            {/* Liste des badges */}
            <div className="space-y-4">
              {/* Badge Vérifié */}
              <div className="flex items-start gap-3">
                <VerifiedBadge />
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Ce remède a été confirmé comme sûr, vérifier les
                  contre-indications
                </p>
              </div>

              {/* Badge Grossesse OK */}
              <div className="flex items-start gap-3">
                <PregnancyBadge variant="default" />
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Ce remède peut être utilisé sans danger pendant la grossesse
                </p>
              </div>

              {/* Badge Enfants X+ ans */}
              <div className="flex items-start gap-3">
                <ChildrenAgeBadge age={3} />
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Ce remède est adapté aux enfants à partir de X ans
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BadgeInfoTooltip;
