import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Composant SymptomCounter - Compteur de symptômes sélectionnés
 *
 * Affiche "X/5 symptômes sélectionnés" avec animation d'apparition
 * Masqué quand count = 0
 *
 * @param {Object} props
 * @param {number} props.count - Nombre de symptômes sélectionnés
 * @param {number} props.max - Nombre maximum de symptômes (défaut: 5)
 * @returns {JSX.Element}
 */
export default function SymptomCounter({ count, max = 5 }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <span className="text-sm font-medium text-neutral-600 transition duration-300 ease-in-out dark:text-neutral-400">
            {count}/{max} symptômes sélectionnés
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

SymptomCounter.propTypes = {
  count: PropTypes.number.isRequired,
  max: PropTypes.number,
};
