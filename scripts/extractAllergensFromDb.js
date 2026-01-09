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
 * Ex: "pollen-olive" → "Pollen D'olivier"
 */
function capitalize(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Normalise un nom d'allergène en ID kebab-case
 * Ex: "Agrumes (citrus)" → "agrumes-citrus"
 * Note: Fonction utilitaire réservée pour usage futur
 */
function _normalizeToId(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/--+/g, "-");
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

  // 3. Extraire tous les allergènes depuis db.json (champ "allergens")
  const allergensSet = new Set();

  db.forEach((remedy) => {
    if (Array.isArray(remedy.allergens) && remedy.allergens.length > 0) {
      remedy.allergens.forEach((allergenId) => {
        if (allergenId && typeof allergenId === "string") {
          allergensSet.add(allergenId.trim());
        }
      });
    }
  });

  console.log(
    `\n📊 Allergènes uniques trouvés dans db.json : ${allergensSet.size}`,
  );

  // 4. Comparer avec allergensList existant
  const existingIds = new Set(existingAllergens.map((a) => a.id));
  const newAllergens = Array.from(allergensSet).filter(
    (id) => !existingIds.has(id),
  );

  console.log(`\n🔎 Comparaison avec allergensList.json :`);
  console.log(`   - Allergènes déjà présents : ${existingIds.size}`);
  console.log(`   - Nouveaux allergènes détectés : ${newAllergens.length}`);

  // 5. Vérifier les doublons (sécurité supplémentaire)
  const uniqueNewAllergens = [...new Set(newAllergens)];
  if (uniqueNewAllergens.length !== newAllergens.length) {
    console.warn(
      `⚠️  Doublons détectés et supprimés : ${newAllergens.length - uniqueNewAllergens.length}`,
    );
  }

  // 6. Ajouter les nouveaux allergènes
  if (uniqueNewAllergens.length > 0) {
    console.log(`\n✨ Nouveaux allergènes à ajouter :`);

    uniqueNewAllergens.forEach((id) => {
      console.log(`   + ${id} → "${capitalize(id)}"`);

      existingAllergens.push({
        id,
        name: capitalize(id),
        description: `À compléter : description pour ${id}`,
      });
    });

    // 7. Trier alphabétiquement par ID pour cohérence
    existingAllergens.sort((a, b) => a.id.localeCompare(b.id));

    // 8. Sauvegarder
    fs.writeFileSync(
      allergensPath,
      JSON.stringify(existingAllergens, null, 2) + "\n",
    );

    console.log(
      `\n✅ allergensList.json mis à jour avec ${uniqueNewAllergens.length} nouveaux allergènes`,
    );
    console.log(
      `📝 Total allergènes après mise à jour : ${existingAllergens.length}`,
    );
  } else {
    console.log(`\n✅ Aucun nouvel allergène à ajouter`);
    console.log(
      `📝 allergensList.json est déjà à jour (${existingAllergens.length} allergènes)`,
    );
  }

  // 9. Afficher tous les allergènes présents dans db.json
  console.log(`\n📋 Liste des allergènes dans db.json :`);
  Array.from(allergensSet)
    .sort()
    .forEach((id) => {
      const isNew = !existingIds.has(id);
      console.log(`   ${isNew ? "🆕" : "✓ "} ${id}`);
    });

  console.log(`\n✨ Extraction terminée avec succès !\n`);
} catch (error) {
  console.error(`\n❌ Erreur lors de l'extraction :`, error);
  process.exit(1);
}
