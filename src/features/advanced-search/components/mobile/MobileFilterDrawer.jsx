import PropTypes from "prop-types";
import { IoCloseOutline, IoFunnelOutline } from "react-icons/io5";
import SearchSidebar from "../SearchSidebar";

/**
 * Drawer mobile pour les filtres de recherche avancée
 * S'ouvre en overlay sur mobile/tablette
 */
function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  uniqueProperties,
  activeFiltersCount,
  onTextSearch,
  onToggleFilter,
  onToggleAllergen,
  onToggleAlphabet,
  onResetAll,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl dark:bg-neutral-800"
        role="dialog"
        aria-modal="true"
        aria-label="Filtres de recherche avancée"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <IoFunnelOutline className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Filtres
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            aria-label="Fermer les filtres"
          >
            <IoCloseOutline className="h-5 w-5" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto">
          <SearchSidebar
            filters={filters}
            uniqueProperties={uniqueProperties}
            activeFiltersCount={activeFiltersCount}
            onTextSearch={onTextSearch}
            onToggleFilter={onToggleFilter}
            onToggleAllergen={onToggleAllergen}
            onToggleAlphabet={onToggleAlphabet}
            onResetAll={onResetAll}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-700">
          <button
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            Voir les résultats
          </button>
        </div>
      </div>
    </>
  );
}

MobileFilterDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  uniqueProperties: PropTypes.array.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
  onTextSearch: PropTypes.func.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  onToggleAllergen: PropTypes.func.isRequired,
  onToggleAlphabet: PropTypes.func.isRequired,
  onResetAll: PropTypes.func.isRequired,
};

export default MobileFilterDrawer;
