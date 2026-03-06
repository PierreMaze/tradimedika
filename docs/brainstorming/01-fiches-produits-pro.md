# Fiches Produits — Niveau Professionnel

## Structure actuelle (db.json)

Les fiches actuelles contiennent :

- Nom du produit
- Symptômes associés
- Tags : pregnancySafe, childrenAge, verifiedByProfessional, allergens

## Structure enrichie pour les pros

### Informations de base (existantes à enrichir)

- Nom commun + nom latin (si plante)
- Catégorie (plante, aliment, épice, huile essentielle, etc.)
- Sous-catégorie (fruit, légume, aromate, racine, etc.)
- Partie utilisée (feuille, racine, fleur, fruit entier, etc.)
- Formes disponibles (frais, séché, tisane, gélule, huile, poudre, etc.)

### Données scientifiques (NOUVEAU)

- **Niveau de preuve** : A (études cliniques solides) / B (études préliminaires) / C (usage traditionnel)
- **Études de référence** : liens PubMed, EMA, monographies OMS
- **Principes actifs** identifiés
- **Propriétés documentées** (antioxydant, anti-inflammatoire, digestif, etc.)

### Posologie (NOUVEAU)

- Dosage recommandé par forme (adulte)
- Dosage enfant (si applicable, selon childrenAge)
- Durée de cure recommandée
- Mode d'administration

### Sécurité (enrichir l'existant)

- **Contre-indications** détaillées
- **Interactions médicamenteuses** (CRITIQUE pour les pros)
  - Liste des classes de médicaments concernées
  - Niveau de risque (majeur / modéré / mineur)
- **Effets indésirables** connus
- Grossesse : détail par trimestre (enrichir pregnancySafe)
- Allaitement

### Sources et traçabilité

- Pharmacopée européenne (oui/non + référence)
- Monographie EMA/HMPC
- Monographie OMS
- Statut réglementaire (liste 148 plantes vente libre / liste 540 compléments)
- Allégations santé EFSA (autorisée / en attente / rejetée)
- Date de dernière mise à jour de la fiche

## Exemple de fiche enrichie

```json
{
  "name": "Gingembre",
  "latinName": "Zingiber officinale",
  "category": "plante",
  "subcategory": "épice-racine",
  "family": "Zingiberaceae",
  "partUsed": ["rhizome"],
  "forms": ["frais", "poudre", "tisane", "gélule", "confit"],
  "properties": [
    "digestif",
    "anti-nauséeux",
    "anti-inflammatoire",
    "antioxydant"
  ],
  "evidenceLevel": "A",
  "activeCompounds": ["gingérol", "shogaol", "zingérone"],
  "dosage": {
    "adult": {
      "fresh": "1-3g de rhizome frais par jour",
      "powder": "0.5-1g de poudre, 2-3x/jour",
      "tea": "1-2g en infusion, 2-3 tasses/jour",
      "duration": "Usage alimentaire courant, cure 2-4 semaines en complément"
    }
  },
  "interactions": [
    {
      "drug": "Anticoagulants (warfarine, aspirine)",
      "risk": "modéré",
      "detail": "Potentiel effet antiagrégant plaquettaire — surveillance recommandée"
    },
    {
      "drug": "Antidiabétiques",
      "risk": "mineur",
      "detail": "Possible potentialisation de l'effet hypoglycémiant"
    }
  ],
  "contraindications": ["Calculs biliaires (à doses élevées)"],
  "sideEffects": ["Brûlures d'estomac (à doses élevées)", "Irritation buccale"],
  "pregnancySafe": "ok",
  "pregnancyDetail": "Autorisé pendant la grossesse — traditionnellement utilisé contre les nausées matinales (max 1g/jour)",
  "breastfeeding": "autorisé",
  "childrenAge": 3,
  "allergens": [],
  "verifiedByProfessional": true,
  "regulatoryStatus": {
    "list148": true,
    "list540": true,
    "efsaClaims": "en attente"
  },
  "sources": {
    "ema": "EMA/HMPC/2012/577",
    "pubmed": ["PMID:25230520", "PMID:10793599"],
    "pharmacopee": "Pharmacopée européenne, monographie 1522"
  },
  "lastUpdated": "2025-01-15"
}
```

## Catégories de produits

### Par type

| Catégorie           | Exemples                                      | Public                   |
| ------------------- | --------------------------------------------- | ------------------------ |
| Plantes / Herbes    | Camomille, Thym, Menthe, Lavande              | Tout le monde connaît    |
| Épices / Racines    | Gingembre, Curcuma, Cannelle, Clou de girofle | En cuisine au quotidien  |
| Fruits              | Citron, Grenade, Baies de goji                | Accessibles partout      |
| Aliments            | Miel, Ail, Vinaigre de cidre, Huile d'olive   | Dans toutes les cuisines |
| Huiles essentielles | Lavande, Tea tree, Eucalyptus                 | Très populaires          |
| Superaliments       | Spiruline, Aloe vera, Graines de chia         | Tendance bien-être       |

### Par propriété

Anti-inflammatoire, Antioxydant, Digestif, Apaisant/Relaxant, Tonifiant/Énergisant, Immunitaire, Respiratoire, Circulatoire, etc.

## Produits prioritaires pour le prototype

Commencer par les **15 produits les plus courants et connus du grand public** :

1. **Miel** — Connu de tous, multiples usages
2. **Citron** — Incontournable, vitamine C
3. **Gingembre** — Très populaire, cuisine + bien-être
4. **Ail** — Dans toutes les cuisines
5. **Camomille** — La tisane la plus connue
6. **Thym** — Cuisine + tisane hivernale
7. **Menthe** — Très courante, digestive
8. **Curcuma** — Tendance anti-inflammatoire
9. **Cannelle** — Épice du quotidien
10. **Lavande** — Bien-être, relaxation
11. **Aloe vera** — Très populaire
12. **Clou de girofle** — Classique
13. **Thé vert** — Antioxydant le plus connu
14. **Eucalyptus** — Hiver, voies respiratoires
15. **Huile d'olive** — Alimentation méditerranéenne

## TODO

- [ ] Définir le schéma JSON final dans db.json
- [ ] Identifier les sources fiables pour le sourcing (EMA, PubMed, pharmacopée)
- [ ] Vérifier le statut réglementaire de chaque produit (liste 148, liste 540, EFSA)
- [ ] Enrichir les 15 premières fiches
- [ ] Valider avec un professionnel de santé
