import PropTypes from "prop-types";
import { IoSearchOutline } from "react-icons/io5";
import SearchResultCard from "./SearchResultCard";

/**
 * Grille de résultats de la recherche avancée
 */
function SearchResults({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <IoSearchOutline
          className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-600"
          aria-hidden="true"
        />
        <h3 className="mb-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Aucun produit trouvé
        </h3>
        <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">
          Essayez de modifier vos filtres ou de réduire vos critères de
          recherche pour obtenir plus de résultats.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <SearchResultCard key={product.id} product={product} />
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
