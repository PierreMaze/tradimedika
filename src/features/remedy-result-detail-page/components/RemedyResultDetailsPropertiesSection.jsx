import { motion } from "framer-motion";
import PropTypes from "prop-types";
import SectionHelpButton from "../../../components/ui/helper/SectionHelpButton";
import { TermPopover } from "../../../components/ui/popover";
import { useAnimationVariants } from "../../../hooks/useAnimationVariants";

function RemedyResultDetailsPropertiesSection({ properties }) {
  const sectionAnimation = useAnimationVariants(0.15, "section");
  const tagAnimation = useAnimationVariants(0, "tag");

  if (!properties || properties.length === 0) return null;

  return (
    <motion.section
      {...sectionAnimation}
      className="rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Propriétés
        </h2>
        <SectionHelpButton
          title="Effets et caractéristiques observés"
          message="Les propriétés résument les principaux effets et caractéristiques du remède. Cliquez sur une propriété soulignée pour en savoir plus."
        />
      </div>
      <motion.div
        className="flex flex-wrap gap-x-2 gap-y-4"
        initial="hidden"
        animate="visible"
        variants={tagAnimation.containerVariants}
      >
        {properties.map((prop, index) => (
          <motion.span
            key={index}
            variants={tagAnimation.itemVariants}
            transition={tagAnimation.itemTransition}
          >
            <TermPopover
              termId={prop.name}
              variant="property"
              className="inline-block"
            >
              <span className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize shadow-md 2xl:text-base dark:bg-emerald-900 dark:text-emerald-200">
                {prop.name}
              </span>
            </TermPopover>
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
