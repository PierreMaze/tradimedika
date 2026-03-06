import {
  IoFolderOpenOutline,
  IoFlaskOutline,
  IoDocumentTextOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useAuth } from "../features/auth";

const SECTIONS = [
  {
    title: "Catalogue",
    description: "Parcourir les produits naturels par catégorie et propriété",
    icon: IoFolderOpenOutline,
    color: "emerald",
  },
  {
    title: "Interactions",
    description:
      "Vérifier les interactions entre produits naturels et médicaments",
    icon: IoFlaskOutline,
    color: "amber",
  },
  {
    title: "Exports PDF",
    description: "Générer des fiches d'information pour vos patients",
    icon: IoDocumentTextOutline,
    color: "blue",
  },
  {
    title: "Recherche avancée",
    description: "Filtrer par grossesse, enfants, allergènes, niveau de preuve",
    icon: IoSearchOutline,
    color: "purple",
  },
];

const COLOR_CLASSES = {
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
};

export default function Dashboard() {
  const { userEmail } = useAuth();

  return (
    <div className="mx-auto max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
          Bienvenue sur Tradimedika Pro
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Connecté en tant que {userEmail}
        </p>
      </div>

      {/* Prototype notice */}
      <div className="mb-8 rounded-lg border-2 border-dashed border-amber-400/60 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-900/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
          Prototype — Les sections ci-dessous sont en cours de développement.
        </p>
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
          Cette interface évoluera en fonction des retours des professionnels de
          santé.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => {
          const colors = COLOR_CLASSES[section.color];
          const Icon = section.icon;

          return (
            <div
              key={section.title}
              className={`rounded-xl border ${colors.border} bg-white p-6 opacity-60 dark:bg-neutral-800`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg}`}
                >
                  <Icon className={`text-xl ${colors.icon}`} />
                </div>
                <div>
                  <h2 className="font-semibold text-neutral-800 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {section.description}
                  </p>
                  <span className="mt-3 inline-block rounded bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                    Prochainement
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
