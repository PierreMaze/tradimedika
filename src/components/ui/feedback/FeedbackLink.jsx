import PropTypes from "prop-types";
import { MdFeedback } from "react-icons/md";
import ExternalLink from "../links/ExternalLink";

const FeedbackLink = ({ className = "" }) => {
  return (
    <div
      className={`animate-fade-in-up mx-auto mt-12 max-w-2xl rounded-lg border-2 border-dashed border-emerald-600/40 bg-emerald-50 p-6 text-center transition delay-200 duration-300 motion-reduce:animate-none motion-reduce:opacity-100 dark:border-emerald-500/30 dark:bg-emerald-950/20 ${className}`}
    >
      <p className="mb-4 text-base text-neutral-700 lg:text-lg dark:text-neutral-300">
        Le projet vous plaît, vous avez trouvé un bug ? Faites-le nous savoir !
      </p>
      <ExternalLink
        href="https://tally.so/r/3x0O8o"
        siteName="Tally"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none dark:bg-emerald-700 dark:hover:bg-emerald-600"
        aria-label="Donner votre feedback (ouvre dans une nouvelle fenêtre)"
      >
        <MdFeedback className="text-xl" aria-hidden="true" />
        <span>Envoyer votre feedback</span>
      </ExternalLink>
    </div>
  );
};

FeedbackLink.propTypes = {
  className: PropTypes.string,
};

export default FeedbackLink;
