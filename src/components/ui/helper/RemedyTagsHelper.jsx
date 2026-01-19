// tradimedika/src/components/ui/helper/RemedyTagsHelper.jsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GrCircleQuestion } from "react-icons/gr";
import { HiXMark } from "react-icons/hi2";
import {
  ChildrenAgeTag,
  PregnancyTag,
  TraditionnalTag,
  VerifiedTag,
} from "../../tags";

/**
 * RemedyTagsHelper Component
 *
 * Affiche un bouton "?" qui révèle un tooltip explicatif des tags
 * (Vérifié, Grossesse OK, Enfants X+ ans).
 *
 * Comportement:
 * - Mobile: Click pour toggle, overlay modal centré, slide from bottom
 * - Desktop (lg:): Hover pour afficher, fade from top, positionné en dessous
 * - Click outside et Escape key pour fermer
 * - Backdrop semi-transparent sur mobile
 */

function RemedyTagsHelper() {
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
    <div className="fixed right-6 bottom-6 z-50 lg:right-8 lg:bottom-8 2xl:right-12 2xl:bottom-12">
      {/* Bouton "?" */}
      <button
        ref={buttonRef}
        onClick={toggleTooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Informations sur les tags"
        aria-expanded={isOpen}
        className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-700 transition duration-200 hover:bg-emerald-700 hover:shadow-xl hover:ring-emerald-800 lg:h-16 lg:w-16 dark:bg-emerald-500 dark:text-neutral-900 dark:ring-emerald-600 dark:hover:bg-emerald-600 dark:hover:ring-emerald-700"
      >
        <GrCircleQuestion className="h-7 w-7 lg:h-9 lg:w-9" />
      </button>

      {/* Backdrop (mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
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
              y: window.innerWidth >= 1024 ? -20 : 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: window.innerWidth >= 1024 ? -20 : 20,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-60 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-xl ring-2 ring-neutral-400 lg:absolute lg:top-auto lg:right-0 lg:bottom-full lg:left-auto lg:mb-2 lg:w-142 lg:max-w-3xl lg:translate-x-0 lg:translate-y-0 dark:bg-neutral-900 dark:ring-neutral-700"
          >
            {/* Bouton Fermer (mobile) */}
            <button
              onClick={closeTooltip}
              aria-label="Fermer"
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 transition duration-200 hover:bg-neutral-200 hover:text-neutral-900 lg:hidden dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
              <HiXMark className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Titre */}
            <h3 className="mb-4 pr-8 text-lg font-bold text-neutral-900 lg:pr-0 dark:text-neutral-50">
              Signification des tags
            </h3>

            {/* Liste des tags */}
            <div className="space-y-6">
              {/* Tag Vérifié */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <VerifiedTag />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Ce remède a été approuvé par un professionnel de santé, il est
                  donc considéré comme un remède prouvé pour son efficacité,{" "}
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    vérifier les contre-indications.
                  </span>
                </p>
              </div>

              {/* Tag Traditionnel */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <TraditionnalTag />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Ce remède repose principalement sur un usage traditionnel. Son
                  efficacité n’est pas validée par des études scientifiques
                  solides.
                </p>
              </div>

              {/* Tag Grossesse OK */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <PregnancyTag variant="ok" />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  L&apos;usage de ce remède est considéré comme compatible avec
                  la grossesse aux doses indiquées.
                </p>
              </div>

              {/* Tag Grossesse ? */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <PregnancyTag variant="variant" />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Données insuffisantes ou usage conditionnel. Consulter un
                  professionnel de santé avant utilisation pendant la grossesse.
                </p>
              </div>

              {/* Tag Grossesse Interdite */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <PregnancyTag variant="interdit" />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Ce remède est contre-indiqué pendant la grossesse. Ne pas
                  utiliser.
                </p>
              </div>

              {/* Tag Enfants (tous âges) */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <ChildrenAgeTag age={null} />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Ce remède peut être utilisé chez l&apos;enfant sans limite
                  d&apos;âge, dans le respect des doses recommandées.
                </p>
              </div>

              {/* Tag Enfants +X ans */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <ChildrenAgeTag age={6} />
                <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Ce remède peut être utilisé chez l&apos;enfant à partir de 6
                  ans (exemple), dans le respect des doses recommandées.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RemedyTagsHelper;
