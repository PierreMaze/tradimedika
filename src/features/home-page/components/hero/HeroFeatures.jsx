import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";

/**
 * Liste des features par défaut
 */
const DEFAULT_FEATURES = [
  "+100 produits naturels",
  "Santé naturelle",
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-12"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
          className="flex items-center gap-2"
        >
          <FaCheck className="text-sm text-emerald-600/80 dark:text-emerald-500/80" />
          <span className="text-sm font-semibold text-neutral-600 transition duration-300 ease-in-out lg:text-base 2xl:text-lg dark:text-neutral-400">
            {feature}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

HeroFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string),
};
