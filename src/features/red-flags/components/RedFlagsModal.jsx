import PropTypes from "prop-types";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";
import { RED_FLAGS_QUESTIONS } from "../../../constants/redFlagsConfig";

export default function RedFlagsModal({
  isOpen,
  onComplete,
  answers,
  setAnswer,
  disclaimerAccepted,
  acceptDisclaimer,
  allQuestionsAnswered,
}) {
  const canContinue = allQuestionsAnswered && disclaimerAccepted;

  const handleContinue = () => {
    if (canContinue) {
      onComplete();
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={() => {}}
      title="Quelques questions sur vos symptômes"
      icon={IoMdInformationCircleOutline}
      subtitle="Ces informations nous aident à vous orienter au mieux"
      maxWidth="2xl"
      showCloseButton={false}
      footer={
        <div className="flex w-full justify-end">
          <ModalButton
            onClick={handleContinue}
            variant="primary"
            disabled={!canContinue}
            aria-label="Continuer vers les résultats"
          >
            Continuer
          </ModalButton>
        </div>
      }
    >
      <div className="space-y-6">
        {RED_FLAGS_QUESTIONS.map((question) => (
          <div
            key={question.id}
            className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <legend className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
              {question.question}
            </legend>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-700/50"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => setAnswer(question.id, option.id)}
                    className="h-4 w-4 cursor-pointer border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:border-neutral-600"
                  />
                  <span className="text-sm text-neutral-900 dark:text-neutral-100">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-lg border-2 border-dashed border-amber-600 bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
            <strong className="text-amber-800 dark:text-amber-400">
              Important :
            </strong>{" "}
            Ces questions permettent d&apos;identifier des symptômes qui
            nécessitent l&apos;avis d&apos;un professionnel de santé.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/50">
          <input
            type="checkbox"
            checked={disclaimerAccepted}
            onChange={(e) => acceptDisclaimer(e.target.checked)}
            className="mt-1 h-4 w-4 cursor-pointer rounded border-neutral-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:border-neutral-600"
            aria-label="J'ai compris que ces informations sont à caractère éducatif"
          />
          <span className="text-sm text-neutral-900 dark:text-neutral-100">
            J&apos;ai compris que ces informations sont à caractère éducatif et
            ne remplacent pas l&apos;avis d&apos;un professionnel de santé.
          </span>
        </label>
      </div>
    </ModalLayout>
  );
}

RedFlagsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  setAnswer: PropTypes.func.isRequired,
  disclaimerAccepted: PropTypes.bool.isRequired,
  acceptDisclaimer: PropTypes.func.isRequired,
  allQuestionsAnswered: PropTypes.bool.isRequired,
};
