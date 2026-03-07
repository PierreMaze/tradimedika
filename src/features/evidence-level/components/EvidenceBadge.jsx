import PropTypes from "prop-types";
import { Tooltip } from "../../../components/ui/tooltip";
import { EVIDENCE_LEVELS } from "../constants/evidenceLevelConfig";

function EvidenceBadge({ level, className = "", showLabel = true }) {
  const config = EVIDENCE_LEVELS[level];
  if (!config) return null;

  const Icon = config.icon;

  const tooltipContent = (
    <>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
        {config.label} — {config.description}
      </h3>
      <p className="text-base text-neutral-900 dark:text-white">
        {config.detail}
      </p>
    </>
  );

  return (
    <Tooltip content={tooltipContent} placement="top" hoverDelay={200}>
      <span
        data-testid="evidence-badge"
        className={`transition-color inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold duration-150 lg:text-sm 2xl:text-sm ${config.colorClasses} ${className}`}
      >
        <Icon className="hidden h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        {showLabel && config.label}
      </span>
    </Tooltip>
  );
}

EvidenceBadge.propTypes = {
  level: PropTypes.oneOf(["A", "B", "C", "D"]).isRequired,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default EvidenceBadge;
