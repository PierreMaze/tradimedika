// scripts/validateData.js
// Script de validation pour vérifier la cohérence des données normalisées

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Normalise un symptôme (copie de src/utils/normalizeSymptom.js)
 */
function normalizeSymptom(symptom) {
  if (typeof symptom !== "string") return "";
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

console.log("\n🔍 Validation des données normalisées...\n");

// ==================== CHARGEMENT DES DONNÉES ====================

const symptomList = JSON.parse(readFileSync(PATHS.symptomList, "utf-8"));
const synonyms = JSON.parse(readFileSync(PATHS.synonyms, "utf-8"));
const db = JSON.parse(readFileSync(PATHS.db, "utf-8"));

let errors = 0;
let warnings = 0;

// ==================== 1. VÉRIFIER ABSENCE D'ACCENTS ====================

console.log("📝 Vérification 1: Absence d'accents...");

const accentPattern = /[àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ]/;

// symptomList
symptomList.forEach((symptom) => {
  if (accentPattern.test(symptom)) {
    console.error(`  ❌ Accent trouvé dans symptomList: "${symptom}"`);
    errors++;
  }
});

// synonyms
Object.entries(synonyms).forEach(([key, values]) => {
  if (accentPattern.test(key)) {
    console.error(`  ❌ Accent trouvé dans clé de synonyms: "${key}"`);
    errors++;
  }
  values.forEach((value) => {
    if (accentPattern.test(value)) {
      console.error(`  ❌ Accent trouvé dans valeur de synonyms: "${value}"`);
      errors++;
    }
  });
});

// db
db.forEach((remedy) => {
  remedy.symptoms.forEach((symptom) => {
    if (accentPattern.test(symptom)) {
      console.error(
        `  ❌ Accent trouvé dans db.json (${remedy.name}): "${symptom}"`,
      );
      errors++;
    }
  });
});

if (errors === 0) {
  console.log("  ✅ Aucun accent détecté\n");
}

// ==================== 2. VÉRIFIER ABSENCE DE - ET _ ====================

console.log("📝 Vérification 2: Absence de tirets et underscores...");

const invalidCharPattern = /[-_]/;

// symptomList
symptomList.forEach((symptom) => {
  if (invalidCharPattern.test(symptom)) {
    console.error(
      `  ❌ Caractère invalide (-/_) dans symptomList: "${symptom}"`,
    );
    errors++;
  }
});

// synonyms
Object.entries(synonyms).forEach(([key, values]) => {
  if (invalidCharPattern.test(key)) {
    console.error(
      `  ❌ Caractère invalide (-/_) dans clé de synonyms: "${key}"`,
    );
    errors++;
  }
  values.forEach((value) => {
    if (invalidCharPattern.test(value)) {
      console.error(
        `  ❌ Caractère invalide (-/_) dans valeur de synonyms: "${value}"`,
      );
      errors++;
    }
  });
});

// db
db.forEach((remedy) => {
  remedy.symptoms.forEach((symptom) => {
    if (invalidCharPattern.test(symptom)) {
      console.error(
        `  ❌ Caractère invalide (-/_) dans db.json (${remedy.name}): "${symptom}"`,
      );
      errors++;
    }
  });
});

if (errors === 0) {
  console.log("  ✅ Aucun tiret ni underscore détecté\n");
}

// ==================== 3. VÉRIFIER DOUBLONS DANS SYMPTOMLIST ====================

console.log("📝 Vérification 3: Absence de doublons dans symptomList...");

const uniqueSymptoms = new Set(symptomList);
const duplicatesCount = symptomList.length - uniqueSymptoms.size;

if (duplicatesCount > 0) {
  console.error(
    `  ❌ ${duplicatesCount} doublon(s) trouvé(s) dans symptomList`,
  );
  errors++;
} else {
  console.log("  ✅ Aucun doublon\n");
}

// ==================== 4. VÉRIFIER QUE TOUS LES SYMPTÔMES DE DB SONT DANS SYMPTOMLIST ====================

console.log("📝 Vérification 4: Cohérence db.json ↔ symptomList.json...");

const dbSymptoms = new Set();
db.forEach((remedy) => {
  remedy.symptoms.forEach((symptom) => {
    dbSymptoms.add(symptom);
  });
});

const missingInSymptomList = [];
dbSymptoms.forEach((symptom) => {
  if (!symptomList.includes(symptom)) {
    missingInSymptomList.push(symptom);
  }
});

if (missingInSymptomList.length > 0) {
  console.error(
    `  ❌ ${missingInSymptomList.length} symptôme(s) de db.json manquant(s) dans symptomList:`,
  );
  missingInSymptomList.forEach((s) => console.error(`    - "${s}"`));
  errors++;
} else {
  console.log("  ✅ Tous les symptômes de db.json sont dans symptomList\n");
}

// ==================== 5. VÉRIFIER QUE TOUT EST DÉJÀ NORMALISÉ ====================

console.log("📝 Vérification 5: Normalisation complète...");

let notNormalized = 0;

symptomList.forEach((symptom) => {
  if (normalizeSymptom(symptom) !== symptom) {
    console.error(
      `  ❌ symptomList non normalisé: "${symptom}" → "${normalizeSymptom(symptom)}"`,
    );
    notNormalized++;
  }
});

Object.entries(synonyms).forEach(([key, values]) => {
  if (normalizeSymptom(key) !== key) {
    console.error(
      `  ❌ Clé synonyms non normalisée: "${key}" → "${normalizeSymptom(key)}"`,
    );
    notNormalized++;
  }
  values.forEach((value) => {
    if (normalizeSymptom(value) !== value) {
      console.error(
        `  ❌ Valeur synonyms non normalisée: "${value}" → "${normalizeSymptom(value)}"`,
      );
      notNormalized++;
    }
  });
});

db.forEach((remedy) => {
  remedy.symptoms.forEach((symptom) => {
    if (normalizeSymptom(symptom) !== symptom) {
      console.error(
        `  ❌ db.json non normalisé (${remedy.name}): "${symptom}" → "${normalizeSymptom(symptom)}"`,
      );
      notNormalized++;
    }
  });
});

if (notNormalized === 0) {
  console.log("  ✅ Toutes les données sont correctement normalisées\n");
} else {
  errors += notNormalized;
}

// ==================== 6. STATISTIQUES ====================

console.log("📊 Statistiques :");
console.log(
  `  • symptomList.json     : ${symptomList.length} symptômes uniques`,
);
console.log(
  `  • synonymsSymptomList  : ${Object.keys(synonyms).length} mappings`,
);
console.log(`  • db.json              : ${db.length} remèdes`);
console.log(`  • Symptômes uniques (db): ${dbSymptoms.size} symptômes`);

// ==================== 7. RÉSULTAT FINAL ====================

console.log("\n" + "=".repeat(60));
if (errors === 0 && warnings === 0) {
  console.log("✅ VALIDATION RÉUSSIE - Toutes les données sont conformes !");
} else {
  console.log(
    `❌ VALIDATION ÉCHOUÉE - ${errors} erreur(s), ${warnings} avertissement(s)`,
  );
  process.exit(1);
}
console.log("=".repeat(60) + "\n");
