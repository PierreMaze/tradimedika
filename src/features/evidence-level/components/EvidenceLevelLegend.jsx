import {
  EVIDENCE_LEVEL_ORDER,
  EVIDENCE_LEVELS,
} from "../constants/evidenceLevelConfig";
import EvidenceLevelMethodology from "./EvidenceLevelMethodology";

export default function EvidenceLevelLegend() {
  return (
    <div className="mb-6 rounded-lg border-2 border-dashed border-emerald-300/60 bg-emerald-50/50 p-4 dark:border-emerald-500/30 dark:bg-emerald-900/10">
      <h2 className="mb-1 text-sm font-semibold text-neutral-800 dark:text-white">
        Niveaux de preuve scientifique
      </h2>
      <p className="mb-4 text-xs text-neutral-600 dark:text-neutral-400">
        Classification adaptée de GRADE, HAS et méthodologie Cochrane
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {EVIDENCE_LEVEL_ORDER.map((level) => {
          const config = EVIDENCE_LEVELS[level];
          const Icon = config.icon;
          return (
            <div key={level} className="flex items-start gap-3">
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold lg:text-sm ${config.colorClasses}`}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                {config.label}
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
      <EvidenceLevelMethodology />
    </div>
  );
}
