import PropTypes from "prop-types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function AlphabetFilter({ selectedLetters = [], onToggle }) {
  return (
    <div className="px-4 pb-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {ALPHABET.map((letter) => {
          const isActive = selectedLetters.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => onToggle(letter)}
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

AlphabetFilter.propTypes = {
  selectedLetters: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
};

export default AlphabetFilter;
