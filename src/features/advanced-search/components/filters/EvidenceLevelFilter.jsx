import PropTypes from "prop-types";
import { EVIDENCE_LEVELS } from "../../utils/searchConstants";

const COLOR_CLASSES = {
  sky: "bg-sky-600 dark:bg-sky-500",
  emerald: "bg-emerald-600 dark:bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-600 dark:bg-red-500",
};

/**
 * Filtre par niveau de preuve scientifique (A, B, C, D)
 */
function EvidenceLevelFilter({ activeFilters, onToggle }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Basé sur le GRADE
      </p>
      {EVIDENCE_LEVELS.map((level) => (
        <label
          key={level.id}
          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <input
            type="checkbox"
            checked={activeFilters[level.id] || false}
            onChange={() => onToggle("evidenceLevel", level.id)}
            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
          />
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${COLOR_CLASSES[level.color]}`}
              aria-hidden="true"
            />
            <span className="w-full text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {level.label}
            </span>
          </div>
          <span className="ml-4 text-xs text-neutral-400 dark:text-neutral-500">
            {level.description}
          </span>
        </label>
      ))}
    </div>
  );
}

EvidenceLevelFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default EvidenceLevelFilter;
