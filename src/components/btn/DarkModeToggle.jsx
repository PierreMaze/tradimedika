import { useState } from "react";
import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi2";

export default function DarkModeToggle() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <motion.button
      aria-label="Toggle dark mode"
      onClick={toggleSwitch}
      className={`flex w-14 h-8 p-1 rounded-full border-2 cursor-pointer transition-all group relative items-center duration-300 ease-out ${isOn ? "justify-end bg-accent border-light" : "justify-start bg-light border-dark"}`}
    >
      {/* Glow / halo UX */}
      <motion.span
        layout
        className={`z-0 rounded-full border-none transition-opacity pointer-events-none absolute inset-0 duration-300 ${isOn ? "opacity-30 bg-accent" : "opacity-0"}`}
      />

      <motion.div
        layout
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.25 }}
        className={`flex z-10 w-6 h-6 text-current rounded-full items-center justify-center ${isOn ? "bg-light " : "bg-dark "}`}
      >
        {isOn ? (
          <HiSun
            className={`text-base text-dark transition-colors duration-300`}
          />
        ) : (
          <HiMoon
            className={`text-xs text-light transition-colors duration-300`}
          />
        )}
      </motion.div>
    </motion.button>
  );
}
