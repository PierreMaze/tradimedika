import { useLocalStorage } from "../../../hooks/useLocalStorage";

const STORAGE_KEY = "tradimedika-selected-symptoms";

export function useSymptomsPersistence() {
  const [symptoms, setSymptoms] = useLocalStorage(STORAGE_KEY, []);

  const validateSymptoms = (symptomsArray) => {
    if (!Array.isArray(symptomsArray)) return [];
    return symptomsArray.filter(
      (symptom) => typeof symptom === "string" && symptom.trim().length > 0,
    );
  };

  const validatedSymptoms = validateSymptoms(symptoms);

  const setSymptomsAndPersist = (newSymptoms) => {
    const validated = validateSymptoms(newSymptoms);
    setSymptoms(validated);
  };

  return [validatedSymptoms, setSymptomsAndPersist];
}
