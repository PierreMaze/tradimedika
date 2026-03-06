# Sourcing et Validation Scientifique

## Le défi

La crédibilité de Tradimedika repose **entièrement** sur la qualité et la fiabilité des données.
Un pro ne fera confiance à l'outil que si chaque information est sourcée et vérifiable.

---

## 1. Sources fiables — Où trouver les données

### Sources de niveau 1 (institutionnelles — prioritaires)

| Source                     | Type                                         | Accès         | URL                                                                                               |
| -------------------------- | -------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| **EMA/HMPC**               | Monographies plantes médicinales européennes | Gratuit       | [ema.europa.eu](https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products) |
| **Pharmacopée européenne** | Monographies officielles des plantes         | Payant        | [edqm.eu](https://www.edqm.eu/en/european-pharmacopoeia)                                          |
| **OMS**                    | Monographies plantes médicinales (4 volumes) | Gratuit (PDF) | [who.int](https://www.who.int/publications)                                                       |
| **EFSA**                   | Avis scientifiques sur allégations santé     | Gratuit       | [efsa.europa.eu](https://www.efsa.europa.eu/)                                                     |
| **ANSES**                  | Avis sur compléments alimentaires (France)   | Gratuit       | [anses.fr](https://www.anses.fr/)                                                                 |
| **Pharmacopée française**  | Listes A et B des plantes médicinales        | Payant        | Via ANSM                                                                                          |

### Sources de niveau 2 (scientifiques)

| Source                                      | Type                                                  | Accès                 |
| ------------------------------------------- | ----------------------------------------------------- | --------------------- |
| **PubMed**                                  | Études cliniques, méta-analyses, revues systématiques | Gratuit               |
| **Cochrane Library**                        | Revues systématiques (gold standard)                  | Partiellement gratuit |
| **Natural Medicines** (ex-Natural Standard) | Base de données clinique produits naturels            | Payant (~$$)          |
| **ESCOP**                                   | Monographies européennes de phytothérapie             | Payant                |
| **Commission E allemande**                  | Monographies historiques de référence                 | Partiellement gratuit |

### Sources de niveau 3 (complémentaires)

| Source                              | Type                                           | Usage                        |
| ----------------------------------- | ---------------------------------------------- | ---------------------------- |
| **Synadiet**                        | Syndicat national des compléments alimentaires | Réglementation               |
| **SIMPLES**                         | Syndicat des producteurs de plantes            | Usage traditionnel           |
| **Traités de phytothérapie**        | Livres de référence (Bruneton, Wichtl)         | Documentation approfondie    |
| **Bases de données d'interactions** | Stockley's, drugs.com                          | Interactions médicamenteuses |

---

## 2. Process de création d'une fiche produit

### Étape 1 — Collecte (2-4h par produit)

```
1. Vérifier le statut réglementaire
   └── Liste 148 ? Liste 540 ? Allégation EFSA ?

2. Consulter la monographie EMA/HMPC (si elle existe)
   └── Posologie, indications traditionnelles, contre-indications

3. Consulter la monographie OMS (si elle existe)
   └── Complément d'information, données pharmacologiques

4. Rechercher sur PubMed
   └── Mots-clés : "[nom latin] AND (clinical trial OR meta-analysis OR systematic review)"
   └── Filtrer : 10 dernières années, études humaines
   └── Sélectionner 2-5 études pertinentes

5. Vérifier les interactions médicamenteuses
   └── Stockley's Herbal Medicines Interactions
   └── PubMed : "[nom latin] AND drug interaction"
   └── drugs.com interaction checker

6. Compiler les données de sécurité
   └── Contre-indications, effets indésirables
   └── Grossesse, allaitement, enfants
   └── ANSES : vigilance compléments alimentaires
```

### Étape 2 — Rédaction

```
1. Remplir le template JSON standardisé
2. Attribuer le niveau de preuve :
   - A : ≥1 méta-analyse ou ≥2 études cliniques randomisées
   - B : études cliniques préliminaires ou études observationnelles
   - C : usage traditionnel documenté uniquement
3. Rédiger les formulations (vocabulaire réglementaire conforme)
4. Citer toutes les sources avec identifiants (PMID, EMA ref, etc.)
```

### Étape 3 — Validation

```
1. Relecture croisée (une 2e personne vérifie)
2. Validation par un professionnel de santé (pharmacien idéalement)
3. Vérification des formulations (pas d'allégation thérapeutique)
4. Date de dernière mise à jour
```

---

## 3. Comité scientifique — Quand et comment ?

### Phase MVP : Pas de comité formel

- **Validation informelle** : faire relire les fiches par 1-2 pharmaciens/médecins
- **Transparence** : afficher clairement les sources → le pro peut vérifier lui-même
- **Disclaimer** : "Contenu documentaire basé sur des sources publiques"

### Phase post-validation (quand le produit a du traction)

- **Comité consultatif** (3-5 personnes) :
  - 1 pharmacien spécialisé en phytothérapie
  - 1 médecin généraliste
  - 1 nutritionniste/diététicien
  - 1 chercheur (pharmacognosie ou sciences biomédicales)
  - 1 juriste santé (optionnel)

- **Rôle** :
  - Valider les nouvelles fiches produits
  - Relire les mises à jour
  - Valider l'ajout de la feature "recherche par symptôme" (P2)
  - Caution scientifique pour la crédibilité

- **Rémunération** :
  - Bénévole au début (contrepartie : mention sur le site, accès gratuit)
  - Rémunéré quand le SaaS génère du revenu (honoraires ponctuels ou advisory board)

---

## 4. Mise à jour et veille

### Fréquence de mise à jour

| Type                            | Fréquence       | Déclencheur   |
| ------------------------------- | --------------- | ------------- |
| Nouvelle monographie EMA        | Dès publication | Veille EMA    |
| Nouvel avis EFSA (allégation)   | Dès publication | Veille EFSA   |
| Alerte de sécurité (ANSES, EMA) | Immédiat        | Veille ANSES  |
| Nouvelle étude majeure (PubMed) | Trimestriel     | Veille PubMed |
| Révision complète d'une fiche   | Annuel          | Planification |

### Outils de veille

- **Google Scholar Alerts** : alertes par nom de plante
- **PubMed RSS** : flux par mot-clé
- **EMA RSS** : nouvelles monographies HMPC
- **ANSES newsletter** : avis compléments alimentaires
- **EFSA Journal** : nouvelles évaluations d'allégations

---

## 5. Qualité et traçabilité

### Chaque fiche doit avoir

- [ ] Au moins 1 source institutionnelle (EMA, OMS, ou pharmacopée)
- [ ] Niveau de preuve attribué (A/B/C) avec justification
- [ ] Interactions médicamenteuses vérifiées (même si "aucune connue")
- [ ] Statut réglementaire vérifié (liste 148, liste 540, EFSA)
- [ ] Formulations conformes (pas d'allégation thérapeutique)
- [ ] Date de dernière mise à jour
- [ ] Nom du rédacteur / validateur (interne)

### Ce qu'on peut afficher publiquement

- "Sources : EMA/HMPC, PubMed" → crédibilité
- "Dernière mise à jour : mars 2026" → fraîcheur
- "Niveau de preuve : A" → confiance
- NE PAS afficher "validé par le comité scientifique" tant qu'il n'y en a pas formellement un

---

## 6. Estimation de l'effort

| Tâche                            | Temps estimé | Pour le MVP (15 produits) |
| -------------------------------- | ------------ | ------------------------- |
| Recherche + collecte par produit | 2-4h         | 30-60h                    |
| Rédaction fiche JSON             | 1-2h         | 15-30h                    |
| Validation/relecture             | 30min-1h     | 8-15h                     |
| **Total par produit**            | **3.5-7h**   | —                         |
| **Total MVP (15 produits)**      | —            | **~53-105h**              |

C'est un investissement significatif, mais c'est **LE** différenciateur de Tradimedika.
Une BDD mal sourcée ne vaut rien pour un pro.
