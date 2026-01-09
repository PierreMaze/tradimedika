// components/info/AllergyFilterInfo.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoMdAlert } from "react-icons/io";
import allergensList from "../../data/allergensList.json";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Composant d'information sur le filtrage des remèdes
 * Affiche un message quand des remèdes sont masqués à cause des allergies
 *
 * Design: Bordure bleue avec icône d'alerte
 */
export default function AllergyFilterInfo({ filteredCount, userAllergies }) {
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
      className="mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-emerald-500 bg-emerald-50 p-4 dark:border-emerald-400 dark:bg-emerald-900/30"
    >
      <IoMdAlert
        className="mt-0.5 flex shrink-0 text-xl text-emerald-600 dark:text-emerald-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-50">
          <span className="font-bold">{filteredCount}</span> remède
          {filteredCount > 1 ? "s" : ""} masqué{filteredCount > 1 ? "s" : ""}
        </p>
        <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
          {filteredCount > 1 ? "Ils contiennent" : "Il contient"} vos allergènes
          :{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {allergenNames}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

AllergyFilterInfo.propTypes = {
  filteredCount: PropTypes.number.isRequired,
  userAllergies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
