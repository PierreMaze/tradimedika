import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

/**
 * ModalLayout Component
 *
 * Layout standard pour toutes les modales de l'application
 * Structure : Backdrop + Modal avec Header fixe, Content scrollable, Footer fixe
 *
 * Architecture :
 * - Header : Fixe en haut (flex-shrink-0)
 * - Content : Zone scrollable au milieu (flex-1 overflow-y-auto)
 * - Footer : Fixe en bas (flex-shrink-0, optionnel)
 *
 * Avantages :
 * - Meilleure UX : Header et footer toujours visibles
 * - Meilleure responsivité mobile
 * - Scroll uniquement sur le contenu
 *
 * Props:
 * - isOpen: Modal ouverte ou fermée
 * - onClose: Fonction pour fermer la modal
 * - title: Titre de la modal
 * - icon: Icône du titre (optionnel)
 * - subtitle: Sous-titre/description (optionnel)
 * - children: Contenu de la modal (scrollable)
 * - footer: Contenu du footer (optionnel, fixe)
 * - maxWidth: Largeur max de la modal (défaut: "lg")
 * - closeLabel: Label du bouton fermer (défaut: "Fermer")
 */
function ModalLayout({
  isOpen,
  onClose,
  title,
  icon: Icon,
  subtitle,
  children,
  footer,
  maxWidth = "lg",
  closeLabel = "Fermer",
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const maxWidthClasses = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-lg",
    xl: "md:max-w-xl",
    "2xl": "md:max-w-2xl",
  };

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

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="animate-in fade-in fixed top-20 right-0 bottom-0 left-0 z-50 bg-black/60 duration-200 motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`animate-in fade-in zoom-in-95 bg-light fixed inset-x-4 top-1/2 z-60 flex max-h-[90vh] -translate-y-1/2 flex-col overflow-hidden rounded-lg shadow-2xl duration-200 motion-reduce:animate-none md:inset-x-auto md:left-1/2 md:w-full md:-translate-x-1/2 ${maxWidthClasses[maxWidth]} dark:bg-dark`}
      >
        {/* Header (fixe) */}
        <div className="flex-shrink-0 border-b border-neutral-200 p-6 pb-4 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <h2
              id="modal-title"
              className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
            >
              {Icon && <Icon className="text-xl" aria-hidden="true" />}
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label={closeLabel}
              className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg bg-neutral-600/90 p-1.5 text-white transition-colors hover:bg-red-700 dark:bg-neutral-500 dark:text-white dark:hover:bg-red-800"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>
          {subtitle && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {/* Footer (fixe, optionnel) */}
        {footer && (
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-neutral-200 p-6 pt-4 dark:border-neutral-700">
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body,
  );
}

ModalLayout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]),
  closeLabel: PropTypes.string,
};

export default ModalLayout;
