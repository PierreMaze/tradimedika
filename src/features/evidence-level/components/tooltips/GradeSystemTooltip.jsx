import PropTypes from "prop-types";
import { Tooltip } from "@/components/ui/tooltip";
import { FiAward } from "react-icons/fi";

/**
 * Tooltip affichant le système GRADE adapté (A, B, C, D)
 */
const GradeSystemTooltip = ({ gradeLevel, gradingDetails }) => {
  const gradeInfo = {
    A: {
      label: "A - Preuve élevée",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      description:
        "Niveau de confiance élevé : données robustes, RCT multiples de qualité, cohérence des résultats",
    },
    B: {
      label: "B - Preuve modérée",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      description:
        "Niveau de confiance modéré : RCT de qualité acceptable, certaines limites méthodologiques",
    },
    C: {
      label: "C - Preuve faible",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      description:
        "Niveau de confiance limité : études observationnelles, hétérogénéité importante, biais possibles",
    },
    D: {
      label: "D - Preuve très faible",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      description:
        "Niveau de confiance très faible : usage traditionnel documenté, données scientifiques insuffisantes",
    },
  };

  const currentGrade = gradeInfo[gradeLevel] || gradeInfo.D;

  return (
    <Tooltip
      content={
        <div className="space-y-3">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            🎯 Système GRADE
          </h4>

          <div className={`rounded-md p-3 ${currentGrade.color}`}>
            <p className="text-sm font-bold">{currentGrade.label}</p>
            <p className="mt-1 text-xs">{currentGrade.description}</p>
          </div>

          {gradingDetails && (
            <div className="space-y-2">
              {gradingDetails.certainty && (
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Certitude :</strong> {gradingDetails.certainty}
                </p>
              )}
              {gradingDetails.reason && (
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  <strong>Justification :</strong> {gradingDetails.reason}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2 border-t border-gray-200 pt-2 dark:border-gray-600">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              Échelle GRADE complète :
            </p>
            <div className="space-y-1 text-xs">
              {Object.entries(gradeInfo).map(([grade, info]) => (
                <div
                  key={grade}
                  className={`rounded p-1.5 ${grade === gradeLevel ? "ring-2 ring-gray-400 dark:ring-gray-500" : ""} ${info.color}`}
                >
                  <strong>{info.label}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      placement="top"
      className="max-w-[450px]"
    >
      <span
        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${currentGrade.color}`}
      >
        <FiAward className="h-3 w-3" />
        Grade {gradeLevel}
      </span>
    </Tooltip>
  );
};

GradeSystemTooltip.propTypes = {
  gradeLevel: PropTypes.oneOf(["A", "B", "C", "D"]).isRequired,
  gradingDetails: PropTypes.shape({
    certainty: PropTypes.string,
    reason: PropTypes.string,
  }),
};

export default GradeSystemTooltip;
