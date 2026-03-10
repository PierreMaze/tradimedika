import { useState } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoDocumentTextOutline,
  IoLinkOutline,
  IoTimeOutline,
} from "react-icons/io5";

export default function TransparencySection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-dashed border-blue-200 bg-blue-100 px-4 py-3 text-left transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-blue-900 dark:text-blue-200">
          Transparence et traçabilité des sources
        </span>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-blue-700 dark:text-blue-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-blue-700 dark:text-blue-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-800 dark:bg-neutral-900/50">
          <div className="space-y-4">
            {/* Informations systématiques */}
            <div className="mb-4">
              <h3 className="mb-3 text-sm font-medium text-neutral-800 dark:text-white">
                Pour chaque étude référencée
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-blue-200 bg-white p-3 dark:border-blue-800 dark:bg-neutral-900/50">
                  <div className="mb-2 flex items-center gap-2">
                    <IoLinkOutline className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-white">
                      Identifiants uniques
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>DOI</strong> : Digital Object Identifier (lien
                        permanent)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>PMID</strong> : PubMed Identifier pour retrouver
                        l&apos;étude
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-blue-200 bg-white p-3 dark:border-blue-800 dark:bg-neutral-900/50">
                  <div className="mb-2 flex items-center gap-2">
                    <IoDocumentTextOutline className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-white">
                      Métadonnées de publication
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Journal scientifique</strong> et son facteur
                        d&apos;impact
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Année de publication</strong> pour évaluer
                        l&apos;actualité
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-blue-200 bg-white p-3 dark:border-blue-800 dark:bg-neutral-900/50">
                  <div className="mb-2 flex items-center gap-2">
                    <IoDocumentTextOutline className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-white">
                      Caractéristiques méthodologiques
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Type d&apos;étude</strong> : RCT, méta-analyse,
                        cohorte, etc.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Taille d&apos;échantillon</strong> (nombre de
                        participants)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-blue-200 bg-white p-3 dark:border-blue-800 dark:bg-neutral-900/50">
                  <div className="mb-2 flex items-center gap-2">
                    <IoTimeOutline className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-white">
                      Mise à jour et suivi
                    </h4>
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Date de dernière revue</strong> des études
                        disponibles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>
                        <strong>Versionnage</strong> et historique des
                        modifications
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exemple de visualisation */}
            <div className="rounded-lg border-2 border-dashed border-blue-300 bg-white p-3 dark:border-blue-700 dark:bg-neutral-900/30">
              <h3 className="mb-2 text-xs font-semibold text-neutral-800 dark:text-white">
                Exemple de présentation d&apos;une source
              </h3>
              <div className="rounded border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Méta-analyse
                  </span>
                  <span className="rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
                    n = 1,247
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    2023
                  </span>
                </div>
                <p className="mb-2 text-xs text-neutral-800 dark:text-neutral-300">
                  <strong>Smith J. et al.</strong> — Effect of ginger on nausea:
                  a systematic review and meta-analysis
                </p>
                <p className="mb-2 text-xs text-neutral-600 italic dark:text-neutral-400">
                  Journal of Clinical Nutrition, 2023;45(3):234-245
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://doi.org/10.1234/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <IoLinkOutline className="h-3.5 w-3.5" />
                    DOI: 10.1234/example
                  </a>
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <IoLinkOutline className="h-3.5 w-3.5" />
                    PMID: 12345678
                  </a>
                </div>
              </div>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                Les médecins peuvent accéder directement aux sources originales
                pour approfondir leur lecture.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
