import {
  IoArrowForwardOutline,
  IoDocumentTextOutline,
  IoFlaskOutline,
  IoFolderOpenOutline,
  IoLibraryOutline,
  IoMedkitOutline,
  IoPeopleOutline,
  IoPulseOutline,
  IoSearchOutline,
  IoServerOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { ROLES, useAuth } from "../features/auth";

const SECTIONS = [
  {
    title: "Gestion des données",
    description: "Gérer les produits naturels de la base de données (CRUD).",
    icon: IoServerOutline,
    color: "rose",
    done: true,
    to: "/dashboard/admin",
    roles: [ROLES.ADMIN],
  },
  {
    title: "Catalogue",
    description:
      "Parcourir par ordre alphabétique et rechercher des produits naturels.",
    icon: IoFolderOpenOutline,
    color: "emerald",
    done: true,
    to: "/products",
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Recherche avancée",
    description:
      "Filtrer par grossesse, enfants, allergènes, niveau de preuve.",
    icon: IoSearchOutline,
    color: "purple",
    done: true,
    to: "/dashboard/recherche-avancee",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Niveau de preuve scientifique",
    description: "Consulter les études et la fiabilité des recommandations.",
    icon: IoLibraryOutline,
    color: "indigo",
    done: true,
    to: "/dashboard/preuves",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Interactions",
    description:
      "Vérifier les interactions entre produits naturels et médicaments.",
    icon: IoFlaskOutline,
    color: "amber",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Exports PDF",
    description: "Générer des fiches d'information pour vos patients.",
    icon: IoDocumentTextOutline,
    color: "blue",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Protocoles naturels",
    description: "Créer des recommandations naturelles pour vos patients.",
    icon: IoMedkitOutline,
    color: "teal",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Contribution médicale",
    description: "Proposer des données ou corrections pour enrichir la base.",
    icon: IoPeopleOutline,
    color: "sky",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Veille scientifique",
    description: "Suivre les nouvelles études sur les médecines naturelles.",
    icon: IoPulseOutline,
    color: "green",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
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
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    icon: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800",
  },
  sky: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    icon: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-800",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    icon: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  rose: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    icon: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
  },
};

const WELCOME_TITLES = {
  [ROLES.PATIENT]: (
    <>
      Bienvenue sur votre{" "}
      <span className="text-emerald-600">Espace Particulier</span>
    </>
  ),
  [ROLES.PRO]: (
    <>
      Bienvenue sur votre{" "}
      <span className="text-emerald-600">Espace Professionnel</span>
    </>
  ),
  [ROLES.ADMIN]: (
    <>
      Bienvenue sur votre{" "}
      <span className="text-emerald-600">Espace Administrateur</span>
    </>
  ),
};

export default function Dashboard() {
  const { userEmail, userRole } = useAuth();

  const visibleSections = SECTIONS.filter(
    (section) => !section.roles || section.roles.includes(userRole),
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
          {WELCOME_TITLES[userRole] || "Bienvenue sur Tradimedika"}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Connecté en tant que{" "}
          <span className="font-medium text-emerald-600">{userEmail}</span>
        </p>
      </div>

      {/* Prototype notice — hidden for patient */}
      {userRole !== ROLES.PATIENT && (
        <div className="mb-8 rounded-lg border-2 border-dashed border-amber-400/60 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            Prototype — Les sections ci-dessous sont en cours de développement.
          </p>
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
            Cette interface évoluera en fonction des retours des professionnels
            de santé.
          </p>
        </div>
      )}

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {visibleSections.map((section) => {
          const colors = COLOR_CLASSES[section.color];
          const Icon = section.icon;

          const Wrapper = section.to ? Link : "div";
          const wrapperProps = section.to ? { to: section.to } : {};

          return (
            <Wrapper
              key={section.title}
              {...wrapperProps}
              className={`rounded-xl border-2 ${colors.border} bg-white p-6 dark:bg-neutral-800 ${
                section.done
                  ? "transition-shadow hover:shadow-lg"
                  : "border-dashed opacity-60"
              } ${section.to ? "group block no-underline" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${section.done ? "" : "opacity-60"}`}
                >
                  <Icon className={`text-xl ${colors.icon}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-neutral-800 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {section.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        section.done
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-neutral-200 text-neutral-500 opacity-60 dark:bg-neutral-700 dark:text-neutral-400"
                      }`}
                    >
                      {section.done ? "Disponible" : "Prochainement"}
                    </span>
                    {section.to && (
                      <IoArrowForwardOutline className="text-lg text-neutral-400 transition-transform group-hover:translate-x-1 dark:text-neutral-500" />
                    )}
                  </div>
                </div>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
