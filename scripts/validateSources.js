// scripts/validateSources.js
// Script de validation pour vérifier les sources des remèdes

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chemins des fichiers
const PATHS = {
  db: resolve(__dirname, "../src/data/db.json"),
};

console.log("\n🔍 Validation des sources des remèdes...\n");

// ==================== CHARGEMENT DES DONNÉES ====================

const db = JSON.parse(readFileSync(PATHS.db, "utf-8"));

let errors = 0;
let warnings = 0;

// ==================== 1. VÉRIFIER LA STRUCTURE DES SOURCES ====================

console.log("📝 Vérification 1: Structure des sources...");

let remediesWithSources = 0;
let totalScientificSources = 0;
let totalTraditionalSources = 0;

db.forEach((remedy) => {
  if (remedy.sources) {
    remediesWithSources++;

    // Vérifier que sources est un objet
    if (typeof remedy.sources !== "object" || Array.isArray(remedy.sources)) {
      console.error(
        `  ❌ ${remedy.name}: sources doit être un objet { scientific: [], traditional: [] }`,
      );
      errors++;
      return;
    }

    // Vérifier scientific
    if (remedy.sources.scientific) {
      if (!Array.isArray(remedy.sources.scientific)) {
        console.error(
          `  ❌ ${remedy.name}: sources.scientific doit être un tableau`,
        );
        errors++;
      } else {
        totalScientificSources += remedy.sources.scientific.length;

        remedy.sources.scientific.forEach((source, index) => {
          // Vérifier la présence de title et url
          if (!source.title || typeof source.title !== "string") {
            console.error(
              `  ❌ ${remedy.name}: sources.scientific[${index}] manque un title valide`,
            );
            errors++;
          }
          if (!source.url || typeof source.url !== "string") {
            console.error(
              `  ❌ ${remedy.name}: sources.scientific[${index}] manque une url valide`,
            );
            errors++;
          }
        });
      }
    }

    // Vérifier traditional
    if (remedy.sources.traditional) {
      if (!Array.isArray(remedy.sources.traditional)) {
        console.error(
          `  ❌ ${remedy.name}: sources.traditional doit être un tableau`,
        );
        errors++;
      } else {
        totalTraditionalSources += remedy.sources.traditional.length;

        remedy.sources.traditional.forEach((source, index) => {
          // Vérifier la présence de title et url
          if (!source.title || typeof source.title !== "string") {
            console.error(
              `  ❌ ${remedy.name}: sources.traditional[${index}] manque un title valide`,
            );
            errors++;
          }
          if (!source.url || typeof source.url !== "string") {
            console.error(
              `  ❌ ${remedy.name}: sources.traditional[${index}] manque une url valide`,
            );
            errors++;
          }
        });
      }
    }

    // Avertir si sources est vide
    if (
      (!remedy.sources.scientific || remedy.sources.scientific.length === 0) &&
      (!remedy.sources.traditional || remedy.sources.traditional.length === 0)
    ) {
      console.warn(`  ⚠️  ${remedy.name}: sources existe mais est vide`);
      warnings++;
    }
  }
});

console.log(
  `  ℹ️  ${remediesWithSources}/${db.length} remèdes ont des sources`,
);
console.log(`  ℹ️  ${totalScientificSources} sources scientifiques au total`);
console.log(
  `  ℹ️  ${totalTraditionalSources} sources traditionnelles au total\n`,
);

// ==================== 2. VALIDER LES URLS ====================

console.log("📝 Vérification 2: Validation des URLs...");

let invalidUrls = 0;

db.forEach((remedy) => {
  if (!remedy.sources) return;

  const allSources = [
    ...(remedy.sources.scientific || []),
    ...(remedy.sources.traditional || []),
  ];

  allSources.forEach((source) => {
    if (source.url) {
      try {
        new URL(source.url);

        // Vérifier que l'URL commence par https://
        if (!source.url.startsWith("https://")) {
          console.warn(
            `  ⚠️  ${remedy.name}: "${source.title}" utilise HTTP au lieu de HTTPS`,
          );
          warnings++;
        }
      } catch {
        console.error(
          `  ❌ ${remedy.name}: URL invalide pour "${source.title}": ${source.url}`,
        );
        invalidUrls++;
        errors++;
      }
    }
  });
});

if (invalidUrls === 0) {
  console.log("  ✅ Toutes les URLs sont valides\n");
}

// ==================== 3. VÉRIFIER LES DOUBLONS D'URLS ====================

console.log("📝 Vérification 3: Doublons d'URLs...");

const urlMap = new Map();
let duplicateUrls = 0;

db.forEach((remedy) => {
  if (!remedy.sources) return;

  const allSources = [
    ...(remedy.sources.scientific || []),
    ...(remedy.sources.traditional || []),
  ];

  allSources.forEach((source) => {
    if (source.url) {
      if (urlMap.has(source.url)) {
        const previous = urlMap.get(source.url);
        console.warn(
          `  ⚠️  URL dupliquée: "${source.url}" utilisée dans "${previous}" et "${remedy.name}"`,
        );
        duplicateUrls++;
        warnings++;
      } else {
        urlMap.set(source.url, remedy.name);
      }
    }
  });
});

if (duplicateUrls === 0) {
  console.log("  ✅ Aucun doublon d'URL détecté\n");
}

// ==================== 4. VÉRIFIER LA COHÉRENCE AVEC verifiedByProfessional ====================

console.log("📝 Vérification 4: Cohérence avec verifiedByProfessional...");

let incoherences = 0;

db.forEach((remedy) => {
  const hasScientificSources =
    remedy.sources?.scientific && remedy.sources.scientific.length > 0;
  const isVerified = remedy.verifiedByProfessional === true;

  // Si vérifié par un professionnel, devrait avoir des sources scientifiques
  if (isVerified && !hasScientificSources) {
    console.warn(
      `  ⚠️  ${remedy.name}: marqué comme "verifiedByProfessional" mais pas de sources scientifiques`,
    );
    warnings++;
    incoherences++;
  }

  // Si a des sources scientifiques mais pas marqué comme vérifié
  if (hasScientificSources && !isVerified) {
    console.warn(
      `  ⚠️  ${remedy.name}: a des sources scientifiques mais pas marqué comme "verifiedByProfessional"`,
    );
    warnings++;
    incoherences++;
  }
});

if (incoherences === 0) {
  console.log(
    "  ✅ Cohérence entre sources scientifiques et verifiedByProfessional\n",
  );
}

// ==================== 5. STATISTIQUES ====================

console.log("📊 Statistiques :");
console.log(`  • Total remèdes               : ${db.length}`);
console.log(`  • Remèdes avec sources        : ${remediesWithSources}`);
console.log(
  `  • Remèdes sans sources        : ${db.length - remediesWithSources}`,
);
console.log(`  • Sources scientifiques       : ${totalScientificSources}`);
console.log(`  • Sources traditionnelles     : ${totalTraditionalSources}`);
console.log(
  `  • Total sources               : ${totalScientificSources + totalTraditionalSources}`,
);
console.log(`  • URLs uniques                : ${urlMap.size}`);

const verifiedCount = db.filter(
  (r) => r.verifiedByProfessional === true,
).length;
console.log(`  • Remèdes vérifiés            : ${verifiedCount}/${db.length}`);

// ==================== 6. RÉSULTAT FINAL ====================

console.log("\n" + "=".repeat(60));
if (errors === 0 && warnings === 0) {
  console.log("✅ VALIDATION RÉUSSIE - Toutes les sources sont conformes !");
} else if (errors === 0) {
  console.log(
    `⚠️  VALIDATION RÉUSSIE AVEC AVERTISSEMENTS - ${warnings} avertissement(s)`,
  );
} else {
  console.log(
    `❌ VALIDATION ÉCHOUÉE - ${errors} erreur(s), ${warnings} avertissement(s)`,
  );
  process.exit(1);
}
console.log("=".repeat(60) + "\n");
