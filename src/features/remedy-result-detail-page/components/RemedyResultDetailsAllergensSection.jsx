import { motion } from "framer-motion";
import PropTypes from "prop-types";
import SectionHelpButton from "../../../components/ui/helper/SectionHelpButton";
import { TermPopover } from "../../../components/ui/popover";
import { useAnimationVariants } from "../../../hooks/useAnimationVariants";

function RemedyResultDetailsAllergensSection({ allergens }) {
  const sectionAnimation = useAnimationVariants(0.35, "section");
  const tagAnimation = useAnimationVariants(0, "tag");

  if (!allergens || allergens.length === 0) return null;

  return (
    <motion.section
      {...sectionAnimation}
      className="rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Allergènes potentiels
        </h2>
        <SectionHelpButton
          title="Réactions allergiques"
          message="Les allergènes potentiels regroupent les substances présentes dans le remède susceptibles de provoquer une réaction. Cliquez sur un allergène souligné pour en savoir plus."
        />
      </div>
      <motion.div
        className="flex flex-wrap gap-x-2 gap-y-4"
        initial="hidden"
        animate="visible"
        variants={tagAnimation.containerVariants}
      >
        {allergens.map((allergen, index) => (
          <motion.span
            key={index}
            variants={tagAnimation.itemVariants}
            transition={tagAnimation.itemTransition}
          >
            <TermPopover
              termId={allergen}
              variant="allergen"
              className="inline-block"
            >
              <span className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize shadow-md 2xl:text-base dark:bg-emerald-900 dark:text-emerald-200">
                {allergen}
              </span>
            </TermPopover>
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

RemedyResultDetailsAllergensSection.propTypes = {
  allergens: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsAllergensSection;
