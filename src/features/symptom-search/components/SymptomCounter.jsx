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
  if (count <= 0) return null;

  return (
    <div className="animate-fade-in-up text-center motion-reduce:animate-none motion-reduce:opacity-100">
      <span className="text-sm font-medium text-neutral-600 transition-colors duration-150 ease-in-out dark:text-neutral-400">
        {count}/{max} symptômes sélectionnés
      </span>
    </div>
  );
}

SymptomCounter.propTypes = {
  count: PropTypes.number.isRequired,
  max: PropTypes.number,
};
