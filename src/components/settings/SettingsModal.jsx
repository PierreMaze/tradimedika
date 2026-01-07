import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import {
  ARIA_CLOSE,
  BUTTON_SETTINGS,
  SETTINGS_PERFORMANCE_LABEL,
  SETTINGS_THEME_LABEL,
} from "../../constants/buttonLabels";
import { usePerformance } from "../../context/PerformanceContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import DarkModeToggle from "../btn/DarkModeToggle";
import PerformanceToggle from "../btn/PerformanceToggle";

/**
 * SettingsModal Component
 *
 * Modal displaying application settings:
 * - Dark mode toggle
 * - Performance mode toggle
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 */
export default function SettingsModal({ isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const { isHighPerformance } = usePerformance();
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
            aria-labelledby="settings-modal-title"
            tabIndex={-1}
            className="dark:bg-dark fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-lg md:-translate-x-1/2"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <h2
                id="settings-modal-title"
                className="text-dark dark:text-light flex items-center gap-2 text-lg font-semibold"
              >
                <IoMdSettings className="text-xl" />
                {BUTTON_SETTINGS}
              </h2>
              <button
                onClick={onClose}
                aria-label={ARIA_CLOSE}
                className="cursor-pointer rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>

            {/* Settings sections */}
            <div className="space-y-6">
              {/* Theme section */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-dark dark:text-light text-base font-medium">
                    {SETTINGS_THEME_LABEL}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Activer le mode sombre
                  </p>
                </div>
                <DarkModeToggle />
              </div>

              {/* Performance section */}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-700">
                <div className="flex-1">
                  <h3 className="text-dark dark:text-light text-base font-medium">
                    {SETTINGS_PERFORMANCE_LABEL}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    {isHighPerformance ? (
                      <>
                        Toutes les animations d&apos;arrière-plan{" "}
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          activées
                        </span>
                      </>
                    ) : (
                      <>
                        Animations d&apos;arrière-plan{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          désactivées
                        </span>
                      </>
                    )}
                  </p>
                  <motion.div
                    key={isHighPerformance ? "high" : "low"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2"
                  ></motion.div>
                </div>
                <PerformanceToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
