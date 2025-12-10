// tradimedika-v1/src/routes/Router.jsx
import { Route, Routes } from "react-router-dom";
import LayoutApp from "../layout/LayoutApp";
import LayoutRemedyResult from "../layout/LayoutRemedyResult";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RemedyResult from "../pages/RemedyResult";
import RemedyResultDetails from "../pages/RemedyResultDetails";

/**
 * Router Configuration - React Router v6.30.2
 *
 * Routes:
 * - / → Home page (Hero component)
 * - /remedies → Remedy results list (nested in LayoutRemedyResult)
 * - /remedies/:id → Remedy detail page (nested in LayoutRemedyResult)
 * - * → NotFound page (404 error)
 *
 * Layout Structure:
 * - LayoutApp: Global layout (Header + Outlet + Footer) wraps all routes
 * - LayoutRemedyResult: Specific layout for remedy pages (future: BreadCrumb)
 */

function Router() {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route index element={<Home />} />
        <Route path="remedies" element={<LayoutRemedyResult />}>
          <Route index element={<RemedyResult />} />
          <Route path=":id" element={<RemedyResultDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
