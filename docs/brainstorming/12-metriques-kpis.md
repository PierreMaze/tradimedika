# Métriques et KPIs

## Pourquoi mesurer

Sans métriques, on ne sait pas si l'outil fonctionne, si les pros l'utilisent vraiment,
et si le modèle économique tient. Les KPIs guident les décisions : continuer, pivoter, ou arrêter.

---

## 1. KPIs par phase

### Phase 0 — Validation (qualitatif)

| Métrique                | Objectif | Comment mesurer                |
| ----------------------- | -------- | ------------------------------ |
| Pros interviewés        | ≥10      | Compteur                       |
| Taux d'intérêt confirmé | ≥70%     | "Oui, j'utiliserais cet outil" |
| Willingness to pay      | ≥50%     | "Oui, je paierais 29€/mois"    |
| Features demandées      | Top 5    | Analyse des interviews         |

### Phase 1 — Beta privée

| Métrique                    | Objectif                 | Comment mesurer        |
| --------------------------- | ------------------------ | ---------------------- |
| Beta testeurs actifs        | ≥15/30 (50%)             | Connexion hebdomadaire |
| Fiches consultées / session | ≥3                       | Analytics              |
| PDF exportés / semaine      | ≥1 par utilisateur actif | Analytics              |
| NPS (Net Promoter Score)    | ≥40                      | Enquête                |
| Bugs signalés et résolus    | <5 bloquants             | Tracker                |
| Taux de rétention semaine 4 | ≥60%                     | Cohorte                |

### Phase 2 — Lancement

| Métrique                          | Objectif M1 | Objectif M3 | Objectif M6 |
| --------------------------------- | ----------- | ----------- | ----------- |
| Visiteurs uniques / mois          | 500         | 2000        | 5000        |
| Inscriptions gratuites            | 100         | 400         | 1000        |
| Essais pro (14j)                  | 30          | 100         | 300         |
| Abonnés payants                   | 10-20       | 50-100      | 200+        |
| Taux de conversion essai → payant | ≥20%        | ≥25%        | ≥30%        |
| MRR (Monthly Recurring Revenue)   | 300-600€    | 1500-3000€  | 6000€+      |
| Churn mensuel                     | <10%        | <8%         | <5%         |
| CAC (Coût d'Acquisition Client)   | <50€        | <40€        | <30€        |

---

## 2. Métriques d'usage (produit)

### Engagement

| Métrique                      | Ce qu'elle dit          | Cible              |
| ----------------------------- | ----------------------- | ------------------ |
| DAU / MAU                     | Fréquence d'utilisation | ≥30% (usage hebdo) |
| Sessions / utilisateur / mois | Récurrence              | ≥8 (2x/semaine)    |
| Durée moyenne de session      | Profondeur d'usage      | 3-8 min            |
| Fiches consultées / session   | Valeur perçue           | ≥2                 |
| PDF exportés / mois           | Feature clé utilisée    | ≥2 par pro         |

### Contenu

| Métrique                   | Ce qu'elle dit        | Action               |
| -------------------------- | --------------------- | -------------------- |
| Fiches les plus consultées | Produits populaires   | Enrichir en priorité |
| Fiches jamais consultées   | Produits sans intérêt | Revoir ou retirer    |
| Recherches sans résultat   | Produits manquants    | Ajouter au catalogue |
| Filtres les plus utilisés  | Besoins des pros      | Optimiser l'UX       |

### Fonctionnalités

| Métrique                                           | Ce qu'elle dit             |
| -------------------------------------------------- | -------------------------- |
| % d'utilisateurs qui exportent PDF                 | Adoption de la feature clé |
| % d'utilisateurs qui utilisent les filtres avancés | Valeur du premium          |
| % d'utilisateurs qui ajoutent des favoris          | Engagement long terme      |
| % d'utilisateurs qui consultent les interactions   | Besoin critique confirmé   |

---

## 3. Métriques business

### Revenue

| Métrique  | Formule                         | Cible M6 |
| --------- | ------------------------------- | -------- |
| MRR       | Nb abonnés × prix moyen         | 6 000€+  |
| ARR       | MRR × 12                        | 72 000€+ |
| ARPU      | MRR / nb abonnés                | 29-40€   |
| LTV       | ARPU × durée moyenne abonnement | >350€    |
| LTV / CAC | LTV / Coût acquisition          | >3       |

### Acquisition

| Métrique                                  | Formule                                  |
| ----------------------------------------- | ---------------------------------------- |
| CAC                                       | Dépenses marketing / nb nouveaux clients |
| Taux de conversion visiteur → inscription | Inscriptions / visiteurs                 |
| Taux de conversion inscription → essai    | Essais / inscriptions                    |
| Taux de conversion essai → payant         | Payants / essais                         |
| Source d'acquisition                      | D'où viennent les clients                |

### Rétention

| Métrique      | Ce qu'elle dit               | Cible |
| ------------- | ---------------------------- | ----- |
| Churn mensuel | % d'abonnés qui quittent     | <5%   |
| Rétention M1  | % encore actifs après 1 mois | ≥85%  |
| Rétention M3  | % encore actifs après 3 mois | ≥70%  |
| Rétention M6  | % encore actifs après 6 mois | ≥60%  |

---

## 4. Outils de mesure recommandés

| Besoin            | Outil                          | Coût                               |
| ----------------- | ------------------------------ | ---------------------------------- |
| Analytics web     | Plausible ou PostHog           | Gratuit (self-hosted) ou ~10€/mois |
| Analytics produit | PostHog                        | Gratuit (10k events/mois)          |
| NPS / Feedback    | Typeform ou formulaire intégré | Gratuit                            |
| Revenue           | Stripe Dashboard               | Inclus                             |
| Erreurs           | Sentry                         | Gratuit (5k events/mois)           |

**Pourquoi pas Google Analytics ?**

- RGPD : Google Analytics pose des problèmes de conformité en France (transfert US)
- Plausible (UE) ou PostHog (self-host) sont plus conformes

---

## 5. Tableau de bord décisionnel

### Le "North Star Metric"

**PDF exportés par semaine** — c'est la métrique qui résume tout :

- Si un pro exporte des PDF, c'est qu'il utilise l'outil dans son quotidien
- C'est la preuve que Tradimedika a de la valeur
- C'est ce qui justifie l'abonnement

### Dashboard mensuel simplifié

```
┌─────────────────────────────────────────────┐
│  TRADIMEDIKA — Dashboard KPIs — Mars 2026   │
│                                             │
│  Utilisateurs                               │
│  ├ Visiteurs : 2 340        (+15% vs M-1)   │
│  ├ Inscrits : 180           (+22%)          │
│  ├ Essais pro : 45          (+18%)          │
│  └ Abonnés payants : 28     (+40%)          │
│                                             │
│  Engagement                                 │
│  ├ Sessions / user / mois : 9.2             │
│  ├ Fiches consultées / session : 3.1        │
│  └ PDF exportés cette semaine : 67          │
│                                             │
│  Revenue                                    │
│  ├ MRR : 812€                               │
│  ├ Churn : 3.5%                             │
│  └ CAC : 35€                                │
│                                             │
│  Santé produit                              │
│  ├ NPS : 52                                 │
│  ├ Bugs ouverts : 3                         │
│  └ Fiches dans le catalogue : 47            │
└─────────────────────────────────────────────┘
```

---

## 6. Signaux d'alerte (quand pivoter)

| Signal                               | Seuil d'alerte     | Action                                             |
| ------------------------------------ | ------------------ | -------------------------------------------------- |
| Churn > 15%                          | 2 mois consécutifs | Interviews churners → comprendre pourquoi          |
| Conversion essai → payant < 10%      | Après 50+ essais   | Revoir la proposition de valeur                    |
| PDF exportés = 0 pour un utilisateur | Après 2 semaines   | Email de réengagement + onboarding                 |
| NPS < 20                             | Toute mesure       | Arrêter le développement → interviews utilisateurs |
| CAC > LTV                            | Tout moment        | Revoir les canaux d'acquisition                    |
