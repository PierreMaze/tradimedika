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
    borderClasses: "border-emerald-500",
    dotColor: "bg-emerald-500",
    icon: IoCheckmarkCircleOutline,
  },
  B: {
    label: "Niveau B",
    shortLabel: "B",
    description: "Présomption scientifique",
    detail: "Essais randomisés de faible puissance, études comparatives",
    colorClasses:
      "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
    borderClasses: "border-sky-500",
    dotColor: "bg-sky-500",
    icon: IoInformationCircleOutline,
  },
  C: {
    label: "Niveau C",
    shortLabel: "C",
    description: "Faible niveau de preuve",
    detail: "Études cas-témoins, séries de cas",
    colorClasses:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    borderClasses: "border-amber-500",
    dotColor: "bg-yellow-500",
    icon: IoAlertCircleOutline,
  },
  D: {
    label: "Niveau D",
    shortLabel: "D",
    description: "Accord d'experts",
    detail: "Usage traditionnel, aucune donnée clinique",
    colorClasses:
      "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
    borderClasses: "border-zinc-500",
    dotColor: "bg-zinc-500",
    icon: IoHelpCircleOutline,
  },
};

export const EVIDENCE_LEVEL_ORDER = ["A", "B", "C", "D"];
