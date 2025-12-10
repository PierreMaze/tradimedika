## 🏗️ Architecture

```
src/
├── assets/             # Images, fonts, et ressources statiques
├── components/         # Composants réutilisables
│   ├── btn/            # Composants boutons (DarkModeToggle, etc.)
│   ├── input/          # Composants d'entrée (SymptomsSelector, etc.)
│   ├── sections/       # Sections de page (Hero, etc.)
│   └── tag/            # Composants tags et badges (SymptomTag, ListSymptomTag)
├── context/            # Contextes React (ThemeContext)
├── data/               # Données statiques (db.json, symptomList.json, synonymsSymptomList.json)
├── hooks/              # Hooks personnalisés (useDarkMode, useLocalStorage, useMediaQuery, useSymptomTags, useSymptomSubmit)
├── layout/             # Layout et navigation (Header, Footer, LayoutApp, LayoutRemedyResult)
│   └── components/     # Composants spécifiques au layout (LogoTradimedika)
├── pages/              # Pages de l'application (Home, RemedyResult, RemedyResultDetails, NotFound)
├── routes/             # Configuration du routage React Router (Router.jsx)
└── utils/              # Fonctions utilitaires (normalizeSymptom, remedyMatcher)
```
