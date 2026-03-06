// components/tag/ListProductTag.jsx
import PropTypes from "prop-types";
import { SymptomTag } from "../../../components/tags";

/**
 * Composant conteneur pour afficher la liste des tags de produits sélectionnés
 * - Responsive: centré sur mobile, aligné à gauche sur desktop
 * - Animations avec Tailwind CSS pour enter/exit smooth
 * - Retourne null si aucun produit (pas de DOM inutile)
 */
export default function ListProductTag({ products, onRemoveProduct }) {
  if (products.length === 0) return null;

  return (
    <div className="animate-fade-in-down mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 motion-reduce:animate-none motion-reduce:opacity-100 lg:justify-start">
      {products.map((product) => (
        <SymptomTag
          key={product}
          symptom={product}
          onRemove={onRemoveProduct}
        />
      ))}
    </div>
  );
}

ListProductTag.propTypes = {
  products: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
