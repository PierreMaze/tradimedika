// tradimedika-v1/src/components/tag/TraditionnalTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "../ui/tooltip";

/**
 * TraditionnalTag Component
 *
 * Tag indiquant qu'un remède n'a pas été approuvé par un professionnel de santé.
 * Utilise HiMiniShieldCheck de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Traditionnel" (défaut: true)
 */

function TraditionnalTag({ className = "", showLabel = true }) {
  const tooltipContent = (
    <>
      <h3 className="mb-1 text-lg font-semibold text-neutral-900 dark:text-white">
        Traditionnel
      </h3>
      <p className="text-sm text-neutral-900 dark:text-white">
        Ce produit naturel repose principalement sur un usage traditionnel. Son
        efficacité n&apos;est pas validée par des études scientifiques solides.
      </p>
    </>
  );

  return (
    <Tooltip content={tooltipContent} placement="top" hoverDelay={200}>
      <span
        data-testid="verified-tag"
        className={`transition-color inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 duration-150 lg:text-sm 2xl:text-base dark:bg-amber-900 dark:text-amber-200 ${className}`}
      >
        <FiInfo className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        {showLabel && "Traditionnel"}
      </span>
    </Tooltip>
  );
}

TraditionnalTag.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default TraditionnalTag;
