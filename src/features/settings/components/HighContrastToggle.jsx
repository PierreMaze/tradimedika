import { motion } from "framer-motion";
import { IoContrastOutline } from "react-icons/io5";
import { useAccessibility } from "../context/AccessibilityContext";

export default function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useAccessibility();

  return (
    <motion.button
      aria-label={
        isHighContrast
          ? "Désactiver le contraste élevé"
          : "Activer le contraste élevé"
      }
      aria-pressed={isHighContrast}
      onClick={toggleHighContrast}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-md border-2 p-1 transition-all duration-300 ease-out ${
        isHighContrast
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "justify-start border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
      }`}
    >
      {/* Glow / halo UX */}
      <motion.span
        layout
        className={`pointer-events-none absolute inset-0 z-0 rounded-md border-none transition-opacity duration-300 ${
          isHighContrast ? "bg-emerald-500 opacity-30" : "opacity-0"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current group-hover:scale-105 ${
          isHighContrast ? "bg-white" : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      >
        <IoContrastOutline
          className={`text-base transition-colors duration-300 ${
            isHighContrast
              ? "text-emerald-600"
              : "text-white dark:text-neutral-300"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
