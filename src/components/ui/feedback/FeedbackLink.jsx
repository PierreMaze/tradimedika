import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { MdFeedback } from "react-icons/md";

const FeedbackLink = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`mx-auto mt-12 max-w-2xl rounded-lg border-2 border-dashed border-emerald-600/40 bg-emerald-50 p-6 text-center transition duration-300 dark:border-emerald-500/30 dark:bg-emerald-950/20 ${className}`}
    >
      <p className="mb-4 text-base text-neutral-700 lg:text-lg dark:text-neutral-300">
        Le projet vous plaît, vous avez trouvé un bug ? Faites-le nous savoir !
      </p>
      <a
        href="https://tally.so/r/3x0O8o"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-700 dark:hover:bg-emerald-600"
        aria-label="Donner votre feedback (ouvre dans une nouvelle fenêtre)"
      >
        <MdFeedback className="text-xl" aria-hidden="true" />
        <span>Envoyer votre feedback</span>
      </a>
    </motion.div>
  );
};

FeedbackLink.propTypes = {
  className: PropTypes.string,
};

export default FeedbackLink;
