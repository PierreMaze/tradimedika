# Conventions de création de PR — TRADIMEDIKA

## Sommaire

1. [Titre de PR](#titre-de-pr)
2. [Checklist PR](#checklist-pr)
3. [Protections et bonnes pratiques](#protections-et-bonnes-pratiques)

---

## Titre de PR

* Format recommandé : `[#ISSUE] type(scope): courte description`
* Exemples :

  * `[#321] feat(client): add user consent checkbox`
  * `[#123] fix(server): correct API endpoint validation`
* Objectif : clair, précis et lié à un ticket/issue si nécessaire

---

## Checklist PR

* Branche nommée selon la convention définie dans `CONVENTION_BRANCH.md`
* Commits atomiques et messages clairs
* Tests ajoutés / mis à jour si nécessaire _(à venir)_
* Documentation mise à jour si pertinent
* CI verte et tests automatiques passés _(optionnel)_
* Reviewer(s) assigné(s)
* Lien vers issue ou ticket (si existant)

---

## Protections et bonnes pratiques

* `main` : PR obligatoire, CI verte, reviews requises
* `release/*` : protéger la branche si nécessaire
* Supprimer la branche distante après merge
* Crée une nouvelle branche depuis `dev` pour éviter conflits
* Mettre à jour le CHANGELOG.md si besoin après merge

---

## Exemple de commande pour créer la PR

```bash
git checkout dev
git pull origin dev
git checkout -b feature/client/form/patient-symptom
git push -u origin feature/client/form/patient-symptom
```
> Créer la PR sur GitHub en utilisant le titre : [#321] feature(client): add user consent checkbox


---
