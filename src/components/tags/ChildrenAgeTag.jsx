// tradimedika-v1/src/components/tag/ChildrenAgeTag.jsx

import { MdOutlineChildCare } from "react-icons/md";
import PropTypes from "prop-types";

/**
 * ChildrenAgeTag Component
 *
 * Tag indiquant l'âge minimum recommandé pour les enfants.
 * Utilise MdOutlineChildCare de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - age: Âge minimum en années (requis)
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Enfants X+ ans" (défaut: true)
 */

function ChildrenAgeTag({
  age,
  className = "",
  size = "sm",
  showLabel = true,
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800 transition duration-300 lg:text-sm dark:bg-blue-900 dark:text-blue-200 ${className}`}
      title={`Ce remède est adapté aux enfants à partir de ${age} ans`}
    >
      <MdOutlineChildCare className={sizeClasses[size]} aria-hidden="true" />
      {showLabel && `Enfants +${age} ans`}
    </span>
  );
}

ChildrenAgeTag.propTypes = {
  age: PropTypes.number.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default ChildrenAgeTag;
