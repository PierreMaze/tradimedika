// scripts/normalizeData.js
// Script de migration pour normaliser tous les symptômes dans les fichiers JSON

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Normalise un symptôme (copie de src/utils/normalizeSymptom.js)
 */
function normalizeSymptom(symptom) {
  if (typeof symptom !== "string") {
    console.warn(`[normalizeSymptom] Expected string, got ${typeof symptom}`);
    return "";
  }

  return symptom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Chemins des fichiers
const PATHS = {
  symptomList: resolve(__dirname, "../src/data/symptomList.json"),
  synonyms: resolve(__dirname, "../src/data/synonymsSymptomList.json"),
  db: resolve(__dirname, "../src/data/db.json"),
};

console.log("\n🚀 Démarrage de la normalisation des données...\n");

// ==================== 1. SYMPTOM LIST ====================

console.log("📝 Traitement de symptomList.json...");
const symptomListRaw = readFileSync(PATHS.symptomList, "utf-8");
const symptomList = JSON.parse(symptomListRaw);

const symptomListNormalized = symptomList.map((symptom) => {
  const normalized = normalizeSymptom(symptom);
  if (normalized !== symptom) {
    console.log(`  • "${symptom}" → "${normalized}"`);
  }
  return normalized;
});

// Dédupliquer (mal de tete / maux de tete → mal de tete)
const symptomListUnique = [...new Set(symptomListNormalized)];
const duplicatesRemoved =
  symptomListNormalized.length - symptomListUnique.length;

if (duplicatesRemoved > 0) {
  console.log(`  ✅ ${duplicatesRemoved} doublon(s) supprimé(s)`);
}

console.log(
  `  ✅ ${symptomList.length} → ${symptomListUnique.length} symptômes uniques\n`,
);

// ==================== 2. SYNONYMS ====================

console.log("📝 Traitement de synonymsSymptomList.json...");
const synonymsRaw = readFileSync(PATHS.synonyms, "utf-8");
const synonyms = JSON.parse(synonymsRaw);

const synonymsNormalized = {};
const synonymsToRemove = [];

Object.entries(synonyms).forEach(([key, values]) => {
  const normalizedKey = normalizeSymptom(key);
  const normalizedValues = values.map((v) => normalizeSymptom(v));

  // Si la clé et ses valeurs deviennent identiques après normalisation, on supprime
  if (normalizedValues.includes(normalizedKey)) {
    synonymsToRemove.push(`"${key}" ↔ "${values.join('", "')}"`);
    return; // Skip this mapping
  }

  if (normalizedKey !== key || normalizedValues.join() !== values.join()) {
    console.log(`  • "${key}" → "${normalizedKey}"`);
    console.log(
      `    Valeurs: [${values.join(", ")}] → [${normalizedValues.join(", ")}]`,
    );
  }

  synonymsNormalized[normalizedKey] = normalizedValues;
});

if (synonymsToRemove.length > 0) {
  console.log(`  ⚠️  Mappings supprimés (devenus identiques) :`);
  synonymsToRemove.forEach((s) => console.log(`    - ${s}`));
}

console.log(
  `  ✅ ${Object.keys(synonyms).length} → ${Object.keys(synonymsNormalized).length} mappings\n`,
);

// ==================== 3. DATABASE ====================

console.log("📝 Traitement de db.json...");
const dbRaw = readFileSync(PATHS.db, "utf-8");
const db = JSON.parse(dbRaw);

let symptomsChanged = 0;

const dbNormalized = db.map((remedy) => {
  const normalizedSymptoms = remedy.symptoms.map((symptom) => {
    const normalized = normalizeSymptom(symptom);
    if (normalized !== symptom) {
      symptomsChanged++;
    }
    return normalized;
  });

  return {
    ...remedy,
    symptoms: normalizedSymptoms,
  };
});

console.log(
  `  ✅ ${symptomsChanged} symptômes normalisés dans ${db.length} remèdes\n`,
);

// ==================== 4. ÉCRITURE DES FICHIERS ====================

console.log("💾 Écriture des fichiers normalisés...");

writeFileSync(
  PATHS.symptomList,
  JSON.stringify(symptomListUnique.sort(), null, 2) + "\n",
  "utf-8",
);
console.log(
  `  ✅ symptomList.json écrit (${symptomListUnique.length} symptômes)`,
);

writeFileSync(
  PATHS.synonyms,
  JSON.stringify(synonymsNormalized, null, 2) + "\n",
  "utf-8",
);
console.log(
  `  ✅ synonymsSymptomList.json écrit (${Object.keys(synonymsNormalized).length} mappings)`,
);

writeFileSync(PATHS.db, JSON.stringify(dbNormalized, null, 2) + "\n", "utf-8");
console.log(`  ✅ db.json écrit (${dbNormalized.length} remèdes)`);

// ==================== 5. RÉSUMÉ ====================

console.log("\n✅ Normalisation terminée avec succès !\n");
console.log("📊 Résumé :");
console.log(
  `  • symptomList.json     : ${symptomList.length} → ${symptomListUnique.length} symptômes`,
);
console.log(
  `  • synonymsSymptomList  : ${Object.keys(synonyms).length} → ${Object.keys(synonymsNormalized).length} mappings`,
);
console.log(
  `  • db.json              : ${symptomsChanged} symptômes normalisés`,
);
console.log("\n🔍 Exécutez maintenant : node scripts/validateData.js\n");
