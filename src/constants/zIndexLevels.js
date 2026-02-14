/**
 * Z-Index System - Hiérarchie normalisée
 *
 * Architecture en couches:
 * - Base (0-10): Contenu normal, backgrounds
 * - UI Elements (40-49): Bannières, disclaimers
 * - Overlays (50-59): Backdrops de modales/popovers
 * - Dialogs (60-69): Contenu de modales/popovers
 * - Tooltips (70-79): Tooltips et popovers info
 * - Emergency (90+): Urgences (rarement utilisé)
 */

export const Z_INDEX = {
  // Base layers
  BASE: 0,
  BACKGROUND_ANIMATION: 0, // LeafFall

  // UI Elements
  DISCLAIMER: 40,

  // Overlays (backdrops)
  MODAL_BACKDROP: 50,
  POPOVER_BACKDROP: 50,

  // Dialogs (content)
  MODAL_CONTENT: 60,
  POPOVER_CONTENT: 60,

  // Tooltips (au-dessus des dialogs)
  TOOLTIP: 70,
  TERM_POPOVER: 70,

  // Emergency (rarement utilisé)
  EMERGENCY: 90,
};

// Classes Tailwind correspondantes
export const Z_INDEX_CLASSES = {
  BASE: "z-0",
  DISCLAIMER: "z-40",
  MODAL_BACKDROP: "z-50",
  POPOVER_BACKDROP: "z-50",
  MODAL_CONTENT: "z-60",
  POPOVER_CONTENT: "z-60",
  TOOLTIP: "z-70",
  TERM_POPOVER: "z-70",
  EMERGENCY: "z-90",
};
