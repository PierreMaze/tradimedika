# Considérations Réglementaires — Documentation complète

## Principe fondamental

**Tradimedika est un outil d'INFORMATION et de DOCUMENTATION.**
Il ne prescrit rien. Il ne diagnostique rien. Il ne remplace pas un professionnel.

---

## 1. Vocabulaire : ce qu'on peut dire et NE PAS dire

### Formulations INTERDITES (allégations thérapeutiques)

| Interdit                                      | Pourquoi                                        |
| --------------------------------------------- | ----------------------------------------------- |
| "Le gingembre **guérit** les nausées"         | Allégation thérapeutique = médicament           |
| "Le curcuma **soigne** l'arthrite"            | Claim thérapeutique interdit                    |
| "**Traite** les troubles digestifs"           | Vocabulaire de prescription                     |
| "**Prévient** le cancer"                      | Allégation de réduction de risque non autorisée |
| "Perdez 3 kilos en 10 jours avec..."          | Référence au rythme de perte de poids           |
| "Recommandé par le Dr X"                      | Référence à un professionnel spécifique         |
| "Votre alimentation ne suffit pas, prenez..." | Dénigre l'alimentation équilibrée               |

### Formulations AUTORISÉES

| Autorisé                                                     | Type                                      |
| ------------------------------------------------------------ | ----------------------------------------- |
| "Traditionnellement utilisé pour le confort digestif"        | Usage traditionnel                        |
| "Des études observent un effet potentiel sur l'inflammation" | Référence scientifique prudente           |
| "Contribue au fonctionnement normal du système immunitaire"  | Allégation EFSA autorisée (si elle l'est) |
| "Reconnu pour ses propriétés aromatiques"                    | Propriété non thérapeutique               |
| "La recherche indique que..."                                | Formulation neutre et sourcée             |

### Règle d'or

> Si la phrase peut être comprise comme "ce produit soigne/guérit une maladie", elle est **INTERDITE**.

---

## 2. Règlement CE 1924/2006 — Allégations de santé

### Ce que dit la loi

Toute allégation de santé sur un aliment/complément doit être :

- **Autorisée** par l'EFSA et inscrite au registre UE
- **Scientifiquement prouvée**
- **Non trompeuse**

### Registre UE des allégations

- Source officielle : [EU Register of Health Claims](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/nutrition-and-health-claims/eu-register-health-claims_en)
- **Plus de 70% des allégations soumises ont été REJETÉES** par manque de preuves
- **2 078 allégations plantes en attente** depuis 2012 — statut "toléré" mais pas autorisé

### Pour Tradimedika

- **Citer uniquement les allégations autorisées** pour les nutriments/vitamines
- Pour les plantes : utiliser la formulation "traditionnellement utilisé pour..."
- **Toujours préciser le statut EFSA** dans la fiche produit (autorisée / en attente / rejetée)
- Ne jamais présenter une allégation "en attente" comme si elle était autorisée

---

## 3. Plantes médicinales en France

### Liste des 148 plantes en vente libre

- **Article D4211-11** du Code de la santé publique
- 148 plantes peuvent être vendues hors pharmacie
- **Attention** : seules certaines PARTIES de la plante sont autorisées (ex: feuilles oui, racines non)
- [Source : Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019377852)

### Liste des 540 plantes autorisées en compléments alimentaires

- **Arrêté du 24 juin 2014** (liste Belfrit — France, Belgique, Italie)
- Pour chaque plante : parties utilisables, doses max, précautions d'emploi
- [Source : Légifrance](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029254516)

### Pour Tradimedika

- Vérifier pour chaque produit s'il est sur la liste 148 et/ou la liste 540
- Indiquer dans la fiche le **statut réglementaire**
- Respecter les **parties de plante** autorisées
- Mentionner les **précautions d'emploi** officielles (obligatoires)

---

## 4. Statut juridique de la plateforme

### Bonne nouvelle : Tradimedika n'est PAS un dispositif médical

Critères qui nous protègent :

- Nous fournissons de l'**information documentaire**, pas de diagnostic
- Nous ne traitons **pas de données patient**
- Nous ne proposons **pas de prescription**
- Nous nous adressons à des **professionnels qualifiés**

### Pas de certification obligatoire

- La certification HON/HAS des sites santé **n'existe plus** (abandonnée en 2013)
- Aucune certification obligatoire en 2026 pour les sites d'info santé
- Mais : disclaimer obligatoire + bonnes pratiques recommandées

### Nouveau : Décret 2026-153 (3 mars 2026)

- Nouveau régime de sanctions pour les **services numériques en santé**
- Sanctions jusqu'à **1% du CA** par l'Agence du Numérique en Santé (ANS)
- **Tradimedika devrait être épargné** si on reste documentaire (pas un service de soin)
- À surveiller : la qualification de "service numérique en santé" pourrait évoluer

---

## 5. RGPD — Sans données patient

### Ce qu'on collecte (B2B)

| Donnée                            | Base légale                         | Durée conservation            |
| --------------------------------- | ----------------------------------- | ----------------------------- |
| Nom, prénom du pro                | Contrat                             | Durée de l'abonnement + 3 ans |
| Email                             | Contrat + Consentement (newsletter) | Idem                          |
| N° RPPS/ADELI                     | Contrat (vérification statut)       | Idem                          |
| Données d'usage (recherches, PDF) | Intérêt légitime                    | 13 mois max                   |
| Cookies                           | Consentement                        | Selon type                    |

### Ce qu'on NE collecte PAS

- Aucune donnée patient
- Aucune donnée de santé au sens du RGPD
- → **Pas besoin d'hébergement HDS**
- → RGPD standard suffit

### Obligations concrètes

1. **HTTPS** sur tout le site
2. **Cookie banner** conforme (consentement avant dépôt)
3. **Politique de confidentialité** accessible
4. **Registre des traitements** (document interne, art. 30 RGPD)
5. **Procédure de violation** (notification CNIL sous 72h si breach)
6. **Droits des utilisateurs** : accès, rectification, suppression, portabilité
7. **Chiffrement des mots de passe** (bcrypt ou Argon2)
8. **Hébergement UE** recommandé (simplifie la conformité)

---

## 6. Disclaimers obligatoires

### Sur chaque fiche produit

> "Les informations présentées sont fournies à titre informatif et documentaire.
> Elles ne constituent pas un avis médical, un diagnostic ou une prescription.
> Consultez un professionnel de santé avant toute utilisation."

### Sur chaque export PDF

> "Ce document est une fiche d'information sur un produit naturel.
> Il ne constitue pas un avis médical ni une prescription.
> Les produits naturels peuvent présenter des interactions avec des médicaments.
> Consultez votre médecin ou pharmacien."

### Dans les mentions légales

> "Tradimedika est une plateforme d'information documentaire sur les produits naturels.
> Elle ne constitue pas un dispositif médical au sens du règlement (UE) 2017/745.
> Les allégations de santé mentionnées sont fournies à titre d'information et
> peuvent être en attente de validation par l'EFSA.
> Tradimedika ne saurait être tenu responsable de l'utilisation faite des
> informations par les professionnels ou leurs patients."

---

## 7. Checklist réglementaire

### Priorité immédiate

- [ ] Rédiger les mentions légales complètes (éditeur, hébergeur, directeur de publication)
- [ ] Rédiger la politique de confidentialité RGPD
- [ ] Ajouter le disclaimer sur chaque fiche produit
- [ ] Auditer tous les textes existants → supprimer tout vocabulaire thérapeutique
- [ ] Vérifier le statut réglementaire des 15 premiers produits (liste 148, liste 540, EFSA)

### Avant lancement B2B

- [ ] Rédiger les CGU (Conditions Générales d'Utilisation)
- [ ] Rédiger les CGV si abonnement payant
- [ ] Mettre en place le cookie banner conforme
- [ ] Registre des traitements RGPD (interne)
- [ ] Procédure de gestion des droits utilisateurs
- [ ] Consulter un avocat spécialisé en droit de la santé numérique

### En continu

- [ ] Veille réglementaire EFSA (nouvelles allégations autorisées/rejetées)
- [ ] Veille DGCCRF (contrôles, sanctions, guidelines)
- [ ] Mise à jour des fiches produits si changement réglementaire
- [ ] Validation par un professionnel de santé (pharmacien idéalement)

---

## 8. Sources réglementaires officielles

| Source                        | Lien                                                                                                                                                               | Contenu                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| Règlement CE 1924/2006        | [EUR-Lex](https://op.europa.eu/fr/publication-detail/-/publication/b684f521-ac6f-4519-b443-c2bea8191a27)                                                           | Allégations de santé                |
| Registre UE allégations       | [Commission européenne](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/nutrition-and-health-claims/eu-register-health-claims_en)                    | Allégations autorisées/rejetées     |
| Liste 148 plantes             | [Légifrance D4211-11](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019377852)                                                                        | Plantes en vente libre              |
| Liste 540 plantes compléments | [Légifrance arrêté 2014](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029254516)                                                                              | Plantes en compléments alimentaires |
| Décret 2006-352               | [Légifrance](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000638341)                                                                                          | Compléments alimentaires            |
| DGCCRF allégations            | [economie.gouv.fr](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/allegations-nutritionnelles-et-de-sante-ne-vous-faites-pas-avoir)                      | Guide pratique                      |
| CNIL santé                    | [cnil.fr](https://www.cnil.fr/fr/le-rgpd-applique-au-secteur-de-la-sante)                                                                                          | RGPD secteur santé                  |
| Décret 2026-153               | [vigier-avocats.com](https://www.vigier-avocats.com/decret-2026-153-du-3-mars-2026-nouveau-regime-de-sanctions-financieres-pour-les-services-numeriques-en-sante/) | Sanctions services numériques santé |
