// components/search/SearchHistoryModal.jsx
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { BUTTON_CLEAR_HISTORY, ARIA_CLOSE } from "../../constants/buttonLabels";
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

  // Focus trap: save previous focus and restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Focus the modal when it opens
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
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

  const handleClearAll = () => {
    onClearHistory();
    onClose();
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
            className="dark:bg-dark fixed inset-x-4 top-1/2 z-50 max-h-[80vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl sm:inset-x-auto sm:w-full sm:max-w-2xl"
            initial={
              prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: "-45%" }
            }
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={
              prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: "-45%" }
            }
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <h2
                id="history-modal-title"
                className="text-dark dark:text-light text-xl font-semibold"
              >
                🕒 Historique de recherche
              </h2>
              <button
                onClick={onClose}
                aria-label={ARIA_CLOSE}
                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              >
                <IoMdClose className="text-2xl" />
              </button>
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
              <>
                {/* History items */}
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

                {/* Clear all button */}
                <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                  <button
                    onClick={handleClearAll}
                    className="w-full rounded-lg border-2 border-neutral-300 px-4 py-2.5 font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
                    aria-label="Effacer tout l'historique"
                  >
                    {BUTTON_CLEAR_HISTORY}
                  </button>
                </div>
              </>
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
