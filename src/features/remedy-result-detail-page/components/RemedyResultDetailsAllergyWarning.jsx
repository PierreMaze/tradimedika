import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { PiSealWarningFill } from "react-icons/pi";

function RemedyResultDetailsAllergyWarning({
  allergenNames,
  prefersReducedMotion = false,
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="alert"
      aria-live="assertive"
      className="mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-amber-700/60 bg-amber-50 p-4 dark:border-amber-400/60 dark:bg-amber-950/75"
    >
      <PiSealWarningFill
        className="mt-0.5 flex shrink-0 text-2xl text-amber-600 dark:text-amber-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-base font-bold text-amber-600 uppercase dark:text-amber-400">
          Ce remède contient vos allergènes
        </p>
        <p className="mt-1 text-sm text-amber-900 dark:text-amber-50">
          Ce remède contient :{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {allergenNames}
          </span>
        </p>
        <p className="mt-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
          Consultez un professionnel de santé avant utilisation.
        </p>
      </div>
    </motion.div>
  );
}

RemedyResultDetailsAllergyWarning.propTypes = {
  allergenNames: PropTypes.string.isRequired,
  prefersReducedMotion: PropTypes.bool,
};

export default RemedyResultDetailsAllergyWarning;
