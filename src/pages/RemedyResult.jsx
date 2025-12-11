// tradimedika-v1/src/pages/RemedyResult.jsx

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FilterRemedyResult from "../components/filter/FilterRemedyResult";
import RemedyResultList from "../components/remedy/RemedyResultList";
import db from "../data/db.json";
import { findMatchingRemedies } from "../utils/remedyMatcher";

/**
 * RemedyResult Page - Affiche les remèdes correspondant aux symptômes sélectionnés
 *
 * Fonctionnalités:
 * - Récupère les symptômes depuis Hero via useLocation (React Router state)
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

  // useMemo pour éviter recalcul des symptômes à chaque render
  const selectedSymptoms = useMemo(
    () => location.state?.symptoms || [],
    [location.state?.symptoms],
  );

  // Calcul des remèdes matchés avec useMemo pour optimisation
  const matchedRemedies = useMemo(
    () => findMatchingRemedies(selectedSymptoms, db),
    [selectedSymptoms],
  );

  // État uniquement pour les remèdes filtrés par les tags
  const [filteredRemedies, setFilteredRemedies] = useState(matchedRemedies);

  return (
    <>
      {/* Bouton Retour */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
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
            onFilterChange={setFilteredRemedies}
          />
        )}

        {/* Compteur de résultats (seulement si des remèdes sont affichés après filtrage) */}
        {filteredRemedies.length > 0 && matchedRemedies.length > 0 && (
          <p className="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
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
    </>
  );
}

export default RemedyResult;
