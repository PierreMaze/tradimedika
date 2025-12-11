// components/remedy/RemedyCard.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { generateSlug } from "../../utils/remedyMatcher";
/**
 * Carte individuelle pour afficher un remède
 * - Entièrement cliquable (wrapper Link vers /remedes/:slug)
 * - Affiche: image, nom, type, description, propriétés, sécurité grossesse, âge enfants, vérification professionnelle
 * - Design responsive avec animations Framer Motion
 * - Support mode sombre
 * - Accessible avec aria-label
 */
export default function RemedyCard({ remedy, selectedSymptoms }) {
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

  // Type badges avec couleurs différentes
  const typeStyles = {
    aliment:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    boisson: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    épice:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    plante: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

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
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold tracking-wide uppercase ${typeStyles[type] || typeStyles.aliment}`}
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
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
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
              {verifiedByProfessional && (
                <span
                  className="inline-flex items-center gap-1 rounded-md bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                  title="Vérifié par un professionnel de santé"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Vérifié
                </span>
              )}

              {pregnancySafe && (
                <span
                  className="inline-flex items-center gap-1 rounded-md bg-lime-100 px-2 py-1 text-xs font-medium text-lime-800 dark:bg-lime-900 dark:text-lime-200"
                  title="Sûr pendant la grossesse"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Grossesse
                </span>
              )}

              {childrenAge !== null && (
                <span
                  className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  title={`Adapté aux enfants de ${childrenAge} ans et plus`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {childrenAge}+ ans
                </span>
              )}
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
