import { motion } from "framer-motion";
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
  badgeText = "Version Bêta · v0.47.0",
  title = "Soulagez vos symptômes",
  titleHighlight = "naturellement",
  description = "Les bienfaits de la méthode douce pour traiter vos maux du quotidien.",
}) {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
      {/* Badge "Medecine douce & naturelle" */}
      <div className="mx-auto w-fit">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-dark/60 text-dark flex items-center gap-2 rounded-lg border-2 bg-white px-4 py-2 shadow-md transition duration-300 ease-in-out dark:border-emerald-500/60 dark:bg-emerald-950 dark:text-emerald-400"
        >
          <GiSprout className="text-lg text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-400" />
          <span className="font-sans text-sm font-semibold lg:text-base 2xl:text-lg">
            {badgeText}
          </span>
        </motion.div>
      </div>

      {/* Titre principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
          <span className="text-dark dark:text-light transition duration-300 ease-in-out">
            {title}
          </span>
          <br />
          <span className="text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-500">
            {titleHighlight}
          </span>
        </h1>
      </motion.div>

      {/* Texte descriptif */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-2xl text-center text-base text-neutral-600 transition duration-300 ease-in-out lg:text-lg 2xl:max-w-4xl 2xl:text-2xl dark:text-neutral-400"
      >
        {description}
      </motion.p>
    </div>
  );
}

HeroHeader.propTypes = {
  badgeText: PropTypes.string,
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  description: PropTypes.string,
};
