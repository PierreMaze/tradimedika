import PropTypes from "prop-types";
import { PiSealWarningFill } from "react-icons/pi";

function RemedyResultDetailsAllergyWarning({ allergenNames }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="animate-fade-in-up mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-amber-700/60 bg-amber-50 p-4 transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 dark:border-amber-400/60 dark:bg-amber-950/75"
    >
      <PiSealWarningFill
        className="mt-0.5 shrink-0 text-2xl text-amber-700 dark:text-amber-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-base font-bold text-amber-700 uppercase dark:text-amber-400">
          Cette aliment contient vos allergènes
        </p>
        <p className="mt-1 text-sm text-amber-900 dark:text-amber-50">
          Cette aliment contient :{" "}
          <span className="font-semibold text-amber-700 dark:text-amber-400">
            {allergenNames}
          </span>
        </p>
        <p className="mt-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
          Consultez un professionnel de santé avant utilisation.
        </p>
      </div>
    </div>
  );
}

RemedyResultDetailsAllergyWarning.propTypes = {
  allergenNames: PropTypes.string.isRequired,
};

export default RemedyResultDetailsAllergyWarning;
