import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { useClickOutside } from "../../../hooks/useClickOutside";
import AllergySelector from "./AllergySelector";

/**
 * Composant AllergySectionToggle - Section allergies avec checkbox et dropdown
 *
 * Affiche :
 * - Checkbox "Vous avez des allergies ?"
 * - Badge compteur si allergies > 0
 * - Bouton Afficher/Masquer pour le dropdown
 * - Section collapse avec AllergySelector
 *
 * @param {Object} props
 * @param {boolean} props.isFilteringEnabled - État de la checkbox (activé/désactivé)
 * @param {Function} props.onFilteringChange - Callback lors du changement de la checkbox
 * @param {string[]} props.userAllergies - Liste des allergies sélectionnées
 * @param {boolean} props.isExpanded - État du dropdown (ouvert/fermé)
 * @param {Function} props.onExpandChange - Callback lors du changement d'état du dropdown
 * @returns {JSX.Element}
 */
export default function AllergySectionToggle({
  isFilteringEnabled,
  onFilteringChange,
  userAllergies,
  isExpanded,
  onExpandChange,
}) {
  const allergySectionRef = useRef(null);

  // Fermer la section allergies au clic extérieur
  useClickOutside(
    allergySectionRef,
    () => onExpandChange(false),
    isExpanded, // Actif seulement quand expanded
  );

  return (
    <div
      ref={allergySectionRef}
      className="relative mx-auto w-full max-w-2xl space-y-3"
    >
      {/* Checkbox + Badge + Dropdown button */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isFilteringEnabled}
            onChange={(e) => {
              const isChecked = e.target.checked;
              onFilteringChange(isChecked);
              // Si on coche, ouvrir le dropdown. Si on décoche, fermer
              onExpandChange(isChecked);
            }}
            className="h-4 w-4 cursor-pointer border-neutral-300 text-emerald-600 accent-emerald-700 focus:ring-2 dark:border-neutral-600 dark:accent-emerald-500"
            aria-label="Activer le filtrage des allergies"
          />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Vous avez des allergies ?
          </span>
        </label>

        {/* Compteur + Bouton (visible uniquement si checkbox cochée) */}
        {isFilteringEnabled && (
          <div className="flex flex-row">
            {/* Badge compteur (visible quand allergies > 0) */}
            {userAllergies.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 lg:text-sm 2xl:text-base dark:bg-emerald-900/40 dark:text-emerald-300"
              >
                {userAllergies.length} allergie
                {userAllergies.length > 1 ? "s" : ""}
              </motion.span>
            )}

            {/* Bouton dropdown pour expand/collapse */}
            <button
              onClick={() => onExpandChange(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded ? "Masquer les allergies" : "Afficher les allergies"
              }
              className="ml-auto flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-neutral-600 transition-colors hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-500"
            >
              <span className="text-xs font-medium lg:text-sm 2xl:text-base">
                {isExpanded ? "Masquer" : "Afficher"}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoMdArrowDropdown className="text-lg" />
              </motion.div>
            </button>
          </div>
        )}
      </div>

      {/* Section collapse avec AllergySelector */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "top" }}
          >
            <div className="dark:bg-dark rounded-lg border-2 border-dashed border-emerald-600 bg-neutral-50 p-4 dark:border-emerald-500">
              <AllergySelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

AllergySectionToggle.propTypes = {
  isFilteringEnabled: PropTypes.bool.isRequired,
  onFilteringChange: PropTypes.func.isRequired,
  userAllergies: PropTypes.arrayOf(PropTypes.string).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onExpandChange: PropTypes.func.isRequired,
};
