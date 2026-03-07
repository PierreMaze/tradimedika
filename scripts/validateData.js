// scripts/validateData.js
// Script de validation pour vérifier la cohérence des données normalisées

import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Normalise un symptôme AVEC accents (copie de src/utils/normalizeSymptom.js)
 * Cette version CONSERVE les accents français
 */
function normalizeSymptom(symptom) {
  if (typeof symptom !== "string") return "";
  return symptom
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Chemins des fichiers
const PATHS = {
  symptomList: resolve(__dirname, "../src/data/symptomList.json"),
  synonyms: resolve(__dirname, "../src/data/synonymsSymptomList.json"),
  db: resolve(__dirname, "../src/data/db.json"),
  allergensList: resolve(__dirname, "../src/data/allergensList.json"),
};

console.log("\n🔍 Validation des données normalisées...\n");

// ==================== CHARGEMENT DES DONNÉES ====================

const symptomList = JSON.parse(readFileSync(PATHS.symptomList, "utf-8"));
const synonyms = JSON.parse(readFileSync(PATHS.synonyms, "utf-8"));
const db = JSON.parse(readFileSync(PATHS.db, "utf-8"));
const allergensList = JSON.parse(readFileSync(PATHS.allergensList, "utf-8"));

let errors = 0;
const warnings = 0;

// ==================== 1. VÉRIFIER ACCENTS FRANÇAIS VALIDES ====================

console.log("📝 Vérification 1: Accents français valides...");

// Pattern pour détecter des caractères invalides (non-français)
// Accepte: a-z, accents français, œ, apostrophes, espaces
const invalidCharPattern = /[^a-zàâäéèêëïîôùûüÿçœ'\s]/;
let invalidChars = 0;

// symptomList
symptomList.forEach((symptom) => {
  if (invalidCharPattern.test(symptom)) {
    console.error(`  ❌ Caractère invalide dans symptomList: "${symptom}"`);
    invalidChars++;
  }
});

// synonyms
Object.entries(synonyms).forEach(([key, values]) => {
  if (invalidCharPattern.test(key)) {
    console.error(`  ❌ Caractère invalide dans clé de synonyms: "${key}"`);
    invalidChars++;
  }
  values.forEach((value) => {
    if (invalidCharPattern.test(value)) {
      console.error(
        `  ❌ Caractère invalide dans valeur de synonyms: "${value}"`,
      );
      invalidChars++;
    }
  });
});

// db
db.forEach((remedy) => {
  remedy.symptoms.forEach((symptom) => {
    if (invalidCharPattern.test(symptom)) {
      console.error(
        `  ❌ Caractère invalide dans db.json (${remedy.name}): "${symptom}"`,
      );
      invalidChars++;
    }
  });
});

if (invalidChars === 0) {
  console.log(
    "  ✅ Tous les caractères sont valides (français avec accents)\n",
  );
} else {
  errors += invalidChars;
}

// ==================== 2. VÉRIFIER ABSENCE DE - ET _ ====================

console.log("📝 Vérification 2: Absence de tirets et underscores...");

const dashUnderscorePattern = /[-_]/;

// symptomList
symptomList.forEach((symptom) => {
  if (dashUnderscorePattern.test(symptom)) {
    console.error(
      `  ❌ Caractère invalide (-/_) dans symptomList: "${symptom}"`,
    );
    errors++;
  }
});

// synonyms
Object.entries(synonyms).forEach(([key, values]) => {
  if (dashUnderscorePattern.test(key)) {
    console.error(
      `  ❌ Caractère invalide (-/_) dans clé de synonyms: "${key}"`,
    );
    errors++;
  }
  values.forEach((value) => {
    if (dashUnderscorePattern.test(value)) {
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
    if (dashUnderscorePattern.test(symptom)) {
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

// ==================== 6. VÉRIFIER LES ALLERGÈNES ====================

console.log("📝 Vérification 6: Validation des allergènes...");

// Vérifier que allergensList est un tableau
if (!Array.isArray(allergensList)) {
  console.error("  ❌ allergensList.json doit être un tableau");
  errors++;
} else {
  // Extraire les IDs valides
  const validAllergenIds = new Set(allergensList.map((a) => a.id));

  // Vérifier les doublons dans allergensList
  if (validAllergenIds.size !== allergensList.length) {
    const idCounts = {};
    allergensList.forEach((allergen) => {
      idCounts[allergen.id] = (idCounts[allergen.id] || 0) + 1;
    });
    const duplicateIds = Object.entries(idCounts)
      .filter(([, count]) => count > 1)
      .map(([id, count]) => `"${id}" (${count}x)`);

    console.error(
      `  ❌ Doublons détectés dans allergensList (${allergensList.length} items, ${validAllergenIds.size} uniques)`,
    );
    console.error(`     IDs dupliqués: ${duplicateIds.join(", ")}`);
    errors++;
  }

  // Vérifier le format kebab-case des IDs
  const kebabCasePattern = /^[a-z]+(-[a-z]+)*$/;
  allergensList.forEach((allergen) => {
    if (!kebabCasePattern.test(allergen.id)) {
      console.error(
        `  ❌ ID allergen invalide (doit être kebab-case): "${allergen.id}"`,
      );
      errors++;
    }
    // Vérifier que name et description existent
    if (!allergen.name || typeof allergen.name !== "string") {
      console.error(`  ❌ Allergen "${allergen.id}" manque un nom valide`);
      errors++;
    }
    if (!allergen.description || typeof allergen.description !== "string") {
      console.error(
        `  ❌ Allergen "${allergen.id}" manque une description valide`,
      );
      errors++;
    }
  });

  // Vérifier que tous les allergènes de db.json existent dans allergensList
  const dbAllergens = new Set();
  db.forEach((remedy) => {
    if (Array.isArray(remedy.allergens)) {
      remedy.allergens.forEach((allergenId) => {
        dbAllergens.add(allergenId);
        if (!validAllergenIds.has(allergenId)) {
          console.error(
            `  ❌ Allergen "${allergenId}" dans ${remedy.name} (db.json) n'existe pas dans allergensList`,
          );
          errors++;
        }
      });
    }
  });

  if (errors === 0) {
    console.log(
      `  ✅ Tous les allergènes sont valides (${validAllergenIds.size} allergènes, ${dbAllergens.size} utilisés dans db.json)\n`,
    );
  }
}

// ==================== 7. VÉRIFIER LES CRÉDITS D'IMAGES ====================

console.log("📝 Vérification 7: Validation des crédits d'images...");

let invalidImageCredits = 0;

db.forEach((remedy) => {
  if (remedy.imageCredit) {
    const { author, source, url } = remedy.imageCredit;

    if (!author || typeof author !== "string") {
      console.error(
        `  ❌ ${remedy.name} (id:${remedy.id}) : imageCredit.author manquant ou invalide`,
      );
      invalidImageCredits++;
    }

    if (!url || typeof url !== "string") {
      console.error(
        `  ❌ ${remedy.name} (id:${remedy.id}) : imageCredit.url manquant ou invalide`,
      );
      invalidImageCredits++;
    } else {
      try {
        new URL(url);
      } catch {
        console.error(
          `  ❌ ${remedy.name} (id:${remedy.id}) : imageCredit.url invalide "${url}"`,
        );
        invalidImageCredits++;
      }
    }

    if (source !== undefined && typeof source !== "string") {
      console.error(
        `  ❌ ${remedy.name} (id:${remedy.id}) : imageCredit.source doit être une string`,
      );
      invalidImageCredits++;
    }
  }
});

if (invalidImageCredits === 0) {
  const remediesWithCredit = db.filter((r) => r.imageCredit).length;
  console.log(
    `  ✅ Crédits d'images valides (${remediesWithCredit}/${db.length} produits naturels avec crédit)\n`,
  );
} else {
  errors += invalidImageCredits;
}

// ==================== 8. VÉRIFIER LES NIVEAUX DE PREUVE ====================

console.log("📝 Vérification 8: Validation des niveaux de preuve...");

const validEvidenceLevels = ["A", "B", "C", "D"];
let invalidEvidenceLevels = 0;

db.forEach((remedy) => {
  if (!remedy.evidenceLevel) {
    console.error(
      `  ❌ ${remedy.name} (id:${remedy.id}) : evidenceLevel manquant`,
    );
    invalidEvidenceLevels++;
  } else if (!validEvidenceLevels.includes(remedy.evidenceLevel)) {
    console.error(
      `  ❌ ${remedy.name} (id:${remedy.id}) : evidenceLevel invalide "${remedy.evidenceLevel}" (attendu: A, B, C ou D)`,
    );
    invalidEvidenceLevels++;
  }
});

if (invalidEvidenceLevels === 0) {
  const levelCounts = {};
  validEvidenceLevels.forEach((l) => {
    levelCounts[l] = db.filter((r) => r.evidenceLevel === l).length;
  });
  console.log(
    `  ✅ Niveaux de preuve valides (A:${levelCounts.A}, B:${levelCounts.B}, C:${levelCounts.C}, D:${levelCounts.D})\n`,
  );
} else {
  errors += invalidEvidenceLevels;
}

// ==================== 9. VÉRIFIER STRUCTURE DES SYNONYMES ====================

console.log("📝 Vérification 9: Structure des synonymes...");

let synonymCount = 0;
let invalidSynonyms = 0;

for (const [key, values] of Object.entries(synonyms)) {
  if (Array.isArray(values)) {
    synonymCount += values.length;
  } else {
    console.error(`  ❌ Valeur invalide pour "${key}": doit être un array`);
    invalidSynonyms++;
  }
}

if (invalidSynonyms === 0) {
  console.log(
    `  ✅ Structure correcte: ${synonymCount} synonymes mappés au total\n`,
  );
} else {
  errors += invalidSynonyms;
}

// ==================== 10. STATISTIQUES ====================

console.log("📊 Statistiques :");
console.log(
  `  • symptomList.json     : ${symptomList.length} symptômes uniques`,
);
console.log(
  `  • synonymsSymptomList  : ${Object.keys(synonyms).length} mappings (${synonymCount} synonymes)`,
);
console.log(`  • db.json              : ${db.length} produits naturels`);
console.log(`  • Symptômes uniques (db): ${dbSymptoms.size} symptômes`);
console.log(`  • allergensList.json   : ${allergensList.length} allergènes`);
const remediesWithImageCredit = db.filter((r) => r.imageCredit).length;
console.log(
  `  • Crédits d'images      : ${remediesWithImageCredit}/${db.length} produits naturels avec crédit`,
);
const evidenceLevelCounts = { A: 0, B: 0, C: 0, D: 0 };
db.forEach((r) => {
  if (r.evidenceLevel && evidenceLevelCounts[r.evidenceLevel] !== undefined) {
    evidenceLevelCounts[r.evidenceLevel]++;
  }
});
console.log(
  `  • Niveaux de preuve      : A:${evidenceLevelCounts.A} B:${evidenceLevelCounts.B} C:${evidenceLevelCounts.C} D:${evidenceLevelCounts.D}`,
);

// ==================== 11. RÉSULTAT FINAL ====================

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
