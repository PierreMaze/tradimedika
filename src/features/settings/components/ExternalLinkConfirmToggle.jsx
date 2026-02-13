import { FiExternalLink } from "react-icons/fi";
import { useAccessibility } from "../context/AccessibilityContext";

export default function ExternalLinkConfirmToggle() {
  const { isExternalLinkConfirmEnabled, toggleExternalLinkConfirm } =
    useAccessibility();

  return (
    <button
      aria-label={
        isExternalLinkConfirmEnabled
          ? "Désactiver la confirmation des liens externes"
          : "Activer la confirmation des liens externes"
      }
      aria-pressed={isExternalLinkConfirmEnabled}
      onClick={toggleExternalLinkConfirm}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-md border-2 p-1 transition-all duration-300 ease-out ${
        isExternalLinkConfirmEnabled
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "justify-start border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
      }`}
    >
      {/* Glow / halo UX */}
      <span
        className={`pointer-events-none absolute inset-0 z-0 rounded-md border-none transition-opacity duration-300 ${
          isExternalLinkConfirmEnabled
            ? "bg-emerald-500 opacity-30"
            : "opacity-0"
        }`}
      />

      <div
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none ${
          isExternalLinkConfirmEnabled
            ? "bg-white"
            : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      >
        <FiExternalLink
          className={`text-xs transition-colors duration-300 ${
            isExternalLinkConfirmEnabled
              ? "text-emerald-600"
              : "text-white dark:text-neutral-300"
          }`}
        />
      </div>
    </button>
  );
}
