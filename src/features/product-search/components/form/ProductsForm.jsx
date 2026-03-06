// tradimedika/src/features/product-search/components/form/ProductsForm.jsx
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiExclamationTriangle, HiMagnifyingGlass } from "react-icons/hi2";
import db from "../../../../data/db.json";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { createLogger } from "../../../../utils/logger";
import { useLRUCache } from "../../hooks/useLRUCache";
import { normalizeForMatching } from "../../utils/normalize";

const logger = createLogger("ProductsForm");

// Extraire les noms de produits depuis db.json
const PRODUCT_NAMES = db.map((product) => product.name);

// Fonction pour capitaliser la première lettre
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Vérifier si un produit est déjà sélectionné (insensible aux accents)
const isProductSelected = (productName, selectedProducts) => {
  return selectedProducts.some(
    (selected) =>
      normalizeForMatching(productName) === normalizeForMatching(selected),
  );
};

export default function ProductsForm({
  onProductSelect,
  onRemoveProduct,
  selectedProducts = [],
  placeholder = "Rechercher un produit naturel...",
  onSubmit = null,
  onFocus = null,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isForcedClosed, setIsForcedClosed] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // LRU cache for normalization
  const { get: getCachedNormalized } = useLRUCache(200);

  // Validation initiale du JSON
  useEffect(() => {
    if (!Array.isArray(db)) {
      logger.error("Error: db.json is not a valid array");
      return;
    }
    if (db.length === 0) {
      logger.warn("Warning: db.json is empty");
      return;
    }
    logger.debug(`Successfully loaded ${db.length} products from db.json`);
  }, []);

  // Filtrage en temps réel par nom de produit
  const filteredProducts = useMemo(() => {
    if (inputValue.trim() === "") {
      return [];
    }

    const normalizedInput = getCachedNormalized(
      inputValue,
      normalizeForMatching,
    );

    // Chercher dans les noms de produits
    const directMatches = PRODUCT_NAMES.filter((name) => {
      const normalizedName = getCachedNormalized(name, normalizeForMatching);
      return normalizedName.includes(normalizedInput);
    });

    // Séparer exact matches et partial matches
    const exactMatches = directMatches.filter(
      (name) =>
        getCachedNormalized(name, normalizeForMatching) === normalizedInput,
    );
    const partialMatches = directMatches.filter(
      (name) =>
        getCachedNormalized(name, normalizeForMatching) !== normalizedInput,
    );

    // Combiner : exact d'abord, puis partial
    const combinedResults = [...exactMatches, ...partialMatches];

    // Dédupliquer et filtrer les produits déjà sélectionnés
    const uniqueResults = [...new Set(combinedResults)];
    return uniqueResults
      .filter((name) => !isProductSelected(name, selectedProducts))
      .slice(0, 10);
  }, [inputValue, selectedProducts, getCachedNormalized]);

  const isOpen =
    !isForcedClosed && filteredProducts.length > 0 && inputValue.trim() !== "";

  // Réinitialise selectedIndex quand inputValue change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Réinitialisation intentionnelle de l'état UI
    setSelectedIndex(-1);
    setIsForcedClosed(false);
  }, [inputValue]);

  // Gestion de la sélection d'un produit
  const handleSelectProduct = (product) => {
    setInputValue("");
    setSelectedIndex(-1);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  // Gestion du clavier
  const handleKeyDown = (e) => {
    // Backspace sur input vide → supprime le dernier tag
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedProducts.length > 0
    ) {
      e.preventDefault();
      const lastProduct = selectedProducts[selectedProducts.length - 1];
      if (onRemoveProduct) {
        onRemoveProduct(lastProduct);
      }
      return;
    }

    if (!isOpen || filteredProducts.length === 0) {
      if (e.key === "Escape") {
        setInputValue("");
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredProducts.length - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
          handleSelectProduct(filteredProducts[selectedIndex]);
        } else if (filteredProducts.length === 1) {
          handleSelectProduct(filteredProducts[0]);
        } else if (!isOpen && selectedProducts.length > 0 && onSubmit) {
          onSubmit();
        }
        break;

      case "Escape":
        e.preventDefault();
        setSelectedIndex(-1);
        setInputValue("");
        break;

      case "Tab":
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleInputFocus = useCallback(
    (e) => {
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  // Scroll automatique vers l'élément sélectionné
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  // Fermeture au clic extérieur
  useClickOutside(
    containerRef,
    () => {
      setIsForcedClosed(true);
      setSelectedIndex(-1);
    },
    true,
  );

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      {/* Input avec icône de recherche */}
      <div className="border-dark/10 relative flex items-center rounded-lg border shadow-sm dark:border-neutral-700">
        <HiMagnifyingGlass className="text-dark/60 dark:text-light absolute left-4 text-xl transition-colors duration-150 ease-in-out" />
        <input
          ref={inputRef}
          type="text"
          name="products"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={selectedProducts.length >= 5}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="products-listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            selectedIndex >= 0 ? `product-option-${selectedIndex}` : undefined
          }
          className={`text-dark dark:bg-dark dark:text-light w-full rounded-lg bg-white py-4 pr-4 pl-12 text-sm ring-2 ring-neutral-600 transition-colors duration-150 ease-in-out placeholder:text-neutral-700 focus:ring-emerald-600 focus:outline-none lg:text-base 2xl:text-lg dark:ring-neutral-500 dark:placeholder:text-neutral-400 dark:focus:ring-emerald-500 ${
            selectedProducts.length >= 5 ? "cursor-not-allowed opacity-50" : ""
          }`}
        />
      </div>

      {/* Message de limite atteinte */}
      {selectedProducts.length >= 5 && (
        <div className="animate-in fade-in slide-in-from-top-2 mt-2 flex items-center gap-2 rounded-lg border-2 border-dashed border-amber-700/60 bg-amber-50 px-4 py-2 duration-150 motion-reduce:animate-none dark:border-amber-400/60 dark:bg-amber-950">
          <HiExclamationTriangle className="text-lg text-amber-700 dark:text-amber-400" />
          <p className="text-sm font-medium tracking-wider text-amber-800 dark:text-amber-100">
            Limite de 5 produits atteinte.
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              {" "}
              Supprimez-en un
            </span>{" "}
            ou
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              {" "}
              continuer
            </span>
            .
          </p>
        </div>
      )}

      {/* Dropdown des suggestions */}
      {isOpen && (
        <ul
          ref={listRef}
          id="products-listbox"
          role="listbox"
          className="dark:bg-dark absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg transition duration-100 ease-in-out dark:border-neutral-700"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={product}
                id={`product-option-${index}`}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleSelectProduct(product)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`cursor-pointer px-4 py-3 text-sm tracking-wider transition-colors duration-150 ease-in-out lg:text-base 2xl:text-lg ${
                  selectedIndex === index
                    ? "bg-emerald-600 text-white"
                    : "text-dark dark:text-light hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {capitalize(product)}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-center text-sm text-neutral-600 italic lg:text-base 2xl:text-lg dark:text-neutral-400">
              Aucun résultat trouvé
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

ProductsForm.propTypes = {
  onProductSelect: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func,
  selectedProducts: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onFocus: PropTypes.func,
};
