import { motion } from "framer-motion";
import { HiExclamationTriangle } from "react-icons/hi2";
import PropTypes from "prop-types";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function Disclaimer({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
      };

  return (
    <motion.div
      {...animationProps}
      className={`w-full border-b-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/30 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 lg:gap-4">
        <HiExclamationTriangle
          className="h-5 w-5 flex-shrink-0 text-emerald-700 transition duration-300 ease-in-out lg:h-6 lg:w-6 dark:text-emerald-400"
          aria-hidden="true"
        />
        <p className="text-center text-xs font-medium text-emerald-800 transition duration-300 ease-in-out lg:text-sm dark:text-emerald-200">
          <span className="font-semibold">Avertissement médical :</span> Les
          informations présentées sont fournies à titre informatif et ne
          remplacent pas un avis médical professionnel. Consultez toujours un
          médecin en cas de doute.
        </p>
      </div>
    </motion.div>
  );
}

Disclaimer.propTypes = {
  className: PropTypes.string,
};

export default Disclaimer;
