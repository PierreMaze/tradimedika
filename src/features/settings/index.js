// Composants
export { default as SettingsButton } from "./components/SettingsButton";
export { default as SettingsModal } from "./components/SettingsModal";
export { default as DarkModeToggle } from "./components/DarkModeToggle";
export { default as PerformanceToggle } from "./components/PerformanceToggle";

// Contextes
export { ThemeProvider, useTheme } from "./context/ThemeContext";
export {
  PerformanceProvider,
  usePerformance,
} from "./context/PerformanceContext";

// Hooks
export { useDarkMode } from "./hooks/useDarkMode";
export { useReducedMotion } from "./hooks/useReducedMotion";
