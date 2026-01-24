# Configuration Google Analytics 4

Ce guide explique comment configurer Google Analytics 4 pour Tradimedika.

## Étape 1 : Créer un compte Google Analytics

1. Rendez-vous sur [Google Analytics](https://analytics.google.com/)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Commencer à mesurer"** (ou "Start measuring")

## Étape 2 : Configurer votre propriété

1. **Nom du compte** : Entrez un nom (ex: "Tradimedika")
2. **Nom de la propriété** : Entrez "Tradimedika Website"
3. **Fuseau horaire** : Sélectionnez votre fuseau horaire
4. **Devise** : Sélectionnez EUR (€)
5. Cliquez sur **"Suivant"**

## Étape 3 : Configurer le flux de données

1. Sélectionnez **"Web"** comme plateforme
2. **URL du site web** : `https://pierremaze.github.io`
3. **Nom du flux** : "Tradimedika Production"
4. Cliquez sur **"Créer un flux"**

## Étape 4 : Récupérer l'ID de mesure

Une fois le flux créé, vous verrez votre **ID de mesure** au format :

```
G-XXXXXXXXXX
```

**C'est cet ID qu'il faut copier !**

## Étape 5 : Configurer le projet

### En local (développement)

1. Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

2. Ouvrez le fichier `.env` et ajoutez votre ID :

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Redémarrez le serveur de développement :

```bash
pnpm dev
```

### En production (GitHub Pages)

1. Allez dans les **Settings** de votre repository GitHub
2. Dans le menu de gauche, cliquez sur **"Secrets and variables"** > **"Actions"**
3. Cliquez sur le bouton vert **"New repository secret"**
4. Créez un secret avec :
   - **Name** : `VITE_GA_MEASUREMENT_ID`
   - **Value** : `G-XXXXXXXXXX` (collez votre ID de mesure)
5. Cliquez sur **"Add secret"**

6. **C'est tout !** Le workflow `.github/workflows/deploy.yml` est déjà configuré pour utiliser ce secret :

```yaml
- name: Build application
  run: pnpm build
  env:
    VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
```

7. Pour activer Google Analytics en production :
   - Commitez et pushez vos changements sur la branche `main`
   - Le workflow GitHub Actions se déclenchera automatiquement
   - Google Analytics sera actif une fois le déploiement terminé

**Note** : Si vous avez déjà des commits à push, le déploiement se fera automatiquement. Sinon, vous pouvez déclencher manuellement le workflow depuis l'onglet **"Actions"** de votre repository GitHub.

## Étape 6 : Vérifier que ça fonctionne

1. Ouvrez votre site (local ou production)
2. Ouvrez les **outils de développement** du navigateur (F12)
3. Allez dans l'onglet **Console**
4. Vous devriez voir :

   ```
   Google Analytics 4 initialisé avec ID: G-XXXXXXXXXX
   ```

5. Dans Google Analytics, allez dans **"Rapports"** > **"Temps réel"**
6. Naviguez sur votre site, vous devriez voir votre visite en temps réel !

## Événements trackés

Le projet Tradimedika suit automatiquement ces événements :

### Événements de page

- `pageview` : Chaque changement de page

### Événements utilisateur

- `symptom_selected` : Sélection d'un symptôme
  - `symptom` : Nom du symptôme
  - `total_symptoms` : Nombre total de symptômes sélectionnés

- `symptom_search` : Recherche de remèdes par symptômes
  - `symptom_count` : Nombre de symptômes recherchés
  - `symptoms` : Liste des symptômes
  - `results_count` : Nombre de résultats
  - `has_allergies` : Si des allergies sont déclarées
  - `allergies_count` : Nombre d'allergies
  - `filtered_count` : Nombre de résultats filtrés

- `remedy_filter_applied` : Application de filtres
  - `filter_count` : Nombre de filtres actifs
  - `pregnancy` : Filtres grossesse appliqués
  - `verification` : Filtres vérification appliqués
  - `childrenAge` : Filtres âge enfants appliqués

- `remedy_click` : Clic sur un remède
  - `remedy_name` : Nom du remède
  - `remedy_type` : Type de remède
  - `remedy_id` : ID du remède
  - `is_verified` : Si vérifié par un professionnel
  - `pregnancy_safe` : Sécurité grossesse
  - `has_allergens` : Si contient des allergènes
  - `from_symptoms` : Symptômes ayant mené au remède

## Consulter les statistiques

Dans Google Analytics, vous pourrez voir :

- **Rapports en temps réel** : Visiteurs actuels
- **Acquisition** : D'où viennent vos visiteurs
- **Engagement** : Pages les plus consultées
- **Événements** : Les événements personnalisés ci-dessus
- **Conversions** : Définir des objectifs (ex: recherches réussies)

### Rapports personnalisés utiles

#### Symptômes les plus recherchés

1. Allez dans **"Rapports"** > **"Engagement"** > **"Événements"**
2. Cliquez sur `symptom_selected`
3. Analysez le paramètre `symptom` pour voir les symptômes populaires

#### Remèdes les plus consultés

1. Allez dans **"Rapports"** > **"Engagement"** > **"Événements"**
2. Cliquez sur `remedy_click`
3. Analysez le paramètre `remedy_name` pour voir les remèdes populaires

#### Taux de conversion recherche → clic

1. Créez un entonnoir avec :
   - Étape 1 : `symptom_search`
   - Étape 2 : `remedy_click`
2. Voyez combien de recherches mènent à un clic sur un remède

## Désactiver Google Analytics

Si vous voulez désactiver temporairement Google Analytics :

1. Supprimez la variable `VITE_GA_MEASUREMENT_ID` de votre `.env`
2. Ou laissez-la vide : `VITE_GA_MEASUREMENT_ID=`

Le code détectera automatiquement l'absence d'ID et n'enverra pas de données.

## Respect de la vie privée

L'implémentation actuelle :

- ✅ Ne collecte **aucune donnée personnelle** (pas d'email, nom, etc.)
- ✅ Utilise les paramètres par défaut de GA4 (anonymisation IP)
- ✅ Respecte les paramètres "Do Not Track" du navigateur (si configuré)
- ✅ Ne suit que des événements liés à l'usage de l'application

### Pour aller plus loin (optionnel)

Si vous voulez être encore plus respectueux de la vie privée :

1. **Ajouter un bandeau de cookies** (ex: avec [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent))
2. **Désactiver le tracking par défaut** et l'activer uniquement si l'utilisateur consent
3. **Utiliser une alternative** comme Plausible ou Umami (voir CLAUDE.md)

## Ressources

- [Documentation officielle GA4](https://support.google.com/analytics/answer/9304153)
- [Guide des événements GA4](https://support.google.com/analytics/answer/9267735)
- [Politique de confidentialité GA4](https://support.google.com/analytics/answer/6004245)
