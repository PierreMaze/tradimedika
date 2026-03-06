// features/product-search/utils/validation.js
import db from "../../../data/db.json";
import { normalizeForMatching } from "./normalize";

/**
 * Pattern regex pour valider le format d'un nom de produit
 * Autorise: lettres, chiffres, accents français, espaces, tirets, apostrophes
 */
const PRODUCT_FORMAT_PATTERN = /^[a-z0-9àâäéèêëïîôùûüÿçœ\s'-]+$/i;

const MAX_PRODUCT_LENGTH = 100;
const MAX_QUERY_PARAM_LENGTH = 500;
const MAX_PRODUCTS_COUNT = 5;

// Noms de produits valides depuis db.json
const VALID_PRODUCT_NAMES = db.map((p) => normalizeForMatching(p.name));

/**
 * Vérifie si un produit existe dans db.json
 * @param {string} product - Le nom de produit à valider
 * @returns {boolean}
 */
function isProductInDatabase(product) {
  const normalized = normalizeForMatching(product);
  return VALID_PRODUCT_NAMES.includes(normalized);
}

/**
 * Valide le format d'un nom de produit
 * @param {string} product - Le nom de produit à valider
 * @returns {boolean}
 */
function isProductFormatValid(product) {
  if (typeof product !== "string") return false;
  if (product.length === 0 || product.length > MAX_PRODUCT_LENGTH) return false;
  return PRODUCT_FORMAT_PATTERN.test(product);
}

/**
 * Valide un produit : format ET présence dans db.json
 * @param {string} product - Le nom de produit à valider
 * @returns {boolean}
 */
export function validateProduct(product) {
  if (!isProductFormatValid(product)) return false;
  if (!isProductInDatabase(product)) return false;
  return true;
}

/**
 * Valide un tableau de produits
 * @param {string[]} products - Tableau de noms de produits à valider
 * @returns {string[]} - Tableau de produits valides
 */
export function validateProducts(products) {
  if (!Array.isArray(products)) return [];
  const limitedProducts = products.slice(0, MAX_PRODUCTS_COUNT);
  return limitedProducts.filter((product) => validateProduct(product));
}

/**
 * Valide une chaîne de query parameter avant parsing
 * @param {string} queryParam - La chaîne du query parameter
 * @returns {boolean}
 */
export function validateQueryParamLength(queryParam) {
  if (typeof queryParam !== "string") return false;
  return queryParam.length <= MAX_QUERY_PARAM_LENGTH;
}

/**
 * Parse et valide les produits depuis un query parameter
 * @param {string} productsParam - Le query parameter "products"
 * @returns {string[]} - Tableau de noms de produits valides
 */
export function parseAndValidateProducts(productsParam) {
  if (!validateQueryParamLength(productsParam)) {
    console.warn(
      `Query parameter trop long: ${productsParam.length} caractères (max: ${MAX_QUERY_PARAM_LENGTH})`,
    );
    return [];
  }

  const rawProducts = productsParam
    .split(",")
    .map((s) => {
      try {
        return decodeURIComponent(s.trim());
      } catch (error) {
        console.warn(`Erreur lors du décodage d'un produit: "${s}"`, error);
        return null;
      }
    })
    .filter(Boolean);

  return validateProducts(rawProducts);
}

/**
 * Pattern regex pour valider un slug
 */
const SLUG_PATTERN = /^[a-z0-9àâäéèêëïîôùûüÿçœ-]+$/;
const MAX_SLUG_LENGTH = 100;

/**
 * Valide le format d'un slug
 * @param {string} slug - Le slug à valider
 * @returns {boolean}
 */
export function validateSlugFormat(slug) {
  if (typeof slug !== "string") return false;
  if (slug.length === 0 || slug.length > MAX_SLUG_LENGTH) return false;
  if (!SLUG_PATTERN.test(slug)) return false;
  if (slug.startsWith("-") || slug.endsWith("-")) return false;
  if (slug.includes("--")) return false;
  return true;
}
