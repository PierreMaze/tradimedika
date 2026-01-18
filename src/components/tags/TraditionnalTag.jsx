// tradimedika-v1/src/components/tag/TraditionnalTag.jsx

import PropTypes from "prop-types";
import { GiFallingLeaf } from "react-icons/gi";

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
      className={`inline-flex items-center gap-1.5 rounded-md bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-lime-900 dark:text-lime-200 ${className}`}
      title="Ce remède n'a pas été approuvé par un professionnel de santé, il est donc considéré comme un remède non prouvé pour son efficacité"
    >
      <GiFallingLeaf
        className="h-3 w-3 rotate-90 rotate-x-180 lg:h-4 lg:w-4"
        aria-hidden="true"
      />
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
