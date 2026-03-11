import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAdvancedSearch } from "../hooks/useAdvancedSearch";
import MobileFilterDrawer from "./mobile/MobileFilterDrawer";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchSidebar from "./SearchSidebar";

/**
 * Page de recherche avancée B2B
 * Layout : sidebar filtres (desktop) + grille résultats
 * Route : /dashboard/recherche-avancee (PRO/ADMIN uniquement)
 */
function AdvancedSearchPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const {
    filters,
    filteredProducts,
    totalProducts,
    activeFiltersCount,
    uniqueProperties,
    setTextSearch,
    toggleFilter,
    toggleAllergen,
    toggleAlphabet,
    setSort,
    resetAll,
    resetCategory,
  } = useAdvancedSearch();

  return (
    <>
      <Helmet>
        <title>Recherche avancée — Tradimedika</title>
        <meta
          name="description"
          content="Recherche avancée de produits naturels avec filtres multi-critères pour praticiens de santé"
        />
      </Helmet>

      <div className="animate-fade-in-up motion-reduce:animate-none">
        {/* Titre de la page */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Recherche avancée
            </h1>
          </div>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Explorez le catalogue avec des filtres multi-critères, puis
            sélectionnez un produit pour le voir plus en détails.
          </p>
        </div>

        {/* Layout principal */}
        <div className="flex gap-6">
          {/* Sidebar filtres — Desktop uniquement */}
          <aside className="hidden w-full shrink-0 lg:block lg:w-90">
            <div
              className="sticky top-24 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
              style={{ maxHeight: "calc(100vh - 7rem)" }}
            >
              <SearchSidebar
                filters={filters}
                uniqueProperties={uniqueProperties}
                activeFiltersCount={activeFiltersCount}
                onTextSearch={setTextSearch}
                onToggleFilter={toggleFilter}
                onToggleAllergen={toggleAllergen}
                onToggleAlphabet={toggleAlphabet}
                onResetAll={resetAll}
                onResetCategory={resetCategory}
              />
            </div>
          </aside>

          {/* Résultats */}
          <div className="min-w-0 flex-1">
            <SearchHeader
              resultCount={filteredProducts.length}
              totalCount={totalProducts}
              activeFiltersCount={activeFiltersCount}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortChange={setSort}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            />

            <div className="mt-4">
              <SearchResults products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <MobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        uniqueProperties={uniqueProperties}
        activeFiltersCount={activeFiltersCount}
        onTextSearch={setTextSearch}
        onToggleFilter={toggleFilter}
        onToggleAllergen={toggleAllergen}
        onToggleAlphabet={toggleAlphabet}
        onResetAll={resetAll}
        onResetCategory={resetCategory}
      />
    </>
  );
}

export default AdvancedSearchPage;
