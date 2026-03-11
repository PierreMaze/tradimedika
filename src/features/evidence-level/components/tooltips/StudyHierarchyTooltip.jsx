import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiLayers } from "react-icons/fi";

/**
 * Tooltip affichant la hiérarchie des types d'études (Niv 1, 2, 3, inférieur)
 */
const StudyHierarchyTooltip = ({ studyHierarchy }) => {
  if (!studyHierarchy) return null;

  const levelColors = {
    1: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    2: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    4: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  const levelLabels = {
    1: "Niveau 1 - Méta-analyses, revues systématiques",
    2: "Niveau 2 - Essais contrôlés randomisés (RCT)",
    3: "Niveau 3 - Études de cohorte, cas-témoins",
    4: "Niveau inférieur - Études observationnelles, cas cliniques",
  };

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            🏆 Hiérarchie des Types d&apos;Études
          </h4>

          <div
            className={`rounded-md p-2 ${levelColors[studyHierarchy.highestLevel] || levelColors[4]}`}
          >
            <p className="text-sm font-semibold">
              Niveau le plus élevé : {studyHierarchy.highestLevel}
            </p>
            {studyHierarchy.levelDescription && (
              <p className="mt-1 text-xs">{studyHierarchy.levelDescription}</p>
            )}
          </div>

          {/* Liste des études par niveau */}
          {studyHierarchy.studies &&
            studyHierarchy.studies.map((studyGroup, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className={`rounded-md p-2 ${levelColors[studyGroup.level] || levelColors[4]}`}
                >
                  <h5 className="text-sm font-bold">
                    {levelLabels[studyGroup.level] ||
                      `Niveau ${studyGroup.level}`}
                  </h5>
                  <div className="mt-1 space-y-1 text-xs">
                    <p>
                      <strong>Type :</strong>{" "}
                      {studyGroup.type === "meta-analysis"
                        ? "Méta-analyse"
                        : studyGroup.type === "rct"
                          ? "RCT"
                          : studyGroup.type === "observational"
                            ? "Observationnelle"
                            : studyGroup.type}
                    </p>
                    <p>
                      <strong>Nombre d&apos;études :</strong> {studyGroup.count}
                    </p>
                    <p>
                      <strong>Participants totaux :</strong>{" "}
                      {studyGroup.totalParticipants}
                    </p>
                    {studyGroup.mainFindings && (
                      <p className="mt-1 italic">{studyGroup.mainFindings}</p>
                    )}
                  </div>
                </div>

                {/* Références */}
                {studyGroup.references && studyGroup.references.length > 0 && (
                  <div className="ml-4 space-y-1">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Références principales :
                    </p>
                    {studyGroup.references.map((ref, refIdx) => (
                      <div
                        key={refIdx}
                        className="rounded border-l-2 border-gray-300 bg-gray-50 p-2 text-xs dark:border-gray-600 dark:bg-gray-700"
                      >
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {ref.title}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                          {ref.year && <span>Année: {ref.year}</span>}
                          {ref.doi && (
                            <a
                              href={`https://doi.org/${ref.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                            >
                              DOI: {ref.doi}
                            </a>
                          )}
                          {ref.pmid && (
                            <a
                              href={
                                ref.link ||
                                `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                            >
                              PMID: {ref.pmid}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      }
      placement="top"
      className="max-w-[550px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <FiLayers className="h-3 w-3" />
        Hiérarchie études
      </span>
    </Tooltip>
  );
};

StudyHierarchyTooltip.propTypes = {
  studyHierarchy: PropTypes.shape({
    highestLevel: PropTypes.number,
    levelDescription: PropTypes.string,
    studies: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number,
        type: PropTypes.string,
        count: PropTypes.number,
        totalParticipants: PropTypes.number,
        mainFindings: PropTypes.string,
        references: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            doi: PropTypes.string,
            pmid: PropTypes.string,
            year: PropTypes.number,
            link: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};

export default StudyHierarchyTooltip;
