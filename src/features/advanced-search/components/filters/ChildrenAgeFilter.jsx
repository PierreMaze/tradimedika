import PropTypes from "prop-types";
import { CHILDREN_AGE_OPTIONS } from "../../utils/searchConstants";

/**
 * Filtre par âge enfants (tous âges, 1+, 3+, 6+, 12+)
 */
function ChildrenAgeFilter({ activeFilters, onToggle }) {
  return (
    <div className="space-y-1">
      {CHILDREN_AGE_OPTIONS.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <input
            type="checkbox"
            checked={activeFilters[option.id] || false}
            onChange={() => onToggle("childrenAge", option.id)}
            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
          />
          <div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {option.label}
            </span>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              {option.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}

ChildrenAgeFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ChildrenAgeFilter;
