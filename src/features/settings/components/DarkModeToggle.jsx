// tradimedika-v1/src/components/btn/DarkModeToggle.jsx
import { HiMoon, HiSun } from "react-icons/hi2";
import { useAccessibility } from "../hooks/useAccessibility";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isHighContrast } = useAccessibility();

  const isDisabled = isHighContrast;

  return (
    <button
      aria-label={
        isDisabled
          ? "Mode sombre désactivé en mode contraste élevé"
          : isDarkMode
            ? "Désactiver le mode sombre"
            : "Activer le mode sombre"
      }
      aria-pressed={isDarkMode}
      onClick={isDisabled ? undefined : toggleDarkMode}
      disabled={isDisabled}
      className={`group relative flex h-8 w-14 items-center rounded-md border-2 p-1 transition-all duration-100 ease-out ${
        isDisabled
          ? "cursor-not-allowed opacity-50 grayscale"
          : "cursor-pointer"
      } ${
        isDarkMode
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "justify-start border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
      }`}
    >
      {/* Glow / halo UX */}
      <span
        className={`pointer-events-none absolute inset-0 z-0 rounded-md border-none transition-opacity duration-100 ${
          isDarkMode ? "bg-emerald-500 opacity-30" : "opacity-0"
        }`}
      />

      <div
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current transition-transform duration-100 group-hover:scale-105 motion-reduce:transition-none ${
          isDarkMode ? "bg-white" : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      >
        {isDarkMode ? (
          <HiSun
            className={`text-base text-emerald-600 transition-colors duration-100`}
          />
        ) : (
          <HiMoon
            className={`text-xs text-white transition-colors duration-100`}
          />
        )}
      </div>
    </button>
  );
}
