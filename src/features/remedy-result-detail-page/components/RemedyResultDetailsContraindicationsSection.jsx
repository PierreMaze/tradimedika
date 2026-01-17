import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiExclamationTriangle } from "react-icons/hi2";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

function RemedyResultDetailsContraindicationsSection({ contraindications }) {
  if (!contraindications || contraindications.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-100 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-red-950"
    >
      <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-red-800 lg:text-2xl dark:text-red-200">
        <HiExclamationTriangle className="h-6 w-6" aria-hidden="true" />
        Contraindications
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        {contraindications.map((contraindication, index) => (
          <li
            key={index}
            className="text-sm leading-relaxed font-medium text-red-800 capitalize 2xl:text-base dark:text-red-200"
          >
            {capitalizeFirstLetter(contraindication, true)}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

RemedyResultDetailsContraindicationsSection.propTypes = {
  contraindications: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsContraindicationsSection;
