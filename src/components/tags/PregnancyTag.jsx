// tradimedika-v1/src/components/tag/PregnancyTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

/**
 * PregnancyTag Component
 *
 * Tag indiquant la compatibilité d'un remède avec la grossesse.
 * Affiche 3 variantes selon la valeur de pregnancySafe :
 * - "ok" (vert) : Remède compatible avec la grossesse
 * - "variant" (ambre) : Données insuffisantes ou usage conditionnel
 * - "interdit" (rouge) : Remède contre-indiqué pendant la grossesse
 *
 * Props:
 * - variant: 'ok' | 'variant' | 'interdit' (REQUIS)
 * - className: Classes CSS additionnelles
 * - showLabel: Afficher le texte (défaut: true)
 */

const VARIANT_CONFIG = {
  ok: {
    label: "Grossesse",
    colorClasses:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    tooltip:
      "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
    Icon: IoMdCheckmarkCircleOutline,
  },
  variant: {
    label: "Grossesse",
    colorClasses:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    tooltip:
      "Données insuffisantes ou usage conditionnel. Consulter un professionnel de santé avant utilisation.",
    Icon: FiInfo,
  },
  interdit: {
    label: "Grossesse",
    colorClasses: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-50",
    tooltip:
      "Ce remède est contre-indiqué pendant la grossesse. Ne pas utiliser.",
    Icon: IoCloseCircleOutline,
  },
};

function PregnancyTag({ variant, className = "", showLabel = true }) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;

  return (
    <span
      data-testid="pregnancy-tag"
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition duration-300 lg:text-sm 2xl:text-base ${config.colorClasses} ${className}`}
      title={config.tooltip}
    >
      <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      {showLabel && config.label}
    </span>
  );
}

PregnancyTag.propTypes = {
  variant: PropTypes.oneOf(["ok", "variant", "interdit"]).isRequired,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default PregnancyTag;
