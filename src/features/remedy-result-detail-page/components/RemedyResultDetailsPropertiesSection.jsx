import PropTypes from "prop-types";
import SectionHelpButton from "../../../components/ui/helper/SectionHelpButton";
import { TermPopover } from "../../../components/ui/popover";

function RemedyResultDetailsPropertiesSection({ properties }) {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-4 flex min-h-8 items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Propriétés
        </h2>
        <SectionHelpButton
          title="Effets et caractéristiques observés"
          message="Les propriétés résument les principaux effets et caractéristiques du remède. Cliquez sur une propriété soulignée pour en savoir plus."
        />
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {properties.map((prop, index) => {
          const delayClass =
            {
              0: "delay-100",
              1: "delay-150",
              2: "delay-200",
              3: "delay-250",
              4: "delay-300",
              5: "delay-350",
            }[index] || "delay-450";

          return (
            <span
              key={index}
              className={`animate-scale-in ${delayClass} motion-reduce:animate-none motion-reduce:opacity-100`}
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
            </span>
          );
        })}
      </div>
    </section>
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
