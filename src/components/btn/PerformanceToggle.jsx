import { motion } from "framer-motion";
import { IoSpeedometer, IoSpeedometerOutline } from "react-icons/io5";
import { usePerformance } from "../../context/PerformanceContext";

export default function PerformanceToggle() {
  const { isHighPerformance, togglePerformance } = usePerformance();

  return (
    <motion.button
      aria-label="Basculer entre mode économie et performance élevée"
      onClick={togglePerformance}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-lg border-2 p-1 transition-all duration-300 ease-out ${
        isHighPerformance
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "border-dark justify-start bg-orange-400"
      }`}
    >
      {/* Glow / halo UX */}
      <motion.span
        layout
        className={`pointer-events-none absolute inset-0 z-0 rounded-lg border-none transition-opacity duration-300 ${
          isHighPerformance
            ? "bg-emerald-500 opacity-30"
            : "bg-orange-400 opacity-30"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current group-hover:scale-105 ${
          isHighPerformance ? "bg-white" : "bg-white"
        }`}
      >
        {isHighPerformance ? (
          <IoSpeedometer
            className={`text-base text-emerald-600 transition-colors duration-300`}
          />
        ) : (
          <IoSpeedometerOutline
            className={`text-base text-orange-600 transition-colors duration-300`}
          />
        )}
      </motion.div>
    </motion.button>
  );
}
