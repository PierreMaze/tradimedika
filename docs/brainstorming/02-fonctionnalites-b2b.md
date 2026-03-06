# Fonctionnalités B2B — Prototype

## Concept central

Tradimedika est un **catalogue documenté de produits naturels** pour les professionnels de santé.
Ce n'est PAS un outil de diagnostic ou de matching symptômes (feature risquée → plus tard avec comité scientifique).

C'est un outil de **consultation et de documentation** : le pro cherche un produit, consulte sa fiche détaillée, et peut exporter un PDF d'information pour son patient.

## Workflow du professionnel

```
Professionnel accède à la plateforme
       │
       ▼
┌─ CATALOGUE DE PRODUITS NATURELS ─────────────────┐
│                                                    │
│  Comment chercher ?                                │
│                                                    │
│  ├──► Par nom (recherche textuelle)                │
│  │    "gingembre", "camomille", "miel"             │
│  │                                                 │
│  ├──► Par catégorie                                │
│  │    Plantes · Épices · Fruits · Aliments ·       │
│  │    Huiles essentielles · Superaliments          │
│  │                                                 │
│  ├──► Par sous-catégorie                           │
│  │    Racines · Feuilles · Fleurs · Graines · etc. │
│  │                                                 │
│  └──► Par filtres                                  │
│       · Propriétés (antioxydant, digestif, etc.)   │
│       · Grossesse (safe / précautions / interdit)  │
│       · Enfants (tous âges / âge minimum)          │
│       · Allergènes (sans gluten, sans lactose...)  │
│       · Niveau de preuve (A / B / C)               │
│       · Forme (tisane, gélule, frais, poudre...)   │
│                                                    │
└────────────────────────────────────────────────────┘
       │
       ▼
Résultats : liste de produits correspondants
       │
       ▼
Fiche produit détaillée (niveau pro)
  · Propriétés documentées + sources
  · Posologie recommandée
  · Contre-indications
  · Interactions médicamenteuses
  · Sécurité (grossesse, enfants, allergènes)
       │
       ├──► Consulter seulement (le pro s'informe)
       │
       └──► Ajouter au panier de recommandation
              │
              ▼
       Panier (1 ou plusieurs produits sélectionnés)
              │
              ▼
       Export PDF — Fiche(s) d'information produit
              │
              ▼
       Remise au patient (impression ou envoi)
```

## Cas d'usage concrets

### Cas 1 — Le médecin généraliste

> "Ma patiente enceinte me demande quelles tisanes elle peut boire."
> → Filtre : Grossesse = Autorisé → Catégorie = Plantes
> → Résultats : Camomille, Gingembre (max 1g/j), Thym, Menthe...
> → Export PDF des produits autorisés

### Cas 2 — Le pharmacien

> "Un client prend de la warfarine, il veut du curcuma."
> → Recherche : Curcuma → Fiche détaillée → Interactions
> → Voit : Interaction modérée avec anticoagulants
> → Peut conseiller avec les précautions appropriées

### Cas 3 — Le nutritionniste

> "Je cherche des aliments anti-inflammatoires pour un plan alimentaire."
> → Filtre : Propriété = Anti-inflammatoire
> → Résultats : Curcuma, Gingembre, Huile d'olive, Thé vert...
> → Sélectionne plusieurs produits → Export PDF groupé

### Cas 4 — Le kiné

> "Mon patient a des douleurs articulaires, y a-t-il des compléments naturels ?"
> → Filtre : Propriété = Anti-inflammatoire + Catégorie = Plantes
> → Résultats : Harpagophytum, Curcuma, Gingembre...
> → Consulte les fiches, recommande au patient

## Fonctionnalités par priorité

### P0 — MVP Prototype (à montrer aux pros)

- **Catalogue de produits** avec navigation par catégorie et sous-catégorie
- **Fiches produits enrichies** : sources, interactions, posologie, propriétés, niveau de preuve
- **Recherche par nom** : recherche textuelle simple et rapide
- **Filtres multiples** :
  - Par propriété (antioxydant, digestif, anti-inflammatoire, etc.)
  - Par sécurité grossesse (autorisé / précautions / interdit)
  - Par âge enfants (tous âges / âge minimum)
  - Par allergènes
  - Par catégorie / sous-catégorie
- **Export PDF** : fiche(s) d'information produit propre et professionnelle

### P1 — Post-validation prototype

- **Authentification pro** : inscription avec vérification du statut professionnel (RPPS)
- **Dashboard personnalisé** : favoris, produits fréquemment consultés
- **Panier de recommandation** : sélectionner plusieurs produits avant export PDF
- **Vérificateur d'interactions** : saisir un médicament → voir les produits incompatibles
- **Listes thématiques** :
  - "Produits autorisés pendant la grossesse"
  - "Produits pour enfants de moins de 6 ans"
  - "Produits sans allergènes courants"

### P2 — Évolution

- **Recherche par symptôme / pathologie** (UNIQUEMENT avec validation par comité scientifique)
- **Profils par métier** : interface adaptée (pharmacien ≠ nutritionniste ≠ médecin)
- **API** : accès programmatique à la BDD pour intégration dans d'autres outils
- **Notifications** : mises à jour des fiches, nouvelles alertes de sécurité
- **Formation** : modules courts sur les produits naturels (contenu premium)

## Export PDF — Détail

### Ce que contient le PDF (PAS de données patient)

```
┌─────────────────────────────────────────┐
│  🌿 TRADIMEDIKA                         │
│  Fiche d'information — Produit naturel  │
│                                         │
│  Date : 06/03/2026                      │
│  Référence : TDM-2026-XXXX             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  GINGEMBRE                              │
│  Zingiber officinale                    │
│  Catégorie : Épice — Rhizome            │
│                                         │
│  Propriétés documentées :               │
│  Digestif · Anti-nauséeux ·             │
│  Anti-inflammatoire · Antioxydant       │
│                                         │
│  Niveau de preuve : A                   │
│                                         │
│  Formes et posologie :                  │
│  · Frais : 1-3g de rhizome/jour        │
│  · Poudre : 0.5-1g, 2-3x/jour         │
│  · Tisane : 1-2g, 2-3 tasses/jour      │
│                                         │
│  Grossesse : ✅ Autorisé (max 1g/jour)  │
│  Enfants : à partir de 3 ans           │
│                                         │
│  Précautions :                          │
│  · Interaction modérée : anticoagulants │
│  · Interaction mineure : antidiabétiques│
│  · Contre-indication : calculs biliaires│
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ⚠️ Ce document est une fiche           │
│  d'information. Il ne constitue pas     │
│  un avis médical ni une prescription.   │
│                                         │
│  Sources :                              │
│  EMA/HMPC/2012/577                      │
│  PMID:25230520 · PMID:10793599          │
└─────────────────────────────────────────┘
```

### Pourquoi PAS de données patient ?

1. **Évite l'hébergement HDS** — coûteux et contraignant
2. **Simplifie le RGPD** — pas de données de santé à protéger
3. **Le pro remplit à la main** le nom du patient s'il le souhaite
4. **Focus sur la valeur** : l'information produit documentée

## Différences clé avec l'approche actuelle (B2C)

| Aspect               | Actuel (B2C)                            | Futur (B2B)                                |
| -------------------- | --------------------------------------- | ------------------------------------------ |
| Entrée principale    | Recherche par symptôme                  | Catalogue de produits                      |
| Niveau d'info        | Basique (nom, tags)                     | Complet (sources, interactions, posologie) |
| Filtres              | 3 filtres (grossesse, enfants, vérifié) | Filtres multiples avancés                  |
| Export               | Non                                     | PDF professionnel                          |
| Cible                | Grand public                            | Professionnels de santé                    |
| Risque réglementaire | Moyen (symptômes)                       | Faible (catalogue documenté)               |

## Questions ouvertes

- [ ] Le PDF doit-il être personnalisable (logo du cabinet, coordonnées du pro) ?
- [ ] Faut-il un système de "panier" pour sélectionner plusieurs produits avant export ?
- [ ] Combien de produits dans le MVP pour que le catalogue soit crédible ?
- [ ] Les listes thématiques (grossesse, enfants) sont-elles des pages dédiées ou des filtres ?
