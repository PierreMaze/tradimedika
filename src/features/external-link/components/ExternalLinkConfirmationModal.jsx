import { FiExternalLink } from "react-icons/fi";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";
import { useExternalLink } from "../hooks/useExternalLink";

export default function ExternalLinkConfirmationModal() {
  const { isOpen, siteName, closeConfirmation, confirmAndNavigate } =
    useExternalLink();

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeConfirmation}
      title="Vous quittez TradiMedika"
      icon={FiExternalLink}
      subtitle="Vous êtes sur le point d'accéder à un site externe"
      maxWidth="md"
      closeLabel="Fermer la fenêtre de confirmation"
      footer={
        <>
          <ModalButton variant="secondary" onClick={closeConfirmation}>
            Annuler
          </ModalButton>
          <ModalButton variant="primary" onClick={confirmAndNavigate}>
            Continuer
          </ModalButton>
        </>
      }
    >
      <div>
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
    </ModalLayout>
  );
}
