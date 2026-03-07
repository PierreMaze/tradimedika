// tradimedika/src/routes/Router.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import { LoadingFallback } from "../components/ui/animation";
import { AllergiesProvider } from "../features/allergens-search";
import { ProtectedRoute, useAuth, ROLES } from "../features/auth";
import { CookieConsentProvider } from "../features/cookie-consent/context/CookieConsentContext";
import LayoutApp from "../layout/LayoutApp";
import LayoutDashboard from "../layout/LayoutDashboard";
import LayoutProductResult from "../layout/LayoutProductResult";

// Lazy-loaded page components for code-splitting
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductResult = lazy(
  () => import("../features/product-result-page/pages/ProductResult"),
);
const ProductResultDetails = lazy(
  () =>
    import("../features/product-result-detail-page/pages/ProductResultDetails"),
);
const EmergencyAlert = lazy(
  () => import("../features/legal/pages/EmergencyAlert"),
);
const MentionsLegales = lazy(
  () => import("../features/legal/pages/MentionsLegales"),
);
const PolitiqueConfidentialite = lazy(
  () => import("../features/legal/pages/PolitiqueConfidentialite"),
);
const GestionCookies = lazy(
  () => import("../features/legal/pages/GestionCookies"),
);
const LoginPage = lazy(() => import("../features/auth/components/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProfilPage = lazy(() => import("../features/auth/pages/ProfilPage"));
const SettingsPage = lazy(
  () => import("../features/settings/pages/SettingsPage"),
);
const AdminDashboard = lazy(
  () => import("../features/admin/pages/AdminDashboard"),
);
const EvidenceLevelPage = lazy(
  () => import("../features/evidence-level/pages/EvidenceLevelPage"),
);
const AdvancedSearchPage = lazy(() =>
  import("../features/advanced-search").then((module) => ({
    default: module.AdvancedSearchPage,
  })),
);
const HowItWorksPage = lazy(() =>
  import("../features/onboarding").then((module) => ({
    default: module.HowItWorksPage,
  })),
);

const LeafFall = lazy(() =>
  import("../components/ui/animation").then((module) => ({
    default: module.LeafFall,
  })),
);

/**
 * RootLayout - Global providers wrapper for all routes
 * LeafFall est monté ici (une seule fois) pour persister à travers toutes les navigations
 */
// eslint-disable-next-line react-refresh/only-export-components -- Layout interne utilisé uniquement dans le router
function RootLayout() {
  const [showLeafFall, setShowLeafFall] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLeafFall(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CookieConsentProvider>
      <AllergiesProvider>
        <GoogleAnalytics />
        <div className="bg-light dark:bg-dark relative min-h-screen transition-colors duration-150 ease-out">
          {showLeafFall && (
            <Suspense fallback={null}>
              <LeafFall />
            </Suspense>
          )}
          <div className="relative z-10 min-h-screen">
            <Outlet />
          </div>
        </div>
      </AllergiesProvider>
    </CookieConsentProvider>
  );
}

/**
 * ProductLayoutSwitch - Conditional layout for product pages
 * Renders LayoutDashboard (with sidebar) when authenticated,
 * LayoutApp (public layout) when not.
 */
// eslint-disable-next-line react-refresh/only-export-components -- Layout interne utilisé uniquement dans le router
function ProductLayoutSwitch() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <LayoutDashboard /> : <LayoutApp />;
}

/**
 * Router Configuration - React Router v6.30.2 with Data Router API
 *
 * Routes:
 * - / → Home page (Hero component, redirects to /dashboard if authenticated)
 * - /products → Product results list (conditional layout: sidebar if auth'd)
 * - /products/:slug → Product detail page (conditional layout: sidebar if auth'd)
 * - /urgence → Emergency alert page
 * - /login → Login page (pro authentication)
 * - /dashboard → Dashboard (protected, requires auth)
 * - /dashboard/profil → Profile page (protected)
 * - /dashboard/parametres → Settings page (protected)
 * - /dashboard/admin → Admin CRUD page (protected, admin only)
 * - * → NotFound page (404 error)
 *
 * Role-based access:
 * - patient: Dashboard + Catalogue only
 * - pro: All features
 * - admin: All features + admin CRUD
 */

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          element: <LayoutApp />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: "mentions-legales",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <MentionsLegales />
                </Suspense>
              ),
            },
            {
              path: "politique-confidentialite",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <PolitiqueConfidentialite />
                </Suspense>
              ),
            },
            {
              path: "gestion-cookies",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <GestionCookies />
                </Suspense>
              ),
            },
            {
              path: "urgence",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <EmergencyAlert />
                </Suspense>
              ),
            },
            {
              path: "login",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <LoginPage />
                </Suspense>
              ),
            },
            {
              path: "*",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <NotFound />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "products",
          element: <ProductLayoutSwitch />,
          children: [
            {
              element: <LayoutProductResult />,
              children: [
                {
                  index: true,
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <ProductResult />
                    </Suspense>
                  ),
                },
                {
                  path: ":slug",
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <ProductResultDetails />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "dashboard",
          element: <ProtectedRoute />,
          children: [
            {
              element: <LayoutDashboard />,
              children: [
                {
                  index: true,
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <Dashboard />
                    </Suspense>
                  ),
                },
                {
                  path: "profil",
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <ProfilPage />
                    </Suspense>
                  ),
                },
                {
                  path: "parametres",
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <SettingsPage />
                    </Suspense>
                  ),
                },
                {
                  path: "comment-ca-marche",
                  element: (
                    <Suspense fallback={<LoadingFallback />}>
                      <HowItWorksPage />
                    </Suspense>
                  ),
                },
                {
                  path: "admin",
                  element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<LoadingFallback />}>
                          <AdminDashboard />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "recherche-avancee",
                  element: (
                    <ProtectedRoute allowedRoles={[ROLES.PRO, ROLES.ADMIN]} />
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<LoadingFallback />}>
                          <AdvancedSearchPage />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "preuves",
                  element: (
                    <ProtectedRoute allowedRoles={[ROLES.PRO, ROLES.ADMIN]} />
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<LoadingFallback />}>
                          <EvidenceLevelPage />
                        </Suspense>
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
);

export default router;
