// components/product/ProductResultList.jsx
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import ProductResultNotFound from "./ProductResultNotFound";

/**
 * Composant conteneur pour afficher la liste des produits
 * - Reçoit les produits filtrés en prop
 * - Affiche une grille responsive (1 col mobile → 2 cols tablet → 3 cols desktop)
 * - Affiche ProductResultNotFound si aucun produit
 * - Utilise animations Tailwind pour les animations enter/exit
 * - Gère deux scénarios d'état vide (pas de résultats initiaux vs pas de correspondance après filtrage)
 */
export default function ProductResultList({
  products,
  hasMatchingProducts,
  selectedSymptoms,
}) {
  // Si aucun produit dans la liste filtrée
  if (products.length === 0) {
    // Si hasMatchingProducts est true, cela signifie qu'il y a des résultats mais le filtre les exclut tous
    const variant = hasMatchingProducts ? "no-filter-match" : "no-results";
    return (
      <ProductResultNotFound
        variant={variant}
        showHomeButton={!hasMatchingProducts}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Grille responsive pour les cartes de produits */}
      <div className="mx-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mx-4 lg:gap-12 xl:mx-6 xl:grid-cols-3">
        {products.map((result) => (
          <ProductCard
            key={result.product.id}
            product={result.product}
            selectedSymptoms={selectedSymptoms}
            matchedSymptoms={result.matchedSymptoms}
            isFiltered={result.isFiltered || false}
            isRecommended={result.isRecommended || false}
          />
        ))}
      </div>
    </div>
  );
}

ProductResultList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.object.isRequired,
      matchCount: PropTypes.number.isRequired,
      matchedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
      isFiltered: PropTypes.bool,
      isRecommended: PropTypes.bool,
    }),
  ).isRequired,
  hasMatchingProducts: PropTypes.bool.isRequired,
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
};
