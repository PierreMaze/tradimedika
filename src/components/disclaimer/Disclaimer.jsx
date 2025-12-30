import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { HiExclamationTriangle } from "react-icons/hi2";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const disclaimerVariants = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.4,
    },
  },
};

function Disclaimer({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        variants: disclaimerVariants,
        initial: "hidden",
        animate: "visible",
      };

  return (
    <motion.div
      {...animationProps}
      className={`w-full border-b-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition duration-300 ease-in-out lg:w-3/4 dark:border-emerald-400/60 dark:bg-emerald-950 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 lg:gap-4">
        <HiExclamationTriangle
          className="flex h-5 w-5 shrink-0 text-emerald-600 transition duration-300 ease-in-out lg:h-6 lg:w-6 dark:text-emerald-400"
          aria-hidden="true"
        />
        <p className="text-xs font-medium text-emerald-800 transition duration-300 ease-in-out lg:text-sm dark:text-emerald-100">
          Les informations présentées sont fournies à{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            titre informatif et ne remplacent pas un avis médical professionnel
          </span>
          . Consultez{" "}
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            TOUJOURS
          </span>{" "}
          un médecin en cas de doute.
        </p>
      </div>
    </motion.div>
  );
}

Disclaimer.propTypes = {
  className: PropTypes.string,
};

export default Disclaimer;
