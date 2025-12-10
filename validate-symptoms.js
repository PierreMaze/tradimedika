import { readFileSync } from 'fs';

const symptoms = JSON.parse(readFileSync('./src/data/symptomList.json', 'utf-8'));
const synonyms = JSON.parse(readFileSync('./src/data/synonymsSymptomList.json', 'utf-8'));
const db = JSON.parse(readFileSync('./src/data/db.json', 'utf-8'));

console.log('=== VALIDATION DES FICHIERS JSON ===\n');

console.log('✓ symptomList.json:', symptoms.length, 'symptoms');
console.log('✓ synonymsSymptomList.json:', Object.keys(synonyms).length, 'entries');
console.log('✓ db.json:', db.length, 'remedies\n');

// Extraction de tous les symptômes uniques de db.json
const dbSymptoms = [...new Set(db.flatMap(r => r.symptoms))];
console.log('✓ Symptoms in db.json:', dbSymptoms.length, 'unique symptoms\n');

// Vérification de la cohérence
const missing = dbSymptoms.filter(s => !symptoms.includes(s));

if (missing.length > 0) {
  console.error('✗ ERREUR: Symptômes manquants dans symptomList.json:');
  missing.forEach(s => console.error('  -', s));
  process.exit(1);
} else {
  console.log('✓ Tous les symptômes de db.json sont présents dans symptomList.json');
}

// Vérification de la structure des synonymes
console.log('✓ Structure des synonymes: clés principales uniquement (unidirectionnel)');
let synonymCount = 0;
for (const [key, values] of Object.entries(synonyms)) {
  if (Array.isArray(values)) {
    synonymCount += values.length;
  } else {
    console.error(`✗ Valeur invalide pour "${key}": doit être un array`);
    process.exit(1);
  }
}
console.log(`✓ ${synonymCount} synonymes mappés au total`);

console.log('\n=== VALIDATION RÉUSSIE ===');
