// tradimedika-v1/src/layout/LayoutRemedyResult.jsx
import { Outlet } from "react-router-dom";

/**
 * LayoutRemedyResult - Specific layout for remedy results pages
 *
 * Future implementation (Issue #38):
 * - BreadCrumb component will be added above the Outlet
 *
 * This layout wraps /remedies and /remedies/:id pages
 * providing a consistent structure with space for breadcrumb navigation.
 */

function LayoutRemedyResult() {
  return (
    <div className="container mx-auto w-full flex-grow px-4 py-8">
      {/* Future (Issue #38): <BreadCrumb /> component will be placed here */}

      {/* Page content */}
      <Outlet />
    </div>
  );
}

export default LayoutRemedyResult;
