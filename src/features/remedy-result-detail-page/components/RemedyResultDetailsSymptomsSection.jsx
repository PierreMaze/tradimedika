import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useAnimationVariants } from "../../../hooks/useAnimationVariants";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

function RemedyResultDetailsSymptomsSection({ symptoms }) {
  const sectionAnimation = useAnimationVariants(0.25, "section");
  const tagAnimation = useAnimationVariants(0, "tag");

  if (!symptoms || symptoms.length === 0) return null;

  return (
    <motion.section
      {...sectionAnimation}
      className="rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="mb-4 text-lg font-semibold lg:text-xl 2xl:text-2xl">
        Symptômes traités
      </h2>
      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={tagAnimation.containerVariants}
      >
        {symptoms.map((symptom, index) => (
          <motion.span
            key={index}
            variants={tagAnimation.itemVariants}
            transition={tagAnimation.itemTransition}
            className="rounded-md bg-orange-100 px-3 py-1.5 text-sm font-medium text-yellow-800 shadow-md 2xl:text-base dark:bg-yellow-900 dark:text-yellow-100"
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
