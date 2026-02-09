// Composants
export { default as SettingsButton } from "./components/SettingsButton";
export { default as SettingsModal } from "./components/SettingsModal";
export { default as DarkModeToggle } from "./components/DarkModeToggle";
export { default as PerformanceToggle } from "./components/PerformanceToggle";
export { default as HistoryToggle } from "./components/HistoryToggle";
export { default as AnalyticsToggle } from "./components/AnalyticsToggle";
export { default as AllergiesToggle } from "./components/AllergiesToggle";

// Contextes
export { ThemeProvider, useTheme } from "./context/ThemeContext";
export {
  PerformanceProvider,
  usePerformance,
} from "./context/PerformanceContext";
export {
  AccessibilityProvider,
  useAccessibility,
} from "./context/AccessibilityContext";
export {
  SettingsModalProvider,
  useSettingsModal,
} from "./context/SettingsModalContext";

// Hooks
export { useDarkMode } from "./hooks/useDarkMode.js";
export { useReducedMotion } from "./hooks/useReducedMotion";
