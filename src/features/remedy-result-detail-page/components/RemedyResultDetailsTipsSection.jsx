import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiLightBulb } from "react-icons/hi2";

function RemedyResultDetailsTipsSection({ tips }) {
  if (!tips || tips.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6 rounded-lg border-l-4 border-sky-500 bg-sky-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-sky-900/20"
    >
      <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-sky-800 lg:text-2xl dark:text-sky-300">
        <HiLightBulb className="h-6 w-6" aria-hidden="true" />
        Conseils pratiques
      </h2>
      <ul className="list-disc space-y-1 pl-5">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="text-sm leading-relaxed text-sky-800 2xl:text-base dark:text-sky-300"
          >
            {tip}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

RemedyResultDetailsTipsSection.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsTipsSection;
