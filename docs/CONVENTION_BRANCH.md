# Conventions de nommage des branches — TRADIMEDIKA

## 📚 Sommaire

1. [Principe général](#principe-général)
2. [Structure du nom](#structure-du-nom)

   * [Format recommandé](#format-recommandé)
   * [Types de branches](#types-de-branches)
   * [Scope (module / zone)](#scope-module--zone)
   * [Description (kebab-case)](#description-kebab-case)
3. [Règles essentielles](#règles-essentielles)
4. [Exemples](#exemples)

   * [Bonnes pratiques (valide)](#bonnes-pratiques-valide)
   * [Cas à éviter (mauvais)](#cas-à-éviter-mauvais)
5. [Workflow recommandé](#workflow-recommandé)
6. [Commandes Git — Modèles](#commandes-git--modèles)
7. [Validation via Expression Régulière (RegExp)](#validation-via-expression-régulière-regexp)
8. [Automatisation GitHub (optionnel)](#automatisation-github-optionnel)
9. [Durée de vie & bonnes pratiques](#durée-de-vie--bonnes-pratiques)

---

## Principe général

Standardiser les noms de branches pour faciliter la lecture, la revue, l'automatisation (CI/CD) et la génération de changelog.

---

## Structure du nom

### Format recommandé

```
<type>/<scope>/<short-description>
```

* **type** : `feature` | `hotfix` | `refactor` | `docs` | `test` | `chore`
* **scope** : zone/module (`client`, `server`, `api`, `auth`, `dashboard`, `patient`, ...)
* **short-description** : action/objectif en **kebab-case** (lowercase, `-`, pas d'accents ni d'espaces)

> Option : inclure le ticket si vous en avez un. Exemple de patterns (choisir une seule méthode) :
>
> * `type/ISSUE-123/short-desc` → `feature/ISSUE-123/add-login-form`
> * `type/scope/123-short-desc` → `feature/client/123-add-login-form`

### Types de branches

* `feature` : nouvelles fonctionnalités
* `hotfix` : correction critique sur `main`
* `refactor` : refactorisation du code
* `docs` : documentation
* `test` : tests
* `chore` : tâches d’entretien / CI / dépendances

### Scope (module / zone)

* Indique où le changement intervient (ex : `client`, `server`, `api`, `auth`, `dashboard`, `patient`)
* Permet le tri, labels automatiques et pipelines CI

### Description (kebab-case)

* Une seule responsabilité par branche
* Lowercase, séparateur `-`, pas d’accents ni caractères spéciaux

---

## Règles essentielles

* Maximum recommandé : 3 segments (`type/scope/description`)
* Autoriser 4 segments uniquement si nécessaire (`type/scope/subscope/description`)
* Nom explicite et clair
* Supprimer la branche locale et distante après merge

---

## Exemples

### Bonnes pratiques (valide)

```
feature/client/input/user-consent-checkbox
feature/client/form/patient-symptom
feature/server/create/picture-profile
feature/client/dashboard/metrics-widget
feature/client/profile/avatar-upload
hotfix/client/form/validation-error
refactor/client/component-architecture
docs/update/readme
test/client/e2e-login
chore/ci/update-node-version
```

### Cas à éviter (mauvais)

```
feature/add-picture-profile        # scope manquant
feature/server/add-picture-profile # description trop vague
feature/ajout photo profil         # accents + espaces
featAddProfilePicture#1            # mauvais format
```

---

## Commandes Git — Modèles

```bash
git checkout dev
git pull origin dev
git checkout -b feature/client/form/patient-symptom
git push -u origin feature/client/form/patient-symptom
# Supprimer distante après merge
git push origin --delete feature/client/form/patient-symptom
```

---

## Automatisation GitHub (à rajouter)

* Linter de noms de branches via GitHub Actions
* Labels automatiques selon `scope`
* Conventional Commits + génération automatique de changelog

---

## Durée de vie & bonnes pratiques

* `feature/*` : courte durée (< 30 jours), rebase/merge souvent depuis `dev`
* `hotfix/*` : créer depuis `main`, merger sur `main` et `dev`
* Supprimer branches distantes après merge

---
