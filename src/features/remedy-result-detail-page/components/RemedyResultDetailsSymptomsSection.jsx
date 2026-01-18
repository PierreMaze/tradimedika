import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

function RemedyResultDetailsSymptomsSection({ symptoms }) {
  if (!symptoms || symptoms.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="mb-4 text-xl font-semibold lg:text-2xl 2xl:text-3xl">
        Symptômes traités
      </h2>
      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.25,
            },
          },
        }}
      >
        {symptoms.map((symptom, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={
              index >= 5 ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
            }
            className="rounded-md bg-orange-100 px-3 py-2 text-sm font-medium text-yellow-800 shadow-md 2xl:text-base dark:bg-yellow-900 dark:text-yellow-100"
          >
            {capitalizeFirstLetter(symptom, true)}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

RemedyResultDetailsSymptomsSection.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsSymptomsSection;
