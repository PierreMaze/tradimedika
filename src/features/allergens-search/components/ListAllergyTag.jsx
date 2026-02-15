// components/filter/ListAllergyTag.jsx
import PropTypes from "prop-types";
import AllergyTag from "../../../components/tags/AllergyTag";

// Fonction helper pour capitaliser la première lettre
const capitalizeSymptom = (symptom) => {
  return symptom.charAt(0).toUpperCase() + symptom.slice(1);
};

/**
 * Composant conteneur pour afficher la liste des tags des allergies
 * - Pure component de présentation
 * - Responsive: centré sur mobile, aligné à gauche sur desktop
 * - Animations avec Tailwind CSS pour enter/exit smooth
 * - Gère l'affichage du tag "Tous" + tags de symptômes
 */
export default function ListAllergyTag({ tags, activeTag, onTagClick }) {
  if (tags.length === 0) return null;

  return (
    <div
      className="animate-fade-in-down flex flex-wrap items-center justify-center gap-2 motion-reduce:animate-none motion-reduce:opacity-100"
      role="group"
      aria-label="Filtrer les produits par symptôme"
    >
      {tags.map((tag) => (
        <AllergyTag
          key={tag}
          label={tag === "all" ? "Tous" : capitalizeSymptom(tag)}
          isActive={activeTag === tag}
          onClick={() => onTagClick(tag)}
        />
      ))}
    </div>
  );
}

ListAllergyTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTag: PropTypes.string.isRequired,
  onTagClick: PropTypes.func.isRequired,
};
