import PropTypes from "prop-types";
import { InfoTooltip } from "../../../components/ui/tooltip";

/**
 * Score d'efficacité basé sur la moyenne des scores des propriétés
 * Affiche une barre de progression visuelle avec le score moyen
 */
function ProductResultDetailsEfficacyScore({ properties }) {
  if (!properties || properties.length === 0) return null;

  const scores = properties
    .map((p) => p.score)
    .filter((s) => typeof s === "number");
  if (scores.length === 0) return null;

  const averageScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  const percentage = (averageScore / 10) * 100;

  const getScoreColor = (score) => {
    if (score >= 8) return "bg-green-500 dark:bg-green-400";
    if (score >= 6) return "bg-emerald-500 dark:bg-emerald-400";
    if (score >= 4) return "bg-amber-500 dark:bg-amber-400";
    return "bg-red-500 dark:bg-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return "Efficacité élevée";
    if (score >= 6) return "Efficacité modérée";
    if (score >= 4) return "Efficacité limitée";
    return "Efficacité faible";
  };

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-4 flex min-h-8 items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Score d&apos;efficacité
        </h2>
        <InfoTooltip
          title="Score d'efficacité"
          message="Moyenne des scores de toutes les propriétés thérapeutiques de ce produit (sur 10). Ce score est indicatif et ne remplace pas un avis médical."
        />
      </div>

      <div className="space-y-3">
        {/* Score principal */}
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            {averageScore.toFixed(1)}
          </span>
          <span className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
            / 10
          </span>
        </div>

        {/* Barre de progression */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getScoreColor(averageScore)}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={averageScore}
            aria-valuemin={0}
            aria-valuemax={10}
            aria-label={`Score d'efficacité : ${averageScore.toFixed(1)} sur 10`}
          />
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {getScoreLabel(averageScore)} — basé sur {scores.length} propriété
          {scores.length > 1 ? "s" : ""}
        </p>

        {/* Détail par propriété */}
        <div className="mt-2 space-y-2">
          {properties.map((prop, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-32 truncate text-xs text-neutral-600 capitalize dark:text-neutral-400">
                {prop.name}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className={`h-full rounded-full ${getScoreColor(prop.score)}`}
                  style={{ width: `${(prop.score / 10) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {prop.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ProductResultDetailsEfficacyScore.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ),
};

export default ProductResultDetailsEfficacyScore;
