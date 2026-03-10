import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import {
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFlaskOutline,
  IoFolderOpenOutline,
  IoHelpCircleOutline,
  IoLibraryOutline,
  IoLogOutOutline,
  IoMedkitOutline,
  IoPeopleOutline,
  IoPulseOutline,
  IoSearchOutline,
  IoServerOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

import { NavLink, useNavigate } from "react-router-dom";
import { ROLES, useAuth } from "../../features/auth";
import { useSearchHistory } from "../../features/history-search/hooks/useSearchHistory";

const SIDEBAR_COLLAPSED_KEY = "tradimedika-sidebar-collapsed";

const ALL_NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Accueil",
    icon: RiHome4Line,
    end: true,
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/admin",
    label: "Gestion données",
    icon: IoServerOutline,
    badge: "ADMIN",
    roles: [ROLES.ADMIN],
  },
  {
    to: "/products",
    label: "Catalogue",
    icon: IoFolderOpenOutline,
    roles: [ROLES.PATIENT, ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/recherche-avancee",
    label: "Recherche avancée",
    icon: IoSearchOutline,
    badge: "NOUVEAU",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/preuves",
    label: "Niveau de preuve",
    icon: IoLibraryOutline,
    badge: "NOUVEAU",
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/interactions",
    label: "Interactions",
    icon: IoFlaskOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/exports",
    label: "Exports PDF",
    icon: IoDocumentTextOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/protocoles",
    label: "Protocoles",
    icon: IoMedkitOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/favoris",
    label: "Favoris",
    icon: IoStarOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/contribution",
    label: "Contribution",
    icon: IoPeopleOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
  {
    to: "/dashboard/veille",
    label: "Veille scientifique",
    icon: IoPulseOutline,
    disabled: true,
    roles: [ROLES.PRO, ROLES.ADMIN],
  },
];

const ROLE_SIDEBAR_LABELS = {
  [ROLES.PATIENT]: "Espace Patient",
  [ROLES.PRO]: "Espace Pro",
  [ROLES.ADMIN]: "Espace Admin",
};

function SidebarLink({ item, isCollapsed, onNavigate }) {
  const Icon = item.icon;

  if (item.disabled) {
    return (
      <span
        className={`flex cursor-not-allowed items-center rounded-lg px-3 py-2.5 text-sm text-neutral-400 dark:text-neutral-600 ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className="shrink-0 text-lg" />
        {!isCollapsed && (
          <>
            <span>{item.label}</span>
            <span className="ml-auto rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500">
              Bientôt
            </span>
          </>
        )}
      </span>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isCollapsed ? "justify-center" : "gap-3"
        } ${
          isActive
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
        }`
      }
      title={isCollapsed ? item.label : undefined}
    >
      <Icon className="shrink-0 text-lg" />
      {!isCollapsed && (
        <>
          <span>{item.label}</span>
          {item.badge && (
            <span className="ml-auto rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarHistory({ isCollapsed, onNavigate }) {
  const { history, removeSearch, clearHistory } = useSearchHistory();
  const navigate = useNavigate();

  const handleSelect = (search) => {
    const params = new URLSearchParams();
    params.set("products", (search.products ?? []).join(","));
    navigate(`/products?${params.toString()}`);
    onNavigate?.();
  };

  if (isCollapsed) {
    return (
      <div
        className="flex flex-1 flex-col items-center border-t-2 border-dashed border-neutral-200 py-4 dark:border-neutral-700"
        title={`Historique (${history.length})`}
      >
        <div className="relative">
          <IoTimeOutline className="text-lg text-neutral-400 dark:text-neutral-600" />
          {history.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white">
              {history.length}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col border-t-2 border-dashed border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <p className="text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
          Historique
        </p>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="cursor-pointer rounded p-0.5 text-neutral-400 transition-colors hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400"
            title="Effacer l'historique"
          >
            <IoTrashOutline className="text-sm" />
          </button>
        )}
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {history.length === 0 ? (
          <p className="px-1 py-2 text-xs text-neutral-400 dark:text-neutral-500">
            Aucune recherche
          </p>
        ) : (
          history.map((search) => (
            <button
              key={search.id}
              onClick={() => handleSelect(search)}
              className="group flex w-full cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
            >
              <IoTimeOutline className="mt-0.5 shrink-0 text-sm text-neutral-400 dark:text-neutral-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  {(search.products ?? []).join(", ")}
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  {search.resultCount ?? 0} résultat
                  {(search.resultCount ?? 0) > 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSearch(search.id);
                }}
                className="shrink-0 rounded p-0.5 text-neutral-300 opacity-0 transition-all group-hover:opacity-100 hover:text-red-500 dark:text-neutral-600 dark:hover:text-red-400"
                aria-label="Supprimer"
              >
                <IoTrashOutline className="text-xs" />
              </button>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

SidebarHistory.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func,
};

SidebarLink.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    end: PropTypes.bool,
    disabled: PropTypes.bool,
    badge: PropTypes.string,
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func,
};

// eslint-disable-next-line react-refresh/only-export-components -- Hook co-localisé avec son composant
export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
    } catch {
      // ignore
    }
  };

  return {
    isCollapsed,
    isSidebarOpen,
    openSidebar: () => setIsSidebarOpen(true),
    closeSidebar: () => setIsSidebarOpen(false),
    toggleCollapsed,
  };
}

export default function Sidebar({
  isCollapsed,
  isSidebarOpen,
  onClose,
  onToggleCollapsed,
}) {
  const { userEmail, userRole, logout } = useAuth();

  const navItems = useMemo(
    () => ALL_NAV_ITEMS.filter((item) => item.roles.includes(userRole)),
    [userRole],
  );

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar — full height */}
      <aside
        className={`border-dark/80 dark:border-light/60 fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r-2 border-dashed bg-white transition-all duration-200 dark:bg-neutral-800 ${
          isCollapsed ? "lg:w-16" : "lg:w-64"
        } ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar header */}
        <div className="border-dark/80 dark:border-light/60 flex h-20 items-center justify-between border-b-2 border-dashed px-4">
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-800 dark:text-white">
                {ROLE_SIDEBAR_LABELS[userRole] || "Espace"}
              </p>
              <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                {userEmail}
              </p>
            </div>
          )}
          {/* Collapse toggle (desktop) */}
          <button
            onClick={onToggleCollapsed}
            className="hidden cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 lg:block dark:hover:bg-neutral-700"
            aria-label={
              isCollapsed ? "Ouvrir la sidebar" : "Réduire la sidebar"
            }
          >
            {isCollapsed ? (
              <TbLayoutSidebarLeftExpandFilled className="text-xl" />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled className="text-xl" />
            )}
          </button>
          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-700"
            aria-label="Fermer le menu"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <SidebarLink
              key={item.to}
              item={item}
              isCollapsed={isCollapsed}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* History */}
        <SidebarHistory isCollapsed={isCollapsed} onNavigate={onClose} />

        {/* Help + Settings + Logout */}
        <div className="space-y-1 border-t-2 border-dashed border-neutral-300 px-3 py-4 dark:border-neutral-600">
          <SidebarLink
            item={{
              to: "/dashboard/comment-ca-marche",
              label: "Comment ça marche ?",
              icon: IoHelpCircleOutline,
              badge: "NOUVEAU",
            }}
            isCollapsed={isCollapsed}
            onNavigate={onClose}
          />
          <SidebarLink
            item={{
              to: "/dashboard/parametres",
              label: "Paramètres",
              icon: IoSettingsOutline,
            }}
            isCollapsed={isCollapsed}
            onNavigate={onClose}
          />
          <button
            onClick={logout}
            className={`flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
            title={isCollapsed ? "Se déconnecter" : undefined}
          >
            <IoLogOutOutline className="shrink-0 text-lg" />
            {!isCollapsed && <span>Se déconnecter</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleCollapsed: PropTypes.func.isRequired,
};
