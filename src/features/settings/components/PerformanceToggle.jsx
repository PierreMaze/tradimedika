import { motion } from "framer-motion";
import { FaWandMagicSparkles } from "react-icons/fa6";

import { usePerformance } from "../context/PerformanceContext";

export default function PerformanceToggle() {
  const { isHighPerformance, togglePerformance } = usePerformance();

  return (
    <motion.button
      aria-label={
        isHighPerformance
          ? "Passer en mode économie de performance"
          : "Passer en mode performance élevée"
      }
      aria-pressed={isHighPerformance}
      onClick={togglePerformance}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-md border-2 px-1 py-1.5 transition-all duration-300 ease-out ${
        isHighPerformance
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "border-dark dark:bg-dark justify-start bg-white dark:border-white"
      }`}
    >
      {/* Glow / halo UX */}
      <motion.span
        layout
        className={`pointer-events-none absolute inset-0 z-0 rounded-md border-none transition-opacity duration-300 ${
          isHighPerformance ? "bg-emerald-500 opacity-30" : "opacity-0"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md group-hover:scale-105 ${
          isHighPerformance
            ? "bg-dark dark:bg-white"
            : "bg-dark border border-white dark:bg-white"
        }`}
      >
        <FaWandMagicSparkles
          className={`text-xs transition-colors duration-300 ${
            isHighPerformance
              ? "dark:text-dark text-white"
              : "dark:text-dark text-white"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
