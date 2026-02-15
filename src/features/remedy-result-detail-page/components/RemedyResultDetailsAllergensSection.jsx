import PropTypes from "prop-types";
import { TermPopover } from "../../../components/ui/popover";
import { InfoTooltip } from "../../../components/ui/tooltip";

function RemedyResultDetailsAllergensSection({ allergens }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-all duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-4 flex min-h-8 items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Allergènes
        </h2>
        <InfoTooltip
          title="Substances allergènes potentielles"
          message="Cette section regroupent les substances présentes dans ce produit susceptibles de provoquer une réaction. Cliquez sur un allergène souligné pour en savoir plus."
        />
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {allergens.map((allergen, index) => (
          <span
            key={index}
            className="animate-scale-in motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: `${100 + index * 40}ms` }}
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
          </span>
        ))}
      </div>
    </section>
  );
}

RemedyResultDetailsAllergensSection.propTypes = {
  allergens: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsAllergensSection;
