# 🌱 TRADIMEDIKA - Pierre MAZELAYGUE

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-38B2AC?style=for-the-badge&logo=react&logoColor=38B2AC)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.3-61DAFB?style=for-the-badge&logo=tailwind-css&logoColor=61DAFB)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.22-BE185D?style=for-the-badge&logo=framer&logoColor=BE185D)](https://motion.dev/)
[![React Icons](https://img.shields.io/badge/React%20Icons-5.5.0-FF0000?style=for-the-badge&logo=react&logoColor=red)](https://react-icons.github.io/react-icons/)
[![Vite](https://img.shields.io/badge/Vite-6.3.6-FFD700?style=for-the-badge&logo=vite&logoColor=yellow)](https://vite.dev/)

**Un Site web moderne et performant développé avec React, TailwindCSS et Framer Motion**

[🌐 **Voir le site**](https://tradimedika.netlify.app/) • [🐛 **Signaler un bug**](https://github.com/PierreMaze/) • [💬 **Discuter**](https://www.linkedin.com/in/pierremazelaygue/)

</div>

---

## 📋 Table des matières

- [🎯 À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack technique](#️-stack-technique)
- [🚀 Installation](#-installation)
- [🏗️ Architecture](#️-architecture)
- [🎨 Design System](#-design-system)
- [⚡ Performance](#-performance)
- [📚 Scripts disponibles](#-scripts-disponibles)
- [📞 Contact](#-contact)

---

## 🎯 À propos

#### Ce site propose un traitement naturel pour soulager les symptômes immédiatement, grâce à des aliments du quotidien, le tout dans une interface élégante et performante.

>_Il ne remplace pas un professionnel de santé. Consultez un médecin ou appelez les urgences : ce sont les personnes compétentes pour vous aider._

### 🎨 Caractéristiques principales

- **Design moderne** : Interface épurée avec animations fluides
- **Performance optimisée** : Score Lighthouse - (à venir)
- **Responsive** : Compatible mobile, tablette et desktop
- **Accessibilité** : Conforme aux standards WCAG 2.1 AA (à venir)
- **SEO optimisé** : Meta tags et structure sémantique (à venir)

---

## ✨ Fonctionnalités

### 🏠 Page d'accueil

- **Hero section** avec champs de texte pour la saisie des symptômes.

### 📱 Responsive Design

- **Mobile-first** Version mobile priorisé
- **Breakpoints** optimisés pour tous les écrans
- **Touch-friendly** interface

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

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommandé) ou npm

### 1. Cloner le repository

```bash
git clone https://github.com/PierreMaze/tradimedika.git
cd tradimedika
```

### 2. Installer les dépendances

```bash
# Avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install
```

### 3. Lancer le serveur de développement

```bash
# Avec pnpm
pnpm dev

# Ou avec npm
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### 4. Build de production

```bash
# Avec pnpm
pnpm build

# Ou avec npm
npm run build
```

---

## 🏗️ Architecture

```
src/
├── components/         # Composants réutilisables
│   └── ui/             # Composants UI de base
├── constants/          # Constantes
├── contexts/           # Contextes React
├── data/               # Données statiques
├── hooks/              # Hooks personnalisés
├── layout/             # Layout et navigation
├── pages/              # Pages de l'application
└── utils/              # Utilitaires
```

### 🎯 Principes architecturaux

- **Composants modulaires** et réutilisables
- **Séparation des responsabilités** claire
- **Hooks personnalisés** pour la logique métier
- **Contextes** pour la gestion d'état global
- **Utilitaires** pour les fonctions communes

---

## 🎨 Design System

### 🎨 Palette de couleurs

-  ![#f1f0f1](https://placehold.co/15x15/f1f0f1/f1f0f1.png) **Light** : Blanc moderne (#f1f0f1)
-  ![#23272d](https://placehold.co/15x15/23272d/23272d.png) **Dark** : Noir élégant (#23272d)
-  ![#60bd97](https://placehold.co/15x15/60bd97/60bd97.png) **Accent** : Vert émeraude (#60bd97)

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

## 📚 Scripts disponibles

```bash
# Développement
pnpm dev              # Lance le serveur de développement
pnpm build            # Build de production
pnpm preview          # Prévisualise le build

# Qualité du code
pnpm lint             # Vérification ESLint
pnpm fix              # Correction automatique Prettier

# Maintenance
pnpm clean            # Nettoyage des dépendances
pnpm reset            # Reset complet du projet
pnpm preload          # Installation + démarrage rapide
```

---

## 📞 Contact

**Pierre MAZELAYGUE** - Développeur Full Stack

- 🌐 **Portfolio** : [https://pixel-stone.netlify.app/](https://pixel-stone.netlify.app/)
- 📧 **Email** : [promazelaygue@gmail.com](mailto:promazelaygue@gmail.com)
- 💼 **LinkedIn** : [linkedin.com/in/pierre-mazelaygue](https://linkedin.com/in/pierre-mazelaygue)
- 🐙 **GitHub** : [github.com/PierreMaze](https://github.com/PierreMaze)

---

<div align="center">

**⭐ N'hésitez pas à laisser une étoile si ce projet vous plaît !**

</div>
