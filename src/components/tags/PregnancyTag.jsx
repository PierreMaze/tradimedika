// tradimedika-v1/src/components/tag/PregnancyTag.jsx

import { HiCheckBadge } from "react-icons/hi2";
import PropTypes from "prop-types";

/**
 * PregnancyTag Component
 *
 * Tag indiquant qu'un remède est sûr pendant la grossesse.
 * Utilise HiCheckBadge de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - variant: 'default' = "Grossesse", 'ok' = "Grossesse OK"
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte (défaut: true)
 */

function PregnancyTag({
  variant = "default",
  className = "",
  size = "sm",
  showLabel = true,
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  const label = variant === "ok" ? "Grossesse OK" : "Grossesse";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800 transition duration-300 lg:text-sm dark:bg-lime-900 dark:text-lime-200 ${className}`}
      title="Ce remède peut être utilisé sans danger pendant la grossesse"
    >
      <HiCheckBadge className={sizeClasses[size]} aria-hidden="true" />
      {showLabel && label}
    </span>
  );
}

PregnancyTag.propTypes = {
  variant: PropTypes.oneOf(["default", "ok"]),
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default PregnancyTag;
