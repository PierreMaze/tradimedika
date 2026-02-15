import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { RiAlarmWarningFill } from "react-icons/ri";
import { TermPopover } from "../../../components/ui/popover";
import { InfoTooltip } from "../../../components/ui/tooltip";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { parseContraindicationText } from "../utils/parseContraindicationText";

function RemedyResultDetailsContraindicationsSection({ contraindications }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!contraindications || contraindications.length === 0) return null;

  return (
    <section className="animate-fade-in-up rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition-all duration-150 motion-reduce:animate-none motion-reduce:opacity-100 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800">
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
          <h2 className="flex items-center gap-2 text-lg font-semibold text-red-700 lg:text-xl 2xl:text-2xl dark:text-red-500">
            <RiAlarmWarningFill
              className="h-4 w-4 text-red-700 lg:h-5 lg:w-5 dark:text-red-500"
              aria-hidden="true"
            />
            Contre-indication
          </h2>
          <InfoTooltip
            title="Incompatibilités"
            message="Cette section vous indiquent les situations ou traitements pour lesquels ce produit est déconseillé. Cliquez sur un terme médical en souligné pour en savoir plus."
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
      </div>
      {isOpen && (
        <div className="animate-collapse-in overflow-hidden motion-reduce:animate-none motion-reduce:opacity-100">
          <div className="h-full max-h-fit border-l-4 border-red-700 pl-4 md:max-h-4/5 dark:border-red-500">
            <ul className="list-disc space-y-1 pl-5">
              {contraindications.map((contraindication, index) => {
                const segments = parseContraindicationText(contraindication);

                return (
                  <li
                    key={index}
                    className={`animate-slide-in-left duration-150motion-reduce:animate-none text-sm leading-relaxed font-medium text-black transition-colors motion-reduce:opacity-100 2xl:text-base dark:text-white`}
                    style={{
                      display: index >= 10 ? "list-item" : undefined,
                    }}
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
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

RemedyResultDetailsContraindicationsSection.propTypes = {
  contraindications: PropTypes.arrayOf(PropTypes.string),
};

export default RemedyResultDetailsContraindicationsSection;
