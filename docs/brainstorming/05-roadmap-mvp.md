# Roadmap MVP — Prototype B2B

## Vue d'ensemble

```
Mois 1-2    │  Phase 0 : Validation concept (interviews 10-15 pros)
            │
Mois 3-5    │  Phase 1 : Beta privée (20-30 testeurs, MVP fonctionnel)
            │
Mois 6-8    │  Phase 2 : Lancement public (premiers abonnés payants)
            │
Mois 9+     │  Phase 3 : Croissance + nouvelles features
```

---

## Phase 0 — Validation du concept (Mois 1-2)

### Objectif : Confirmer le besoin avant de coder

- [ ] Enrichir 15 fiches produits au format pro (dans db.json)
  - Miel, Citron, Gingembre, Ail, Camomille, Thym, Menthe, Curcuma, Cannelle, Lavande, Aloe vera, Clou de girofle, Thé vert, Eucalyptus, Huile d'olive
  - Sourcing : EMA/HMPC, PubMed, pharmacopée européenne
  - ~3.5-7h par produit → ~53-105h total
- [ ] Créer un mock PDF de recommandation (maquette)
- [ ] Construire un prototype visuel (UI B2B — fiches enrichies + filtres)
- [ ] Interviewer 10-15 professionnels de santé
  - 3-4 pharmaciens, 3-4 médecins, 2-3 nutritionnistes, 1-2 kinés
  - Questions clés : besoin, prix acceptable, features prioritaires
- [ ] Analyser les retours et décider GO / PIVOT / NO-GO

### Critère GO

≥7/10 pros confirment le besoin + ≥5/10 prêts à payer ~29€/mois

---

## Phase 1 — Beta privée (Mois 3-5)

### Objectif : MVP fonctionnel testé par de vrais pros

### Technique

- [ ] Intégrer Supabase Auth (inscription/login pro)
- [ ] Migrer db.json → PostgreSQL (Supabase)
- [ ] Implémenter le catalogue avec navigation par catégorie/sous-catégorie
- [ ] Implémenter les filtres avancés (propriété, grossesse, enfants, allergènes, preuve)
- [ ] Créer les fiches produits niveau pro (UI avec onglets)
- [ ] Implémenter l'export PDF (@react-pdf/renderer)
- [ ] Mettre en place le paywall (gratuit vs pro)
- [ ] Déployer sur Vercel

### Contenu

- [ ] Enrichir à 30-50 fiches produits
- [ ] Vérifier le statut réglementaire de chaque produit
- [ ] Rédiger les mentions légales, CGU, politique de confidentialité
- [ ] Ajouter les disclaimers sur toutes les fiches

### Test

- [ ] Recruter 20-30 beta testeurs (pros des interviews Phase 0 + réseau)
- [ ] Feedback loop : formulaire intégré + check-in bimensuel
- [ ] Itérer sur les retours
- [ ] Mesurer : DAU, fiches consultées, PDF exportés, NPS

### Critère de passage à Phase 2

≥50% des beta testeurs utilisent l'outil chaque semaine + NPS ≥40

---

## Phase 2 — Lancement public (Mois 6-8)

### Objectif : Premiers abonnés payants

### Technique

- [ ] Intégrer Stripe (paiement abonnement)
- [ ] Stripe Customer Portal (gestion abonnement)
- [ ] Dashboard pro (favoris, historique, dernières consultations)
- [ ] Analytics (Plausible ou PostHog)
- [ ] Monitoring (Sentry)
- [ ] Emails transactionnels (Resend ou Loops)

### Contenu

- [ ] 50-100 fiches produits
- [ ] CGV pour l'abonnement payant
- [ ] Landing page B2B avec argumentaire par métier
- [ ] Page de pricing

### Acquisition

- [ ] Offre early adopter (-50% première année, 100 premiers)
- [ ] Essai gratuit 14 jours
- [ ] Programme parrainage (1 mois gratuit par filleul)
- [ ] Lancement LinkedIn (posts, réseau)
- [ ] Premiers articles de blog (SEO)

### Objectifs chiffrés

- Mois 1 : 10-20 abonnés payants
- Mois 3 : 50-100 abonnés
- North Star : PDF exportés par semaine

---

## Phase 3 — Croissance (Mois 9+)

### Contenu et produit

- [ ] 200+ fiches produits
- [ ] Vérificateur d'interactions (saisir un médicament → produits incompatibles)
- [ ] Listes thématiques dédiées (grossesse, enfants, sans allergènes)
- [ ] Profils par métier (interface adaptée)
- [ ] Recherche par symptôme / pathologie (avec comité scientifique)

### Acquisition et croissance

- [ ] Salons professionnels (Pharmagora, congrès médecine)
- [ ] Partenariats syndicats/ordres professionnels
- [ ] LinkedIn Ads
- [ ] SEO renforcé

### Internationalisation

- [ ] Belgique (même langue, même réglementation UE, adaptation minimale)
- [ ] Suisse romande (adapter statuts réglementaires Swissmedic)
- [ ] Préparer la traduction anglaise

### Infrastructure

- [ ] API publique (accès BDD pour intégrations)
- [ ] Formation continue (modules sur les produits naturels)
- [ ] Comité scientifique formel

---

## Coût estimé

### Phase 0-1 (6 premiers mois)

| Poste                                    | Coût                        |
| ---------------------------------------- | --------------------------- |
| Hébergement (Vercel + Supabase free)     | ~0-10€/mois                 |
| Domaine .fr                              | ~12€/an                     |
| Temps (développement + sourcing contenu) | Le plus gros investissement |
| **Total cash**                           | **< 100€**                  |

### Phase 2 (lancement)

| Poste        | Coût/mois         |
| ------------ | ----------------- |
| Supabase Pro | 25$/mois          |
| Vercel Pro   | 20$/mois          |
| Plausible    | 9€/mois           |
| Stripe       | % par transaction |
| **Total**    | **~55€/mois**     |

→ Rentable dès ~2 abonnés Pro Solo à 29€/mois.
