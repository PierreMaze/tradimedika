// components/filter/FilterRemedyResult.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { normalizeForMatching } from "../../utils/normalizeSymptom";
import ListFilterTag from "./ListFilterTag";

/**
 * Extrait les symptômes uniques des remèdes matchés et les trie alphabétiquement
 * - Pure function pour calculer les tags disponibles
 * - Évite les doublons avec Set
 * - Tri alphabétique avec localeCompare français
 *
 * @param {Array} matchedRemedies - Tableau des remèdes matchés
 * @returns {Array<string>} - Tableau des symptômes uniques triés
 */
function extractUniqueSymptoms(matchedRemedies) {
  const symptoms = new Set();

  matchedRemedies.forEach((result) => {
    result.matchedSymptoms.forEach((symptom) => {
      symptoms.add(symptom);
    });
  });

  return Array.from(symptoms).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}

/**
 * Composant conteneur pour le filtrage des remèdes par tags
 * - Gère l'état du tag actif (radio button behavior)
 * - Calcule les remèdes filtrés dynamiquement (React Compiler optimise automatiquement)
 * - Notifie le parent via callback à chaque changement
 * - Tag "Tous" toujours actif par défaut
 *
 * Architecture:
 * - State minimal (activeTag uniquement)
 * - Calcul dérivé direct pendant render (pas de useMemo nécessaire)
 * - Pure function pour extraction des symptômes
 */
export default function FilterRemedyResult({ matchedRemedies, onFilterChange }) {
  const [activeTag, setActiveTag] = useState("all");

  // Extraire symptômes uniques et créer la liste des tags (ordre alphabétique)
  const uniqueSymptoms = extractUniqueSymptoms(matchedRemedies);
  const availableTags = ["all", ...uniqueSymptoms];

  // Calcul direct des remèdes filtrés pendant render
  // React Compiler (babel-plugin-react-compiler) gère l'optimisation automatiquement
  const filteredRemedies =
    activeTag === "all"
      ? matchedRemedies
      : matchedRemedies.filter((result) =>
          result.matchedSymptoms.some(
            (symptom) =>
              normalizeForMatching(symptom) === normalizeForMatching(activeTag),
          ),
        );

  // Notifier le parent du changement de filtre
  useEffect(() => {
    onFilterChange(filteredRemedies);
  }, [filteredRemedies, onFilterChange]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  // Afficher seulement si au moins 2 tags (Tous + 1 symptôme minimum)
  if (availableTags.length <= 1) {
    return null;
  }

  return (
    <div className="mb-6 w-full">
      <ListFilterTag
        tags={availableTags}
        activeTag={activeTag}
        onTagClick={handleTagClick}
      />
    </div>
  );
}

FilterRemedyResult.propTypes = {
  matchedRemedies: PropTypes.arrayOf(
    PropTypes.shape({
      remedy: PropTypes.object.isRequired,
      matchCount: PropTypes.number.isRequired,
      matchedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
