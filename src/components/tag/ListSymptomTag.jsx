// components/tag/ListSymptomTag.jsx
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import SymptomTag from "./SymptomTag";

/**
 * Composant conteneur pour afficher la liste des tags de symptômes
 * - Responsive: centré sur mobile, aligné à gauche sur desktop
 * - Animations avec AnimatePresence pour enter/exit smooth
 * - Retourne null si aucun symptôme (pas de DOM inutile)
 */
export default function ListSymptomTag({ symptoms, onRemoveSymptom }) {
  if (symptoms.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
    >
      <AnimatePresence mode="popLayout">
        {symptoms.map((symptom) => (
          <SymptomTag
            key={symptom}
            symptom={symptom}
            onRemove={onRemoveSymptom}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

ListSymptomTag.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveSymptom: PropTypes.func.isRequired,
};
