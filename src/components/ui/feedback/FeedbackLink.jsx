import PropTypes from "prop-types";
import { MdFeedback } from "react-icons/md";
import Button from "../button/Button";

const FeedbackLink = ({ className = "" }) => {
  return (
    <div
      className={`animate-fade-in-up mx-auto mt-12 max-w-2xl rounded-lg border-2 border-dashed border-emerald-600 bg-emerald-50 p-6 text-center transition-all duration-150 motion-reduce:animate-none motion-reduce:opacity-100 dark:border-emerald-500/80 dark:bg-emerald-950/60 ${className}`}
    >
      <p className="mb-4 text-base text-neutral-800 lg:text-lg dark:text-neutral-100">
        Le projet vous plaît, vous avez trouvé un bug ? Faites-le nous savoir !
      </p>
      <Button
        as="external"
        href="https://tally.so/r/3x0O8o"
        siteName="Tally"
        variant="primary"
        icon={MdFeedback}
        ariaLabel="Donner votre feedback (ouvre dans une nouvelle fenêtre)"
      >
        Envoyer votre feedback
      </Button>
    </div>
  );
};

FeedbackLink.propTypes = {
  className: PropTypes.string,
};

export default FeedbackLink;
