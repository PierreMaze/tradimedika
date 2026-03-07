import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

/**
 * Filtre par propriétés thérapeutiques (antioxydant, anti-inflammatoire, etc.)
 */
function PropertyFilter({ activeFilters, onToggle, uniqueProperties }) {
  return (
    <div className="max-h-48 space-y-1 overflow-y-auto">
      {uniqueProperties.map((prop) => (
        <label
          key={prop.name}
          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <input
            type="checkbox"
            checked={activeFilters[prop.name] || false}
            onChange={() => onToggle("properties", prop.name)}
            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {capitalizeFirstLetter(prop.name, true)}
          </span>
          <span className="ml-auto text-xs text-neutral-400 dark:text-neutral-500">
            {prop.count}
          </span>
        </label>
      ))}
    </div>
  );
}

PropertyFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  uniqueProperties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PropertyFilter;
