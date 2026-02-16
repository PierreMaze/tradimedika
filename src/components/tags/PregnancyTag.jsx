// tradimedika-v1/src/components/tag/PregnancyTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Tooltip } from "../ui/tooltip";

/**
 * PregnancyTag Component
 *
 * Tag indiquant la compatibilité d'un produit naturel avec la grossesse.
 * Affiche 3 variantes selon la valeur de pregnancySafe :
 * - "ok" (vert) : produit naturel compatible avec la grossesse
 * - "variant" (ambre) : Données insuffisantes ou usage conditionnel
 * - "interdit" (rouge) : produit naturel contre-indiqué pendant la grossesse
 *
 * Props:
 * - variant: 'ok' | 'variant' | 'interdit' (REQUIS)
 * - className: Classes CSS additionnelles
 * - showLabel: Afficher le texte (défaut: true)
 */

const VARIANT_CONFIG = {
  ok: {
    label: "Lorem",
    colorClasses:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    tooltipContent: (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptate
        </p>
      </>
    ),
    Icon: IoMdCheckmarkCircleOutline,
  },
  variant: {
    label: "Lorem",
    colorClasses:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    tooltipContent: (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptatem
        </p>
      </>
    ),
    Icon: FiInfo,
  },
  interdit: {
    label: "Lorem",
    colorClasses: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-50",
    tooltipContent: (
      <>
        <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
          Lorem
        </h3>
        <p className="text-sm text-neutral-900 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit possimus
          repellendus tempora voluptatem
        </p>
      </>
    ),
    Icon: IoCloseCircleOutline,
  },
};

function PregnancyTag({ variant, className = "", showLabel = true }) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;

  return (
    <Tooltip content={config.tooltipContent} placement="top" hoverDelay={200}>
      <span
        data-testid="pregnancy-tag"
        className={`transition-color inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold duration-150 lg:text-sm 2xl:text-base ${config.colorClasses} ${className}`}
      >
        <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        {showLabel && config.label}
      </span>
    </Tooltip>
  );
}

PregnancyTag.propTypes = {
  variant: PropTypes.oneOf(["ok", "variant", "interdit"]).isRequired,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default PregnancyTag;
