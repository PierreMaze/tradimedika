import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

function RemedyResultDetailsNavigation({ selectedSymptoms, variant = "top" }) {
  if (variant === "top") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex items-center gap-3"
      >
        <Link
          to="/remedes"
          state={{ symptoms: selectedSymptoms }}
          aria-label="Retour aux résultats"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-800"
        >
          <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
          Retour aux résultats
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col gap-4 sm:flex-row"
    >
      <Link
        to="/remedes"
        state={{ symptoms: selectedSymptoms }}
        aria-label="Retour aux résultats"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-800"
      >
        <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
        Retour aux résultats
      </Link>
      <Link
        to="/"
        aria-label="Retour à l'accueil"
        className="rounded-lg border-2 border-emerald-600 px-6 py-3 text-center font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-600 hover:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:text-emerald-500 dark:hover:bg-emerald-700 dark:hover:text-white"
      >
        Nouvelle recherche
      </Link>
    </motion.div>
  );
}

RemedyResultDetailsNavigation.propTypes = {
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["top", "bottom"]),
};

export default RemedyResultDetailsNavigation;
