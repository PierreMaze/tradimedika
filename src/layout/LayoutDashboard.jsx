import { IoMenuOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { useAuth, ROLES } from "../features/auth";
import { CookieConsentProvider } from "../features/cookie-consent/context/CookieConsentContext";
import { SettingsModalProvider } from "../features/settings";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar, { useSidebar } from "./components/Sidebar";

const ROLE_HEADER_LABELS = {
  [ROLES.PATIENT]: "Tradimedika",
  [ROLES.PRO]: "Tradimedika Pro",
  [ROLES.ADMIN]: "Tradimedika Admin",
};

export default function LayoutDashboard() {
  const { userRole } = useAuth();
  const {
    isCollapsed,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleCollapsed,
  } = useSidebar();

  return (
    <CookieConsentProvider>
      <SettingsModalProvider>
        <div className="bg-light dark:bg-dark flex min-h-screen">
          <Sidebar
            isCollapsed={isCollapsed}
            isSidebarOpen={isSidebarOpen}
            onClose={closeSidebar}
            onToggleCollapsed={toggleCollapsed}
          />

          {/* Main content — offset by sidebar width */}
          <div
            className={`flex min-h-screen flex-1 flex-col transition-all duration-200 ${
              isCollapsed ? "lg:ml-16" : "lg:ml-64"
            }`}
          >
            <Header sticky fullWidth />

            {/* Mobile header bar — sticky sous le Header */}
            <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 lg:hidden dark:border-neutral-700 dark:bg-neutral-800">
              <button
                onClick={openSidebar}
                className="cursor-pointer rounded-lg p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                aria-label="Ouvrir le menu"
              >
                <IoMenuOutline className="text-xl" />
              </button>
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {ROLE_HEADER_LABELS[userRole] || "Tradimedika"}
              </span>
            </div>

            {/* Page content */}
            <main className="flex-1 p-6 lg:p-8">
              <Outlet />
            </main>

            <Footer fullWidth />
          </div>
        </div>
      </SettingsModalProvider>
    </CookieConsentProvider>
  );
}
