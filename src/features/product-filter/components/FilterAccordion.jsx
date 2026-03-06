import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

/**
 * FilterAccordion Component
 *
 * Accordéon pour une catégorie de filtres avec checkboxes
 * Peut s'ouvrir/fermer et affiche les options cochables
 *
 * Props:
 * - category: Objet de configuration de la catégorie
 * - activeFilters: Filtres actifs pour cette catégorie
 * - onToggle: Fonction pour toggle une checkbox
 * - isOpenByDefault: Ouvrir l'accordéon par défaut
 */
function FilterAccordion({
  category,
  activeFilters,
  onToggle,
  isOpenByDefault = true,
}) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (optionId) => {
    onToggle(category.id, optionId);
  };

  return (
    <div className="mx-4 border-b border-neutral-200 px-2 dark:border-neutral-700">
      <button
        onClick={handleHeaderClick}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {category.label}
        </span>
        {isOpen ? (
          <HiChevronUp
            className="h-5 w-5 text-neutral-500"
            aria-hidden="true"
          />
        ) : (
          <HiChevronDown
            className="h-5 w-5 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:transition-none">
          <div className="space-y-3 pb-4">
            {category.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <input
                  type="checkbox"
                  checked={activeFilters[option.id] || false}
                  onChange={() => handleCheckboxChange(option.id)}
                  className="h-4 w-4 cursor-pointer border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {option.label}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        option.color === "green"
                          ? "bg-green-600 dark:bg-green-500"
                          : option.color === "amber"
                            ? "bg-amber-500"
                            : option.color === "red"
                              ? "bg-red-600 dark:bg-red-500"
                              : "bg-amber-500"
                      }`}
                      aria-hidden="true"
                    ></span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

FilterAccordion.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  isOpenByDefault: PropTypes.bool,
};

export default FilterAccordion;
