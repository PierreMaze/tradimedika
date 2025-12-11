// components/tag/SymptomTag.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { BUTTON_PRIMARY_STYLES } from "../../constants/buttonStyles";

// Fonction helper pour capitaliser la première lettre
const capitalizeSymptom = (symptom) => {
  return symptom.charAt(0).toUpperCase() + symptom.slice(1);
};

/**
 * Composant Tag individuel pour afficher un symptôme sélectionné
 * - Design pill avec bouton de suppression
 * - Animations enter/exit avec Framer Motion
 * - Accessible avec aria-label
 */
export default function SymptomTag({ symptom, onRemove }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onRemove(symptom)}
      aria-label={`Supprimer ${symptom}`}
      className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 shadow-md ${BUTTON_PRIMARY_STYLES}`}
    >
      <span className="text-sm font-medium tracking-wider lg:text-base">
        {capitalizeSymptom(symptom)}
      </span>
      <IoMdClose className="text-lg" />
    </motion.button>
  );
}

SymptomTag.propTypes = {
  symptom: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
