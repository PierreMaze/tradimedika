import PropTypes from "prop-types";
import { memo } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { ChildrenAgeTag, PregnancyTag } from "../../../components/tags";
import { EvidenceBadge } from "../../../features/evidence-level";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { generateSlug } from "../../product-result-page/utils/productMatcher";

/**
 * Carte produit pour la recherche avancée
 * Version adaptée de ProductCard pour le contexte B2B
 */
function SearchResultCard({ product }) {
  const {
    name,
    type,
    description,
    properties,
    image,
    pregnancySafe,
    childrenAge,
    evidenceLevel,
  } = product;

  const pregnancyVariant =
    pregnancySafe?.safe === true
      ? "ok"
      : pregnancySafe?.safe === false
        ? "interdit"
        : "variant";

  return (
    <Link
      to={`/products/${generateSlug(name)}`}
      className="group block h-full"
      aria-label={`Voir les détails de ${name}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md ring-2 ring-emerald-500 transition-all duration-150 hover:scale-102 hover:shadow-lg hover:ring-emerald-600 motion-reduce:hover:scale-100 dark:bg-neutral-800 dark:ring-emerald-600">
        {/* Image */}
        {image && (
          <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 dark:bg-neutral-700/50">
            <img
              src={image}
              alt={`${name} - ${type}`}
              width="300"
              height="225"
              className="mx-auto h-full w-2/3 object-scale-down p-3"
              loading="lazy"
            />
            {/* Badge type */}
            <span className="absolute top-2 left-2 rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold tracking-wide text-neutral-700 uppercase shadow-md dark:bg-neutral-800/90 dark:text-neutral-300">
              {type}
            </span>
          </div>
        )}

        {/* Contenu */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-1 text-lg font-bold text-neutral-900 lg:text-xl dark:text-neutral-100">
            {name}
          </h3>

          {description && (
            <p className="mb-6 line-clamp-2 text-base leading-relaxed text-neutral-600 lg:text-sm dark:text-neutral-400">
              {description}
            </p>
          )}

          {/* Propriétés (max 3) */}
          {properties && properties.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {properties.slice(0, 3).map((prop, index) => (
                <span
                  key={index}
                  className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                >
                  {capitalizeFirstLetter(prop.name, true)}
                </span>
              ))}
              {properties.length > 3 && (
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  +{properties.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mb-3 flex flex-wrap gap-2">
            {evidenceLevel && <EvidenceBadge level={evidenceLevel} />}
          </div>

          {/* Tags de sécurité */}
          <div className="mb-3 flex flex-wrap gap-2">
            <PregnancyTag variant={pregnancyVariant} />
            <ChildrenAgeTag age={childrenAge} />
          </div>

          {/* CTA */}
          <div className="mt-3 flex items-center justify-end gap-1 text-base font-semibold text-emerald-600 transition-colors duration-150 group-hover:text-emerald-700 dark:text-emerald-400 dark:group-hover:text-emerald-300">
            <span>Voir la fiche</span>
            <HiArrowRight
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

SearchResultCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    properties: PropTypes.array,
    image: PropTypes.string,
    pregnancySafe: PropTypes.object,
    childrenAge: PropTypes.number,
    evidenceLevel: PropTypes.string,
  }).isRequired,
};

export default memo(SearchResultCard);
