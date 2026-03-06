// tradimedika/src/layout/LayoutProductResult.jsx
import { Outlet } from "react-router-dom";
import BreadCrumb from "../components/navigation/BreadCrumb";

/**
 * LayoutProductResult - Specific layout for product results pages
 *
 * This layout wraps /products and /products/:slug pages
 * providing a consistent structure with breadcrumb navigation.
 */

function LayoutProductResult() {
  return (
    <div className="container mx-auto w-full grow px-4 py-8">
      {/* Breadcrumb Navigation */}
      <BreadCrumb />

      {/* Page content */}
      <Outlet />
    </div>
  );
}

export default LayoutProductResult;
