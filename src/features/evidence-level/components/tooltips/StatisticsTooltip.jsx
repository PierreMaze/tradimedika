import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiBarChart2 } from "react-icons/fi";

/**
 * Tooltip affichant les indicateurs statistiques (hétérogénéité I², effect size, etc.)
 */
const StatisticsTooltip = ({ statisticalIndicators }) => {
  if (!statisticalIndicators) return null;

  const { heterogeneity, effectSize, publicationBias, subgroupAnalysis } =
    statisticalIndicators;

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            📈 Indicateurs Statistiques
          </h4>

          {/* Hétérogénéité */}
          {heterogeneity && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Hétérogénéité (I²)
              </h5>
              <div className="mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>I² =</strong> {heterogeneity.i2}%
                  {heterogeneity.i2CI95 &&
                    ` (IC95%: [${heterogeneity.i2CI95[0]}%, ${heterogeneity.i2CI95[1]}%])`}
                </p>
                <p className="italic">
                  <strong>Interprétation :</strong>{" "}
                  {heterogeneity.interpretation}
                </p>
                {heterogeneity.implication && (
                  <p className="mt-1 rounded bg-blue-50 p-1.5 dark:bg-blue-900/20">
                    💡 {heterogeneity.implication}
                  </p>
                )}
                {heterogeneity.cochranQ && (
                  <p className="text-xs">
                    Test Q de Cochran: Q={heterogeneity.cochranQ.value}, df=
                    {heterogeneity.cochranQ.df}, p=
                    {heterogeneity.cochranQ.pValue}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Taille d'effet */}
          {effectSize && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Taille d&apos;Effet
              </h5>
              <div className="mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <p>
                  <strong>{effectSize.type}:</strong> {effectSize.value}
                </p>
                {effectSize.typeDescription && (
                  <p className="text-xs text-gray-600 italic dark:text-gray-400">
                    ({effectSize.typeDescription})
                  </p>
                )}
                {effectSize.ci95 && (
                  <p>
                    <strong>IC 95%:</strong> [{effectSize.ci95[0]},{" "}
                    {effectSize.ci95[1]}]
                  </p>
                )}
                {effectSize.pValue && (
                  <p>
                    <strong>p-value:</strong> {effectSize.pValue}
                  </p>
                )}
                <p className="italic">
                  <strong>Interprétation:</strong> {effectSize.interpretation}
                </p>
                {effectSize.clinicalSignificance && (
                  <p className="mt-1 rounded bg-green-50 p-1.5 dark:bg-green-900/20">
                    🎯 Signification clinique: {effectSize.clinicalSignificance}
                  </p>
                )}
                {effectSize.nnt && (
                  <p className="mt-1 rounded bg-yellow-50 p-1.5 dark:bg-yellow-900/20">
                    <strong>NNT (Number Needed to Treat):</strong>{" "}
                    {effectSize.nnt.value}
                    <br />
                    <span className="text-xs italic">
                      {effectSize.nnt.interpretation}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Biais de publication */}
          {publicationBias && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Biais de Publication
              </h5>
              <div className="mt-1 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                {publicationBias.assessed && (
                  <p>
                    <strong>Méthodes:</strong>{" "}
                    {Array.isArray(publicationBias.methods)
                      ? publicationBias.methods.join(", ")
                      : publicationBias.methods}
                  </p>
                )}
                {publicationBias.eggerTest && (
                  <p>
                    Test d&apos;Egger: intercept=
                    {publicationBias.eggerTest.intercept}, p=
                    {publicationBias.eggerTest.pValue}
                  </p>
                )}
                <p className="italic">
                  <strong>Résultat:</strong> {publicationBias.result}
                </p>
                {publicationBias.confidence && (
                  <p>
                    <strong>Confiance:</strong> {publicationBias.confidence}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Analyses en sous-groupes */}
          {subgroupAnalysis && (
            <div className="rounded-md border border-gray-200 p-2 dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                Analyses en Sous-Groupes
              </h5>
              <div className="mt-1 space-y-2 text-xs text-gray-700 dark:text-gray-300">
                {Object.entries(subgroupAnalysis).map(([key, value], idx) => {
                  if (key === "interpretation") {
                    return (
                      <p
                        key={idx}
                        className="rounded bg-gray-50 p-1.5 italic dark:bg-gray-700"
                      >
                        💡 {value}
                      </p>
                    );
                  }

                  return (
                    <div key={idx}>
                      <p className="font-medium capitalize">
                        {key.replace(/_/g, " ")}:
                      </p>
                      <div className="mt-1 ml-2 space-y-1">
                        {typeof value === "object" &&
                          Object.entries(value).map(
                            ([subkey, subvalue], subidx) => (
                              <p key={subidx} className="text-xs">
                                • {subkey}: {JSON.stringify(subvalue)}
                              </p>
                            ),
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      }
      placement="top"
      className="max-w-[500px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
        <FiBarChart2 className="h-3 w-3" />
        Indicateurs statistiques
      </span>
    </Tooltip>
  );
};

StatisticsTooltip.propTypes = {
  statisticalIndicators: PropTypes.shape({
    heterogeneity: PropTypes.object,
    effectSize: PropTypes.object,
    publicationBias: PropTypes.object,
    subgroupAnalysis: PropTypes.object,
  }),
};

export default StatisticsTooltip;
