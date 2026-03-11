import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";

/**
 * Tooltip affichant les détails de la méthodologie de collecte et d'évaluation
 */
const MethodologyTooltip = ({ methodology }) => {
  if (!methodology) return null;

  const {
    studyCollection,
    methodologicalEvaluation,
    resultsAnalysis,
    gradingProcess,
    clinicalSynthesis,
  } = methodology;

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            📊 Méthodologie Complète
          </h4>

          {/* Collecte des études */}
          {studyCollection && (
            <div className="space-y-1">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                1. Collecte des études
              </h5>
              <div className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Bases de données :</strong>{" "}
                  {studyCollection.databases?.join(", ")}
                </p>
                {studyCollection.searchPeriod && (
                  <p>
                    <strong>Période :</strong> {studyCollection.searchPeriod}
                  </p>
                )}
                {studyCollection.keywords && (
                  <p>
                    <strong>Mots-clés :</strong>{" "}
                    {Array.isArray(studyCollection.keywords)
                      ? studyCollection.keywords.join(", ")
                      : studyCollection.keywords}
                  </p>
                )}
                {studyCollection.inclusionCriteria && (
                  <div>
                    <strong>Critères d&apos;inclusion :</strong>
                    <ul className="mt-1 ml-4 list-disc">
                      {studyCollection.inclusionCriteria.map(
                        (criteria, idx) => (
                          <li key={idx}>{criteria}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
                {studyCollection.exclusionCriteria && (
                  <div>
                    <strong>Critères d&apos;exclusion :</strong>
                    <ul className="mt-1 ml-4 list-disc">
                      {studyCollection.exclusionCriteria.map(
                        (criteria, idx) => (
                          <li key={idx}>{criteria}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Évaluation méthodologique */}
          {methodologicalEvaluation && (
            <div className="space-y-1">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                2. Évaluation méthodologique
              </h5>
              <div className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {methodologicalEvaluation.tools && (
                  <p>
                    <strong>Outils :</strong>{" "}
                    {Array.isArray(methodologicalEvaluation.tools)
                      ? methodologicalEvaluation.tools.join(", ")
                      : methodologicalEvaluation.tools}
                  </p>
                )}
                {methodologicalEvaluation.process && (
                  <p>
                    <strong>Processus :</strong>{" "}
                    {methodologicalEvaluation.process}
                  </p>
                )}
                {methodologicalEvaluation.qualityThreshold && (
                  <p>
                    <strong>Seuil qualité :</strong>{" "}
                    {methodologicalEvaluation.qualityThreshold}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Analyse des résultats */}
          {resultsAnalysis && (
            <div className="space-y-1">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                3. Analyse des résultats
              </h5>
              <div className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {resultsAnalysis.method && (
                  <p>
                    <strong>Méthode :</strong> {resultsAnalysis.method}
                  </p>
                )}
                {resultsAnalysis.software && (
                  <p>
                    <strong>Logiciel :</strong> {resultsAnalysis.software}
                  </p>
                )}
                {resultsAnalysis.heterogeneityAssessment && (
                  <p>
                    <strong>Hétérogénéité :</strong>{" "}
                    {resultsAnalysis.heterogeneityAssessment}
                  </p>
                )}
                {resultsAnalysis.publicationBias && (
                  <p>
                    <strong>Biais publication :</strong>{" "}
                    {resultsAnalysis.publicationBias}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Attribution niveau de preuve */}
          {gradingProcess && (
            <div className="space-y-1">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                4. Attribution niveau de preuve
              </h5>
              <div className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300">
                {gradingProcess.framework && (
                  <p>
                    <strong>Framework :</strong> {gradingProcess.framework}
                  </p>
                )}
                {gradingProcess.finalGrade && (
                  <p>
                    <strong>Grade final :</strong> {gradingProcess.finalGrade}
                  </p>
                )}
                {gradingProcess.downgrades && (
                  <div>
                    <strong>Downgrades appliqués :</strong>
                    <ul className="mt-1 ml-4 list-disc">
                      {gradingProcess.downgrades.map((downgrade, idx) => (
                        <li key={idx}>{downgrade}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Synthèse clinique */}
          {clinicalSynthesis && (
            <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
              <h5 className="mb-1 font-semibold text-gray-800 dark:text-gray-200">
                5. Synthèse clinique
              </h5>
              <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                {clinicalSynthesis}
              </p>
            </div>
          )}
        </div>
      }
      placement="top"
      className="max-w-[500px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <FiInfo className="h-3 w-3" />
        Méthodologie
      </span>
    </Tooltip>
  );
};

MethodologyTooltip.propTypes = {
  methodology: PropTypes.shape({
    studyCollection: PropTypes.object,
    methodologicalEvaluation: PropTypes.object,
    resultsAnalysis: PropTypes.object,
    gradingProcess: PropTypes.object,
    clinicalSynthesis: PropTypes.string,
  }),
};

export default MethodologyTooltip;
