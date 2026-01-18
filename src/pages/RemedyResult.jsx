// tradimedika-v1/src/pages/RemedyResult.jsx

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import RemedyTagsHelper from "../components/ui/helper/RemedyTagsHelper";
import db from "../data/db.json";
import { AllergyFilterInfo, useAllergies } from "../features/allergens-search";
import {
  FilterRemedyResult,
  RemedyResultList,
  findMatchingRemedies,
} from "../features/remedy-result-page";
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
  const { canUseRemedy, userAllergies: contextAllergies } = useAllergies();

  // Récupérer symptômes depuis query params (priorité) ou state (fallback)
  const selectedSymptoms = useMemo(() => {
    // 1. Tenter de lire depuis query params (persistance refresh + URLs partageables)
    const searchParams = new URLSearchParams(location.search);
    const symptomsParam = searchParams.get("symptoms");

    if (symptomsParam) {
      // Parser et valider les symptômes (protection contre injections)
      return parseAndValidateSymptoms(symptomsParam);
    }

    // 2. Fallback sur location.state (backward compatibility)
    // Valider aussi les symptômes du state pour cohérence
    const stateSymptoms = location.state?.symptoms || [];
    return Array.isArray(stateSymptoms)
      ? stateSymptoms.filter((s) => typeof s === "string" && s.trim())
      : [];
  }, [location.search, location.state?.symptoms]);

  // Utiliser les allergies du contexte (persistées dans localStorage)
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

  // État uniquement pour les remèdes filtrés par les tags
  const [filteredRemedies, setFilteredRemedies] = useState(displayRemedies);

  // Synchroniser filteredRemedies avec displayRemedies
  useEffect(() => {
    setFilteredRemedies(displayRemedies);
  }, [displayRemedies]);

  // useCallback pour éviter re-renders en cascade dans FilterRemedyResult
  const handleFilterChange = useCallback((remedies) => {
    setFilteredRemedies(remedies);
  }, []);

  // Generate dynamic meta tags (memoizé pour optimisation)
  const { pageTitle, pageDescription, canonicalUrl } = useMemo(() => {
    const title =
      selectedSymptoms.length > 0
        ? `Remèdes pour ${selectedSymptoms.join(", ")} - TRADIMEDIKA`
        : "Résultats des remèdes - TRADIMEDIKA";

    const description =
      matchedRemedies.length > 0
        ? `${matchedRemedies.length} remède${matchedRemedies.length > 1 ? "s" : ""} naturel${matchedRemedies.length > 1 ? "s" : ""} trouvé${matchedRemedies.length > 1 ? "s" : ""} pour ${selectedSymptoms.join(", ")}`
        : `Recherche de remèdes naturels pour ${selectedSymptoms.join(", ")}`;

    const canonical =
      selectedSymptoms.length > 0
        ? `https://pierremaze.github.io/tradimedika/remedes?symptoms=${encodeURIComponent(selectedSymptoms.join(","))}`
        : "https://pierremaze.github.io/tradimedika/remedes";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-800"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </motion.div>
      <div className="text-dark dark:text-light mt-8 flex flex-col items-center gap-y-4 text-center transition duration-300 ease-in-out lg:mt-4">
        {/* Titre principal */}
        <h1 className="text-3xl font-bold lg:text-4xl">
          Résultats des Remèdes
        </h1>

        {/* Sous-titre avec symptômes sélectionnés */}
        {selectedSymptoms.length > 0 && (
          <p className="text-center text-base text-neutral-600 lg:text-lg dark:text-neutral-400">
            Remèdes naturels pour :{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {selectedSymptoms.join(", ")}
            </span>
          </p>
        )}

        {/* Filtres par tags (seulement si des remèdes safe ont été trouvés) */}
        {safeRemedies.length > 0 && (
          <FilterRemedyResult
            key={`filter-${selectedSymptoms.join("-")}-${resetFilterKey}`}
            matchedRemedies={displayRemedies}
            onFilterChange={handleFilterChange}
          />
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
        {filteredRemedies.length > 0 && safeRemedies.length > 0 && (
          <p
            className="text-lg text-neutral-600 dark:text-neutral-400"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-bold text-emerald-600 dark:text-emerald-500">
              {filteredRemedies.length}
            </span>{" "}
            remède{filteredRemedies.length > 1 ? "s" : ""} trouvé
            {filteredRemedies.length > 1 ? "s" : ""}
          </p>
        )}

        {/* Liste des remèdes ou état vide */}
        <RemedyResultList
          remedies={filteredRemedies}
          hasMatchingRemedies={safeRemedies.length > 0}
          selectedSymptoms={selectedSymptoms}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex w-full justify-center"
      >
        {/* Bouton Retour */}
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-800"
        >
          Nouvelle recherche
        </Link>
      </motion.div>
      <RemedyTagsHelper />
    </>
  );
}

export default RemedyResult;
