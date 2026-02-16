// tradimedika-v1/src/components/tag/ChildrenAgeTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tooltip } from "../ui/tooltip";

/**
 * ChildrenAgeTag Component
 *
 * Tag indiquant la compatibilité d&apos;un produit naturel avec les enfants.
 * Affiche 2 variantes selon la valeur de age :
 * - age: null → Vert (OK pour tous les enfants, pas de limite d&apos;âge) - Icône check
 * - age: number → Teal (Limite d&apos;âge, affiche "Enfants +X ans") - Icône alerte
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
  let tooltipContent;
  let Icon;

  if (isAdultOnly) {
    colorClasses = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-white";
    label = "Lorem";
    tooltipContent = (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptatem
        </p>
      </>
    );
    Icon = IoCloseCircleOutline;
  } else if (isAllAges) {
    colorClasses =
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    label = "Lorem";
    tooltipContent = (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptatem
        </p>
      </>
    );
    Icon = IoMdCheckmarkCircleOutline;
  } else if (hasLimit) {
    colorClasses =
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    label = `Lorem`;
    tooltipContent = (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptatem
        </p>
      </>
    );
    Icon = FiInfo;
  } else {
    // garde-fou : donnée incohérente
    return null;
  }

  return (
    <Tooltip content={tooltipContent} placement="top" hoverDelay={200}>
      <span
        data-testid="children-tag"
        className={`transition-color inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold duration-150 lg:text-sm 2xl:text-base ${colorClasses} ${className}`}
      >
        <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        {showLabel && label}
      </span>
    </Tooltip>
  );
}

ChildrenAgeTag.propTypes = {
  age: PropTypes.number,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ChildrenAgeTag;
