import { useState } from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronDown,
  IoChevronUp,
  IoInformationCircleOutline,
} from "react-icons/io5";

export default function AgeCriteriaSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-amber-300 bg-amber-100 px-4 py-3 text-left transition-colors hover:bg-amber-200 dark:border-amber-800 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-amber-900 dark:text-amber-200">
          Critères d&apos;âge des études et exclusions
        </span>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-white p-4 dark:border-amber-800 dark:bg-neutral-900/50">
          <div className="space-y-4">
            {/* Tableau des priorités par âge */}
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-neutral-800 dark:text-white">
                Priorité selon l&apos;âge des études
              </h3>
              <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
                <table className="w-full text-xs">
                  <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                    <tr className="text-left">
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Priorité
                      </th>
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Âge de l&apos;étude
                      </th>
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Condition
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10">
                      <td className="p-2">
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          <IoCheckmarkCircleOutline className="h-3.5 w-3.5" />
                          Prioritaire
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        &lt; 10 ans
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        Études récentes avec données à jour
                      </td>
                    </tr>
                    <tr className="hover:bg-sky-50/50 dark:hover:bg-sky-900/10">
                      <td className="p-2">
                        <span className="inline-flex items-center gap-1 rounded bg-sky-100 px-2 py-1 font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
                          <IoInformationCircleOutline className="h-3.5 w-3.5" />
                          Acceptable
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        10-20 ans
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        Si étude importante ou peu d&apos;alternatives
                        disponibles
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                      <td className="p-2">
                        <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-1 font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          <IoAlertCircleOutline className="h-3.5 w-3.5" />
                          Exception
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        &gt; 20 ans
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        Études fondatrices historiquement significatives
                        uniquement
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Critères d'exclusion */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-neutral-800 dark:text-white">
                Critères d&apos;exclusion systématique
              </h3>
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                Les études suivantes sont automatiquement exclues de notre base
                de données :
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 rounded border-l-4 border-red-500 bg-red-50/50 p-2 dark:bg-red-900/10">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
                    ✕
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    <strong className="text-red-800 dark:text-red-300">
                      Journaux prédateurs
                    </strong>{" "}
                    — Publications identifiées par Beall&apos;s List ou absentes
                    du DOAJ (Directory of Open Access Journals)
                  </span>
                </li>
                <li className="flex items-start gap-2 rounded border-l-4 border-red-500 bg-red-50/50 p-2 dark:bg-red-900/10">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
                    ✕
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    <strong className="text-red-800 dark:text-red-300">
                      Études sans peer-review
                    </strong>{" "}
                    — Absence de validation par les pairs
                  </span>
                </li>
                <li className="flex items-start gap-2 rounded border-l-4 border-red-500 bg-red-50/50 p-2 dark:bg-red-900/10">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
                    ✕
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    <strong className="text-red-800 dark:text-red-300">
                      Conflits d&apos;intérêts majeurs non déclarés
                    </strong>{" "}
                    — Financement par fabricants sans transparence
                  </span>
                </li>
                <li className="flex items-start gap-2 rounded border-l-4 border-red-500 bg-red-50/50 p-2 dark:bg-red-900/10">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
                    ✕
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    <strong className="text-red-800 dark:text-red-300">
                      Échantillon insuffisant
                    </strong>{" "}
                    — RCT avec n &lt; 10 participants (sauf études de phase I)
                  </span>
                </li>
                <li className="flex items-start gap-2 rounded border-l-4 border-red-500 bg-red-50/50 p-2 dark:bg-red-900/10">
                  <span className="mt-0.5 shrink-0 text-red-600 dark:text-red-400">
                    ✕
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-400">
                    <strong className="text-red-800 dark:text-red-300">
                      Absence de standardisation du produit
                    </strong>{" "}
                    — Produits naturels non caractérisés (type d&apos;extrait,
                    concentration en principes actifs)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
