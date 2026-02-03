# 🌱 TRADIMEDIKA - Pierre MAZELAYGUE

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-38B2AC?style=for-the-badge&logo=react&logoColor=38B2AC)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-61DAFB?style=for-the-badge&logo=tailwind-css&logoColor=61DAFB)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-BE185D?style=for-the-badge&logo=framer&logoColor=BE185D)](https://motion.dev/)
[![React Icons](https://img.shields.io/badge/React%20Icons-5.5.0-FF0000?style=for-the-badge&logo=react&logoColor=red)](https://react-icons.github.io/react-icons/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-FFD700?style=for-the-badge&logo=vite&logoColor=yellow)](https://vite.dev/)

[![CI](https://github.com/PierreMaze/tradimedika/actions/workflows/ci.yml/badge.svg)](https://github.com/PierreMaze/tradimedika/actions/workflows/ci.yml)
[![Deploy](https://github.com/PierreMaze/tradimedika/actions/workflows/deploy.yml/badge.svg)](https://github.com/PierreMaze/tradimedika/actions/workflows/deploy.yml)

**Un Site web moderne et performant développé avec React, TailwindCSS et Framer Motion**

[🌐 **Voir le site**](https://tradimedika.com/) • [🐛 **Signaler un bug**](https://tally.so/r/3x0O8o) • [💬 **Discuter**](https://www.linkedin.com/in/pierremazelaygue/)

[![TRADIMEDIKA](<https://img.shields.io/badge/TRADIMEDIKA-Bêta(0.51.0)-1a1a1a?style=for-the-badge&logo=leaflet&logoColor=00bd7e>)](https://tradimedika.com/)

</div>

---

## 📋 Table des matières

- [🎯 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack technique](#️-stack-technique)
- [🎨 Design System](#-design-system)
- [⚡ Performance](#-performance)
- [📞 Contact](#-contact)

---

## 🎯 À propos

#### Ce site propose un traitement naturel pour soulager les symptômes immédiatement, grâce à des aliments du quotidien, le tout dans une interface élégante et performante.

### ⚠️ Disclaimer ⚠️

> _Ce site ne remplace pas la médecine traditionnelle, mais plutôt une alternative à l'instant "T". Prenez rendez-vous avec un médecin ou appelez les urgences : ce sont les personnes les plus compétentes pour vous assister. Merci de votre compréhension._

**Disclaimer visible sur toutes les pages** : Un bandeau d'avertissement médical est affiché en haut de chaque page pour rappeler que les informations sont fournies à titre informatif uniquement.

### 🎨 Caractéristiques principales

- **Design moderne** : Interface épurée avec animations fluides
- **Responsive** : Compatible mobile, tablette et desktop
- **Performance** : Score Lighthouse - **_(92/100)_**
- **Bonnes pratiques** : Compatible mobile, tablette et desktop - Score Lighthouse - **_(94/100)_**
- **Accessibilité** : Conforme aux standards WCAG 2.1 AA - Score Lighthouse - **_(100/100)_**
- **SEO optimisé** : Meta tags et structure sémantique - Score Lighthouse - **_(100/100)_**

### 📚 Documentation

- [Architecture](./ARCHITECTURE.md)
- [Historique des versions](./CHANGELOG.md)

---

## ✨ Fonctionnalités

### 🏠 Page d'accueil

- **Hero section** avec champs de texte pour la saisie des symptômes.

### 🔍 Filtrage Intelligent des Résultats

- **Affichage adaptatif** : Lorsque plusieurs symptômes uniques sont trouvés dans les remèdes, un système de filtrage apparaît automatiquement pour affiner les résultats.
- **Interface épurée** : Si un seul symptôme correspond, le filtre est masqué pour simplifier l'interface.

### 📱 Responsive Design

- **Mobile-first** Version mobile priorisé
- **Breakpoints** optimisés pour tous les écrans
- **Touch-friendly** interface

### 📱 UX Mobile Optimisée

- **Scroll automatique** : Quand vous cliquez sur l'input de saisie des symptômes, l'interface remonte automatiquement pour rester visible malgré le clavier virtuel
- **Tags toujours visibles** : Les symptômes déjà sélectionnés restent accessibles pendant la saisie
- **Détection intelligente** : Fonctionne uniquement sur mobile (< 1024px), pas d'impact sur desktop
- **Accessibilité** : Respect de la préférence utilisateur `prefers-reduced-motion`

### ⚠️ Avertissement Médical

- **Bandeau d'information** : Disclaimer visible sur toutes les pages rappelant le caractère informatif du contenu
- **Couleur Emerald** : Design élégant avec emerald foncé (light mode) et emerald clair (dark mode)
- **Accessibilité** : Role "alert" et aria-live pour les lecteurs d'écran
- **Dark mode** : Adapté automatiquement au thème de l'utilisateur

### ⚙️ Paramètres Utilisateur

- **Modal de configuration** : Bouton engrenage dans le header pour accéder aux paramètres
- **Mode Sombre** : Toggle pour activer/désactiver le dark mode (persisté dans localStorage)
- **Mode Performance** : Toggle Économie/Élevée pour contrôler les animations d'arrière-plan
  - **Économie** : Désactive l'animation LeafFall pour améliorer les performances sur appareils bas de gamme
  - **Élevée** : Active toutes les animations (par défaut)
- **Persistence** : Les préférences sont sauvegardées localement et restaurées automatiquement
- **Accessibilité** : Modal avec focus trap, fermeture par Escape, et respect de `prefers-reduced-motion`

### 🛡️ Gestion des Allergies

- **Sélecteur d'allergies** : Recherche intelligente avec autocomplétion pour sélectionner vos allergies
- **Filtrage automatique** : Les remèdes dangereux sont masqués automatiquement selon vos allergies
- **Base de données enrichie** : 5 allergènes référencés avec leurs remèdes associés
  - Agrumes, Pollen, Astéracées, Pollen d'olivier, Venin d'abeille
- **Bannière d'information** : Affichage du nombre de remèdes masqués avec bouton toggle intégré
- **Affichage contrôlé** : Les remèdes avec allergènes peuvent être affichés temporairement en premier (visuellement distincts)
- **UX optimisée** : Cartes allergènes en grayscale avec tags colorés au hover pour identification rapide
- **Persistance intelligente** : Allergies sauvegardées, affichage des allergènes toujours masqué par défaut

### 📜 Historique de Recherche

- **Sauvegarde automatique** : Les 10 dernières recherches sont conservées localement
- **Remèdes masqués affichés** : Le nombre de remèdes filtrés par allergies est affiché en jaune
  - Format : "3 résultats • 2 remèdes masqués • il y a 5 min"
- **Réutilisation rapide** : Cliquez sur une recherche pour la relancer instantanément
- **Déduplication intelligente** : Pas de doublons, insensible à l'ordre des symptômes
- **Gestion flexible** : Suppression individuelle ou effacement complet de l'historique

### 💬 Feedback Utilisateur

- **Section dédiée** : Lien de feedback affiché en bas des pages de résultats
- **Message personnalisé** : Invitation claire à signaler des bugs ou donner son avis
- **Formulaire Tally** : Intégration d'un formulaire externe pour collecter les retours
- **Design cohérent** : Boîte émeraude avec bordure pointillée, icône Material Design
- **Accessibilité complète** : Ouverture sécurisée dans une nouvelle fenêtre

---

## 🛠️ Stack technique

### 🎨 Frontend

- **React 19.2.0** - Bibliothèque UI moderne
- **React Router DOM 7.9.4** - Routage côté client
- **TailwindCSS 3.4.3** - Framework CSS utility-first
- **Framer Motion 12.23.22** - Animations et transitions
- **React Icons 5.5.0** - Icônes vectorielles

### 🔧 Outils de développement

- **Vite 6.3.6** - Build tool ultra-rapide
- **ESLint** - Linting et qualité du code

### 🚀 Déploiement

- **Netlify** - Hébergement et déploiement continu
- **Lighthouse** - Audit de performance automatique

---

## 🎨 Design System

### 🎨 Palette de couleurs

- ![#f1f0f1](https://placehold.co/15x15/f1f0f1/f1f0f1.png) **Light** : Blanc moderne (#f1f0f1)
- ![#23272d](https://placehold.co/15x15/23272d/23272d.png) **Dark** : Noir élégant (#23272d)
- ![#60bd97](https://placehold.co/15x15/60bd97/60bd97.png) **Accent** : Vert émeraude (#60bd97)

### 📝 Typographie

- **Police** : [Poppins (sans-serif)](https://fonts.google.com/specimen/Poppins)

### 🎭 Animations

- **Transitions** fluides avec Framer Motion
- **Scroll animations** pour la narration
- **Loading states** pour l'expérience utilisateur

---

## ⚡ Performance

### 📊 Métriques actuelles

- **Lighthouse Score** : - (à venir)
- **First Contentful Paint** : - (à venir)
- **Largest Contentful Paint** : - (à venir)
- **Cumulative Layout Shift** : - (à venir)
- **Time to Interactive** : - (à venir)

### 🚀 Optimisations implémentées

- **Code splitting** avec Vite
- **Lazy loading** des images
- **Minification** JavaScript/CSS
- **Compression** des assets
- **Cache** optimisé

---

## 📞 Contact

**Pierre MAZELAYGUE** - Développeur Full Stack

- 📧 **Email** : [promazelaygue@gmail.com](mailto:promazelaygue@gmail.com)
- 💼 **LinkedIn** : [linkedin.com/in/pierre-mazelaygue](https://linkedin.com/in/pierre-mazelaygue)
- 🐙 **GitHub** : [github.com/PierreMaze](https://github.com/PierreMaze)

---

<div align="center">

**⭐ N'hésitez pas à laisser une étoile si ce projet vous plaît !**

</div>
