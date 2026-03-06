// src/hooks/useProductSubmit.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../../data/db.json";
import useGAEvent from "../../../hooks/useGAEvent";
import { createLogger } from "../../../utils/logger";
import { normalizeForMatching } from "../utils/normalize";

const logger = createLogger("useProductSubmit");

/**
 * Hook personnalisé pour gérer la soumission des produits sélectionnés
 *
 * Fonctionnalités :
 * - Validation (empêche soumission si aucun produit)
 * - État de chargement avec délai simulé (300-500ms)
 * - Recherche des produits correspondants par nom dans db.json
 * - Navigation avec query params (products)
 * - État "Recherche effectuée" pendant 2 secondes
 *
 * @param {Function} addSearch - Fonction pour ajouter une recherche à l'historique
 * @returns {Object} { handleSubmit, isLoading, results, hasSubmitted, error }
 */
export function useProductSubmit(addSearch) {
  const navigate = useNavigate();
  const trackEvent = useGAEvent();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Soumet les produits sélectionnés et recherche les correspondances dans db.json
   * @param {string[]} selectedProducts - Produits sélectionnés
   */
  const handleSubmit = (selectedProducts) => {
    // Validation : empêcher soumission vide
    if (!selectedProducts || selectedProducts.length === 0) {
      logger.warn("Impossible de soumettre sans produits");
      return;
    }

    // Reset les états précédents
    setError(null);
    setIsLoading(true);

    // Simuler un délai de recherche (300-500ms pour UX fluide)
    const delay = Math.floor(Math.random() * 200) + 300;

    setTimeout(() => {
      try {
        // Rechercher les produits correspondants par nom dans db.json
        const matchingProducts = db.filter((product) =>
          selectedProducts.some(
            (name) =>
              normalizeForMatching(product.name) === normalizeForMatching(name),
          ),
        );

        // Mettre à jour les résultats
        setResults(matchingProducts);
        setHasSubmitted(true);

        // Ajouter à l'historique de recherche
        if (typeof addSearch === "function") {
          addSearch(selectedProducts, matchingProducts.length);
        } else {
          logger.error("addSearch is not a function!", addSearch);
        }

        // Tracking Google Analytics
        trackEvent("product_search", {
          product_count: selectedProducts.length,
          products: selectedProducts.join(", "),
          results_count: matchingProducts.length,
        });

        // Navigation vers la page des résultats avec query params
        const productsParam = encodeURIComponent(selectedProducts.join(","));
        navigate(`/products?products=${productsParam}`, {
          state: { products: selectedProducts },
        });

        // Logging structuré pour debug
        logger.group("Résultats de recherche");
        logger.debug("Produits recherchés:", selectedProducts);
        logger.debug("Produits trouvés:", matchingProducts.length);

        if (matchingProducts.length > 0) {
          logger.table(
            matchingProducts.map((p) => ({
              nom: p.name,
              type: p.type,
            })),
          );
        } else {
          logger.debug("Aucun produit trouvé pour ces noms");
        }

        logger.groupEnd();
      } catch (err) {
        logger.error("Erreur lors de la recherche:", err);
        setError("Une erreur est survenue lors de la recherche");
      } finally {
        setIsLoading(false);
      }
    }, delay);
  };

  // Auto-reset de hasSubmitted après 2 secondes
  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setHasSubmitted(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSubmitted]);

  return {
    handleSubmit,
    isLoading,
    results,
    hasSubmitted,
    error,
  };
}
