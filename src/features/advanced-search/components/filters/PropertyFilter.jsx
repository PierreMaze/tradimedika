import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

/**
 * Filtre par propriétés thérapeutiques avec recherche et tags
 */
function PropertyFilter({ activeFilters, onToggle, uniqueProperties }) {
  const [search, setSearch] = useState("");

  const filteredProperties = useMemo(() => {
    if (!search.trim()) return uniqueProperties;
    const normalized = search.toLowerCase().trim();
    return uniqueProperties.filter((prop) =>
      prop.name.toLowerCase().includes(normalized),
    );
  }, [search, uniqueProperties]);

  const selectedProperties = useMemo(() => {
    return uniqueProperties.filter((prop) => activeFilters[prop.name]);
  }, [activeFilters, uniqueProperties]);

  return (
    <div className="space-y-2">
      {/* Barre de recherche */}
      <div className="relative">
        <IoSearchOutline
          className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrer les propriétés..."
          className="w-full rounded-md border border-neutral-300 bg-white py-1.5 pr-7 pl-8 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          aria-label="Filtrer la liste des propriétés"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            aria-label="Effacer le filtre"
          >
            <IoCloseCircle className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Tags des propriétés sélectionnées */}
      {selectedProperties.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedProperties.map((prop) => (
            <button
              key={prop.name}
              onClick={() => onToggle("properties", prop.name)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
              aria-label={`Retirer ${prop.name}`}
            >
              {capitalizeFirstLetter(prop.name, true)}
              <IoCloseCircle className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      {/* Liste des propriétés */}
      <div className="max-h-40 space-y-0.5 overflow-y-auto">
        {filteredProperties.map((prop) => (
          <label
            key={prop.name}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <input
              type="checkbox"
              checked={activeFilters[prop.name] || false}
              onChange={() => onToggle("properties", prop.name)}
              className="h-3.5 w-3.5 cursor-pointer rounded border-neutral-300 text-emerald-600 accent-emerald-700 dark:border-neutral-600 dark:accent-emerald-500"
            />
            <span className="text-xs text-neutral-700 dark:text-neutral-300">
              {capitalizeFirstLetter(prop.name, true)}
            </span>
            <span className="ml-auto text-xs text-neutral-400 dark:text-neutral-500">
              {prop.count}
            </span>
          </label>
        ))}
        {filteredProperties.length === 0 && (
          <p className="px-2 py-2 text-xs text-neutral-400 italic dark:text-neutral-500">
            Aucune propriété trouvée
          </p>
        )}
      </div>
    </div>
  );
}

PropertyFilter.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  uniqueProperties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default PropertyFilter;
