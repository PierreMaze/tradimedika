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
    description: "Preuve scientifique solide",
    detail: "≥1 méta-analyse de qualité OU ≥2 RCT de bonne qualité",
    fullDetail:
      "Méta-analyses, revues systématiques de haute qualité, essais cliniques randomisés (RCT) de forte puissance avec résultats cohérents",
    colorClasses:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    borderClasses: "border-emerald-500",
    dotColor: "bg-emerald-500",
    icon: IoCheckmarkCircleOutline,
  },
  B: {
    label: "Niveau B",
    shortLabel: "B",
    description: "Preuve scientifique probable",
    detail:
      "RCT individuels de qualité acceptable OU études observationnelles solides",
    fullDetail:
      "Essais cliniques randomisés de qualité acceptable, études comparatives non randomisées bien conduites",
    colorClasses:
      "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
    borderClasses: "border-sky-500",
    dotColor: "bg-sky-500",
    icon: IoInformationCircleOutline,
  },
  C: {
    label: "Niveau C",
    shortLabel: "C",
    description: "Preuve limitée",
    detail:
      "Études observationnelles limitées OU RCT de faible qualité OU études pré-cliniques prometteuses",
    fullDetail:
      "Études cas-témoins, séries de cas, études de cohorte de faible puissance, études pré-cliniques",
    colorClasses:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    borderClasses: "border-amber-500",
    dotColor: "bg-yellow-500",
    icon: IoAlertCircleOutline,
  },
  D: {
    label: "Niveau D",
    shortLabel: "D",
    description: "Preuve insuffisante",
    detail:
      "Usage traditionnel documenté uniquement OU rapports de cas OU aucune étude identifiée",
    fullDetail:
      "Accord d'experts, consensus professionnel, usage traditionnel sans données cliniques probantes",
    colorClasses:
      "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
    borderClasses: "border-zinc-500",
    dotColor: "bg-zinc-500",
    icon: IoHelpCircleOutline,
  },
};

export const EVIDENCE_LEVEL_ORDER = ["A", "B", "C", "D"];
