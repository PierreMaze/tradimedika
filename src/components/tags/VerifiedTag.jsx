// tradimedika-v1/src/components/tag/VerifiedTag.jsx

import { BiSolidCheckShield } from "react-icons/bi";

import PropTypes from "prop-types";

/**
 * VerifiedTag Component
 *
 * Tag indiquant qu'un remède a été approuvé par un professionnel de santé.
 * Utilise HiMiniShieldCheck de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Validé" (défaut: true)
 */

function VerifiedTag({ className = "", size = "sm", showLabel = true }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <span
      data-testid="verified-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-sky-900 dark:text-sky-200 ${className}`}
      title="Approuvé par un professionnel de santé"
    >
      <BiSolidCheckShield className={sizeClasses[size]} aria-hidden="true" />
      {showLabel && "Validé"}
    </span>
  );
}

VerifiedTag.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default VerifiedTag;
