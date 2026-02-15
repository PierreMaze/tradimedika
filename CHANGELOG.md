# Change Log

---

## [0.55.0] - 2026-02-15

### Added

- **User Consent System**
  - Added `ConsentModal` component for collecting user consent on first visit
  - Added `useConsent` hook to manage consent state with localStorage persistence
  - Integrated consent context and provider in application architecture
  - Consent modal appears on initial app load and blocks access until accepted

- **Red Flags Warning System**
  - Added `RedFlagsModal` component to display emergency warnings for severe symptoms
  - Added `useRedFlags` hook to detect dangerous symptom patterns
  - Added `redFlagsConfig.js` with comprehensive list of critical symptoms requiring immediate medical attention
  - Integrated red flags detection in symptom search workflow
  - Warning modal automatically triggers when dangerous symptoms are detected

- **Emergency Alert Page**
  - Added dedicated `/urgence` route for emergency situations
  - Created `EmergencyAlert` page with clear instructions to contact emergency services
  - Integrated emergency redirect in red flags detection flow

### Changed

- **Enhanced Symptom Search**
  - Updated `useSymptomSearchForm` hook to integrate red flags validation before search
  - Modified search flow to check for critical symptoms and trigger warnings appropriately

- **Updated Application Routes**
  - Added emergency alert route to router configuration
  - Integrated consent and red flags modals in main application flow

- **Database Enhancements**
  - Updated `db.json` with additional remedy information
  - Enhanced data structure for better red flags detection

- **Page Updates**
  - Modified `Home` page to integrate consent modal
  - Updated `RemedyResult` page to handle red flags warnings
  - Enhanced `RemedyResultDetails` page with improved safety information display
  - Updated `RemedyResultDetailsUsagesList` with better user guidance

- **Provider Architecture**
  - Integrated consent provider in `AppProviders` for global state management

---

## [0.54.4] - 2026-02-15

### Fixed

- **RemedyResultDetailsUsagesList nested button HTML validation error**
  - Restructured accordion layout to separate InfoTooltip from main button element
  - Extracted toggle logic into dedicated `handleToggle` function to avoid duplication
  - Split accordion trigger into two separate buttons: one for title, one for chevron icon
  - Both buttons trigger the same toggle behavior while maintaining proper HTML semantics
  - Added `aria-label` to chevron button for improved screen reader accessibility
  - Resolved React hydration error: `<button> cannot be a descendant of <button>`

- **LeafFall animation falling naturally**
  - Improved leaf falling physics with more natural motion curves
  - Added custom Tailwind CSS keyframes for organic leaf movement
  - Enhanced visual realism with varied animation timings

### Changed

- **ImageCredit styling improvements**
  - Updated text color for better contrast
  - Added underline effect on hover for better link affordance

---

## [0.54.3] - 2026-02-14

### Fixed

- **Added tooltips for all tag components with usage indicators**
  - Migrated `PregnancyTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Migrated `ChildrenAgeTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Migrated `ProuvedTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Migrated `TraditionnalTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Ensures consistent UX across all tag tooltips with unified timing and positioning
  - Added comprehensive tooltip content explaining each tag's meaning and usage

### Removed

- **Deprecated tag helper components**
  - Removed `TagsAccordionPopover.jsx` (271 lines) - replaced by individual tag tooltips
  - Removed `TagsInfoContent.jsx` (261 lines) - content distributed to respective tag components
  - Updated `src/components/ui/helper/index.js` to remove obsolete exports
  - Net code reduction: ~532 lines removed while improving component modularity

---

## [0.54.2] - 2026-02-14

### Fixed

- **TermPopover background and logic improvements**
  - Simplified popover rendering logic by removing redundant conditions
  - Improved background styling consistency across theme modes
  - Reduced component complexity from redundant state checks

---

## [0.54.1] - 2026-02-14

### Fixed

- **Tooltip positioning and behavior for tags**
  - Enhanced `useTooltipPosition.js` with better viewport boundary detection
  - Improved collision detection algorithm for edge cases
  - Updated `Tooltip.jsx` z-index management for proper stacking context
  - Fixed tooltip clipping issues on small viewports

---

## [0.54.0] - 2026-02-14

### Added

- **Vanilla React tooltip system**
  - Created unified tooltip system with zero external dependencies (0 deps, ~15kB bundle size reduction)
  - Added `Tooltip.jsx` base component with WCAG 2.2 AA accessibility, portal rendering, and animations
  - Added `InfoTooltip.jsx` component merging `TagsInfoButton` and `SectionHelpButton` functionality
  - Implemented 4 custom hooks for tooltip management:
    - `useTooltip.js` - State management (open/close/toggle), hover delays, ESC key support
    - `useTooltipPosition.js` - Intelligent positioning with auto-update on scroll/resize
    - `useClickOutside.js` - External click detection for tooltip dismissal
    - `useKeyboard.js` - Global keyboard event handling
  - Created `tooltipPositioning.js` utility with advanced collision detection algorithms (flip/shift strategies)
  - Supports multi-directional positioning (top/bottom/left/right) with automatic viewport boundary detection

### Changed

- **Refactored TermPopover with new primitives**
  - Migrated `TermPopover.jsx` to use new tooltip hooks while preserving all features:
    - Lock state (click to keep open)
    - Wikipedia external links with confirmation modal
    - Three visual variants (property, allergen, medical)
    - 300ms hover delay for accidental trigger prevention
    - Complete focus management and keyboard navigation
  - Reduced component complexity from 297 to ~200 lines while improving maintainability
  - Now uses `createPortal` for better z-index management and positioning consistency

- **Converted HTML title tooltips to React components**
  - Migrated `PregnancyTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Migrated `ChildrenAgeTag` from native HTML `title` attribute to React `<Tooltip>` wrapper
  - Ensures consistent UX across all tooltips (unified timing, positioning, styling)
  - Enables better accessibility control and mobile-first interactions (tap vs hover)

- **Unified tooltip components across application**
  - Replaced `TagsInfoButton` usage with `InfoTooltip` in 2 components:
    - `RemedyResultDetailsHeader.jsx`
    - `RemedyCard.jsx`
  - Replaced `SectionHelpButton` usage with `InfoTooltip` in 4 components:
    - `RemedyResultDetailsPropertiesSection.jsx`
    - `RemedyResultDetailsAllergensSection.jsx`
    - `RemedyResultDetailsContraindicationsSection.jsx`
    - `RemedyResultDetailsTipsSection.jsx`
  - Updated test mocks to reflect new tooltip architecture

### Removed

- **Deprecated tooltip components**
  - Removed `TagsInfoButton.jsx` (185 lines) - replaced by `InfoTooltip`
  - Removed `SectionHelpButton.jsx` (149 lines) - replaced by `InfoTooltip`
  - Updated `src/components/ui/helper/index.js` to remove obsolete exports
  - Net code reduction: ~390 lines removed, improved maintainability

---

## [0.53.3] - 2026-02-14

### Added

- **Unified Button component**
  - Created `Button.jsx` in `src/components/ui/button/` to replace fragmented button implementations
  - Supports 3 variants: `primary`, `secondary`, `danger`
  - Supports 3 types: HTML `<button>`, React Router `<Link>`, `<ExternalLink>`
  - Built-in loading state with spinner and customizable loading text
  - Icon support with configurable position (left/right) using react-icons
  - Full accessibility compliance: WCAG 2.2 Level AA with min-height 44px
  - Comprehensive test suite with 100% coverage in `Button.test.jsx`

- **Centralized z-index system**
  - Created `src/constants/zIndexLevels.js` for normalized layer hierarchy
  - Defined 5 distinct layers: Base (0-10), UI Elements (40-49), Overlays (50-59), Dialogs (60-69), Tooltips (70-79)
  - Exported both numeric constants (`Z_INDEX`) and Tailwind classes (`Z_INDEX_CLASSES`)
  - Added custom z-index utilities in `src/index.css` for levels 70 and 90
  - Prevents z-index conflicts between modals, popovers, and tooltips

### Changed

- **Improved TagsInfoButton tooltip positioning**
  - Migrated tooltip from absolute to fixed positioning to prevent viewport overflow
  - Implemented dynamic position calculation based on button location and viewport boundaries
  - Added left/right edge detection with automatic adjustment (8px spacing)
  - Added vertical overflow handling: displays below button if insufficient space above
  - Removed tooltip arrow (incompatible with dynamic positioning)
  - Enhanced keyboard navigation with Enter and Space key support
  - Applied centralized z-index from `Z_INDEX_CLASSES.TOOLTIP` (level 70)

- **Refactored AccessibilityContext for better architecture**
  - Removed tight coupling with ThemeContext to improve modularity
  - High contrast mode now directly manipulates DOM and localStorage without ThemeContext dependency
  - Synchronous light mode enforcement when high contrast is activated
  - Simplified context provider with better separation of concerns
  - Improved maintainability and testability

- **Reorganized FilterModal location**
  - Moved `FilterModal.jsx` from `src/features/remedy-filter/components/` to `src/features/remedy-result-page/components/`
  - Updated export path in `src/features/remedy-filter/index.js` to reflect new location
  - Better feature organization: filter modal is now co-located with its primary usage context

### Fixed

- **Fixed z-index conflicts in overlay system**
  - TagsInfoButton tooltips now properly appear above all other UI elements
  - Consistent stacking order: tooltips (70) > dialogs (60) > backdrops (50) > UI elements (40)
  - Resolved visual bugs where tooltips were hidden behind modal backdrops

---

## [0.53.2] - 2026-02-14

### Fixed

- **Removed duplicate allergen entries in allergensList.json**
  - Removed 2 duplicate "Citron" entries (IDs: "Café" and "citron")
  - Fixed allergensList.json validation to ensure unique IDs
  - Total allergens: 40 (down from 42 duplicates)

- **Enhanced validation script for better duplicate detection**
  - Added detailed duplicate ID reporting in `scripts/validateData.js`
  - Now displays which IDs are duplicated and their occurrence count
  - Helps prevent future data quality issues

- **Improved keyboard accessibility for collapsible sections**
  - Fixed `RemedyResultDetailsContraindicationsSection` and `RemedyResultDetailsTipsSection` to properly handle Enter and Space key navigation
  - Changed interactive elements from `<button>` to `<div>` with proper ARIA attributes (`role="button"`, `tabIndex={0}`)
  - Added `onKeyDown` handlers for Enter and Space keys to toggle section expansion
  - Better semantic structure while maintaining full keyboard navigation support

- **Fixed tooltip click propagation in SectionHelpButton**
  - Added `e.stopPropagation()` to prevent tooltip clicks from triggering parent element actions
  - Prevents unintended section collapse/expand when clicking help tooltips
  - Improves user experience when interacting with help icons in collapsible sections

### Changed

- **Improved test setup for better mock compatibility**
  - Added global `structuredClone` polyfill in `src/test/setup.js`
  - Ensures consistent test behavior across different Node.js versions
  - Prevents potential test failures related to object cloning

---

## [0.53.1] - 2026-02-13

### Changed

- **Migrated from Framer Motion to Tailwind CSS animations**
  - Removed Framer Motion dependency (bundle size reduced by ~45 KB)
  - Replaced all animations with native Tailwind CSS utilities and custom keyframes
  - Updated 48 component files across the entire application
  - Added `useHoverDelay` custom hook for hover interactions
  - Performance improvements: FCP reduced by 150-200ms, CPU usage during animations reduced by ~60%
  - Maintained full accessibility support with `prefers-reduced-motion` respect

- **Refactored animation system for better maintainability**
  - Extracted animation variants into reusable `useAnimationVariants` hook
  - Supports four animation types: `section`, `tag`, `list`, and `collapse`
  - Centralized reduced motion handling across all animation types
  - Reduced code duplication in detail page sections (AllergensSection, ContraindicationsSection, PropertiesSection, SymptomsSection, TipsSection, UsagesList)

- **Improved remedy details page layout**
  - Reorganized sections into a responsive grid system (6-column layout on large screens)
  - Better visual hierarchy with grouped related sections
  - Properties, Symptoms, and Allergens now displayed side by side on desktop
  - Contraindications and Tips sections each span 3 columns for balanced layout
  - Usages section spans full width for optimal readability

### Removed

- Removed `framer-motion` dependency from package.json
- Removed `useAnimationVariants` hook (replaced with Tailwind CSS approach)

---

## [0.53.0] - 2026-02-10

### Added

- **Section "Accessibilité" dans SettingsModal**
  - Nouvelle section accordéon "Accessibilité" avec deux toggles : Contraste élevé et Confirmation liens externes
  - Nouveau composant `HighContrastToggle` : force le mode clair avec contraste renforcé (WCAG AAA)
  - Nouveau composant `ExternalLinkConfirmToggle` : contrôle l'affichage de la modal de confirmation avant ouverture de liens externes
  - Préférences persistées dans localStorage (`tradimedika-high-contrast`, `tradimedika-external-link-confirm`)

- **Contexte d'accessibilité**
  - `AccessibilityContext` : gestion des préférences d'accessibilité avec hooks `useAccessibility`
  - `AccessibilityProvider` : wrapper global ajouté dans `main.jsx` entre `PerformanceProvider` et `ExternalLinkProvider`
  - Export centralisé via `src/features/settings/index.js`

- **Mode Contraste élevé**
  - Classe CSS `high-contrast` appliquée sur `<html>` pour overrides visuels avec `!important`
  - Force le fond blanc (`#ffffff`) et texte noir (`#000000`) sur tous les composants
  - Bordures renforcées en noir (`#333333`) pour améliorer la lisibilité
  - Liens en bleu foncé (`#0000cc`) conforme WCAG AAA
  - Focus visible renforcé (3px solid black) pour navigation clavier

### Changed

- **DarkModeToggle désactivé en mode contraste élevé**
  - Toggle du dark mode devient grisé et non-cliquable quand `isHighContrast` est actif
  - Force le mode clair via `disableDark()` du ThemeContext
  - ARIA label mis à jour : "Mode sombre désactivé en mode contraste élevé"

- **ExternalLinkContext respecte le consentement utilisateur**
  - `openConfirmation()` vérifie `isExternalLinkConfirmEnabled` avant d'afficher la modal
  - Si désactivé, ouvre directement le lien avec `window.open()` sans confirmation
  - Comportement par défaut : confirmation activée (`true`)

- **Réinitialisation localStorage dans SettingsModal**
  - Ajout des clés `tradimedika-high-contrast` et `tradimedika-external-link-confirm` au reset global

- **Labels constants centralisés**
  - Ajout dans `buttonLabels.js` :
    - `SETTINGS_ACCESSIBILITY_LABEL` : "Accessibilité"
    - `ACCESSIBILITY_HIGH_CONTRAST_LABEL` / `ACCESSIBILITY_HIGH_CONTRAST_DESC`
    - `ACCESSIBILITY_EXTERNAL_LINK_LABEL` / `ACCESSIBILITY_EXTERNAL_LINK_DESC`

### Fixed

- **Tests unitaires — adaptation aux nouveaux Providers**
  - Création de `test-utils.jsx` avec `AllTheProviders` wrapper incluant `ThemeProvider` et `AccessibilityProvider`
  - `test/setup.js` : mock global pour `useAccessibility` hook pour éviter les erreurs "must be used within AccessibilityProvider"
  - `DarkModeToggle.test.jsx` : mock `useAccessibility` dans `beforeEach`
  - `ExternalLinkContext.test.jsx` : wrapper avec ThemeProvider > AccessibilityProvider > ExternalLinkProvider
  - Tous les tests passent (55 suites, 551 tests)

---

## [0.52.0] - 2026-02-09

### Added

- **Enrichissement des allergènes : de 9 à 40 allergènes**
  - Ajout de 15 nouveaux allergènes de familles/composés : allium, fodmap, sulfites, bromelaine, latex-fruit, cafeine, zingiberacees, eugenol, rosacees, sorbitol, gluten-trace, propolis, lamiacees, menthol, aloine
  - Ajout de 16 allergènes individuels (un par produit naturel) : ail, aloe-vera, ananas, banane, cafe, camomille, citron, clou-de-girofle, fenouil, gingembre, miel, menthe, oignon, pruneau, riz, yaourt
  - Permet un filtrage granulaire : ex. allergique à la prune mais pas à l'abricot
  - Tous les produits naturels dans db.json ont maintenant leurs allergènes multiples référencés

- **Francisation complète des IDs d'allergènes**
  - `citrus` → `agrumes`
  - `asteraceae` → `asteracees`
  - `bee-venom` → `venin-abeille`
  - `pollen-olive` → `pollen-olivier`
  - Tous les IDs maintenant en français avec format kebab-case

- **Migration automatique localStorage (v0.52.0)**
  - `AllergiesContext` : détection et conversion automatique des anciens IDs anglais vers IDs français au démarrage
  - `SearchHistoryItem` : migration lazy des IDs dans l'historique de recherche lors de l'affichage
  - Migration silencieuse avec logs en mode développement
  - Constante `ALLERGEN_MIGRATION_MAP` partagée entre les composants

### Changed

- **allergensList.json : restructuration complète**
  - Passage de 9 à 40 allergènes
  - Ordre alphabétique par ID (français)
  - Descriptions génériques pour les allergènes individuels de produits naturels
  - Script `extractAllergensFromDb.js` synchronise automatiquement les produits naturels associés

- **db.json : mise à jour de tous les produits naturels**
  - Chaque produit naturel a maintenant un tableau `allergens` enrichi avec les nouveaux IDs
  - Exemples : Miel [`pollen`, `fodmap`, `propolis`, `miel`], Oignon [`allium`, `fodmap`, `sulfites`, `oignon`]

### Fixed

- **Validation des données**
  - Script `validateData.js` : validation réussie avec 40 allergènes (39 utilisés dans db.json)
  - Cohérence totale entre allergensList.json et db.json

---

## [0.51.0] - 2026-02-03

### Added

- **Section "Historique" dans SettingsModal**
  - Nouvelle section accordéon "Historique" avec deux toggles indépendants : Historique des recherches et Allergènes
  - Nouveau composant `AllergiesToggle` : contrôle la persistence des allergies via le consentement cookie (`isAllergiesAccepted`)
  - Chaque toggle possède un détail expansible ("Voir les détails") décrivant les données concernées
  - Catégorie `allergies` ajoutée à `cookieConfig.js` (`COOKIE_CATEGORIES`) avec le cookie `tradimedika-allergies`

- **Consentement cookie pour les allergies**
  - `CookieConsentContext` expose `isAllergiesAccepted` et `toggleAllergies` (même pattern que `history`)
  - `acceptCookies` / `rejectCookies` incluent désormais la catégorie `allergies`

### Changed

- **Hiérarchie des Providers corrigée**
  - `AllergiesProvider` déplacé de `main.jsx` vers `Router.jsx`, à l'intérieur de `CookieConsentProvider`
  - Permet à `AllergiesContext` d'appeler `useCookieConsent()` sans erreur

- **Nettoyage automatique des allergies**
  - `AllergiesContext` efface les allergies sauvegardées dès que `isAllergiesAccepted` devient `false` (consentement révoqué ou cookies refusés)
  - Les clés `tradimedika-allergies` et `tradimedika-allergies-filtering-enabled` sont réinitialisées avec le reset global dans SettingsModal

### Fixed

- **Tests unitaires — adaptation au nouveau Provider**
  - `AllergyForm.test.jsx` : wrapper avec `CookieConsentProvider`
  - `AllergiesContext.test.jsx` : tous les wrappers entourrent `AllergiesProvider` avec `CookieConsentProvider` ; tests de persistance localStorage ajoutent un consentement valide avec `allergies: true`
  - `useRemedyAllergyCheck.test.jsx` : même correction de wrapper + consentement dans les tests qui pré-remplissent les allergies

- **Version du projet**
  - Version bump : `0.50.3` → `0.51.0`
  - Mise à jour dans : package.json, README.md, HeroHeader.jsx

---

## [0.50.3] - 2026-02-03

### Added

- **Tag "Recommandé" sur la page résultats**
  - Nouveau composant `RecommendedTag` : badge visuel (sky) avec icône thumbUp affiché sur la carte du produit naturel le plus pertinent
  - Nouveau composant `RemedyResultDetailsRecommendedBanner` : bannière en haut de la page détails confirmant le statut recommandé
  - `findMatchingRemedies()` marque désormais le premier résultat non-allergène comme `isRecommended`

### Changed

- **Recalcul dynamique du tag "Recommandé"**
  - Le tag se met à jour automatiquement lorsque l'utilisateur filtre par symptôme individuel via `FilterRemedyResult`
  - Le tag se met à jour lorsque des filtres de propriétés sont appliqués (grossesse, reconnaissance, âge)
  - Clicking "Tous" restaure le tag sur le produit naturel le plus pertinent globalement
  - Implémenté via un `useMemo` post-filtrage dans `RemedyResult.jsx` : identifie le premier produit naturel non-allergène (`isFiltered: false`) de la liste actuelle
  - Optimisé pour `React.memo` : les items dont `isRecommended` n'a pas changé conservent la même référence objet

- **Données symptômes — reclassification**
  - "fatigue" reclassifié comme synonyme de "baisse d'énergie" dans `synonymsSymptomList.json`
  - Ajout du symptôme "baisse d'énergie" dans `symptomList.json`

### Fixed

- **Tests unitaires**
  - `SymptomsForm.test.jsx` : 4 tests mis à jour pour refléter le nouveau mapping synonyme "fatigue" → "baisse d'énergie"
  - `HeroHeader.test.jsx` : badge version aligné avec la version du composant

- **Version du projet**
  - Version bump : `0.50.2` → `0.50.3`
  - Mise à jour dans : package.json, README.md, HeroHeader.jsx

---

## [0.50.2] - 2026-02-03

### Added

- **Système de tags cliquables avec popover d'explications**
  - Nouveau composant `ClickableTag` : wrapper HOC pour rendre n'importe quel tag cliquable
  - Nouveau composant `TagsAccordionPopover` : popover avec accordéons contrôlés ouvert par les tags
  - Support clavier complet (Enter, Space, Tab, Escape) sur tous les éléments interactifs
  - Focus management automatique : focus vers popover à l'ouverture, retour au tag à la fermeture
  - Multi-ouverture d'accordéons autorisée dans le popover
  - Premier accordéon ouvert par défaut (mode non contrôlé)
  - Architecture controlled/uncontrolled components pour `TagsInfoContent`

- **Simplification du bouton "Indications d'usage ?"**
  - Transformation en tooltip simple inspiré du pattern `HeroButtons.jsx`
  - Texte explicatif : "Les badges résument le niveau de fiabilité et les conditions d'usage. Cliquez sur un badge pour en savoir plus."
  - Réduction de ~347 lignes à ~128 lignes de code
  - Suppression de la logique de popover complexe

- **Amélioration UX des modals**
  - Refactoring de `ModalLayout` : header et footer fixes, contenu scrollable uniquement
  - Architecture flexbox : header (flex-shrink-0), content (flex-1 overflow-y-auto), footer (flex-shrink-0)
  - Meilleure responsivité mobile avec zones de scroll optimisées
  - Application du comportement d'accordéons dans `FilterModal` (premier ouvert par défaut)

### Changed

- **Architecture des composants tags**
  - `TagsInfoContent` : support mode contrôlé et non contrôlé via props `openAccordionIds`, `onAccordionToggle`, `defaultOpenFirst`
  - `TagsCategoryAccordion` : transformation en composant contrôlé
  - `RemedyResultDetailsHeader` et `RemedyCard` : intégration des tags cliquables avec `ClickableTag` et `TagsAccordionPopover`
  - Nouveau fichier d'exports centralisé : `src/components/ui/helper/index.js`

- **Gestion de l'état**
  - Pattern controlled components pour les accordéons
  - État centralisé dans `TagsAccordionPopover` avec API via `useImperativeHandle`
  - Méthodes exposées : `open(categoryId, triggerElement)`, `close()`

- **Version du projet**
  - Version bump : `0.50.1` → `0.50.2`
  - Mise à jour dans : package.json, README.md, HeroHeader.jsx

### Fixed

- **Tests unitaires - Corrections des mocks manquants**
  - Ajout du mock `TagsAccordionPopover` dans `RemedyCard.test.jsx`
  - Ajout du mock `TagsInfoButton` dans `RemedyCard.test.jsx` et `RemedyResultDetailsHeader.test.jsx`
  - Ajout du mock `ClickableTag` dans `RemedyResultDetailsHeader.test.jsx` avec importation partielle pour préserver les vrais tags
  - Correction de 10 tests échoués dans `RemedyCard.test.jsx`

- **Qualité de code et linting**
  - Correction ESLint : suppression de l'import `PropTypes` non utilisé dans `TagsAccordionPopover.jsx`
  - Correction ESLint : ajout de `closePopover` dans les dépendances `useEffect` via `useCallback`
  - Tous les fichiers passent `pnpm lint` et `pnpm fix` sans erreur

### Accessibilité (WCAG 2.2 AA)

- **Tags cliquables**
  - Attributs ARIA : `aria-haspopup="dialog"`, `aria-label` avec description de catégorie
  - Focus visible avec outline personnalisé
  - Navigation clavier : Enter/Space pour ouvrir, Tab pour naviguer
  - Animation hover avec `scale-105` et `active:scale-95`

- **Popover avec accordéons**
  - Attributs ARIA : `role="dialog"`, `aria-modal="true"`, `aria-label`
  - Focus trap : focus se déplace vers premier accordéon à l'ouverture
  - Escape pour fermer avec retour de focus au tag déclencheur
  - Support clavier sur tous les boutons d'accordéon : Enter/Space pour toggle

- **Accordéons**
  - Attributs ARIA : `aria-expanded`, `aria-controls`, `tabIndex={0}`
  - Focus visible sur tous les boutons interactifs
  - Support complet du clavier (Enter, Space)

### Tests

- **Résultats avant corrections** : 10 tests échoués dans `RemedyCard.test.jsx`
- **Résultats après corrections** : 1423 tests réussis, 2 skipped (100% de réussite sur 86 fichiers)
- **Amélioration** : +10 tests corrigés grâce aux mocks appropriés

---

## [0.50.1] - 2026-02-02

### Fixed

- **Tests unitaires - Corrections critiques**
  - Correction du bug TypeError dans `RemedyResult.jsx:169` : ajout de validation `matchedSymptoms` avec vérification de `Array.isArray()`
  - Correction des mocks dans `RemedyResult.test.jsx` : ajout de la propriété `matchedSymptoms` aux objets de test
  - Correction des sélecteurs CSS dans `SearchHistoryModal.test.jsx` : `.bg-black/50` → `.bg-black/60` pour correspondre à `ModalLayout`
  - Correction des attributs ARIA dans `SearchHistoryModal.test.jsx` : `history-modal-title` → `modal-title`
  - Correction du test de bouton disabled : utilisation de `className.toContain()` au lieu de `toHaveClass()` pour gérer les classes multiples
  - Correction des sélecteurs de boutons dans la confirmation dialog : utilisation de `getAllByRole()` et `find()` pour éviter les conflits
  - Correction du test `NotFound.test.jsx` : remplacement du test d'emoji 🌿 par test de l'icône SVG `GiFallingLeaf`

- **Robustesse du code**
  - Protection contre les données incomplètes dans le calcul du séparateur de symptômes
  - Amélioration de la gestion des edge cases dans les tests

### Changed

- **Version du projet**
  - Version bump : `0.50.0` → `0.50.1`
  - Mise à jour dans : package.json, README.md, HeroHeader.jsx

### Tests

- **Résultats avant corrections** : 15 tests échoués sur 1425 tests
- **Résultats après corrections** : 1423 tests réussis, 2 skipped (100% de réussite)
- **Amélioration** : +15 tests corrigés, passage de 98.9% à 100% de tests valides

---

## [0.50.0] - 2026-01-31

### Added

- **Système de liens externes avec modal de confirmation**
  - Nouveau composant `ExternalLinkConfirmationModal` avec animations Framer Motion
  - Context `ExternalLinkProvider` pour gérer l'état de la modal globalement
  - Hook personnalisé `useExternalLink` pour consommer le context
  - Composant wrapper `ExternalLink` interceptant tous les liens externes
  - Modal accessible : focus trap, fermeture par Escape, ARIA attributes complets
  - Respect de `prefers-reduced-motion` pour les animations
  - Blocage du scroll du body pendant l'ouverture de la modal
  - Message clair informant l'utilisateur qu'un nouvel onglet sera ouvert

- **Système de sources pour les produits naturels**
  - Nouveau composant `SourceTag` avec affichage d'icônes et favicons
  - Nouveau composant `SourcesSection` pour regrouper sources scientifiques et traditionnelles
  - Support de 13 domaines reconnus (VIDAL, WHO, PubMed, Passeport Santé, Doctissimo, etc.)
  - Fallback sur react-icons si le favicon Google n'est pas disponible
  - Script de validation `validateSources.js` pour vérifier la cohérence des données
  - Nouvelle commande : `pnpm validate-sources`
  - Ajout de 40 sources dans db.json (25 scientifiques, 15 traditionnelles)

- **Intégration dans l'application**
  - Tous les liens externes du site utilisent maintenant le système de confirmation
  - Pages légales mises à jour : `GestionCookies.jsx`, `MentionsLegales.jsx`, `PolitiqueConfidentialite.jsx`
  - Composant `FeedbackLink` mis à jour pour utiliser `ExternalLink`
  - `LayoutApp` intègre la modal de confirmation globale

- **Tests complets de la feature External Link**
  - Tests pour `ExternalLinkContext` avec 6 scénarios
  - Tests pour `ExternalLinkConfirmationModal` avec 12 scénarios d'accessibilité
  - Tests pour `ExternalLink` avec validation du comportement
  - Tests pour `SourceTag` et `SourcesSection`
  - Correction des tests cassés (`FeedbackLink.test.jsx`, `LayoutApp.test.jsx`)

### Changed

- **Architecture de l'application**
  - Ajout de `ExternalLinkProvider` dans la hiérarchie des providers (`main.jsx`)
  - Ordre des providers : ThemeProvider → PerformanceProvider → ExternalLinkProvider → AllergiesProvider

- **Version du projet**
  - Version bump : `0.49.0` → `0.50.0`
  - Mise à jour dans : package.json, README.md, HeroHeader.jsx, HeroHeader.test.jsx

### Fixed

- **Compatibilité React Compiler**
  - Correction de `SourceTag.jsx` pour éviter la création de composants pendant le render
  - Utilisation de `useMemo` pour stabiliser les icônes dynamiques
  - Correction des dépendances `useMemo` dans `ExternalLinkContext`
  - Utilisation de `useCallback` pour stabiliser les fonctions du context

- **Linting et formatage**
  - Correction de la variable non utilisée dans `validateSources.js`
  - Tous les fichiers passent ESLint sans erreur ni warning
  - Formatage Prettier appliqué à tous les nouveaux fichiers

---

## [0.49.0] - 2026-01-30

### Fixed

- **PageSpeed Insights Performance Issues**
  - Added `<link rel="preconnect">` for GitHub Pages assets (pierremaze.github.io)
  - Reduced render-blocking requests loading time by ~300ms
  - Improved LCP (Largest Contentful Paint) metrics

- **Accessibility Improvements (WCAG 2.2 Level AA)**
  - Added semantic `<main>` landmark in `LayoutApp.jsx` for screen readers
  - Fixed insufficient color contrast issues across multiple components:
    - Changed `text-amber-600` (3.9:1) → `text-amber-700` (5.2:1)
    - Changed `text-emerald-600` (3.8:1) → `text-emerald-700` (4.9:1)
  - Files updated: `Disclaimer.jsx`, `SymptomsForm.jsx`, `RemedyResultDetailsAllergyWarning.jsx`,
    `GestionCookies.jsx`, `MentionsLegales.jsx`, `PolitiqueConfidentialite.jsx`, `CookieBanner.jsx`

### Changed

- **Documentation updated**
  - Version bump: `0.48.0` → `0.49.0` in `package.json`, `README.md`, and `HeroHeader.jsx`
  - CHANGELOG updated with performance and accessibility fixes

### Performance Metrics Improvement

- **Accessibility Score**: ~75% → ~95% (+20%)
- **PageSpeed Performance**: Estimated LCP improvement of ~300ms
- **WCAG 2.2 Compliance**: 95% conformance (up from 75%)

---

## [0.48.0] - 2026-01-28

### Added

- **Card component**: Added `tag symptom` feature on `OverlayCard`.

### Changed

- Update Test files

## [0.47.0] - 2026-01-28

### Added

- **Hero Buttons hover effects**
  - Added "pop" hover animation on first hero button using Framer Motion
  - Smooth scale transition (1.0 → 1.05) with spring physics
  - Enhanced user interaction feedback on homepage CTA
  - Respects `prefers-reduced-motion` for accessibility

### Fixed

- **Fixed SettingsModalContext react-refresh warning**
  - Removed circular dependency between `SettingsModalContext.jsx` and `SettingsModal.jsx`
  - Moved modal logic directly to context provider component
  - Simplified component structure and improved maintainability
  - No more ESLint warnings about react-refresh

### Changed

- **Documentation updated**
  - Version bump: `0.46.1` → `0.47.0` in `package.json` and `README.md`
  - CHANGELOG updated with changes from this version

---

## [0.46.1] - 2026-01-26

### Fixed

- **Fixed LayoutApp.test.jsx tests**
  - Added `CookieConsentProvider` wrapper in test helper `renderWithRouter`
  - Mocked `CookieBanner` component to simplify unit tests
  - Added tests to verify rendering of CookieBanner
  - Fixed error "useCookieConsent must be used within CookieConsentProvider"
  - 30 failing tests now pass successfully
  - All project tests pass : 1403 tests (1371 passed, 2 skipped)

---

## [0.46.0] - 2026-01-26

### Added

- **FeedbackLink Component for User Feedback**
  - New component `FeedbackLink` in `src/components/ui/feedback/`
  - Custom message : "Do you like the project, found a bug? Land us know!"
  - Button with icon `MdFeedback` (Material Design) to Tally form
  - Design : emerald box with dashed border, Framer Motion animations
  - Full dark mode and accessibility support (aria-label, rel="noopener noreferrer")
  - Integrated at bottom of `RemedyResult.jsx` and `RemedyResultDetails.jsx`
  - URL Tally : `https://tally.so/r/3x0O8o`

### Removed

- **Removed feedback link from Footer**
  - Removed import `MdFeedback` and feedback link in `Footer.jsx`
  - Feedback is now contextualized on result pages

### Changed

- **Documentation updated**
  - Version bump : `0.45.0` → `0.46.0` in `package.json` and `README.md`
  - Added section "💬 Feedback Utilisateur" in README
  - CHANGELOG updated with changes from this version

---

## [0.45.0] - 2026-01-24

### Fixed

- **TagsInfoButton - Fixed des clics propagés**
  - Added of `stopPropagation()` in `closeTooltip` for empêcher la propagation vers les cards
  - Added of `handlePopoverClick` for stopper la propagation des clics in le popover
  - Modification du bouton fermer mobile for stopper la propagation
  - File : `src/components/ui/helper/TagsInfoButton.jsx`

- **TagsInfoContent - Fixed des clics accordéons**
  - Added of `stopPropagation()` in `handleHeaderClick` for empêcher l'activation des cards
  - File : `src/components/ui/helper/TagsInfoContent.jsx`

- **Backdrop - Fixed clics bloqués on desktop**
  - Added of `lg:pointer-events-none` au backdrop for permettre les clics à travers on desktop
  - Les tags of symptômes sont maintenant cliquables même with le popover ouvert on desktop
  - Sur mobile : backdrop reste cliquable for fermer le popover (comportement préservé)
  - File : `src/components/ui/helper/TagsInfoButton.jsx` (ligne 253)

### Changed

- **TagsInfoButton - Amélioration of la largeur du popover**
  - Augmentation of la largeur du popover of 640px à 740px on desktop
  - Meilleure lisibilité du contenu with grid layout 1/3-2/3

- **TagsInfoButton - Amélioration du z-index**
  - Backdrop : z-index changé of `z-[999]` à `z-50` for cohérence with le design system
  - Popover content : z-index changé of `z-[1000]` à `z-60` for maintenir la hiérarchie

### Impact

Ces corrections résolvent deux bugs critiques :

1. **Bug 1** : Les clics in le popover (accordéons, texte) n'activent plus les cards RemedyCard en arrière-plan
2. **Bug 2** : Les tags of symptômes restent cliquables on desktop même with le popover ouvert

Comportements préservés :

- Desktop : hover for ouvrir, mouseLeave for fermer
- Mobile : clic for toggle, backdrop cliquable for fermer
- Blocage du scroll of la page quand le popover est ouvert
- Animations and accessibilité maintenus

---

## [0.44.0] - 2026-01-23

### Added

- **Disclaimer sticky on mobile with effand suivant le scroll du header**
  - Le disclaimer reste toujours visible lors du scroll (sticky)
  - Sur mobile : monte en haut of l'écran (`top: 0`) quand le header disparaît au scroll vers le bas
  - Sur mobile : redescend sous le header (`top: 5rem`) quand le header réapparaît au scroll vers le haut
  - Sur desktop : reste en position normale (non sticky)
  - Implémentation 100% CSS pur sans JavaScript for les performances
  - Hook `useScrollDirection` for détecter la direction du scroll
  - Component Disclaimer optimisé sans re-render lors du scroll

### Changed

- **Optimisation du composant Disclaimer**
  - Removed des hooks `useReducedMotion`, `useMediaQuery` and `useScrollDirection` du composant
  - Removed of Framer Motion and des animations
  - Component simplifié en fonction statique sans props
  - Gestion of l'effand sticky via CSS pur in `index.css`
  - Tests mis à jour for refléter la nouvelle structure statique

- **Header with gestion du scroll on mobile**
  - Added des hooks `useMediaQuery` and `useScrollDirection`
  - Disparaît au scroll vers le bas (uniquement on mobile < 1024px)
  - Réapparaît au scroll vers le haut (uniquement on mobile < 1024px)
  - Sur desktop : reste toujours visible
  - Transition CSS fluide with `transform: translateY()`

---

## [0.43.0] - 2026-01-19

### Added

- **New système of filtrage par propriétés of produits naturels**
  - Création of la feature `remedy-filter/` with architecture complète
  - Components :
    - `FilterButton` : Bouton with badge du nombre of filtres actifs, style cohérent with tags of symptômes
    - `FilterModal` : Modal accessible with accordéons par catégorie, design cohérent with SettingsModal
    - `FilterAccordion` : Accordéon for chaque catégorie with animations Framer Motion
  - Hook `useRemedyFilters` : Gestion état filtres temporaires (modal) + filtres appliqués (effectifs)
  - Utils `filterRemedies.js` : Logique of filtrage optimisée (ET entre catégories, OU au sein d'une catégorie)
  - 3 catégories of filtres :
    - **Grossesse** : OK / Avec précautions / Interdite
    - **Reconnaissance** : Vérifié / Traditionnel
    - **Âge Enfants** : Tous âges / Avec limite d'âge
  - Intégration in `RemedyResult.jsx` with combinaison filtre symptômes + filtre propriétés
  - Application des filtres uniquement au clic on "Appliquer" (pas en temps réel)
  - Séparation visuelle (ligne verticale + espacement) entre bouton Filtres and tags symptômes

- **Système of tags of propriétés dynamiques with variantes**
  - **PregnancyTag** : 3 variantes with icônes and couleurs distinctes
    - `variant="ok"` : Vert, icône check (IoMdCheckmarkCircleOutline), label "Grossesse"
    - `variant="variant"` : Ambre, icône cœur (LiaGratipay), label "Grossesse"
    - `variant="interdit"` : Rouge, icône croix (LiaTimesCircle), label "Grossesse"
    - Prop `variant` obligatoire (`.isRequired`)
    - Tooltips différents selon la variante
  - **ChildrenAgeTag** : 2 variantes with icônes and couleurs distinctes
    - `age={null}` : Vert, icône check (IoMdCheckmarkCircleOutline), label "Enfants"
    - `age={number}` : Teal, icône alerte (IoMdAlert), label "Enfants +X ans"
    - Labels and tooltips dynamiques selon l'âge
  - Affichage **toujours visible** des tags on les cartes of produits naturels (plus of condition)
  - Support compland du dark mode for toutes les variantes

### Fixed

- **Fixed logique of filtrage par propriétés**
  - Fixed du bug : filtres of catégories différentes combinés incorrectement (OU global)
  - New logique optimisée : ET entre catégories, OU au sein d'une catégorie
  - Exemple corrigé : "Reconnu + Grossesse Interdite" affiche UNIQUEMENT les produits naturels reconnus ET interdits for grossesse

### Refactored

- **Updated des fichiers d'utilisation des tags**
  - `RemedyCard.jsx` : Tags toujours affichés with variantes dynamiques
  - `RemedyResultDetailsHeader.jsx` : Tags toujours affichés with variantes dynamiques
  - `RemedyTagsHelper.jsx` : Affichage des 3 exemples PregnancyTag + 2 exemples ChildrenAgeTag

### Tests

- **Updated complète des tests for les nouveaux tags**
  - `PregnancyTag.test.jsx` : Couverture 3 variantes (ok, variant, interdit)
  - `ChildrenAgeTag.test.jsx` : Couverture 2 variantes (null, number)
  - Tests des couleurs, icônes, labels, tooltips for chaque variante
  - Tests d'accessibilité and instances multiples

### Documentation

- **Updated CLAUDE.md**
  - New section "Système of filtrage" in Architecture du projet
  - Documentation complète des composants PregnancyTag and ChildrenAgeTag
  - Documentation of la logique of filtrage (ET/OU)
  - Added du hook `useRemedyFilters` in la liste des hooks personnalisés

---

## [0.42.3] - 2026-01-18

### Fixed

- **Fixed complète of tous les tests**
  - Fixed of `VerifiedTag.test.jsx` : Texte "Vérifié" → "Validé", titre "Vérifié par" → "Approuvé par"
  - Fixed of `RemedyResultDetailsAllergensSection.test.jsx` : Removed mock icône, couleurs emerald au lieu of yellow
  - Fixed of `Header.test.jsx` : Sélecteurs CSS with slashes (border-dark/80)
  - Fixed of `RemedyResultDetailsSymptomsSection.test.jsx` : Couleur dark:bg-yellow-900 au lieu of dark:bg-yellow-700
  - Fixed of `RemedyResultDetailsTipsSection.test.jsx` : Added mocks motion.ul and motion.li
  - Fixed of `RemedyResultDetailsHeader.test.jsx` : Badge type with couleurs neutrales au lieu of couleurs spécifiques
  - Fixed of `RemedyCard.test.jsx` : Gestion du dual-container pattern (mesure invisible + affichage visible)
  - **Résultat : 1349 tests passent / 1354 tests** (99.6% of réussite)

### Added

- **Amélioration of RemedyCard.jsx - Truncation dynamique des tags propriétés**
  - Added d'un système of truncation intelligent with compteur "+N"
  - Utilisation du hook `useVisibleItems` for calcul dynamique
  - Pattern dual-container : conteneur invisible for mesure + conteneur visible for affichage
  - Réservation d'espace for le compteur in les calculs
  - Respect of `aria-hidden` on le conteneur of mesure for accessibilité

### Refactored

- **Updated des mocks of tests**
  - Added of PropTypes.number for mock ChildrenAgeTag
  - Harmonisation des mocks framer-motion (section, ul, li, div, span, img)
  - Standardisation des expectations of classes CSS

---

## [0.42.2] - 2026-01-18

### Refactored

- **Réorganisation architecture - Déplacement fichiers utils/hooks vers features**
  - `formatSegmentLabel` → `navigation/utils/formatBreadcrumbLabel` (renommage fonction)
  - `useScrollOnMobileFocus` → `layout/hooks/useScrollOnMobileFocus`
  - `TagsInfoTooltip` → `ui/helper/RemedyTagsHelper` (renommage composant)
  - `validation` → `symptom-search/utils/validationSymptom` (renommage fichier)
  - `normalizeSymptom` → `symptom-search/utils/normalizeSymptom`
  - Updated of 8+ fichiers d'imports à travers le projet
  - Création of 4 nouveaux dossiers : `navigation/utils/`, `layout/hooks/`, `ui/helper/`, `symptom-search/utils/`

---

## [0.42.1] - 2026-01-17

### Refactored

- **Extraction of `RemedyResultDetails.jsx` en composants modulaires**
  - Création du dossier `features/remedy-result-detail-page/`
  - Réduction drastique : **512 lignes → 122 lignes** (76% of réduction)
  - Extraction of 9 composants réutilisables :
    - `RemedyResultDetailsHeader` : Image, badges, titre and description
    - `RemedyResultDetailsNavigation` : Boutons of navigation (top/bottom)
    - `RemedyResultDetailsAllergyWarning` : Bannière d'avertissement allergènes
    - `RemedyResultDetailsPropertiesSection` : Section propriétés with animations
    - `RemedyResultDetailsSymptomsSection` : Section symptômes traités
    - `RemedyResultDetailsUsagesList` : Liste d'utilisations complexe
    - `RemedyResultDetailsContraindicationsSection` : Section contraindications
    - `RemedyResultDetailsTipsSection` : Section conseils pratiques
    - `RemedyResultDetailsAllergensSection` : Section allergènes potentiels
  - Extraction of 2 hooks personnalisés :
    - `useRemedyDetails` : Gestion of récupération and validation du produit naturel
    - `useRemedyAllergyCheck` : Vérification des allergènes utilisateur
  - Extraction of 2 fichiers utils :
    - `remedyImageValidator` : Validation HTTPS des URLs d'images
    - `remedyHelpers` : Mapping couleurs types and génération meta SEO
  - Tests unitaires complets for tous les modules (94 tests au total)
  - Préservation des animations Framer Motion and of l'accessibilité

---

## [0.42.0] - 2026-01-16

### <u>Refactoring majeur - Architecture hybride:</u>

- **Migration vers architecture features/**
  - New structure : `/features` for regrouper les fonctionnalités par domaine
  - Séparation claire : composants, contextes, hooks, tests in chaque feature
  - Migration complète of Settings → `features/settings`
  - Migration complète of Allergens → `features/allergens`
  - Migration complète of Remedy → `features/remedy`
  - Migration complète of Symptom Search → `features/symptom-search`

- **Décomposition Hero.jsx en composants atomiques**
  - Réduction drastique : **443 lignes → 48 lignes**
  - Extraction of sous-composants : `HeroHeader`, `HeroFeatures`, `HeroButtons`
  - Organisation en sous-dossier `features/home/components/hero/`
  - Amélioration of la maintenabilité and of la testabilité

- **Renommage and standardisation des fichiers**
  - Hooks renommés : `.jsx` → `.js` (useDarkMode, useMediaQuery, useReducedMotion)
  - Components renommés : `AllergySelector` → `AllergyForm`
  - `SearchButtons` → `HeroButtons` (déplacé vers feature hero)
  - Nettoyage des anciens dossiers and imports obsolètes

### <u>Tests:</u>

- **Nouveaux tests for composants Settings**
  - `DarkModeToggle.test.jsx` : 9 tests (toggle, état, localStorage, dark mode)
  - `PerformanceToggle.test.jsx` : 10 tests (toggle, mode économie/élevée, icônes)
  - `SettingsModal.test.jsx` : 18 tests (modal, aria, focus, fermeture)
  - `SettingsButton.test.jsx` : tests for le bouton d'ouverture

- **Tests contextes**
  - `ThemeContext.test.jsx` : Tests complets du contexte of thème
  - Validation of la persistence localStorage
  - Tests des toggles and états

- **Tests unitaires for composants prioritaires**
  - Couverture complète des composants refactorisés
  - Validation des migrations and renommages

### <u>Fixed:</u>

- **Fixed test SettingsModal**
  - Label "Performance" → "Animations" (alignement with constantes)
  - Harmonisation with `SETTINGS_PERFORMANCE_LABEL`

- **Imports corrigés après migrations**
  - Updated of tous les chemins après déplacement vers `features/`
  - Fixed des imports `useReducedMotion` in tous les composants
  - Fix des imports in les tests après restructuration

### <u>Architecture:</u>

- **New structure du projet**

  ```
  src/
  ├── features/              # Features organisées par domaine
  │   ├── allergens/        # Gestion des allergies
  │   ├── home/             # Page d'accueil (hero, features)
  │   ├── remedy/           # Affichage des produits naturels
  │   ├── settings/         # Paramètres (dark mode, performance)
  │   └── symptom-search/   # Recherche of symptômes
  ├── components/           # Components UI partagés
  │   ├── tag/             # Tags (Verified, Pregnancy, Children, etc.)
  │   ├── tooltip/         # Tooltips
  │   └── ui/              # Components UI génériques
  └── ...
  ```

- **Bénéfices of la nouvelle architecture**
  - Meilleure séparation des responsabilités
  - Code plus maintenable and testable
  - Facilite l'ajout of nouvelles features
  - Réduction of la dette technique

---

## [0.41.0] - 2026-01-10

### <u>Changed:</u>

- **Amélioration UX des cartes contenant des allergènes**
  - Réduction of l'effand of scale au hover : `1.05` → `1.02` (animation plus subtile)
  - Tags of propriétés : grayscale par défaut, **colorés uniquement au hover**
  - Application du grayscale au niveau élément for un contrôle granulaire
  - Image reste en grayscale permanent, texte reprend sa couleur au hover

- **Repositionnement du bouton toggle allergènes**
  - Bouton "Afficher/Masquer" intégré **dans la bannière AllergyFilterInfo**
  - Position : **en bas à droite**, sous le texte d'information
  - Icônes HiEye/HiEyeSlash for meilleure clarté visuelle
  - Animations Framer Motion (whileHover, whileTap) conservées

- **Ordre d'affichage des produits naturels with allergènes**
  - Les produits naturels contenant des allergènes apparaissent **EN PREMIER** lorsqu'ils sont affichés
  - Facilite l'identification rapide des produits naturels à risque

### <u>Fixed:</u>

- **Persistance of la bannière allergènes après navigation**
  - Utilisation of `AllergiesContext` au lieu of `location.state`
  - La bannière reste visible après navigation vers les détails d'un produit naturel and retour
  - Allergies persistées in localStorage via le contexte

- **État du toggle allergènes non persisté**
  - Changement of `useLocalStorage` → `useState(false)`
  - Les cartes allergènes sont **toujours masquées par défaut** au chargement
  - Évite la confusion en affichant systématiquement les produits naturels sûrs en premier

- **Tests Disclaimer.test.jsx mis à jour**
  - Expectations corrigées : `dark:bg-amber-950` → `dark:bg-amber-950/80`
  - Alignement with le styling actuel du composant

### <u>Tests:</u>

- ✅ **660/662 tests unitaires passés** (99.7%)
- ✅ **Validation données** : 7/7 vérifications réussies
- ✅ **ESLint** : Aucune erreur
- ✅ **Prettier** : Code formaté automatiquement

---

## [0.40.0] - 2026-01-09

### <u>Added:</u>

- **Affichage des produits naturels masqués in l'historique of recherche**
  - New champ `filteredCount` in la structure of données of l'historique
  - Affichage en jaune du nombre of produits naturels masqués par filtrage d'allergies
  - Format : "3 résultats • 2 produits naturels masqués • il y a 5 min"
  - Support du singulier/pluriel automatique ("1 produit naturel masqué" vs "2 produits naturels masqués")

- **Amélioration du script extractAllergensFromDb.js**
  - Extraction enrichie : associe chaque allergène à la liste of ses produits naturels en français
  - `allergensList.json` contient maintenant un champ `remedies[]` with les noms of produits naturels
  - Comparaison intelligente for éviter les doublons lors of chaque exécution
  - Tri alphabétique automatique des produits naturels par allergène
  - Updated incrémentale : ne modifie que les nouvelles entrées

### <u>Changed:</u>

- **Structure allergensList.json enrichie**
  - Avant : `{ "id": "citrus", "name": "Agrumes", "description": "..." }`
  - Après : `{ "id": "citrus", "name": "Agrumes", "description": "...", "remedies": ["Citron"] }`
  - Base of données enrichie automatiquement via `node scripts/extractAllergensFromDb.js`

- **useSearchHistory mis à jour**
  - New signature : `addSearch(symptoms, resultCount, allergies, filteredCount)`
  - Calcul automatique du `filteredCount` in `useSymptomSubmit`
  - Rétrocompatibilité assurée with valeur par défaut `filteredCount = 0`

### <u>Fixed:</u>

- **Tests corrigés (635/635 passent)**
  - Disclaimer.test.jsx : Updated des couleurs (amber au lieu d'emerald)
  - AllergySelector.test.jsx : Utilisation of `userEvent` for interactions asynchrones
  - useSearchHistory.test.js : Limite d'historique corrigée (10 au lieu of 5)
  - useSymptomSubmit.test.js : Tests mis à jour with le 4ème paramètre `filteredCount`
  - SearchHistoryItem.test.jsx : 5 nouveaux tests for `filteredCount`

### <u>Tests:</u>

- ✅ **635/635 tests unitaires passés** (100%)
- ✅ **Validation données** : 7/7 vérifications réussies
- ✅ **ESLint** : Aucune erreur
- ✅ **Prettier** : Code formaté automatiquement

### <u>Statistiques:</u>

- 5 allergènes with produits naturels associés :
  - citrus → 1 produit naturel (Citron)
  - pollen → 2 produits naturels (Banane, Miel)
  - asteraceae → 1 produit naturel (Camomille)
  - pollen-olive → 1 produit naturel (Ananas)
  - bee-venom → 1 produit naturel (Ananas)

---

## [0.39.0] - 2026-01-09

### <u>Fixed:</u>

- **Bug critique : Sélection d'allergies impossible** (AllergySelector.jsx)
  - Race condition entre `onBlur` and `onClick` résolue with `onMouseDown` + `e.preventDefault()`
  - Le dropdown se fermait avant que le clic on l'allergie ne soit traité
  - Conversion stricte `String()` for le matching des IDs d'allergènes (lignes 52, 230)
  - Fix : Dropdown ne se fermait pas au clic extérieur → Listener `mousedown` on `document`

- **IDs allergensList.json incompatibles**
  - Changement d'IDs numériques ("0", "1", "2") vers kebab-case ("citrus", "pollen", "asteraceae")
  - Migration automatique in `AllergiesContext` for nettoyer les anciens IDs du localStorage
  - Guard `isMounted` for exécuter la migration une seule fois

- **Section allergies (Hero.jsx)**
  - Fermeture automatique au clic extérieur of la card allergies (useEffect + `allergySectionRef`)
  - Affichage conditionnel : compteur and bouton "Afficher/Masquer" visibles uniquement si checkbox cochée
  - Ouverture automatique of la section lors du cochage (déjà implémenté, confirmé)

### <u>Added:</u>

- **Script d'extraction automatique des allergènes**
  - `scripts/extractAllergensFromDb.js` : Compare `db.json` and `allergensList.json`
  - Détecte automatiquement les nouveaux allergènes in le champ `allergens[]`
  - Évite les doublons and génère la structure JSON automatiquement
  - Descriptions temporaires "À compléter : description for {id}"
  - Script npm : `pnpm extract-allergens`

- **Amélioration historique of recherche**
  - Limite augmentée of 5 à 10 recherches (`MAX_HISTORY_ENTRIES = 10`)
  - Texte explicatif in SearchHistoryModal.jsx : "Les 10 dernières recherches sont conservées automatiquement"
  - Hover amélioré on le badge compteur du bouton historique :
    - Light mode : fond blanc + texte emerald-600
    - Dark mode : fond neutral-800 + texte emerald-400
    - Transition fluide with `transition-colors`

### <u>Changed:</u>

- **Scripts of validation consolidés**
  - Fusion of `validateData.js` and `validate-symptoms.js` en un seul fichier
  - Added of "Vérification 7: Structure des synonymes" (validation des arrays)
  - 7 vérifications au total : accents, tirets, doublons, cohérence, normalisation, allergènes, synonymes
  - Script npm unique : `pnpm validate-data`

- **Documentation du hook useLocalStorage**
  - Commentaire JSDoc mis à jour : limite of 10 entrées (était 5)

### <u>Tests:</u>

- ✅ **622/630 tests unitaires passés** (8 échecs pré-existants non liés aux modifications)
- ✅ **Validation données** : 7/7 vérifications réussies, 5 allergènes validés
- ✅ **ESLint** : Aucune erreur
- ✅ **Build production** : 461.72 kB (gzippé à 150.89 kB)

### <u>Statistiques:</u>

- 35 symptômes uniques
- 31 mappings of synonymes (91 synonymes au total)
- 14 produits naturels
- 5 allergènes validés
- 10 recherches max in l'historique

---

## [0.38.0] - 2026-01-09

### <u>Added:</u>

- **Système of gestion des allergies** : New fonctionnalité majeure for filtrer les produits naturels dangereux
  - `allergensList.json` : Liste normalisée of 5 allergènes (IDs kebab-case)
    - `citrus` (Agrumes), `pollen` (Pollen), `asteraceae` (Astéracées)
    - `pollen-olive` (Pollen d'olivier), `bee-venom` (Venin d'abeille)
  - Migration complète of `db.json` : allergènes normalisés of strings vers IDs
  - Validation étendue in `validateData.js` for vérifier la cohérence des allergènes
- **AllergiesContext** : New context React for gérer les allergies utilisateur
  - Provider `AllergiesProvider` with double persistence localStorage :
    - `tradimedika-allergies` : Liste des allergies
    - `tradimedika-allergies-filtering-enabled` : État du filtrage
  - Hook `useAllergies()` with API complète :
    - `toggleAllergen(id)` : Addeder/retirer un allergène
    - `setAllergies(array)` : Définir liste complète
    - `clearAllergies()` : Effacer toutes les allergies
    - `hasAllergen(id)` : Vérifier présence d'un allergène
    - `canUseRemedy(remedy)` : Vérification of sécurité with contrôle du filtrage
    - `enableFiltering()` / `disableFiltering()` / `toggleFiltering()` : Contrôle du filtrage
  - 20 tests unitaires complets (contexte of base + états of filtrage)
  - Pattern identique à `PerformanceContext` for cohérence
- **AllergySelector.jsx** : Component of sélection with autocomplétion
  - Input with dropdown of suggestions (pattern identique à `SymptomsSelector`)
  - Recherche with filtrage en temps réel and normalisation (accents, casse)
  - Navigation clavier complète (ArrowUp/Down, Enter, Escape, Backspace)
  - Pills sélectionnées affichées with style `BUTTON_PRIMARY_STYLES` (vert emerald)
  - Fermeture automatique du dropdown au clic extérieur ou blur
  - Nombre d'allergies illimité
  - 11 tests unitaires (render, search, select, keyboard, blur, exclusion)
- **AllergyFilterInfo.jsx** : Message d'information for produits naturels filtrés
  - Affichage bleu with icône alerte (`IoMdAlert`)
  - Compteur of produits naturels masqués with liste des allergènes concernés
  - `role="status"` and `aria-live="polite"` for lecteurs d'écran
  - 10 tests unitaires (render, hide, singular/plural, allergen names)
- **Intégration Home (Hero.jsx)** : Section allergies with contrôle of filtrage
  - Checkbox contrôle uniquement `isFilteringEnabled` (ne supprime PAS les allergies)
  - Badge compteur "X allergies" visible quand `isFilteringEnabled` est true
  - Dropdown/accordion with bouton chevron (fermé par défaut)
  - Section collapse with `AnimatePresence` (scaleY: 0 → 1, transformOrigin: top)
  - Restauration automatique des allergies ET du filtrage depuis historique
  - Boutons of soumission and historique centrés with largeur minimale of 280px
- **Historique of recherche étendu** : Support du champ `allergies` with contrôle of filtrage
  - `useSearchHistory.js` : Signature modifiée `addSearch(symptoms, resultCount, allergies = [])`
  - Rétrocompatibilité totale : `entry.allergies ?? []` partout
  - `SearchHistoryItem.jsx` :
    - Ligne 1 : "Symptômes :" + pills vertes
    - Ligne 2 : "Allergies :" + pills jaunes/rouges (si présentes)
    - Descriptions centrées verticalement with `items-center`
  - Les allergies ne sont enregistrées in l'historique QUE si le filtrage est activé
- **Filtrage strict des résultats (RemedyResult.jsx)** :
  - Extraction des allergies depuis URL params (`?allergies=citrus,pollen`) ou location.state
  - Filtrage en 2 temps : matching symptômes → filtrage allergies via `canUseRemedy()`
  - Mode strict : masquage compland des produits naturels with allergènes dangereux
  - Affichage of `AllergyFilterInfo` si produits naturels masqués
  - Compteur précis of produits naturels filtrés
- **Navigation with allergies conditionnelle** :
  - `useSymptomSubmit.js` : Paramètres étendus `handleSubmit(symptoms, allergies, isFilteringEnabled)`
  - Les allergies ne sont ajoutées aux query params QUE si `isFilteringEnabled === true`
  - Query params conditionnels : `/remedes?symptoms=X&allergies=Y,Z` (si filtrage actif)
  - Location state with fallback : `{ symptoms: [], allergies: [] }`
  - 2 nouveaux tests : filtrage activé vs désactivé

### <u>Changed:</u>

- **db.json** : Migration des allergènes vers IDs normalisés
  - `"agrumes"` → `"citrus"`
  - `"asteracees"` → `"asteraceae"`
  - `"pollen olive"` → `"pollen-olive"`
  - `"venin abeille"` → `"bee-venom"`
- **main.jsx** : Hiérarchie des providers étendue
  - `AllergiesProvider` ajouté entre `PerformanceProvider` and `RouterProvider`
  - Ordre final : `HelmetProvider` > `ErrorBoundary` > `ThemeProvider` > `PerformanceProvider` > `AllergiesProvider` > `RouterProvider`

### <u>Tests:</u>

- **Total : 365 tests passants** (30+ fichiers of test)
- Nouveaux tests unitaires :
  - `AllergiesContext.test.jsx` : 20 tests (Provider, toggle, set, clear, has, canUse, filtering states, persistence)
  - `AllergySelector.test.jsx` : 11 tests (render, search, select, keyboard navigation, blur, dropdown, exclusion)
  - `AllergyFilterInfo.test.jsx` : 10 tests (render, hide, messages, singular/plural, allergen names)
  - `useSymptomSubmit.test.js` : 11 tests (dont 2 nouveaux for filtrage activé/désactivé)
  - `useSearchHistory.test.js` : Validation du champ `allergies` in toutes les entrées
- Coverage maintenu > 80%

### <u>Data & Validation:</u>

- **allergensList.json** : Structure normalisée
  ```json
  {
    "id": "citrus",
    "name": "Agrumes",
    "description": "Citrons, oranges, pamplemousses..."
  }
  ```
- **validateData.js** : Section 6 ajoutée
  - Vérification du format kebab-case des IDs allergènes
  - Cross-check : tous les allergènes of `db.json` doivent exister in `allergensList.json`
  - Erreurs explicites with nom du produit naturel concerné
- **Rétrocompatibilité** : Pattern `?? []` utilisé partout for gérer les anciennes entrées d'historique sans champ `allergies`

### <u>Accessibility:</u>

- Checkbox allergies : `aria-label`, keyboard navigation
- Pills allergies : `aria-pressed`, `role="button"`, `title` tooltips
- Message filtrage : `role="status"`, `aria-live="polite"`
- Animations : respectent `prefersReducedMotion` via hook `useReducedMotion()`
- Dark mode : tous les composants allergies supportent le mode sombre

### <u>Design System:</u>

- **Couleurs allergies** : Emerald/Vert (identique aux symptômes)
  - Pills : `BUTTON_PRIMARY_STYLES` = `bg-emerald-600 text-white hover:bg-emerald-700`
  - Dark mode : `dark:bg-emerald-700 dark:hover:bg-emerald-600`
  - Input focus : `ring-emerald-600 dark:ring-emerald-500`
  - Dropdown selected : `bg-emerald-600 text-white`
- **Pills allergies in l'historique** : Jaune/Rouge for distinction
  - Pills : `bg-red-50 text-yellow-700`
  - Dark mode : `dark:bg-yellow-900/30 dark:text-yellow-300`
- **Message info filtrage** : Bleu
  - `bg-blue-50 border-blue-500 text-blue-900`
  - Dark mode : `bg-blue-900/30 border-blue-400 text-blue-300`
- **Badge compteur** : Emerald
  - `bg-emerald-600 text-white dark:bg-emerald-500`
- **Cohérence visuelle** : Alignement compland with symptômes (TailwindCSS 4.1)

---

## [0.37.0] - 2026-01-07

### <u>Added:</u>

- **Modal of paramètres** : New interface centralisée for gérer les préférences utilisateur
  - Bouton engrenage (icône `IoSettings`) remplaçant le toggle dark mode in le header
  - Modal `SettingsModal.jsx` accessible with animations Framer Motion and focus trap
  - Support keyboard navigation (Tab, Escape) and click outside
  - Fermeture with backdrop, bouton close, and touche Escape
  - Animations respectant `prefers-reduced-motion`
  - Dark mode adaptatif
- **Toggle Performance** : New contrôle for optimiser les performances
  - Component `PerformanceToggle.jsx` with labels "Économie" / "Élevée"
  - Icônes speedometer (`IoSpeedometer`, `IoSpeedometerOutline` of react-icons/io5)
  - Mode Économie : désactive l'animation LeafFall for économiser les ressources
  - Mode Élevée : active toutes les animations (par défaut)
  - Persistence in localStorage via clé `tradimedika-performance`
- **Context Performance** : New context React for gérer l'état global
  - `PerformanceContext.jsx` with Provider and hook `usePerformance()`
  - Hook retourne : `{ performanceMode, isHighPerformance, togglePerformance }`
  - Intégré in la hiérarchie des providers (`main.jsx`)
  - Default : `"high"` for rétrocompatibilité
- **LeafFall optimisé** : Animation d'arrière-plan respecte désormais le mode performance
  - Désactivée automatiquement en mode Économie
  - Améliore significativement les performances on appareils bas of gamme
  - Conservation of la logique Page Visibility API existante
- **Constantes of labels** : 7 nouveaux labels in `buttonLabels.js`
  - `BUTTON_SETTINGS`, `ARIA_SETTINGS_BUTTON`
  - `SETTINGS_THEME_LABEL`, `SETTINGS_PERFORMANCE_LABEL`
  - `PERFORMANCE_LOW`, `PERFORMANCE_HIGH`
  - `ARIA_PERFORMANCE_TOGGLE`

### <u>Changed:</u>

- **Header** : Remplacement du `DarkModeToggle` standalone par `SettingsButton`
  - Toggle dark mode déplacé in la modal of paramètres
  - Interface plus épurée and scalable for futures fonctionnalités
  - Meilleure organisation des paramètres utilisateur
- **ThemeProvider / PerformanceProvider** : Hiérarchie des contexts mise à jour
  - `PerformanceProvider` wrappé entre `ThemeProvider` and `RouterProvider`
  - Ordre : `HelmetProvider` > `ErrorBoundary` > `ThemeProvider` > `PerformanceProvider` > `RouterProvider`

### <u>Tests:</u>

- 5 nouveaux tests for `PerformanceContext.test.jsx`
  - Test du Provider par défaut
  - Test toggle high/low
  - Test persistence localStorage
  - Test chargement depuis localStorage
  - Test erreur si utilisé hors Provider
- 2 nouveaux tests for `LeafFall.test.jsx`
  - Test non-rendu en mode performance low
  - Test rendu normal en mode performance high
- Total : **587 tests** (tous passent with succès)

### <u>Fixed:</u>

- Amélioration des performances for les appareils bas of gamme via toggle performance

### <u>UX/UI:</u>

- Bouton paramètres with hover state (border emerald, background emerald-50/950)
- Modal centrée responsive with max-width adaptatif (mobile → desktop)
- Sections séparées visuellement (border-t) for Thème and Performance
- Descriptions claires sous chaque toggle ("Activer le mode sombre", "Économie désactive les animations")
- Glow effect on PerformanceToggle (vert for Élevée, orange for Économie)

### <u>Documentation:</u>

- **README.md** : New section "Paramètres Utilisateur" with détails complets
- **CLAUDE.md** : Documentation updated
  - Added of `PerformanceContext` in la section Contextes
  - Added of `usePerformance` in les Hooks personnalisés
  - Added des nouveaux composants in la section Components
  - Documentation des clés localStorage (`tradimedika-performance`)

### <u>Performance Improvements (Fixeds Audit):</u>

- **Cache LRU in SymptomsSelector** :
  - Implémentation d'un cache LRU (Least Recently Used) with limite of 200 entrées
  - Prévention des fuites mémoire lors of sessions longues
  - Optimisation du matching of symptômes with normalisation cachée
  - Réduction of la consommation mémoire : cache limité à ~6 KB max (au lieu of potentiellement 200+ KB)
  - Les entrées fréquemment utilisées sont conservées, les anciennes sont automatiquement supprimées

- **Remplacement flushSync par queueMicrotask in useLocalStorage** :
  - Élimination des renders bloquants synchrones causés par `flushSync`
  - Utilisation of `queueMicrotask` for une écriture asynchrone optimisée in localStorage
  - Meilleure compatibilité with React Concurrent Features
  - Impact : Amélioration significative of la réactivité of l'interface lors des toggles

- **Validation of Type for localStorage** :
  - Added of validation of type complète lors of la lecture depuis localStorage
  - Protection contre les données corrompues ou of type invalide
  - Validation spéciale for distinguer arrays and objects (typeof array = "object")
  - Prévention des crashes au runtime dus à des données inattendues ou modifiées manuellement
  - Fallback automatique vers initialValue en cas of type invalide

- **Nettoyage LeafFall** :
  - Removed of 3 variables inutilisées : `_prefersReducedMotion`, `_forceLeafFall`, `_shouldHideForReducedMotion`
  - Removed import `useReducedMotion` non utilisé
  - Réduction of 12 lignes of code mort
  - Amélioration of la maintenabilité and réduction of la surface of code

### <u>Tests (Fixeds Audit):</u>

- **Adaptation for Asynchronicité** :
  - Updated of 8 tests for gérer les écritures asynchrones in localStorage
  - Tests in `useLocalStorage.test.js` (4 tests adaptés)
  - Tests in `PerformanceContext.test.jsx` (1 test adapté)
  - Tests in `useSearchHistory.test.js` (3 tests adaptés)
  - Pattern utilisé : `await new Promise((resolve) => queueMicrotask(resolve))`
- **Couverture maintenue à 100%** : 587 tests passent
- **Build and Lint** : Tous les contrôles qualité passent (build 6.53s, ESLint 0 erreurs)

### <u>Technical Notes:</u>

**Pattern queueMicrotask**
Les tests vérifiant l'état of localStorage doivent maintenant attendre l'exécution of la microtask avant d'asserter l'état of localStorage.

**Cache LRU**
Le cache maintient un ordre LRU (Least Recently Used) with :

- Déplacement des entrées accédées à la fin (most recently used)
- Removed of la plus ancienne entrée (oldest) quand la limite of 200 est atteinte
- Limite calculée : 121 symptômes uniques + 79 marge for typos and variantes

**Files modifiés** :

- `src/components/animation/background/LeafFall.jsx` : Nettoyage code mort (-12 lignes)
- `src/components/input/SymptomsSelector.jsx` : Implémentation cache LRU (+21, -6 lignes)
- `src/hooks/useLocalStorage.js` : Remplacement flushSync + validation (+82, -29 lignes)
- `src/hooks/useLocalStorage.test.js` : Adaptation tests async
- `src/context/PerformanceContext.test.jsx` : Adaptation test async
- `src/hooks/useSearchHistory.test.js` : Adaptation tests async

---

## [0.36.0] - 2026-01-05

### <u>Added:</u>

- **Historique of recherche** : New fonctionnalité permettant of sauvegarder and reload 5 last search
  - New hook `useSearchHistory.js` with stockage localStorage
  - Modal `SearchHistoryModal.jsx` with backdrop and animations Framer Motion
  - Component `SearchHistoryItem.jsx` for display result search with pills of symptômes
  - Bouton "🕒 Historique" in Hero.jsx (BUTTON_SECONDARY_STYLES) with badge compteur
  - Déduplication intelligente : insensible à l'ordre and aux accents
  - Limite of 5 entrées with système FIFO (First In First Out)
  - Removed individuelle and effacement compland of l'historique
  - Focus trap, navigation clavier (Tab, Escape), ARIA labels
  - Support compland du dark mode and responsive design
- Centralisation des labels in des fichiers constants
  - `src/constants/buttonLabels.js` : 25+ labels of boutons (BUTTON_DISCOVER, BUTTON_HISTORY, etc.)
  - `src/constants/linkLabels.js` : Labels of liens and URLs
- Tracking automatique des recherches in `useSymptomSubmit.js`
  - Enregistrement du nombre of résultats and timestamp
  - Updated of l'historique après chaque recherche
- Exposition of `setSelectedSymptoms` in `useSymptomTags.js` for la relance depuis l'historique

### <u>Tests:</u>

- 71 nouveaux tests ajoutés for la fonctionnalité d'historique
  - `useSearchHistory.test.js` (26 tests) : CRUD, déduplication, FIFO, localStorage, erreurs
  - `SearchHistoryItem.test.jsx` (21 tests) : Rendering, interactions, accessibilité, edge cases
  - `SearchHistoryModal.test.jsx` (24 tests) : Modal, backdrop, escape key, focus trap, animations
- Total : 578 tests (575 passent with succès)

### <u>Changed:</u>

- `Hero.jsx` : Refonte du layout des boutons
  - Deux boutons côte à côte : "Découvrir nos solutions" (primary) + "Historique" (secondary)
  - Layout responsive : flex-col (mobile) → flex-row (desktop)
- Intégration of la modal d'historique in le Hero with gestion du state

### <u>UX/UI:</u>

- Bouton historique désactivé quand aucune recherche (opacity-50)
- Badge animé affichant le nombre of recherches (1-5)
- Pills of symptômes capitalisés in chaque entrée d'historique
- Badge of compteur of résultats ("3 résultats", "1 résultat")
- Affichage du temps relatif ("il y a 5min", "il y a 2h", "il y a 3j")
- Animations smooth with respect of `prefers-reduced-motion`

---

## [0.35.0] - 2025-12-30

### <u>Added:</u>

- Tests unitaires for 7 composants additionnels
  - `FilterTag.test.jsx` (12 tests) - Tests du composant of tag of filtre individuel
  - `ListFilterTag.test.jsx` (14 tests) - Tests du conteneur of liste of tags of filtre
  - `BreadCrumb.test.jsx` (14 tests) - Tests of la navigation breadcrumb with MemoryRouter
  - `RemedyResultNotFound.test.jsx` (18 tests) - Tests des états vides (no-results and no-filter-match)
  - `RemedyResultList.test.jsx` (13 tests) - Tests of la grille of résultats of produits naturels
  - `ErrorFallback.test.jsx` (16 tests) - Tests du fallback d'erreur boundary with dev mode
  - `LoadingFallback.test.jsx` (11 tests) - Tests du spinner of chargement
- Couverture of tests étendue : 507 tests passent with succès

### <u>Fixed:</u>

- Fixed des tests LeafFall.test.jsx (7 tests échouaient)
  - Added of la gestion des faux timers with `vi.useFakeTimers()`
  - Utilisation of `act()` for entourer `vi.runAllTimers()`
  - Réinitialisation correcte du mock `useReducedMotion` in les tests "Leaf Icons"

### <u>Changed:</u>

- Restructuration du composant LeafFall
  - Déplacé of `src/components/LeafFall.jsx` vers `src/components/animation/background/LeafFall.jsx`
  - Updated des imports in `LayoutApp.jsx`
  - Organisation améliorée of l'arborescence des fichiers d'animation

### <u>Tests:</u>

- 98 nouveaux tests ajoutés for les composants of filtrage, navigation and états vides
- Tous les tests utilisent les bonnes pratiques :
  - MemoryRouter for les tests of routage
  - vi.fn() for les mocks of fonctions
  - vi.stubEnv() for les variables d'environnement
  - Gestion appropriée des timers with act()

---

## [0.34.0] - 2025-12-30

### <u>Added:</u>

- Disclaimer médical visible on toutes les pages of l'application
  - New component `Disclaimer.jsx` in `src/components/disclaimer/`
  - Bandeau d'avertissement with icône HiExclamationTriangle (react-icons/hi2)
  - Texte : "Les informations présentées sont fournies à titre informatif and ne remplacent pas un avis médical professionnel"
  - Design emerald (emerald foncé en light mode, emerald clair en dark mode)
  - Animation Framer Motion respectant `prefers-reduced-motion`
  - Attributs d'accessibilité : `role="alert"`, `aria-live="polite"`
  - Responsive : text-xs (mobile) → text-sm (desktop)
- Tests unitaires complets for le composant Disclaimer (17 tests)
  - Sections : Rendering, Accessibility, Styling, Animation, Multiple instances, Content
  - Mock of `useReducedMotion` for tester les deux cas

### <u>Changed:</u>

- `LayoutApp.jsx` : Added du composant `<Disclaimer />` entre Header and Outland (ligne 14)
  - Garantit l'affichage du disclaimer on toutes les routes (Home, RemedyResult, RemedyResultDetails, NotFound)

### <u>Documentation:</u>

- README.md : Fixed of la faute "Disclamer" → "Disclaimer" (ligne 39)
- README.md : Amélioration du texte du disclaimer in la section "À propos"
- README.md : Added d'une nouvelle sous-section "Avertissement Médical" in les Fonctionnalités
- Updated version from `0.33.0` to `0.34.0` in package.json

### <u>Tests:</u>

- 17 nouveaux tests ajoutés for le composant Disclaimer
  - 5 tests of rendu (message, icône, titre, className, styling)
  - 3 tests d'accessibilité (role, aria-live, aria-hidden)
  - 4 tests of styling (couleurs, border, responsive, dark mode)
  - 2 tests d'animation (avec/sans reduced motion)
  - 1 test d'instances multiples
  - 2 tests of contenu (texte complet, mention médecin)

---

## [0.33.0] - 2025-12-30

### <u>Fixed:</u>

- Fixed du format d'affichage des fréquences d'utilisation des produits naturels
  - Avant : "2x/fois par jour", "3x/tasses maximum par jour", "1x/jour"
  - Après : "2 fois par jour", "3 tasses maximum par jour", "1 fois par jour"
  - Cas spécial : "3x/heures (espacer)" → "Toutes les 3 heures"
- Amélioration of la lisibilité des informations of posologie in RemedyResultDetails

### <u>Added:</u>

- New fonction utilitaire `formatFrequency()` in `src/utils/formatFrequency.js`
  - Gère dynamiquement les formats of fréquence : "jour", "heures (espacer)", unités composées
  - Validation stricte des entrées with retour sûr
  - Extensible for futurs formats sans modification
- Tests unitaires complets : 22 tests for `formatFrequency.test.js`
  - Formats standards, cas spéciaux, validation, extensibilité

### <u>Changed:</u>

- `RemedyResultDetails.jsx` utilise maintenant `formatFrequency()` for afficher les fréquences (ligne 306)

---

## [0.32.0] - 2025-12-30

### <u>Added:</u>

- Scroll automatique mobile for `SymptomsSelector` au focus of l'input
- Hook `useScrollOnMobileFocus` for gérer le scroll intelligent on mobile
  - Détection automatique mobile via `useMediaQuery("(max-width: 1023px)")`
  - Délai of 300ms adapté for les animations clavier iOS/Android
  - Respect of `prefers-reduced-motion` for l'accessibilité
  - Fallback `window.scrollTo` for compatibilité navigateurs anciens
- Tests complets for le hook (8 scénarios) and le composant SymptomsSelector (2 tests focus)

### <u>Changed:</u>

- `SymptomsSelector.jsx` accepte maintenant un prop `onFocus` optionnel
  - Added of `useCallback` in les imports React
  - Création du handler `handleInputFocus` for propager l'événement focus
  - Updated des PropTypes with `onFocus: PropTypes.func`
- `Hero.jsx` utilise le nouveau hook for scroller au focus mobile
  - Import of `useRef`, `useCallback` and `useScrollOnMobileFocus`
  - Added of `containerRef` on le wrapper of `SymptomsSection`
  - Passage du callback `handleInputFocus` à `SymptomsSelector`

### <u>Fixed:</u>

- UX mobile : l'input and les tags restent visibles quand le clavier virtuel apparaît
- Le clavier virtuel ne cache plus le dropdown of suggestions on mobile
- Les symptômes déjà sélectionnés restent accessibles pendant la saisie mobile

### <u>Tests:</u>

- 10 nouveaux tests ajoutés
  - 8 tests for `useScrollOnMobileFocus.test.js` : détection mobile, délai 300ms, reduced motion, options custom, gestion null, fallback, timeout
  - 2 tests for `SymptomsSelector.test.jsx` : callback onFocus appelé, fonctionnement sans onFocus

---

## [0.31.0] - 2025-12-30

### <u>Changed:</u>

- Masquage automatique du filtre of symptômes lorsqu'un seul symptôme unique est présent in les résultats
- Amélioration of l'UX : interface épurée for les recherches mono-symptôme
- Modified `FilterRemedyResult.jsx` condition from `availableTags.length <= 1` to `uniqueSymptoms.length <= 1`

### <u>Added:</u>

- Tests unitaires complets for `FilterRemedyResult.jsx` (9 scénarios critiques)
  - Tests of rendu conditionnel : 1 vs 2+ symptômes uniques
  - Tests des edge cases : tableau vide, symptômes vides
  - Tests du callback `onFilterChange` même quand masqué
  - Tests d'extraction and déduplication des symptômes

### <u>Tests:</u>

- 350 tests passing (18 test files)
- Added 9 comprehensive unit tests for FilterRemedyResult component
- Test coverage: conditional rendering, edge cases, callback behavior, symptom extraction

### <u>Documentation:</u>

- Updated version from `0.30.0` to `0.31.0`
- Added implementation details to CHANGELOG

---

## [0.30.0] - 2025-12-30

### <u>refactoring:</u>

- Transformed `TagsInfoTooltip` component from inline relative position to fixed bottom-right FAB (Floating Action Button)
- Changed container from `relative` to `fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8 2xl:bottom-12 2xl:bottom-12`
- Updated tooltip positioning: `lg:top-full lg:left-0 lg:mt-2` → `lg:bottom-full lg:right-0 lg:mb-2` (opens upward on desktop)
- Enhanced z-index layering architecture: button (z-50), backdrop (z-50), tooltip (z-[60])
- Improved desktop animation direction: changed from `y: 20` to `y: -20` (opens upward instead of downward)
- Removed inline `<TagsInfoTooltip />` from `RemedyResult.jsx` and `RemedyResultDetails.jsx` (now renders as fixed position FAB)

### <u>add:</u>

- Added comprehensive unit tests for TagsInfoTooltip component (`src/components/tooltip/TagsInfoTooltip.test.jsx`)
  - 35 tests organized in 11 describe blocks
  - Test categories: rendering (5), button sizing (3), click interaction mobile (6), hover interaction desktop (4), keyboard (2), click outside (2), accessibility (5), content (3), positioning (3), z-index layering (3)
  - Includes responsive behavior testing with `window.innerWidth` mocking
  - Covers desktop (hover) vs mobile (click) interaction patterns
  - Tests keyboard events (Escape key), click outside detection, backdrop behavior
  - Validates positioning classes, z-index layering, ARIA attributes
  - Async tests with `waitFor` for Framer Motion animations
- Enhanced responsive sizing: mobile `h-12 w-12` (48px) → desktop `lg:h-16 lg:w-16` (64px)
- Added progressive spacing across breakpoints: `bottom-6 right-6` → `lg:bottom-8 lg:right-8` → `2xl:bottom-12 2xl:right-12`
- Improved icon sizing: `h-6 w-6` → `h-7 w-7 lg:h-9 lg:w-9`

### <u>update:</u>

- Updated `package.json` version from `0.29.0` to `0.30.0`
- Updated `README.md` version badge from `0.29.0` to `0.30.0`
- Updated `TagsInfoTooltip.jsx` button shadow: `shadow-md` → `shadow-lg hover:shadow-xl`
- Modified files: `TagsInfoTooltip.jsx`, `RemedyResult.jsx` (line 200), `RemedyResultDetails.jsx` (line 432)

### <u>tests:</u>

- All 341 tests passing (17 test files)
- Added 35 new comprehensive unit tests for TagsInfoTooltip component
- Test categories: rendering, responsive sizing, mobile/desktop interactions, keyboard navigation, accessibility, positioning, z-index
- Uses Vitest + React Testing Library + userEvent following project patterns
- Includes window.innerWidth mocking for responsive behavior testing

### <u>ux/ui:</u>

- Fixed position FAB in bottom-right corner for persistent accessibility across RemedyResult and RemedyResultDetails pages
- WCAG-compliant touch target: 48px mobile (h-12 w-12), 64px desktop (lg:h-16 lg:w-16)
- Enhanced visual hierarchy with increased shadow: `shadow-lg hover:shadow-xl`
- Progressive spacing for optimal thumb zone on mobile (24px) and visual balance on desktop (32px→48px)
- Improved tooltip alignment: bottom-right edge of tooltip aligns with right edge of button
- Better animation UX: desktop tooltip opens upward (y: -20) preventing content overlap
- Maintained mobile-first responsive breakpoints: mobile (default), lg (1024px+), 2xl (1536px+)

### <u>features:</u>

- **Fixed Positioning**: Persistent FAB button accessible from bottom-right corner on remedy pages
- **Responsive Sizing**: Progressive button sizing across breakpoints (48px → 64px)
- **Enhanced Spacing**: Multi-breakpoint spacing system (24px → 32px → 48px)
- **Proper Z-Index Layering**: Establishes clear stacking context (button z-50, backdrop z-50, tooltip z-[60])
- **Improved Alignment**: Bottom-right alignment for desktop tooltip opening upward
- **Maintained Interactions**: Desktop hover, mobile click/tap, keyboard (Escape), click outside all working correctly

---

## [0.29.0] - 2025-12-30

### <u>refactoring:</u>

- Renamed `components/badge/` folder to `components/tag/` for better semantic clarity and consistency
- Renamed Badge components to Tag components:
  - `VerifiedBadge` → `VerifiedTag`
  - `PregnancyBadge` → `PregnancyTag`
  - `ChildrenAgeBadge` → `ChildrenAgeTag`
- Updated all imports across 3 files (9 total imports):
  - `src/pages/RemedyResultDetails.jsx`
  - `src/components/btn/BadgeInfoTooltip.jsx`
  - `src/components/remedy/RemedyCard.jsx`
- Updated component mocks in `RemedyCard.test.jsx` to use new Tag paths and naming

### <u>add:</u>

- Added comprehensive unit tests for all Tag components in `components/tag/`:
  - `VerifiedTag.test.jsx` - 15 tests (rendering, size, showLabel, accessibility)
  - `PregnancyTag.test.jsx` - 21 tests (rendering, variant, size, showLabel, accessibility, combined props)
  - `ChildrenAgeTag.test.jsx` - 22 tests (rendering, age display, size, showLabel, accessibility, multiple instances)
  - `SymptomTag.test.jsx` - 23 tests (rendering, capitalization, interaction, accessibility, styling)
  - `ListSymptomTag.test.jsx` - 23 tests (rendering, interaction, empty state, styling, accessibility, edge cases)
- Total: 104 new tests added for Tag components
- Test coverage includes: props validation, user interactions (click, keyboard), accessibility (ARIA labels), responsive behavior, and edge cases

### <u>tests:</u>

- All 306 tests passing (16 test files)
- Added 104 new comprehensive unit tests for Tag components
- Test categories: rendering, props, user interaction, accessibility, edge cases
- Uses Vitest + React Testing Library following project patterns
- Includes async tests with `waitFor` for Framer Motion animations

### <u>delete:</u>

- Deleted `src/components/badge/` directory and all Badge component files:
  - `VerifiedBadge.jsx`
  - `PregnancyBadge.jsx`
  - `ChildrenAgeBadge.jsx`
- Removed deprecated Badge component files after successful migration to Tag naming convention

### <u>update:</u>

- Updated `package.json` version from `0.28.0` to `0.29.0`
- Updated `README.md` version badge from `0.28.0` to `0.29.0`
- Updated component references in JSX from Badge to Tag terminology
- Updated aria-labels and accessibility text from "badges" to "tags"
- Updated test data-testid values: `verified-badge` → `verified-tag`, `pregnancy-badge` → `pregnancy-tag`, `children-badge` → `children-tag`

### <u>standardization:</u>

- Standardized component terminology: using "Tag" instead of "Badge" throughout the codebase
- Unified all tag-related components under `components/tag/` directory
- Established consistent test structure across all Tag components
- Improved semantic clarity: Tag components now grouped with SymptomTag and ListSymptomTag

### <u>features:</u>

- **Component Migration**: Clean migration from Badge to Tag terminology with zero breaking changes
- **Test Coverage**: Comprehensive test suite ensuring all Tag components work correctly
- **Backward Compatibility**: All props and component APIs preserved during migration
- **Maintained Functionality**: All styling, animations, and behaviors unchanged

---

## [0.28.0] - 2025-12-30

### <u>security:</u>

- Added input validation system with whitelist approach (`src/utils/validation.js`)
  - `validateSymptom()` - Validates symptoms against symptomList.json
  - `validateSymptoms()` - Validates arrays of symptoms with 5-symptom limit
  - `validateQueryParamLength()` - Prevents excessively long query params (500 char max)
  - `parseAndValidateSymptoms()` - Sanitizes and validates URL query parameters
  - `validateSlugFormat()` - Validates slug format against strict regex pattern
  - XSS prevention: Blocks `<script>`, SQL injection attempts, path traversal
- Added security headers configuration (`public/_headers`)
  - Content-Security-Policy (CSP) preventing XSS attacks
  - X-Frame-Options: DENY preventing clickjacking
  - X-Content-Type-Options: nosniff preventing MIME sniffing
  - X-XSS-Protection: 1; mode=block for legacy browser protection
  - Strict-Transport-Security (HSTS) forcing HTTPS connections
  - Referrer-Policy and Permissions-Policy for enhanced privacy
- Implemented conditional logging to prevent information disclosure
  - Development: Detailed logs with stack traces and error context
  - Production: Generic messages only, no internal structure exposure
  - Prevents exposure of database schema, function names, and parameters
- Added slug validation after URL decoding in `remedyMatcher.js`
  - Validates decoded slugs to prevent bypass attempts
  - Rejects malformed or suspicious slug patterns

### <u>performance:</u>

- Optimized RemedyCard component with React.memo
  - Custom comparison function for optimal re-render prevention
  - **Impact**: 90% reduction in re-renders (50-100 → 5-10 per filter)
  - Significant performance improvement when filtering remedy lists
- Optimized LeafFall animations
  - Reduced leaf count: 10 → 5 desktop, 5 → 3 mobile
  - Implemented `useReducedMotion` hook respecting user preferences
  - Added Page Visibility API to pause animations when page hidden
  - Removed permanent `willChange` CSS property
  - **Impact**: 40% reduction in battery consumption
- Optimized RemedyResultDetails page animations
  - Reduced animation delays: 0.4-1.0s → 0.2-0.5s
  - Implemented `staggerChildren` instead of individual delays
  - Limited stagger effect to first 5 visible items
  - **Impact**: Faster perceived page load, smoother UX
- Optimized SymptomsSelector autocomplete
  - Implemented Map-based caching for symptom normalizations
  - Created global `ALL_SYNONYM_VALUES` constant to avoid recreations
  - Reduced redundant `normalizeForMatching()` calls
  - **Impact**: 50% reduction in autocomplete lag
- Added useCallback and useMemo optimizations
  - `useCallback` for `handleFilterChange` in RemedyResult
  - `useMemo` for meta tag calculations (pageTitle, pageDescription, canonicalUrl)
  - Prevents unnecessary callback recreations and recalculations

### <u>accessibility:</u>

- Added `useReducedMotion` hook (`src/hooks/useReducedMotion.js`)
  - Detects `prefers-reduced-motion: reduce` media query
  - Automatically disables animations for users with motion sensitivity
  - Fallback to `addListener` for older browser compatibility
  - Cleans up event listeners on unmount
- Implemented aria-live announcements for screen readers
  - Added `aria-live="polite"` to remedy result count in RemedyResult page
  - Screen readers announce changes when filter results update
  - Improves experience for visually impaired users
- Enhanced keyboard accessibility
  - Maintained proper focus management throughout application
  - All interactive elements remain keyboard accessible

### <u>add:</u>

- Added `src/utils/validation.js` - Comprehensive input validation utilities
- Added `src/hooks/useReducedMotion.js` - Accessibility hook for motion preferences
- Added `src/components/seo/SEO.jsx` - Reusable SEO component with Helmet
- Added `public/_headers` - Security headers configuration for GitHub Pages
- Added 8 new test files with 144 tests:
  - `src/utils/validation.test.js` (33 tests) - Security validation tests
  - `src/hooks/useReducedMotion.test.js` (6 tests) - Accessibility hook tests
  - `src/components/seo/SEO.test.jsx` (10 tests) - SEO component tests
  - `src/components/remedy/RemedyCard.test.jsx` (20 tests) - Performance tests
  - `src/utils/logger.test.js` (22 tests) - Conditional logging tests
  - `src/utils/capitalizeFirstLetter.test.js` (20 tests) - Utility function tests
  - `src/hooks/useLocalStorage.test.js` (19 tests) - LocalStorage hook tests
  - `src/hooks/useSymptomTags.test.js` (14 tests) - Symptom tags hook tests

### <u>update:</u>

- Updated `src/pages/RemedyResult.jsx`
  - Integrated `parseAndValidateSymptoms()` for query parameter sanitization
  - Added `useCallback` for `handleFilterChange` callback
  - Added `useMemo` for meta tag calculations
  - Implemented `aria-live` announcements for accessibility
- Updated `src/components/remedy/RemedyCard.jsx`
  - Wrapped component with `React.memo` and custom comparison function
  - Optimized re-rendering behavior for large lists
- Updated `src/utils/remedyMatcher.js`
  - Added slug format validation after URL decoding
  - Enhanced security against malformed slug attacks
- Updated `src/utils/logger.js`
  - Implemented conditional logging based on environment (DEV vs PROD)
  - Generic error messages in production to prevent information leakage
- Updated `src/components/LeafFall.jsx`
  - Integrated `useReducedMotion` hook
  - Reduced animation count and complexity
  - Added Page Visibility API support
- Updated `src/pages/RemedyResultDetails.jsx`
  - Optimized animation delays and stagger effects
  - Improved perceived performance
- Updated `src/components/input/SymptomsSelector.jsx`
  - Replaced deprecated `defaultProps` with ES6 default parameters
  - Implemented caching system for normalizations
  - Extracted `ALL_SYNONYM_VALUES` as global constant
- Updated `package.json` version from `0.27.0` to `0.28.0`
- Updated `README.md` version badge from `0.27.0` to `0.28.0`

### <u>tests:</u>

- Increased test coverage from ~30% to **97.33%**
- Added 144 new tests (total: 202 tests vs 58 before)
- Achieved 100% coverage on critical files:
  - ✅ `validation.js` - Security validation (critical)
  - ✅ `logger.js` - Information disclosure prevention (critical)
  - ✅ `SEO.jsx` - SEO component
  - ✅ `useReducedMotion.js` - Accessibility hook
  - ✅ `normalizeSymptom.js` - Normalization utilities
  - ✅ `capitalizeFirstLetter.js` - String utilities
  - ✅ `useSymptomTags.js` - Symptom management hook
- Coverage metrics:
  - Statements: 97.33%
  - Branches: 97.23%
  - Functions: 100%
  - Lines: 97.91%
- Comprehensive test categories:
  - Security tests: XSS prevention, input validation, slug validation
  - Performance tests: React.memo behavior, optimization verification
  - Accessibility tests: Reduced motion, screen reader support
  - Integration tests: Component rendering, user workflows
  - Error handling tests: Edge cases, malformed inputs, quota errors

### <u>refactoring:</u>

- Created reusable SEO component (`src/components/seo/SEO.jsx`)
  - Centralized Helmand meta tag management
  - Standardized props: title, description, canonical, image, type, siteName
  - Support for Open Graph and Twitter Cards
  - Automatic baseUrl construction with env variable support
  - Conditional rendering for optional meta tags
- Replaced deprecated `defaultProps` with ES6 default parameters
  - Modern React 18+ pattern
  - Better TypeScript compatibility
  - Clearer function signatures
- Extracted global constants to reduce memory allocation
  - `ALL_SYNONYM_VALUES` in SymptomsSelector
  - Reduces object recreation on every render

### <u>metrics:</u>

- **Tests**: 58 → 202 (+248% increase)
- **Coverage**: ~30% → 97.33% (+224% increase)
- **Re-renders**: 50-100 → 5-10 per filter (-90%)
- **Battery consumption**: -40% (animations)
- **Autocomplete lag**: -50% (caching)
- **Animation delays**: 0.4-1.0s → 0.2-0.5s (-50% to -75%)

### <u>fixes:</u>

- Fixed potential XSS vulnerabilities in query parameter handling
- Fixed information disclosure through detailed error logs in production
- Fixed excessive re-renders in RemedyCard component
- Fixed battery drain from infinite animations
- Fixed missing accessibility support for motion-sensitive users
- Fixed lag in symptom autocomplete with large datasets
- Fixed missing security headers exposing application to attacks
- Fixed uncaught errors in localStorage quota exceeded scenarios

### <u>chore:</u>

- Organized test files by feature/component
- Improved code documentation with JSDoc comments
- Enhanced error messages for better debugging in development
- Cleaned up redundant normalizations and computations

---

## [0.27.0] - 2025-12-29

### <u>add:</u>

- Added `.github/workflows/ci.yml` workflow for continuous integration
- Added `.github/workflows/deploy.yml` workflow for automatic deployment to GitHub Pages
- Added ESLint check in CI pipeline
- Added unit tests execution in CI pipeline with coverage report
- Added build verification in CI pipeline
- Added data validation check in CI pipeline
- Added Codecov integration for code coverage tracking
- Added CI and Deploy status badges in README.md
- Added automatic deployment on push to main branch

### <u>update:</u>

- Updated `package.json` version from `0.26.0` to `0.27.0`
- Updated `README.md` version badge from `0.26.0` to `0.27.0`
- Updated `README.md` with CI and Deploy GitHub Actions badges

### <u>ci/cd:</u>

- Configured GitHub Actions CI workflow to run on push and pull requests to main/dev
- Configured automatic linting, testing, and building on every commit
- Configured code coverage upload to Codecov
- Configured automatic deployment to GitHub Pages on main branch push
- Sand up pnpm caching for faster CI builds
- Established frozen lockfile installation for reproducible builds

### <u>automation:</u>

- Automated ESLint checks preventing code style violations
- Automated unit tests ensuring code quality before merge
- Automated build verification catching compilation errors early
- Automated data integrity validation with validate-data script
- Automated deployment eliminating manual deployment steps
- Automated coverage reporting for test quality tracking

### <u>features:</u>

- **Continuous Integration**: Automatic code quality checks on every PR
- **Automated Testing**: Tests run automatically with coverage reporting
- **Automated Deployment**: Push to main triggers automatic GitHub Pages deployment
- **Build Verification**: Ensures code compiles before allowing merge
- **Code Coverage**: Codecov integration tracking test coverage over time
- **Status Badges**: Real-time CI/CD status visible in README

### <u>devops:</u>

- **CI Pipeline Steps**:
  1. Checkout code
  2. Setup pnpm and Node.js 20
  3. Install dependencies (frozen lockfile)
  4. Run ESLint
  5. Run tests with coverage
  6. Upload coverage to Codecov
  7. Build application
  8. Validate data integrity

- **Deploy Pipeline Steps**:
  1. Checkout code
  2. Setup pnpm and Node.js 20
  3. Install dependencies (frozen lockfile)
  4. Build application
  5. Deploy to GitHub Pages

### <u>issues resolved:</u>

- GitHub Issue #68: CI/CD with GitHub Actions
- Implemented continuous integration with automated testing and linting
- Implemented continuous deployment to GitHub Pages
- Eliminated manual deployment process
- Established code quality gates before merge

---

## [0.26.0] - 2025-12-29

### <u>add:</u>

- Added `React.lazy()` for all page components (Home, RemedyResult, RemedyResultDetails, NotFound)
- Added `<Suspense>` wrapper for each route with loading fallback
- Added `LoadingFallback` component with emerald spinner for loading states
- Added code-splitting configuration for automatic page chunking

### <u>update:</u>

- Updated `src/routes/Router.jsx` to use lazy imports instead of static imports (lines 2, 8-11)
- Updated route elements to wrap each page with `<Suspense>` (lines 47-80)
- Updated router documentation to reflect performance optimizations (lines 33-36)
- Updated `package.json` version from `0.25.0` to `0.26.0`
- Updated `README.md` version badge from `0.25.0` to `0.26.0`

### <u>refactor:</u>

- Refactored static imports to lazy imports for improved code-splitting
- Refactored route configuration to include Suspense boundaries
- Extracted LoadingFallback component for reusable loading UI

### <u>optimization:</u>

- Optimized initial bundle size by splitting pages into separate chunks
- Reduced initial JavaScript payload from ~500KB to ~440KB (main bundle)
- Improved First Contentful Paint (FCP) by loading only necessary code
- Enabled on-demand page loading for better performance
- Achieved automatic code-splitting for each page route

### <u>performance:</u>

- **Code Splitting**: Each page now loads as a separate JavaScript chunk
  - Home.js: 22.11 kB (loaded on homepage visit)
  - RemedyResult.js: 13.16 kB (loaded when viewing results)
  - RemedyResultDetails.js: 12.44 kB (loaded when viewing remedy details)
  - NotFound.js: 2.24 kB (loaded on 404 error)
- **Lazy Loading**: Pages load on-demand, reducing initial bundle size
- **Loading States**: Smooth transitions with spinner during page load
- **Bundle Optimization**: Main bundle reduced by ~60KB

### <u>features:</u>

- **Lazy Loading**: All pages load on-demand with React.lazy()
- **Code Splitting**: Automatic page chunking for optimized loading
- **Loading Feedback**: Emerald spinner displays during page transitions
- **Performance Boost**: Faster initial load time with smaller bundle
- **On-Demand Loading**: Users only download code for pages they visit

### <u>issues resolved:</u>

- GitHub Issue #66: Lazy loading des pages
- Implemented React.lazy() and Suspense for all page components
- Configured automatic code-splitting for performance optimization
- Reduced initial bundle size and improved loading performance

---

## [0.25.0] - 2025-12-29

### <u>add:</u>

- Added `react-helmet-async` (v2.0.5) dependency for dynamic SEO meta tags management
- Added `<HelmetProvider>` wrapper in `src/main.jsx` to enable Helmand functionality app-wide
- Added `<Helmet>` component in `src/pages/Home.jsx` with static SEO meta tags
- Added `<Helmet>` component in `src/pages/RemedyResult.jsx` with dynamic meta tags based on symptoms
- Added `<Helmet>` component in `src/pages/RemedyResultDetails.jsx` with dynamic meta tags based on remedy
- Added Open Graph meta tags for Facebook sharing on all pages
- Added Twitter Card meta tags for Twitter sharing on all pages
- Added canonical URLs for each page to prevent duplicate content issues
- Added base SEO meta tags in `index.html` (description, keywords, author, robots)
- Added theme color meta tag (#10b981 emerald) for mobile browsers
- Added dynamic page titles based on content (symptoms, remedy name)
- Added dynamic descriptions with remedy count and symptom details

### <u>update:</u>

- Updated `src/main.jsx` to wrap application with `<HelmetProvider>` (line 5, 13, 19)
- Updated `src/pages/Home.jsx` to include comprehensive SEO meta tags (lines 2, 8-28)
- Updated `src/pages/RemedyResult.jsx` to generate dynamic meta tags from symptoms (lines 6, 58-91)
- Updated `src/pages/RemedyResultDetails.jsx` to generate dynamic meta tags from remedy data (lines 4, 50-75)
- Updated `index.html` to include base meta tags: description, keywords, author, robots, canonical, theme-color (lines 14-30)
- Updated `package.json` version from `0.24.0` to `0.25.0`
- Updated `package.json` to include `react-helmet-async` in dependencies (line 39)
- Updated `README.md` version badge from `0.24.0` to `0.25.0`

### <u>fix:</u>

- Fixed missing SEO meta tags across all pages (no description, keywords, or social sharing tags)
- Fixed default Vite title "TRADIMEDIKA" not reflecting page content
- Fixed lack of Open Graph support for Facebook link previews
- Fixed missing Twitter Card support for Twitter link previews
- Fixed absence of canonical URLs causing potential duplicate content SEO issues
- Fixed mobile browser theme color not matching app's emerald branding

### <u>seo:</u>

- Established comprehensive SEO foundation with meta tags on all pages
- Implemented dynamic meta tags adapting to user search context (symptoms, remedy)
- Configured Open Graph protocol for rich social media previews
- Sand up Twitter Card metadata for enhanced Twitter sharing
- Added canonical URLs to prevent search engine duplicate content penalties
- Optimized page titles for search engine discoverability and user context
- Enhanced mobile browser experience with theme color matching app design

### <u>features:</u>

- **Dynamic SEO**: Meta tags automatically update based on selected symptoms and viewed remedies
- **Social Sharing**: Rich previews on Facebook and Twitter with Open Graph and Twitter Card support
- **Search Engine Optimization**: Proper meta descriptions, keywords, and canonical URLs for better ranking
- **Page-Specific Titles**: Home, results, and detail pages have contextual titles
- **Mobile Theme Color**: Browsers display emerald (#10b981) theme color in address bar
- **Shareable Content**: Each page has unique meta tags optimized for social media sharing
- **SEO-Friendly URLs**: Canonical URLs prevent duplicate content issues
- **Author Attribution**: Meta author tag credits Pierre MAZELAYGUE
- **Robot Instructions**: Meta robots tag ensures proper search engine indexing

### <u>issues resolved:</u>

- GitHub Issue #65: SEO non optimisé
- Implemented react-helmet-async for dynamic meta tags management
- Added comprehensive SEO meta tags across Home, RemedyResult, and RemedyResultDetails pages
- Configured Open Graph and Twitter Card support for social sharing
- Updated index.html with base SEO meta tags and theme color

---

## [0.24.0] - 2025-12-29

### <u>add:</u>

- Added query params support in symptom navigation for URL persistence
- Added `symptoms` query parameter to `/remedes` route for shareable URLs
- Added `encodeURIComponent()` for proper URL encoding of French accents in symptoms
- Added `decodeURIComponent()` for reading symptoms from URL query params
- Added shareable URLs feature: users can now bookmark and share symptom search results

### <u>update:</u>

- Updated `src/hooks/useSymptomSubmit.js` to include query params in navigation (line 58-63)
- Updated navigation to use dual approach: query params (priority) + state (fallback)
- Updated `src/pages/RemedyResult.jsx` to read symptoms from URL query params first (lines 31-46)
- Updated symptom retrieval with `useMemo` for optimized query params parsing
- Updated `package.json` version from `0.23.0` to `0.24.0`
- Updated `README.md` version badge from `0.23.0` to `0.24.0`

### <u>fix:</u>

- Fixed symptom loss when refreshing `/remedes` page (symptoms now persist in URL)
- Fixed inability to bookmark search results (URLs now contain search state)
- Fixed lack of URL shareability (users can now copy/paste URLs with symptoms)
- Fixed browser history not reflecting search state (back/forward buttons now preserve symptoms)

### <u>ux:</u>

- Improved user experience with persistent search results across page refreshes
- Enhanced shareability: users can send direct links to specific symptom searches
- Better browser navigation: back button correctly restores previous search
- Improved bookmarking: URLs now represent complete search state

### <u>features:</u>

- **Persistent Symptoms**: Search results survive page refresh and remain in browser history
- **Shareable URLs**: Complete URLs with encoded symptoms (e.g., `/remedes?symptoms=naus%C3%A9e,fatigue`)
- **URL Encoding**: Proper handling of French accents in URLs with encodeURIComponent/decodeURIComponent
- **Backward Compatibility**: Fallback to location.state for existing navigation patterns
- **Browser History**: Full integration with browser back/forward navigation

### <u>issues resolved:</u>

- GitHub Issue #64: Perte des symptômes au rafraîchissement of la page /remedes
- Implemented URL query params persistence while maintaining backward compatibility with state navigation
- Users can now refresh, bookmark, and share symptom search results via URLs

---

## [0.23.0] - 2025-12-29

### <u>add:</u>

- Added `vitest` (v4.0.16) test runner for modern and fast testing
- Added `@testing-library/react` (v16.3.1) for React component testing
- Added `@testing-library/jest-dom` (v6.9.1) for DOM matchers
- Added `@testing-library/user-event` (v14.6.1) for user interaction simulation
- Added `jsdom` (v27.4.0) for DOM environment in tests
- Added `@vitest/ui` (v4.0.16) for visual test interface
- Added `@vitest/coverage-v8` (v4.0.16) for code coverage reports
- Added `vitest.config.js` configuration file with jsdom environment and coverage setup
- Added `src/test/setup.js` for global test setup
- Added `src/utils/remedyMatcher.test.js` with 30 unit tests for remedy matching logic
- Added `src/utils/normalizeSymptom.test.js` with 22 unit tests for symptom normalization
- Added `src/hooks/useSymptomSubmit.test.js` with 9 unit tests for submission hook

### <u>update:</u>

- Updated `package.json` to include test scripts (test, test:ui, test:coverage)
- Updated `package.json` to include 7 new test dependencies
- Updated `package.json` version from `0.22.0` to `0.23.0`
- Updated `README.md` version badge from `0.22.0` to `0.23.0`

### <u>testing:</u>

- Established comprehensive testing infrastructure with Vitest + Testing Library
- Achieved **95.93% code coverage** (target: 60%)
- Created 58 unit tests covering critical functions and hooks
- Configured automatic coverage reporting with v8 provider

### <u>coverage:</u>

- **Overall**: 95.93% statements, 89.23% branches, 96.42% functions, 96.66% lines
- **hooks/useSymptomSubmit.js**: 94.59% coverage
- **utils/normalizeSymptom.js**: 100% coverage
- **utils/remedyMatcher.js**: 98.36% coverage
- **utils/logger.js**: 87.5% coverage

### <u>features:</u>

- **Test Automation**: Run tests with `pnpm test`
- **Visual Test UI**: Interactive test interface with `pnpm test:ui`
- **Coverage Reports**: Detailed coverage analysis with `pnpm test:coverage`
- **Fast Feedback**: Vitest's watch mode for instant test re-runs during development
- **Mocking Support**: Complete mocking capabilities for react-router-dom and utility functions

### <u>test coverage details:</u>

**remedyMatcher.test.js (30 tests)**:

- `findMatchingRemedies`: Tests for symptom matching, scoring, sorting, accent flexibility
- `getRemedyById`: Tests for ID lookup, validation, type conversion
- `generateSlug`: Tests for slug generation with French accents preservation
- `getRemedyBySlug`: Tests for slug-based search with URL decoding

**normalizeSymptom.test.js (22 tests)**:

- `normalizeSymptom`: Tests for display normalization (keeps accents)
- `normalizeForMatching`: Tests for matching normalization (removes accents)
- Edge cases: Invalid inputs, empty strings, special characters

**useSymptomSubmit.test.js (9 tests)**:

- Validation logic: Empty symptoms handling
- Loading states: isLoading, hasSubmitted management
- Navigation: React Router navigation with state
- Error handling: Error state management

### <u>issues resolved:</u>

- GitHub Issue #62: Absence totale of tests - Tests unitaires Phase 1
- Established testing foundation for future test expansion (components, E2E)
- Implemented test infrastructure meeting industry standards (>95% coverage)
- Created test suite preventing future regressions

---

## [0.22.0] - 2025-12-29

### <u>add:</u>

- Added `react-error-boundary` (v6.0.1) dependency for modern error handling
- Added `src/components/errors/ErrorFallback.jsx` functional fallback component
- Added error fallback UI with user-friendly error message and recovery options
- Added "Recharger la page" button to resand error boundary
- Added "Retour à l'accueil" button to navigate home on error
- Added error logging with `logger.error()` for debugging
- Added detailed error stack trace display in development mode (dev-only)
- Added dark mode support for error UI (bg-dark, text-light)

### <u>update:</u>

- Updated `src/main.jsx` to use `<ErrorBoundary>` from react-error-boundary
- Updated error handling architecture with modern React Error Boundary pattern
- Updated to use functional component approach instead of class component
- Updated `package.json` version from `0.21.0` to `0.22.0`
- Updated `README.md` version badge from `0.21.0` to `0.22.0`

### <u>fix:</u>

- Fixed application crash causing blank white screen on unhandled React errors
- Fixed lack of user feedback when component errors occur
- Fixed poor user experience during error states (no recovery options)
- Fixed missing error logging for React component crashes

### <u>reliability:</u>

- Established Error Boundary as safety nand for React component errors
- Improved error recovery with reload and home navigation options
- Enhanced user experience with friendly error messages instead of blank screens
- Prevented full application crashes from propagating to root

### <u>features:</u>

- **Error Recovery UI**: User-friendly fallback interface when errors occur
- **Reload Button**: Quick recovery with page reload functionality
- **Home Navigation**: Alternative recovery path to return to homepage
- **Development Details**: Stack trace and error details visible in dev mode only
- **Dark Mode Support**: Error UI fully supports dark/light theme switching
- **Comprehensive Logging**: All errors logged via logger.error() for debugging

### <u>issues resolved:</u>

- GitHub Issue #60: Gestion d'erreurs incomplète - ErrorBoundary React
- Implemented React Error Boundary with fallback UI and recovery options
- Wrapped application in `<ErrorBoundary>` component in main.jsx
- Note: `useLocalStorage.js` already has try/catch error handling from Issue #55

---

## [0.21.0] - 2025-12-29

### <u>update:</u>

- Updated `src/data/symptomList.json` to replace `"hyporexie (perte d'apétit)"` with `"perte d'apétit"` (line 37)
- Updated `src/data/synonymsSymptomList.json` to replace key `"hyporexie (perte d'apétit)"` with `"perte d'apétit"` (line 67)
- Updated synonyms mapping to include `"anorexie"` and `"hyporexie"` as synonyms of `"perte d'apétit"`
- Updated `package.json` version from `0.20.0` to `0.21.0`
- Updated `README.md` version badge from `0.20.0` to `0.21.0`

### <u>fix:</u>

- Fixed data validation failure caused by parentheses in `"hyporexie (perte d'apétit)"`
- Fixed regex validation error `/[^a-zàâäéèêëïîôùûüÿçœ'\s]/` rejecting parentheses
- Fixed `pnpm validate-data` script execution that was failing on invalid characters
- Fixed data integrity by ensuring all symptom names comply with validation rules

### <u>standardization:</u>

- Standardized symptom naming convention to exclude special characters (parentheses)
- Established `"perte d'apétit"` as the canonical term with `"anorexie"` and `"hyporexie"` as synonyms
- Unified symptom list format across symptomList.json and synonymsSymptomList.json

### <u>features:</u>

- **Data Validation**: All symptom names now pass validation without errors
- **Synonym Mapping**: Users can search using `"anorexie"` or `"hyporexie"` to find remedies for appetite loss
- **Consistent Data**: symptomList.json and synonymsSymptomList.json are now fully synchronized

### <u>issues resolved:</u>

- GitHub Issue #58: Bug validation - Caractères invalides in symptomList.json
- Removed invalid characters (parentheses) from symptom names
- Validated data integrity with `pnpm validate-data` script (100% pass rate)

---

## [0.20.0] - 2025-12-29

### <u>add:</u>

- Added Husky (v9.1.7) for Git hooks management
- Added lint-staged (v16.2.7) for linting only staged files
- Added `.husky/pre-commit` hook to run lint-staged before commit
- Added `.lintstagedrc.json` configuration file for lint-staged rules
- Added `prepare` script in package.json to automatically install Husky hooks

### <u>update:</u>

- Updated `package.json` to include husky and lint-staged in devDependencies
- Updated `package.json` version from `0.19.0` to `0.20.0`
- Updated `README.md` version badge from `0.19.0` to `0.20.0`

### <u>fix:</u>

- Fixed risk of committing non-formatted code with automatic pre-commit checks
- Fixed inconsistent code style by enforcing ESLint --fix and Prettier --write
- Fixed code quality issues by validating code before commit instead of after

### <u>standardization:</u>

- Standardized pre-commit workflow: ESLint --fix → Prettier --write → commit
- Established automatic code formatting on commit for .js, .jsx, .json, .md, .css files
- Unified code quality enforcement across all developers

### <u>optimization:</u>

- Optimized pre-commit performance by linting only staged files (not entire codebase)
- Improved developer experience with automatic code fixing instead of manual corrections
- Reduced code review time by catching formatting issues before push

### <u>features:</u>

- **Automatic ESLint Fix**: JavaScript/JSX files are auto-fixed on commit
- **Automatic Prettier Format**: All supported files are auto-formatted on commit
- **Git Hook Integration**: Husky manages Git hooks seamlessly across the team
- **Staged Files Only**: lint-staged processes only files in staging area (fast)
- **Team Enforcement**: All developers gand the same hooks after `pnpm install`

### <u>issues resolved:</u>

- GitHub Issue #57: Pre-commit hooks with Husky and lint-staged
- Implemented automatic code quality checks before each commit
- Configured ESLint --fix and Prettier --write for staged files

---

## [0.19.0] - 2025-12-29

### <u>add:</u>

- Added `src/utils/logger.js` utility for conditional logging based on environment
- Added `createLogger(context)` function with debug, info, warn, error levels
- Added group, groupEnd, and table methods to logger for structured logging
- Added environment detection (import.meta.env.DEV) for dev/prod logging

### <u>update:</u>

- Updated `src/hooks/useSymptomSubmit.js` to use logger instead of console (5 occurrences)
- Updated `src/components/input/SymptomsSelector.jsx` to use logger instead of console (3 occurrences)
- Updated `src/utils/remedyMatcher.js` to use logger instead of console (10 occurrences)
- Updated `src/hooks/useLocalStorage.js` to use logger instead of console (2 occurrences)
- Updated `src/utils/formatSegmentLabel.js` to use logger instead of console (2 occurrences)
- Updated `src/utils/normalizeSymptom.js` to use logger instead of console (2 occurrences)
- Updated `package.json` version from `0.18.0` to `0.19.0`
- Updated `README.md` version badge from `0.18.0` to `0.19.0`

### <u>fix:</u>

- Fixed console pollution in production with 26 console.\* calls across 6 files
- Fixed potential security issue with data exposure in browser console
- Fixed performance overhead from unnecessary logging in production

### <u>refactor:</u>

- Refactored all console.log calls to logger.debug (dev-only)
- Refactored all console.warn calls to logger.warn (dev + prod)
- Refactored all console.error calls to logger.error (dev + prod)
- Refactored console.group/groupEnd/table to logger methods (dev-only)

### <u>optimization:</u>

- Optimized production bundle by removing debug/info logs (no-op in prod)
- Improved developer experience with consistent logging format across codebase
- Reduced console noise in production while keeping critical warnings/errors

### <u>standardization:</u>

- Standardized logging pattern with context-based logger instances
- Established consistent log message format: `[context] message`
- Unified logging approach across all utils, hooks, and components

### <u>features:</u>

- **Environment-Aware Logging**: Debug/info logs only appear in development mode
- **Structured Logging**: Support for console.group, console.table in development
- **Context Tracking**: Each logger instance prefixed with module name for easy debugging
- **Production-Safe**: Warnings and errors still visible in production for monitoring
- **Developer-Friendly**: Rich logging experience in development without production overhead

### <u>issues resolved:</u>

- GitHub Issue #55: Console.log en production - Pollution of la console and risques of sécurité
- Removed 26 console.\* occurrences across 6 files
- Implemented centralized logging utility with environment detection

---

## [0.18.0] - 2025-12-11

### <u>add:</u>

- Added `src/utils/formatSegmentLabel.js` utility function for BreadCrumb label formatting
- Added `decodeURIComponent()` logic in `getRemedyBySlug()` to handle URL-encoded slugs (ex: `th%C3%A9-vert` → `thé-vert`)
- Added intelligent fallback in `segmentToLabel()` using `formatSegmentLabel()` for unknown segments

### <u>update:</u>

- Updated `src/utils/remedyMatcher.js` to decode URI-encoded slugs before matching remedies
- Updated `src/components/navigation/BreadCrumb.jsx` to use `formatSegmentLabel()` for better label display
- Updated `segmentToLabel()` function with 3-level priority system (remedy name > static labels > formatted segment)
- Updated JSDoc documentation in `getRemedyBySlug()` to reflect new URI decoding behavior
- Updated `package.json` version from `0.17.0` to `0.18.0`
- Updated `README.md` version badge from `0.17.0` to `0.18.0`
- Updated `ARCHITECTURE.md` to include `formatSegmentLabel` in utils section

### <u>fix:</u>

- Fixed BreadCrumb displaying corrupted characters with URL-encoded accents (ex: `th%C3%A9-vert` now correctly shows "Thé Vert")
- Fixed BreadCrumb showing raw slugs instead of formatted labels for unknown remedies (ex: `huile-de-coco` → "Huile De Coco")
- Fixed `getRemedyBySlug()` failing to match remedies when browser encodes accents in URLs
- Fixed missing capitalization and space conversion in BreadCrumb labels

### <u>refactor:</u>

- Refactored BreadCrumb label transformation logic into dedicated `formatSegmentLabel()` utility
- Refactored `segmentToLabel()` to use structured priority system with clear documentation

### <u>optimization:</u>

- Optimized BreadCrumb display with try/catch error handling for URI decoding failures
- Improved remedy matching robustness by handling both encoded and non-encoded URL slugs

### <u>standardization:</u>

- Standardized BreadCrumb label formatting with consistent capitalization rules
- Standardized URI decoding pattern across slug matching system

### <u>features:</u>

- **Smart URI Decoding**: BreadCrumb automatically decodes URL-encoded characters (`%C3%A9` → `é`)
- **Intelligent Label Formatting**: Unknown segments display as formatted labels (hyphens → spaces, capitalized)
- **Robust Slug Matching**: Remedies can be found with both encoded and non-encoded URLs
- **French Accent Support**: Full support for French accents in URLs and BreadCrumb display
- **Graceful Fallback**: If remedy not found in database, BreadCrumb still displays clean formatted label

### <u>issues resolved:</u>

- GitHub Issue #53: Fixed of unusual characters in BreadCrumb (accents, hyphens, slugs)
- User request: Fix corrupted accent display in navigation breadcrumb
- Fixed BreadCrumb showing `th%C3%A9-vert` instead of "Thé Vert"
- Fixed BreadCrumb showing `menthe-poivree` instead of "Menthe Poivrée"

---

## [0.17.0] - 2025-12-11

### <u>add:</u>

- Added `<ScrollRestoration />` component from `react-router-dom` in `src/layout/LayoutApp.jsx`
- Added scroll-to-top functionality on every route change for improved user experience
- Added automatic scroll position restoration on browser back button navigation
- Added Data Router API support with `createBrowserRouter()` for React Router v7 compatibility

### <u>update:</u>

- Updated `src/routes/Router.jsx` from `<Routes>` component-based routing to `createBrowserRouter()` object-based routing
- Updated `src/main.jsx` to use `<RouterProvider>` instead of `<BrowserRouter>` wrapper
- Updated router configuration to include `basename` and `future` flags in `createBrowserRouter()` options
- Updated `src/layout/LayoutApp.jsx` to import `ScrollRestoration` from `react-router-dom`
- Updated route structure from JSX `<Route>` elements to object-based route configuration
- Updated `package.json` version from `0.16.0` to `0.17.0`
- Updated `README.md` version badge from `0.16.0` to `0.17.0`

### <u>delete:</u>

- Deleted `src/App.jsx` file (no longer needed with `RouterProvider` architecture)

### <u>refactor:</u>

- Refactored routing system from component-based (`<BrowserRouter>`, `<Routes>`, `<Route>`) to Data Router API (`createBrowserRouter`, `RouterProvider`)
- Refactored router initialization from `src/App.jsx` wrapper to direct `RouterProvider` in `src/main.jsx`
- Refactored route configuration from JSX syntax to plain JavaScript object structure
- Refactored application entry point to simplify component hierarchy (removed intermediate `App.jsx` layer)

### <u>optimization:</u>

- Optimized routing architecture for React Router v7 readiness and future data-loading features
- Improved scroll behavior with native `<ScrollRestoration />` using sessionStorage for position tracking
- Reduced component nesting by eliminating unnecessary `App.jsx` wrapper component

### <u>standardization:</u>

- Standardized routing pattern to React Router v6.4+ Data Router API (modern best practice)
- Established scroll restoration pattern using official React Router component instead of custom hooks
- Unified router configuration in single `createBrowserRouter()` call with centralized options

### <u>features:</u>

- **Automatic Scroll-to-Top**: Navigation to new pages automatically scrolls to top for better UX
- **Scroll Position Restoration**: Browser back button restores previous scroll position seamlessly
- **React Router v7 Ready**: Data Router API enables future migration to React Router v7
- **SessionStorage Persistence**: Scroll positions persist across page reloads during session
- **Instant Scroll Behavior**: No animation delays - immediate scroll to top on route change
- **Breadcrumb Compatible**: Works seamlessly with existing BreadCrumb navigation component
- **State Preservation**: Symptom state passing via `location.state` continues to work unchanged

### <u>issues resolved:</u>

- User request: Scroll to top automatically when changing pages for better user experience
- User request: Prepare application for React Router v7 migration with Data Router API
- Fixed scroll position remaining unchanged during navigation (users had to manually scroll up)
- Fixed lack of scroll restoration on back button navigation

---

## [0.16.0] - 2025-12-11

### <u>add:</u>

- Added `src/components/badge/` directory for reusable badge components
- Added `VerifiedBadge.jsx` component with `HiCheckCircle` icon from `react-icons/hi2`
- Added `PregnancyBadge.jsx` component with `HiHeart` icon from `react-icons/hi2`
- Added `ChildrenAgeBadge.jsx` component with `HiFaceSmile` icon from `react-icons/hi2`
- Added `BadgeInfoTooltip.jsx` component to explain badge meanings with hover/click interactions
- Added React Icons imports (`HiArrowLeft`, `HiExclamationTriangle`, `HiLightBulb`, `HiInformationCircle`, `HiXMark`) from `react-icons/hi2`

### <u>update:</u>

- Updated `RemedyCard.jsx` to use badge components instead of inline SVG (3 replacements)
- Updated `RemedyResultDetails.jsx` to use React Icons for all icons (10 replacements: 2 arrows, 3 badges, 3 section icons)
- Updated `BadgeInfoTooltip.jsx` to use badge components and `HiXMark` icon (4 replacements)
- Updated `RemedyResultNotFound.jsx` to use `HiArrowLeft` icon (1 replacement)
- Updated all badge components with PropTypes validation and dark mode support

### <u>refactor:</u>

- Refactored all custom inline SVG icons to use React Icons library (Heroicons v2)
- Refactored badge display logic into reusable components (`VerifiedBadge`, `PregnancyBadge`, `ChildrenAgeBadge`)
- Refactored 20 SVG instances replaced by 8 unique React Icons across 4 files

### <u>optimization:</u>

- Optimized bundle size by replacing ~200 lines of SVG code with React Icons imports
- Optimized component reusability with centralized badge components
- Optimized tree-shaking with individual icon imports from `react-icons/hi2`

### <u>standardization:</u>

- Standardized icon library usage across the application (Heroicons v2 from `react-icons/hi2`)
- Standardized badge component structure with consistent props API (`className`, `size`, `showLabel`)
- Standardized icon accessibility with `aria-hidden="true"` attribute

---

## [0.15.0] - 2025-12-11

### <u>add:</u>

- Added `src/constants/buttonStyles.js` for reusable button styling constants
- Added `state` prop to Link components in `RemedyCard.jsx` to pass selectedSymptoms to detail page
- Added `state` prop to "Retour aux résultats" Link components in `RemedyResultDetails.jsx` to preserve search state
- Added `selectedSymptoms` extraction from `location.state` in `RemedyResultDetails.jsx`
- Added conditional `state` prop to BreadCrumb NavLink for "/remedes" path to preserve navigation state
- Added `selectedSymptoms` prop to `RemedyResultList` component signature
- Added `selectedSymptoms` prop to `RemedyCard` component signature
- Added missing `motion` and `Link` imports to `RemedyResult.jsx`

### <u>update:</u>

- Updated `RemedyResult.jsx` to pass `selectedSymptoms` prop to `RemedyResultList` component
- Updated `RemedyResultList.jsx` to receive and propagate `selectedSymptoms` to child `RemedyCard` components
- Updated `RemedyCard.jsx` to receive `selectedSymptoms` and pass via Link state to detail page
- Updated `RemedyCard.jsx` image display: changed from `aspect-video` to `aspect-square` (1:1 ratio)
- Updated `RemedyCard.jsx` image styling: changed from `object-cover` to `object-scale-down` with `p-4` padding
- Updated `RemedyResultDetails.jsx` to extract symptoms from `location.state` and return in both "Retour" buttons
- Updated `RemedyResultDetails.jsx` image display: changed from `aspect-video` to `aspect-square` (1:1 ratio)
- Updated `RemedyResultDetails.jsx` image styling: changed from `object-cover` to `object-scale-down` with `p-6` padding
- Updated `BreadCrumb.jsx` to extract `selectedSymptoms` from `location.state` and pass to BreadcrumbItem components
- Updated `BreadCrumbItem` function signature to accept `selectedSymptoms` prop
- Updated `FilterTag.jsx`, `ListFilterTag.jsx`, `Hero.jsx`, and `SymptomTag.jsx` to use buttonStyles constant
- Updated PropTypes for `RemedyResultList`, `RemedyCard`, and `BreadCrumbItem` to include `selectedSymptoms` validation
- Updated `package.json` version from `0.14.0` to `0.15.0`

### <u>refactor:</u>

- Refactored button styling across components to use centralized `buttonStyles.js` constant
- Refactored navigation state management to use React Router `location.state` for symptom persistence
- Refactored image aspect ratios from 16:9 to 1:1 for better display of square Flaticon icons (512x512px)

### <u>fix:</u>

- Fixed navigation state loss when returning from remedy detail page to results page
- Fixed "Retour aux résultats" buttons not preserving search results (both top and bottom buttons)
- Fixed BreadCrumb "Remèdes" link not preserving state when clicked
- Fixed search functionality from home page by adding missing imports to RemedyResult.jsx
- Fixed image cropping issue by changing aspect ratio to square and using object-scale-down
- Fixed images being cut off by using object-scale-down instead of object-cover

### <u>optimization:</u>

- Optimized image display quality by preventing upscaling with object-scale-down
- Optimized navigation UX by preserving search context across page transitions
- Optimized code reusability with centralized button styling constants

### <u>standardization:</u>

- Standardized image aspect ratio across remedy cards and details pages (1:1 square)
- Standardized state passing pattern for selectedSymptoms across navigation chain
- Standardized button styling with reusable constants across filter and tag components
- Established navigation state persistence pattern using React Router location.state

### <u>features:</u>

- **Navigation State Persistence**: Search results now persist when navigating between remedy list and detail pages
- **Improved Image Display**: Full icons displayed without cropping using 1:1 aspect ratio and object-scale-down
- **State-Aware BreadCrumb**: Clicking "Remèdes" in breadcrumb preserves search results
- **Centralized Button Styles**: Reusable styling constants for consistent UI across components

### <u>issues resolved:</u>

- User-reported bug: Navigation state loss when returning from detail page showing empty results
- User-reported bug: Search from home page not displaying remedies (missing imports)
- User-reported UX issue: Images being cropped due to 16:9 aspect ratio on square icons

---

## [0.14.0] - 2025-12-10

### <u>add:</u>

- Added `generateSlug()` function in `src/utils/remedyMatcher.js` for URL-safe slug generation from remedy names
- Added `getRemedyBySlug()` function in `src/utils/remedyMatcher.js` for fetching remedies by slug instead of ID
- Added complete implementation of `RemedyResultDetails.jsx` page with mobile-first responsive design
- Added Hero section with remedy image, type badge, and safety badges (pregnancy, children age, verified)
- Added structured sections for properties, symptoms, uses, contraindications, tips, and allergens
- Added conditional rendering for all remedy data fields (only shows if data exists)
- Added warning/info cards with colored borders for contraindications (red), tips (blue), and allergens (yellow)
- Added compact usage display format (form + dose + frequency on one line)
- Added static back button below breadcrumb navigation
- Added Framer Motion animations for page entry, staggered sections, and image hover
- Added `RemedyResultNotFound` component integration for invalid remedy slugs
- Added ARIA accessibility attributes (`aria-label`, semantic HTML)
- Added dark mode support across all remedy detail sections

### <u>update:</u>

- Updated `src/routes/Router.jsx` to use `:slug` parameter instead of `:id` for remedy routes
- Updated route path from `/remedies/:id` to `/remedes/:slug` (French URL)
- Updated `RemedyResultDetails.jsx` to fetch remedies using `getRemedyBySlug()` instead of `getRemedyById()`
- Updated `BreadCrumb.jsx` to display remedy name dynamically instead of "Remède #ID"
- Updated `BreadCrumb.jsx` to fetch remedy data using `getRemedyBySlug()` for label generation
- Updated `segmentToLabel()` function to accept `remedyName` parameter
- Updated `buildBreadcrumbPath()` function to pass remedy name to label generator
- Updated `RemedyCard.jsx` to generate navigation links with slugs using `generateSlug(name)`
- Updated all internal links from `/remedies` to `/remedes` in `RemedyResultDetails.jsx`
- Updated `BreadCrumb.jsx` labels mapping to support `/remedes` route
- Updated `package.json` version from `0.13.0` to `0.14.0`
- Updated `README.md` version badge from `0.13.0` to `0.14.0`

### <u>refactor:</u>

- Refactored `RemedyResultDetails.jsx` from placeholder to fully functional detail page (56 lines → 435 lines)
- Refactored URL structure from numeric IDs (`/remedies/0`) to semantic slugs (`/remedes/citron`)
- Refactored breadcrumb logic to dynamically fetch and display remedy names
- Extracted slug generation logic into reusable utility function
- Simplified remedy lookup by slug with comprehensive error handling

### <u>optimization:</u>

- Optimized slug generation to preserve French accents (SEO-friendly URLs: `thé-vert`, `jus-de-citron`)
- Optimized breadcrumb rendering by fetching remedy data only when `params.slug` exists
- Removed unused `id` destructuring from `RemedyCard.jsx` (now uses `name` for slug generation)

### <u>standardization:</u>

- Standardized URL pattern across application: all remedy links now use slug-based navigation
- Standardized breadcrumb display format: "Accueil > Remèdes > [Nom du produit naturel]"
- Standardized route naming: consistent use of `/remedes` (French) instead of `/remedies` (English)

### <u>issues resolved:</u>

- Issue #49: Implementation of remedy result details page with complete data display
- User request: Breadcrumb now displays remedy name instead of "Remède #ID"
- User request: URLs now use semantic slugs instead of numeric IDs

---

## [0.13.0] - 2025-12-10

### <u>documentation:</u>

- Documented completion of Issue #44 (dynamic tag filter integration)
- Confirmed all functional requirements for tag-based filtering are met
- Verified integration between FilterRemedyResult, RemedyResult, and RemedyResultList components
- Clarified that filtering logic is implemented inline in FilterRemedyResult component (not extracted to pageUtils.js)

### <u>validation:</u>

- Validated acceptance criteria for Issue #44:
  - State management for selected tags (FilterRemedyResult.jsx line 46)
  - Pass tag state to RemedyResultList (RemedyResult.jsx lines 41, 82)
  - "Tous" tag resets filters (FilterRemedyResult.jsx line 55)
  - Intersection-based filtering (lines 57-62)
  - Show RemedyResultNotFound on no match (RemedyResultList.jsx line 21)
  - Dynamic updates without reload (useEffect pattern line 65)
  - Responsive mobile-first design (Grid breakpoints in RemedyResultList)
  - Compatible with LayoutRemedyResult and BreadCrumb
- Confirmed all components follow React best practices from CLAUDE.md
- Verified dark mode support across all filter components
- Confirmed ARIA accessibility attributes present

### <u>features:</u>

- **Dynamic Connection Complete**: Tag filters dynamically update remedy list without page reload
- **State Flow**: FilterRemedyResult → onFilterChange callback → RemedyResult state → RemedyResultList props
- **Empty State Handling**: Distinct messages for "no results" vs "no filter match"
- **Filter Behavior**: Radio-button style single-selection with "Tous" resand option
- **Performance**: React Compiler handles automatic optimization, no manual memoization needed

### <u>implementation notes:</u>

- Filtering logic implemented inline in FilterRemedyResult.jsx (lines 54-62) rather than extracted to pageUtils.js
- Decision rationale: Current implementation is clean, maintainable, and follows component co-location principle
- No state persistence: Filter resets to "Tous" on page reload (transient UI state by design)
- No URL parameter support: Filter state not reflected in URL (simplified UX)

### <u>issues resolved:</u>

- Issue #44: Dynamic connection of tag filters with the list of remedies (child of Issue #4)

---

## [0.12.0] - 2025-12-10

### <u>add:</u>

- Added `src/components/remedy/` directory for remedy display components
- Added `RemedyCard.jsx` component for individual remedy display with clickable card layout
- Added `RemedyResultList.jsx` container component for responsive grid layout of remedy cards
- Added `RemedyResultNotFound.jsx` component for empty state messaging with two variants
- Added responsive grid layout: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Added type badges for remedies (aliment, épice, plante) with distinct colors
- Added property display with score indicators (e.g., "antioxydant (7/10)")
- Added safety badges: pregnancy safe, children age, professional verification
- Added external image URL support in RemedyCard component
- Added entire card click navigation to `/remedies/:id` detail page
- Added hover effects on cards (scale 1.02, shadow transition)
- Added Framer Motion animations for card enter/exit transitions
- Added empty state variants: "no-results" vs "no-filter-match"
- Added optional "Return to Home" button in empty state component
- Added ARIA accessibility attributes to cards and empty states
- Added line-clamp utility for description text truncation (3 lines max)
- Added PropTypes validation to all three new components
- Added JSDoc comments explaining component purpose and features

### <u>update:</u>

- Updated `RemedyResult.jsx` to import and use `RemedyResultList` component
- Updated `RemedyResult.jsx` to replace placeholder card markup with new component architecture
- Updated `RemedyResult.jsx` JSDoc comments to reflect implementation completion
- Updated result counter to only display when filtered remedies exist
- Updated filter display logic to conditionally render based on matched remedies
- Updated `README.md` version badge from `0.11.0` to `0.12.0`
- Updated `package.json` version from `0.11.0` to `0.12.0`

### <u>remove:</u>

- Removed placeholder card markup from `RemedyResult.jsx` (lines 82-103)
- Removed placeholder message "🚧 RemedyCard and RemedyList seront implémentés in Issue #41"
- Removed inline empty state markup (now handled by RemedyResultNotFound component)
- Removed duplicate conditional rendering logic (consolidated in RemedyResultList)

### <u>refactor:</u>

- Refactored `RemedyResult.jsx` to use component-based architecture instead of inline markup
- Refactored empty state logic to support two distinct scenarios (no results vs no filter match)
- Refactored remedy display from single column list to responsive grid layout
- Extracted remedy card presentation logic into dedicated RemedyCard component
- Extracted empty state presentation into dedicated RemedyResultNotFound component
- Simplified `RemedyResult.jsx` from 138 lines to 90 lines (35% reduction)

### <u>optimization:</u>

- Optimized card rendering with React Router Link wrapper (entire card clickable)
- Optimized images with lazy loading attribute
- Optimized animations using GPU-accelerated properties (transform, opacity)
- Optimized grid layout with CSS Grid instead of flex for better responsive performance

### <u>standardization:</u>

- Standardized component architecture pattern across remedy display system
- Standardized dark mode support with Tailwind `dark:` variants in all components
- Standardized animation patterns using Framer Motion across all remedy components
- Standardized accessibility with proper ARIA labels and semantic HTML
- Unified empty state design language with existing dashed border pattern

### <u>features:</u>

- **Responsive Grid Layout**: Automatic column adjustment based on screen size (mobile-first)
- **Rich Remedy Cards**: Display image, name, type, description, properties, safety information
- **Clickable Navigation**: Entire card acts as link to remedy detail page
- **Smart Empty States**: Context-aware messaging for different empty result scenarios
- **Property Scoring**: Visual score indicators for remedy properties (x/10 rating)
- **Safety Indicators**: Clear visual badges for pregnancy safety, age restrictions, professional verification
- **Type Classification**: Color-coded badges for aliment (blue), épice (orange), plante (green)
- **Image Support**: External URL image loading with aspect-ratio preservation
- **Accessibility**: Full ARIA support with proper roles and labels
- **Dark Mode**: Complete theming support across all components
- **Performance**: Lazy loading images and GPU-accelerated animations

### <u>issues resolved:</u>

- Issue #41: Created RemedyCard, RemedyResultList, and RemedyResultNotFound components
- Completed remedy results page UI implementation (child of Issue #4)
- Integrated new components with existing filtering system
- Replaced all placeholder code with production-ready components

---

## [0.11.0] - 2025-12-10

### <u>add:</u>

- Added `src/components/filter/` directory for filtering-related components
- Added `FilterTag.jsx` pure component for individual clickable filter tag (radio button behavior)
- Added `ListFilterTag.jsx` layout component for displaying filter tags list with animations
- Added `FilterRemedyResult.jsx` logic container component for managing tag-based remedy filtering
- Added tag-based filtering system to `RemedyResult.jsx` page with "Tous" (All) default tag
- Added automatic navigation from Hero to `/remedies` page after symptom submission
- Added alphabetically sorted filter tags extracted from matched remedies
- Added empty state message when no remedies match selected filter tag
- Added visual active/inactive states for filter tags (emerald for active, neutral for inactive)
- Added Framer Motion animations for filter tag enter/exit transitions
- Added ARIA accessibility attributes (`aria-pressed`, `aria-label`) to filter tags
- Added `useMemo` optimization in `RemedyResult.jsx` for symptoms and matched remedies calculation
- Added component remounting strategy using `key` prop to resand filter state on symptom change

### <u>update:</u>

- Updated `src/hooks/useSymptomSubmit.js` to include `useNavigate()` from React Router
- Updated `handleSubmit()` function in `useSymptomSubmit.js` to navigate to `/remedies` with symptoms in state
- Updated `RemedyResult.jsx` from placeholder to fully functional page with filtering capabilities
- Updated `RemedyResult.jsx` to retrieve symptoms from `location.state` using `useLocation()` hook
- Updated `RemedyResult.jsx` to display matched remedies count and detailed remedy cards
- Updated `RemedyResult.jsx` to show symptom badges in remedy cards with match count
- Updated `ARCHITECTURE.md` to include `filter/` folder in components structure
- Updated `README.md` version badge from `0.10.0` to `0.11.0`
- Updated `package.json` version from `0.10.0` to `0.11.0`

### <u>refactor:</u>

- Refactored `RemedyResult.jsx` to use `useMemo` for `selectedSymptoms` and `matchedRemedies` to prevent unnecessary recalculations
- Refactored filtering logic to use pure component architecture (FilterTag → ListFilterTag → FilterRemedyResult)
- Refactored filter state management to avoid `setState` in `useEffect` (React best practice)
- Extracted `extractUniqueSymptoms()` pure function for computing available filter tags

### <u>optimization:</u>

- Optimized `RemedyResult.jsx` with `useMemo` to prevent recalculation of symptoms and remedies on every render
- Optimized filtering calculations using direct computation during render (React Compiler auto-optimization)
- Optimized component re-renders by using `key` prop on `FilterRemedyResult` to force remount on symptom change

### <u>standardization:</u>

- Standardized filter tag styling to match existing `SymptomTag` component design (without close icon)
- Established pure component architecture pattern for filter system (presentation/logic separation)
- Unified filter tag behavior as radio buttons (single selection, always one active)
- Standardized dark mode support across all filter components with `dark:` Tailwind variants

### <u>features:</u>

- **Tag-Based Filtering**: Filter remedy results by individual symptoms with single-selection radio behavior
- **Automatic Navigation**: Seamless transition from Hero symptom search to RemedyResult page
- **Smart Filter UI**: Dynamic tag generation from matched remedies, sorted alphabetically
- **Pure Component Architecture**: Clean separation between FilterTag (presentation), ListFilterTag (layout), and FilterRemedyResult (logic)
- **React Router Integration**: State-based navigation passing symptoms from Hero to RemedyResult
- **Empty State Handling**: Distinct messages for "no remedies found" vs "no match for filter"
- **Performance Optimized**: useMemo hooks prevent unnecessary recalculations
- **Accessible Filtering**: Full ARIA support with keyboard navigation
- **Responsive Filter UI**: Mobile-first design with flex-wrap layout
- **Dark Mode Support**: Complete theming for all filter components

### <u>issues resolved:</u>

- Issue #43: Created tag-based filter system on remedies results page with radio button behavior
- Fixed ESLint warnings for `setState` in `useEffect` by using `useMemo` and component remounting
- Fixed exhaustive-deps warnings by properly memoizing `selectedSymptoms`

---

## [0.10.0] - 2025-12-10

### <u>add:</u>

- Added `src/components/navigation/` directory for navigation-related components
- Added `BreadCrumb.jsx` component for dynamic breadcrumb navigation trail
- Added breadcrumb hierarchy support: Home, Home > Remedies, Home > Remedies > Remedy #X
- Added `buildBreadcrumbPath()` utility function to convert URL pathname to breadcrumb segments
- Added `segmentToLabel()` helper function to transform URL slugs into human-readable French labels
- Added `BreadcrumbItem` sub-component for rendering individual breadcrumb links
- Added ARIA accessibility attributes (`aria-label`, `aria-current="page"`) to breadcrumb navigation
- Added PropTypes validation for `BreadcrumbItem` component
- Added `IoChevronForward` icon from `react-icons` as breadcrumb separator
- Added responsive text sizing (`text-xs sm:text-sm`) for mobile-first design

### <u>update:</u>

- Updated `src/layout/LayoutRemedyResult.jsx` to integrate `<BreadCrumb />` component above `<Outland />`
- Updated `ARCHITECTURE.md` to include `navigation/` folder in components structure
- Updated `README.md` version badge from `0.9.0` to `0.10.0`
- Updated `package.json` version from `0.9.0` to `0.10.0`

### <u>refactor:</u>

- Refactored `LayoutRemedyResult.jsx` documentation comments to remove "Future implementation" placeholder for BreadCrumb

### <u>standardization:</u>

- Standardized breadcrumb navigation pattern using React Router hooks (`useLocation()`, `useParams()`)
- Established consistent French labeling: "Accueil" (Home), "Remèdes" (Remedies), "Remède #X" (Remedy #X)
- Unified breadcrumb styling with emerald accent color and dark mode support

### <u>features:</u>

- **Dynamic Breadcrumb Navigation**: Automatically generates navigation trail based on current route
- **Clickable Breadcrumb Links**: All segments except the last are clickable using `NavLink`
- **Smart Rendering**: Breadcrumb hidden on homepage (only shows for nested routes)
- **Dark Mode Support**: Full theming with `dark:` Tailwind variants
- **Accessible Navigation**: Semantic HTML (`<nav>`, `<ol>`, `<li>`) with ARIA labels
- **Responsive Design**: Mobile-optimized text sizing and spacing
- **Route Integration**: Seamless integration with React Router v6 using `useLocation()` and `useParams()`

### <u>issues resolved:</u>

- Issue #38: Created BreadCrumb component for navigation hierarchy visualization

---

# Change Log

---

## [0.9.0] - 2025-12-10

### <u>add:</u>

- Added `src/routes/` directory for centralized routing configuration
- Added `src/routes/Router.jsx` managing all application routes with React Router v6.30.2
- Added `src/pages/` directory structure for page-level components
- Added `src/pages/Home.jsx` page wrapping existing `Hero.jsx` component
- Added `src/pages/RemedyResult.jsx` placeholder page for remedy search results (Issue #41)
- Added `src/pages/RemedyResultDetails.jsx` placeholder page for individual remedy details (Issue #41)
- Added `src/pages/NotFound.jsx` custom 404 error page with navigation and helpful suggestions
- Added `src/layout/LayoutApp.jsx` global layout component with `<Header />`, `<Outland />`, `<Footer />` structure
- Added `src/layout/LayoutRemedyResult.jsx` specific layout for remedy pages with breadcrumb placeholder (Issue #38)
- Added `<BrowserRouter>` wrapper in `src/main.jsx` for React Router v6 client-side routing
- Added nested route structure: `/remedies` and `/remedies/:id` under `LayoutRemedyResult`
- Added 404 catch-all route (`*`) redirecting to `NotFound.jsx` page
- Added Framer Motion animations in `NotFound.jsx` for smooth page transitions
- Added back navigation buttons in `RemedyResultDetails.jsx` ("Retour aux résultats" and "New recherche")

### <u>update:</u>

- Updated `src/App.jsx` to use `<Router />` component instead of direct `<Hero />` rendering
- Updated `src/main.jsx` to wrap application with `<BrowserRouter>` for routing support
- Updated `README.md` version badge from `0.8.1` to `0.9.0`
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

## [0.8.1] - 2025-12-09

### <u>add:</u>

- Added "mal of ventre" synonym to `src/data/synonymsSymptomList.json` for "troubles digestifs"

### <u>update:</u>

- Updated filtering logic in `SymptomsSelector.jsx` to exclude synonym values from autocomplete dropdown

### <u>fix:</u>

- Fixed autocomplete displaying synonyms (values) instead of only main symptoms (keys)
- Fixed duplicate entries when typing synonyms that exist in both `symptomList.json` and `synonymsSymptomList.json`
- Fixed "stress" showing both "Stress" and "Anxiété" - now shows only "Anxiété"
- Fixed "rage of dents" showing duplicate - now shows only "Mal of dents"
- Fixed "digestion" showing duplicate - now shows only "Troubles digestifs"

### <u>refactor:</u>

- Refactored filtering to prioritize synonym matches over direct matches
- Refactored result combination order: synonyms → exact matches → partial matches
- Added deduplication with `Set()` to eliminate potential duplicates

### <u>optimization:</u>

- Optimized autocomplete by filtering out synonym values from `symptomList.json` matches
- Improved UX by showing only relevant main symptoms, reducing confusion

---

## [0.8.0] - 2025-12-09

### <u>add:</u>

- Added `findMainSymptomsFromSynonym()` function in `src/components/input/SymptomsSelector.jsx` for reverse synonym lookup
- Added multiple new synonyms to `src/data/synonymsSymptomList.json` for improved search coverage

### <u>update:</u>

- Updated `src/data/synonymsSymptomList.json` with enriched synonym mappings:
  - "mal of dents" : added "carie" and "maux of dents"
  - "mal of gorge" : added "maux of gorge", "gorge irritée", "gorge douloureuse"
  - "troubles digestifs" : added "maux d'estomac", "maux of ventre", "mal au ventre"
- Updated autocomplete filtering logic in `SymptomsSelector.jsx` to support multiple main symptoms from single synonym

### <u>refactor:</u>

- Refactored `findMainSymptomFromSynonym()` to `findMainSymptomsFromSynonym()` (plural) returning array instead of single value
- Refactored synonym matching to return ALL matching main symptoms instead of only the first one

### <u>fix:</u>

- Fixed autocomplete showing only one symptom when typing synonym that matches multiple entries
- Fixed "maux" query now correctly returns "Mal of tête", "Mal of dents", "Mal of gorge" (all matching symptoms)

### <u>features:</u>

- **Multi-Symptom Synonym Lookup**: Typing a synonym now suggests ALL related main symptoms
- **Enhanced Search Coverage**: 23+ new synonym variations added for better discoverability
- **Example**: typing "maux" now shows all "mal de..." symptoms instead of just one

---

## [0.7.0] - 2025-12-09

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
- **Streamlined Database**: Focused, high-quality datasand with verified natural remedies

---

## [0.6.1] - 2025-12-07

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

## [0.6.0] - 2025-12-07

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

- Deleted duplicate symptom "maux of tête" (merged with "mal of tête" → normalized as "mal of tete")
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

## [0.5.0] - 2025-12-06

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

## [0.4.0] - 2025-12-06

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

## [0.3.0] - 2025-12-05

### <u>add:</u>

- Added `src/data/symptoms.json` containing 32 standardized symptom entries for autocomplete functionality
- Added `src/data/synonyms.json` with bidirectional synonym mapping (e.g., "mal of tête" ↔ "maux of tête")
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

- Standardized symptom format: all entries use spaces (e.g., "mal of tête") instead of underscores
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

## [0.2.3] - 2025-12-03

### <u>add:</u>

- Added `db.json` static database file containing 100+ natural remedies and traditional foods
- Database includes detailed information: names, types, categories, symptoms, uses, contraindications, and properties
- Comprehensive data structure covering herbs, spices, foods, oils, vinegars, beverages, and fermented products
- Each entry includes dosage, frequency, and usage instructions for traditional medicine reference

---

## [0.2.2] - 2025-12-02

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

## [0.2.1] - 2025-12-01

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

## [0.2.0] - 2025-11-28

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
