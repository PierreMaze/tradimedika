import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { formatUsageFrequency } from "../utils/formatUsageFrequency";

function RemedyResultDetailsUsagesList({ uses }) {
  if (!uses || uses.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="te mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-600 lg:text-xl 2xl:text-2xl dark:text-emerald-500">
        <FaPrescriptionBottleMedical
          className="h-4 w-4 text-emerald-600 lg:h-5 lg:w-5 dark:text-emerald-500"
          aria-hidden="true"
        />
        Utilisations
      </h2>
      <motion.ul
        className="space-y-4"
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
        {uses.map((use, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={
              index >= 3 ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }
            }
            className="border-l-4 border-emerald-600 pl-4 dark:border-emerald-500"
          >
            <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-black 2xl:text-base dark:text-white">
              {use.form && use.form.length > 0 && (
                <span className="capitalize">{use.form.join(", ")}</span>
              )}
              {use.dose && use.dose.value && (
                <>
                  <span className="text-neutral-400">•</span>
                  <span>
                    {use.dose.value} {use.dose.unit}
                  </span>
                </>
              )}
              {use.frequency && use.frequency.value && (
                <>
                  <span className="text-neutral-400">•</span>
                  <span>{formatUsageFrequency(use.frequency)}</span>
                </>
              )}
              {use.duration && use.duration.value && (
                <>
                  <span className="text-neutral-400">•</span>
                  <span>
                    Pendant {use.duration.value} {use.duration.unit}
                  </span>
                </>
              )}
            </div>
            {use.description && (
              <p className="dark:text-light text-sm leading-relaxed text-black 2xl:text-base">
                {use.description}
              </p>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

RemedyResultDetailsUsagesList.propTypes = {
  uses: PropTypes.arrayOf(
    PropTypes.shape({
      form: PropTypes.arrayOf(PropTypes.string),
      dose: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        unit: PropTypes.string,
      }),
      frequency: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        unit: PropTypes.string,
      }),
      duration: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        unit: PropTypes.string,
      }),
      description: PropTypes.string,
    }),
  ),
};

export default RemedyResultDetailsUsagesList;
