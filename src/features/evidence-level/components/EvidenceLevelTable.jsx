import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import {
  IoDocument,
  IoFlaskOutline,
  IoInformationCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { generateSlug } from "../../product-result-page/utils/productMatcher";
import { useAllEvidences } from "../hooks/useEvidenceData";
import ReferencesLinks from "./ReferencesLinks";
import ScientificDetailsModal from "./ScientificDetailsModal";
import { GradeSystemTooltip } from "./tooltips";

const ITEMS_PER_PAGE = 15;

/**
 * Tableau médical professionnel croisant evidenceBase.json et db.json
 * Affiche : Produit | Symptôme | Propriété | Grade + tooltips détaillés
 */
export default function EvidenceLevelTable() {
  const evidences = useAllEvidences();
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const levels = ["A", "B", "C", "D"];

  // Filtrage
  const filtered = useMemo(() => {
    if (!evidences || evidences.length === 0) return [];

    let result = [...evidences];

    // Filtre recherche
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (ev) =>
          ev.remedyCommonName?.toLowerCase().includes(searchLower) ||
          ev.symptom?.toLowerCase().includes(searchLower) ||
          ev.property?.toLowerCase().includes(searchLower),
      );
    }

    // Filtre niveau GRADE
    if (filterLevel) {
      result = result.filter((ev) => ev.gradeLevel === filterLevel);
    }

    return result;
  }, [evidences, search, filterLevel]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [filtered, page],
  );

  return (
    <div>
      {/* Barre de recherche + filtres GRADE */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Rechercher produit, symptôme, propriété..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-800 shadow-sm transition-all outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-emerald-400"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:flex-nowrap">
          <button
            onClick={() => {
              setFilterLevel(null);
              setPage(0);
            }}
            className={`cursor-pointer rounded-md px-3 py-2 text-xs font-medium shadow-sm transition-all ${
              filterLevel === null
                ? "bg-neutral-800 text-white shadow-md dark:bg-white dark:text-neutral-800"
                : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
            }`}
          >
            Tous
          </button>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => {
                setFilterLevel(filterLevel === level ? null : level);
                setPage(0);
              }}
              className={`cursor-pointer rounded-md px-3 py-2 text-xs font-medium shadow-sm transition-all ${
                filterLevel === level
                  ? "bg-neutral-800 text-white shadow-md dark:bg-white dark:text-neutral-800"
                  : "bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
              }`}
            >
              Grade {level}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg border-2 border-dashed border-neutral-200 shadow-sm dark:border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-100 text-xs font-medium tracking-wide text-neutral-500 uppercase dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th className="w-[15%] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  Produit
                  <Tooltip
                    content={
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">Produit naturel étudié</p>
                        <p>
                          Nom commun et nom scientifique latin du remède
                          traditionnel évalué.
                        </p>
                      </div>
                    }
                    placement="top"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
              <th className="w-[20%] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  Symptôme
                  <Tooltip
                    content={
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">Symptôme ciblé</p>
                        <p>
                          Indication clinique ou symptôme pour lequel le produit
                          a été étudié (ex: nausées, anxiété, inflammation).
                        </p>
                      </div>
                    }
                    placement="top"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
              <th className="w-[20%] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  Propriété
                  <Tooltip
                    content={
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">
                          Propriété pharmacologique
                        </p>
                        <p>
                          Mécanisme d&apos;action ou propriété thérapeutique
                          évaluée scientifiquement (ex: antiémétique,
                          anxiolytique, anti-inflammatoire).
                        </p>
                      </div>
                    }
                    placement="top"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
              <th className="w-[10%] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  Grade
                  <Tooltip
                    content={
                      <div className="space-y-2 text-xs">
                        <p className="font-semibold">Niveau de preuve GRADE</p>
                        <div className="space-y-1">
                          <p>
                            <strong className="text-green-700 dark:text-green-300">
                              A
                            </strong>{" "}
                            - Preuve élevée (RCT multiples, qualité haute)
                          </p>
                          <p>
                            <strong className="text-blue-700 dark:text-blue-300">
                              B
                            </strong>{" "}
                            - Preuve modérée (RCT avec limites)
                          </p>
                          <p>
                            <strong className="text-yellow-700 dark:text-yellow-300">
                              C
                            </strong>{" "}
                            - Preuve faible (études observationnelles)
                          </p>
                          <p>
                            <strong className="text-red-700 dark:text-red-300">
                              D
                            </strong>{" "}
                            - Preuve très faible (usage traditionnel)
                          </p>
                        </div>
                      </div>
                    }
                    placement="top"
                    className="max-w-[300px]"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
              <th className="hidden w-[10%] px-4 py-3 lg:table-cell">
                <div className="flex items-center gap-1.5">
                  Détails
                  <Tooltip
                    content={
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">
                          Détails scientifiques complets
                        </p>
                        <p>
                          Accès à la méthodologie, hiérarchie des études,
                          qualité (RoB 2, JADAD, AMSTAR 2), statistiques (I²,
                          NNT), standardisation, alertes et transparence.
                        </p>
                      </div>
                    }
                    placement="top"
                    className="max-w-[280px]"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
              <th className="hidden w-[25%] px-4 py-3 xl:table-cell">
                <div className="flex items-center gap-1.5">
                  Sources
                  <Tooltip
                    content={
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">
                          Références bibliographiques
                        </p>
                        <p>
                          Liens directs vers les publications scientifiques (DOI
                          et PubMed ID) des études clés.
                        </p>
                      </div>
                    }
                    placement="top"
                  >
                    <IoInformationCircleOutline className="h-3.5 w-3.5 cursor-help text-neutral-400" />
                  </Tooltip>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                >
                  Aucune évidence trouvée avec ces critères
                </td>
              </tr>
            ) : (
              paginated.map((evidence, idx) => (
                <tr
                  key={`${evidence.id}-${idx}`}
                  className="bg-white text-neutral-700 transition-colors hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
                >
                  {/* Produit */}
                  <td className="px-4 py-3">
                    <Link
                      to={`/products/${generateSlug(evidence.remedyCommonName)}`}
                      className="block text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      {evidence.remedyCommonName}
                    </Link>
                    <span className="mt-0.5 block text-xs text-neutral-500 italic dark:text-neutral-400">
                      {evidence.remedyScientificName}
                    </span>
                  </td>

                  {/* Symptôme */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-block rounded bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 capitalize dark:bg-blue-900/30 dark:text-blue-300">
                      {evidence.symptom}
                    </span>
                  </td>

                  {/* Propriété */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      <IoFlaskOutline className="h-3.5 w-3.5" />
                      {evidence.property}
                    </span>
                  </td>

                  {/* Grade GRADE */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <GradeSystemTooltip
                      gradeLevel={evidence.gradeLevel}
                      gradingDetails={
                        evidence.methodology?.gradingProcess?.gradeAssessment
                      }
                    />
                  </td>

                  {/* Détails scientifiques - Bouton pour ouvrir la modal */}
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <button
                      onClick={() => setSelectedEvidence(evidence)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      <IoDocument className="h-4 w-4" />
                      Détails
                    </button>
                  </td>

                  {/* Sources - Références scientifiques */}
                  <td className="hidden px-4 py-3 xl:table-cell">
                    <ReferencesLinks studyHierarchy={evidence.studyHierarchy} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Bottom Right */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Stats à gauche */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-medium">{filtered.length}</span> évidence
          {filtered.length > 1 ? "s" : ""} •{" "}
          <span className="font-medium">
            {page * ITEMS_PER_PAGE + 1}-
            {Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)}
          </span>{" "}
          sur {filtered.length}
        </div>

        {/* Pagination à droite */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
            >
              ← Précédent
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (page < 3) {
                  pageNum = i;
                } else if (page > totalPages - 4) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition-all ${
                      page === pageNum
                        ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                        : "bg-white text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      {/* Note pédagogique */}
      <div className="mt-4 rounded-lg border-2 border-dashed border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
        <p className="text-xs text-amber-900 dark:text-amber-300">
          <strong>Prototype médical :</strong> Cliquez sur{" "}
          <IoDocument className="inline-block h-3 w-3 align-top" />{" "}
          <strong>Détails</strong> pour accéder aux informations méthodologiques
          complètes (RoB 2, JADAD, AMSTAR 2, I², NNT, etc.). Cliquez sur les
          liens <strong>DOI/PMID</strong> dans la colonne{" "}
          <strong>Sources</strong> pour accéder aux publications originales.{" "}
          <strong>
            Les sources peuvent être indisponibles, éronnées ou fictives pour le
            projet de démonstration.
          </strong>
        </p>
      </div>

      {/* Modal des détails scientifiques */}
      {selectedEvidence && (
        <ScientificDetailsModal
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      )}
    </div>
  );
}

EvidenceLevelTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};
