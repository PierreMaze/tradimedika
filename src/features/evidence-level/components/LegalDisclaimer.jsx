import { useState } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

export default function LegalDisclaimer() {
  const [isOpen, setIsOpen] = useState(true); // Ouvert par défaut

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-dashed border-red-300 bg-red-100 px-4 py-3 text-left transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <IoShieldCheckmarkOutline className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-base font-semibold text-red-900 dark:text-red-200">
            Cadre légal et responsabilités
          </span>
        </div>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-red-700 dark:text-red-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-red-700 dark:text-red-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-red-200 bg-white p-4 dark:border-red-800 dark:bg-neutral-900/50">
          <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-400">
            <p className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <strong className="text-red-900 dark:text-red-200">
                Tradimedika
              </strong>{" "}
              est un <strong>outil d&apos;information scientifique</strong>{" "}
              destiné exclusivement aux professionnels de santé qualifiés.
            </p>

            <div className="rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-300">
                Limites d&apos;utilisation
              </h3>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                    •
                  </span>
                  <span>
                    Cette plateforme{" "}
                    <strong>ne remplace pas la consultation médicale</strong> ni
                    le jugement clinique du praticien
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                    •
                  </span>
                  <span>
                    Les informations fournies{" "}
                    <strong>
                      ne se substituent pas aux recommandations officielles
                    </strong>{" "}
                    des autorités de santé (HAS, ANSM, EMA)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-neutral-600 dark:text-neutral-500">
                    •
                  </span>
                  <span>
                    Les utilisateurs sont{" "}
                    <strong>responsables de l&apos;application</strong> des
                    informations dans leur contexte clinique spécifique
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-300">
                Responsabilité professionnelle
              </h3>
              <p>
                Le praticien demeure le <strong>seul responsable</strong> des
                décisions thérapeutiques prises pour ses patients. Tradimedika
                fournit une synthèse des données scientifiques disponibles, mais
                ne délivre pas de recommandations thérapeutiques
                individualisées.
              </p>
            </div>

            <div className="rounded-md border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900/50">
              <h3 className="mb-2 font-semibold text-neutral-800 dark:text-neutral-300">
                Mise à jour des informations
              </h3>
              <p>
                Les données scientifiques évoluent constamment. Bien que nous
                nous efforçions de maintenir nos informations à jour, le
                praticien doit toujours{" "}
                <strong>vérifier l&apos;actualité des données</strong> et
                consulter les sources originales si nécessaire.
              </p>
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-blue-900 dark:text-blue-300">
                <strong>Note importante</strong> : Les produits naturels peuvent
                interagir avec des médicaments ou être contre-indiqués dans
                certaines situations cliniques. Une évaluation individuelle par
                un professionnel de santé est indispensable.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
