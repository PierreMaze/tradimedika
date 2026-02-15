import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { MdTipsAndUpdates } from "react-icons/md";
import { InfoTooltip } from "../../../components/ui/tooltip";

function RemedyResultDetailsTipsSection({ tips }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!tips || tips.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className="mb-3 flex w-full cursor-pointer items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-sky-600 lg:text-xl 2xl:text-2xl dark:text-sky-500">
            <MdTipsAndUpdates
              className="h-5 w-5 text-sky-600 lg:h-6 lg:w-6 dark:text-sky-500"
              aria-hidden="true"
            />
            Conseils
          </h2>
          <InfoTooltip
            title="Astuces pratiques"
            message="Cette section vous guide sur la meilleure façon de conserver, de ce fournir et d'utiliser ce produit au quotidien."
            iconColor="text-sky-600 dark:text-sky-500"
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
      </div>
      {isOpen && (
        <div className="animate-in fade-in overflow-hidden duration-300 motion-reduce:animate-none">
          <div className="border-l-4 border-sky-600 pl-4 dark:border-sky-500">
            <ul className="list-disc space-y-1 pl-5">
              {tips.map((tip, index) => (
                <li
                  key={index}
                  className="animate-fade-in text-sm leading-relaxed font-medium text-black motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

RemedyResultDetailsTipsSection.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsTipsSection;
