import {
  EVIDENCE_LEVEL_ORDER,
  EVIDENCE_LEVELS,
} from "../constants/evidenceLevelConfig";

export default function EvidenceLevelLegend() {
  return (
    <div className="mb-6 rounded-lg border-2 border-dashed border-blue-300/60 bg-blue-50/50 p-4 dark:border-blue-500/30 dark:bg-blue-900/10">
      <h2 className="mb-3 text-sm font-semibold text-neutral-800 dark:text-white">
        Échelle de preuve (HAS)
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {EVIDENCE_LEVEL_ORDER.map((level) => {
          const config = EVIDENCE_LEVELS[level];
          const Icon = config.icon;
          return (
            <div key={level} className="flex items-start gap-3">
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${config.colorClasses}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {config.shortLabel}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {config.description}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {config.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
