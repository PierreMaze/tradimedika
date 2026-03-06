// tradimedika/src/components/navigation/BreadCrumb.jsx
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { IoChevronForward } from "react-icons/io5";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { LINK_INTERNAL_STYLES } from "../../constants/linkStyles";
import db from "../../data/db.json";
import { getProductBySlug } from "../../features/product-result-page";
import { formatBreadcrumbLabel } from "./utils/formatBreadcrumbLabel";

/**
 * BreadCrumb Component - Navigation breadcrumb trail
 */

const segmentToLabel = (segment, isSlug = false, productName = null) => {
  if (isSlug && productName) {
    return productName;
  }

  const labels = {
    products: "Catalogue",
  };

  if (labels[segment]) {
    return labels[segment];
  }

  return formatBreadcrumbLabel(segment);
};

const buildBreadcrumbPath = (pathname, params, productName = null) => {
  const breadcrumbs = [{ label: "Accueil", path: "/" }];

  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  let currentPath = "";

  segments.forEach((segment) => {
    if (!segment) return;

    currentPath += `/${segment}`;
    const isSlug = params.slug && segment === params.slug;

    breadcrumbs.push({
      label: segmentToLabel(segment, isSlug, productName),
      path: currentPath,
    });
  });

  return breadcrumbs;
};

function BreadcrumbItem({ item, isLast, selectedProducts }) {
  return (
    <li className="flex items-center gap-2">
      {!isLast ? (
        <>
          <NavLink
            to={item.path}
            state={
              item.path === "/products" && selectedProducts.length > 0
                ? { products: selectedProducts }
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
  selectedProducts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function BreadCrumb() {
  const location = useLocation();
  const params = useParams();
  const selectedProducts = location.state?.products || [];

  const product = params.slug ? getProductBySlug(params.slug, db) : null;

  const pathSegments = buildBreadcrumbPath(
    location.pathname,
    params,
    product?.name,
  );

  const breadcrumbSchema = useMemo(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://tradimedika.com";

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: segment.label,
        item: `${baseUrl}${segment.path}`,
      })),
    };
  }, [pathSegments]);

  if (pathSegments.length <= 1) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav aria-label="Fil d'Ariane" className="mb-6 w-full">
        <ol className="flex items-center gap-2 text-xs sm:text-sm">
          {pathSegments.map((item, index) => (
            <BreadcrumbItem
              key={item.path}
              item={item}
              isLast={index === pathSegments.length - 1}
              selectedProducts={selectedProducts}
            />
          ))}
        </ol>
      </nav>
    </>
  );
}

export default BreadCrumb;
