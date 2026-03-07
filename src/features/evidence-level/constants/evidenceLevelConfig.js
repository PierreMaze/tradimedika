import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoHelpCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

export const EVIDENCE_LEVELS = {
  A: {
    label: "Niveau A",
    shortLabel: "A",
    description: "Preuve scientifique établie",
    detail: "Méta-analyses, essais randomisés de forte puissance",
    colorClasses:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    dotColor: "bg-emerald-500",
    icon: IoCheckmarkCircleOutline,
  },
  B: {
    label: "Niveau B",
    shortLabel: "B",
    description: "Présomption scientifique",
    detail: "Essais randomisés de faible puissance, études comparatives",
    colorClasses:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    dotColor: "bg-blue-500",
    icon: IoInformationCircleOutline,
  },
  C: {
    label: "Niveau C",
    shortLabel: "C",
    description: "Faible niveau de preuve",
    detail: "Études cas-témoins, séries de cas",
    colorClasses:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    dotColor: "bg-amber-500",
    icon: IoAlertCircleOutline,
  },
  D: {
    label: "Niveau D",
    shortLabel: "D",
    description: "Accord d'experts",
    detail: "Usage traditionnel, aucune donnée clinique",
    colorClasses:
      "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300",
    dotColor: "bg-neutral-400",
    icon: IoHelpCircleOutline,
  },
};

export const EVIDENCE_LEVEL_ORDER = ["A", "B", "C", "D"];
