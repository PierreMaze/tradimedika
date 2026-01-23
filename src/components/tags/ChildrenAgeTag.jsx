// tradimedika-v1/src/components/tag/ChildrenAgeTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

/**
 * ChildrenAgeTag Component
 *
 * Tag indiquant la compatibilité d'un remède avec les enfants.
 * Affiche 2 variantes selon la valeur de age :
 * - age: null → Vert (OK pour tous les enfants, pas de limite d'âge) - Icône check
 * - age: number → Teal (Limite d'âge, affiche "Enfants +X ans") - Icône alerte
 *
 * Props:
 * - age: Âge minimum en années (peut être null)
 * - className: Classes CSS additionnelles
 * - showLabel: Afficher le texte (défaut: true)
 */

function ChildrenAgeTag({ age, className = "", showLabel = true }) {
  const isAdultOnly = age >= 18;
  const isAllAges = age === null || age === 0;
  const hasLimit = typeof age === "number" && age > 0;

  let colorClasses;
  let label;
  let tooltip;
  let Icon;

  if (isAdultOnly) {
    colorClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-white";
    label = "Adultes uniquement";
    tooltip =
      "Ce remède est réservé à l’adulte et ne doit pas être utilisé chez l’enfant.";
    Icon = IoCloseCircleOutline;
  } else if (isAllAges) {
    colorClasses =
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    label = "Tout public";
    tooltip =
      "Ce remède peut être utilisé chez l’enfant sans limite d’âge, dans le respect des doses recommandées.";
    Icon = IoMdCheckmarkCircleOutline;
  } else if (hasLimit) {
    colorClasses =
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    label = `Enfants +${age} ans`;
    tooltip = `Ce remède peut être utilisé chez l’enfant à partir de ${age} ans, dans le respect des doses recommandées.`;
    Icon = FiInfo;
  } else {
    // garde-fou : donnée incohérente
    return null;
  }

  return (
    <span
      data-testid="children-tag"
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition duration-300 lg:text-sm 2xl:text-base ${colorClasses} ${className}`}
      title={tooltip}
    >
      <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      {showLabel && label}
    </span>
  );
}

ChildrenAgeTag.propTypes = {
  age: PropTypes.number,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ChildrenAgeTag;
