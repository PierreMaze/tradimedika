import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { TbFilterCog } from "react-icons/tb";
import { useReducedMotion } from "../../settings/hooks/useReducedMotion";
import { FILTER_CATEGORIES } from "../utils/filterRemedies";
import FilterAccordion from "./FilterAccordion";

/**
 * FilterModal Component
 *
 * Modal pour afficher les filtres organisés en accordéons
 * Design cohérent avec SettingsModal
 * Gère l'accessibilité (focus trap, ESC pour fermer)
 * Les filtres ne s'appliquent qu'au clic sur "Appliquer"
 *
 * Props:
 * - isOpen: Modal ouverte ou fermée
 * - onClose: Fonction pour fermer la modal (annule les changements)
 * - tempFilters: Objet des filtres temporaires (avant validation)
 * - onToggleTempFilter: Fonction pour toggle un filtre temporaire
 * - onResetTempFilters: Fonction pour réinitialiser les filtres temporaires
 * - onApplyFilters: Fonction pour appliquer les filtres et fermer la modal
 */
function FilterModal({
  isOpen,
  onClose,
  tempFilters,
  onToggleTempFilter,
  onResetTempFilters,
  onApplyFilters,
}) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      const rafId = requestAnimationFrame(() => {
        modalRef.current?.focus();
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      if (
        previousFocusRef.current &&
        document.contains(previousFocusRef.current)
      ) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-title"
            tabIndex={-1}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[85vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 dark:bg-neutral-900"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2
                  id="filter-modal-title"
                  className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  <TbFilterCog className="text-xl" aria-hidden="true" />
                  Filtrer les remèdes
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="cursor-pointer rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Sélectionnez les critères pour affiner votre recherche
              </p>
            </div>

            {/* Filter categories */}
            <div className="mb-6 space-y-0">
              {FILTER_CATEGORIES.map((category) => (
                <FilterAccordion
                  key={category.id}
                  category={category}
                  activeFilters={tempFilters[category.id]}
                  onToggle={onToggleTempFilter}
                  isOpenByDefault={true}
                />
              ))}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <button
                onClick={onResetTempFilters}
                className="rounded-md px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Réinitialiser
              </button>

              <button
                onClick={onApplyFilters}
                className="rounded-md bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Appliquer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tempFilters: PropTypes.object.isRequired,
  onToggleTempFilter: PropTypes.func.isRequired,
  onResetTempFilters: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};

export default FilterModal;
