// components/remedy/RemedyResultNotFound.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiArrowLeft } from "react-icons/hi2";

/**
 * Composant d'état vide pour les résultats de remèdes
 * - Affiche un message personnalisé selon le type (no-results ou no-filter-match)
 * - Design avec bordure en pointillés (dashed border)
 * - Bouton optionnel pour retourner à l'accueil
 * - Support mode sombre
 * - Accessible avec aria-live pour les lecteurs d'écran
 */
export default function RemedyResultNotFound({
  variant = "no-results",
  showHomeButton = false,
}) {
  const messages = {
    "no-results": {
      icon: "🔍",
      title: "Aucun remède trouvé pour ces symptômes",
      description: "Essayez d'autres symptômes ou reformulez votre recherche",
      titleColor: "text-neutral-600 dark:text-neutral-400",
    },
    "no-filter-match": {
      icon: "⚠️",
      title: "Aucun remède ne correspond au filtre sélectionné",
      description:
        "Essayez de sélectionner un autre tag pour voir plus de résultats",
      titleColor: "text-amber-700 dark:text-amber-400",
    },
  };

  const message = messages[variant] || messages["no-results"];

  return (
    <div
      className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 mx-auto w-full max-w-2xl rounded-lg border-2 border-dashed p-8 text-center transition duration-300 ease-in-out"
      role="status"
      aria-live="polite"
    >
      {/* Icône */}
      <div className="mb-4 text-4xl" aria-hidden="true">
        {message.icon}
      </div>

      {/* Titre */}
      <p className={`mb-2 text-lg font-semibold ${message.titleColor}`}>
        {message.title}
      </p>

      {/* Description */}
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-500">
        {message.description}
      </p>

      {/* Bouton optionnel pour retourner à l'accueil */}
      {showHomeButton && (
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      )}
    </div>
  );
}

RemedyResultNotFound.propTypes = {
  variant: PropTypes.oneOf(["no-results", "no-filter-match"]),
  showHomeButton: PropTypes.bool,
};
