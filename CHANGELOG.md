# Change Log

## [0.1.4] - 2025-12-01

### <u>fix:</u>

- Fix LeafFall visibility in dark mode by adjusting z-index layering in Hero section
- Fixes dark theme behavior on the `Layout` and `Sidebar` components
- Fixes horizontal layout overflow on mobile
- Fixes the display of the main CTA button in dark mode
- Fixes the incorrect `accent-light` import value in `tailwind.config.js`

### <u>refactor:</u>

- Improve LeafFall fade-out animation with smooth, natural easing curve
- Add progressive fade-in at animation start for seamless leaf appearance
- Enhance LeafFall opacity transitions with 3-phase animation (fade-in, stable, fade-out)
- Replace linear fade-out with eased curve for more natural disappearance
- Extend fade-out duration to last 40% of animation cycle for smoother effect

### <u>standardization:</u>

- Standardizes Tailwind classes `bg-light dark:bg-dark` across sections
- Harmonizes heading size hierarchy (h1–h4) for UI consistency
- Improves overall text contrast: `text-dark` and `dark:text-light`
- Simplifies the color palette: removes custom accent variables
- Ensure badge, input field, and interactive elements properly layer above background animation

### <u>optimization:</u>

- Optimizes the structure in `index.html` (meta tags + link + CSS order)
- Adjusts spacing between the `Hero` and `Features` sections

### <u>update:</u>

- Minor UX adjustments to labels and hover states

---

## [0.1.3] - 2025-11-28

### <u>fix:</u>

- Correct vertical content alignment in layout components
- Add explicit height to `header` to ensure consistent centering
- Fix y-axis spacing in `footer`
- Correct label background in `Hero` section for dark mode
- Apply `bg-light dark:bg-dark` fallback to ensure proper contrast

### <u>refactor:</u>

- Replace custom `accent` color variable with Tailwind `emerald`
- Improve text visibility with `text-dark` and `dark:text-light`

### <u>standardization:</u>

- Improve UI/UX consistency across layout
- Ensure dark mode hierarchy is respected in theme switching

### <u>optimization:</u>

- Update balise`<link>` in file `index.hmtl`

### <u>update:</u>

- Minor UX improvements in Hero labels

---

## [0.1.2] - 2025-11-28

### <u>fix:</u>

- Fixed leaf opacity starting at wrong value - now correctly capped at 0.7 maximum for better visibility

### <u>refactor:</u>

- Fixed leaves falling straight down - now all leaves move continuously left-right throughout their fall with varied phase offsets

### <u>bug:</u>

- Bug not fix where `LeafFall.jsx` does not appear in the background when dark mode is enabled, especially for the main input field.

---

## [0.1.1] - 2025-11-28

### <u>add:</u>

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

### <u>add:</u>

- Ajout du fichier `CHANGELOG.md` dans `docs/` décrivant les mises à jour du projet
- Mise en place du fichier `CONVENTION_BRANCH.md` détaillant conventions de branches, modèles de PR et guidelines de contribution
- Ajout du fichier `CONVENTION_PR.md` pour standardiser la création de pull requests
- Documentation initiale `README.md`

### <u>standardization:</u>

- Standardisation du format du Changelog pour les futures releases
- Alignement du workflow Git sur la convention de branches fixée (feature, fix, hotfix, docs, refactor)

### <u>update:</u>

- Mise à jour du README avec sections Installation, Utilisation et Liens vers la documentation

### <u>fix:</u>

- Clarification sur l'organisation de la documentation suite à l'issue #6

---
