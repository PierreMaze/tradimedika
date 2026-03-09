import PropTypes from "prop-types";
import { useMemo } from "react";
import AllergenFilter from "./filters/AllergenFilter";
import AlphabetFilter from "./filters/AlphabetFilter";
import CategoryFilter from "./filters/CategoryFilter";
import ChildrenAgeFilter from "./filters/ChildrenAgeFilter";
import EvidenceLevelFilter from "./filters/EvidenceLevelFilter";
import FilterSection from "./filters/FilterSection";
import PregnancyFilter from "./filters/PregnancyFilter";
import PropertyFilter from "./filters/PropertyFilter";
import TextSearchFilter from "./filters/TextSearchFilter";
import TypeFilter from "./filters/TypeFilter";
import VerificationFilter from "./filters/VerificationFilter";

/**
 * Calcule le nombre de filtres actifs dans un objet de filtres booléens
 */
function countActive(obj) {
  return Object.values(obj).filter(Boolean).length;
}

/**
 * Sidebar de filtres pour la recherche avancée
 * Contient tous les filtres organisés en sections accordéon
 */
function SearchSidebar({
  filters,
  uniqueProperties,
  activeFiltersCount,
  onTextSearch,
  onToggleFilter,
  onToggleAllergen,
  onToggleAlphabet,
  onResetAll,
}) {
  const typesCount = useMemo(() => countActive(filters.types), [filters.types]);
  const categoriesCount = useMemo(
    () => countActive(filters.categories),
    [filters.categories],
  );
  const propertiesCount = useMemo(
    () => countActive(filters.properties),
    [filters.properties],
  );
  const pregnancyCount = useMemo(
    () => countActive(filters.pregnancy),
    [filters.pregnancy],
  );
  const childrenCount = useMemo(
    () => countActive(filters.childrenAge),
    [filters.childrenAge],
  );
  const evidenceCount = useMemo(
    () => countActive(filters.evidenceLevel),
    [filters.evidenceLevel],
  );
  const verificationCount = useMemo(
    () => countActive(filters.verification),
    [filters.verification],
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
        <h2 className="text-sm font-bold tracking-wide text-neutral-900 uppercase dark:text-neutral-100">
          Filtres
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetAll}
            className="cursor-pointer text-xs font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Tout effacer ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Recherche textuelle */}
      <TextSearchFilter value={filters.textSearch} onChange={onTextSearch} />

      {/* Filtre alphabétique */}
      <FilterSection
        label="Filtrer par première lettre"
        count={filters.alphabet.length}
        defaultOpen={true}
      >
        <AlphabetFilter
          selectedLetters={filters.alphabet}
          onToggle={onToggleAlphabet}
        />
      </FilterSection>

      {/* Filtres accordéon */}
      <FilterSection label="Type de produit" count={typesCount}>
        <TypeFilter activeFilters={filters.types} onToggle={onToggleFilter} />
      </FilterSection>

      <FilterSection
        label="Catégorie thérapeutique"
        count={categoriesCount}
        defaultOpen={false}
      >
        <CategoryFilter
          activeFilters={filters.categories}
          onToggle={onToggleFilter}
        />
      </FilterSection>

      <FilterSection
        label="Propriétés"
        count={propertiesCount}
        defaultOpen={false}
      >
        <PropertyFilter
          activeFilters={filters.properties}
          onToggle={onToggleFilter}
          uniqueProperties={uniqueProperties}
        />
      </FilterSection>

      <FilterSection label="Sécurité grossesse" count={pregnancyCount}>
        <PregnancyFilter
          activeFilters={filters.pregnancy}
          onToggle={onToggleFilter}
        />
      </FilterSection>

      <FilterSection
        label="Âge enfants"
        count={childrenCount}
        defaultOpen={false}
      >
        <ChildrenAgeFilter
          activeFilters={filters.childrenAge}
          onToggle={onToggleFilter}
        />
      </FilterSection>

      <FilterSection
        label="Allergènes à exclure"
        count={filters.excludedAllergens.length}
        defaultOpen={false}
      >
        <AllergenFilter
          excludedAllergens={filters.excludedAllergens}
          onToggle={onToggleAllergen}
        />
      </FilterSection>

      <FilterSection
        label="Niveau de preuve"
        count={evidenceCount}
        defaultOpen={false}
      >
        <EvidenceLevelFilter
          activeFilters={filters.evidenceLevel}
          onToggle={onToggleFilter}
        />
      </FilterSection>

      <FilterSection
        label="Vérification"
        count={verificationCount}
        defaultOpen={false}
      >
        <VerificationFilter
          activeFilters={filters.verification}
          onToggle={onToggleFilter}
        />
      </FilterSection>
    </div>
  );
}

SearchSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  uniqueProperties: PropTypes.array.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
  onTextSearch: PropTypes.func.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  onToggleAllergen: PropTypes.func.isRequired,
  onToggleAlphabet: PropTypes.func.isRequired,
  onResetAll: PropTypes.func.isRequired,
};

export default SearchSidebar;
