# Change Log

---

## [0.1.4] - 2025-12-01

### <u>fix:</u>

- Corrige le comportement du thème sombre sur les composants `Layout` et `Sidebar`
- Répare l’overflow horizontal du layout sur mobile
- Ajuste le spacing des sections `Hero` et `Features`
- Corrige l’affichage du bouton CTA principal en mode sombre
- Corrige la mauvaise valeur d’import `accent-light` dans `tailwind.config.js`

### <u>update:</u>

- Uniformise les classes Tailwind `bg-light dark:bg-dark` sur les sections
- Harmonise la hiérarchie des tailles de titres (h1–h4) pour cohérence UI
- Améliore le contraste général des textes : `text-dark` et `dark:text-light`
- Simplifie la palette de couleurs : retrait des variables accent custom
- Optimise la structure dans `index.html` (balises meta + link + ordre CSS)
- Ajustements mineurs d’UX sur les labels et les états hover

---

## [0.1.3] - 2025-11-28

### <u>fix:</u>

- Correct vertical content alignment in layout components
- Add explicit height to `header` to ensure consistent centering
- Fix y-axis spacing in `footer`
- Correct label background in `Hero` section for dark mode
- Apply `bg-light dark:bg-dark` fallback to ensure proper contrast
- Improve text visibility with `text-dark` and `dark:text-light`

### <u>update:</u>

- Replace custom `accent` color variable with Tailwind `emerald`
- Improve UI/UX consistency across layout
- Update balise`<link>` in file `index.hmtl`
- Ensure dark mode hierarchy is respected in theme switching
- Minor UX improvements in Hero labels

---

## [0.1.2] - 2025-11-28

### <u>fix:</u>

- Fixed leaf opacity starting at wrong value - now correctly capped at 0.7 maximum for better visibility
- Fixed leaves falling straight down - now all leaves move continuously left-right throughout their fall with varied phase offsets

### <u>bug:</u>

- Bug not fix where `LeafFall.jsx` does not appear in the background when dark mode is enabled, especially for the main input field.

---

## [0.1.1] - 2025-11-28

### <u>feat:</u>

- Added `LeafFall.jsx` component to render animated falling leaves in the background
- Dark/light mode support via ThemeContext
- Smooth, infinite animation using Framer Motion with randomized offsets, rotations, and scales
- Component is non-intrusive and fully reusable

### <u>bug:</u>

- Bug fix where `LeafFall.jsx` does not appear in the background when dark mode is enabled, especially for the main input field.
- `LeafFall` display returns to correct immediately after the light theme change, without requiring a second activation.
- `LeafFall` flashes when it disappears to the bottom of the screen.

---

## [0.1.0] - 2025-11-28

### <u>Added :</u>

- Ajout du fichier `CHANGELOG.md` dans `docs/` décrivant les mises à jour du projet
- Mise en place du fichier `CONVENTION_BRANCH.md` détaillant conventions de branches, modèles de PR et guidelines de contribution
- Ajout du fichier `CONVENTION_PR.md` pour standardiser la création de pull requests
- Documentation initiale `README.md`

### <u>Configured :</u>

- Standardisation du format du Changelog pour les futures releases
- Mise à jour du README avec sections Installation, Utilisation et Liens vers la documentation

### <u>Resolved :</u>

- Clarification sur l’organisation de la documentation suite à l’issue #6
- Alignement du workflow Git sur la convention de branches fixée (feature, fix, hotfix, docs, refactor)

---
