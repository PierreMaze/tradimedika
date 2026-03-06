# Vision Globale — Tradimedika B2B

## Positionnement

**Tradimedika est un catalogue documenté de produits naturels** destiné aux professionnels de santé.

- Ce n'est PAS un outil de prescription ni de diagnostic
- C'est un outil de **référence documentée** (type "Vidal du naturel")
- Il permet aux pros de consulter, s'informer et exporter des fiches d'information pour leurs patients
- L'entrée principale est le **catalogue de produits** (pas la recherche par symptôme)

## Cibles B2B (Phase 1)

| Professionnel       | Besoin principal                                  | Usage type                                            |
| ------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Médecin généraliste | Compléments naturels compatibles avec traitements | Vérifier interactions, exporter fiche patient         |
| Pharmacien          | Conseil officinal sur produits naturels           | Vérifier contre-indications, interactions             |
| Nutritionniste      | Base de données plantes/compléments/aliments      | Recherche par propriété, export pour plan alimentaire |
| Diététicien         | Alternatives naturelles pour plans alimentaires   | Fiches détaillées avec posologie                      |
| Kinésithérapeute    | Anti-inflammatoires/antalgiques naturels          | Consulter les fiches, informer le patient             |

## Cibles B2C (Phase 2 — futur)

- Grand public cherchant des informations sur les produits naturels
- Patients ayant reçu une fiche d'un pro utilisant Tradimedika

## Les 3 couches complémentaires

```text
┌─────────────────────────────────────────┐
│  COUCHE 3 — Modèle Freemium            │
│  Stratégie de monétisation              │
│  (voir 03-modele-economique.md)         │
├─────────────────────────────────────────┤
│  COUCHE 2 — Outils pro                  │
│  Catalogue, filtres, export PDF         │
│  (voir 02-fonctionnalites-b2b.md)       │
├─────────────────────────────────────────┤
│  COUCHE 1 — BDD de référence            │
│  Fiches enrichies, sources, interactions│
│  (voir 01-fiches-produits-pro.md)       │
└─────────────────────────────────────────┘
```

## Principes directeurs

1. **Pas de données patient** → évite la complexité HDS/RGPD santé
2. **Outil de documentation**, jamais de "prescription"
3. **Catalogue de produits** comme entrée principale (pas recherche par symptôme)
4. **Sources traçables** → chaque info cite sa source (EMA, PubMed, pharmacopée)
5. **Vocabulaire conforme** → "traditionnellement utilisé pour", jamais "guérit" ou "soigne"
6. **Progressif** → commencer avec 15 produits courants bien documentés
7. **Validation terrain** → interviewer des pros avant de tout coder

## Dossier de brainstorming — Index

| Fichier                                                      | Contenu                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| [00-vision-globale.md](00-vision-globale.md)                 | Ce fichier — vision, positionnement, principes                     |
| [01-fiches-produits-pro.md](01-fiches-produits-pro.md)       | Structure des fiches enrichies, schéma JSON, produits prioritaires |
| [02-fonctionnalites-b2b.md](02-fonctionnalites-b2b.md)       | Workflow pro, catalogue, filtres, export PDF, cas d'usage          |
| [03-modele-economique.md](03-modele-economique.md)           | Curseur freemium/premium, grille tarifaire, anti-cannibalisation   |
| [04-reglementaire.md](04-reglementaire.md)                   | Lois FR/UE, allégations EFSA, RGPD, disclaimers, checklist         |
| [05-roadmap-mvp.md](05-roadmap-mvp.md)                       | Phases de développement, timeline, critères GO/NO-GO               |
| [06-concurrence.md](06-concurrence.md)                       | Analyse concurrentielle, carte de positionnement, différenciateurs |
| [07-sourcing-scientifique.md](07-sourcing-scientifique.md)   | Sources fiables, process de création de fiche, comité scientifique |
| [08-architecture-technique.md](08-architecture-technique.md) | Stack B2B (Supabase, Vercel, Stripe), schéma BDD, migration        |
| [09-ux-ui-pro.md](09-ux-ui-pro.md)                           | Maquettes UI pro, design system, responsive, accessibilité         |
| [10-strategie-acquisition.md](10-strategie-acquisition.md)   | Canaux d'acquisition, argumentaire par cible, entonnoir            |
| [11-strategie-lancement.md](11-strategie-lancement.md)       | Phases de lancement, beta privée, critères de validation           |
| [12-metriques-kpis.md](12-metriques-kpis.md)                 | KPIs par phase, North Star Metric, signaux d'alerte                |
| [13-internationalisation.md](13-internationalisation.md)     | Marchés cibles, préparation technique, différences réglementaires  |
