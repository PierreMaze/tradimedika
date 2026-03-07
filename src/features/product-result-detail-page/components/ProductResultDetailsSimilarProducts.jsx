import PropTypes from "prop-types";
import { useMemo } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import db from "../../../data/db.json";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { generateSlug } from "../../product-result-page/utils/productMatcher";

/**
 * Trouve les produits similaires basés sur :
 * 1. Même type que le produit courant
 * 2. Au moins 1 property.name en commun
 * 3. Trié par nombre de propriétés communes (desc)
 * 4. Limité à 4 produits max
 */
function findSimilarProducts(product, allProducts) {
  const productProps = (product.properties || []).map((p) =>
    p.name.toLowerCase(),
  );

  if (productProps.length === 0) return [];

  return allProducts
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const pProps = (p.properties || []).map((prop) =>
        prop.name.toLowerCase(),
      );
      const commonProps = productProps.filter((name) => pProps.includes(name));
      const sameType = p.type === product.type;
      return {
        product: p,
        commonCount: commonProps.length,
        sameType,
        score: commonProps.length + (sameType ? 0.5 : 0),
      };
    })
    .filter((item) => item.commonCount > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

/**
 * Section produits similaires pour la fiche détails
 */
function ProductResultDetailsSimilarProducts({ product }) {
  const similarProducts = useMemo(
    () => findSimilarProducts(product, db),
    [product],
  );

  if (similarProducts.length === 0) return null;

  return (
    <section className="animate-fade-in-up motion-reduce:animate-none motion-reduce:opacity-100">
      <h2 className="mb-4 text-lg font-semibold lg:text-xl 2xl:text-2xl">
        Produits similaires
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {similarProducts.map(({ product: similar, commonCount }) => (
          <Link
            key={similar.id}
            to={`/products/${generateSlug(similar.name)}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-150 hover:shadow-md hover:ring-2 hover:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-800"
          >
            {similar.image && (
              <div className="aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-700/50">
                <img
                  src={similar.image}
                  alt={similar.name}
                  width="150"
                  height="150"
                  className="mx-auto h-full w-2/3 object-scale-down p-2"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {similar.name}
              </h3>
              <span className="text-[10px] font-medium text-neutral-500 uppercase dark:text-neutral-400">
                {similar.type}
              </span>
              <p className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                {commonCount} propriété{commonCount > 1 ? "s" : ""} en commun
              </p>

              {/* Propriétés communes */}
              <div className="mt-2 flex flex-wrap gap-1">
                {(similar.properties || []).slice(0, 2).map((prop, i) => (
                  <span
                    key={i}
                    className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                  >
                    {capitalizeFirstLetter(prop.name, true)}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-end gap-0.5 pt-2 text-[10px] font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 dark:text-emerald-400">
                <span>Voir</span>
                <HiArrowRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

ProductResultDetailsSimilarProducts.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

export default ProductResultDetailsSimilarProducts;
