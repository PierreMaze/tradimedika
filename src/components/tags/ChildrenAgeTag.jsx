// tradimedika-v1/src/components/tag/ChildrenAgeTag.jsx

import PropTypes from "prop-types";
import { TbMoodKidFilled } from "react-icons/tb";

/**
 * ChildrenAgeTag Component
 *
 * Tag indiquant l'âge minimum recommandé pour les enfants.
 * Utilise BiSolidShieldPlus de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - age: Âge minimum en années (requis)
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Enfants X+ ans" (défaut: true)
 */

function ChildrenAgeTag({ age, className = "", showLabel = true }) {
  return (
    <span
      data-testid="children-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-teal-900 dark:text-teal-200 ${className}`}
      title={`Ce remède est strictement adapté aux enfants de plus de ${age} ans`}
    >
      <TbMoodKidFilled className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
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
