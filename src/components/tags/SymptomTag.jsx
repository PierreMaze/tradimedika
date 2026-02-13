// components/tag/SymptomTag.jsx
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
 * - Animations enter/exit avec Tailwind CSS
 * - Accessible avec aria-label
 */
export default function SymptomTag({ symptom, onRemove }) {
  return (
    <button
      onClick={() => onRemove(symptom)}
      aria-label={`Supprimer ${symptom}`}
      className={`animate-scale-in flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 shadow-md motion-reduce:animate-none motion-reduce:opacity-100 ${BUTTON_PRIMARY_STYLES}`}
    >
      <span className="text-sm font-medium tracking-wider lg:text-base">
        {capitalizeSymptom(symptom)}
      </span>
      <IoMdClose className="text-lg" />
    </button>
  );
}

SymptomTag.propTypes = {
  symptom: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
