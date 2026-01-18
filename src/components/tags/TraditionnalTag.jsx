// tradimedika-v1/src/components/tag/TraditionnalTag.jsx

import { BiSolidShieldX } from "react-icons/bi";

import PropTypes from "prop-types";

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

function TraditionnalTag({ className = "", size = "sm", showLabel = true }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <span
      data-testid="verified-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-yellow-100 px-3 py-1.5 text-xs font-semibold text-yellow-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-yellow-900 dark:text-yellow-200 ${className}`}
      title="Approuvé par un professionnel de santé"
    >
      <BiSolidShieldX className={sizeClasses[size]} aria-hidden="true" />
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
