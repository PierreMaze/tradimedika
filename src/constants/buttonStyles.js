// tradimedika-v1/src/constants/buttonStyles.js

/**
 * Link Styles Constants
 *
 * Centralized styling constants for internal and external links.
 * Ensures visual consistency across the application.
 */

/**
 * Internal link styles (React Router NavLink/Link)
 * @type {string}
 */
export const BUTTON_PRIMARY_STYLES =
  "bg-emerald-600 text-white transition duration-150 ease-in-out hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600";

/**
 * External link styles (HTML anchor tags)
 * @type {string}
 */
export const BUTTON_SECONDARY_STYLES =
  "ring-2 ring-emerald-600 text-emerald-600 transition duration-200 hover:bg-emerald-600 hover:text-white dark:text-emerald-600 dark:hover:bg-emerald-600 dark:hover:text-white";

/**
 * Disabled button styles
 * Neutralizes all interactive states (hover, focus, active) when button is disabled
 * @type {string}
 */
export const BUTTON_DISABLED_STYLES =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-neutral-300 disabled:text-neutral-400 disabled:bg-neutral-100 dark:disabled:ring-neutral-600 dark:disabled:text-neutral-500 dark:disabled:bg-neutral-800";
