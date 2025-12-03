# Change Log

---

## [0.1.6] - 2025-12-03

### <u>add:</u>

- Added `db.json` static database file containing 100+ natural remedies and traditional foods
- Database includes detailed information: names, types, categories, symptoms, uses, contraindications, and properties
- Comprehensive data structure covering herbs, spices, foods, oils, vinegars, beverages, and fermented products
- Each entry includes dosage, frequency, and usage instructions for traditional medicine reference

---

## [0.1.5] - 2025-12-02

### <u>refactor:</u>

- Integrate Framer Motion in Footer component for smooth fade-in animation
- Add synchronized animation timing between Hero and Footer sections
- Restructure Hero.jsx into three logical content groups (Badge+Title+Subtitle, Search+CTA, Features)
- Replace cascading margin classes (`mt-*`, `mb-*`) with `gap-y-*` utilities for consistent spacing
- Implement responsive spacing: `gap-y-2/lg:gap-y-4` within groups, `gap-y-4/lg:gap-y-8` between groups
- Improve visual hierarchy and content organization for better UX/UI

### <u>fix:</u>

- Fix vertical centering of Header content by adding flexbox alignment
- Resolve layout alignment issues in Header component
- Fix Hero section spacing hierarchy by implementing content grouping strategy
- Resolve mobile spacing issues where labels stick to CTA button
- Add proper vertical spacing between subtitle and search input
- Remove inconsistent manual margins in favor of flexbox gap utilities

### <u>standardization:</u>

- Unify spacing system across Hero component using flexbox gap utilities
- Establish clear micro-typography patterns within content groups
- Create consistent spacing hierarchy between major content sections

---

## [0.1.4] - 2025-12-01

### <u>fix:</u>

- Fix LeafFall visibility in dark mode by adjusting z-index layering in Hero section
- Fixes horizontal layout overflow on mobile
- Fixes the display of the main CTA button in dark mode
- Fixes the incorrect `accent-light`

### <u>refactor:</u>

- Improve LeafFall fade-out animation with smooth, natural easing curve
- Add progressive fade-in at animation start for seamless leaf appearance
- Enhance LeafFall opacity transitions with 3-phase animation (fade-in, stable, fade-out)
- Replace linear fade-out with eased curve for more natural disappearance
- Extend fade-out duration to last 40% of animation cycle for smoother effect

### <u>standardization:</u>

- Harmonizes heading size hierarchy (h1–h4) for UI consistency
- Simplifies the color palette: removes custom accent variables
- Ensure badge, input field, and interactive elements properly layer above background animation

### <u>update:</u>

- Minor UX adjustments to labels and hover states

---

## [0.1.3] - 2025-11-28

### <u>fix:</u>

- Correct vertical content alignment in layout components
- Add explicit height to `header` to ensure consistent centering
- Fix y-axis spacing in `footer`
- Correct label background in `Hero` section for dark mode

### <u>refactor:</u>

- Replace custom `accent` color variable with Tailwind `emerald`

### <u>standardization:</u>

- Improve UI/UX consistency across layout
- Ensure dark mode hierarchy is respected in theme switching

### <u>optimization:</u>

- Update balise`<link>` in file `index.hmtl` for google font

### <u>update:</u>

- Minor UX improvements in Hero labels

---

## [0.1.2] - 2025-11-27

### <u>fix:</u>

- Fixed leaf opacity starting at wrong value - now correctly capped at 0.7 maximum for better visibility

### <u>refactor:</u>

- Fixed leaves falling straight down - now all leaves move continuously left-right throughout their fall with varied phase offsets

### <u>bug:</u>

- Bug not fix where `LeafFall.jsx` does not appear in the background when dark mode is enabled, especially for the main input field.

---

## [0.1.1] - 2025-11-26

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

## [0.1.0] - 2025-11-25

### <u>add:</u>

- Added the `CHANGELOG.md` file
- Initial documentation `README.md`

### <u>standardization:</u>

- Standardized the Changelog format for future releases
- Aligned the Git workflow with the established branch convention (feature, fix, hotfix, docs, refactor)

### <u>update:</u>

- Updated the README with Installation, Usage, and Documentation Links sections

### <u>fix:</u>

- Clarification on Documentation organization following [issue #6](https://github.com/PierreMaze/tradimedika/issues/6)

---
