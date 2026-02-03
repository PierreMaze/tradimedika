// tradimedika-v1/src/routes/Router.jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import { LoadingFallback } from "../components/ui/animation";
import { AllergiesProvider } from "../features/allergens-search";
import { CookieConsentProvider } from "../features/cookie-consent/context/CookieConsentContext";
import LayoutApp from "../layout/LayoutApp";
import LayoutRemedyResult from "../layout/LayoutRemedyResult";

// Lazy-loaded page components for code-splitting
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const RemedyResult = lazy(() => import("../pages/RemedyResult"));
const RemedyResultDetails = lazy(() => import("../pages/RemedyResultDetails"));
const MentionsLegales = lazy(() => import("../pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(
  () => import("../pages/PolitiqueConfidentialite"),
);
const GestionCookies = lazy(() => import("../pages/GestionCookies"));

/**
 * Router Configuration - React Router v6.30.2 with Data Router API
 *
 * Routes:
 * - / → Home page (Hero component)
 * - /remedes → Remedy results list (nested in LayoutRemedyResult)
 * - /remedes/:slug → Remedy detail page (nested in LayoutRemedyResult)
 * - * → NotFound page (404 error)
 *
 * Layout Structure:
 * - LayoutApp: Global layout (Header + Outlet + Footer) wraps all routes
 * - LayoutRemedyResult: Specific layout for remedy pages (includes BreadCrumb)
 *
 * Performance Optimizations:
 * - Lazy loading: All pages loaded with React.lazy() for code-splitting
 * - Suspense: Each route wrapped with Suspense for loading states
 * - Code splitting: Pages loaded on-demand, reducing initial bundle size
 *
 * Using createBrowserRouter (Data Router API) for:
 * - ScrollRestoration support
 * - React Router v7 compatibility
 * - Better performance and features
 */

const router = createBrowserRouter(
  [
    {
      element: (
        <CookieConsentProvider>
          <AllergiesProvider>
            <GoogleAnalytics />
            <LayoutApp />
          </AllergiesProvider>
        </CookieConsentProvider>
      ),
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
          path: "remedes",
          element: <LayoutRemedyResult />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <RemedyResult />
                </Suspense>
              ),
            },
            {
              path: ":slug",
              element: (
                <Suspense fallback={<LoadingFallback />}>
                  <RemedyResultDetails />
                </Suspense>
              ),
            },
          ],
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
          path: "*",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          ),
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
