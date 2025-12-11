// tradimedika-v1/src/pages/RemedyResultDetails.jsx
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import RemedyResultNotFound from "../components/remedy/RemedyResultNotFound";
import db from "../data/db.json";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { getRemedyBySlug } from "../utils/remedyMatcher";

/**
 * RemedyResultDetails Page
 *
 * Displays complete information about a specific natural remedy.
 * Layout (container, padding) is handled by LayoutRemedyResult.
 *
 * Issue #49: Implementation of detailed remedy page
 */

function RemedyResultDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const selectedSymptoms = location.state?.symptoms || [];
  const remedy = getRemedyBySlug(slug, db);

  // Si le remède n'existe pas, afficher composant NotFound
  if (!remedy) {
    return <RemedyResultNotFound variant="remedy-not-found" />;
  }

  // Configuration des couleurs par type
  const typeColors = {
    aliment:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    boisson: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    épice:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    plante: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
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
        className="mb-6"
      >
        <Link
          to="/remedes"
          state={{ symptoms: selectedSymptoms }}
          aria-label="Retour aux résultats"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour aux résultats
        </Link>
      </motion.div>
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
              src={remedy.image}
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

            {/* Verified Badge */}
            {remedy.verifiedByProfessional && (
              <span className="flex items-center gap-1.5 rounded-md bg-sky-100 px-3 py-1.5 text-xs font-semibold text-sky-800 transition duration-300 dark:bg-sky-900 dark:text-sky-200">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Vérifié
              </span>
            )}

            {/* Pregnancy Safe Badge */}
            {remedy.pregnancySafe === true && (
              <span className="flex items-center gap-1.5 rounded-md bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800 transition duration-300 dark:bg-lime-900 dark:text-lime-200">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Grossesse OK
              </span>
            )}

            {/* Children Age Badge */}
            {remedy.childrenAge !== null && (
              <span className="flex items-center gap-1.5 rounded-md bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800 transition duration-300 dark:bg-blue-900 dark:text-blue-200">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Enfants {remedy.childrenAge}+ ans
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold lg:text-4xl">{remedy.name}</h1>

          {/* Description (courte pour mobile) */}
          <p className="text-sm leading-relaxed text-neutral-600 lg:text-base dark:text-neutral-400">
            {remedy.description}
          </p>
        </div>
      </motion.div>

      {/* Propriétés Section */}
      {remedy.properties && remedy.properties.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
            Propriétés
          </h2>
          <div className="flex flex-wrap gap-2">
            {remedy.properties.map((prop, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 capitalize dark:bg-emerald-900 dark:text-emerald-200"
              >
                {prop.name}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Symptômes Section */}
      {remedy.symptoms && remedy.symptoms.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
            Symptômes traités
          </h2>
          <div className="flex flex-wrap gap-2">
            {remedy.symptoms.map((symptom, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="rounded-md bg-orange-100 px-3 py-2 text-sm font-medium text-yellow-800 shadow-md dark:bg-yellow-700 dark:text-yellow-100"
              >
                {capitalizeFirstLetter(symptom, true)}
              </motion.span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Utilisations Section */}
      {remedy.uses && remedy.uses.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-md transition duration-300 lg:p-6 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
            Utilisations
          </h2>
          <ul className="space-y-4">
            {remedy.uses.map((use, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border-l-4 border-emerald-500 pl-4"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
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
                      <span>
                        {use.frequency.value}x/{use.frequency.unit}
                      </span>
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
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {use.description}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Contraindications Section */}
      {remedy.contraindications && remedy.contraindications.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-yellow-950"
        >
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 lg:text-2xl dark:text-yellow-200">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Contraindications
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {remedy.contraindications.map((contraindication, index) => (
              <li
                key={index}
                className="text-sm leading-relaxed text-amber-800 capitalize dark:text-amber-200"
              >
                {contraindication}
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
          transition={{ delay: 0.8 }}
          className="mb-6 rounded-lg border-l-4 border-sky-500 bg-sky-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-sky-900/20"
        >
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-sky-800 lg:text-2xl dark:text-sky-300">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Conseils pratiques
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            {remedy.tips.map((tip, index) => (
              <li
                key={index}
                className="text-sm leading-relaxed text-sky-800 dark:text-sky-300"
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
          transition={{ delay: 0.9 }}
          className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 shadow-md transition duration-300 lg:p-6 dark:bg-yellow-900/20"
        >
          <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-yellow-800 lg:text-2xl dark:text-yellow-300">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Allergènes potentiels
          </h2>
          <div className="flex flex-wrap gap-2">
            {remedy.allergens.map((allergen, index) => (
              <span
                key={index}
                className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm font-medium text-yellow-900 capitalize dark:bg-yellow-800 dark:text-yellow-100"
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
        transition={{ delay: 1 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        {/* Bouton Retour */}
        <Link
          to="/remedes"
          state={{ symptoms: selectedSymptoms }}
          aria-label="Retour aux résultats"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour aux résultats
        </Link>
        <Link
          to="/"
          className="rounded-lg border-2 border-emerald-600 px-6 py-3 text-center font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-600 hover:text-white focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:hover:bg-emerald-600 dark:hover:text-white"
        >
          Nouvelle recherche
        </Link>
      </motion.div>
    </motion.article>
  );
}

export default RemedyResultDetails;
