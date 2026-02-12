# Guide : Ajouter des termes techniques détectables

Ce guide explique comment ajouter de nouveaux termes qui seront automatiquement détectés et cliquables dans les contre-indications des remèdes.

---

## 📋 Vue d'ensemble

Quand tu écris une contre-indication comme :

```
"Lactose ou intolérance au lactose"
```

Le système va :

1. ✅ Détecter "lactose" automatiquement
2. ✅ Le souligner en emerald
3. ✅ Créer un popover cliquable avec la définition
4. ✅ Ajouter un lien Wikipedia

---

## 🎯 Comment ajouter un nouveau terme

### Étape 1 : Ajouter dans `MEDICAL_TERMS_MAP`

**Fichier :** `src/features/remedy-result-detail-page/utils/parseContraindicationText.js`

**Ajouter les variantes du terme :**

```js
const MEDICAL_TERMS_MAP = {
  // ... autres termes

  lactose: "lactose", // Match simple
  "intolérance au lactose": "lactose", // Variante longue
  "intolerance au lactose": "lactose", // Sans accent
};
```

**Règles importantes :**

- ✅ **Clé** = texte tel qu'il apparaît dans `db.json` (insensible à la casse)
- ✅ **Valeur** = ID kebab-case dans `technicalTermsDefinitions.js`
- ✅ Ajoute toutes les variantes (avec/sans accent, singulier/pluriel)
- ✅ Les termes plus longs sont prioritaires (ex: "intolérance au lactose" avant "lactose")

---

### Étape 2 : Ajouter la définition dans `technicalTermsDefinitions.js`

**Fichier :** `src/data/technicalTermsDefinitions.js`

**Ajouter le terme avec sa définition :**

```js
export const TECHNICAL_TERMS_DATA = {
  // ... autres termes

  lactose: {
    name: "Lactose", // Nom affiché (avec majuscule)
    definition: "Sucre du lait pouvant causer intolérances...",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Lactose",
    categories: ["allergens", "medical"], // Peut avoir plusieurs catégories
  },
};
```

**Règles importantes :**

- ✅ **ID** (clé) = kebab-case minuscule (ex: `lactose`, `diabete`, `reflux-gastro-oesophagien`)
- ✅ **name** = avec majuscule (ex: "Lactose", "Diabète")
- ✅ **categories** = array (un terme peut être dans plusieurs catégories)
- ✅ **wikipediaUrl** = optionnel, mettre `null` si pas de lien

---

## 📝 Catégories disponibles

| Catégorie    | Description                | Exemple                             |
| ------------ | -------------------------- | ----------------------------------- |
| `properties` | Propriétés thérapeutiques  | "antioxydant", "anti-inflammatoire" |
| `allergens`  | Allergènes et sensibilités | "lactose", "cafeine", "sulfites"    |
| `medical`    | Conditions médicales       | "diabete", "hypertension", "asthme" |

**Note :** Un terme peut avoir **plusieurs catégories** :

```js
lactose: {
  categories: ["allergens", "medical"], // Multi-catégories !
}
```

---

## 🎨 Affichage dans l'interface

### Dans les contre-indications :

- ✅ Texte **souligné en emerald** (underline decoration-emerald-500)
- ✅ Effet **hover scale-105**
- ✅ **Cursor pointer**

### Popover au clic/survol :

- ✅ **Titre** : nom du terme
- ✅ **Définition** : explication complète
- ✅ **Lien Wikipedia** : ouvre une modale de confirmation

---

## 📦 Exemples complets

### Exemple 1 : Terme simple (une catégorie)

**Dans `parseContraindicationText.js` :**

```js
"asthme": "asthme",
```

**Dans `technicalTermsDefinitions.js` :**

```js
asthme: {
  name: "Asthme",
  definition: "Maladie respiratoire chronique avec bronchospasmes.",
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Asthme",
  categories: ["medical"],
},
```

---

### Exemple 2 : Terme avec variantes

**Dans `parseContraindicationText.js` :**

```js
"diabète": "diabete",
"diabete": "diabete",
"diabète de type 1": "diabete",
"diabète de type 2": "diabete",
```

**Dans `technicalTermsDefinitions.js` :**

```js
diabete: {
  name: "Diabète",
  definition: "Maladie chronique où le corps ne régule pas correctement...",
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Diabète",
  categories: ["medical"],
},
```

---

### Exemple 3 : Terme multi-catégories

**Dans `parseContraindicationText.js` :**

```js
"lactose": "lactose",
"intolérance au lactose": "lactose",
```

**Dans `technicalTermsDefinitions.js` :**

```js
lactose: {
  name: "Lactose",
  definition: "Sucre du lait pouvant causer intolérances...",
  wikipediaUrl: "https://fr.wikipedia.org/wiki/Lactose",
  categories: ["allergens", "medical"], // Dans 2 catégories !
},
```

---

## ⚠️ Règles de capitalisation

### Dans `db.json` (contre-indications) :

```json
{
  "contraindications": [
    "Lactose ou intolérance au lactose",
    "Éviter en cas de diabète"
  ]
}
```

**Le système respecte la casse originale du texte dans `db.json`.**

### Dans `technicalTermsDefinitions.js` (définitions) :

```js
lactose: {
  name: "Lactose",  // ← Toujours avec majuscule
}
```

**Le `name` doit avoir une majuscule** car il est affiché dans le popover comme titre.

---

## 🔍 Comment tester

1. ✅ Ajoute le terme dans `MEDICAL_TERMS_MAP`
2. ✅ Ajoute la définition dans `TECHNICAL_TERMS_DATA`
3. ✅ Va sur une page de détail de remède avec ce terme en contre-indication
4. ✅ Vérifie que le terme est **souligné en emerald**
5. ✅ Clique dessus et vérifie que le **popover s'affiche**
6. ✅ Vérifie le **lien Wikipedia** (modale de confirmation)

---

## 🚀 Checklist rapide

- [ ] Terme ajouté dans `MEDICAL_TERMS_MAP` avec toutes les variantes
- [ ] Définition ajoutée dans `TECHNICAL_TERMS_DATA`
- [ ] ID en kebab-case minuscule
- [ ] `name` avec majuscule
- [ ] `categories` en array (même si une seule catégorie)
- [ ] Wikipedia URL valide ou `null`
- [ ] Testé visuellement sur une page de remède

---

## 📂 Fichiers à modifier

| Fichier                                                                     | Rôle                             |
| --------------------------------------------------------------------------- | -------------------------------- |
| `src/features/remedy-result-detail-page/utils/parseContraindicationText.js` | Détection automatique des termes |
| `src/data/technicalTermsDefinitions.js`                                     | Définitions et métadonnées       |

---

## ❓ Questions fréquentes

### Q : Pourquoi mon terme n'est pas détecté ?

**R :** Vérifie que la clé dans `MEDICAL_TERMS_MAP` correspond **exactement** au texte dans `db.json` (insensible à la casse).

### Q : Puis-je avoir plusieurs catégories ?

**R :** Oui ! `categories: ["allergens", "medical"]`

### Q : Comment gérer les accents ?

**R :** Ajoute les 2 variantes : `"diabète": "diabete"` ET `"diabete": "diabete"`

### Q : Que faire si pas de lien Wikipedia ?

**R :** Mettre `wikipediaUrl: null`

---

**Dernière mise à jour :** Février 2026
