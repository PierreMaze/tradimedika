# Modèle Économique — Curseur Freemium/Premium

## Le problème du curseur

Trop généreux en gratuit → les pros ne paient pas (cannibalisation)
Trop restrictif en gratuit → pas d'adoption, pas de visibilité

## Proposition : Curseur par "profondeur d'information"

### Gratuit (B2C + découverte pro)

| Feature               | Détail                                                       |
| --------------------- | ------------------------------------------------------------ |
| Catalogue de produits | Navigation par catégorie et sous-catégorie                   |
| Recherche par nom     | Recherche textuelle basique                                  |
| Fiches basiques       | Nom, catégorie, propriétés générales, tags grossesse/enfants |
| Filtres basiques      | Catégorie, grossesse, âge enfants (existant)                 |
| Résultats limités     | Jusqu'à 10 produits par recherche                            |

**Ce qu'on NE donne PAS gratuitement :**

- Pas de sources scientifiques détaillées (PubMed, EMA)
- Pas d'interactions médicamenteuses
- Pas de posologie précise
- Pas d'export PDF
- Pas de niveau de preuve
- Pas de filtres par propriété, forme galénique, allergène

### Premium Pro (B2B — abonnement)

| Feature                      | Détail                                                               |
| ---------------------------- | -------------------------------------------------------------------- |
| Fiches complètes             | Sources, interactions, posologie, niveau de preuve, principes actifs |
| Interactions médicamenteuses | Recherche croisée médicament ↔ produit naturel                       |
| Export PDF                   | Fiches d'information produit professionnelles                        |
| Résultats illimités          | Accès complet au catalogue                                           |
| Filtres avancés              | Par propriété, forme galénique, allergène, niveau de preuve          |
| Dashboard                    | Favoris, historique, consultation rapide                             |
| Listes thématiques           | Grossesse, enfants, sans allergènes, etc.                            |

## Pourquoi ce curseur fonctionne

1. **Le gratuit est utile** → le grand public peut découvrir les produits naturels, le B2C fonctionne
2. **Le payant est indispensable pour un pro** → un médecin a BESOIN des interactions, des sources et de la posologie
3. **Pas de cannibalisation** → un pro ne peut pas exercer correctement avec juste le nom et la catégorie
4. **La transition est naturelle** → le pro voit la fiche basique, voit "3 interactions connues — voir en Pro" → upgrade
5. **Le B2C nourrit le B2B** → un patient qui découvre Tradimedika en parle à son médecin

## Grille tarifaire envisagée

| Plan         | Prix      | Cible                               |
| ------------ | --------- | ----------------------------------- |
| Gratuit      | 0€        | Grand public, étudiants, découverte |
| Pro Solo     | ~29€/mois | Praticien individuel                |
| Pro Cabinet  | ~69€/mois | Cabinet (jusqu'à 5 comptes)         |
| Pro Officine | ~99€/mois | Pharmacie (comptes illimités)       |

### Alternatives à explorer

- **Paiement à l'usage** : X€ par export PDF (micro-paiement)
- **Annuel avec réduction** : -20% sur engagement annuel
- **Essai gratuit** : 14-30 jours de Pro pour convaincre
- **Tarif early adopter** : -50% la première année pour les premiers inscrits

## Stratégie anti-cannibalisation (détail)

### Le mécanisme "teaser"

Le gratuit **montre que l'info existe** sans la donner :

```
┌── FICHE GRATUITE ────────────────────┐
│                                       │
│  GINGEMBRE                            │
│  Catégorie : Épice — Rhizome          │
│  Propriétés : Digestif, Antioxydant   │
│                                       │
│  Grossesse : ✅ Autorisé              │
│  Enfants : à partir de 3 ans         │
│                                       │
│  ┌─ 🔒 RÉSERVÉ AUX PROFESSIONNELS ─┐ │
│  │                                   │ │
│  │ · 2 interactions médicamenteuses  │ │
│  │ · Posologie détaillée             │ │
│  │ · 3 sources scientifiques         │ │
│  │ · Niveau de preuve : A            │ │
│  │ · Export PDF                       │ │
│  │                                   │ │
│  │ [Accéder avec un compte Pro →]    │ │
│  └───────────────────────────────────┘ │
│                                       │
└───────────────────────────────────────┘
```

Le pro **voit** qu'il y a 2 interactions et 3 sources, mais ne peut pas les consulter → motivation naturelle à s'abonner.

## Recherche par symptôme — Feature future (P2)

**IMPORTANT** : La recherche par symptôme/pathologie est une feature **risquée** qui nécessite :

- Un **comité scientifique** pour valider les associations symptôme ↔ produit
- Une **validation juridique** pour éviter les claims thérapeutiques interdits
- Un **disclaimer renforcé** adapté

→ À intégrer **uniquement en P2**, après validation du modèle B2B avec le catalogue.

L'app actuelle (B2C) a cette feature, mais elle devra être revue/validée avant le B2B.

## Questions ouvertes

- [ ] Prix validé par des études de marché / interviews pros ?
- [ ] Période d'essai gratuite : quelle durée optimale ?
- [ ] Réduction pour les premiers adoptants (early adopters) ?
- [ ] Partenariats avec des ordres professionnels ou syndicats ?
- [ ] Le "teaser" (montrer sans donner) est-il bien perçu ou frustrant ?
