import PropTypes from "prop-types";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

// Sous-composant pour les dropdowns internes
function MethodologySubsection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md bg-neutral-50 px-3 py-2 text-left transition-colors hover:bg-neutral-100 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-neutral-800 dark:text-white">
          {title}
        </span>
        {isOpen ? (
          <IoChevronUp className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <IoChevronDown className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>
      {isOpen && <div className="mt-3 px-3">{children}</div>}
    </div>
  );
}

MethodologySubsection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

export default function EvidenceLevelMethodology() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border-2 border-emerald-500 bg-emerald-100 px-4 py-3 text-left transition-colors hover:bg-emerald-200 dark:border-emerald-600 dark:bg-emerald-800 dark:hover:bg-emerald-700"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-emerald-800 dark:text-white">
          Méthodologie scientifique complète
        </span>
        {isOpen ? (
          <IoChevronUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <IoChevronDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
          <div className="space-y-3">
            {/* Algorithme Tradimedika */}
            <MethodologySubsection
              title="Algorithme scientifique Tradimedika"
              defaultOpen={true}
            >
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                Notre méthodologie s&apos;appuie sur un algorithme en 5 étapes
                pour garantir la fiabilité des informations :
              </p>
              <div className="space-y-2 text-xs">
                <div className="rounded bg-emerald-50 p-2.5 dark:bg-emerald-900/20">
                  <strong className="text-emerald-800 dark:text-emerald-300">
                    1. Collecte des études
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Âge de l&apos;étude, type d&apos;étude (hiérarchie), qualité
                    du journal, standardisation du produit
                  </p>
                </div>
                <div className="rounded bg-sky-50 p-2.5 dark:bg-sky-900/20">
                  <strong className="text-sky-800 dark:text-sky-300">
                    2. Évaluation méthodologique
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    RoB 2 / JADAD pour RCT, AMSTAR 2 pour méta-analyses,
                    critères HAS (sécurité, faisabilité, applicabilité)
                  </p>
                </div>
                <div className="rounded bg-amber-50 p-2.5 dark:bg-amber-900/20">
                  <strong className="text-amber-800 dark:text-amber-300">
                    3. Analyse des résultats
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Cohérence des études (I²), taille d&apos;effet (RR, OR),
                    détection des biais
                  </p>
                </div>
                <div className="rounded bg-purple-50 p-2.5 dark:bg-purple-900/20">
                  <strong className="text-purple-800 dark:text-purple-300">
                    4. Attribution du niveau de preuve
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Score composite basé sur GRADE : type d&apos;étude, qualité,
                    cohérence, taille échantillon
                  </p>
                </div>
                <div className="rounded bg-blue-50 p-2.5 dark:bg-blue-900/20">
                  <strong className="text-blue-800 dark:text-blue-300">
                    5. Synthèse clinique
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Résumé rapide avec code couleur, icônes et transparence
                    totale (DOI, journal, année, échantillon)
                  </p>
                </div>
              </div>
            </MethodologySubsection>

            {/* Hiérarchie des études */}
            <MethodologySubsection title="Hiérarchie des types d'études">
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                La classification repose sur la pyramide des preuves
                scientifiques, du plus fiable au moins fiable :
              </p>
              <div className="space-y-2 text-xs">
                <div className="rounded border-l-4 border-emerald-500 bg-emerald-50 p-2.5 dark:bg-emerald-900/20">
                  <strong className="text-emerald-800 dark:text-emerald-300">
                    Niveau 1 — Synthèse de haute qualité
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Méta-analyses et revues systématiques Cochrane (synthèse de
                    plusieurs études avec analyse statistique)
                  </p>
                </div>
                <div className="rounded border-l-4 border-sky-500 bg-sky-50 p-2.5 dark:bg-sky-900/20">
                  <strong className="text-sky-800 dark:text-sky-300">
                    Niveau 2 — Preuve directe
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Essais cliniques randomisés contrôlés (RCT) en double
                    aveugle
                  </p>
                </div>
                <div className="rounded border-l-4 border-amber-500 bg-amber-50 p-2.5 dark:bg-amber-900/20">
                  <strong className="text-amber-800 dark:text-amber-300">
                    Niveau 3 — Preuve observationnelle
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Études de cohorte et cas-témoins
                  </p>
                </div>
                <div className="rounded border-l-4 border-neutral-400 bg-neutral-100 p-2.5 dark:bg-neutral-700/30">
                  <strong className="text-neutral-800 dark:text-neutral-300">
                    Niveaux inférieurs
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Rapports de cas, séries de cas, études pré-cliniques,
                    consensus d&apos;experts, usage traditionnel
                  </p>
                </div>
              </div>
            </MethodologySubsection>

            {/* Système GRADE */}
            <MethodologySubsection title="Système GRADE adapté">
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                Standard international de l&apos;OMS, Cochrane et HAS pour
                évaluer la qualité des preuves (Grading of Recommendations
                Assessment) :
              </p>
              <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
                <table className="w-full text-xs">
                  <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                    <tr className="text-left">
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Niveau
                      </th>
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Interprétation
                      </th>
                      <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                        Critères d&apos;attribution
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10">
                      <td className="p-2">
                        <span className="inline-block rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          A
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        Preuve scientifique solide
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        ≥1 méta-analyse de qualité OU ≥2 RCT de bonne qualité
                        méthodologique
                      </td>
                    </tr>
                    <tr className="hover:bg-sky-50/50 dark:hover:bg-sky-900/10">
                      <td className="p-2">
                        <span className="inline-block rounded bg-sky-100 px-2 py-1 font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
                          B
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        Preuve scientifique probable
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        RCT individuels de qualité acceptable OU études
                        observationnelles solides et cohérentes
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                      <td className="p-2">
                        <span className="inline-block rounded bg-amber-100 px-2 py-1 font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          C
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        Preuve limitée
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        Études observationnelles limitées OU RCT de faible
                        qualité OU études pré-cliniques prometteuses
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30">
                      <td className="p-2">
                        <span className="inline-block rounded bg-neutral-200 px-2 py-1 font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                          D
                        </span>
                      </td>
                      <td className="p-2 font-medium text-neutral-800 dark:text-neutral-300">
                        Preuve insuffisante
                      </td>
                      <td className="p-2 text-neutral-700 dark:text-neutral-400">
                        Usage traditionnel documenté uniquement OU rapports de
                        cas OU aucune étude identifiée
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </MethodologySubsection>

            {/* Outils d'évaluation */}
            <MethodologySubsection title="Outils d'évaluation méthodologique">
              <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                Nous utilisons des outils validés internationalement pour
                évaluer la qualité des études :
              </p>
              <div className="space-y-2 text-xs">
                <div className="rounded border border-sky-200 bg-sky-50/50 p-2.5 dark:border-sky-800 dark:bg-sky-900/10">
                  <strong className="text-sky-800 dark:text-sky-300">
                    RoB 2 (Cochrane Risk of Bias Tool)
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Pour les essais cliniques randomisés : évalue la
                    randomisation, les déviations du protocole, les données
                    manquantes, la mesure des résultats
                  </p>
                </div>
                <div className="rounded border border-purple-200 bg-purple-50/50 p-2.5 dark:border-purple-800 dark:bg-purple-900/10">
                  <strong className="text-purple-800 dark:text-purple-300">
                    Score JADAD
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Évaluation de la qualité des RCT (randomisation, double
                    aveugle, description des sorties d&apos;étude)
                  </p>
                </div>
                <div className="rounded border border-indigo-200 bg-indigo-50/50 p-2.5 dark:border-indigo-800 dark:bg-indigo-900/10">
                  <strong className="text-indigo-800 dark:text-indigo-300">
                    AMSTAR 2 (Shea 2017)
                  </strong>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-400">
                    Pour les revues systématiques et méta-analyses : stratégie
                    de recherche, sélection des études, analyse du biais,
                    transparence méthodologique
                  </p>
                </div>
              </div>
            </MethodologySubsection>

            {/* Indicateurs statistiques */}
            <MethodologySubsection title="Indicateurs statistiques">
              <div className="space-y-4">
                {/* Hétérogénéité I² */}
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-neutral-800 dark:text-white">
                    Cohérence des résultats (I²)
                  </h4>
                  <p className="mb-3 text-xs text-neutral-600 dark:text-neutral-400">
                    L&apos;hétérogénéité statistique mesure la variabilité entre
                    les études. Un I² élevé réduit la confiance dans la synthèse
                    :
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <table className="w-full text-xs">
                      <thead className="bg-neutral-100 dark:bg-neutral-800/50">
                        <tr className="text-left">
                          <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                            I² (%)
                          </th>
                          <th className="p-2 font-semibold text-neutral-800 dark:text-white">
                            Interprétation
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        <tr>
                          <td className="p-2 font-medium text-emerald-700 dark:text-emerald-400">
                            0-25 %
                          </td>
                          <td className="p-2 text-neutral-700 dark:text-neutral-400">
                            Hétérogénéité faible (résultats cohérents)
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-sky-700 dark:text-sky-400">
                            25-50 %
                          </td>
                          <td className="p-2 text-neutral-700 dark:text-neutral-400">
                            Hétérogénéité modérée
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-amber-700 dark:text-amber-400">
                            50-75 %
                          </td>
                          <td className="p-2 text-neutral-700 dark:text-neutral-400">
                            Hétérogénéité importante
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-red-700 dark:text-red-400">
                            &gt;75 %
                          </td>
                          <td className="p-2 text-neutral-700 dark:text-neutral-400">
                            Hétérogénéité très importante (limite la fiabilité)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Taille d'effet */}
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-neutral-800 dark:text-white">
                    Taille d&apos;effet (RR — Risque Relatif)
                  </h4>
                  <p className="mb-2 text-xs text-neutral-600 dark:text-neutral-400">
                    Un effet très marqué peut renforcer la confiance même avec
                    un nombre limité d&apos;études :
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-sky-500"></span>
                      <span className="text-neutral-700 dark:text-neutral-400">
                        <strong>RR &gt; 2</strong> : effet potentiellement
                        important
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span className="text-neutral-700 dark:text-neutral-400">
                        <strong>RR &gt; 5</strong> : effet très important
                        (renforce la confiance)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </MethodologySubsection>

            {/* Critères d'évaluation */}
            <MethodologySubsection title="Critères d'évaluation pour chaque produit">
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    •
                  </span>
                  <span>
                    Type d&apos;étude le plus élevé (méta-analyse, RCT, cohorte,
                    etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    •
                  </span>
                  <span>
                    Nombre d&apos;études disponibles et participants totaux
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    •
                  </span>
                  <span>
                    Qualité méthodologique (échelles JADAD, RoB 2, AMSTAR 2)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    •
                  </span>
                  <span>
                    Réplication et cohérence des résultats (hétérogénéité I²)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    •
                  </span>
                  <span>
                    Standardisation du produit naturel (extrait, dosage, forme
                    galénique)
                  </span>
                </li>
              </ul>
            </MethodologySubsection>

            {/* Sources et références */}
            <div className="rounded-md border-2 border-dashed border-blue-200 bg-blue-50/50 p-3 dark:border-blue-800 dark:bg-blue-900/10">
              <h3 className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-300">
                Sources et références scientifiques
              </h3>
              <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-400">
                <p>
                  <a
                    href="https://www.gradeworkinggroup.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    GRADE Working Group
                  </a>{" "}
                  — Système GRADE officiel (OMS, Cochrane)
                </p>
                <p>
                  <a
                    href="https://www.riskofbias.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    RoB 2 Tool
                  </a>{" "}
                  — Cochrane Risk of Bias 2019
                </p>
                <p>
                  <a
                    href="https://www.has-sante.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Haute Autorité de Santé (HAS)
                  </a>{" "}
                  — Recommandations françaises 2020
                </p>
                <p>
                  <a
                    href="https://www.cebm.ox.ac.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    OCEBM Levels of Evidence
                  </a>{" "}
                  — Centre for Evidence-Based Medicine, Université d&apos;Oxford
                </p>
                <p>
                  <a
                    href="https://www.cochranelibrary.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Cochrane Library
                  </a>{" "}
                  — Bibliothèque de revues systématiques
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
