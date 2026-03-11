/**
 * Logique de filtrage avancé multi-critères pour la recherche B2B
 *
 * Pattern : ET entre catégories de filtres, OU au sein d'une catégorie
 * Même pattern que filterProducts.js existant
 */

import { AGE_THRESHOLDS } from "./searchConstants";

/**
 * Normalise une chaîne pour la comparaison (minuscules, sans accents)
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Vérifie si un produit appartient à une catégorie thérapeutique
 * Un produit appartient à une catégorie si au moins une de ses properties
 * a une category qui fait partie du mapping de la catégorie thérapeutique
 */
// function productMatchesCategory(product, categoryId) {
//   const category = THERAPEUTIC_CATEGORIES.find((c) => c.id === categoryId);
//   if (!category) return false;

//   return (product.properties || []).some((prop) =>
//     category.mappedCategories.includes(prop.category),
//   );
// }

/**
 * Vérifie si un produit traite un symptôme
 * Un produit traite un symptôme si le symptôme est présent dans le tableau symptoms du produit
 */
function productMatchesSymptom(product, symptomId) {
  if (!product.symptoms || !Array.isArray(product.symptoms)) return false;

  // Normalise le symptomId pour la comparaison
  const normalizedSymptomId = normalizeText(symptomId);

  return product.symptoms.some((symptom) => {
    const normalizedSymptom = normalizeText(symptom);
    return (
      normalizedSymptom.includes(normalizedSymptomId) ||
      normalizedSymptomId.includes(normalizedSymptom)
    );
  });
}

/**
 * Filtre les produits selon tous les critères de recherche avancée
 *
 * @param {Array} products - Tableau de produits de db.json
 * @param {Object} filters - État des filtres
 * @returns {Array} - Produits filtrés
 */
export function advancedFilterProducts(products, filters) {
  const {
    textSearch = "",
    alphabet = [],
    types = {},
    symptoms = {},
    properties = {},
    pregnancy = {},
    childrenAge = {},
    excludedAllergens = [],
    evidenceLevel = {},
    verification = {},
  } = filters;

  const hasTypeFilters = Object.values(types).some(Boolean);
  const hasSymptomFilters = Object.values(symptoms).some(Boolean);
  const hasPropertyFilters = Object.values(properties).some(Boolean);
  const hasPregnancyFilters = Object.values(pregnancy).some(Boolean);
  const hasChildrenAgeFilters = Object.values(childrenAge).some(Boolean);
  const hasAllergenFilters = excludedAllergens.length > 0;
  const hasEvidenceFilters = Object.values(evidenceLevel).some(Boolean);
  const hasVerificationFilters = Object.values(verification).some(Boolean);
  const hasTextSearch = textSearch.trim().length > 0;
  const hasAlphabetFilters = alphabet.length > 0;

  return products.filter((product) => {
    if (hasTextSearch) {
      const normalizedSearch = normalizeText(textSearch);
      const normalizedName = normalizeText(product.name);
      if (!normalizedName.includes(normalizedSearch)) return false;
    }

    if (hasAlphabetFilters) {
      const firstLetter = product.name.charAt(0).toUpperCase();
      if (!alphabet.includes(firstLetter)) return false;
    }

    // Filtre par type (OU au sein de la catégorie)
    if (hasTypeFilters) {
      const activeTypes = Object.entries(types)
        .filter(([, active]) => active)
        .map(([typeId]) => typeId);
      if (!activeTypes.includes(product.type)) return false;
    }

    // Filtre par symptômes (OU au sein de la catégorie)
    if (hasSymptomFilters) {
      const activeSymptoms = Object.entries(symptoms)
        .filter(([, active]) => active)
        .map(([symptomId]) => symptomId);
      const matchesAny = activeSymptoms.some((symptomId) =>
        productMatchesSymptom(product, symptomId),
      );
      if (!matchesAny) return false;
    }

    // Filtre par propriétés (OU au sein de la catégorie)
    if (hasPropertyFilters) {
      const activeProperties = Object.entries(properties)
        .filter(([, active]) => active)
        .map(([propName]) => propName);
      const productPropertyNames = (product.properties || []).map((p) =>
        normalizeText(p.name),
      );
      const matchesAny = activeProperties.some((propName) =>
        productPropertyNames.includes(normalizeText(propName)),
      );
      if (!matchesAny) return false;
    }

    // Filtre grossesse (OU au sein de la catégorie)
    if (hasPregnancyFilters) {
      const matchesPregnancy =
        (pregnancy.ok && product.pregnancySafe?.safe === true) ||
        (pregnancy.variant && product.pregnancySafe?.safe === null) ||
        (pregnancy.interdit && product.pregnancySafe?.safe === false);
      if (!matchesPregnancy) return false;
    }

    // Filtre âge enfants (OU au sein de la catégorie)
    if (hasChildrenAgeFilters) {
      const activeAges = Object.entries(childrenAge)
        .filter(([, active]) => active)
        .map(([ageId]) => ageId);

      const matchesAny = activeAges.some((ageId) => {
        const threshold = AGE_THRESHOLDS[ageId];
        if (threshold === null) {
          // "Tous âges" = produits sans restriction (childrenAge === null)
          return product.childrenAge === null;
        }
        // Produit utilisable à cet âge = childrenAge <= threshold ou null
        return product.childrenAge === null || product.childrenAge <= threshold;
      });
      if (!matchesAny) return false;
    }

    // Filtre allergènes (EXCLUT les produits contenant les allergènes sélectionnés)
    if (hasAllergenFilters) {
      const productAllergens = product.allergens || [];
      const hasMatchingAllergen = excludedAllergens.some((allergenId) =>
        productAllergens.includes(allergenId),
      );
      if (hasMatchingAllergen) return false;
    }

    // Filtre niveau de preuve (OU au sein de la catégorie)
    if (hasEvidenceFilters) {
      const activeLevels = Object.entries(evidenceLevel)
        .filter(([, active]) => active)
        .map(([level]) => level);
      if (!activeLevels.includes(product.evidenceLevel)) return false;
    }

    // Filtre vérification (OU au sein de la catégorie)
    if (hasVerificationFilters) {
      const matchesVerification =
        (verification.verified && product.verifiedByProfessional === true) ||
        (verification.traditional && product.verifiedByProfessional === false);
      if (!matchesVerification) return false;
    }

    return true;
  });
}

/**
 * Trie les produits filtrés
 *
 * @param {Array} products - Produits à trier
 * @param {string} sortBy - Champ de tri (name, evidenceLevel, type)
 * @param {string} sortOrder - Ordre (asc, desc)
 * @returns {Array} - Produits triés
 */
export function sortProducts(products, sortBy = "name", sortOrder = "asc") {
  const sorted = [...products].sort((a, b) => {
    let valA, valB;

    switch (sortBy) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "evidenceLevel":
        valA = a.evidenceLevel || "Z";
        valB = b.evidenceLevel || "Z";
        break;
      case "type":
        valA = a.type.toLowerCase();
        valB = b.type.toLowerCase();
        break;
      default:
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}

/**
 * Extrait les propriétés uniques de tous les produits
 *
 * @param {Array} products - Tous les produits de db.json
 * @returns {Array} - Propriétés uniques triées { name, count }
 */
export function extractUniqueProperties(products) {
  const propertyMap = new Map();

  products.forEach((product) => {
    (product.properties || []).forEach((prop) => {
      const normalized = normalizeText(prop.name);
      if (!propertyMap.has(normalized)) {
        propertyMap.set(normalized, { name: prop.name, count: 0 });
      }
      propertyMap.get(normalized).count++;
    });
  });

  return Array.from(propertyMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );
}
