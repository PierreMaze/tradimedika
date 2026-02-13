// components/tag/ListSymptomTag.jsx
import PropTypes from "prop-types";
import { SymptomTag } from "../../../components/tags";

/**
 * Composant conteneur pour afficher la liste des tags de symptômes
 * - Responsive: centré sur mobile, aligné à gauche sur desktop
 * - Animations avec Tailwind CSS pour enter/exit smooth
 * - Retourne null si aucun symptôme (pas de DOM inutile)
 */
export default function ListSymptomTag({ symptoms, onRemoveSymptom }) {
  if (symptoms.length === 0) return null;

  return (
    <div className="animate-fade-in-down mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 motion-reduce:animate-none motion-reduce:opacity-100 lg:justify-start">
      {symptoms.map((symptom) => (
        <SymptomTag
          key={symptom}
          symptom={symptom}
          onRemove={onRemoveSymptom}
        />
      ))}
    </div>
  );
}

ListSymptomTag.propTypes = {
  symptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveSymptom: PropTypes.func.isRequired,
};
