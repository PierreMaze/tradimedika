// components/remedy/RemedyCard.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo } from "react";
import { FiInfo } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  ChildrenAgeTag,
  PregnancyTag,
  ProuvedTag,
  TraditionnalTag,
} from "../../../components/tags";
import TagsInfoButton from "../../../components/ui/helper/TagsInfoButton";
import useGAEvent from "../../../hooks/useGAEvent";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { useVisibleItems } from "../hooks/useTruncatePropertiesItems";
import { generateSlug } from "../utils/remedyMatcher";
/**
 * Carte individuelle pour afficher un remède
 * - Entièrement cliquable (wrapper Link vers /remedes/:slug)
 * - Affiche: image, nom, type, description, propriétés, sécurité grossesse, âge enfants, vérification professionnelle
 * - Design responsive avec animations Framer Motion
 * - Support mode sombre
 * - Accessible avec aria-label
 * - Optimisé avec React.memo pour éviter re-renders inutiles
 */
function RemedyCard({ remedy, selectedSymptoms, isFiltered = false }) {
  const trackEvent = useGAEvent();
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

  const { containerRef, itemRefs, counterRef, visibleCount } = useVisibleItems(
    properties || [],
  );

  // Handler pour le tracking du clic sur un remède
  const handleRemedyClick = () => {
    trackEvent("remedy_click", {
      remedy_name: name,
      remedy_type: type,
      remedy_id: remedy.id,
      is_verified: verifiedByProfessional,
      pregnancy_safe: pregnancySafe,
      has_allergens: isFiltered,
      from_symptoms: selectedSymptoms.join(", "),
    });
  };

  const imageClasses = isFiltered ? "grayscale" : "";

  const cardClasses = isFiltered
    ? "opacity-70 transition-all duration-300"
    : "";

  // Classes pour griser le contenu individuellement au lieu du parent
  const textClasses = isFiltered
    ? "grayscale group-hover:grayscale-0 transition-all duration-300"
    : "";

  const cardBorderClasses = isFiltered
    ? "ring-2 ring-neutral-500 hover:ring-neutral-600 dark:ring-neutral-500"
    : "ring-2 ring-emerald-500 hover:ring-emerald-600 dark:ring-emerald-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cardClasses}
    >
      <Link
        to={`/remedes/${generateSlug(name)}`}
        state={{ symptoms: selectedSymptoms }}
        aria-label={`Voir les détails de ${name}${isFiltered ? " (contient des allergènes)" : ""}`}
        className="block h-full"
        onClick={handleRemedyClick}
      >
        <div
          className={`group h-full overflow-hidden rounded-lg bg-white shadow-md transition duration-300 ease-in-out hover:shadow-lg dark:bg-neutral-800 ${cardBorderClasses}`}
        >
          {/* Image */}
          {image && (
            <div className="bg-light dark:bg-dark relative aspect-square w-full overflow-hidden">
              {/* Tag allergène en overlay (top-right) */}
              {isFiltered && (
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-100 px-3 py-1.5 font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    title="Ce remède contient des allergènes que vous avez déclarés"
                    role="status"
                    aria-live="polite"
                  >
                    <FiInfo
                      className="h-4 w-4 lg:h-5 lg:w-5"
                      aria-hidden="true"
                    />
                    Allergène
                  </span>
                </div>
              )}
              <img
                src={image}
                alt={`Illustration de ${name}`}
                className={`mx-auto h-full w-2/3 object-scale-down p-4 transition duration-300 lg:w-3/4 2xl:w-4/5 ${imageClasses}`}
                loading="lazy"
              />
            </div>
          )}

          {/* Contenu */}
          <div className="h-fit p-6">
            {/* En-tête avec nom et type */}
            <div className="mb-3 flex items-start justify-between">
              <h3
                className={`text-start text-xl font-bold text-neutral-900 lg:text-2xl dark:text-neutral-100 ${textClasses}`}
              >
                {name}
              </h3>
              <span
                className={`bg-light shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide text-black uppercase lg:text-sm 2xl:text-base dark:bg-neutral-600 dark:text-white ${textClasses}`}
              >
                {type}
              </span>
            </div>

            {/* Description (truncate sur 3 lignes) */}
            {description && (
              <p
                className={`mb-4 line-clamp-3 text-start text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400 ${textClasses}`}
              >
                {description}
              </p>
            )}

            {/* Propriétés */}
            {properties && properties.length > 0 && (
              <div className="mb-4 flex flex-col gap-2 text-xs lg:text-sm 2xl:text-base">
                <h4 className="text-start text-sm font-bold text-neutral-700 lg:text-base dark:text-neutral-300">
                  Propriétés
                </h4>
                <div className="relative">
                  <div
                    className="pointer-events-none invisible absolute top-0 left-0 flex gap-2"
                    aria-hidden="true"
                  >
                    {properties.map((prop, index) => (
                      <span
                        key={`measure-${index}`}
                        ref={(el) => (itemRefs.current[index] = el)}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      >
                        {capitalizeFirstLetter(prop.name, true)}
                      </span>
                    ))}
                    <span
                      ref={counterRef}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    >
                      +99
                    </span>
                  </div>
                  <div
                    ref={containerRef}
                    className="flex gap-2 overflow-hidden"
                    data-testid="properties-container"
                  >
                    {properties.slice(0, visibleCount).map((prop, index) => (
                      <span
                        key={index}
                        className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 transition-all duration-300 dark:bg-emerald-900 dark:text-emerald-200 ${textClasses}`}
                      >
                        {capitalizeFirstLetter(prop.name, true)}
                      </span>
                    ))}
                    {visibleCount < properties.length && (
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 transition-all duration-300 dark:bg-emerald-900 dark:text-emerald-200${textClasses}`}
                      >
                        +{properties.length - visibleCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tags de sécurité */}
            <div className={`flex flex-col flex-wrap gap-2 ${textClasses}`}>
              <TagsInfoButton size="sm" variant="inline" label="Labels" />
              <div className="flex flex-wrap gap-2">
                {verifiedByProfessional ? <ProuvedTag /> : <TraditionnalTag />}
                <PregnancyTag
                  variant={
                    pregnancySafe === true
                      ? "ok"
                      : pregnancySafe === false
                        ? "interdit"
                        : "variant"
                  }
                />
                <ChildrenAgeTag age={childrenAge} />
              </div>
            </div>

            {/* Indicateur "Voir plus" */}
            <div
              className={`mt-4 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 lg:text-sm 2xl:text-base dark:text-emerald-400 dark:group-hover:text-emerald-300 ${textClasses}`}
            >
              <span>Voir plus</span>
              <HiArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
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
  isFiltered: PropTypes.bool,
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

  // Comparer isFiltered
  if (prevProps.isFiltered !== nextProps.isFiltered) {
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
