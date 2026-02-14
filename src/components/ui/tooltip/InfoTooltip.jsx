import PropTypes from "prop-types";
import { GrCircleQuestion } from "react-icons/gr";
import { Tooltip } from "./Tooltip";

/**
 * InfoTooltip - Bouton d'information unifié avec tooltip
 * Merge de TagsInfoButton et SectionHelpButton
 *
 * @component
 * @example
 * // Utilisation style TagsInfoButton
 * <InfoTooltip label="Indications d'usage" />
 *
 * @example
 * // Utilisation style SectionHelpButton
 * <InfoTooltip
 *   title="Effets et caractéristiques"
 *   message="Description détaillée..."
 *   iconColor="text-red-600"
 * />
 */
export function InfoTooltip({
  label,
  title,
  message,
  children,
  size = "md",
  variant = "inline",
  iconColor = "",
  className = "",
  placement = "top",
  ...tooltipProps
}) {
  // Générer le contenu du tooltip
  const getTooltipContent = () => {
    // Si children fourni, l'utiliser en priorité
    if (children) {
      return children;
    }

    // Si title ET message fournis (style SectionHelpButton)
    if (title && message) {
      return (
        <div className="max-w-xs sm:max-w-sm">
          <p className="text-base font-semibold text-black dark:text-white">
            {title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
            {message}
          </p>
        </div>
      );
    }

    // Si seulement title fourni
    if (title) {
      return (
        <div className="max-w-xs sm:max-w-sm">
          <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
            {title}
          </p>
        </div>
      );
    }

    // Contenu par défaut (style TagsInfoButton)
    return (
      <div className="max-w-xs sm:max-w-sm lg:max-w-md">
        <p className="text-lg font-semibold text-black dark:text-white">
          Indications d&apos;usage
        </p>
        <p className="mt-1 text-sm leading-relaxed text-neutral-800 lg:text-base dark:text-neutral-200">
          Les badges résument le niveau de fiabilité et les conditions
          d&apos;usage. Cliquez sur un badge pour en savoir plus.
        </p>
      </div>
    );
  };

  // Classes de taille du bouton
  const buttonSizeClasses = {
    sm: "min-h-[44px] min-w-[44px] h-fit w-fit text-sm",
    md: "min-h-[44px] min-w-[44px] h-fit w-fit text-base",
    lg: "min-h-[48px] min-w-[48px] h-fit w-fit text-lg",
  };

  // aria-label du bouton
  const ariaLabel = label
    ? `${label} - Informations`
    : title
      ? `${title} - Informations`
      : "Informations sur les indications d'usage";

  return (
    <div
      className={`relative ${variant === "inline" ? "inline-flex" : "flex"} ${className}`}
    >
      <Tooltip
        content={getTooltipContent()}
        placement={placement}
        hoverDelay={200}
        hideDelay={100}
        className="bg-white shadow-2xl dark:bg-neutral-900"
        {...tooltipProps}
      >
        <button
          type="button"
          aria-label={ariaLabel}
          className={`group inline-flex cursor-help items-center gap-2 rounded-full bg-transparent font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-95 dark:text-white ${buttonSizeClasses[size]} ${iconColor} `
            .trim()
            .replace(/\s+/g, " ")}
        >
          {label && (
            <span className="text-xs font-semibold text-neutral-700 lg:text-sm 2xl:text-base dark:text-neutral-200">
              {label}
            </span>
          )}
          <GrCircleQuestion
            className={`h-4 w-4 ${iconColor || "text-inherit"}`}
            aria-hidden="true"
          />
        </button>
      </Tooltip>
    </div>
  );
}

InfoTooltip.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["inline", "standalone"]),
  iconColor: PropTypes.string,
  className: PropTypes.string,
  placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};
