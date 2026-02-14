import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ExternalLink from "../links/ExternalLink";

/**
 * Button Component - Composant bouton générique unifié
 *
 * Remplace ModalButton et uniformise tous les boutons de l'application.
 * Support :
 * - 3 variantes : primary, secondary, danger
 * - 3 types : <button>, React Router <Link>, <ExternalLink>
 * - États : normal, disabled, loading
 * - Icônes : react-icons avec position configurable
 * - Accessibilité : WCAG 2.2 Level AA (min-h-44px)
 *
 * @example
 * // Bouton HTML standard
 * <Button variant="primary" onClick={handleClick}>Cliquez-moi</Button>
 *
 * // Navigation interne (React Router)
 * <Button as="link" to="/remedes" variant="primary">Voir remèdes</Button>
 *
 * // Lien externe avec confirmation
 * <Button as="external" href="https://github.com" siteName="GitHub">
 *   GitHub
 * </Button>
 *
 * // Avec icône et loading
 * <Button icon={HiArrowLeft} isLoading={loading} loadingText="Chargement...">
 *   Retour
 * </Button>
 */
function Button({
  children,
  variant = "primary",
  as = "button",

  // Props pour React Router Link
  to,
  state,

  // Props pour ExternalLink
  href,
  siteName,

  // Props pour button HTML
  onClick,
  disabled = false,
  type = "button",

  // Icône
  icon: Icon,
  iconPosition = "left",

  // États
  isLoading = false,
  loadingText = "Chargement...",

  // Accessibilité & style
  className = "",
  ariaLabel,
}) {
  // ========== STYLES BASE ==========
  const baseClasses =
    "inline-flex items-center justify-center gap-2 min-h-[44px] cursor-pointer rounded-lg px-6 py-3 font-semibold shadow-md transition duration-200 hover:shadow-lg focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  // ========== VARIANTES ==========
  const variantClasses = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300 dark:bg-emerald-800 dark:hover:bg-emerald-700",
    secondary:
      "border-2 border-emerald-600 bg-transparent text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500 dark:text-emerald-500 dark:border-emerald-600 dark:hover:bg-emerald-700 dark:hover:text-white",
    danger:
      "border-2 border-red-700 bg-red-100 text-red-700 hover:border-red-800 hover:bg-red-700 hover:text-white focus:ring-red-300 dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800",
  };

  // Classes finales combinées
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // ========== CONTENU (icône + texte + spinner) ==========
  const renderContent = () => {
    // État loading : spinner + texte
    if (isLoading) {
      return (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>{loadingText}</span>
        </>
      );
    }

    // Icône à gauche
    const leftIcon = Icon && iconPosition === "left" && (
      <Icon className="h-5 w-5" aria-hidden="true" />
    );

    // Icône à droite
    const rightIcon = Icon && iconPosition === "right" && (
      <Icon className="h-5 w-5" aria-hidden="true" />
    );

    return (
      <>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </>
    );
  };

  // ========== RENDU SELON TYPE ==========

  // Type : React Router Link
  if (as === "link") {
    return (
      <Link
        to={to}
        state={state}
        aria-label={ariaLabel}
        className={finalClasses}
      >
        {renderContent()}
      </Link>
    );
  }

  // Type : Lien externe (avec confirmation)
  if (as === "external") {
    return (
      <ExternalLink
        href={href}
        siteName={siteName}
        aria-label={ariaLabel}
        className={finalClasses}
      >
        {renderContent()}
      </ExternalLink>
    );
  }

  // Type : Button HTML (défaut)
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={finalClasses}
    >
      {renderContent()}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  as: PropTypes.oneOf(["button", "link", "external"]),

  // React Router Link props
  to: PropTypes.string,
  state: PropTypes.object,

  // ExternalLink props
  href: PropTypes.string,
  siteName: PropTypes.string,

  // Button HTML props
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),

  // Icône
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["left", "right"]),

  // États
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,

  // Accessibilité & style
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;
