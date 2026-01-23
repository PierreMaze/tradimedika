// components/remedy/RemedyResultList.jsx
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import RemedyCard from "./RemedyCard";
import RemedyResultNotFound from "./RemedyResultNotFound";

/**
 * Composant conteneur pour afficher la liste des remèdes
 * - Reçoit les remèdes filtrés en prop
 * - Affiche une grille responsive (1 col mobile → 2 cols tablet → 3 cols desktop)
 * - Affiche RemedyResultNotFound si aucun remède
 * - Utilise AnimatePresence pour les animations enter/exit
 * - Gère deux scénarios d'état vide (pas de résultats initiaux vs pas de correspondance après filtrage)
 */
export default function RemedyResultList({
  remedies,
  hasMatchingRemedies,
  selectedSymptoms,
}) {
  // Si aucun remède dans la liste filtrée
  if (remedies.length === 0) {
    // Si hasMatchingRemedies est true, cela signifie qu'il y a des résultats mais le filtre les exclut tous
    const variant = hasMatchingRemedies ? "no-filter-match" : "no-results";
    return (
      <RemedyResultNotFound
        variant={variant}
        showHomeButton={!hasMatchingRemedies}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Grille responsive pour les cartes de remèdes */}
      <AnimatePresence mode="sync">
        <div className="mx-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mx-4 lg:gap-12 xl:mx-6 xl:grid-cols-3">
          {remedies.map((result) => (
            <RemedyCard
              key={result.remedy.id}
              remedy={result.remedy}
              selectedSymptoms={selectedSymptoms}
              isFiltered={result.isFiltered || false}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

RemedyResultList.propTypes = {
  remedies: PropTypes.arrayOf(
    PropTypes.shape({
      remedy: PropTypes.object.isRequired,
      matchCount: PropTypes.number.isRequired,
      matchedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
      isFiltered: PropTypes.bool,
    }),
  ).isRequired,
  hasMatchingRemedies: PropTypes.bool.isRequired,
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
};
