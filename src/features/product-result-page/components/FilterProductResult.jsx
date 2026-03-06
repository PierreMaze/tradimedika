// components/filter/FilterProductResult.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ListAllergyTag } from "../../allergens-search";
import { normalizeForMatching } from "../../product-search/utils/normalize";

/**
 * Extrait les symptômes uniques des produits matchés et les trie alphabétiquement
 * - Pure function pour calculer les tags disponibles
 * - Évite les doublons avec Set
 * - Tri alphabétique avec localeCompare français
 *
 * @param {Array} matchedProducts - Tableau des produits matchés
 * @returns {Array<string>} - Tableau des symptômes uniques triés
 */
function extractUniqueSymptoms(matchedProducts) {
  const symptoms = new Set();

  matchedProducts.forEach((result) => {
    if (result.matchedSymptoms) {
      result.matchedSymptoms.forEach((symptom) => {
        symptoms.add(symptom);
      });
    }
  });

  return Array.from(symptoms).sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" }),
  );
}

/**
 * Composant conteneur pour le filtrage des produits par tags
 * - Gère l'état du tag actif (radio button behavior)
 * - Calcule les produits filtrés dynamiquement (React Compiler optimise automatiquement)
 * - Notifie le parent via callback à chaque changement
 * - Tag "Tous" toujours actif par défaut
 *
 * Architecture:
 * - State minimal (activeTag uniquement)
 * - Calcul dérivé direct pendant render (pas de useMemo nécessaire)
 * - Pure function pour extraction des symptômes
 */
export default function FilterProductResult({
  matchedProducts,
  onFilterChange,
}) {
  const [activeTag, setActiveTag] = useState("all");

  // Extraire symptômes uniques et créer la liste des tags (ordre alphabétique)
  const uniqueSymptoms = extractUniqueSymptoms(matchedProducts);
  const availableTags = ["all", ...uniqueSymptoms];

  // Calcul direct des produits filtrés pendant render
  // React Compiler (babel-plugin-react-compiler) gère l'optimisation automatiquement
  const filteredProducts =
    activeTag === "all"
      ? matchedProducts
      : matchedProducts.filter((result) =>
          result.matchedSymptoms?.some(
            (symptom) =>
              normalizeForMatching(symptom) === normalizeForMatching(activeTag),
          ),
        );

  // Notifier le parent du changement de filtre
  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  // Masquer si un seul symptôme unique ou moins
  // uniqueSymptoms.length <= 1 → Pas de choix de filtrage utile
  if (uniqueSymptoms.length <= 1) {
    return null;
  }

  return (
    <ListAllergyTag
      tags={availableTags}
      activeTag={activeTag}
      onTagClick={handleTagClick}
    />
  );
}

FilterProductResult.propTypes = {
  matchedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.object.isRequired,
      matchCount: PropTypes.number.isRequired,
      matchedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
