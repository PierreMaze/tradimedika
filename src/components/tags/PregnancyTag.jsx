// tradimedika-v1/src/components/tag/PregnancyTag.jsx

import PropTypes from "prop-types";
import { BiSolidShieldPlus } from "react-icons/bi";
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
  showLabel = true,
}) {
  const label = variant === "ok" ? "Grossesse OK" : "Grossesse";

  return (
    <span
      data-testid="pregnancy-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-green-900 dark:text-green-200 ${className}`}
      title="Il est envisageable d'utiliser ce remède sans danger pendant la grossesse."
    >
      <BiSolidShieldPlus className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      {showLabel && label}
    </span>
  );
}

PregnancyTag.propTypes = {
  variant: PropTypes.oneOf(["default", "ok"]),
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default PregnancyTag;
