import PropTypes from "prop-types";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function CatalogSearch({
  searchQuery,
  onSearchChange,
  selectedLetter,
  onLetterClick,
}) {
  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="relative flex items-center">
        <HiMagnifyingGlass
          className="absolute left-4 h-5 w-5 text-neutral-500 dark:text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un produit naturel..."
          className="w-full rounded-lg border border-neutral-300 bg-white py-3 pr-10 pl-12 text-neutral-900 shadow-sm ring-2 ring-neutral-600 transition duration-150 ease-in-out placeholder:text-neutral-400 hover:border-neutral-400 focus:border-emerald-600 focus:ring-emerald-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-500 dark:placeholder:text-neutral-500 dark:hover:border-neutral-600 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
          aria-label="Rechercher un produit naturel"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 cursor-pointer rounded-md p-1 text-neutral-500 transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            aria-label="Effacer la recherche"
            type="button"
          >
            <IoMdClose className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {ALPHABET.map((letter) => {
          const isActive = selectedLetter === letter;
          return (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md font-semibold shadow-sm transition duration-150 ease-in-out focus:ring-2 focus:ring-emerald-600 focus:outline-none ${
                isActive
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                  : "border border-neutral-300 bg-white text-neutral-700 hover:border-emerald-600 hover:bg-emerald-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-emerald-600 dark:hover:bg-neutral-700"
              }`}
              aria-label={`Filtrer par la lettre ${letter}`}
              aria-pressed={isActive}
              type="button"
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CatalogSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedLetter: PropTypes.string,
  onLetterClick: PropTypes.func.isRequired,
};

export default CatalogSearch;
