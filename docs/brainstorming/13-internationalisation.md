# Internationalisation

## Principe : France d'abord, puis expansion progressive

L'internationalisation n'est PAS une priorité du MVP.
Mais il faut y penser dès maintenant pour ne pas se bloquer techniquement.

---

## 1. Marchés cibles par ordre de priorité

### Cercle 1 — Francophonie (même langue, réglementation similaire)

| Marché                  | Population | Pros de santé | Réglementation                       | Priorité         |
| ----------------------- | ---------- | ------------- | ------------------------------------ | ---------------- |
| **France**              | 68M        | ~500K         | CE 1924/2006, DGCCRF                 | Phase 2 (actuel) |
| **Belgique**            | 11.5M      | ~80K          | UE + AFSCA (belgique)                | Phase 3          |
| **Suisse romande**      | 2M         | ~20K          | Swissmedic (hors UE mais compatible) | Phase 3          |
| **Canada (Québec)**     | 8.5M       | ~60K          | Santé Canada / NPN (différent)       | Phase 4          |
| **Afrique francophone** | 400M+      | Variable      | Réglementation locale                | Phase 5          |

### Cercle 2 — Europe (même réglementation UE, autre langue)

| Marché        | Langue    | Réglementation                            | Priorité |
| ------------- | --------- | ----------------------------------------- | -------- |
| **Allemagne** | Allemand  | UE + tradition phyto forte (Commission E) | Phase 4  |
| **Italie**    | Italien   | UE + liste Belfrit (commune avec FR)      | Phase 4  |
| **Espagne**   | Espagnol  | UE + AESAN                                | Phase 4  |
| **Portugal**  | Portugais | UE + Infarmed                             | Phase 5  |

### Cercle 3 — International (autre réglementation)

| Marché     | Réglementation               | Complexité |
| ---------- | ---------------------------- | ---------- |
| **UK**     | Post-Brexit, MHRA            | Moyenne    |
| **USA**    | FDA / DSHEA (très différent) | Élevée     |
| **Brésil** | ANVISA                       | Élevée     |

---

## 2. Ce qu'il faut préparer dès maintenant

### Technique (anti-blocage)

| Aspect      | Action dès le MVP                                        | Pourquoi                        |
| ----------- | -------------------------------------------------------- | ------------------------------- |
| **i18n**    | Utiliser une bibliothèque i18n (react-intl ou i18next)   | Éviter le hardcoding des textes |
| **Données** | Séparer le contenu (JSON) de l'UI                        | Permettre des BDD par pays      |
| **Devises** | Stocker les prix en centimes (Stripe gère multi-devises) | Pas de refonte paiement         |
| **Dates**   | Utiliser des formats ISO (YYYY-MM-DD) en interne         | Pas de problème de format       |
| **URLs**    | Prévoir le préfixe langue (/fr/, /en/)                   | SEO international               |

### Contenu

| Aspect              | Action                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| **Noms de plantes** | Toujours stocker le nom latin (universel)                                |
| **Sources**         | EMA/HMPC et OMS sont déjà internationales                                |
| **Réglementation**  | Prévoir un champ "pays" dans les données réglementaires                  |
| **Traduction**      | Ne PAS traduire les fiches maintenant, mais structurer pour le permettre |

### Juridique

| Aspect          | Action                                                     |
| --------------- | ---------------------------------------------------------- |
| **CGU**         | Rédiger pour la France mais prévoir clause géographique    |
| **RGPD**        | Déjà UE → couvre Belgique, Allemagne, etc.                 |
| **Disclaimers** | Adapter par pays (chaque pays a ses règles sur les claims) |

---

## 3. Différences réglementaires clés par pays

### Belgique

- Même règlement CE 1924/2006
- **Liste Belfrit** commune avec la France (540 plantes)
- Autorité : SPF Santé publique + AFSCA
- → Adaptation minimale (quasi identique à la France)

### Suisse

- **Hors UE** mais la Suisse a ses propres listes (Swissmedic)
- Pharmacopée suisse (Pharmacopoea Helvetica)
- Plus permissif sur certains produits, plus strict sur d'autres
- → Nécessite une BDD spécifique pour les statuts réglementaires

### Canada (Québec)

- **Très différent** : système des NPN (Natural Product Numbers)
- Santé Canada a sa propre base de données (LNHPD)
- Les "produits de santé naturels" ont une réglementation spécifique
- → Nécessite une adaptation importante du contenu

### Allemagne

- Même UE, mais tradition phyto très forte
- **Commission E** : monographies historiques de référence
- Plus de 300 monographies sur les plantes
- Marché de la phytothérapie beaucoup plus développé qu'en France
- → Gros potentiel mais forte concurrence locale

---

## 4. Stratégie d'expansion

### Étape 1 : Belgique (le plus simple)

- Même langue, même réglementation
- Juste ajouter les spécificités AFSCA
- Pas de traduction nécessaire
- Tester l'expansion sans risque

### Étape 2 : Suisse romande

- Même langue
- Adapter les statuts réglementaires (Swissmedic vs EMA)
- Ajouter les produits spécifiques suisses

### Étape 3 : Traduction anglaise

- Ouvrir l'accès UK / international
- Traduire l'interface + les fiches produits
- Adapter les disclaimers par pays
- Pas de monétisation immédiate (tester la demande)

---

## 5. Estimation effort par marché

| Marché          | Effort technique | Effort contenu | Effort juridique | Total         |
| --------------- | ---------------- | -------------- | ---------------- | ------------- |
| Belgique        | Faible           | Très faible    | Faible           | ~2-4 semaines |
| Suisse romande  | Faible           | Moyen (régl.)  | Moyen            | ~1-2 mois     |
| Canada (Québec) | Moyen            | Élevé (NPN)    | Élevé            | ~3-6 mois     |
| Allemagne       | Élevé (i18n)     | Élevé (trad.)  | Moyen            | ~4-6 mois     |
| UK              | Moyen (i18n)     | Élevé (trad.)  | Moyen            | ~3-5 mois     |

---

## 6. Ce qu'on ne fait PAS maintenant

- Pas de traduction
- Pas de multi-devises
- Pas de BDD par pays
- Pas de marketing international

**Mais** : on structure le code et les données pour que ce soit possible plus tard.
C'est la différence entre "on n'y pense pas" et "on prépare le terrain".
