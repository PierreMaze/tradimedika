# Change Log

---

## [0.5.0] - 2025-12-10

### <u>add:</u>

- Added `src/routes/` directory for centralized routing configuration
- Added `src/routes/Router.jsx` managing all application routes with React Router v6.30.2
- Added `src/pages/` directory structure for page-level components
- Added `src/pages/Home.jsx` page wrapping existing `Hero.jsx` component
- Added `src/pages/RemedyResult.jsx` placeholder page for remedy search results (Issue #41)
- Added `src/pages/RemedyResultDetails.jsx` placeholder page for individual remedy details (Issue #41)
- Added `src/pages/NotFound.jsx` custom 404 error page with navigation and helpful suggestions
- Added `src/layout/LayoutApp.jsx` global layout component with `<Header />`, `<Outlet />`, `<Footer />` structure
- Added `src/layout/LayoutRemedyResult.jsx` specific layout for remedy pages with breadcrumb placeholder (Issue #38)
- Added `<BrowserRouter>` wrapper in `src/main.jsx` for React Router v6 client-side routing
- Added nested route structure: `/remedies` and `/remedies/:id` under `LayoutRemedyResult`
- Added 404 catch-all route (`*`) redirecting to `NotFound.jsx` page
- Added Framer Motion animations in `NotFound.jsx` for smooth page transitions
- Added back navigation buttons in `RemedyResultDetails.jsx` ("Retour aux résultats" and "Nouvelle recherche")

### <u>update:</u>

- Updated `package.json` to downgrade `react-router-dom` from `^7.9.6` to `6.30.2` for compatibility
- Updated `src/App.jsx` to use `<Router />` component instead of direct `<Hero />` rendering
- Updated `src/main.jsx` to wrap application with `<BrowserRouter>` for routing support
- Updated `README.md` version badge from `0.4.1` to `0.5.0`
- Updated `ARCHITECTURE.md` to include new `pages/`, `routes/`, and expanded `layout/` directories

### <u>refactor:</u>

- Refactored application architecture from single-page to multi-page structure with React Router v6
- Refactored `App.jsx` from layout component to simple router wrapper
- Refactored page layouts with composition pattern: `LayoutApp` wraps all routes, `LayoutRemedyResult` wraps remedy pages
- Extracted page-specific containers from components to dedicated `pages/` directory

### <u>standardization:</u>

- Standardized routing configuration in centralized `src/routes/Router.jsx` file
- Established consistent page structure pattern with placeholder comments for future issues
- Unified layout hierarchy: global layout (`LayoutApp`) → specific layout (`LayoutRemedyResult`) → page content
- Standardized route paths: `/` (home), `/remedies` (list), `/remedies/:id` (details), `*` (404)

### <u>optimization:</u>

- Optimized component re-renders by separating layout concerns from routing logic
- Improved code organization with clear separation: `routes/`, `pages/`, `layout/` directories
- Prepared architecture for future component integration (Issues #38, #41, #43, #44)

### <u>features:</u>

- **React Router v6 Integration**: Complete client-side routing with nested routes and layouts
- **Multi-Page Architecture**: Foundation for home, results, details, and 404 pages
- **Nested Layouts**: Global layout (Header/Footer) + specific remedy layout (breadcrumb space)
- **404 Error Handling**: Custom NotFound page with helpful navigation and visual feedback
- **Placeholder Pages**: Structure ready for future component development (Issue #41)
- **Scalable Routing**: Architecture supports easy addition of new routes and layouts

### <u>issues resolved:</u>

- Issue #42: Created main application pages (Home, RemedyResult, RemedyResultDetails)
- Issue #39: Setup global routing with React Router v6 and layouts (LayoutApp, LayoutRemedyResult, NotFound)

---

# Change Log

---

## [0.4.1] - 2025-12-09

### <u>add:</u>

- Added "mal de ventre" synonym to `src/data/synonymsSymptomList.json` for "troubles digestifs"

### <u>update:</u>

- Updated filtering logic in `SymptomsSelector.jsx` to exclude synonym values from autocomplete dropdown

### <u>fix:</u>

- Fixed autocomplete displaying synonyms (values) instead of only main symptoms (keys)
- Fixed duplicate entries when typing synonyms that exist in both `symptomList.json` and `synonymsSymptomList.json`
- Fixed "stress" showing both "Stress" and "Anxiété" - now shows only "Anxiété"
- Fixed "rage de dents" showing duplicate - now shows only "Mal de dents"
- Fixed "digestion" showing duplicate - now shows only "Troubles digestifs"

### <u>refactor:</u>

- Refactored filtering to prioritize synonym matches over direct matches
- Refactored result combination order: synonyms → exact matches → partial matches
- Added deduplication with `Set()` to eliminate potential duplicates

### <u>optimization:</u>

- Optimized autocomplete by filtering out synonym values from `symptomList.json` matches
- Improved UX by showing only relevant main symptoms, reducing confusion

---

## [0.4.0] - 2025-12-09

### <u>add:</u>

- Added `findMainSymptomsFromSynonym()` function in `src/components/input/SymptomsSelector.jsx` for reverse synonym lookup
- Added multiple new synonyms to `src/data/synonymsSymptomList.json` for improved search coverage

### <u>update:</u>

- Updated `src/data/synonymsSymptomList.json` with enriched synonym mappings:
  - "mal de dents" : added "carie" and "maux de dents"
  - "mal de gorge" : added "maux de gorge", "gorge irritée", "gorge douloureuse"
  - "troubles digestifs" : added "maux d'estomac", "maux de ventre", "mal au ventre"
- Updated autocomplete filtering logic in `SymptomsSelector.jsx` to support multiple main symptoms from single synonym

### <u>refactor:</u>

- Refactored `findMainSymptomFromSynonym()` to `findMainSymptomsFromSynonym()` (plural) returning array instead of single value
- Refactored synonym matching to return ALL matching main symptoms instead of only the first one

### <u>fix:</u>

- Fixed autocomplete showing only one symptom when typing synonym that matches multiple entries
- Fixed "maux" query now correctly returns "Mal de tête", "Mal de dents", "Mal de gorge" (all matching symptoms)

### <u>features:</u>

- **Multi-Symptom Synonym Lookup**: Typing a synonym now suggests ALL related main symptoms
- **Enhanced Search Coverage**: 23+ new synonym variations added for better discoverability
- **Example**: typing "maux" now shows all "mal de..." symptoms instead of just one

---

## [0.3.3] - 2025-12-09

### <u>add:</u>

- Added `normalizeForMatching()` function in `src/utils/normalizeSymptom.js` for accent-insensitive matching
- Added `validate-symptoms.js` script for validating JSON data consistency and structure
- Added support for French special characters (œ, apostrophes) in validation patterns

### <u>update:</u>

- Updated `src/utils/normalizeSymptom.js` to preserve French accents in symptom display (é, è, à, ô, etc.)
- Updated `src/hooks/useSymptomTags.js` to use flexible duplicate detection (accent-insensitive)
- Updated `src/components/input/SymptomsSelector.jsx` with accent-insensitive filtering for better UX
- Updated `src/utils/remedyMatcher.js` to support flexible matching (accepts "diarrhee" OR "diarrhée")
- Updated `scripts/validateData.js` validation rules to accept French accents instead of rejecting them
- Updated `src/data/db.json` with 14 verified remedies (reduced from 101) with proper French accents
- Updated `src/data/symptomList.json` to 23 symptoms with correct French spelling (accents preserved)
- Updated `src/data/synonymsSymptomList.json` with 19 synonym mappings and proper accent usage
- Updated `validate-symptoms.js` to use ES module imports instead of CommonJS `require()`

### <u>refactor:</u>

- Refactored normalization system from "remove accents" to "preserve accents with flexible matching"
- Refactored symptom matching logic to compare normalized versions while displaying original text
- Simplified synonym validation to unidirectional structure (removed bidirectional requirement)

### <u>delete:</u>

- Deleted `scripts/normalizeData.js` migration script (no longer needed with new accent-preserving strategy)

### <u>fix:</u>

- Fixed symptom matching failures caused by accent mismatches between user input and database
- Fixed validation script rejecting valid French characters (œ in "œdème", apostrophes in "manque d'énergie")
- Fixed inconsistent accent usage in `db.json` (glycemie → glycémie, diarrhee → diarrhée, nausee → nausée, anxiete → anxiété)
- Fixed "haut-le-cœur" containing hyphen (normalized to "haut le cœur")

### <u>standardization:</u>

- Standardized French orthography across all JSON files with proper accent usage
- Established dual normalization pattern: `normalizeSymptom()` for display, `normalizeForMatching()` for comparison
- Unified validation rules to accept French special characters (à, â, ä, é, è, ê, ë, ï, î, ô, ù, û, ü, ÿ, ç, œ, ')

### <u>optimization:</u>

- Optimized database size: reduced `db.json` from 2266 lines to 599 lines (~73% reduction)
- Improved user experience with flexible search (users don't need to type accents correctly)
- Enhanced data quality with scientifically verified information for 14 core remedies

### <u>features:</u>

- **Flexible Accent Matching**: Users can search "diarrhee" or "diarrhée" - both work perfectly
- **Proper French Display**: All symptoms display with correct French spelling and accents
- **Enhanced Validation**: Comprehensive validation scripts ensuring data consistency
- **Streamlined Database**: Focused, high-quality dataset with verified natural remedies

---

## [0.3.2] - 2025-12-07

### <u>fix:</u>

- Fixed results display behavior to persist across multiple searches instead of disappearing after 2 seconds
- Fixed button state to show "Recherche effectuée" feedback for 2 seconds while keeping results visible

### <u>update:</u>

- Updated `useSymptomSubmit.js` to maintain `hasSubmitted` state with 2-second delay for button feedback only
- Updated `Hero.jsx` results display to use `results !== null` instead of `hasSubmitted` for persistent visibility
- Updated UX flow: button resets to "Découvrir nos solutions" after 2 seconds while results remain displayed

### <u>optimization:</u>

- Optimized user experience by decoupling button state from results visibility
- Improved results persistence: subsequent searches update the count without hiding the results panel

---

## [0.3.1] - 2025-12-07

### <u>add:</u>

- Added `src/utils/normalizeSymptom.js` utility function for complete symptom normalization (lowercase, remove accents, standardize separators)
- Added `src/utils/remedyMatcher.js` utility for matching remedies to symptoms with relevance scoring
- Added `src/hooks/useSymptomSubmit.js` hook for managing symptom submission with loading states, results, and error handling
- Added `scripts/normalizeData.js` migration script to normalize all symptoms in JSON files
- Added `scripts/validateData.js` validation script to ensure data consistency and normalization compliance
- Added symptom submission button with three states: default, loading (spinner), and success (checkmark)
- Added symptom counter badge displaying "X/5 symptômes sélectionnés"
- Added loading state with animated spinner (300-500ms simulated delay)
- Added success state with checkmark icon after submission
- Added results display with animations showing remedy count or "no results" message
- Added Enter key support in SymptomsSelector to submit when dropdown is closed
- Added structured console logging with `console.group` and `console.table` for remedy results
- Added ARIA labels (`aria-label`, `aria-busy`, `aria-disabled`) for accessibility
- Added `onSubmit` prop to SymptomsSelector for keyboard submission support

### <u>update:</u>

- Updated all symptoms in `symptomList.json` (31 symptoms) to normalized format (removed accents: "immunité" → "immunite", "cholestérol" → "cholesterol", etc.)
- Updated all symptoms in `db.json` (101 remedies) to match normalized format
- Updated `synonymsSymptomList.json` to use normalized symptom keys and values
- Updated `useSymptomTags.js` to use `normalizeSymptom()` instead of simple `.toLowerCase()`
- Updated `SymptomsSelector.jsx` filtering to use normalized input matching
- Updated `Hero.jsx` with major refactor: moved submission button into `SymptomsSection` component
- Updated button styling with disabled state (opacity-50, cursor-not-allowed) when no symptoms selected
- Updated SymptomsSection to integrate both symptom selection and submission logic in one cohesive component

### <u>refactor:</u>

- Refactored Hero component to remove redundant CTA button (now integrated in SymptomsSection)
- Refactored SymptomsSection as pure component depending only on internal hooks (composition pattern)
- Refactored symptom matching to use pre-normalized data for optimal performance (no runtime normalization overhead)
- Simplified ESLint configuration to use only installed packages (removed missing dependencies)

### <u>delete:</u>

- Deleted duplicate symptom "maux de tête" (merged with "mal de tête" → normalized as "mal de tete")
- Removed old placeholder `handleSearch()` function from Hero component
- Removed standalone CTA button (replaced by integrated submission button in SymptomsSection)

### <u>standardization:</u>

- Standardized all symptom data to normalized format: lowercase, no accents, no hyphens/underscores, spaces only
- Standardized symptom separators: "rétention_eau" → "retention eau" (underscore to space)
- Established normalization function as single source of truth for symptom comparison
- Unified loading animation duration across components (300-500ms)

### <u>optimization:</u>

- Optimized symptom matching by normalizing data once at build time instead of runtime
- Optimized component re-renders by isolating submission state in SymptomsSection (Hero doesn't re-render on state changes)
- Optimized data structure: deduplicated symptomList from 32 to 31 unique symptoms

### <u>features:</u>

- **Symptom Submission System**: Complete workflow from selection to remedy matching with visual feedback
- **Relevance Scoring**: Remedies sorted by number of matching symptoms, then alphabetically
- **Loading States**: Professional UX with spinner, disabled states, and success animations
- **Keyboard Accessibility**: Full Enter key support for submission
- **Developer Tools**: Structured console logging with remedy details table
- **Data Normalization**: Robust system for handling accented French symptoms with flexible user input

---

## [0.3.0] - 2025-12-06

### <u>add:</u>

- Added `src/hooks/useSymptomTags.js` hook for centralized symptom selection logic with max 5 limit and anti-duplicate validation
- Added `src/components/tag/SymptomTag.jsx` component displaying individual symptom as interactive pill badge with delete functionality
- Added `src/components/tag/ListSymptomTag.jsx` container component for rendering symptom tags with responsive layout (centered mobile, left-aligned desktop)
- Added Framer Motion enter/exit animations for symptom tags with 0.3s fade and scale transitions
- Added `AnimatePresence mode="popLayout"` for smooth tag removal animations with layout shift handling
- Added Backspace keyboard shortcut to delete last selected symptom when input is empty
- Added animated warning message with Framer Motion when 5-symptom limit is reached
- Added `IoMdWarning` icon to limit warning message for better visual hierarchy
- Added clickable badge functionality allowing entire tag to be clicked for removal (not just X icon)
- Added focus ring styling (`focus:ring-2`) on tag buttons for accessibility
- Added `onRemoveSymptom` prop to `SymptomsSelector.jsx` for Backspace delete integration

### <u>update:</u>

- Updated `SymptomsSelector.jsx` to import from renamed `symptomList.json` and `synonymsSymptomList.json` files
- Updated warning message styling with border, background color, and icon for improved UX
- Updated `Hero.jsx` to use composition pattern with `SymptomsSection` wrapper component isolating symptom state
- Updated tag design with `cursor-pointer`, `tracking-wider`, and hover states for better interactivity

### <u>refactor:</u>

- Refactored `Hero.jsx` to remove local symptom state management (extracted to `useSymptomTags()` hook)
- Refactored symptom selection logic into reusable `useSymptomTags()` hook with `addSymptom()` and `removeSymptom()` functions
- Refactored Hero component state management using composition pattern to prevent unnecessary re-renders of title, subtitle, and CTA button
- Created `SymptomsSection` component outside Hero function to avoid re-creation on each render
- Simplified `handleSearch()` in `Hero.jsx` by removing console.log statements (kept TODO for future implementation)

### <u>delete:</u>

- Deleted `src/data/symptoms.json` file (renamed to `symptomList.json`)
- Deleted `src/data/synonyms.json` file (renamed to `synonymsSymptomList.json`)
- Removed console.log debugging statements from `Hero.jsx` symptom selection logic

### <u>standardization:</u>

- Standardized data file naming with more descriptive names: `symptomList.json` and `synonymsSymptomList.json`
- Standardized symptom tag animations at 0.3s duration for consistency with Hero section secondary elements
- Established composition pattern for state isolation following React best practices
- Unified focus styling with `focus:ring-2 focus:ring-emerald-300` across interactive tag elements

### <u>optimization:</u>

- Optimized Hero component re-renders by isolating symptom state in `SymptomsSection` wrapper (Hero no longer re-renders on symptom changes)
- Improved performance by avoiding unnecessary re-creation of `SymptomsSection` component (defined outside Hero)
- Reduced JavaScript execution by using CSS-based theming (`dark:` classes) for tag styling instead of Context consumption

---

## [0.2.0] - 2025-12-06

### <u>refactor:</u>

- Refactored dark mode implementation to use Tailwind CSS v4 `dark:` variants instead of Context-based conditional styling
- Refactored `ThemeContext.jsx` to properly memoize context value with `useMemo()` for performance optimization
- Refactored `App.jsx` to remove `useTheme()` dependency and use CSS `dark:` classes
- Refactored `Hero.jsx` to eliminate Context consumption for styling (6 dark mode conditional blocks removed)
- Refactored `Header.jsx` to use pure CSS `dark:` variants for background and border colors
- Refactored `Footer.jsx` to remove `useTheme()` and adopt `dark:` utility classes
- Refactored `LogoTradimedika.jsx` to use CSS-only dark mode styling
- Refactored `LeafFall.jsx` to remove Context dependency for leaf color changes
- Refactored `SymptomsSelector.jsx` to use `dark:` variants for all interactive states (input, dropdown, hover)

### <u>add:</u>

- Added `@custom-variant dark (&:where(.dark, .dark *))` directive in `src/index.css` for Tailwind v4 dark mode support
- Added `html.dark body` CSS rule for dark mode background color
- Added proper destructuring of `useDarkMode()` values in `ThemeProvider` for memoization stability

### <u>optimization:</u>

- Optimized React re-renders: reduced from 10 components to 1 component (`DarkModeToggle`) when toggling dark mode
- Optimized Context API usage: only `DarkModeToggle.jsx` now consumes `useTheme()` for toggle logic
- Achieved 90% reduction in JavaScript re-renders on theme change (styles update via CSS only)
- Improved memoization strategy in `ThemeContext` by using individual dependencies instead of object reference

### <u>standardization:</u>

- Standardized dark mode implementation across all components using Tailwind CSS v4 best practices
- Aligned with React.dev guidelines: "Even when a component is memoized, it will still re-render when a context that it's using changes"
- Established CSS-first approach for theming: Context for logic, CSS for styling
- Unified dark mode class names following Tailwind v4 `dark:` convention

### <u>fix:</u>

- Fixed `useMemo()` implementation in `ThemeContext.jsx` by destructuring `useDarkMode()` values before memoization
- Fixed Tailwind v4 dark mode not working due to missing `@custom-variant` directive
- Fixed unnecessary re-renders caused by non-memoized Context value objects

### <u>update:</u>

- Updated `src/index.css` to include Tailwind v4 dark mode configuration with `@custom-variant`
- Updated all component styling to use `dark:` variants: `dark:bg-dark`, `dark:text-light`, `dark:border-light/60`
- Updated `ThemeProvider` to create stable memoized context value object

---

## [0.1.7] - 2025-12-05

### <u>add:</u>

- Added `src/data/symptoms.json` containing 32 standardized symptom entries for autocomplete functionality
- Added `src/data/synonyms.json` with bidirectional synonym mapping (e.g., "mal de tête" ↔ "maux de tête")
- Added `SymptomsSelector` component with intelligent autocomplete and keyboard navigation
- Added anti-duplicate filtering: selected symptoms automatically hidden from dropdown
- Added synonym detection: selecting one variant hides all synonyms from suggestions
- Added 5-symptom selection limit with warning message and input disable state
- Added symptom capitalization for display without breaking internal comparisons
- Added ARIA attributes for accessibility (combobox, listbox, aria-expanded, aria-selected)

### <u>refactor:</u>

- Externalized synonym data from hardcoded constants to `synonyms.json` for better maintainability
- Removed badge/tag UI from Hero component (deferred to separate feature)
- Removed `handleRemoveSymptom` function and `HiXMark` import (no longer needed)
- Updated Hero component to manage multi-selection state with `selectedSymptoms` array
- Simplified SymptomsSelector by importing synonym data instead of hardcoding

### <u>standardization:</u>

- Standardized symptom format: all entries use spaces (e.g., "mal de tête") instead of underscores
- Established consistent data structure for future symptom additions
- Unified display format with automatic capitalization (e.g., "Anémie", "Rhume")

### <u>optimization:</u>

- Reduced bundle size by -2.51 kB (CSS: -1.12 kB, JS: -1.39 kB) from badge removal
- Implemented efficient filtering with `includes()` for case-insensitive search
- Optimized dropdown rendering with max 10 results limit

### <u>update:</u>

- Updated Hero component to integrate SymptomsSelector with multi-selection capability
- Improved UX with real-time filtering, keyboard navigation, and visual feedback

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
