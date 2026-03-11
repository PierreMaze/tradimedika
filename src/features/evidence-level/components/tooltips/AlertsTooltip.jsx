import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { FiAlertTriangle } from "react-icons/fi";

/**
 * Tooltip affichant les signaux d'alerte et précautions
 */
const AlertsTooltip = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const severityColors = {
    critical:
      "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:text-red-200",
    high: "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    moderate:
      "bg-yellow-100 border-yellow-500 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200",
    low: "bg-blue-100 border-blue-500 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  };

  const severityIcons = {
    critical: "🚫",
    high: "⚠",
    moderate: "⚠",
    low: "ℹ",
  };

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            ⚠ Signaux d&apos;Alerte & Précautions
          </h4>

          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`rounded-md border-l-4 p-2 ${severityColors[alert.severity] || severityColors.low}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">
                    {severityIcons[alert.severity] || "ℹ"}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold">
                        {alert.type === "interaction"
                          ? "Interaction"
                          : alert.type === "contraindication"
                            ? "Contre-indication"
                            : alert.type === "precaution"
                              ? "Précaution"
                              : alert.type === "tolerance"
                                ? "Tolérance"
                                : alert.type === "bioavailability"
                                  ? "Biodisponibilité"
                                  : alert.type === "high_heterogeneity"
                                    ? "Hétérogénéité élevée"
                                    : alert.type === "standardization"
                                      ? "Standardisation"
                                      : alert.type === "insufficient_data"
                                        ? "Données insuffisantes"
                                        : alert.type === "no_rct"
                                          ? "Absence RCT"
                                          : alert.type === "allergen"
                                            ? "Allergène"
                                            : alert.type === "quality"
                                              ? "Qualité produit"
                                              : alert.type === "low_evidence"
                                                ? "Preuves limitées"
                                                : alert.type}
                      </h5>
                      <span className="text-xs font-semibold uppercase">
                        {alert.severity === "critical"
                          ? "Critique"
                          : alert.severity === "high"
                            ? "Élevé"
                            : alert.severity === "moderate"
                              ? "Modéré"
                              : "Faible"}
                      </span>
                    </div>

                    {alert.category && (
                      <p className="text-xs font-medium opacity-75">
                        Catégorie: {alert.category}
                      </p>
                    )}

                    <p className="text-xs leading-relaxed">
                      {alert.description}
                    </p>

                    {alert.mechanism && (
                      <p className="text-xs italic">
                        <strong>Mécanisme:</strong> {alert.mechanism}
                      </p>
                    )}

                    {alert.evidence && (
                      <p className="text-xs">
                        <strong>Preuves:</strong> {alert.evidence}
                      </p>
                    )}

                    {alert.frequency && (
                      <p className="text-xs">
                        <strong>Fréquence:</strong> {alert.frequency}
                      </p>
                    )}

                    {alert.implication && (
                      <p className="text-xs">
                        <strong>Implication:</strong> {alert.implication}
                      </p>
                    )}

                    {alert.clinicalImpact && (
                      <p className="text-xs">
                        <strong>Impact clinique:</strong> {alert.clinicalImpact}
                      </p>
                    )}

                    {alert.recommendation && (
                      <div className="mt-1 rounded bg-white/50 p-1.5 dark:bg-black/20">
                        <p className="text-xs font-medium">
                          💡 Recommandation: {alert.recommendation}
                        </p>
                      </div>
                    )}

                    {alert.references && (
                      <p className="text-xs opacity-75">
                        Réf:{" "}
                        {Array.isArray(alert.references)
                          ? alert.references.join(", ")
                          : alert.references}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md bg-gray-100 p-2 text-xs dark:bg-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Note importante:
            </p>
            <p className="mt-0.5 text-gray-700 dark:text-gray-300">
              Ces informations sont à titre indicatif. Consultez toujours un
              professionnel de santé avant toute utilisation, en particulier en
              cas de traitement médical en cours, grossesse, ou pathologie
              chronique.
            </p>
          </div>
        </div>
      }
      placement="top"
      className="max-w-[550px]"
    >
      <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
        <FiAlertTriangle className="h-3 w-3" />
        Signaux d&apos;alerte ({alerts.length})
      </span>
    </Tooltip>
  );
};

AlertsTooltip.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      severity: PropTypes.oneOf(["critical", "high", "moderate", "low"]),
      category: PropTypes.string,
      description: PropTypes.string,
      mechanism: PropTypes.string,
      evidence: PropTypes.string,
      frequency: PropTypes.string,
      recommendation: PropTypes.string,
      references: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      implication: PropTypes.string,
      clinicalImpact: PropTypes.string,
    }),
  ),
};

export default AlertsTooltip;
