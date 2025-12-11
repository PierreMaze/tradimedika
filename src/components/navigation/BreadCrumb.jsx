// tradimedika-v1/src/components/navigation/BreadCrumb.jsx
import PropTypes from "prop-types";
import { IoChevronForward } from "react-icons/io5";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { LINK_INTERNAL_STYLES } from "../../constants/linkStyles";
import db from "../../data/db.json";
import { getRemedyBySlug } from "../../utils/remedyMatcher";

/**
 * BreadCrumb Component - Navigation breadcrumb trail
 *
 * Displays a dynamic breadcrumb navigation based on the current route.
 * Provides clear visual hierarchy and clickable links to parent pages.
 *
 * Hierarchy:
 * - / → "Accueil"
 * - /remedies → "Accueil > Remèdes"
 * - /remedies/:slug → "Accueil > Remèdes > [Nom du remède]"
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
 * @param {string} segment - URL segment (e.g., "remedies", "citron")
 * @param {boolean} isSlug - Whether segment is a remedy slug
 * @param {string|null} remedyName - Name of the remedy if found
 * @returns {string} Human-readable label
 */
const segmentToLabel = (segment, isSlug = false, remedyName = null) => {
  if (isSlug && remedyName) {
    return remedyName; // Affiche "Citron" au lieu de "citron"
  }

  const labels = {
    remedes: "Remèdes",
  };

  return labels[segment] || segment;
};

/**
 * Build breadcrumb path array from current location
 * @param {string} pathname - Current URL pathname
 * @param {Object} params - URL parameters from useParams()
 * @param {string|null} remedyName - Name of the remedy if on detail page
 * @returns {Array} Array of {label, path} objects
 */
const buildBreadcrumbPath = (pathname, params, remedyName = null) => {
  const breadcrumbs = [{ label: "Accueil", path: "/" }];

  // Remove leading/trailing slashes and split
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  // Build cumulative path
  let currentPath = "";

  segments.forEach((segment) => {
    if (!segment) return; // Skip empty segments

    currentPath += `/${segment}`;
    const isSlug = params.slug && segment === params.slug;

    breadcrumbs.push({
      label: segmentToLabel(segment, isSlug, remedyName),
      path: currentPath,
    });
  });

  return breadcrumbs;
};

/**
 * BreadcrumbItem - Individual breadcrumb link or text
 */
function BreadcrumbItem({ item, isLast, selectedSymptoms }) {
  return (
    <li className="flex items-center gap-2">
      {!isLast ? (
        <>
          <NavLink
            to={item.path}
            state={
              item.path === "/remedes" && selectedSymptoms.length > 0
                ? { symptoms: selectedSymptoms }
                : undefined
            }
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
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * BreadCrumb - Main breadcrumb navigation component
 */
function BreadCrumb() {
  const location = useLocation();
  const params = useParams();
  const selectedSymptoms = location.state?.symptoms || [];

  // Récupérer le remède si on est sur une page de détail
  const remedy = params.slug ? getRemedyBySlug(params.slug, db) : null;

  // Build breadcrumb path from current route
  const pathSegments = buildBreadcrumbPath(
    location.pathname,
    params,
    remedy?.name,
  );

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
            selectedSymptoms={selectedSymptoms}
          />
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
