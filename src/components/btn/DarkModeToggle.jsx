// tradimedika-v1/src/components/btn/DarkModeToggle.jsx
import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-lg border-2 p-1 transition-all duration-300 ease-out ${
        isDarkMode
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "border-dark justify-start bg-white"
      }`}
    >
      {/* Glow / halo UX */}
      <motion.span
        layout
        className={`pointer-events-none absolute inset-0 z-0 rounded-lg border-none transition-opacity duration-300 ${
          isDarkMode ? "bg-emerald-500 opacity-30" : "opacity-0"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current group-hover:scale-105 ${
          isDarkMode ? "bg-white " : "bg-dark "
        }`}
      >
        {isDarkMode ? (
          <HiSun
            className={`text-dark text-base transition-colors duration-300`}
          />
        ) : (
          <HiMoon
            className={`text-xs text-white transition-colors duration-300`}
          />
        )}
      </motion.div>
    </motion.button>
  );
}
