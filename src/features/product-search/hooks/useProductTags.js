// hooks/useProductTags.js
import { useState } from "react";
import useGAEvent from "../../../hooks/useGAEvent";
import { normalizeSymptom, normalizeForMatching } from "../utils/normalize";

/**
 * Hook personnalisé pour gérer la sélection de produits
 *
 * Fonctionnalités :
 * - Limite max: 5 produits
 * - Anti-doublon flexible (avec/sans accents)
 * - Stockage avec accents pour affichage correct
 * - Ajout/suppression avec validation
 * - Expose setSelectedProducts pour la feature search history
 *
 * @returns {{
 *   selectedProducts: string[],
 *   addProduct: (product: string) => void,
 *   removeProduct: (product: string) => void,
 *   isAtLimit: boolean,
 *   setSelectedProducts: (products: string[]) => void
 * }}
 */
export function useProductTags() {
  const trackEvent = useGAEvent();
  const [selectedProducts, setSelectedProducts] = useState([]);

  /**
   * Ajoute un produit à la liste avec validation
   * @param {string} product - Produit à ajouter
   */
  const addProduct = (product) => {
    const normalizedDisplay = normalizeSymptom(product.trim());
    const normalizedMatching = normalizeForMatching(product.trim());

    if (selectedProducts.length >= 5) {
      return;
    }

    const isDuplicate = selectedProducts.some(
      (s) => normalizeForMatching(s) === normalizedMatching,
    );

    if (!isDuplicate) {
      setSelectedProducts([...selectedProducts, normalizedDisplay]);

      trackEvent("product_selected", {
        product: normalizedDisplay,
        total_products: selectedProducts.length + 1,
      });
    }
  };

  /**
   * Supprime un produit de la liste
   * @param {string} productToRemove - Produit à supprimer
   */
  const removeProduct = (productToRemove) => {
    setSelectedProducts((prev) => prev.filter((s) => s !== productToRemove));
  };

  const isAtLimit = selectedProducts.length >= 5;

  return {
    selectedProducts,
    addProduct,
    removeProduct,
    isAtLimit,
    setSelectedProducts,
  };
}
