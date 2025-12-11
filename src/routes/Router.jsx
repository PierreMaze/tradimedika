// tradimedika-v1/src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../layout/LayoutApp";
import LayoutRemedyResult from "../layout/LayoutRemedyResult";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RemedyResult from "../pages/RemedyResult";
import RemedyResultDetails from "../pages/RemedyResultDetails";

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
 * Using createBrowserRouter (Data Router API) for:
 * - ScrollRestoration support
 * - React Router v7 compatibility
 * - Better performance and features
 */

const router = createBrowserRouter(
  [
    {
      element: <LayoutApp />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "remedes",
          element: <LayoutRemedyResult />,
          children: [
            {
              index: true,
              element: <RemedyResult />,
            },
            {
              path: ":slug",
              element: <RemedyResultDetails />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
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
