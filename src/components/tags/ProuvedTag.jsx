// tradimedika-v1/src/components/tag/ProuvedTag.jsx

import { BiSolidCheckShield } from "react-icons/bi";

import PropTypes from "prop-types";

/**
 * ProuvedTag Component
 *
 * Tag indiquant qu'un remède a été approuvé par un professionnel de santé.
 * Utilise HiMiniShieldCheck de react-icons/hi2 pour cohérence visuelle.
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - size: Taille de l'icône ('sm' = h-4 w-4, 'md' = h-5 w-5)
 * - showLabel: Afficher le texte "Prouvé" (défaut: true)
 */

function ProuvedTag({ className = "", showLabel = true }) {
  return (
    <span
      data-testid="verified-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition duration-300 lg:text-sm 2xl:text-base dark:bg-sky-900 dark:text-sky-200 ${className}`}
      title="Ce remède été approuvé par un professionnel de santé, il est donc considéré comme un remède prouvé pour son efficacité."
    >
      <BiSolidCheckShield
        className="h-4 w-4 lg:h-5 lg:w-5"
        aria-hidden="true"
      />
      {showLabel && "Prouvé"}
    </span>
  );
}

ProuvedTag.propTypes = {
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ProuvedTag;
