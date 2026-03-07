import PropTypes from "prop-types";
import { THERAPEUTIC_CATEGORIES } from "../../utils/searchConstants";

/**
 * Filtre par catégorie thérapeutique
 */
function CategoryFilter({ activeFilters, onToggle }) {
  return (
    <div className="space-y-1">
      {THERAPEUTIC_CATEGORIES.map((cat) => (
        <label
          key={cat.id}
          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <input
            type="checkbox"
            checked={activeFilters[cat.id] || false}
            onChange={() => onToggle("categories", cat.id)}
            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {cat.label}
          </span>
        </label>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CategoryFilter;
