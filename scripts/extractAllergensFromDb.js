// scripts/extractAllergensFromDb.js
// Script pour extraire automatiquement les allergènes depuis db.json
// et alimenter allergensList.json sans doublons

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../src/data/db.json");
const allergensPath = path.join(__dirname, "../src/data/allergensList.json");

/**
 * Capitalise la première lettre de chaque mot d'un ID kebab-case
 * Ex: "pollen-olive" → "Pollen Olive"
 */
function capitalize(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

try {
  console.log("\n🔍 === Extraction des allergènes depuis db.json ===\n");

  // 1. Lire db.json
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  console.log(`✅ Fichier db.json lu : ${db.length} remèdes trouvés`);

  // 2. Lire allergensList.json existant
  const existingAllergens = JSON.parse(fs.readFileSync(allergensPath, "utf-8"));
  console.log(
    `✅ Fichier allergensList.json lu : ${existingAllergens.length} allergènes existants`,
  );

  // 3. Créer un Map pour associer chaque allergène à ses remèdes
  const allergensMap = new Map();

  db.forEach((remedy) => {
    if (Array.isArray(remedy.allergens) && remedy.allergens.length > 0) {
      remedy.allergens.forEach((allergenId) => {
        if (allergenId && typeof allergenId === "string") {
          const trimmedId = allergenId.trim();
          if (!allergensMap.has(trimmedId)) {
            allergensMap.set(trimmedId, []);
          }
          allergensMap.get(trimmedId).push(remedy.name);
        }
      });
    }
  });

  console.log(
    `\n📊 Allergènes uniques trouvés dans db.json : ${allergensMap.size}`,
  );

  // 4. Créer un index des allergènes existants
  const existingById = new Map(existingAllergens.map((a) => [a.id, a]));

  // 5. Mettre à jour les allergènes existants avec les remèdes
  let updatedCount = 0;
  let newCount = 0;

  console.log(`\n🔄 Mise à jour de allergensList.json :`);

  allergensMap.forEach((remedies, allergenId) => {
    if (existingById.has(allergenId)) {
      // Allergène existant : mettre à jour les remèdes
      const existing = existingById.get(allergenId);
      existing.remedies = [...new Set(remedies)].sort(); // Dédoublonner et trier
      updatedCount++;
      console.log(`   ✓ ${allergenId} → ${existing.remedies.length} remède(s)`);
    } else {
      // Nouvel allergène : créer une entrée
      const newAllergen = {
        id: allergenId,
        name: capitalize(allergenId),
        description: `À compléter : description pour ${allergenId}`,
        remedies: [...new Set(remedies)].sort(),
      };
      existingAllergens.push(newAllergen);
      existingById.set(allergenId, newAllergen);
      newCount++;
      console.log(
        `   🆕 ${allergenId} → "${newAllergen.name}" (${newAllergen.remedies.length} remède(s))`,
      );
    }
  });

  // 6. Trier alphabétiquement par ID
  existingAllergens.sort((a, b) => a.id.localeCompare(b.id));

  // 7. Sauvegarder
  fs.writeFileSync(
    allergensPath,
    JSON.stringify(existingAllergens, null, 2) + "\n",
  );

  console.log(
    `\n✅ allergensList.json mis à jour avec succès :`,
    `\n   - ${updatedCount} allergène(s) mis à jour`,
    `\n   - ${newCount} nouvel(aux) allergène(s) ajouté(s)`,
    `\n   - Total : ${existingAllergens.length} allergènes`,
  );

  // 8. Afficher le résumé des remèdes par allergène
  console.log(`\n📋 Résumé des remèdes par allergène :`);
  existingAllergens.forEach((allergen) => {
    const remediesCount = allergen.remedies ? allergen.remedies.length : 0;
    console.log(`   ${allergen.id}: ${remediesCount} remède(s)`);
  });

  console.log(`\n✨ Extraction terminée avec succès !\n`);
} catch (error) {
  console.error(`\n❌ Erreur lors de l'extraction :`, error);
  process.exit(1);
}
