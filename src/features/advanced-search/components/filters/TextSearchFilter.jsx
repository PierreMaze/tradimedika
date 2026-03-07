import PropTypes from "prop-types";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";

/**
 * Input de recherche textuelle par nom de produit
 */
function TextSearchFilter({ value, onChange }) {
  return (
    <div className="px-4 pb-3">
      <div className="relative">
        <IoSearchOutline
          className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full rounded-lg border border-neutral-300 bg-white py-2 pr-8 pl-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          aria-label="Rechercher un produit par nom"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            aria-label="Effacer la recherche"
          >
            <IoCloseCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

TextSearchFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextSearchFilter;
