import { motion } from "framer-motion";
import PropTypes from "prop-types";

function RemedyResultDetailsAllergensSection({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-black lg:text-xl 2xl:text-2xl dark:text-white">
        Allergènes potentiels
      </h2>
      <div className="flex flex-wrap gap-2">
        {allergens.map((allergen, index) => (
          <span
            key={index}
            className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize 2xl:text-base dark:bg-emerald-900 dark:text-emerald-200"
          >
            {allergen}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

RemedyResultDetailsAllergensSection.propTypes = {
  allergens: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsAllergensSection;
