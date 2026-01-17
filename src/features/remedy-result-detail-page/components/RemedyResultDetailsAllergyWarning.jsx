import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoMdAlert } from "react-icons/io";

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
      className="mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 dark:border-emerald-400/60 dark:bg-emerald-950"
    >
      <IoMdAlert
        className="mt-0.5 flex shrink-0 text-2xl text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
          Attention : Ce remède contient vos allergènes
        </p>
        <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-50">
          Ce remède contient :{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {allergenNames}
          </span>
        </p>
        <p className="mt-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
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
