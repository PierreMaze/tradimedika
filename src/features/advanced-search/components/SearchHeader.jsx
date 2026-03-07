import PropTypes from "prop-types";
import { IoFunnelOutline } from "react-icons/io5";
import { SORT_OPTIONS } from "../utils/searchConstants";

/**
 * Header de la section résultats
 * Affiche le compteur, le tri, et le bouton filtres mobile
 */
function SearchHeader({
  resultCount,
  totalCount,
  activeFiltersCount,
  sortBy,
  sortOrder,
  onSortChange,
  onOpenMobileFilters,
}) {
  const currentSortId = SORT_OPTIONS.find(
    (o) => o.sortBy === sortBy && o.sortOrder === sortOrder,
  )?.id;

  const handleSortChange = (e) => {
    const option = SORT_OPTIONS.find((o) => o.id === e.target.value);
    if (option) {
      onSortChange(option.sortBy, option.sortOrder);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Compteur de résultats */}
      <div role="status" aria-live="polite">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {resultCount}
          </span>{" "}
          produit{resultCount > 1 ? "s" : ""} sur {totalCount}
          {activeFiltersCount > 0 && (
            <span className="ml-1 text-emerald-600 dark:text-emerald-400">
              ({activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""}{" "}
              actif{activeFiltersCount > 1 ? "s" : ""})
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Bouton filtres mobile */}
        <button
          onClick={onOpenMobileFilters}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 lg:hidden dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
          aria-label="Ouvrir les filtres"
        >
          <IoFunnelOutline className="h-4 w-4" />
          <span>Filtres</span>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Tri */}
        <select
          value={currentSortId || "name-asc"}
          onChange={handleSortChange}
          className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
          aria-label="Trier les résultats"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

SearchHeader.propTypes = {
  resultCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onOpenMobileFilters: PropTypes.func.isRequired,
};

export default SearchHeader;
