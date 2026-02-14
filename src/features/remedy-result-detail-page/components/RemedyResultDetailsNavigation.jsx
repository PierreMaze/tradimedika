import PropTypes from "prop-types";
import { HiArrowLeft } from "react-icons/hi2";
import Button from "../../../components/ui/button/Button";

function RemedyResultDetailsNavigation({ selectedSymptoms, variant = "top" }) {
  if (variant === "top") {
    return (
      <div className="animate-fade-in-up mb-6 flex items-center gap-3 delay-300 motion-reduce:animate-none motion-reduce:opacity-100">
        <Button
          as="link"
          to="/remedes"
          state={{ symptoms: selectedSymptoms }}
          variant="primary"
          icon={HiArrowLeft}
          ariaLabel="Retour aux résultats"
        >
          Retour aux résultats
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-4 delay-500 motion-reduce:animate-none motion-reduce:opacity-100 sm:flex-row">
      <Button
        as="link"
        to="/remedes"
        state={{ symptoms: selectedSymptoms }}
        variant="primary"
        icon={HiArrowLeft}
        ariaLabel="Retour aux résultats"
      >
        Retour aux résultats
      </Button>
      <Button
        as="link"
        to="/"
        variant="secondary"
        ariaLabel="Retour à l'accueil"
      >
        Nouvelle recherche
      </Button>
    </div>
  );
}

RemedyResultDetailsNavigation.propTypes = {
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["top", "bottom"]),
};

export default RemedyResultDetailsNavigation;
