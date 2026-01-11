// tradimedika-v1/src/pages/RemedyResultDetails.jsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  HiArrowLeft,
  HiExclamationTriangle,
  HiInformationCircle,
  HiLightBulb,
} from "react-icons/hi2";
import { IoMdAlert } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import RemedyResultNotFound from "../components/remedy/RemedyResultNotFound";
import { ChildrenAgeTag, PregnancyTag, VerifiedTag } from "../components/tags";
import TagsInfoTooltip from "../components/tooltip/TagsInfoTooltip";
import { useAllergies } from "../features/allergens";
import allergensList from "../data/allergensList.json";
import db from "../data/db.json";
import { useReducedMotion } from "../features/settings";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatFrequency } from "../utils/formatFrequency";
import { getRemedyBySlug } from "../utils/remedyMatcher";

/**
 * RemedyResultDetails Page
 *
 * Displays complete information about a specific natural remedy.
 * Layout (container, padding) is handled by LayoutRemedyResult.
 *
 * Issue #49: Implementation of detailed remedy page
 */

/**
 * Validates that an image URL uses HTTPS protocol
 * @param {string} url - The URL to validate
 * @returns {boolean} True if URL is valid and uses HTTPS
 */
function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /^https:\/\/.+/.test(url);
}

function RemedyResultDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const selectedSymptoms = location.state?.symptoms || [];
  const remedy = getRemedyBySlug(slug, db);
  const { userAllergies, isFilteringEnabled } = useAllergies();
  const prefersReducedMotion = useReducedMotion();

  // Validate and sanitize image URL (use placeholder if invalid)
  const safeImageUrl = isValidImageUrl(remedy?.image)
    ? remedy.image
    : "https://via.placeholder.com/400x400?text=Image+non+disponible";

  // Si le remède n'existe pas, afficher composant NotFound
  if (!remedy) {
    return <RemedyResultNotFound variant="remedy-not-found" />;
  }

  // Vérifier si le remède contient des allergènes de l'utilisateur
  const remedyAllergens = Array.isArray(remedy.allergens)
    ? remedy.allergens
    : [];
  const matchingAllergens = remedyAllergens.filter((allergenId) =>
    userAllergies.includes(allergenId),
  );
  const hasUserAllergens =
    isFilteringEnabled &&
    userAllergies.length > 0 &&
    matchingAllergens.length > 0;

  // Récupérer les noms des allergènes pour affichage
  const allergenNames = matchingAllergens
    .map((id) => {
      const allergen = allergensList.find((a) => a.id === id);
      return allergen ? allergen.name.toLowerCase() : null;
    })
    .filter(Boolean)
    .join(", ");

  // Configuration des couleurs par type
  const typeColors = {
    aliment:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    boisson: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    épice:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    plante: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  // Generate dynamic meta tags
  const pageTitle = `${remedy.name} - Remède naturel | TRADIMEDIKA`;
  const pageDescription =
    remedy.description ||
    `Découvrez ${remedy.name}, un remède naturel de type ${remedy.type}`;
  const canonicalUrl = `https://pierremaze.github.io/tradimedika/remedes/${slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={safeImageUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={safeImageUrl} />
      </Helmet>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-dark dark:text-light w-full transition duration-300 ease-in-out"
      >
        {/* Bouton Retour */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center gap-3"
        >
          <Link
            to="/remedes"
            state={{ symptoms: selectedSymptoms }}
            aria-label="Retour aux résultats"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
          >
            <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
            Retour aux résultats
          </Link>
        </motion.div>

        {/* Bannière d'avertissement allergènes */}
        {hasUserAllergens && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="assertive"
            className="mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 dark:border-emerald-400/60 dark:bg-emerald-950"
          >
            <IoMdAlert
              className="mt-0.5 flex shrink-0 text-2xl text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />

            <div className="flex-1 text-start">
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                Attention : Ce remède contient vos allergènes
              </p>
              <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-50">
                Ce remède contient :{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {allergenNames}
                </span>
              </p>
              <p className="mt-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                Consultez un professionnel de santé avant utilisation.
              </p>
            </div>
          </motion.div>
        )}

        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid gap-6 lg:mb-8 lg:grid-cols-5 lg:gap-8"
        >
          {/* Image */}
          <div className="lg:col-span-2 2xl:col-span-1">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-300 shadow-md dark:bg-neutral-700">
              <motion.img
                src={safeImageUrl}
                alt={`Illustration de ${remedy.name}`}
                className="mx-auto h-full w-2/3 object-scale-down p-6 lg:w-3/4 2xl:w-4/5"
                loading="lazy"
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="lg:col-span-3">
            {/* Badges */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {/* Type Badge */}
              <span
                className={`rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition duration-300 ${typeColors[remedy.type] || typeColors.aliment}`}
              >
                {remedy.type}
              </span>

              {/* Verified Tag */}
              {remedy.verifiedByProfessional && <VerifiedTag />}

              {/* Pregnancy Safe Tag */}
              {remedy.pregnancySafe === true && <PregnancyTag />}

              {/* Children Age Tag */}
              {remedy.childrenAge !== null && (
                <ChildrenAgeTag age={remedy.childrenAge} />
              )}
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl font-bold lg:text-4xl">
              {remedy.name}
            </h1>

            {/* Description (courte pour mobile) */}
            <p className="text-sm leading-relaxed text-neutral-600 lg:text-base 2xl:text-lg dark:text-neutral-400">
              {remedy.description}
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-6">
          {/* Propriétés Section */}
          {remedy.properties && remedy.properties.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                Propriétés
              </h2>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {remedy.properties.map((prop, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    // Limiter stagger aux 5 premiers items pour performance
                    transition={
                      index >= 5
                        ? { duration: 0 }
                        : { duration: 0.2, ease: "easeOut" }
                    }
                    className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize 2xl:text-base dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    {prop.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Symptômes Section */}
          {remedy.symptoms && remedy.symptoms.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                Symptômes traités
              </h2>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.25,
                    },
                  },
                }}
              >
                {remedy.symptoms.map((symptom, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    // Limiter stagger aux 5 premiers items pour performance
                    transition={
                      index >= 5
                        ? { duration: 0 }
                        : { duration: 0.2, ease: "easeOut" }
                    }
                    className="rounded-md bg-orange-100 px-3 py-2 text-sm font-medium text-yellow-800 shadow-md 2xl:text-base dark:bg-yellow-700 dark:text-yellow-100"
                  >
                    {capitalizeFirstLetter(symptom, true)}
                  </motion.span>
                ))}
              </motion.div>
            </motion.section>
          )}
        </div>
        {/* Utilisations Section */}
        {remedy.uses && remedy.uses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
              Utilisations
            </h2>
            <motion.ul
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {remedy.uses.map((use, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  // Limiter stagger aux 3 premiers items pour les listes
                  transition={
                    index >= 3
                      ? { duration: 0 }
                      : { duration: 0.3, ease: "easeOut" }
                  }
                  className="border-l-4 border-emerald-500 pl-4"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-700 2xl:text-base dark:text-neutral-300">
                    {/* Forme */}
                    {use.form && use.form.length > 0 && (
                      <span className="capitalize">{use.form.join(", ")}</span>
                    )}
                    {/* Dose */}
                    {use.dose && use.dose.value && (
                      <>
                        <span className="text-neutral-400">•</span>
                        <span>
                          {use.dose.value} {use.dose.unit}
                        </span>
                      </>
                    )}
                    {/* Fréquence */}
                    {use.frequency && use.frequency.value && (
                      <>
                        <span className="text-neutral-400">•</span>
                        <span>{formatFrequency(use.frequency)}</span>
                      </>
                    )}
                    {/* Durée */}
                    {use.duration && use.duration.value && (
                      <>
                        <span className="text-neutral-400">•</span>
                        <span>
                          Pendant {use.duration.value} {use.duration.unit}
                        </span>
                      </>
                    )}
                  </div>
                  {use.description && (
                    <p className="text-sm leading-relaxed text-neutral-600 2xl:text-base dark:text-neutral-400">
                      {use.description}
                    </p>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}

        {/* Contraindications Section */}
        {remedy.contraindications && remedy.contraindications.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-100 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-red-950"
          >
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-red-800 lg:text-2xl dark:text-red-200">
              <HiExclamationTriangle className="h-6 w-6" aria-hidden="true" />
              Contraindications
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              {remedy.contraindications.map((contraindication, index) => (
                <li
                  key={index}
                  className="text-sm leading-relaxed font-medium text-red-800 capitalize 2xl:text-base dark:text-red-200"
                >
                  {capitalizeFirstLetter(contraindication, true)}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Tips Section */}
        {remedy.tips && remedy.tips.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 rounded-lg border-l-4 border-sky-500 bg-sky-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-sky-900/20"
          >
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-sky-800 lg:text-2xl dark:text-sky-300">
              <HiLightBulb className="h-6 w-6" aria-hidden="true" />
              Conseils pratiques
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              {remedy.tips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm leading-relaxed text-sky-800 2xl:text-base dark:text-sky-300"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Allergènes Section */}
        {remedy.allergens && remedy.allergens.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-yellow-900/20"
          >
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 lg:text-2xl dark:text-yellow-300">
              <HiInformationCircle className="h-6 w-6" aria-hidden="true" />
              Allergènes potentiels
            </h2>
            <div className="flex flex-wrap gap-2">
              {remedy.allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm font-medium text-yellow-900 capitalize 2xl:text-base dark:bg-yellow-800 dark:text-yellow-100"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          {/* Bouton Retour */}
          <Link
            to="/remedes"
            state={{ symptoms: selectedSymptoms }}
            aria-label="Retour aux résultats"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
          >
            <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
            Retour aux résultats
          </Link>
          <Link
            to="/"
            aria-label="Retour à l'accueil"
            className="rounded-lg border-2 border-emerald-600 px-6 py-3 text-center font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-600 hover:text-white focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white"
          >
            Nouvelle recherche
          </Link>
        </motion.div>
      </motion.article>
      <TagsInfoTooltip />
    </>
  );
}

export default RemedyResultDetails;
