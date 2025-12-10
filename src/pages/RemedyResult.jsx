// tradimedika-v1/src/pages/RemedyResult.jsx

import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterRemedyResult from "../components/filter/FilterRemedyResult";
import db from "../data/db.json";
import { findMatchingRemedies } from "../utils/remedyMatcher";

/**
 * RemedyResult Page - Affiche les remèdes correspondant aux symptômes sélectionnés
 *
 * Fonctionnalités:
 * - Récupère les symptômes depuis Hero via useLocation (React Router state)
 * - Calcule les remèdes matchés avec findMatchingRemedies()
 * - Permet le filtrage par tags/symptômes via FilterRemedyResult
 * - Affiche un message d'état vide si aucun remède trouvé
 * - Placeholder pour RemedyList (sera implémenté dans Issue #41)
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
    <div className="text-dark dark:text-light flex flex-col items-center text-center transition duration-300 ease-in-out">
      {/* Titre principal */}
      <h1 className="mb-6 text-3xl font-bold lg:text-4xl">
        Résultats des Remèdes
      </h1>

      {/* Sous-titre avec symptômes sélectionnés */}
      {selectedSymptoms.length > 0 && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-base lg:text-lg">
          Remèdes naturels pour:{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-500">
            {selectedSymptoms.join(", ")}
          </span>
        </p>
      )}

      {/* Cas 1: Remèdes trouvés */}
      {matchedRemedies.length > 0 ? (
        <>
          {/* Filtres par tags (seulement si au moins 2 tags disponibles) */}
          <FilterRemedyResult
            key={selectedSymptoms.join("-")}
            matchedRemedies={matchedRemedies}
            onFilterChange={setFilteredRemedies}
          />

          {/* Cas 1a: Résultats après filtrage */}
          {filteredRemedies.length > 0 ? (
            <div className="w-full">
              {/* Compteur de résultats */}
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
                <span className="font-bold text-emerald-600 dark:text-emerald-500">
                  {filteredRemedies.length}
                </span>{" "}
                remède{filteredRemedies.length > 1 ? "s" : ""} trouvé
                {filteredRemedies.length > 1 ? "s" : ""}
              </p>

              {/* Liste des remèdes (placeholder pour Issue #41) */}
              <div className="space-y-4">
                {filteredRemedies.map((result) => (
                  <div
                    key={result.remedy.id}
                    className="border-dark/20 dark:border-light/20 bg-light dark:bg-dark rounded-lg border p-6 text-left shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                  >
                    <h3 className="text-dark dark:text-light mb-2 text-xl font-semibold lg:text-2xl">
                      {result.remedy.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-sm">
                      <span className="font-medium text-emerald-600 dark:text-emerald-500">
                        {result.matchCount}
                      </span>{" "}
                      symptôme{result.matchCount > 1 ? "s" : ""} en commun:{" "}
                      {result.matchedSymptoms.join(", ")}
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                      {result.remedy.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Note pour développement */}
              <p className="text-neutral-500 dark:text-neutral-500 mt-8 text-xs italic">
                🚧 RemedyCard et RemedyList seront implémentés dans Issue #41
              </p>
            </div>
          ) : (
            // Cas 1b: Aucun remède après filtrage par tag
            <div className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 w-full max-w-2xl rounded-lg border-2 border-dashed p-8 transition duration-300 ease-in-out">
              <p className="text-amber-700 dark:text-amber-400 mb-2 text-lg font-semibold">
                ⚠️ Aucun remède ne correspond au filtre sélectionné
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Essayez de sélectionner un autre tag pour voir plus de résultats
              </p>
            </div>
          )}
        </>
      ) : (
        // Cas 2: Aucun remède trouvé pour les symptômes
        <div className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 w-full max-w-2xl rounded-lg border-2 border-dashed p-8 transition duration-300 ease-in-out">
          <p className="text-neutral-600 dark:text-neutral-400 mb-2 text-lg font-semibold">
            Aucun remède trouvé pour ces symptômes
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">
            Essayez d&apos;autres symptômes ou reformulez votre recherche
          </p>
        </div>
      )}
    </div>
  );
}

export default RemedyResult;
