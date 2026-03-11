/**
 * Constantes pour la recherche avancée B2B
 * Catégories thérapeutiques, options de filtres, labels
 */

/**
 * Mapping des catégories thérapeutiques
 * Chaque catégorie mappe vers les valeurs de properties.category dans db.json
 */
export const THERAPEUTIC_CATEGORIES = [
  {
    id: "digestif",
    label: "Système digestif",
    mappedCategories: ["digestion", "digestif"],
  },
  {
    id: "immunitaire",
    label: "Système immunitaire",
    mappedCategories: ["immunité", "immunite"],
  },
  {
    id: "calmant",
    label: "Anti-douleur / Calmant",
    mappedCategories: ["calment"],
  },
  {
    id: "antiseptique",
    label: "Antiseptique / Désinfectant",
    mappedCategories: ["désinfectant"],
  },
  {
    id: "energie",
    label: "Énergie / Vitalité",
    mappedCategories: ["énergie"],
  },
  {
    id: "flore",
    label: "Flore intestinale",
    mappedCategories: ["flore"],
  },
  {
    id: "muqueuse",
    label: "Protection muqueuses",
    mappedCategories: ["muqueuse"],
  },
  {
    id: "bien-etre",
    label: "Bien-être général",
    mappedCategories: ["bien-être"],
  },
];

/**
 * Types de produits disponibles dans db.json
 */
export const PRODUCT_TYPES = [
  { id: "aliment", label: "Aliment" },
  { id: "plante", label: "Plante" },
  { id: "épice", label: "Épice" },
  { id: "boisson", label: "Boisson" },
];

/**
 * Options de sécurité grossesse
 */
export const PREGNANCY_OPTIONS = [
  { id: "ok", label: "Autorisé", color: "green" },
  { id: "variant", label: "Avec précautions", color: "amber" },
  { id: "interdit", label: "Contre-indiqué", color: "red" },
];

/**
 * Options d'âge enfants (seuils basés sur les données existantes)
 */
export const CHILDREN_AGE_OPTIONS = [
  { id: "allAges", label: "Tous âges", description: "Aucune restriction" },
  { id: "age1", label: "1 an et +", description: "Dès 1 an" },
  { id: "age3", label: "3 ans et +", description: "Dès 3 ans" },
  { id: "age6", label: "6 ans et +", description: "Dès 6 ans" },
  { id: "age12", label: "12 ans et +", description: "Dès 12 ans" },
];

/**
 * Niveaux de preuve scientifique
 */
export const EVIDENCE_LEVELS = [
  {
    id: "A",
    label: "Niveau A",
    description: "Preuve scientifique forte",
    color: "emerald",
  },
  {
    id: "B",
    label: "Niveau B",
    description: "Preuve scientifique modérée",
    color: "sky",
  },
  {
    id: "C",
    label: "Niveau C",
    description: "Preuve limitée",
    color: "amber",
  },
  {
    id: "D",
    label: "Niveau D",
    description: "Usage traditionnel",
    color: "red",
  },
];

/**
 * Options de vérification
 */
export const VERIFICATION_OPTIONS = [
  {
    id: "verified",
    label: "Vérifié par un professionnel",
    color: "green",
  },
  {
    id: "traditional",
    label: "Usage traditionnel",
    color: "amber",
  },
];

/**
 * Options de tri
 */
export const SORT_OPTIONS = [
  { id: "name-asc", label: "Nom (A-Z)", sortBy: "name", sortOrder: "asc" },
  { id: "name-desc", label: "Nom (Z-A)", sortBy: "name", sortOrder: "desc" },
  {
    id: "evidence-asc",
    label: "Preuve (A → D)",
    sortBy: "evidenceLevel",
    sortOrder: "asc",
  },
  {
    id: "evidence-desc",
    label: "Preuve (D → A)",
    sortBy: "evidenceLevel",
    sortOrder: "desc",
  },
  { id: "type-asc", label: "Type (A-Z)", sortBy: "type", sortOrder: "asc" },
];

/**
 * Mapping des seuils d'âge pour le filtrage
 */
export const AGE_THRESHOLDS = {
  allAges: null,
  age1: 1,
  age3: 3,
  age6: 6,
  age12: 12,
};

/**
 * Liste des symptômes disponibles
 * Générée à partir de src/data/symptomList.json
 */
export const SYMPTOM_LIST = [
  { id: "anxiete-legere", label: "Anxiété légère" },
  { id: "arthrose", label: "Arthrose" },
  { id: "ballonnements", label: "Ballonnements" },
  { id: "douleurs-articulaires", label: "Douleurs articulaires" },
  { id: "inflammation", label: "Inflammation" },
  { id: "inflammations-cutanees", label: "Inflammations cutanées" },
  { id: "mal-de-gorge", label: "Mal de gorge" },
  { id: "mal-des-transports", label: "Mal des transports" },
  { id: "maux-de-tete", label: "Maux de tête" },
  { id: "nausees", label: "Nausées" },
  { id: "nausees-de-grossesse", label: "Nausées de grossesse" },
  { id: "syndrome-intestin-irritable", label: "Syndrome intestin irritable" },
  { id: "toux", label: "Toux" },
  { id: "toux-nocturne", label: "Toux nocturne" },
  { id: "troubles-digestifs", label: "Troubles digestifs" },
  { id: "troubles-du-sommeil", label: "Troubles du sommeil" },
  { id: "vomissements", label: "Vomissements" },
];
