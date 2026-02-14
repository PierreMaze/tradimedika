// tradimedika-v1/src/components/tag/ProuvedTag.jsx

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
      className={`transition-color inline-flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 duration-150 lg:text-sm 2xl:text-base dark:bg-green-900 dark:text-green-200 ${className}`}
      title="Ce remède est soutenu par des données scientifiques et/ou reconnu par des professionnels de santé dans un cadre d’usage défini."
    >
      <IoMdCheckmarkCircleOutline
        className="h-4 w-4 lg:h-5 lg:w-5"
        aria-hidden="true"
      />
      {showLabel && "Reconnu"}
    </span>
  );
}

ProuvedTag.propTypes = {
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ProuvedTag;
