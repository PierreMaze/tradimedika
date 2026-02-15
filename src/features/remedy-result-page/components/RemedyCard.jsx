// components/remedy/RemedyCard.jsx
import PropTypes from "prop-types";
import { memo } from "react";
import { FiInfo } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  ChildrenAgeTag,
  PregnancyTag,
  ProuvedTag,
  RecommendedTag,
  TraditionnalTag,
} from "../../../components/tags";
import { InfoTooltip } from "../../../components/ui/tooltip";
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
function RemedyCard({
  remedy,
  selectedSymptoms,
  matchedSymptoms = [],
  isFiltered = false,
  isRecommended = false,
}) {
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
    ? "opacity-70 transition-all duration-150"
    : "";

  // Classes pour griser le contenu individuellement au lieu du parent
  const textClasses = isFiltered
    ? "grayscale group-hover:grayscale-0 transition-all duration-150"
    : "";

  const cardBorderClasses = isFiltered
    ? "ring-2 ring-neutral-500 hover:ring-neutral-600 dark:ring-neutral-500"
    : "ring-2 ring-emerald-500 hover:ring-emerald-600 dark:ring-emerald-600";

  return (
    <div
      className={`transition-transform duration-150 hover:scale-102 motion-reduce:hover:scale-100 ${cardClasses}`}
    >
      <Link
        to={`/remedes/${generateSlug(name)}`}
        state={{ symptoms: selectedSymptoms, isRecommended }}
        aria-label={`Voir les détails de ${name}${isFiltered ? " (contient des allergènes)" : ""}${isRecommended ? " (recommandé)" : ""}`}
        className="block h-full"
        onClick={handleRemedyClick}
      >
        <div
          className={`group h-full overflow-hidden rounded-lg bg-white shadow-md transition-colors duration-150 ease-in-out hover:shadow-lg dark:bg-neutral-800 ${cardBorderClasses}`}
        >
          {/* Image */}
          {image && (
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-700/50">
              {/* tags de symptômes en overlay (top-left) */}
              {matchedSymptoms.length > 0 && (
                <div className="absolute top-4 left-4 z-10 flex max-w-[60%] flex-wrap gap-2">
                  {matchedSymptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-md lg:text-base 2xl:text-lg dark:bg-emerald-700"
                    >
                      {capitalizeFirstLetter(symptom, true)}
                    </span>
                  ))}
                </div>
              )}
              {/* Tags en overlay (top-right) : Recommandé et/ou Allergène */}
              {(isRecommended || isFiltered) && (
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  {isRecommended && <RecommendedTag className="shadow-md" />}
                  {isFiltered && (
                    <span
                      className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 shadow-md lg:text-base 2xl:text-lg dark:bg-amber-900 dark:text-amber-200"
                      title="Ce produit naturel contient des allergènes que vous avez déclarés"
                      role="status"
                      aria-live="polite"
                    >
                      <FiInfo
                        className="h-4 w-4 lg:h-5 lg:w-5"
                        aria-hidden="true"
                      />
                      Allergène
                    </span>
                  )}
                </div>
              )}
              <img
                src={image}
                alt={`${name} - produit naturel traditionnel de type ${type}`}
                width="300"
                height="300"
                className={`mx-auto h-full w-2/3 object-scale-down p-4 transition-colors duration-150 lg:w-3/4 2xl:w-4/5 ${imageClasses}`}
                loading="lazy"
              />
            </div>
          )}

          {/* Contenu */}
          <div className="h-fit p-6">
            {/* En-tête avec nom et type */}
            <div className="mb-3 flex items-start justify-start gap-4">
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
              <div className="mt-4 flex flex-col gap-2 text-xs lg:text-sm 2xl:text-base">
                <h4 className="text-start text-xs font-semibold text-neutral-700 lg:text-sm 2xl:text-base dark:text-neutral-300">
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
                        className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 transition-all duration-150 dark:bg-emerald-900 dark:text-emerald-200 ${textClasses}`}
                      >
                        {capitalizeFirstLetter(prop.name, true)}
                      </span>
                    ))}
                    {visibleCount < properties.length && (
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 transition-all duration-150 dark:bg-emerald-900 dark:text-emerald-200${textClasses}`}
                      >
                        +{properties.length - visibleCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tags de sécurité */}
            <div className={`mt-2 flex flex-col ${textClasses}`}>
              <InfoTooltip
                size="sm"
                variant="inline"
                label="Indications d'usage"
              />
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
              className={`transition-color mt-4 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600 duration-150 group-hover:text-emerald-700 lg:text-sm 2xl:text-base dark:text-emerald-400 dark:group-hover:text-emerald-300 ${textClasses}`}
            >
              <span>Voir plus</span>
              <HiArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
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
  matchedSymptoms: PropTypes.arrayOf(PropTypes.string),
  isFiltered: PropTypes.bool,
  isRecommended: PropTypes.bool,
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

  // Comparer isRecommended
  if (prevProps.isRecommended !== nextProps.isRecommended) {
    return false;
  }

  // Comparer les symptômes sélectionnés (affecte le state passé au Link)
  if (prevProps.selectedSymptoms.length !== nextProps.selectedSymptoms.length) {
    return false;
  }

  // Comparaison rapide des symptômes par référence d'abord
  if (prevProps.selectedSymptoms === nextProps.selectedSymptoms) {
    // Vérifier aussi matchedSymptoms
    if (
      prevProps.matchedSymptoms?.length !== nextProps.matchedSymptoms?.length
    ) {
      return false;
    }
    if (prevProps.matchedSymptoms === nextProps.matchedSymptoms) {
      return true;
    }
    // Comparaison profonde des matchedSymptoms
    for (let i = 0; i < (prevProps.matchedSymptoms?.length || 0); i++) {
      if (prevProps.matchedSymptoms[i] !== nextProps.matchedSymptoms[i]) {
        return false;
      }
    }
    return true;
  }

  // Comparaison profonde des symptômes si les références diffèrent
  for (let i = 0; i < prevProps.selectedSymptoms.length; i++) {
    if (prevProps.selectedSymptoms[i] !== nextProps.selectedSymptoms[i]) {
      return false;
    }
  }

  // Vérifier matchedSymptoms
  if (prevProps.matchedSymptoms?.length !== nextProps.matchedSymptoms?.length) {
    return false;
  }
  for (let i = 0; i < (prevProps.matchedSymptoms?.length || 0); i++) {
    if (prevProps.matchedSymptoms[i] !== nextProps.matchedSymptoms[i]) {
      return false;
    }
  }

  // Props identiques, pas besoin de re-render
  return true;
}

// Export du composant memoizé avec fonction de comparaison personnalisée
export default memo(RemedyCard, arePropsEqual);
