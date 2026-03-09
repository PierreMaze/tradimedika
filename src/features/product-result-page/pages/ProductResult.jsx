// tradimedika/src/pages/ProductResult.jsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiArrowLeft } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { CatalogSearch, FilterProductResult, ProductResultList } from "..";
import Button from "../../../components/ui/button/Button";
import FeedbackLink from "../../../components/ui/feedback/FeedbackLink";
import db from "../../../data/db.json";
import {
  AllergyFilterInfo,
  AllergySectionToggle,
  useAllergies,
} from "../../allergens-search";
import { useAuth } from "../../auth";
import { useSearchHistory } from "../../history-search/hooks/useSearchHistory";
import {
  FilterButton,
  FilterModal,
  filterProductsByTags,
  useProductFilters,
} from "../../product-filter";
import { ProductSearchSection } from "../../product-search";
import { useProductTags } from "../../product-search/hooks/useProductTags";
import { normalizeForMatching } from "../../product-search/utils/normalize";
// [DISABLED] Red flags modal — conservé pour future feature
// import RedFlagsModal from "../../red-flags/components/RedFlagsModal";
// import { useRedFlags } from "../../red-flags/hooks/useRedFlags";

/**
 * ProductResult Page - Catalogue de produits naturels
 *
 * Fonctionnalités:
 * - Affiche TOUS les produits par défaut
 * - Input recherche pour filtrer par nom de produit
 * - Section allergies pour filtrer les produits dangereux
 * - Filtrage par tags (grossesse, reconnu, âge)
 */

function ProductResult() {
  // [DISABLED] Red flags — navigate conservé pour future feature
  // const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // [DISABLED] Red flags modal — conservé pour future feature
  // const { hasConsent } = useConsent();
  const {
    canUseRemedy,
    userAllergies,
    isFilteringEnabled,
    enableFiltering,
    disableFiltering,
  } = useAllergies();
  // [DISABLED] Red flags modal — conservé pour future feature
  // const {
  //   answers: redFlagsAnswers,
  //   setAnswer: setRedFlagAnswer,
  //   allQuestionsAnswered,
  //   hasRedFlags,
  //   isModalOpen: isRedFlagsModalOpen,
  //   disclaimerAccepted,
  //   acceptDisclaimer,
  //   openModal: openRedFlagsModal,
  //   closeModal: closeRedFlagsModal,
  //   saveSession: saveRedFlagsSession,
  //   isSessionValidated,
  // } = useRedFlags();

  // [DISABLED] Red flags — consent redirect
  // useEffect(() => {
  //   if (!hasConsent) {
  //     navigate("/", { replace: true });
  //   }
  // }, [hasConsent, navigate]);

  // [DISABLED] Red flags — modal auto-open
  // useEffect(() => {
  //   if (hasConsent && !isSessionValidated()) {
  //     openRedFlagsModal();
  //   }
  // }, [hasConsent, isSessionValidated, openRedFlagsModal]);

  // [DISABLED] Red flags — completion handler
  // const handleRedFlagsComplete = useCallback(() => {
  //   if (hasRedFlags) {
  //     navigate("/urgence", { replace: true });
  //   } else {
  //     saveRedFlagsSession();
  //     closeRedFlagsModal();
  //   }
  // }, [hasRedFlags, saveRedFlagsSession, closeRedFlagsModal, navigate]);

  const {
    isModalOpen,
    openModal,
    closeModal,
    appliedFilters,
    tempFilters,
    toggleTempFilter,
    resetTempFilters,
    applyFilters,
    appliedFiltersCount,
  } = useProductFilters();

  // Gestion des produits sélectionnés (recherche)
  const { selectedProducts, addProduct, removeProduct, setSelectedProducts } =
    useProductTags();
  const { addSearch } = useSearchHistory();

  // Pré-remplir depuis query params (ex: clic historique sidebar → /products?products=X,Y)
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productsParam = searchParams.get("products");
    if (productsParam) {
      const products = productsParam
        .split(",")
        .map((p) => decodeURIComponent(p.trim()))
        .filter(Boolean);
      if (products.length > 0) {
        setSelectedProducts(products);
      }
    }
  }, [location.search, setSelectedProducts]);

  // État allergies UI
  const [isAllergySectionExpanded, setIsAllergySectionExpanded] =
    useState(false);

  const handleFilteringChange = useCallback(
    (isChecked) => {
      if (isChecked) {
        enableFiltering();
      } else {
        disableFiltering();
      }
    },
    [enableFiltering, disableFiltering],
  );

  // Tous les produits de db.json, enveloppés dans le format attendu par les composants
  const allProducts = useMemo(() => {
    return db.map((product) => ({
      product,
      matchCount: 1,
      matchedSymptoms: [],
      isRecommended: false,
    }));
  }, []);

  // Si des produits sont sélectionnés, filtrer par nom. Sinon afficher tout.
  const matchedProducts = useMemo(() => {
    if (selectedProducts.length === 0) {
      return allProducts;
    }
    return allProducts.filter((item) =>
      selectedProducts.some(
        (name) =>
          normalizeForMatching(item.product.name) ===
          normalizeForMatching(name),
      ),
    );
  }, [selectedProducts, allProducts]);

  // Sauvegarder dans l'historique quand des produits sont sélectionnés
  useEffect(() => {
    if (selectedProducts.length > 0) {
      addSearch(selectedProducts, matchedProducts.length);
    }
  }, [selectedProducts, matchedProducts.length, addSearch]);

  // Filtrage par allergies
  const safeProducts = useMemo(() => {
    return matchedProducts.filter((item) => canUseRemedy(item.product));
  }, [matchedProducts, canUseRemedy]);

  const filteredCount = matchedProducts.length - safeProducts.length;

  const filteredByAllergies = useMemo(() => {
    return matchedProducts.filter((item) => !canUseRemedy(item.product));
  }, [matchedProducts, canUseRemedy]);

  const [showFilteredByAllergies, setShowFilteredByAllergies] = useState(false);
  const [resetFilterKey, setResetFilterKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleLetterClick = useCallback((letter) => {
    setSelectedLetter((prev) => (prev === letter ? null : letter));
    setSearchQuery("");
  }, []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    setSelectedLetter(null);
  }, []);

  const displayProducts = useMemo(() => {
    const base = safeProducts.map((item) => ({ ...item, isFiltered: false }));

    if (showFilteredByAllergies && filteredCount > 0) {
      const filtered = filteredByAllergies.map((item) => ({
        ...item,
        isFiltered: true,
      }));
      return [...filtered, ...base];
    }

    return base;
  }, [
    safeProducts,
    filteredByAllergies,
    showFilteredByAllergies,
    filteredCount,
  ]);

  const [filteredByTags, setFilteredByTags] = useState(displayProducts);

  useEffect(() => {
    setFilteredByTags(displayProducts);
  }, [displayProducts]);

  const handleFilterChange = useCallback((products) => {
    setFilteredByTags(products);
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProductsByTags(filteredByTags, appliedFilters);
  }, [filteredByTags, appliedFilters]);

  const searchFilteredProducts = useMemo(() => {
    let filtered = filteredProducts;

    if (searchQuery.trim()) {
      const normalizedQuery = normalizeForMatching(searchQuery);
      filtered = filtered.filter((item) =>
        normalizeForMatching(item.product.name).includes(normalizedQuery),
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter((item) =>
        item.product.name.toUpperCase().startsWith(selectedLetter),
      );
    }

    return filtered;
  }, [filteredProducts, searchQuery, selectedLetter]);

  const productsWithRecommendation = useMemo(() => {
    const recommendedIndex = searchFilteredProducts.findIndex(
      (item) => !item.isFiltered,
    );
    return searchFilteredProducts.map((item, index) => {
      const shouldBeRecommended = index === recommendedIndex;
      if (item.isRecommended === shouldBeRecommended) {
        return item;
      }
      return { ...item, isRecommended: shouldBeRecommended };
    });
  }, [searchFilteredProducts]);

  const pageTitle =
    selectedProducts.length > 0
      ? `${selectedProducts.join(", ")} - Catalogue TRADIMEDIKA`
      : "Catalogue des produits naturels - TRADIMEDIKA";

  const pageDescription =
    selectedProducts.length > 0
      ? `${safeProducts.length} produit${safeProducts.length > 1 ? "s" : ""} naturel${safeProducts.length > 1 ? "s" : ""} trouvé${safeProducts.length > 1 ? "s" : ""}`
      : `${db.length} produits naturels disponibles dans le catalogue TRADIMEDIKA`;

  const canonicalUrl = "https://tradimedika.com/products";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      {/* Bouton Retour — masqué si connecté */}
      {!isAuthenticated && (
        <div className="animate-fade-in flex items-center gap-3 delay-300 motion-reduce:animate-none motion-reduce:opacity-100">
          <Button
            as="link"
            to="/"
            variant="primary"
            icon={HiArrowLeft}
            ariaLabel="Retour à l'accueil"
          />
        </div>
      )}

      <div className="text-dark dark:text-light transition-color mt-8 flex flex-col items-center gap-y-4 text-center duration-150 ease-in-out lg:mt-4">
        <h1 className="text-3xl font-bold lg:text-4xl">
          Catalogue des Produits
        </h1>

        {/* Section recherche + allergies */}
        <div className="mt-4 flex hidden w-full max-w-2xl flex-col gap-y-4">
          <AllergySectionToggle
            isFilteringEnabled={isFilteringEnabled}
            onFilteringChange={handleFilteringChange}
            userAllergies={userAllergies}
            isExpanded={isAllergySectionExpanded}
            onExpandChange={setIsAllergySectionExpanded}
          />

          <ProductSearchSection
            onProductSelect={addProduct}
            onRemoveProduct={removeProduct}
            selectedProducts={selectedProducts}
            placeholder="Rechercher un produit naturel..."
          />
        </div>

        {/* Filtres */}
        {safeProducts.length > 0 && (
          <div className="mb-6 flex hidden w-full justify-center">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
              <FilterButton
                onClick={openModal}
                activeFiltersCount={appliedFiltersCount}
              />
              <FilterProductResult
                key={`filter-${selectedProducts.join("-")}-${resetFilterKey}`}
                matchedProducts={displayProducts}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        )}

        {/* Info allergies filtrées */}
        {filteredCount > 0 && userAllergies.length > 0 && (
          <div className="mb-6">
            <AllergyFilterInfo
              filteredCount={filteredCount}
              userAllergies={userAllergies}
              showFiltered={showFilteredByAllergies}
              onToggleFiltered={() => {
                setShowFilteredByAllergies((prev) => !prev);
                setResetFilterKey((prev) => prev + 1);
              }}
            />
          </div>
        )}

        <CatalogSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedLetter={selectedLetter}
          onLetterClick={handleLetterClick}
        />

        <span className="my-4 w-2/3 border-t-2 border-dashed text-neutral-600 dark:text-neutral-400"></span>
        {/* Compteur de résultats */}
        {productsWithRecommendation.length > 0 && safeProducts.length > 0 && (
          <p
            className="text-lg text-neutral-600 dark:text-neutral-400"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-bold text-emerald-600 dark:text-emerald-500">
              {productsWithRecommendation.length}
            </span>{" "}
            produit{productsWithRecommendation.length > 1 ? "s" : ""} trouvé
            {productsWithRecommendation.length > 1 ? "s" : ""}
          </p>
        )}
        <ProductResultList
          products={productsWithRecommendation}
          hasMatchingProducts={safeProducts.length > 0}
          selectedSymptoms={selectedProducts}
        />
      </div>

      {/* Bouton Retour bas — masqué si connecté */}
      {!isAuthenticated && (
        <div className="animate-fade-in mt-12 flex w-full justify-center delay-1000 motion-reduce:animate-none motion-reduce:opacity-100">
          <Button
            as="link"
            to="/"
            variant="primary"
            ariaLabel="Retour à l'accueil"
          >
            Retour à l&apos;accueil
          </Button>
        </div>
      )}

      <FeedbackLink />

      <FilterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tempFilters={tempFilters}
        onToggleTempFilter={toggleTempFilter}
        onResetTempFilters={resetTempFilters}
        onApplyFilters={applyFilters}
      />

      {/* [DISABLED] Red flags modal — conservé pour future feature */}
      {/* <RedFlagsModal
        isOpen={isRedFlagsModalOpen}
        onClose={closeRedFlagsModal}
        onComplete={handleRedFlagsComplete}
        answers={redFlagsAnswers}
        setAnswer={setRedFlagAnswer}
        disclaimerAccepted={disclaimerAccepted}
        acceptDisclaimer={acceptDisclaimer}
        allQuestionsAnswered={allQuestionsAnswered}
      /> */}
    </>
  );
}

export default ProductResult;
