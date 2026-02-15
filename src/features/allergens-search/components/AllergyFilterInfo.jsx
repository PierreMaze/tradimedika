// components/info/AllergyFilterInfo.jsx
import PropTypes from "prop-types";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { TbEyeClosed } from "react-icons/tb";

import allergensList from "../../../data/allergensList.json";

/**
 * Composant d'information sur le filtrage des produits
 * Affiche un message quand des produits sont masqués à cause des allergies
 *
 * Design: Bordure bleue avec icône d'alerte
 */
export default function AllergyFilterInfo({
  filteredCount,
  userAllergies,
  showFiltered,
  onToggleFiltered,
}) {
  if (filteredCount === 0 || userAllergies.length === 0) {
    return null;
  }

  // Récupérer les noms des allergènes pour affichage
  const allergenNames = userAllergies
    .map((id) => {
      const allergen = allergensList.find((a) => a.id === id);
      return allergen ? allergen.name.toLowerCase() : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-3 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 duration-300 motion-reduce:animate-none dark:border-emerald-400/60 dark:bg-emerald-950/80"
    >
      {/* Contenu principal */}
      <div className="flex items-start gap-4">
        <TbEyeClosed
          className="mt-0.5 shrink-0 rounded-md bg-emerald-100 p-2 text-4xl text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
          aria-hidden="true"
        />

        <div className="flex-1 text-start">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="font-bold">{filteredCount}</span> remède
            {filteredCount > 1 ? "s" : ""} masqué{filteredCount > 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-sm font-medium text-emerald-900 dark:text-emerald-50">
            {filteredCount > 1 ? "Ils contiennent" : "Il contient"} vos
            allergènes :{" "}
            <span className="font-semibold text-emerald-600 capitalize dark:text-emerald-400">
              {allergenNames}
            </span>
          </p>
        </div>
      </div>

      {/* Bouton toggle en bas à droite */}
      <div className="flex justify-end">
        <button
          onClick={onToggleFiltered}
          aria-label={
            showFiltered
              ? "Masquer les produits filtrés"
              : "Afficher les produits filtrés"
          }
          aria-pressed={showFiltered}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300 focus:outline-none active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          {showFiltered ? (
            <>
              <HiEyeSlash className="h-5 w-5" aria-hidden="true" />
              <span>Masquer</span>
            </>
          ) : (
            <>
              <HiEye className="h-5 w-5" aria-hidden="true" />
              <span>Afficher</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

AllergyFilterInfo.propTypes = {
  filteredCount: PropTypes.number.isRequired,
  userAllergies: PropTypes.arrayOf(PropTypes.string).isRequired,
  showFiltered: PropTypes.bool.isRequired,
  onToggleFiltered: PropTypes.func.isRequired,
};
