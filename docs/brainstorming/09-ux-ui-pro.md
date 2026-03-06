# UX/UI — Pro vs Grand Public

## Philosophie

Le grand public veut de la **simplicité et de la découverte**.
Le professionnel veut de la **densité d'information et de l'efficacité**.

Deux interfaces différentes, mais un même design system.

---

## 1. Différences clés

| Aspect              | B2C (Grand public)          | B2B (Professionnel)                 |
| ------------------- | --------------------------- | ----------------------------------- |
| Densité d'info      | Légère, aérée               | Dense, compacte                     |
| Navigation          | Catégories visuelles, cards | Tableau/liste, recherche rapide     |
| Vocabulaire         | Simple, accessible          | Technique (nom latin, PMID, etc.)   |
| Actions principales | Découvrir, lire             | Chercher, comparer, exporter        |
| Animations          | Oui (Framer Motion)         | Réduites (efficacité)               |
| Fiche produit       | Résumé + tags               | Fiche complète multi-sections       |
| Filtres             | 3-4 filtres simples         | 8+ filtres combinables              |
| Call to action      | "En savoir plus"            | "Exporter PDF", "Ajouter au panier" |

---

## 2. Interface B2C (existante — à garder)

### Page d'accueil

- Hero attractif avec barre de recherche
- Catégories visuelles (cards avec icônes/images)
- Produits populaires
- Mise en avant des listes thématiques (grossesse, enfants)

### Fiche produit (version basique)

```
┌────────────────────────────────────┐
│  🌿 Gingembre                      │
│                                    │
│  Catégorie : Épice — Rhizome       │
│                                    │
│  Propriétés :                      │
│  [Digestif] [Antioxydant]          │
│  [Anti-inflammatoire]              │
│                                    │
│  [✅ Grossesse OK] [👶 3+ ans]     │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔒 Interactions, posologie, │  │
│  │    sources → Compte Pro      │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

---

## 3. Interface B2B (nouvelle — à créer)

### Dashboard pro

```
┌──────────────────────────────────────────────────────────────┐
│  TRADIMEDIKA PRO                        [Dr. Martin] [⚙️]   │
│                                                              │
│  ┌─ Recherche rapide ──────────────────────────────────────┐ │
│  │  🔍 Rechercher un produit, une propriété...             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ Accès rapide ────────┐  ┌─ Dernières consultations ───┐ │
│  │                        │  │                              │ │
│  │  📁 Catégories         │  │  · Gingembre      il y a 2h │ │
│  │  ⭐ Mes favoris        │  │  · Camomille      hier      │ │
│  │  🤰 Liste grossesse    │  │  · Curcuma        02/03     │ │
│  │  👶 Liste enfants      │  │  · Thym           01/03     │ │
│  │  📄 Mes exports PDF    │  │                              │ │
│  │  ⚠️ Interactions       │  │                              │ │
│  │                        │  │                              │ │
│  └────────────────────────┘  └──────────────────────────────┘ │
│                                                              │
│  ┌─ Produits récemment mis à jour ─────────────────────────┐ │
│  │  Millepertuis — MAJ 05/03/2026 — Nouvelle interaction   │ │
│  │  Valériane — MAJ 01/03/2026 — Source EMA ajoutée        │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Catalogue pro (vue liste dense)

```
┌──────────────────────────────────────────────────────────────┐
│  Catalogue  │ Filtres actifs : [Grossesse: OK ✕] [Preuve: A ✕]│
│                                                              │
│  ┌─ Filtres ──┐  ┌─ Résultats (23 produits) ──────────────┐ │
│  │             │  │                                         │ │
│  │ Catégorie   │  │ Nom          │ Propriétés │ Gr. │ Enf. │ │
│  │ ☐ Plantes   │  │──────────────┼────────────┼─────┼──────│ │
│  │ ☑ Épices    │  │ Gingembre    │ Digestif,  │ ✅  │ 3+   │ │
│  │ ☐ Fruits    │  │              │ Anti-infl. │     │      │ │
│  │ ☐ Aliments  │  │──────────────┼────────────┼─────┼──────│ │
│  │             │  │ Curcuma      │ Anti-infl, │ ⚠️  │ 6+   │ │
│  │ Propriété   │  │              │ Antioxyd.  │     │      │ │
│  │ ☑ Digestif  │  │──────────────┼────────────┼─────┼──────│ │
│  │ ☐ Apaisant  │  │ Cannelle     │ Digestif,  │ ⚠️  │ 3+   │ │
│  │ ☐ Immunit.  │  │              │ Antioxyd.  │     │      │ │
│  │             │  │                                         │ │
│  │ Grossesse   │  │ [Exporter sélection en PDF]             │ │
│  │ ☑ Autorisé  │  │                                         │ │
│  │ ☐ Précaut.  │  └─────────────────────────────────────────┘ │
│  │ ☐ Interdit  │                                              │
│  │             │                                              │
│  │ Preuve      │                                              │
│  │ ☑ A         │                                              │
│  │ ☐ B         │                                              │
│  │ ☐ C         │                                              │
│  └─────────────┘                                              │
└──────────────────────────────────────────────────────────────┘
```

### Fiche produit pro (complète)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Retour    Gingembre (Zingiber officinale)    [⭐] [📄 PDF]│
│                                                              │
│  [Identité] [Propriétés] [Posologie] [Sécurité] [Sources]   │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  IDENTITÉ                                                    │
│  Catégorie : Épice — Rhizome                                 │
│  Famille : Zingiberaceae                                     │
│  Partie utilisée : Rhizome                                   │
│  Formes : Frais · Poudre · Tisane · Gélule · Confit         │
│  Statut : Liste 148 ✅ · Liste 540 ✅ · EFSA: en attente    │
│                                                              │
│  PROPRIÉTÉS                               Preuve : A         │
│  · Digestif — traditionnellement utilisé                     │
│  · Anti-nauséeux — études cliniques (PMID:25230520)          │
│  · Anti-inflammatoire — études préliminaires                 │
│  · Antioxydant — études in vitro                             │
│  Principes actifs : gingérol, shogaol, zingérone             │
│                                                              │
│  POSOLOGIE                                                   │
│  · Frais : 1-3g/jour                                        │
│  · Poudre : 0.5-1g, 2-3x/jour                              │
│  · Tisane : 1-2g, 2-3 tasses/jour                           │
│  · Durée : cure 2-4 semaines                                │
│                                                              │
│  SÉCURITÉ                                                    │
│  Grossesse : ✅ Autorisé (max 1g/jour)                       │
│  Allaitement : ✅ Autorisé                                   │
│  Enfants : à partir de 3 ans                                │
│  Allergènes : aucun                                          │
│                                                              │
│  ⚠️ INTERACTIONS                                             │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Anticoagulants (warfarine, aspirine)  │  ⚠️ Modéré   │    │
│  │ → Effet antiagrégant plaquettaire     │              │    │
│  │──────────────────────────────────────────────────────│    │
│  │ Antidiabétiques                       │  ℹ️ Mineur   │    │
│  │ → Possible potentialisation hypoglycém.│              │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Contre-indications : Calculs biliaires (à doses élevées)   │
│  Effets indésirables : Brûlures d'estomac, irritation       │
│                                                              │
│  SOURCES                                                     │
│  · EMA/HMPC/2012/577                                        │
│  · PMID:25230520 — Ginger for nausea (2014)                 │
│  · PMID:10793599 — Zingiber officinale review (2000)        │
│  · Pharmacopée européenne, monographie 1522                 │
│                                                              │
│  Dernière mise à jour : 15/01/2025                          │
│                                                              │
│  [📄 Exporter en PDF]  [⭐ Ajouter aux favoris]              │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Navigation par onglets (fiche pro)

La fiche pro est longue → navigation par sections/onglets :

| Onglet     | Contenu                                                    | Pertinence par métier   |
| ---------- | ---------------------------------------------------------- | ----------------------- |
| Identité   | Nom, catégorie, formes, statut réglementaire               | Tous                    |
| Propriétés | Propriétés documentées, principes actifs, niveau de preuve | Tous                    |
| Posologie  | Dosages par forme, durée, mode d'administration            | Médecin, Nutritionniste |
| Sécurité   | Interactions, contre-indications, grossesse, enfants       | Pharmacien, Médecin     |
| Sources    | Références scientifiques, monographies                     | Tous (crédibilité)      |

---

## 5. Design system partagé

### Ce qui est commun B2C / B2B

- Palette de couleurs Tradimedika (vert naturel, tons chauds)
- Typographie Poppins
- Tags existants (grossesse, enfants, vérifié) → même composants
- Dark mode
- Responsive

### Ce qui diffère

| Élément          | B2C                         | B2B                                        |
| ---------------- | --------------------------- | ------------------------------------------ |
| Layout           | Cards, grille visuelle      | Tableau, liste dense                       |
| Espacement       | Généreux (32-48px)          | Compact (16-24px)                          |
| Taille de police | 16-18px body                | 14-16px body                               |
| Animations       | Framer Motion (transitions) | Minimales (efficacité)                     |
| Sidebar          | Non                         | Oui (filtres persistants)                  |
| Header           | Simple (logo + nav)         | Pro (logo + recherche + compte + settings) |

---

## 6. Responsive pro

### Desktop (prioritaire pour les pros)

- Sidebar filtres persistante à gauche
- Contenu principal au centre
- Fiche produit en pleine largeur avec onglets

### Tablette

- Sidebar filtres en overlay (bouton toggle)
- Contenu pleine largeur
- Usage en consultation (tablette sur le bureau)

### Mobile

- Filtres en modal (comme actuellement)
- Navigation simplifiée
- Usage ponctuel (vérification rapide)

**Note** : Les pros utilisent principalement le **desktop** ou la **tablette** en consultation.
Le mobile est secondaire pour le B2B.

---

## 7. Accessibilité (maintenir le niveau actuel)

- WCAG 2.2 Level AA minimum
- Contrastes suffisants (surtout mode compact)
- Navigation clavier complète
- Labels ARIA sur tous les composants
- Focus visible sur les tableaux et filtres
- Support lecteur d'écran
