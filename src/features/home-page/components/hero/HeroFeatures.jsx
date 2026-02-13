import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";

/**
 * Liste des features par défaut
 */
const DEFAULT_FEATURES = [
  "+100 produits naturels",
  "Source référencée",
  "Recherche simplifié",
  "Respect de vos données",
];

/**
 * Composant HeroFeatures - Liste des fonctionnalités clés
 *
 * Affiche une liste de features avec icônes de check
 * et animations stagger
 *
 * @param {Object} props
 * @param {string[]} props.features - Tableau de features à afficher
 * @returns {JSX.Element}
 */
export default function HeroFeatures({ features = DEFAULT_FEATURES }) {
  return (
    <div className="animate-fade-in-up flex flex-wrap justify-center gap-4 delay-600 motion-reduce:animate-none motion-reduce:opacity-100 lg:gap-6 xl:gap-8 2xl:gap-12">
      {features.map((feature, index) => {
        const delayClasses = {
          0: "delay-700",
          1: "delay-800",
          2: "delay-900",
          3: "delay-[1000ms]",
        };

        return (
          <div
            key={feature}
            className={`animate-scale-in flex items-center gap-2 motion-reduce:animate-none motion-reduce:opacity-100 ${delayClasses[index] || "delay-700"}`}
          >
            <FaCheck className="text-sm text-emerald-600/80 dark:text-emerald-500/80" />
            <span className="text-sm font-semibold text-neutral-600 transition duration-300 ease-in-out lg:text-base 2xl:text-lg dark:text-neutral-400">
              {feature}
            </span>
          </div>
        );
      })}
    </div>
  );
}

HeroFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string),
};
