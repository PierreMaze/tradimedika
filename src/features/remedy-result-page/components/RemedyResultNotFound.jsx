// components/remedy/RemedyResultNotFound.jsx
import PropTypes from "prop-types";
import {
  HiArrowLeft,
  HiExclamationTriangle,
  HiLightBulb,
  HiMagnifyingGlass,
  HiQuestionMarkCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

/**
 * Composant d'état vide pour les résultats de remèdes
 * - Affiche un message personnalisé selon le type (no-results, no-filter-match, remedy-not-found)
 * - Inclut des suggestions pratiques pour aider l'utilisateur
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
      icon: HiMagnifyingGlass,
      title: "Aucun remède trouvé pour ces symptômes",
      description: "Essayez d'autres symptômes ou reformulez votre recherche",
      titleColor: "text-neutral-600 dark:text-neutral-400",
      iconColor: "text-neutral-500 dark:text-neutral-500",
      suggestions: [
        "Vérifiez l'orthographe des symptômes",
        "Essayez des termes plus généraux (ex: 'douleur' au lieu de 'douleur abdominale')",
        "Utilisez des synonymes (ex: 'fièvre' ou 'température élevée')",
        "Réduisez le nombre de symptômes sélectionnés",
      ],
      showPopularSymptoms: true,
    },
    "no-filter-match": {
      icon: HiExclamationTriangle,
      title: "Aucun remède ne correspond au filtre sélectionné",
      description:
        "Essayez de sélectionner un autre tag pour voir plus de résultats",
      titleColor: "text-emerald-700 dark:text-emerald-400",
      iconColor: "text-emerald-600 dark:text-emerald-500",
      suggestions: [
        "Sélectionnez le tag 'Tous' pour voir tous les remèdes",
        "Choisissez un symptôme différent dans la liste des tags",
        "Essayez une combinaison différente de symptômes",
      ],
      showPopularSymptoms: false,
    },
    "remedy-not-found": {
      icon: HiQuestionMarkCircle,
      title: "Ce remède n'existe pas ou n'est plus disponible",
      description: "Le lien que vous avez suivi est peut-être incorrect",
      titleColor: "text-red-600 dark:text-red-400",
      iconColor: "text-red-500 dark:text-red-500",
      suggestions: [
        "Vérifiez l'URL dans votre barre d'adresse",
        "Retournez à l'accueil pour faire une nouvelle recherche",
        "Consultez la liste complète des remèdes disponibles",
      ],
      showPopularSymptoms: false,
    },
  };

  const message = messages[variant] || messages["no-results"];
  const IconComponent = message.icon;

  // Symptômes populaires à suggérer
  const popularSymptoms = [
    "fatigue",
    "stress",
    "maux de tête",
    "insomnie",
    "diarrhée",
  ];

  return (
    <div
      className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 mx-auto w-full max-w-2xl rounded-lg border-2 border-dashed p-8 transition duration-300 ease-in-out"
      role="status"
      aria-live="polite"
    >
      {/* Icône */}
      <div className="mb-4 flex justify-center" aria-hidden="true">
        <IconComponent className={`h-16 w-16 ${message.iconColor}`} />
      </div>

      {/* Titre */}
      <h2 className={`mb-2 text-lg font-semibold ${message.titleColor}`}>
        {message.title}
      </h2>

      {/* Description */}
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-500">
        {message.description}
      </p>

      {/* Suggestions */}
      {message.suggestions && message.suggestions.length > 0 && (
        <div className="mb-6 rounded-lg bg-neutral-100 p-4 text-left dark:bg-neutral-800">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            <HiLightBulb
              className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
            <span>Suggestions :</span>
          </div>
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {message.suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400">
                  •
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Symptômes populaires */}
      {message.showPopularSymptoms && (
        <div className="mb-6 text-left">
          <p className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Essayez ces symptômes courants :
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSymptoms.map((symptom, index) => (
              <Link
                key={index}
                to="/"
                className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 capitalize transition duration-200 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-800"
              >
                {symptom}
              </Link>
            ))}
          </div>
        </div>
      )}

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
  variant: PropTypes.oneOf([
    "no-results",
    "no-filter-match",
    "remedy-not-found",
  ]),
  showHomeButton: PropTypes.bool,
};
