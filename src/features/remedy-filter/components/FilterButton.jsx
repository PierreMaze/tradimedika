import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { TbFilterCog } from "react-icons/tb";

/**
 * FilterButton Component
 *
 * Bouton pour ouvrir la modal de filtres
 * Style identique aux tags de symptômes (AllergyTag)
 * Affiche un badge avec le nombre de filtres actifs
 *
 * Props:
 * - onClick: Fonction appelée au clic
 * - activeFiltersCount: Nombre de filtres actifs (pour le badge)
 */
function FilterButton({ onClick, activeFiltersCount }) {
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      aria-label="Ouvrir les filtres"
      type="button"
      className={`relative cursor-pointer rounded-md px-3 py-2 text-sm font-medium tracking-wider shadow-md transition duration-150 ease-in-out lg:text-base ${
        hasActiveFilters
          ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          : "bg-neutral-200 text-neutral-900 hover:bg-emerald-600 hover:text-white dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
      }`}
    >
      <span className="flex items-center gap-2">
        <TbFilterCog className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        <span>Filtres</span>
      </span>

      {hasActiveFilters && (
        <span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white dark:bg-red-500"
          aria-label={`${activeFiltersCount} filtres actifs`}
        >
          {activeFiltersCount}
        </span>
      )}
    </motion.button>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
};

export default FilterButton;
