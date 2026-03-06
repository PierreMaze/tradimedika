import PropTypes from "prop-types";
import ListProductTag from "./ListProductTag";
import { ProductsForm } from "./form";

/**
 * Composant ProductSearchSection - Section de recherche de produits
 *
 * Regroupe les composants de recherche :
 * - ProductsForm (input avec autocomplétion)
 * - ListProductTag (liste des produits sélectionnés)
 *
 * @param {Object} props
 * @param {Function} props.onProductSelect - Callback lors de la sélection d'un produit
 * @param {Function} props.onRemoveProduct - Callback lors de la suppression d'un produit
 * @param {string[]} props.selectedProducts - Liste des produits sélectionnés
 * @param {Function} props.onSubmit - Callback lors de la soumission du formulaire
 * @param {Function} [props.onFocus] - Callback optionnel lors du focus de l'input
 * @param {string} [props.placeholder] - Placeholder de l'input
 * @returns {JSX.Element}
 */
export default function ProductSearchSection({
  onProductSelect,
  onRemoveProduct,
  selectedProducts,
  onSubmit,
  onFocus,
  placeholder = "Rechercher un produit naturel...",
}) {
  return (
    <>
      {/* Input de recherche avec autocomplétion */}
      <ProductsForm
        onProductSelect={onProductSelect}
        onRemoveProduct={onRemoveProduct}
        selectedProducts={selectedProducts}
        onSubmit={onSubmit}
        onFocus={onFocus}
        placeholder={placeholder}
      />

      {/* Liste des produits sélectionnés */}
      <ListProductTag
        products={selectedProducts}
        onRemoveProduct={onRemoveProduct}
      />
    </>
  );
}

ProductSearchSection.propTypes = {
  onProductSelect: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
  selectedProducts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
};
