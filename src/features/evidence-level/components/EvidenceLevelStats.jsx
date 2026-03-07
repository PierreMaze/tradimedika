import PropTypes from "prop-types";
import {
  EVIDENCE_LEVEL_ORDER,
  EVIDENCE_LEVELS,
} from "../constants/evidenceLevelConfig";

export default function EvidenceLevelStats({ stats }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {EVIDENCE_LEVEL_ORDER.map((level) => {
        const config = EVIDENCE_LEVELS[level];
        return (
          <div
            key={level}
            className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${config.dotColor}`}
              ></span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {config.label}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-neutral-800 dark:text-white">
              {stats[level] || 0}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {config.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

EvidenceLevelStats.propTypes = {
  stats: PropTypes.shape({
    A: PropTypes.number,
    B: PropTypes.number,
    C: PropTypes.number,
    D: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};
