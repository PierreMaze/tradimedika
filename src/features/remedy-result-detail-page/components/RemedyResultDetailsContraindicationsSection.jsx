import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { RiAlarmWarningFill } from "react-icons/ri";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

function RemedyResultDetailsContraindicationsSection({ contraindications }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!contraindications || contraindications.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-3 flex w-full cursor-pointer items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-red-600 lg:text-xl 2xl:text-2xl dark:text-red-500">
          <RiAlarmWarningFill
            className="h-4 w-4 text-red-600 lg:h-5 lg:w-5 dark:text-red-500"
            aria-hidden="true"
          />
          Contre-indication
        </h2>
        {isOpen ? (
          <HiChevronUp
            className="h-5 w-5 text-neutral-500 lg:h-6 lg:w-6"
            aria-hidden="true"
          />
        ) : (
          <HiChevronDown
            className="h-5 w-5 text-neutral-500 lg:h-6 lg:w-6"
            aria-hidden="true"
          />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="h-full max-h-fit border-l-4 border-red-600 pl-4 md:max-h-4/5 dark:border-red-500">
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
                {contraindications.map((contraindication, index) => (
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
                    className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
                  >
                    {capitalizeFirstLetter(contraindication, true)}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

RemedyResultDetailsContraindicationsSection.propTypes = {
  contraindications: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsContraindicationsSection;
