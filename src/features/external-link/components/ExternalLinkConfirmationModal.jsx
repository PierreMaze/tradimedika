import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useReducedMotion } from "../../settings/hooks/useReducedMotion";
import { useExternalLink } from "../hooks/useExternalLink";

function ExternalLinkConfirmationModal() {
  const { isOpen, siteName, closeConfirmation, confirmAndNavigate } =
    useExternalLink();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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
        closeConfirmation();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeConfirmation]);

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
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={closeConfirmation}
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
            aria-labelledby="external-link-modal-title"
            tabIndex={-1}
            className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-auto rounded-lg bg-white p-6 shadow-2xl md:inset-x-auto md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2 dark:bg-neutral-900"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 border-b border-neutral-200 pb-4 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h2
                  id="external-link-modal-title"
                  className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  <FiExternalLink
                    className="text-xl text-sky-600 dark:text-sky-500"
                    aria-hidden="true"
                  />
                  Vous quittez TradiMedika
                </h2>
                <button
                  onClick={closeConfirmation}
                  aria-label="Fermer la fenêtre de confirmation"
                  className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Vous êtes sur le point d&apos;accéder à un site externe
              </p>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                Vous allez être redirigé vers{" "}
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {siteName || "un site externe"}
                </span>
                .
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
                <li>Un nouvel onglet sera ouvert</li>
                <li>Votre onglet TradiMedika reste actif</li>
                <li>Vous pouvez revenir à tout moment</li>
              </ul>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
              <button
                onClick={closeConfirmation}
                className="min-h-[44px] cursor-pointer rounded-md border-2 border-neutral-400 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
              >
                Annuler
              </button>
              <button
                onClick={confirmAndNavigate}
                className="min-h-[44px] cursor-pointer rounded-md bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Continuer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ExternalLinkConfirmationModal;
