// src/components/tags/RecommendedTag.jsx

import PropTypes from "prop-types";
import { MdThumbUp } from "react-icons/md";

/**
 * RecommendedTag Component
 *
 * Tag indiquant que ce remède est le plus pertinent pour les symptômes recherchés.
 * Affiché uniquement sur le premier résultat de la liste.
 *
 * Critères de sélection :
 * 1. Nombre de symptômes matchés (le plus élevé)
 * 2. Vérifié par un professionnel (en priorité)
 * 3. Ordre alphabétique (en cas d'égalité)
 *
 * Props:
 * - className: Classes CSS additionnelles
 * - showLabel: Afficher le texte "Recommandé" (défaut: true)
 */
function RecommendedTag({ className = "", showLabel = true }) {
  return (
    <span
      data-testid="recommended-tag"
      className={`inline-flex items-center gap-1.5 rounded-md bg-sky-100 px-3 py-1.5 text-sm font-medium text-sky-800 transition duration-300 lg:text-base dark:bg-sky-900 dark:text-sky-200 ${className}`}
      title="Ce remède est le plus pertinent pour vos symptômes"
    >
      <MdThumbUp className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      {showLabel && "Recommandé"}
    </span>
  );
}

RecommendedTag.propTypes = {
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default RecommendedTag;
