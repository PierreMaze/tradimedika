// components/filter/FilterTag.jsx
import PropTypes from "prop-types";
import { BUTTON_PRIMARY_STYLES } from "../../constants/buttonStyles";

/**
 * Composant Tag individuel pour filtrer les remèdes
 * - Pure component sans état interne
 * - Design pill similaire à SymptomTag (sans icône X)
 * - Animations enter/exit avec Tailwind CSS
 * - Comportement radio button (un seul actif à la fois)
 * - Accessible avec aria-pressed et aria-label
 */
export default function FilterTag({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Filtrer par ${label}`}
      type="button"
      className={`animate-scale-in cursor-pointer rounded-md px-3 py-2 text-sm font-medium tracking-wider shadow-md transition duration-150 ease-in-out motion-reduce:animate-none motion-reduce:opacity-100 lg:text-base ${
        isActive
          ? BUTTON_PRIMARY_STYLES
          : "bg-neutral-200 text-neutral-900 hover:bg-emerald-600 hover:text-white dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
      }`}
    >
      {label}
    </button>
  );
}

FilterTag.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
