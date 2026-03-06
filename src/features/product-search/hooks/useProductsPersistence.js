import { useMemo } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const STORAGE_KEY = "tradimedika-selected-products";

export function useProductsPersistence() {
  const [products, setProducts] = useLocalStorage(STORAGE_KEY, []);

  const validateProducts = (productsArray) => {
    if (!Array.isArray(productsArray)) return [];
    return productsArray.filter(
      (product) => typeof product === "string" && product.trim().length > 0,
    );
  };

  const validatedProducts = useMemo(
    () => validateProducts(products),
    [products],
  );

  const setProductsAndPersist = (newProducts) => {
    const validated = validateProducts(newProducts);
    setProducts(validated);
  };

  return [validatedProducts, setProductsAndPersist];
}
