// tradimedika-v1/src/components/navigation/BreadCrumb.jsx
import PropTypes from "prop-types";
import { IoChevronForward } from "react-icons/io5";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { LINK_INTERNAL_STYLES } from "../../constants/linkStyles";

/**
 * BreadCrumb Component - Navigation breadcrumb trail
 *
 * Displays a dynamic breadcrumb navigation based on the current route.
 * Provides clear visual hierarchy and clickable links to parent pages.
 *
 * Hierarchy:
 * - / → "Accueil"
 * - /remedies → "Accueil > Remèdes"
 * - /remedies/:id → "Accueil > Remèdes > Remède #X"
 *
 * Features:
 * - Dynamic path generation using useLocation()
 * - Clickable links with NavLink (except last segment)
 * - Responsive mobile-first design
 * - Dark mode support
 * - ARIA accessible
 */

/**
 * Convert URL segment to readable label
 * @param {string} segment - URL segment (e.g., "remedies", "5")
 * @param {boolean} isId - Whether segment is a dynamic ID
 * @returns {string} Human-readable label
 */
const segmentToLabel = (segment, isId = false) => {
  if (isId) {
    return `Remède #${segment}`;
  }

  const labels = {
    remedies: "Remèdes",
  };

  return labels[segment] || segment;
};

/**
 * Build breadcrumb path array from current location
 * @param {string} pathname - Current URL pathname
 * @param {Object} params - URL parameters from useParams()
 * @returns {Array} Array of {label, path} objects
 */
const buildBreadcrumbPath = (pathname, params) => {
  const breadcrumbs = [{ label: "Accueil", path: "/" }];

  // Remove leading/trailing slashes and split
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  // Build cumulative path
  let currentPath = "";

  segments.forEach((segment) => {
    if (!segment) return; // Skip empty segments

    currentPath += `/${segment}`;
    const isId = params.id && segment === params.id;

    breadcrumbs.push({
      label: segmentToLabel(segment, isId),
      path: currentPath,
    });
  });

  return breadcrumbs;
};

/**
 * BreadcrumbItem - Individual breadcrumb link or text
 */
function BreadcrumbItem({ item, isLast }) {
  return (
    <li className="flex items-center gap-2">
      {!isLast ? (
        <>
          <NavLink
            to={item.path}
            className={LINK_INTERNAL_STYLES}
            aria-label={`Naviguer vers ${item.label}`}
          >
            {item.label}
          </NavLink>
          <IoChevronForward className="text-xs text-neutral-400 dark:text-neutral-600" />
        </>
      ) : (
        <span
          className="font-medium text-neutral-600 dark:text-neutral-400"
          aria-current="page"
        >
          {item.label}
        </span>
      )}
    </li>
  );
}

BreadcrumbItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
};

/**
 * BreadCrumb - Main breadcrumb navigation component
 */
function BreadCrumb() {
  const location = useLocation();
  const params = useParams();

  // Build breadcrumb path from current route
  const pathSegments = buildBreadcrumbPath(location.pathname, params);

  // Don't show breadcrumb on home page (only one segment)
  if (pathSegments.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6 w-full">
      <ol className="flex items-center gap-2 text-xs sm:text-sm">
        {pathSegments.map((item, index) => (
          <BreadcrumbItem
            key={item.path}
            item={item}
            isLast={index === pathSegments.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
