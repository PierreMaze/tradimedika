// tradimedika/src/routes/Router.jsx
import { lazy, Suspense } from "react";
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
const ProductResult = lazy(() => import("../pages/ProductResult"));
const ProductResultDetails = lazy(
  () => import("../pages/ProductResultDetails"),
);
const EmergencyAlert = lazy(() => import("../pages/EmergencyAlert"));
const MentionsLegales = lazy(() => import("../pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(
  () => import("../pages/PolitiqueConfidentialite"),
);
const GestionCookies = lazy(() => import("../pages/GestionCookies"));
const LoginPage = lazy(() => import("../features/auth/components/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ProfilPage = lazy(() => import("../pages/ProfilPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

/**
 * RootLayout - Global providers wrapper for all routes
 */
// eslint-disable-next-line react-refresh/only-export-components -- Layout interne utilisé uniquement dans le router
function RootLayout() {
  return (
    <CookieConsentProvider>
      <AllergiesProvider>
        <GoogleAnalytics />
        <Outlet />
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
