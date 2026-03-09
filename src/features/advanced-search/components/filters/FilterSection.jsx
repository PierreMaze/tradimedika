import PropTypes from "prop-types";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { IoReloadOutline } from "react-icons/io5";

/**
 * Section accordéon réutilisable pour les filtres de la sidebar
 * S'inspire du FilterAccordion existant mais adapté pour la sidebar
 */
function FilterSection({
  label,
  children,
  defaultOpen = true,
  count = 0,
  onReset = null,
  showReset = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleReset = (e) => {
    e.stopPropagation();
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {count > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
          {isOpen ? (
            <HiChevronUp
              className="h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          ) : (
            <HiChevronDown
              className="h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-3 motion-reduce:transition-none">
          {showReset && count > 0 && onReset && (
            <button
              onClick={handleReset}
              className="mb-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
              aria-label="Réinitialiser les filtres de cette section"
            >
              <IoReloadOutline className="h-3.5 w-3.5" />
              Réinitialiser
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

FilterSection.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  count: PropTypes.number,
  onReset: PropTypes.func,
  showReset: PropTypes.bool,
};

export default FilterSection;
