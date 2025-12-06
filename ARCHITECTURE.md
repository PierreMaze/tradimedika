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
├── hooks/              # Hooks personnalisés (useDarkMode, useLocalStorage, useMediaQuery, useSymptomTags)
└── layout/             # Layout et navigation (Header, Footer)
    └── components/     # Composants spécifiques au layout (LogoTradimedika)
```

### 🎯 Principes architecturaux

- **Composants modulaires** et réutilisables organisés par fonction
- **Séparation des responsabilités** claire entre UI, logique, et données
- **Hooks personnalisés** pour la logique métier réutilisable
- **Context API** pour la gestion d'état global (dark mode avec optimisation des re-renders)
- **CSS-first theming** : Tailwind CSS v4 `dark:` variants pour les styles, Context pour la logique
- **Performance optimisée** : memoization avec `useMemo` et `useCallback`, réduction des re-renders
- **Données statiques** externalisées pour maintenabilité (symptoms, synonyms, remedies)
