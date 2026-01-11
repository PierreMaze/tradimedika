// components/info/AllergyFilterInfo.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { IoMdAlert } from "react-icons/io";
import allergensList from "../../data/allergensList.json";
import { useReducedMotion } from "../../features/settings";

/**
 * Composant d'information sur le filtrage des remèdes
 * Affiche un message quand des remèdes sont masqués à cause des allergies
 *
 * Design: Bordure bleue avec icône d'alerte
 */
export default function AllergyFilterInfo({
  filteredCount,
  userAllergies,
  showFiltered,
  onToggleFiltered,
}) {
  const prefersReducedMotion = useReducedMotion();

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
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? {} : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      className="flex flex-col gap-3 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 dark:border-emerald-400/60 dark:bg-emerald-950/80"
    >
      {/* Contenu principal */}
      <div className="flex items-start gap-4">
        <IoMdAlert
          className="mt-0.5 flex shrink-0 text-xl text-emerald-600 dark:text-emerald-400"
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
        <motion.button
          onClick={onToggleFiltered}
          aria-label={
            showFiltered
              ? "Masquer les remèdes filtrés"
              : "Afficher les remèdes filtrés"
          }
          aria-pressed={showFiltered}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-500 dark:hover:bg-emerald-600"
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
        </motion.button>
      </div>
    </motion.div>
  );
}

AllergyFilterInfo.propTypes = {
  filteredCount: PropTypes.number.isRequired,
  userAllergies: PropTypes.arrayOf(PropTypes.string).isRequired,
  showFiltered: PropTypes.bool.isRequired,
  onToggleFiltered: PropTypes.func.isRequired,
};
