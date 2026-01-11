// tradimedika-v1/src/components/tag/VerifiedTag.jsx

import { HiMiniShieldCheck } from "react-icons/hi2";
import PropTypes from "prop-types";

/**
 * VerifiedTag Component
 *
 * Tag indiquant qu'un remède a été vérifié par un professionnel de santé.
 * Utilise HiMiniShieldCheck de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Vérifié" (défaut: true)
 */

function VerifiedTag({ className = "", size = "sm", showLabel = true }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition duration-300 lg:text-sm dark:bg-sky-900 dark:text-sky-200 ${className}`}
      title="Vérifié par un professionnel de santé"
    >
      <HiMiniShieldCheck className={sizeClasses[size]} aria-hidden="true" />
      {showLabel && "Vérifié"}
    </span>
  );
}

VerifiedTag.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  showLabel: PropTypes.bool,
};

export default VerifiedTag;
