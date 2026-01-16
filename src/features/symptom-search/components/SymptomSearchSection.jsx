import PropTypes from "prop-types";
import ListSymptomTag from "./ListSymptomTag";
import SymptomCounter from "./SymptomCounter";
import SymptomsForm from "./SymptomsForm";

/**
 * Composant SymptomSearchSection - Section de recherche de symptômes
 *
 * Regroupe les composants de recherche de symptômes :
 * - SymptomsForm (input avec autocomplétion)
 * - ListSymptomTag (liste des symptômes sélectionnés)
 * - SymptomCounter (compteur X/5)
 *
 * @param {Object} props
 * @param {Function} props.onSymptomSelect - Callback lors de la sélection d'un symptôme
 * @param {Function} props.onRemoveSymptom - Callback lors de la suppression d'un symptôme
 * @param {string[]} props.selectedSymptoms - Liste des symptômes sélectionnés
 * @param {Function} props.onSubmit - Callback lors de la soumission du formulaire
 * @param {Function} [props.onFocus] - Callback optionnel lors du focus de l'input
 * @param {string} [props.placeholder] - Placeholder de l'input
 * @returns {JSX.Element}
 */
export default function SymptomSearchSection({
  onSymptomSelect,
  onRemoveSymptom,
  selectedSymptoms,
  onSubmit,
  onFocus,
  placeholder = "Entrez vos symptômes (ex: fatigue, digestion...)",
}) {
  return (
    <>
      {/* Input de recherche avec autocomplétion */}
      <SymptomsForm
        onSymptomSelect={onSymptomSelect}
        onRemoveSymptom={onRemoveSymptom}
        selectedSymptoms={selectedSymptoms}
        onSubmit={onSubmit}
        onFocus={onFocus}
        placeholder={placeholder}
      />

      {/* Liste des symptômes sélectionnés */}
      <ListSymptomTag
        symptoms={selectedSymptoms}
        onRemoveSymptom={onRemoveSymptom}
      />

      {/* Compteur de symptômes */}
      <SymptomCounter count={selectedSymptoms.length} />
    </>
  );
}

SymptomSearchSection.propTypes = {
  onSymptomSelect: PropTypes.func.isRequired,
  onRemoveSymptom: PropTypes.func.isRequired,
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
};
