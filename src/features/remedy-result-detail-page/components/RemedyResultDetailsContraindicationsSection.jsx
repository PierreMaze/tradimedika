import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { RiAlarmWarningFill } from "react-icons/ri";
import SectionHelpButton from "../../../components/ui/helper/SectionHelpButton";
import { TermPopover } from "../../../components/ui/popover";
import { useAnimationVariants } from "../../../hooks/useAnimationVariants";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { parseContraindicationText } from "../utils/parseContraindicationText";

function RemedyResultDetailsContraindicationsSection({ contraindications }) {
  const [isOpen, setIsOpen] = useState(true);
  const sectionAnimation = useAnimationVariants(0.45, "section");
  const listAnimation = useAnimationVariants(0, "list");
  const collapseAnimation = useAnimationVariants(0, "collapse");

  if (!contraindications || contraindications.length === 0) return null;

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
        <div className="flex items-center gap-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-red-700 lg:text-xl 2xl:text-2xl dark:text-red-500">
            <RiAlarmWarningFill
              className="h-4 w-4 text-red-700 lg:h-5 lg:w-5 dark:text-red-500"
              aria-hidden="true"
            />
            Contre-indication
          </h2>
          <SectionHelpButton
            title="Incompatibilités"
            message="Les contre-indications indiquent les situations ou traitements pour lesquels le remède est déconseillé. Cliquez sur un terme médical souligné pour en savoir plus."
            iconColor="text-red-700 dark:text-red-500"
          />
        </div>
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
            <div className="h-full max-h-fit border-l-4 border-red-700 pl-4 md:max-h-4/5 dark:border-red-500">
              <motion.ul
                className="list-disc space-y-1 pl-5"
                initial="hidden"
                animate="visible"
                variants={listAnimation.containerVariants}
              >
                {contraindications.map((contraindication, index) => {
                  const segments = parseContraindicationText(contraindication);

                  return (
                    <motion.li
                      key={index}
                      variants={listAnimation.itemVariants}
                      transition={listAnimation.itemTransition(index, 10)}
                      className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
                    >
                      {segments.map((segment, segmentIndex) => {
                        // Capitaliser uniquement le premier segment de la phrase
                        const displayText =
                          segmentIndex === 0
                            ? capitalizeFirstLetter(segment.text)
                            : segment.text;

                        if (segment.isTerm && segment.termId) {
                          return (
                            <TermPopover
                              key={segmentIndex}
                              termId={segment.termId}
                              variant="medical"
                              className="inline"
                            >
                              <span>{displayText}</span>
                            </TermPopover>
                          );
                        }
                        return <span key={segmentIndex}>{displayText}</span>;
                      })}
                    </motion.li>
                  );
                })}
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
