import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../../settings/hooks/useReducedMotion";
import { useSettingsModal } from "../../settings/context/SettingsModalContext";
import { useCookieConsent } from "../hooks/useCookieConsent";

const SESSION_DISMISS_KEY = "tradimedika-banner-dismissed";

export default function CookieBanner() {
  const { hasConsent, acceptCookies, rejectCookies } = useCookieConsent();
  const { openSettingsWithCookies } = useSettingsModal();
  const prefersReducedMotion = useReducedMotion();

  const [isDismissedForSession, setIsDismissedForSession] = useState(() => {
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === "true";
  });

  const dismissForSession = useCallback(() => {
    sessionStorage.setItem(SESSION_DISMISS_KEY, "true");
    setIsDismissedForSession(true);
  }, []);

  const handleAccept = useCallback(() => {
    acceptCookies();
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  }, [acceptCookies]);

  const handleReject = useCallback(() => {
    rejectCookies();
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  }, [rejectCookies]);

  const shouldShow = !hasConsent && !isDismissedForSession;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          role="region"
          aria-label="Consentement aux cookies"
          aria-live="polite"
          className="fixed right-0 bottom-0 left-0 z-50 bg-white p-4 shadow-2xl md:right-auto md:bottom-4 md:left-4 md:max-w-md md:rounded-lg dark:bg-neutral-900"
          initial={prefersReducedMotion ? {} : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? {} : { y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={dismissForSession}
            aria-label="Fermer temporairement"
            className="absolute top-2 right-2 rounded-full p-1 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IoMdClose className="text-xl" />
          </button>

          <div className="mb-3 flex items-center gap-2">
            <FaCookieBite
              className="text-2xl text-emerald-700"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Gestion des cookies
            </h2>
          </div>

          <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
            Nous utilisons des cookies pour améliorer votre expérience et
            analyser le trafic. Consultez notre{" "}
            <Link
              to="/politique-confidentialite"
              className="font-medium text-emerald-700 underline transition hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400"
            >
              politique de confidentialité
            </Link>{" "}
            pour plus de détails.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleAccept}
              className="flex-1 cursor-pointer rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              Accepter
            </button>
            <button
              onClick={handleReject}
              className="flex-1 cursor-pointer rounded-md border-2 border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              Essentiel uniquement
            </button>
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={openSettingsWithCookies}
              className="cursor-pointer text-xs text-neutral-500 underline transition hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Personnaliser mes préférences
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
