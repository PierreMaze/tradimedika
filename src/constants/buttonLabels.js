// tradimedika-v1/src/constants/buttonLabels.js

/**
 * Button Labels Constants
 *
 * Centralized text constants for all buttons in the application.
 * Ensures consistency and facilitates internationalization.
 */

/**
 * Main action button label (Hero CTA)
 * @type {string}
 */
export const BUTTON_DISCOVER = "Découvrir nos solutions";

/**
 * Button label during search loading state
 * @type {string}
 */
export const BUTTON_SEARCHING = "Recherche en cours...";

/**
 * Button label when search is completed successfully
 * @type {string}
 */
export const BUTTON_SEARCH_DONE = "Recherche effectuée";

/**
 * Button label to reload the page (ErrorFallback)
 * @type {string}
 */
export const BUTTON_RELOAD = "Recharger la page";

/**
 * Button/Link label to return to home page
 * @type {string}
 */
export const BUTTON_BACK_HOME = "Retour à l'accueil";

/**
 * Button label for search history feature
 * @type {string}
 */
export const BUTTON_HISTORY = "Historique";

/**
 * Button/Link label to start a new search
 * @type {string}
 */
export const BUTTON_NEW_SEARCH = "Nouvelle recherche";

/**
 * Button label to go back (generic)
 * @type {string}
 */
export const BUTTON_BACK = "Retour";

/**
 * Link label to return to search results
 * @type {string}
 */
export const BUTTON_BACK_RESULTS = "Retour aux résultats";

/**
 * Link label to explore all remedies (NotFound page)
 * @type {string}
 */
export const BUTTON_EXPLORE_REMEDIES = "Explorer les produits naturels";

/**
 * Button label to close modal/tooltip
 * @type {string}
 */
export const BUTTON_CLOSE = "Fermer";

/**
 * Filter tag label to show all results
 * @type {string}
 */
export const BUTTON_ALL_FILTERS = "Tous";

/**
 * Button label to clear all search history
 * @type {string}
 */
export const BUTTON_CLEAR_HISTORY = "Effacer tout l'historique";

/**
 * Placeholder text for symptom input field
 * @type {string}
 */
export const PLACEHOLDER_SYMPTOMS = "Sélectionner votre symptôme";

/**
 * Message displayed when symptom limit (5) is reached
 * @type {string}
 */
export const MESSAGE_LIMIT_REACHED = "Limite de 5 symptômes atteinte";

/**
 * Instruction message when limit is reached
 * @type {string}
 */
export const MESSAGE_REMOVE_ONE = "Supprimez-en un pour continuer";

/**
 * ARIA label for dark mode toggle button
 * @type {string}
 */
export const ARIA_DARKMODE_TOGGLE = "Toggle dark mode";

/**
 * ARIA label for tags information button
 * @type {string}
 */
export const ARIA_TAGS_INFO = "Informations sur les tags";

/**
 * ARIA label for remove symptom action (prefix)
 * Used as: `${ARIA_REMOVE_SYMPTOM} ${symptomName}`
 * @type {string}
 */
export const ARIA_REMOVE_SYMPTOM = "Supprimer";

/**
 * ARIA label for remedy card link (prefix)
 * Used as: `${ARIA_VIEW_DETAILS} ${remedyName}`
 * @type {string}
 */
export const ARIA_VIEW_DETAILS = "Voir les détails de";

/**
 * ARIA label for close button in modals/tooltips
 * @type {string}
 */
export const ARIA_CLOSE = "Fermer";

/**
 * ARIA label for back to home link
 * @type {string}
 */
export const ARIA_BACK_HOME = "Revenir à la page d'accueil";

/**
 * ARIA label for search history button
 * @type {string}
 */
export const ARIA_HISTORY_BUTTON = "Voir l'historique de recherche";

/**
 * Button label for settings modal
 * @type {string}
 */
export const BUTTON_SETTINGS = "Paramètres";

/**
 * ARIA label for settings button
 * @type {string}
 */
export const ARIA_SETTINGS_BUTTON = "Ouvrir les paramètres";

/**
 * Label for theme settings section
 * @type {string}
 */
export const SETTINGS_THEME_LABEL = "Thème";

/**
 * Label for performance settings section
 * @type {string}
 */
export const SETTINGS_PERFORMANCE_LABEL = "Animations";

/**
 * Label for low performance mode
 * @type {string}
 */
export const PERFORMANCE_LOW = "Désactivées";

/**
 * Label for high performance mode
 * @type {string}
 */
export const PERFORMANCE_HIGH = "Activées";

/**
 * ARIA label for performance toggle
 * @type {string}
 */
export const ARIA_PERFORMANCE_TOGGLE =
  "Basculer entre mode économie et performance élevée";

/**
 * Label for history settings section
 * @type {string}
 */
export const SETTINGS_HISTORY_LABEL = "Historique";

/**
 * Label for cookie management settings section
 * @type {string}
 */
export const SETTINGS_COOKIES_LABEL = "Gestion des cookies";

/**
 * Label for reset storage settings section
 * @type {string}
 */
export const SETTINGS_RESET_LABEL = "Réinitialisation des cookies";

/**
 * Button label to reset localStorage
 * @type {string}
 */
export const BUTTON_RESET_STORAGE = "Réinitialiser le localStorage";

/**
 * ARIA label for reset storage button
 * @type {string}
 */
export const ARIA_RESET_STORAGE =
  "Réinitialiser toutes les données du localStorage";

/**
 * Label for cookies page link in footer
 * @type {string}
 */
export const LINK_COOKIES_PAGE = "Gestion des Cookies";

/**
 * Label for accessibility settings section
 * @type {string}
 */
export const SETTINGS_ACCESSIBILITY_LABEL = "Accessibilité";

/**
 * Label for high contrast accessibility setting
 * @type {string}
 */
export const ACCESSIBILITY_HIGH_CONTRAST_LABEL = "Contraste élevé";
export const ACCESSIBILITY_HIGH_CONTRAST_DESC =
  "Force le mode clair avec un contraste renforcé (WCAG AAA)";

/**
 * Label for external link confirmation accessibility setting
 * @type {string}
 */
export const ACCESSIBILITY_EXTERNAL_LINK_LABEL = "Confirmation liens externes";
export const ACCESSIBILITY_EXTERNAL_LINK_DESC =
  "Afficher une confirmation avant d'ouvrir un site externe";
