import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function EvidenceLevelMethodology() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-neutral-800 dark:text-white">
          Méthodologie de classification
        </span>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-4 border-t-2 border-dashed border-neutral-300 px-4 py-4 dark:border-neutral-600">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-white">
              Pyramide des types d&apos;études
            </h3>
            <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
              La classification repose sur la hiérarchie scientifique des types
              d&apos;études, du plus fiable au moins fiable :
            </p>
            <div className="space-y-2 text-xs">
              <div className="rounded bg-emerald-50 p-2 dark:bg-emerald-900/20">
                <strong className="text-emerald-800 dark:text-emerald-300">
                  Niveau 1 — Preuve forte
                </strong>
                <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                  Méta-analyses et revues systématiques (synthèse de plusieurs
                  études)
                </p>
              </div>
              <div className="rounded bg-blue-50 p-2 dark:bg-blue-900/20">
                <strong className="text-blue-800 dark:text-blue-300">
                  Niveau 2 — Preuve directe
                </strong>
                <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                  Essais cliniques randomisés contrôlés (RCT)
                </p>
              </div>
              <div className="rounded bg-amber-50 p-2 dark:bg-amber-900/20">
                <strong className="text-amber-800 dark:text-amber-300">
                  Niveau 3 — Preuve observationnelle
                </strong>
                <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                  Études de cohorte et cas-témoins
                </p>
              </div>
              <div className="rounded bg-neutral-100 p-2 dark:bg-neutral-700/30">
                <strong className="text-neutral-800 dark:text-neutral-300">
                  Niveaux inférieurs
                </strong>
                <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                  Rapports de cas, études pré-cliniques, consensus
                  d&apos;experts, usage traditionnel
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-white">
              Système GRADE adapté
            </h3>
            <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
              Nous utilisons une adaptation du système GRADE (Grading of
              Recommendations Assessment, Development and Evaluation), standard
              international de l&apos;OMS et de Cochrane :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b-2 border-neutral-200 dark:border-neutral-700">
                  <tr className="text-left">
                    <th className="pb-2 font-semibold text-neutral-800 dark:text-white">
                      Score
                    </th>
                    <th className="pb-2 font-semibold text-neutral-800 dark:text-white">
                      Critères
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr>
                    <td className="py-2">
                      <span className="inline-block rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                        A
                      </span>
                    </td>
                    <td className="py-2 text-neutral-700 dark:text-neutral-400">
                      ≥1 méta-analyse de qualité OU ≥2 RCT de bonne qualité
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <span className="inline-block rounded bg-blue-100 px-2 py-1 font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                        B
                      </span>
                    </td>
                    <td className="py-2 text-neutral-700 dark:text-neutral-400">
                      RCT individuels de qualité acceptable OU études
                      observationnelles solides
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <span className="inline-block rounded bg-amber-100 px-2 py-1 font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                        C
                      </span>
                    </td>
                    <td className="py-2 text-neutral-700 dark:text-neutral-400">
                      Études observationnelles limitées OU RCT de faible qualité
                      OU études pré-cliniques prometteuses
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <span className="inline-block rounded bg-neutral-200 px-2 py-1 font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                        D
                      </span>
                    </td>
                    <td className="py-2 text-neutral-700 dark:text-neutral-400">
                      Usage traditionnel documenté uniquement OU rapports de cas
                      OU aucune étude identifiée
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-white">
              Critères d&apos;évaluation
            </h3>
            <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
              Chaque produit est évalué selon :
            </p>
            <ul className="space-y-1 text-xs text-neutral-700 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>
                  Type d&apos;étude le plus élevé (méta-analyse, RCT, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>Nombre d&apos;études disponibles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>Qualité méthodologique (échelles JADAD et AMSTAR 2)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>Taille cumulée des échantillons</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>Réplication et cohérence des résultats</span>
              </li>
            </ul>
          </section>

          <section className="rounded-md bg-blue-50/50 p-3 dark:bg-blue-900/10">
            <h3 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
              Sources et références
            </h3>
            <div className="space-y-1 text-xs text-neutral-700 dark:text-neutral-400">
              <p>
                <a
                  href="https://gdt.gradepro.org/app/handbook/handbook.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  GRADE Handbook
                </a>{" "}
                — Système GRADE officiel
              </p>
              <p>
                <a
                  href="https://www.cebm.ox.ac.uk/resources/levels-of-evidence/ocebm-levels-of-evidence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  OCEBM Levels of Evidence
                </a>{" "}
                — Université d&apos;Oxford
              </p>
              <p>
                <a
                  href="https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  EMA/HMPC Monographs
                </a>{" "}
                — Agence européenne des médicaments
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
