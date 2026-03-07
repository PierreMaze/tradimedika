import PropTypes from "prop-types";
import { VERIFICATION_OPTIONS } from "../../utils/searchConstants";

const COLOR_CLASSES = {
  green: "bg-green-600 dark:bg-green-500",
  amber: "bg-amber-500",
};

/**
 * Filtre par type de vérification (professionnel / traditionnel)
 */
function VerificationFilter({ activeFilters, onToggle }) {
  return (
    <div className="space-y-1">
      {VERIFICATION_OPTIONS.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <input
            type="checkbox"
            checked={activeFilters[option.id] || false}
            onChange={() => onToggle("verification", option.id)}
            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {option.label}
          </span>
          <span
            className={`h-2 w-2 rounded-full ${COLOR_CLASSES[option.color]}`}
            aria-hidden="true"
          />
        </label>
      ))}
    </div>
  );
}

VerificationFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default VerificationFilter;
