// utils/validation.js
import symptomList from "../data/symptomList.json";
import synonymsData from "../data/synonymsSymptomList.json";
import { normalizeForMatching } from "./normalizeSymptom";

/**
 * Pattern regex pour valider le format d'un symptôme
 * Autorise: lettres minuscules, chiffres, accents français, espaces, tirets, apostrophes
 */
const SYMPTOM_FORMAT_PATTERN = /^[a-z0-9àâäéèêëïîôùûüÿçœ\s'-]+$/i;

/**
 * Taille maximale pour un symptôme individuel (caractères)
 */
const MAX_SYMPTOM_LENGTH = 100;

/**
 * Taille maximale pour la chaîne totale de query param (caractères)
 */
const MAX_QUERY_PARAM_LENGTH = 500;

/**
 * Nombre maximum de symptômes autorisés
 */
const MAX_SYMPTOMS_COUNT = 5;

/**
 * Vérifie si un symptôme est dans la whitelist (symptomList.json ou synonymes)
 * Utilise normalizeForMatching pour comparaison insensible aux accents
 *
 * @param {string} symptom - Le symptôme à valider
 * @returns {boolean} - true si le symptôme est valide
 */
function isSymptomInWhitelist(symptom) {
  const normalized = normalizeForMatching(symptom);

  // Vérifier dans symptomList.json
  const isInMainList = symptomList.some(
    (s) => normalizeForMatching(s) === normalized,
  );
  if (isInMainList) return true;

  // Vérifier dans les synonymes
  const allSynonyms = Object.values(synonymsData).flat();
  const isInSynonyms = allSynonyms.some(
    (s) => normalizeForMatching(s) === normalized,
  );
  if (isInSynonyms) return true;

  return false;
}

/**
 * Valide le format d'un symptôme (pattern regex)
 *
 * @param {string} symptom - Le symptôme à valider
 * @returns {boolean} - true si le format est valide
 */
function isSymptomFormatValid(symptom) {
  if (typeof symptom !== "string") return false;
  if (symptom.length === 0 || symptom.length > MAX_SYMPTOM_LENGTH) return false;
  return SYMPTOM_FORMAT_PATTERN.test(symptom);
}

/**
 * Valide un symptôme : format ET présence dans la whitelist
 *
 * @param {string} symptom - Le symptôme à valider
 * @returns {boolean} - true si le symptôme est valide
 */
export function validateSymptom(symptom) {
  if (!isSymptomFormatValid(symptom)) return false;
  if (!isSymptomInWhitelist(symptom)) return false;
  return true;
}

/**
 * Valide un tableau de symptômes
 * - Rejette si trop de symptômes (> MAX_SYMPTOMS_COUNT)
 * - Filtre les symptômes invalides
 * - Retourne un tableau de symptômes valides
 *
 * @param {string[]} symptoms - Tableau de symptômes à valider
 * @returns {string[]} - Tableau de symptômes valides
 */
export function validateSymptoms(symptoms) {
  if (!Array.isArray(symptoms)) return [];

  // Limiter le nombre de symptômes
  const limitedSymptoms = symptoms.slice(0, MAX_SYMPTOMS_COUNT);

  // Filtrer les symptômes valides
  return limitedSymptoms.filter((symptom) => validateSymptom(symptom));
}

/**
 * Valide une chaîne de query parameter avant parsing
 * Rejette si trop longue pour éviter attaques DoS
 *
 * @param {string} queryParam - La chaîne du query parameter
 * @returns {boolean} - true si la chaîne est valide
 */
export function validateQueryParamLength(queryParam) {
  if (typeof queryParam !== "string") return false;
  return queryParam.length <= MAX_QUERY_PARAM_LENGTH;
}

/**
 * Parse et valide les symptômes depuis un query parameter
 * Sécurise contre les injections et les données malveillantes
 *
 * @param {string} symptomsParam - Le query parameter "symptoms"
 * @returns {string[]} - Tableau de symptômes valides
 */
export function parseAndValidateSymptoms(symptomsParam) {
  // Vérifier la longueur totale
  if (!validateQueryParamLength(symptomsParam)) {
    console.warn(
      `Query parameter trop long: ${symptomsParam.length} caractères (max: ${MAX_QUERY_PARAM_LENGTH})`,
    );
    return [];
  }

  // Parser les symptômes
  const rawSymptoms = symptomsParam
    .split(",")
    .map((s) => {
      try {
        return decodeURIComponent(s.trim());
      } catch (error) {
        console.warn(`Erreur lors du décodage d'un symptôme: "${s}"`, error);
        return null;
      }
    })
    .filter(Boolean);

  // Valider chaque symptôme
  return validateSymptoms(rawSymptoms);
}

/**
 * Pattern regex pour valider un slug
 * Autorise: lettres minuscules, chiffres, accents français, tirets (pas d'espaces)
 */
const SLUG_PATTERN = /^[a-z0-9àâäéèêëïîôùûüÿçœ-]+$/;

/**
 * Taille maximale pour un slug (caractères)
 */
const MAX_SLUG_LENGTH = 100;

/**
 * Valide le format d'un slug
 * Le slug doit correspondre au format généré par generateSlug():
 * - Minuscules uniquement
 * - Accents français autorisés
 * - Tirets pour séparer les mots
 * - Pas d'espaces ni caractères spéciaux
 *
 * @param {string} slug - Le slug à valider
 * @returns {boolean} - true si le format est valide
 */
export function validateSlugFormat(slug) {
  if (typeof slug !== "string") return false;
  if (slug.length === 0 || slug.length > MAX_SLUG_LENGTH) return false;
  if (!SLUG_PATTERN.test(slug)) return false;

  // Vérifications supplémentaires
  if (slug.startsWith("-") || slug.endsWith("-")) return false; // Pas de tirets au début/fin
  if (slug.includes("--")) return false; // Pas de double tirets

  return true;
}
