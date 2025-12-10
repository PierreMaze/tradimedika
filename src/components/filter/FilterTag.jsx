// components/filter/FilterTag.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Composant Tag individuel pour filtrer les remèdes
 * - Pure component sans état interne
 * - Design pill similaire à SymptomTag (sans icône X)
 * - Animations enter/exit avec Framer Motion
 * - Comportement radio button (un seul actif à la fois)
 * - Accessible avec aria-pressed et aria-label
 */
export default function FilterTag({ label, isActive, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Filtrer par ${label}`}
      type="button"
      className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium tracking-wider shadow-md transition duration-150 ease-in-out hover:scale-105 focus:ring-2 focus:ring-emerald-300 focus:outline-none lg:text-base ${
        isActive
          ? "bg-emerald-600 text-white dark:bg-emerald-700"
          : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
      }`}
    >
      {label}
    </motion.button>
  );
}

FilterTag.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
