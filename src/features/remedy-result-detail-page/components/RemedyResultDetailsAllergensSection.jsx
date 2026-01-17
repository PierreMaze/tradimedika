import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiInformationCircle } from "react-icons/hi2";

function RemedyResultDetailsAllergensSection({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-yellow-900/20"
    >
      <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 lg:text-2xl dark:text-yellow-300">
        <HiInformationCircle className="h-6 w-6" aria-hidden="true" />
        Allergènes potentiels
      </h2>
      <div className="flex flex-wrap gap-2">
        {allergens.map((allergen, index) => (
          <span
            key={index}
            className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm font-medium text-yellow-900 capitalize 2xl:text-base dark:bg-yellow-800 dark:text-yellow-100"
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
