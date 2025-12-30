// tradimedika-v1/src/pages/RemedyResult.jsx

import { useCallback, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import FilterRemedyResult from "../components/filter/FilterRemedyResult";
import RemedyResultList from "../components/remedy/RemedyResultList";
import TagsInfoTooltip from "../components/tooltip/TagsInfoTooltip";
import db from "../data/db.json";
import { findMatchingRemedies } from "../utils/remedyMatcher";
import { parseAndValidateSymptoms } from "../utils/validation";

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

  // Calcul des remèdes matchés avec useMemo pour optimisation
  const matchedRemedies = useMemo(
    () => findMatchingRemedies(selectedSymptoms, db),
    [selectedSymptoms],
  );

  // État uniquement pour les remèdes filtrés par les tags
  const [filteredRemedies, setFilteredRemedies] = useState(matchedRemedies);

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
        className="mb-6 flex items-center gap-3"
      >
        <Link
          to="/"
          aria-label="Retour à l'accueil"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
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
      <div className="text-dark dark:text-light flex flex-col items-center text-center transition duration-300 ease-in-out">
        {/* Titre principal */}
        <h1 className="mb-6 text-3xl font-bold lg:text-4xl">
          Résultats des Remèdes
        </h1>

        {/* Sous-titre avec symptômes sélectionnés */}
        {selectedSymptoms.length > 0 && (
          <p className="mb-6 text-center text-base text-neutral-600 lg:text-lg dark:text-neutral-400">
            Remèdes naturels pour:{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-500">
              {selectedSymptoms.join(", ")}
            </span>
          </p>
        )}

        {/* Filtres par tags (seulement si des remèdes ont été trouvés) */}
        {matchedRemedies.length > 0 && (
          <FilterRemedyResult
            key={selectedSymptoms.join("-")}
            matchedRemedies={matchedRemedies}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Compteur de résultats (seulement si des remèdes sont affichés après filtrage) */}
        {/* aria-live pour annoncer les changements aux lecteurs d'écran */}
        {filteredRemedies.length > 0 && matchedRemedies.length > 0 && (
          <p
            className="mb-6 text-lg text-neutral-600 dark:text-neutral-400"
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
          hasMatchingRemedies={matchedRemedies.length > 0}
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
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        >
          Nouvelle recherche
        </Link>
      </motion.div>
      <TagsInfoTooltip />
    </>
  );
}

export default RemedyResult;
