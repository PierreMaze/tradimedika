import PropTypes from "prop-types";

/**
 * ModalButton Component
 *
 * Boutons standards pour les modales avec couleurs cohérentes
 *
 * Variants:
 * - primary: Bouton principal (emerald)
 * - secondary: Bouton secondaire (neutral)
 * - danger: Bouton danger (red)
 */
function ModalButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  ariaLabel,
  icon: Icon,
}) {
  const baseClasses =
    "min-h-[44px] cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600",
    secondary:
      "border-2 border-neutral-400 bg-light text-neutral-700 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-dark dark:text-white dark:hover:bg-neutral-700",
    danger:
      "border-2 border-red-700 bg-red-100 text-red-700 hover:border-red-800 hover:bg-red-700 hover:text-white dark:border-red-400 dark:bg-red-900/30 dark:text-white dark:hover:bg-red-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {Icon && <Icon className="inline-flex text-lg" />} {children}
    </button>
  );
}

ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  icon: PropTypes.elementType,
};

export default ModalButton;
