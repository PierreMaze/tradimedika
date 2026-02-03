import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { MdThumbUp } from "react-icons/md";

/**
 * RemedyResultDetailsRecommendedBanner Component
 *
 * Bannière indiquant que ce remède est le plus pertinent pour les symptômes recherchés.
 * Affichée en haut de la page de détails si le remède est marqué comme "isRecommended".
 */
function RemedyResultDetailsRecommendedBanner({
  prefersReducedMotion = false,
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      className="mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 dark:border-emerald-400/60 dark:bg-emerald-950/75"
    >
      <MdThumbUp
        className="mt-0.5 flex shrink-0 text-lg text-emerald-700 dark:text-emerald-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-base font-bold text-emerald-700 uppercase dark:text-emerald-400">
          Remède recommandé
        </p>
        <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-50">
          Ce remède est le{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            plus pertinent
          </span>{" "}
          pour vos symptômes.
        </p>
      </div>
    </motion.div>
  );
}

RemedyResultDetailsRecommendedBanner.propTypes = {
  prefersReducedMotion: PropTypes.bool,
};

export default RemedyResultDetailsRecommendedBanner;
