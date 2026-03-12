import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { IoConstructOutline } from "react-icons/io5";

/**
 * MaintenanceModal Component
 *
 * Modal en plein écran qui bloque complètement l'accès au site
 * pendant une période de maintenance.
 *
 * Caractéristiques :
 * - z-index maximum (9999) pour être au-dessus de tout
 * - Occupe 100% de l'écran (viewport)
 * - Non fermable par l'utilisateur
 * - Affiche un message "Site en construction"
 * - Responsive et accessible
 *
 * @param {Object} props
 * @param {boolean} props.isActive - Active ou désactive la modal de maintenance
 */
function MaintenanceModal({ isActive = false }) {
  if (!isActive) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-title"
      style={{
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        {/* Icône de construction */}
        <div className="animate-bounce rounded-full bg-white/10 p-8 backdrop-blur-sm">
          <IoConstructOutline
            className="text-8xl text-white"
            aria-hidden="true"
          />
        </div>

        {/* Titre */}
        <h1
          id="maintenance-title"
          className="text-4xl font-bold text-white md:text-5xl"
        >
          Site en construction
        </h1>

        {/* Message */}
        <div className="space-y-4 text-lg text-white/90 md:text-xl">
          <p>
            Nous travaillons actuellement sur des améliorations pour vous offrir
            une meilleure expérience.
          </p>
          <p className="text-base text-white/75">
            Le site sera bientôt de retour. Merci de votre patience !
          </p>
        </div>

        {/* Animation de loading (optionnel) */}
        <div className="mt-4 flex gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-white/60 [animation-delay:0ms]"></div>
          <div className="h-3 w-3 animate-pulse rounded-full bg-white/60 [animation-delay:150ms]"></div>
          <div className="h-3 w-3 animate-pulse rounded-full bg-white/60 [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

MaintenanceModal.propTypes = {
  isActive: PropTypes.bool,
};

export default MaintenanceModal;
