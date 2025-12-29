// components/remedy/RemedyCard.jsx
import { memo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { generateSlug } from "../../utils/remedyMatcher";
import VerifiedBadge from "../badge/VerifiedBadge";
import PregnancyBadge from "../badge/PregnancyBadge";
import ChildrenAgeBadge from "../badge/ChildrenAgeBadge";
/**
 * Carte individuelle pour afficher un remède
 * - Entièrement cliquable (wrapper Link vers /remedes/:slug)
 * - Affiche: image, nom, type, description, propriétés, sécurité grossesse, âge enfants, vérification professionnelle
 * - Design responsive avec animations Framer Motion
 * - Support mode sombre
 * - Accessible avec aria-label
 * - Optimisé avec React.memo pour éviter re-renders inutiles
 */
function RemedyCard({ remedy, selectedSymptoms }) {
  const {
    name,
    type,
    description,
    properties,
    image,
    pregnancySafe,
    childrenAge,
    verifiedByProfessional,
  } = remedy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/remedes/${generateSlug(name)}`}
        state={{ symptoms: selectedSymptoms }}
        aria-label={`Voir les détails de ${name}`}
        className="block h-full"
      >
        <div className="group h-full overflow-hidden rounded-lg bg-white shadow-md ring-2 ring-neutral-300 transition duration-300 ease-in-out hover:shadow-lg hover:ring-emerald-500 dark:bg-neutral-800 dark:ring-neutral-600">
          {/* Image */}
          {image && (
            <div className="aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-700">
              <img
                src={image}
                alt={`Illustration de ${name}`}
                className="mx-auto h-full w-2/3 object-scale-down p-4 transition duration-300 lg:w-3/4 2xl:w-4/5"
                loading="lazy"
              />
            </div>
          )}

          {/* Contenu */}
          <div className="p-6">
            {/* En-tête avec nom et type */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="text-start text-xl font-bold text-neutral-900 lg:text-2xl dark:text-neutral-100">
                {name}
              </h3>
              <span
                className={`shrink-0 rounded-md bg-neutral-200 px-2 py-1 text-xs font-semibold tracking-wide text-black uppercase lg:text-sm dark:bg-neutral-600 dark:text-white`}
              >
                {type}
              </span>
            </div>

            {/* Description */}
            <p className="mb-4 line-clamp-3 text-start text-sm text-neutral-600 lg:text-base dark:text-neutral-400">
              {description}
            </p>

            {/* Propriétés */}
            {properties && properties.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {properties.slice(0, 3).map((prop, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 lg:text-sm dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    {capitalizeFirstLetter(prop.name, true)}
                  </span>
                ))}
                {properties.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
                    +{properties.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Badges de sécurité */}
            <div className="flex flex-wrap gap-2">
              {verifiedByProfessional && <VerifiedBadge />}
              {pregnancySafe && <PregnancyBadge variant="default" />}
              {childrenAge !== null && <ChildrenAgeBadge age={childrenAge} />}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

RemedyCard.propTypes = {
  remedy: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      }),
    ),
    image: PropTypes.string,
    pregnancySafe: PropTypes.bool,
    childrenAge: PropTypes.number,
    verifiedByProfessional: PropTypes.bool,
  }).isRequired,
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * Fonction de comparaison personnalisée pour React.memo
 * Compare uniquement les props qui affectent réellement le rendu
 */
function arePropsEqual(prevProps, nextProps) {
  // Comparer l'ID du remède (identifiant unique)
  if (prevProps.remedy.id !== nextProps.remedy.id) {
    return false;
  }

  // Comparer les symptômes sélectionnés (affecte le state passé au Link)
  if (prevProps.selectedSymptoms.length !== nextProps.selectedSymptoms.length) {
    return false;
  }

  // Comparaison rapide des symptômes par référence d'abord
  if (prevProps.selectedSymptoms === nextProps.selectedSymptoms) {
    return true;
  }

  // Comparaison profonde des symptômes si les références diffèrent
  for (let i = 0; i < prevProps.selectedSymptoms.length; i++) {
    if (prevProps.selectedSymptoms[i] !== nextProps.selectedSymptoms[i]) {
      return false;
    }
  }

  // Props identiques, pas besoin de re-render
  return true;
}

// Export du composant memoizé avec fonction de comparaison personnalisée
export default memo(RemedyCard, arePropsEqual);
