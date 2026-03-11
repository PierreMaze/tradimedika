import PropTypes from "prop-types";
import { Tooltip } from "@/components/ui/tooltip";
import { FiCheckCircle } from "react-icons/fi";

/**
 * Tooltip affichant les outils d'évaluation méthodologique (RoB 2, JADAD, AMSTAR 2)
 */
const QualityToolsTooltip = ({ methodologicalQuality }) => {
  if (!methodologicalQuality) return null;

  const { rob2, jadad, amstar2 } = methodologicalQuality;

  const riskColors = {
    low: "text-green-700 dark:text-green-300",
    some_concerns: "text-yellow-700 dark:text-yellow-300",
    high: "text-red-700 dark:text-red-300",
  };

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            ✅ Outils d&apos;Évaluation Méthodologique
          </h4>

          {/* RoB 2 (Risk of Bias 2) */}
          {rob2 && (
            <div className="space-y-2 rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                RoB 2 (Cochrane Risk of Bias)
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Outil d&apos;évaluation du risque de biais pour essais
                randomisés
              </p>

              <div className={`rounded bg-gray-50 p-2 dark:bg-gray-700`}>
                <p
                  className={`text-sm font-bold ${riskColors[rob2.overall] || "text-gray-700"}`}
                >
                  Risque global :{" "}
                  {rob2.overall === "low"
                    ? "Faible"
                    : rob2.overall === "some_concerns"
                      ? "Modéré"
                      : rob2.overall === "high"
                        ? "Élevé"
                        : rob2.overall}
                </p>
                {rob2.overallInterpretation && (
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {rob2.overallInterpretation}
                  </p>
                )}
              </div>

              {rob2.domains && (
                <div className="space-y-1 text-xs">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Domaines évalués :
                  </p>
                  {Object.entries(rob2.domains).map(
                    ([domain, domainData], idx) => {
                      const riskLevel =
                        typeof domainData === "object"
                          ? domainData.risk
                          : domainData;
                      const justification =
                        typeof domainData === "object"
                          ? domainData.justification
                          : null;

                      return (
                        <div
                          key={idx}
                          className="rounded border-l-2 border-gray-300 bg-white p-1.5 dark:border-gray-600 dark:bg-gray-800"
                        >
                          <p className="font-medium">
                            <span className="capitalize">
                              {domain === "randomization"
                                ? "Randomisation"
                                : domain === "deviations"
                                  ? "Déviations protocole"
                                  : domain === "missingData"
                                    ? "Données manquantes"
                                    : domain === "measurement"
                                      ? "Mesure outcomes"
                                      : domain === "selection"
                                        ? "Sélection résultats"
                                        : domain}
                            </span>
                            :{" "}
                            <span
                              className={
                                riskColors[riskLevel] || "text-gray-600"
                              }
                            >
                              {riskLevel === "low"
                                ? "Faible"
                                : riskLevel === "some_concerns"
                                  ? "Modéré"
                                  : riskLevel === "high"
                                    ? "Élevé"
                                    : riskLevel}
                            </span>
                          </p>
                          {justification && (
                            <p className="mt-0.5 text-xs text-gray-600 italic dark:text-gray-400">
                              {justification}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          )}

          {/* JADAD Scale */}
          {jadad && (
            <div className="space-y-2 rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Score JADAD
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Échelle de qualité pour essais cliniques randomisés (max 5
                points)
              </p>

              <div className="rounded bg-gray-50 p-2 dark:bg-gray-700">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Score : {jadad.score} / {jadad.maxScore || 5}
                </p>
                {jadad.interpretation && (
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {jadad.interpretation}
                  </p>
                )}
              </div>

              {jadad.details && (
                <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                  {Object.entries(jadad.details).map(([key, value], idx) => (
                    <p key={idx}>
                      <strong className="capitalize">
                        {key === "randomization"
                          ? "Randomisation"
                          : key === "randomizationMethod"
                            ? "Méthode randomisation"
                            : key === "doubleBlind"
                              ? "Double aveugle"
                              : key === "blindingMethod"
                                ? "Méthode aveugle"
                                : key === "withdrawals"
                                  ? "Retraits/perdus de vue"
                                  : key}
                        :
                      </strong>{" "}
                      {value}
                    </p>
                  ))}
                </div>
              )}

              {jadad.justification && (
                <p className="text-xs text-gray-600 italic dark:text-gray-400">
                  {jadad.justification}
                </p>
              )}
            </div>
          )}

          {/* AMSTAR 2 */}
          {amstar2 && (
            <div className="space-y-2 rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                AMSTAR 2
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Évaluation de la qualité des revues systématiques
              </p>

              <div className="rounded bg-gray-50 p-2 dark:bg-gray-700">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Qualité :{" "}
                  {amstar2.score === "high"
                    ? "Élevée"
                    : amstar2.score === "moderate"
                      ? "Modérée"
                      : amstar2.score === "low"
                        ? "Faible"
                        : amstar2.score}
                </p>
                {amstar2.scoreNumeric && amstar2.maxScore && (
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Score : {amstar2.scoreNumeric}/{amstar2.maxScore}
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Failles critiques :</strong>{" "}
                  {amstar2.criticalFlaws || 0}
                </p>
                <p>
                  <strong>Faiblesses non-critiques :</strong>{" "}
                  {amstar2.nonCriticalWeaknesses || 0}
                </p>
              </div>

              {amstar2.interpretation && (
                <p className="text-xs text-gray-600 italic dark:text-gray-400">
                  {amstar2.interpretation}
                </p>
              )}
            </div>
          )}
        </div>
      }
      placement="top"
      className="max-w-[500px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200">
        <FiCheckCircle className="h-3 w-3" />
        Qualité méthodologique
      </span>
    </Tooltip>
  );
};

QualityToolsTooltip.propTypes = {
  methodologicalQuality: PropTypes.shape({
    rob2: PropTypes.object,
    jadad: PropTypes.object,
    amstar2: PropTypes.object,
  }),
};

export default QualityToolsTooltip;
