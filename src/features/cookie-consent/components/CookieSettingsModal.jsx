import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useReducedMotion } from "../../settings/hooks/useReducedMotion";
import { COOKIE_CATEGORIES } from "../constants/cookieConfig";
import { useCookieConsent } from "../hooks/useCookieConsent";

export default function CookieSettingsModal({ isOpen, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const { isAccepted, acceptCookies, rejectCookies } = useCookieConsent();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [tempAnalyticsAccepted, setTempAnalyticsAccepted] =
    useState(isAccepted);

  useEffect(() => {
    setTempAnalyticsAccepted(isAccepted);
  }, [isAccepted]);

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

  const handleSave = () => {
    if (tempAnalyticsAccepted) {
      acceptCookies();
    } else {
      rejectCookies();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-modal-title"
            tabIndex={-1}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 dark:bg-neutral-900"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2
                  id="cookie-settings-modal-title"
                  className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  <FaCookieBite className="text-xl" />
                  Paramètres des cookies
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
                Choisissez quels cookies vous souhaitez autoriser
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {COOKIE_CATEGORIES.necessary.label}
                  </h3>
                  <span className="rounded-md bg-emerald-200 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-700 dark:text-emerald-200">
                    Toujours activé
                  </span>
                </div>
                <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {COOKIE_CATEGORIES.necessary.description}
                </p>
                <details className="cursor-pointer">
                  <summary className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                    Voir les détails (localStorage)
                  </summary>
                  <ul className="mt-2 space-y-2 pl-4">
                    {COOKIE_CATEGORIES.necessary.cookies.map((cookie) => (
                      <li
                        key={cookie.name}
                        className="text-sm text-neutral-600 lg:text-base dark:text-neutral-400"
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

              <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {COOKIE_CATEGORIES.analytics.label}
                  </h3>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={tempAnalyticsAccepted}
                      onChange={(e) =>
                        setTempAnalyticsAccepted(e.target.checked)
                      }
                    />
                    <div className="peer h-6 w-11 rounded-full bg-neutral-300 peer-checked:bg-emerald-600 peer-focus:ring-4 peer-focus:ring-emerald-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-neutral-600 dark:bg-neutral-700 dark:peer-focus:ring-emerald-800"></div>
                  </label>
                </div>
                <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {COOKIE_CATEGORIES.analytics.description}
                </p>
                <details className="cursor-pointer">
                  <summary className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                    Voir les détails
                  </summary>
                  <ul className="mt-2 space-y-2 pl-4">
                    {COOKIE_CATEGORIES.analytics.cookies.map((cookie) => (
                      <li
                        key={cookie.name}
                        className="text-sm text-neutral-600 lg:text-base dark:text-neutral-400"
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

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <button
                onClick={onClose}
                className="cursor-pointer rounded-md border-2 border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="cursor-pointer rounded-md bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Enregistrer mes choix
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

CookieSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
