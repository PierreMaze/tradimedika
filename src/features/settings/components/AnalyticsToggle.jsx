import { motion } from "framer-motion";
import { HiChartBar } from "react-icons/hi2";
import { useCookieConsent } from "../../cookie-consent";

export default function AnalyticsToggle() {
  const { isAccepted, toggleAnalytics } = useCookieConsent();

  return (
    <motion.button
      aria-label={
        isAccepted
          ? "Désactiver les cookies analytiques"
          : "Activer les cookies analytiques"
      }
      aria-pressed={isAccepted}
      onClick={() => toggleAnalytics(!isAccepted)}
      className={`group relative flex h-8 w-14 cursor-pointer items-center rounded-md border-2 p-1 transition-all duration-300 ease-out ${
        isAccepted
          ? "justify-end border-emerald-500/80 bg-emerald-500"
          : "justify-start border-neutral-400 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700"
      }`}
    >
      <motion.span
        layout
        className={`pointer-events-none absolute inset-0 z-0 rounded-md border-none transition-opacity duration-300 ${
          isAccepted ? "bg-emerald-500 opacity-30" : "opacity-0"
        }`}
      />

      <motion.div
        layout
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-md text-current group-hover:scale-105 ${
          isAccepted ? "bg-white" : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      >
        <HiChartBar
          className={`text-base transition-colors duration-300 ${
            isAccepted
              ? "text-emerald-600"
              : "text-white dark:text-neutral-300"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
