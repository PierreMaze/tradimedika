import { useState } from "react";
import { FaDisease, FaHandHoldingMedical, FaRssSquare } from "react-icons/fa";
import {
  IoArrowForwardOutline,
  IoChatbubblesOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFlaskSharp,
  IoFolderOpenOutline,
  IoHelpCircleOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoServerOutline,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineCompareArrows } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ROLES, useAuth } from "../features/auth";

const DASHBOARD_VISITED_KEY = "tradimedika-dashboard-visited";

const SECTIONS = [
  {
    id: "how-it-works",
    title: "Comment ça marche ?",
    description:
      "Découvrez les valeurs, la direction et le fonctionnement de Tradimedika.",
    icon: IoHelpCircleOutline,
    color: "cyan",
    prototype: true,
    done: true,
    to: "/dashboard/comment-ca-marche",
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
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
      "Parcourir et rechercher des produits naturels, avec accès à leurs fiches détaillées.",
    icon: IoFolderOpenOutline,
    color: "emerald",
    done: true,
    prototype: true,
    instable: true,
    to: "/products",
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Recherche avancée",
    description:
      "Filtrer les produits naturelles pour croisée les données (type, propriété, symptômes, niveau de preuve, etc).",
    icon: IoSearchOutline,
    color: "purple",
    done: true,
    prototype: true,
    instable: true,
    to: "/dashboard/recherche-avancee",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Niveau de preuve scientifique",
    description:
      "Consulter les études et la fiabilité des recommandations de chaque produits naturelles de la BDD (sourcée).",
    icon: PiBooksFill,
    color: "indigo",
    done: true,
    prototype: true,
    instable: true,
    to: "/dashboard/preuves",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Interactions médicamenteuses",
    description:
      "Vérifier les interactions entre produits naturels et médicaments.",
    icon: MdOutlineCompareArrows,
    color: "amber",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Recherche par pathogène",
    description:
      "Rechercher des produits naturels spécifiques pour un pathogène donné.",
    icon: FaDisease,
    color: "lime",
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
    title: "Favoris",
    description: "Sauvegarder et organiser vos produits favoris.",
    icon: IoStarOutline,
    color: "amber",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },

  {
    title: "Protocoles naturels",
    description: "Créer des recommandations naturelles pour vos patients.",
    icon: FaHandHoldingMedical,
    color: "teal",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Historique de recherche",
    description:
      "Consulter l'historique de vos recherches et consultations (catalogue, fiches produits, recherche avancée, niveaux de preuve).",
    icon: IoTimeOutline,
    color: "purple",
    done: false,
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Veille médicale",
    description:
      "Suivre les nouvelles études sur les médecines naturelles avec un flux RSS personnalisé.",
    icon: FaRssSquare,
    color: "cyan",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Espace scientifique",
    description:
      "Espace dédié au professionnel de santé pour accéder aux fiches scientifiques détaillées et publications pour chaque produit naturel.",
    icon: IoFlaskSharp,
    color: "indigo",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    title: "Espace patient simplifié",
    description:
      "Interface adaptée et sécurisée (RGPD) pour les patients avec fonctionnalités essentielles.",
    icon: IoPersonOutline,
    color: "green",
    done: false,
    roles: [ROLES.PRO, ROLES.PATIENT],
  },

  {
    title: "Contribution scientifique",
    description:
      "Proposer des corrections et enrichissements de la base de données.",
    icon: IoPeopleOutline,
    color: "sky",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },

  {
    title: "Forum médical",
    description:
      "Échanger avec d'autres professionnels sur les produits naturels, interactions et retours d'expérience.",
    icon: IoChatbubblesOutline,
    color: "blue",
    done: false,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
];

const COLOR_CLASSES = {
  cyan: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    icon: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800",
  },
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
  lime: {
    bg: "bg-lime-100 dark:bg-lime-900/30",
    icon: "text-lime-600 dark:text-lime-400",
    border: "border-lime-200 dark:border-lime-800",
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
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem(DASHBOARD_VISITED_KEY),
  );

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem(DASHBOARD_VISITED_KEY, "true");
  };

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

      {/* Onboarding tooltip — first visit only */}
      {showOnboarding && (
        <div className="mb-6 flex flex-col gap-3 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 lg:flex-row lg:items-start lg:justify-between dark:border-emerald-700 dark:bg-emerald-900/20">
          <div className="inline-flex items-center gap-2">
            <IoHelpCircleOutline className="shrink-0 text-xl text-emerald-700 dark:text-emerald-400" />
            <p className="flex-1 text-sm font-medium text-emerald-800 dark:text-emerald-300">
              Nouveau sur Tradimedika ? Consultez la section{" "}
              <Link
                to="/dashboard/comment-ca-marche"
                className="font-semibold text-emerald-600 underline decoration-2 underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-200"
              >
                Comment ça marche ?
              </Link>{" "}
              pour bien démarrer !
            </p>
          </div>
          <div className="ml-6 flex items-center gap-2">
            <button
              onClick={dismissOnboarding}
              className="shrink-0 cursor-pointer rounded-md bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-200 dark:text-emerald-800 dark:hover:bg-emerald-800/80"
            >
              Compris
            </button>
            <button
              onClick={dismissOnboarding}
              className="shrink-0 cursor-pointer rounded p-0.5 text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              aria-label="Fermer"
            >
              <IoCloseOutline className="text-lg" />
            </button>
          </div>
        </div>
      )}

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
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                          section.done
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-neutral-200 text-neutral-500 opacity-60 dark:bg-neutral-700 dark:text-neutral-400"
                        }`}
                      >
                        {section.done ? "Disponible" : "Prochainement"}
                      </span>
                      {section.prototype && (
                        <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Prototype
                        </span>
                      )}
                      {section.instable && (
                        <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-200">
                          Instable
                        </span>
                      )}
                    </div>
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
