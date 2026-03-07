import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { IoFlaskOutline } from "react-icons/io5";
import { InfoTooltip } from "../../../components/ui/tooltip";

const SEVERITY_STYLES = {
  élevée: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
    badge: "bg-red-600 dark:bg-red-500",
  },
  modérée: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    badge: "bg-amber-600 dark:bg-amber-500",
  },
  faible: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-300 dark:border-green-700",
    badge: "bg-green-600 dark:bg-green-500",
  },
};

/**
 * Section interactions médicamenteuses et avec d'autres produits naturels
 */
function ProductResultDetailsInteractionsSection({ interactions }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!interactions || interactions.length === 0) return null;

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
          <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-700 lg:text-xl 2xl:text-2xl dark:text-amber-400">
            <IoFlaskOutline
              className="h-4 w-4 lg:h-5 lg:w-5"
              aria-hidden="true"
            />
            Interactions
          </h2>
          <InfoTooltip
            title="Interactions"
            message="Interactions connues avec des médicaments ou d'autres produits naturels. Consultez votre médecin avant toute association."
            iconColor="text-amber-700 dark:text-amber-400"
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
        <div className="space-y-2">
          {interactions.map((interaction, index) => {
            const styles =
              SEVERITY_STYLES[interaction.severity] || SEVERITY_STYLES.faible;

            return (
              <div
                key={index}
                className={`rounded-lg border p-3 ${styles.bg} ${styles.border}`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold text-white uppercase ${styles.badge}`}
                  >
                    {interaction.severity}
                  </span>
                  <span className={`text-sm font-semibold ${styles.text}`}>
                    {interaction.name}
                  </span>
                  <span className="text-xs text-neutral-500 capitalize dark:text-neutral-400">
                    ({interaction.type})
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${styles.text}`}>
                  {interaction.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

ProductResultDetailsInteractionsSection.propTypes = {
  interactions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      severity: PropTypes.oneOf(["élevée", "modérée", "faible"]).isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

export default ProductResultDetailsInteractionsSection;
