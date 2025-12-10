// tradimedika-v1/src/layout/LayoutRemedyResult.jsx
import { Outlet } from "react-router-dom";
import BreadCrumb from "../components/navigation/BreadCrumb";

/**
 * LayoutRemedyResult - Specific layout for remedy results pages
 *
 * This layout wraps /remedies and /remedies/:id pages
 * providing a consistent structure with breadcrumb navigation.
 *
 * Features:
 * - BreadCrumb component for navigation hierarchy
 * - Container with responsive padding
 * - Outlet for nested routes
 */

function LayoutRemedyResult() {
  return (
    <div className="container mx-auto w-full grow px-4 py-8">
      {/* Breadcrumb Navigation */}
      <BreadCrumb />

      {/* Page content */}
      <Outlet />
    </div>
  );
}

export default LayoutRemedyResult;
