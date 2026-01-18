import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { MdTipsAndUpdates } from "react-icons/md";

function RemedyResultDetailsTipsSection({ tips }) {
  if (!tips || tips.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-sky-800 lg:text-2xl dark:text-sky-300">
        <MdTipsAndUpdates
          className="h-4 w-4 text-sky-500 lg:h-5 lg:w-5"
          aria-hidden="true"
        />
        Conseils pratiques
      </h2>
      <div className="border-l-4 border-sky-500 pl-4">
        <motion.ul
          className="list-disc space-y-1 pl-5"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={
                index >= 3
                  ? { duration: 0 }
                  : { duration: 0.3, ease: "easeOut" }
              }
              className="text-dark text-sm leading-relaxed font-medium 2xl:text-base dark:text-white"
            >
              {tip}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}

RemedyResultDetailsTipsSection.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsTipsSection;
