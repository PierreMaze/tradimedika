import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import allergensList from "../../../../data/allergensList.json";

/**
 * Filtre multi-select pour exclure des allergènes
 * Avec recherche intégrée dans la liste
 */
function AllergenFilter({ excludedAllergens, onToggle }) {
  const [search, setSearch] = useState("");

  const filteredAllergens = useMemo(() => {
    if (!search.trim()) return allergensList;
    const normalized = search.toLowerCase().trim();
    return allergensList.filter(
      (a) =>
        a.name.toLowerCase().includes(normalized) ||
        a.id.toLowerCase().includes(normalized),
    );
  }, [search]);

  return (
    <div className="space-y-2">
      {/* Mini recherche */}
      <div className="relative">
        <IoSearchOutline
          className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrer les allergènes..."
          className="w-full rounded-md border border-neutral-300 bg-white py-1.5 pr-7 pl-8 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          aria-label="Filtrer la liste des allergènes"
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

      {/* Tags des allergènes sélectionnés */}
      {excludedAllergens.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {excludedAllergens.map((id) => {
            const allergen = allergensList.find((a) => a.id === id);
            return (
              <button
                key={id}
                onClick={() => onToggle(id)}
                className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                aria-label={`Retirer ${allergen?.name || id}`}
              >
                {allergen?.name || id}
                <IoCloseCircle className="h-3 w-3" />
              </button>
            );
          })}
        </div>
      )}

      {/* Liste des allergènes */}
      <div className="max-h-40 space-y-0.5 overflow-y-auto">
        {filteredAllergens.map((allergen) => (
          <label
            key={allergen.id}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <input
              type="checkbox"
              checked={excludedAllergens.includes(allergen.id)}
              onChange={() => onToggle(allergen.id)}
              className="h-3.5 w-3.5 cursor-pointer rounded border-neutral-300 text-red-600 accent-red-600 dark:border-neutral-600 dark:accent-red-500"
            />
            <span className="text-xs text-neutral-700 dark:text-neutral-300">
              {allergen.name}
            </span>
          </label>
        ))}
        {filteredAllergens.length === 0 && (
          <p className="px-2 py-2 text-xs text-neutral-400 italic dark:text-neutral-500">
            Aucun allergène trouvé
          </p>
        )}
      </div>
    </div>
  );
}

AllergenFilter.propTypes = {
  excludedAllergens: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AllergenFilter;
