# Change Log

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
