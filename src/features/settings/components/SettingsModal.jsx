import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { IoChevronDown, IoWarning } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  ARIA_CLOSE,
  ARIA_RESET_STORAGE,
  BUTTON_SETTINGS,
  SETTINGS_COOKIES_LABEL,
  SETTINGS_PERFORMANCE_LABEL,
  SETTINGS_RESET_LABEL,
  SETTINGS_THEME_LABEL,
} from "../../../constants/buttonLabels";
import { COOKIE_CATEGORIES } from "../../cookie-consent/constants/cookieConfig";
import { usePerformance } from "../context/PerformanceContext";
import { useSettingsModal } from "../context/SettingsModalContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import AnalyticsToggle from "./AnalyticsToggle";
import DarkModeToggle from "./DarkModeToggle";
import HistoryToggle from "./HistoryToggle";
import PerformanceToggle from "./PerformanceToggle";

/**
 * SettingsModal Component
 *
 * Modal displaying application settings:
 * - Dark mode toggle
 * - Performance mode toggle
 * - Cookie management
 *
 * @component
 */
export default function SettingsModal() {
  const {
    isOpen,
    shouldOpenCookieSection,
    closeSettings,
    resetCookieSectionFlag,
  } = useSettingsModal();
  const prefersReducedMotion = useReducedMotion();
  const { isHighPerformance } = usePerformance();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isCookieSectionOpen, setIsCookieSectionOpen] = useState(false);

  // Auto-open cookie section when requested from CookieBanner
  // Auto-open cookie section when requested from CookieBanner
  useEffect(() => {
    if (shouldOpenCookieSection && isOpen) {
      // Eviter le setState synchrone en le mettant dans un RAF
      const rafId = requestAnimationFrame(() => {
        setIsCookieSectionOpen(true);
        resetCookieSectionFlag();
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [shouldOpenCookieSection, isOpen, resetCookieSectionFlag]);

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
        closeSettings();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeSettings]);

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

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    const keysToRemove = [
      "tradimedika-theme",
      "tradimedika-performance",
      "tradimedika-search-history",
      "tradimedika-cookie-consent",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  const toggleCookieSection = () => {
    setIsCookieSectionOpen(!isCookieSectionOpen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={closeSettings}
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
            <div className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2
                  id="settings-modal-title"
                  className="text-dark dark:text-light flex items-center gap-2 text-lg font-semibold"
                >
                  <IoMdSettings className="text-xl" />
                  {BUTTON_SETTINGS}
                </h2>
                <button
                  onClick={closeSettings}
                  aria-label={ARIA_CLOSE}
                  className="cursor-pointer rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Vos préférences sont sauvegardées automatiquement
              </p>
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

              {/* Cookie management section */}
              <div className="border-t border-neutral-200 pt-6 dark:border-neutral-700">
                <button
                  onClick={toggleCookieSection}
                  className="mb-4 flex w-full items-center justify-between text-left transition-colors hover:opacity-80"
                  aria-expanded={isCookieSectionOpen}
                  aria-controls="cookie-section-content"
                >
                  <div>
                    <h3 className="text-dark dark:text-light flex items-center gap-2 text-base font-medium">
                      {SETTINGS_COOKIES_LABEL}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Gérer vos préférences de cookies
                    </p>
                  </div>
                  <IoChevronDown
                    className={`text-xl text-neutral-600 transition-transform dark:text-neutral-400 ${
                      isCookieSectionOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isCookieSectionOpen && (
                    <motion.div
                      id="cookie-section-content"
                      initial={
                        prefersReducedMotion ? {} : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion ? {} : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4">
                        {/* Cookies nécessaires */}
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {COOKIE_CATEGORIES.necessary.label}
                            </h4>
                            <span className="rounded-md bg-emerald-200 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-700 dark:text-emerald-200">
                              Toujours activé
                            </span>
                          </div>
                          <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
                            {COOKIE_CATEGORIES.necessary.description}
                          </p>
                          <details className="cursor-pointer">
                            <summary className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                              Voir les détails
                            </summary>
                            <ul className="mt-2 space-y-1 pl-3">
                              {COOKIE_CATEGORIES.necessary.cookies.map(
                                (cookie) => (
                                  <li
                                    key={cookie.name}
                                    className="text-xs text-neutral-600 dark:text-neutral-400"
                                  >
                                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                                      {cookie.name}
                                    </span>
                                    <br />
                                    {cookie.purpose}
                                  </li>
                                ),
                              )}
                            </ul>
                          </details>
                        </div>

                        {/* Historique de recherche */}
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {COOKIE_CATEGORIES.history.label}
                            </h4>
                            <HistoryToggle />
                          </div>
                          <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
                            {COOKIE_CATEGORIES.history.description}
                          </p>
                          <details className="cursor-pointer">
                            <summary className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                              Voir les détails
                            </summary>
                            <ul className="mt-2 space-y-1 pl-3">
                              {COOKIE_CATEGORIES.history.cookies.map(
                                (cookie) => (
                                  <li
                                    key={cookie.name}
                                    className="text-xs text-neutral-600 dark:text-neutral-400"
                                  >
                                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                                      {cookie.name}
                                    </span>
                                    <br />
                                    {cookie.purpose}
                                  </li>
                                ),
                              )}
                            </ul>
                          </details>
                        </div>

                        {/* Cookies analytics */}
                        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {COOKIE_CATEGORIES.analytics.label}
                            </h4>
                            <AnalyticsToggle />
                          </div>
                          <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
                            {COOKIE_CATEGORIES.analytics.description}
                          </p>
                          <details className="cursor-pointer">
                            <summary className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                              Voir les détails
                            </summary>
                            <ul className="mt-2 space-y-1 pl-3">
                              {COOKIE_CATEGORIES.analytics.cookies.map(
                                (cookie) => (
                                  <li
                                    key={cookie.name}
                                    className="text-xs text-neutral-600 dark:text-neutral-400"
                                  >
                                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                                      {cookie.name}
                                    </span>
                                    <br />
                                    {cookie.purpose}
                                  </li>
                                ),
                              )}
                            </ul>
                          </details>
                        </div>

                        {/* Reset storage section */}
                        <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                          <div className="flex-1">
                            <h4 className="text-dark dark:text-light text-sm font-semibold">
                              {SETTINGS_RESET_LABEL}
                            </h4>
                            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                              Supprimer toutes les préférences
                            </p>
                          </div>
                          <button
                            onClick={handleResetRequest}
                            aria-label={ARIA_RESET_STORAGE}
                            className="cursor-pointer rounded-lg border-2 border-red-700 bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition-all duration-200 hover:border-red-800 hover:bg-red-700 hover:text-white dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800"
                          >
                            <RiDeleteBin2Fill className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Reset confirmation dialog */}
          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/50"
              onClick={handleCancelReset}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="reset-confirm-dialog-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="dark:bg-dark mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl lg:max-w-xl"
              >
                {/* Icône warning + titre */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full"></div>
                  <h3
                    id="reset-confirm-dialog-title"
                    className="text-lg font-bold text-neutral-900 dark:text-white"
                  >
                    Confirmer la réinitialisation des cookies
                  </h3>
                </div>

                {/* Avertissement en rouge */}
                <div className="mb-4 rounded-lg border-2 border-dashed border-amber-700/60 bg-amber-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-amber-400/60 dark:bg-amber-950/80">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                    <IoWarning className="inline-flex text-lg text-amber-700 dark:text-amber-400" />{" "}
                    ATTENTION : Cette action est irréversible
                  </p>
                  <p className="mt-2 text-sm font-medium text-amber-800 dark:text-amber-200">
                    Les données suivantes seront définitivement supprimées :
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm font-medium text-amber-800 dark:text-amber-200">
                    <li>Thème (mode sombre/clair)</li>
                    <li>Préférences d&apos;animations</li>
                    <li>Historique de recherche</li>
                    <li>Préférences de cookies</li>
                  </ul>
                </div>

                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                  La page sera rechargée automatiquement après la
                  réinitialisation.
                </p>

                {/* Boutons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelReset}
                    aria-label="Annuler"
                    className="flex-1 cursor-pointer rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-2.5 font-medium text-neutral-100 transition-colors hover:border-neutral-700 hover:bg-neutral-950 hover:text-white dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConfirmReset}
                    aria-label="Réinitialiser toutes les données"
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-700 bg-red-100 text-sm font-semibold text-red-700 transition-all duration-200 hover:border-red-800 hover:bg-red-700 hover:text-white dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800"
                  >
                    <RiDeleteBin2Fill className="text-lg" />
                    <span>Réinitialiser</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
