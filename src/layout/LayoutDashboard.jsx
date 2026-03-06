import PropTypes from "prop-types";
import { useState } from "react";
import {
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFolderOpenOutline,
  IoGridOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoSettingsOutline,
  IoStarOutline,
} from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: IoGridOutline,
    end: true,
  },
  {
    to: "/dashboard/catalogue",
    label: "Catalogue",
    icon: IoFolderOpenOutline,
    disabled: true,
  },
  {
    to: "/dashboard/favoris",
    label: "Favoris",
    icon: IoStarOutline,
    disabled: true,
  },
  {
    to: "/dashboard/exports",
    label: "Exports PDF",
    icon: IoDocumentTextOutline,
    disabled: true,
  },
  {
    to: "/dashboard/parametres",
    label: "Paramètres",
    icon: IoSettingsOutline,
    disabled: true,
  },
];

function SidebarLink({ item }) {
  const Icon = item.icon;

  if (item.disabled) {
    return (
      <span className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 dark:text-neutral-600">
        <Icon className="text-lg" />
        <span>{item.label}</span>
        <span className="ml-auto rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500">
          Bientôt
        </span>
      </span>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
        }`
      }
    >
      <Icon className="text-lg" />
      <span>{item.label}</span>
    </NavLink>
  );
}

SidebarLink.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    end: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
};

export default function LayoutDashboard() {
  const { userEmail, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-20 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:relative lg:top-0 lg:z-auto lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 dark:border-neutral-700">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-800 dark:text-white">
              Espace Pro
            </p>
            <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
              {userEmail}
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-700"
            aria-label="Fermer le menu"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-200 px-3 py-4 dark:border-neutral-700">
          <button
            onClick={logout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <IoLogOutOutline className="text-lg" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header bar */}
        <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 lg:hidden dark:border-neutral-700">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
            aria-label="Ouvrir le menu"
          >
            <IoMenuOutline className="text-xl" />
          </button>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Tradimedika Pro
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
