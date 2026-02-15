// tradimedika-v1/src/pages/RemedyResult.jsx

import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiArrowLeft } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/button/Button";
import FeedbackLink from "../components/ui/feedback/FeedbackLink";
import db from "../data/db.json";
import { AllergyFilterInfo, useAllergies } from "../features/allergens-search";
import { useConsent } from "../features/consent";
import RedFlagsModal from "../features/red-flags/components/RedFlagsModal";
import { useRedFlags } from "../features/red-flags/hooks/useRedFlags";
import {
  FilterButton,
  FilterModal,
  filterRemediesByTags,
  useRemedyFilters,
} from "../features/remedy-filter";
import {
  FilterRemedyResult,
  RemedyResultList,
  findMatchingRemedies,
} from "../features/remedy-result-page";
import { useSymptomsPersistence } from "../features/symptom-search/hooks/useSymptomsPersistence";
import { parseAndValidateSymptoms } from "../features/symptom-search/utils/validationSymptom";

/**
 * RemedyResult Page - Affiche les remèdes correspondant aux symptômes sélectionnés
 *
 * Fonctionnalités:
 * - Récupère les symptômes depuis query params (persistance refresh) ou state (fallback)
 * - Calcule les remèdes matchés avec findMatchingRemedies()
 * - Permet le filtrage par tags/symptômes via FilterRemedyResult
 * - Affiche la liste des remèdes via RemedyResultList (grille responsive)
 * - Affiche un message d'état vide si aucun remède trouvé
 *
 * Layout:
 * - Container, padding, et BreadCrumb gérés par LayoutRemedyResult
 * - Position des filtres: entre titre et liste de résultats
 */

function RemedyResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasConsent } = useConsent();
  const { canUseRemedy, userAllergies: contextAllergies } = useAllergies();
  const {
    answers: redFlagsAnswers,
    setAnswer: setRedFlagAnswer,
    allQuestionsAnswered,
    hasRedFlags,
    isModalOpen: isRedFlagsModalOpen,
    disclaimerAccepted,
    acceptDisclaimer,
    openModal: openRedFlagsModal,
    closeModal: closeRedFlagsModal,
    saveSession: saveRedFlagsSession,
    isSessionValidated,
  } = useRedFlags();

  useEffect(() => {
    if (!hasConsent) {
      navigate("/", { replace: true });
    }
  }, [hasConsent, navigate]);

  useEffect(() => {
    if (hasConsent && !isSessionValidated()) {
      openRedFlagsModal();
    }
  }, [hasConsent, isSessionValidated, openRedFlagsModal]);

  const handleRedFlagsComplete = useCallback(() => {
    if (hasRedFlags) {
      navigate("/urgence", { replace: true });
    } else {
      saveRedFlagsSession();
      closeRedFlagsModal();
    }
  }, [hasRedFlags, saveRedFlagsSession, closeRedFlagsModal, navigate]);

  // Hook pour gérer les filtres par tags (Grossesse, Reconnu, Âge)
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
  } = useRemedyFilters();

  const [storedSymptoms, setSymptomsAndPersist] = useSymptomsPersistence();

  const selectedSymptoms = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const symptomsParam = searchParams.get("symptoms");

    if (symptomsParam) {
      return parseAndValidateSymptoms(symptomsParam);
    }

    const stateSymptoms = location.state?.symptoms || [];
    if (
      Array.isArray(stateSymptoms) &&
      stateSymptoms.filter((s) => typeof s === "string" && s.trim()).length > 0
    ) {
      return stateSymptoms.filter((s) => typeof s === "string" && s.trim());
    }

    return storedSymptoms;
  }, [location.search, location.state?.symptoms, storedSymptoms]);

  // ✅ FIX: Ne mettre à jour que si les symptômes ont réellement changé
  // Évite la boucle infinie en comparant le contenu (pas la référence)
  useEffect(() => {
    if (selectedSymptoms.length === 0) return;

    // Comparer le contenu pour éviter les mises à jour inutiles
    const symptomsChanged =
      storedSymptoms.length !== selectedSymptoms.length ||
      !selectedSymptoms.every(
        (symptom, index) => symptom === storedSymptoms[index],
      );

    if (symptomsChanged) {
      setSymptomsAndPersist(selectedSymptoms);
    }
  }, [selectedSymptoms, storedSymptoms, setSymptomsAndPersist]);

  const userAllergies = contextAllergies;

  // Calcul des remèdes matchés avec useMemo pour optimisation
  const matchedRemedies = useMemo(
    () => findMatchingRemedies(selectedSymptoms, db),
    [selectedSymptoms],
  );

  // Filtrage par allergies (MODE STRICT : masquer les remèdes dangereux)
  // canUseRemedy() vérifie automatiquement isFilteringEnabled
  const safeRemedies = useMemo(() => {
    return matchedRemedies.filter((item) => canUseRemedy(item.remedy));
  }, [matchedRemedies, canUseRemedy]);

  // Calculer le nombre de remèdes filtrés
  const filteredCount = matchedRemedies.length - safeRemedies.length;

  // Extraire les remèdes masqués
  const filteredByAllergies = useMemo(() => {
    return matchedRemedies.filter((item) => !canUseRemedy(item.remedy));
  }, [matchedRemedies, canUseRemedy]);

  // État pour afficher/masquer les remèdes filtrés par allergies
  // Toujours masqué par défaut au chargement de la page (false)
  const [showFilteredByAllergies, setShowFilteredByAllergies] = useState(false);

  // État pour forcer le reset du filtre de symptômes (FilterRemedyResult)
  // Incrémenté à chaque toggle d'affichage des allergènes pour reset à "Tous"
  const [resetFilterKey, setResetFilterKey] = useState(0);

  // Liste combinée avec métadonnée isFiltered
  // Les remèdes avec allergènes apparaissent EN PREMIER lorsqu'ils sont affichés
  const displayRemedies = useMemo(() => {
    const base = safeRemedies.map((item) => ({ ...item, isFiltered: false }));

    if (showFilteredByAllergies && filteredCount > 0) {
      const filtered = filteredByAllergies.map((item) => ({
        ...item,
        isFiltered: true,
      }));
      // Allergènes en premier, puis remèdes sûrs
      return [...filtered, ...base];
    }

    return base;
  }, [
    safeRemedies,
    filteredByAllergies,
    showFilteredByAllergies,
    filteredCount,
  ]);

  // État pour les remèdes filtrés par les symptômes (FilterRemedyResult)
  const [filteredBySymptoms, setFilteredBySymptoms] = useState(displayRemedies);

  // Synchroniser filteredBySymptoms avec displayRemedies
  useEffect(() => {
    setFilteredBySymptoms(displayRemedies);
  }, [displayRemedies]);

  // useCallback pour éviter re-renders en cascade dans FilterRemedyResult
  const handleSymptomFilterChange = useCallback((remedies) => {
    setFilteredBySymptoms(remedies);
  }, []);

  // Appliquer le filtre par tags de propriétés (Grossesse, Reconnu, Âge)
  // après le filtre par symptômes
  const filteredRemedies = useMemo(() => {
    return filterRemediesByTags(filteredBySymptoms, appliedFilters);
  }, [filteredBySymptoms, appliedFilters]);

  // Recalculer isRecommended sur la liste finale filtrée :
  // le premier remède non-allergène de la liste actuelle devient "Recommandé"
  const remediesWithRecommendation = useMemo(() => {
    const recommendedIndex = filteredRemedies.findIndex(
      (item) => !item.isFiltered,
    );
    return filteredRemedies.map((item, index) => {
      const shouldBeRecommended = index === recommendedIndex;
      if (item.isRecommended === shouldBeRecommended) {
        return item;
      }
      return { ...item, isRecommended: shouldBeRecommended };
    });
  }, [filteredRemedies]);

  // Calculer si on doit afficher le séparateur (uniquement si plusieurs symptômes)
  const shouldShowSeparator = useMemo(() => {
    const uniqueSymptoms = new Set();
    displayRemedies.forEach((result) => {
      // Protection contre les remèdes sans matchedSymptoms (cas des tests ou données incomplètes)
      if (result.matchedSymptoms && Array.isArray(result.matchedSymptoms)) {
        result.matchedSymptoms.forEach((symptom) => {
          uniqueSymptoms.add(symptom);
        });
      }
    });
    return uniqueSymptoms.size > 1;
  }, [displayRemedies]);

  // Generate dynamic meta tags (memoizé pour optimisation)
  const { pageTitle, pageDescription, canonicalUrl } = useMemo(() => {
    const title =
      selectedSymptoms.length > 0
        ? `Produits naturels pour ${selectedSymptoms.join(", ")} - TRADIMEDIKA`
        : "Résultats des produits naturels - TRADIMEDIKA";

    const description =
      matchedRemedies.length > 0
        ? `${matchedRemedies.length} produit${matchedRemedies.length > 1 ? "s" : ""} naturel${matchedRemedies.length > 1 ? "s" : ""} trouvé${matchedRemedies.length > 1 ? "s" : ""} pour ${selectedSymptoms.join(", ")}`
        : `Recherche de produits naturels pour ${selectedSymptoms.join(", ")}`;

    const canonical =
      selectedSymptoms.length > 0
        ? `https://tradimedika.com/remedes?symptoms=${encodeURIComponent(selectedSymptoms.join(","))}`
        : "https://tradimedika.com/remedes";

    return {
      pageTitle: title,
      pageDescription: description,
      canonicalUrl: canonical,
    };
  }, [selectedSymptoms, matchedRemedies.length]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      {/* Bouton Retour */}
      <div className="animate-fade-in flex items-center gap-3 delay-300 motion-reduce:animate-none motion-reduce:opacity-100">
        <Button
          as="link"
          to="/"
          variant="primary"
          icon={HiArrowLeft}
          ariaLabel="Retour à l'accueil"
        />
      </div>
      <div className="text-dark dark:text-light transition-color mt-8 flex flex-col items-center gap-y-4 text-center duration-150 ease-in-out lg:mt-4">
        {/* Titre principal */}
        <h1 className="text-3xl font-bold lg:text-4xl">
          Résultats des Produits
        </h1>

        {/* Sous-titre avec symptômes sélectionnés */}
        {selectedSymptoms.length > 0 && (
          <p className="text-center text-base text-neutral-600 lg:text-lg dark:text-neutral-400">
            Produits naturels pour :{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {selectedSymptoms.join(", ")}
            </span>
          </p>
        )}

        {/* Section de filtrage divisée en deux parties */}
        {safeRemedies.length > 0 && (
          <div className="mb-6 flex w-full justify-center">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
              <FilterButton
                onClick={openModal}
                activeFiltersCount={appliedFiltersCount}
              />
              {shouldShowSeparator && (
                <span
                  className="h-8 border border-dashed border-emerald-600 dark:border-emerald-500"
                  aria-hidden="true"
                ></span>
              )}
              <FilterRemedyResult
                key={`filter-${selectedSymptoms.join("-")}-${resetFilterKey}`}
                matchedRemedies={displayRemedies}
                onFilterChange={handleSymptomFilterChange}
              />
            </div>
          </div>
        )}

        {/* Message d'information si des remèdes sont masqués par filtrage allergies */}
        {filteredCount > 0 && userAllergies.length > 0 && (
          <div className="mb-6">
            <AllergyFilterInfo
              filteredCount={filteredCount}
              userAllergies={userAllergies}
              showFiltered={showFilteredByAllergies}
              onToggleFiltered={() => {
                setShowFilteredByAllergies((prev) => !prev);
                // Reset le filtre de symptômes à "Tous" pour meilleure UX
                setResetFilterKey((prev) => prev + 1);
              }}
            />
          </div>
        )}

        {/* Compteur de résultats (seulement si des remèdes sont affichés après filtrage) */}
        {/* aria-live pour annoncer les changements aux lecteurs d'écran */}
        {remediesWithRecommendation.length > 0 && safeRemedies.length > 0 && (
          <p
            className="text-lg text-neutral-600 dark:text-neutral-400"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-bold text-emerald-600 dark:text-emerald-500">
              {remediesWithRecommendation.length}
            </span>{" "}
            remède{remediesWithRecommendation.length > 1 ? "s" : ""} trouvé
            {remediesWithRecommendation.length > 1 ? "s" : ""}
          </p>
        )}

        {/* Liste des remèdes ou état vide */}
        <RemedyResultList
          remedies={remediesWithRecommendation}
          hasMatchingRemedies={safeRemedies.length > 0}
          selectedSymptoms={selectedSymptoms}
        />
      </div>
      <div className="animate-fade-in mt-12 flex w-full justify-center delay-1000 motion-reduce:animate-none motion-reduce:opacity-100">
        {/* Bouton Retour */}
        <Button
          as="link"
          to="/"
          variant="primary"
          ariaLabel="Retour à l'accueil"
        >
          Nouvelle recherche
        </Button>
      </div>

      {/* Feedback Section */}
      <FeedbackLink />

      {/* Modal de filtres par propriétés */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tempFilters={tempFilters}
        onToggleTempFilter={toggleTempFilter}
        onResetTempFilters={resetTempFilters}
        onApplyFilters={applyFilters}
      />

      {/* Modal Red Flags */}
      <RedFlagsModal
        isOpen={isRedFlagsModalOpen}
        onClose={closeRedFlagsModal}
        onComplete={handleRedFlagsComplete}
        answers={redFlagsAnswers}
        setAnswer={setRedFlagAnswer}
        disclaimerAccepted={disclaimerAccepted}
        acceptDisclaimer={acceptDisclaimer}
        allQuestionsAnswered={allQuestionsAnswered}
      />
    </>
  );
}

export default RemedyResult;
