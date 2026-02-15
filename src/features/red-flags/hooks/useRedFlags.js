import { useState, useCallback, useMemo } from "react";
import { RED_FLAGS_QUESTIONS } from "../../../constants/redFlagsConfig";

const RED_FLAGS_SESSION_KEY = "tradimedika-red-flags-session";

export const useRedFlags = () => {
  const [answers, setAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const setAnswer = useCallback((questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  const allQuestionsAnswered = useMemo(() => {
    return RED_FLAGS_QUESTIONS.every((question) => answers[question.id]);
  }, [answers]);

  const checkRedFlags = useCallback(() => {
    return RED_FLAGS_QUESTIONS.some((question) => {
      const answerId = answers[question.id];
      const selectedOption = question.options.find(
        (opt) => opt.id === answerId,
      );
      return selectedOption?.isRedFlag === true;
    });
  }, [answers]);

  const hasRedFlags = useMemo(() => checkRedFlags(), [checkRedFlags]);

  const acceptDisclaimer = useCallback(() => {
    setDisclaimerAccepted(true);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const saveSession = useCallback(() => {
    const sessionData = {
      validated: true,
      timestamp: Date.now(),
      answers,
      hasRedFlags: checkRedFlags(),
    };
    sessionStorage.setItem(RED_FLAGS_SESSION_KEY, JSON.stringify(sessionData));
  }, [answers, checkRedFlags]);

  const isSessionValidated = useCallback(() => {
    const sessionData = sessionStorage.getItem(RED_FLAGS_SESSION_KEY);
    if (!sessionData) return false;

    try {
      const parsed = JSON.parse(sessionData);
      return parsed.validated === true;
    } catch {
      return false;
    }
  }, []);

  return {
    answers,
    setAnswer,
    allQuestionsAnswered,
    hasRedFlags,
    isModalOpen,
    disclaimerAccepted,
    acceptDisclaimer,
    openModal,
    closeModal,
    saveSession,
    isSessionValidated,
  };
};
