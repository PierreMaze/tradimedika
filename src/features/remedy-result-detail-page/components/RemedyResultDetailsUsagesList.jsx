import PropTypes from "prop-types";
import { useState } from "react";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { InfoTooltip } from "../../../components/ui/tooltip";
import { formatUsageFrequency } from "../utils/formatUsageFrequency";

function RemedyResultDetailsUsagesList({ uses }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!uses || uses.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex w-full cursor-pointer items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h2 className="te flex items-center gap-2 text-lg font-semibold text-emerald-600 lg:text-xl 2xl:text-2xl dark:text-emerald-500">
          <FaPrescriptionBottleMedical
            className="h-4 w-4 text-emerald-600 lg:h-5 lg:w-5 dark:text-emerald-500"
            aria-hidden="true"
          />
          Utilisations / Préparations
          <InfoTooltip
            title="Méthode de préparation et d'utilisation"
            message="Cette section vous guide sur la manière optimale d'utiliser cet aliment pour obtenir les meilleurs résultats."
            iconColor="text-emerald-600 dark:text-emerald-500"
          />
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
      {isOpen && (
        <div className="animate-in fade-in overflow-hidden duration-300 motion-reduce:animate-none">
          <div className="border-l-4 border-emerald-600 pl-4 dark:border-emerald-500">
            <ul className="space-y-4">
              {uses.map((use, index) => (
                <li
                  key={index}
                  className="animate-fade-in motion-reduce:animate-none motion-reduce:opacity-100"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
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
