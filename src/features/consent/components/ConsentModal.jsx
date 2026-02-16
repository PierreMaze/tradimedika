import PropTypes from "prop-types";
import { useState } from "react";
import { IoChevronDown, IoShieldCheckmarkOutline } from "react-icons/io5";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";

export default function ConsentModal({ isOpen, onAccept }) {
  const [consentChecked, setConsentChecked] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleAccept = () => {
    if (consentChecked) {
      onAccept();
    }
  };

  return (
    <>
      <ModalLayout
        isOpen={isOpen}
        onClose={() => {}}
        title="Prototype — Utilisation des données"
        icon={IoShieldCheckmarkOutline}
        subtitle="Votre confidentialité est importante — ces données sont utilisées à des fins informatives dans le cadre d&pos;un prototype."
        maxWidth="4xl"
        showCloseButton={false}
        footer={
          <div className="flex w-full justify-end gap-2">
            <ModalButton
              onClick={handleAccept}
              variant="primary"
              disabled={!consentChecked}
              aria-label="Accepter et continuer"
            >
              Accepter et continuer
            </ModalButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
            <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
              Traitement des données
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>
                  Les données collectées sont utilisées uniquement pour la
                  démonstration du prototype.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>
                  Ces informations restent{" "}
                  <strong>locales sur votre appareil</strong> (stockage
                  localStorage dans votre navigateur).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>Aucune donnée n’est transmise à des serveurs tiers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>
                  Vous pouvez effacer ces données à tout moment via les
                  Paramètres.
                </span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 text-left transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
            aria-expanded={isDetailsOpen}
          >
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              En savoir plus sur vos droits
            </span>
            <IoChevronDown
              className={`text-neutral-900 transition-transform dark:text-neutral-100 ${isDetailsOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {isDetailsOpen && (
            <div className="animate-fade-in-down space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <div>
                <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                  Conformité
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Ce prototype respecte les bonnes pratiques de confidentialité.
                  Les données sont utilisées uniquement à des fins
                  démonstratives.
                </p>
              </div>

              <div>
                <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                  Vos droits
                </h4>
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• Droit d&pos;accès aux données collectées</li>
                  <li>• Droit de rectification</li>
                  <li>• Droit d&pos;effacement via les Paramètres</li>
                  <li>• Droit de retirer votre consentement à tout moment</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                  Stockage local uniquement
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Les données restent sur votre appareil. Elles ne sont ni
                  transmises ni stockées sur nos serveurs. Les effacer dans
                  votre navigateur supprimera toutes les informations.
                </p>
              </div>
            </div>
          )}

          <div className="rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 p-4 dark:bg-amber-950/30">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              <strong className="text-amber-700 dark:text-amber-400">
                Important :
              </strong>{" "}
              Tradimedika est actuellement un <strong>prototype</strong>. Les
              informations fournies sont à caractère démonstratif uniquement.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/50">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:border-neutral-600"
              aria-label="Accepter le traitement des données"
            />
            <span className="text-sm text-neutral-900 dark:text-neutral-100">
              J&apos;accepte le traitement de mes données à des fins
              démonstratives dans le cadre de ce prototype.
            </span>
          </label>
        </div>
      </ModalLayout>
    </>
  );
}

ConsentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
};
