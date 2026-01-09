// components/search/SearchHistoryModal.jsx
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin2Fill, RiHistoryLine } from "react-icons/ri";

import { ARIA_CLOSE, BUTTON_CLEAR_HISTORY } from "../../constants/buttonLabels";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import SearchHistoryItem from "./SearchHistoryItem";

/**
 * SearchHistoryModal Component
 *
 * Modal/Drawer displaying search history with:
 * - Backdrop overlay (closes on click)
 * - History items list
 * - Clear all button
 * - Focus trap
 * - Escape key to close
 * - Animations
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Array} props.history - Array of search history entries
 * @param {Function} props.onSearchSelect - Callback when a search is selected
 * @param {Function} props.onClearHistory - Callback to clear all history
 * @param {Function} props.onRemoveItem - Callback to remove a single item
 */
export default function SearchHistoryModal({
  isOpen,
  onClose,
  history,
  onSearchSelect,
  onClearHistory,
  onRemoveItem,
}) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Focus trap: save previous focus and restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Focus the modal when it opens (using requestAnimationFrame for better timing)
      const rafId = requestAnimationFrame(() => {
        modalRef.current?.focus();
      });

      return () => cancelAnimationFrame(rafId);
    } else {
      // Restore focus when modal closes (verify element is still in DOM)
      if (
        previousFocusRef.current &&
        document.contains(previousFocusRef.current)
      ) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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

  const handleClearAllRequest = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClear = () => {
    onClearHistory();
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelClear = () => {
    setShowConfirmDialog(false);
  };

  const handleSearchSelect = (search) => {
    onSearchSelect(search);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
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
            aria-labelledby="history-modal-title"
            tabIndex={-1}
            className="dark:bg-dark fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl lg:top-1/2 lg:mx-auto lg:max-h-full lg:w-4/6 2xl:w-7/20"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2
                  id="history-modal-title"
                  className="text-dark dark:text-light text-lg font-semibold"
                >
                  <RiHistoryLine className="inline lg:mr-2" /> Historique de
                  recherche
                </h2>
                <button
                  onClick={onClose}
                  aria-label={ARIA_CLOSE}
                  className="cursor-pointer rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Les 10 dernières recherches sont conservées automatiquement
              </p>
            </div>

            {/* Content */}
            {history.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-neutral-500 dark:text-neutral-400">
                  Aucun historique de recherche
                </p>
                <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">
                  Vos recherches apparaîtront ici
                </p>
              </div>
            ) : (
              /* History items */
              <ul role="list" className="space-y-3">
                {history.map((search) => (
                  <SearchHistoryItem
                    key={search.id}
                    search={search}
                    onClick={handleSearchSelect}
                    onRemove={onRemoveItem}
                  />
                ))}
              </ul>
            )}

            {/* Clear all button - always rendered, just disabled when no history */}
            <div className="mt-6 flex justify-end border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <button
                onClick={handleClearAllRequest}
                disabled={history.length === 0}
                className={`w-fit rounded-lg border-2 px-4 py-2.5 font-medium transition-all duration-200 ${
                  history.length === 0
                    ? "cursor-not-allowed border-neutral-300 bg-neutral-100 text-neutral-400 opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-500"
                    : "cursor-pointer border-red-700 bg-red-100 text-red-700 hover:border-red-800 hover:bg-red-800 hover:text-white dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800"
                }`}
                aria-label="Effacer tout l'historique"
                aria-disabled={history.length === 0}
              >
                {BUTTON_CLEAR_HISTORY}
              </button>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={handleCancelClear}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="confirm-dialog-title"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="dark:bg-dark mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl lg:max-w-xl"
                >
                  <h3
                    id="confirm-dialog-title"
                    className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white"
                  >
                    Confirmer la suppression
                  </h3>
                  <p className="mb-6 font-medium text-neutral-600 dark:text-neutral-400">
                    Êtes-vous sûr de vouloir effacer tout l&apos;historique ?{" "}
                    <br />{" "}
                    <span className="font-bold">
                      Cette action est irréversible.
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelClear}
                      aria-label="Annuler"
                      className="flex-1 cursor-pointer rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-2.5 font-medium text-neutral-100 transition-colors hover:border-neutral-700 hover:bg-neutral-950 hover:text-white dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleConfirmClear}
                      aria-label="Supprimer tout l'historique"
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-700 bg-red-100 text-sm font-semibold text-red-700 transition-all duration-200 hover:border-red-800 hover:bg-red-700 hover:text-white dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800"
                    >
                      <RiDeleteBin2Fill className="text-lg" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

SearchHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
      timestamp: PropTypes.number.isRequired,
      resultCount: PropTypes.number,
    }),
  ).isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
