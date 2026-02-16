import PropTypes from "prop-types";
import { GiSprout } from "react-icons/gi";

/**
 * Composant HeroHeader - En-tête de la page d'accueil
 *
 * Affiche :
 * - Badge "Méthode Douce & Naturelle" avec icône
 * - Titre principal avec animation
 * - Description
 *
 * @param {Object} props
 * @param {string} props.badgeText - Texte du badge (défaut: "Méthode Douce & Naturelle")
 * @param {string} props.title - Première partie du titre (défaut: "Soulagez vos symptômes")
 * @param {string} props.titleHighlight - Partie mise en évidence du titre (défaut: "naturellement")
 * @param {string} props.description - Texte de description
 * @returns {JSX.Element}
 */
export default function HeroHeader({
  badgeText = "Prototype · v0.55.5",
  title = "Prenez soin de vous",
  titleHighlight = "naturellement",
  description = "Ce site est un prototype et n'est pas destiné à être utilisé pour des fins médicales.",
}) {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
      {/* Badge "Prototype · v0.55.5" */}
      <div className="mx-auto w-fit">
        <div className="border-dark/60 text-dark animate-fade-in-down flex items-center gap-2 rounded-lg border-2 bg-white px-4 py-2 shadow-md transition-colors duration-150 ease-in-out motion-reduce:animate-none motion-reduce:opacity-100 dark:border-emerald-500/60 dark:bg-emerald-950 dark:text-emerald-400">
          <GiSprout className="items-center text-lg text-emerald-600 transition-colors duration-150 ease-in-out dark:text-emerald-400" />
          <span className="font-sans text-sm font-semibold lg:text-base 2xl:text-lg">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Titre principal */}
      <div className="animate-fade-in-up text-center delay-200 motion-reduce:animate-none motion-reduce:opacity-100">
        <h1 className="text-5xl font-semibold lg:text-7xl 2xl:text-8xl">
          <span className="text-dark dark:text-light transition-colors duration-150 ease-in-out">
            {title}
          </span>
          <br />
          <span className="text-emerald-600 transition-colors duration-150 ease-in-out dark:text-emerald-500">
            {titleHighlight}
          </span>
        </h1>
      </div>

      {/* Texte descriptif */}
      <p className="animate-fade-in-up max-w-3xl text-center text-base text-amber-600 transition-colors duration-150 ease-in-out motion-reduce:animate-none motion-reduce:opacity-100 lg:text-xl 2xl:max-w-5xl 2xl:text-2xl dark:text-amber-400">
        {description}
      </p>
    </div>
  );
}

HeroHeader.propTypes = {
  badgeText: PropTypes.string,
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  description: PropTypes.string,
};
