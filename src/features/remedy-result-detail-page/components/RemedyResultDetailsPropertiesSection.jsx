import { motion } from "framer-motion";
import PropTypes from "prop-types";

function RemedyResultDetailsPropertiesSection({ properties }) {
  if (!properties || properties.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">Propriétés</h2>
      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {properties.map((prop, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={
              index >= 5 ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
            }
            className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize 2xl:text-base dark:bg-emerald-900 dark:text-emerald-200"
          >
            {prop.name}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

RemedyResultDetailsPropertiesSection.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default RemedyResultDetailsPropertiesSection;
