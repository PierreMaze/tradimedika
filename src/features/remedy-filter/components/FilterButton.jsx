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
    <button
      onClick={onClick}
      aria-label="Ouvrir les filtres"
      type="button"
      className="animate-fade-in-up relative cursor-pointer rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium tracking-wider text-white shadow-md transition duration-150 ease-in-out hover:bg-emerald-700 motion-reduce:animate-none motion-reduce:opacity-100 lg:text-base dark:bg-emerald-700 dark:hover:bg-emerald-600"
    >
      <span className="flex items-center gap-2">
        <TbFilterCog className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        <span>Filtres</span>
      </span>

      {hasActiveFilters && (
        <span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white dark:bg-red-500"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">{activeFiltersCount} filtres actifs</span>
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
};

export default FilterButton;
