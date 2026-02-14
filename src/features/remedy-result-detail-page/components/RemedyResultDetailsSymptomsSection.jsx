import PropTypes from "prop-types";
import { InfoTooltip } from "../../../components/ui/tooltip";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

function RemedyResultDetailsSymptomsSection({ symptoms }) {
  if (!symptoms || symptoms.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-2.5 flex min-h-8 items-center gap-2">
        <h2 className="text-lg font-semibold lg:text-xl 2xl:text-2xl">
          Symptômes
        </h2>
        <InfoTooltip
          title="Symptômes traités"
          message="Cette section vous guide sur la meilleure façon de conserver, de ce fournir et d'utiliser cette aliment au quotidien."
          iconColor="text-neutral-600 dark:text-neutral-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom, index) => (
          <span
            key={index}
            className="animate-scale-in rounded-md bg-orange-100 px-3 py-1.5 text-sm font-medium text-yellow-800 shadow-md motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:bg-yellow-900 dark:text-yellow-100"
            style={{ animationDelay: `${100 + index * 40}ms` }}
          >
            {capitalizeFirstLetter(symptom, true)}
          </span>
        ))}
      </div>
    </section>
  );
}

RemedyResultDetailsSymptomsSection.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsSymptomsSection;
