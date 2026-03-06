# Stratégie de Lancement

## Approche : "Validation avant scale"

Ne pas construire un produit complet dans le vide.
Valider chaque étape avec de vrais utilisateurs avant d'avancer.

---

## Phase 0 — Pré-lancement : Validation du concept (1-2 mois)

### Objectif

Confirmer que les pros ont ce besoin et seraient prêts à payer.

### Actions

1. **Créer un prototype minimal**
   - 15 fiches produits enrichies (format pro)
   - Export PDF fonctionnel
   - Filtres de base (catégorie, grossesse, enfants, propriétés)
   - Pas d'auth, pas de paiement, pas de dashboard

2. **Identifier 10-15 professionnels de santé**
   - 3-4 pharmaciens (premier contact naturel avec les plantes)
   - 3-4 médecins généralistes
   - 2-3 nutritionnistes/diététiciens
   - 1-2 kinés
   - Via réseau personnel, LinkedIn, associations locales

3. **Conduire des interviews (30-45 min chacune)**
   - Questions clés :
     - "Combien de fois par semaine un patient vous pose une question sur les produits naturels ?"
     - "Comment trouvez-vous l'info aujourd'hui ? (Google, livres, collègues)"
     - "Que pensez-vous de cet outil ? Qu'est-ce qui manque ?"
     - "Seriez-vous prêt à payer 29€/mois pour cet outil ?"
     - "Qu'est-ce qui vous ferait utiliser cet outil au quotidien ?"
   - Montrer le prototype, observer les réactions

4. **Analyser les retours**
   - Le besoin est-il confirmé ?
   - Le prix est-il acceptable ?
   - Quelles features sont prioritaires selon les pros ?
   - Quels ajustements faire ?

### Critère de GO/NO-GO

- **GO** : ≥7/10 pros confirment le besoin + ≥5/10 se disent prêts à payer
- **PIVOT** : Le besoin existe mais pas le prix → revoir le modèle
- **NO-GO** : <4/10 pros intéressés → pivoter le concept

---

## Phase 1 — Beta privée (2-3 mois)

### Objectif

Construire le MVP complet et le tester avec un petit groupe.

### Actions

1. **Développer le MVP**
   - Auth (inscription pro avec vérification RPPS)
   - Dashboard pro basique
   - 30-50 fiches produits enrichies
   - Filtres avancés (propriété, forme, allergène, preuve)
   - Export PDF professionnel
   - Paywall (gratuit vs pro)

2. **Recruter 20-30 beta testeurs**
   - Les 10-15 pros interviewés en Phase 0 + leurs recommandations
   - Accès gratuit pendant la beta
   - Engagement : utiliser l'outil 2+ fois/semaine et donner du feedback

3. **Feedback loop**
   - Formulaire de feedback intégré (bouton "Feedback" permanent)
   - Check-in bimensuel avec 5-10 beta testeurs (appel de 15 min)
   - Analytics d'usage (quelles fiches sont les plus consultées, quels filtres)
   - Itérer rapidement sur les retours

### Critère de passage à Phase 2

- **Usage régulier** : ≥50% des beta testeurs utilisent l'outil chaque semaine
- **NPS** : ≥40 (les pros recommanderaient l'outil)
- **Produit stable** : pas de bugs bloquants

---

## Phase 2 — Lancement public (2-3 mois)

### Objectif

Ouvrir l'abonnement payant et acquérir les premiers clients.

### Actions

1. **Préparer le lancement**
   - 50-100 fiches produits (catalogue crédible)
   - Mentions légales, CGU, CGV, politique de confidentialité
   - Intégration Stripe (paiement abonnement)
   - Page de pricing claire
   - Landing page B2B avec argumentaire par métier

2. **Offre de lancement**
   - **Early adopter** : -50% la première année pour les 100 premiers inscrits
   - **Essai gratuit** : 14 jours (accès complet)
   - **Parrainage** : 1 mois gratuit par pro parrainé

3. **Communication**
   - Post LinkedIn d'annonce (compte perso + page Tradimedika)
   - Email aux beta testeurs → conversion en payant
   - Contacter les associations/syndicats professionnels
   - Premiers articles de blog (SEO)

4. **Support**
   - Chat support intégré (Crisp, Intercom, ou simple email)
   - FAQ / Centre d'aide
   - Onboarding guidé (tour du produit au premier login)

### Objectif chiffré

- **Mois 1** : 10-20 abonnés payants
- **Mois 3** : 50-100 abonnés payants
- **Mois 6** : 200+ abonnés payants

---

## Phase 3 — Croissance (6+ mois)

### Actions

- Élargir le catalogue (200+ produits)
- Feature "recherche par symptôme" (avec comité scientifique)
- Profils par métier
- Partenariats institutionnels
- Ouverture B2C
- Internationalisation

---

## Timeline résumée

```
Mois 1-2    │  Phase 0 : Validation concept (interviews pros)
            │
Mois 3-5    │  Phase 1 : Beta privée (20-30 testeurs)
            │
Mois 6-8    │  Phase 2 : Lancement public (premiers abonnés)
            │
Mois 9+     │  Phase 3 : Croissance et nouvelles features
```

---

## Risques et mitigations

| Risque                                   | Probabilité | Mitigation                                     |
| ---------------------------------------- | ----------- | ---------------------------------------------- |
| Les pros ne veulent pas payer            | Moyenne     | Valider le prix en Phase 0 avant de coder      |
| Pas assez de contenu (fiches)            | Élevée      | Commencer avec 15, enrichir progressivement    |
| Problème réglementaire                   | Faible      | Consultation avocat + vocabulaire conforme     |
| Concurrent lance un produit similaire    | Faible      | Avantage du first-mover + focus UX             |
| Beta testeurs ne donnent pas de feedback | Moyenne     | Engagement formel + incentives (accès gratuit) |
