import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { MdTipsAndUpdates } from "react-icons/md";
import { useAnimationVariants } from "../../../hooks/useAnimationVariants";

function RemedyResultDetailsTipsSection({ tips }) {
  const [isOpen, setIsOpen] = useState(true);
  const sectionAnimation = useAnimationVariants(0.65, "section");
  const listAnimation = useAnimationVariants(0, "list");
  const collapseAnimation = useAnimationVariants(0, "collapse");

  if (!tips || tips.length === 0) return null;

  return (
    <motion.section
      {...sectionAnimation}
      className="rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-3 flex w-full cursor-pointer items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-sky-600 lg:text-xl 2xl:text-2xl dark:text-sky-500">
          <MdTipsAndUpdates
            className="h-5 w-5 text-sky-600 lg:h-6 lg:w-6 dark:text-sky-500"
            aria-hidden="true"
          />
          Conseils pratiques
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
          <motion.div {...collapseAnimation} className="overflow-hidden">
            <div className="border-l-4 border-sky-600 pl-4 dark:border-sky-500">
              <motion.ul
                className="list-disc space-y-1 pl-5"
                initial="hidden"
                animate="visible"
                variants={listAnimation.containerVariants}
              >
                {tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    variants={listAnimation.itemVariants}
                    transition={listAnimation.itemTransition(index, 10)}
                    className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
                  >
                    {tip}
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

RemedyResultDetailsTipsSection.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsTipsSection;
