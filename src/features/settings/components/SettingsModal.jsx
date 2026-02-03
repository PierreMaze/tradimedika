import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoChevronDown, IoWarning } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";
import {
  ARIA_RESET_STORAGE,
  BUTTON_SETTINGS,
  SETTINGS_COOKIES_LABEL,
  SETTINGS_HISTORY_LABEL,
  SETTINGS_PERFORMANCE_LABEL,
  SETTINGS_RESET_LABEL,
  SETTINGS_THEME_LABEL,
} from "../../../constants/buttonLabels";
import { COOKIE_CATEGORIES } from "../../cookie-consent/constants/cookieConfig";
import { usePerformance } from "../context/PerformanceContext";
import { useSettingsModal } from "../context/SettingsModalContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import AllergiesToggle from "./AllergiesToggle";
import AnalyticsToggle from "./AnalyticsToggle";
import DarkModeToggle from "./DarkModeToggle";
import HistoryToggle from "./HistoryToggle";
import PerformanceToggle from "./PerformanceToggle";

export default function SettingsModal() {
  const {
    isOpen,
    shouldOpenCookieSection,
    closeSettings,
    resetCookieSectionFlag,
  } = useSettingsModal();
  const prefersReducedMotion = useReducedMotion();
  const { isHighPerformance } = usePerformance();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isHistorySectionOpen, setIsHistorySectionOpen] = useState(false);
  const [isCookieSectionOpen, setIsCookieSectionOpen] = useState(false);

  useEffect(() => {
    if (shouldOpenCookieSection && isOpen) {
      const rafId = requestAnimationFrame(() => {
        setIsCookieSectionOpen(true);
        resetCookieSectionFlag();
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [shouldOpenCookieSection, isOpen, resetCookieSectionFlag]);

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    const keysToRemove = [
      "tradimedika-theme",
      "tradimedika-performance",
      "tradimedika-search-history",
      "tradimedika-cookie-consent",
      "tradimedika-allergies",
      "tradimedika-allergies-filtering-enabled",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  const toggleHistorySection = () => {
    setIsHistorySectionOpen(!isHistorySectionOpen);
  };

  const toggleCookieSection = () => {
    setIsCookieSectionOpen(!isCookieSectionOpen);
  };

  return (
    <>
      <ModalLayout
        isOpen={isOpen && !showResetConfirm}
        onClose={closeSettings}
        title={BUTTON_SETTINGS}
        icon={IoMdSettings}
        subtitle="Vos préférences sont sauvegardées automatiquement"
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Theme section */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
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
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
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
            </div>
            <PerformanceToggle />
          </div>

          {/* History section */}
          <div className="border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <button
              onClick={toggleHistorySection}
              className="mb-4 flex w-full cursor-pointer items-center justify-between text-left transition-colors hover:opacity-80"
              aria-expanded={isHistorySectionOpen}
              aria-controls="history-section-content"
            >
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {SETTINGS_HISTORY_LABEL}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Gérer la sauvegarde de vos données
                </p>
              </div>
              <IoChevronDown
                className={`text-xl text-neutral-600 transition-transform dark:text-neutral-400 ${
                  isHistorySectionOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isHistorySectionOpen && (
                <motion.div
                  id="history-section-content"
                  initial={
                    prefersReducedMotion ? {} : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4">
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
                          {COOKIE_CATEGORIES.history.cookies.map((cookie) => (
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
                          ))}
                        </ul>
                      </details>
                    </div>

                    {/* Allergies sauvegardées */}
                    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {COOKIE_CATEGORIES.allergies.label}
                        </h4>
                        <AllergiesToggle />
                      </div>
                      <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
                        {COOKIE_CATEGORIES.allergies.description}
                      </p>
                      <details className="cursor-pointer">
                        <summary className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                          Voir les détails
                        </summary>
                        <ul className="mt-2 space-y-1 pl-3">
                          {COOKIE_CATEGORIES.allergies.cookies.map((cookie) => (
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
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cookie management section */}
          <div className="border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <button
              onClick={toggleCookieSection}
              className="mb-4 flex w-full cursor-pointer items-center justify-between text-left transition-colors hover:opacity-80"
              aria-expanded={isCookieSectionOpen}
              aria-controls="cookie-section-content"
            >
              <div>
                <h3 className="flex items-center gap-2 text-base font-medium text-neutral-900 dark:text-neutral-100">
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
                  exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
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
                          {COOKIE_CATEGORIES.necessary.cookies.map((cookie) => (
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
                          ))}
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
                          {COOKIE_CATEGORIES.analytics.cookies.map((cookie) => (
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
                          ))}
                        </ul>
                      </details>
                    </div>

                    {/* Reset storage section */}
                    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {SETTINGS_RESET_LABEL}
                        </h4>
                        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                          Supprimer toutes les préférences
                        </p>
                      </div>
                      <ModalButton
                        variant="danger"
                        onClick={handleResetRequest}
                        ariaLabel={ARIA_RESET_STORAGE}
                        icon={RiDeleteBin2Fill}
                        className="min-h-[44px] min-w-[44px] px-3 py-2"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ModalLayout>

      {/* Reset confirmation dialog */}
      <ModalLayout
        isOpen={showResetConfirm}
        onClose={handleCancelReset}
        title="Confirmer la réinitialisation des cookies"
        maxWidth="xl"
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleCancelReset}>
              Annuler
            </ModalButton>
            <ModalButton
              variant="danger"
              onClick={handleConfirmReset}
              icon={RiDeleteBin2Fill}
            >
              Réinitialiser
            </ModalButton>
          </>
        }
      >
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
            <li>Allergènes et filtrage</li>
            <li>Préférences de cookies</li>
          </ul>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          La page sera rechargée automatiquement après la réinitialisation.
        </p>
      </ModalLayout>
    </>
  );
}
