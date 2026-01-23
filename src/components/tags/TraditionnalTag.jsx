// tradimedika-v1/src/components/tag/TraditionnalTag.jsx

import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";

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
  return (
    <span
      data-testid="verified-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-amber-900 dark:text-amber-200 ${className}`}
      title="Ce remède repose principalement sur un usage traditionnel. Son efficacité n’est pas validée par des études scientifiques solides."
    >
      <FiInfo className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      {showLabel && "Traditionnel"}
    </span>
  );
}

TraditionnalTag.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default TraditionnalTag;
