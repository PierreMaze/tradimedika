// tradimedika-v1/src/layout/Header.jsx
import { motion } from "framer-motion";
import DarkModeToggle from "../components/btn/DarkModeToggle";
import LogoTradimedika from "./components/LogoTradimedika";
import { useTheme } from "../context/ThemeContext";

const headerVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6,
    },
  },
};

export default function Header() {
  const { isDarkMode } = useTheme();
  return (
    <motion.header
      className={`sticky top-0 right-0 left-0 z-50 h-20 w-full border-b-2 border-dashed px-6 py-4 transition duration-300 ease-in-out lg:w-3/4 ${isDarkMode ? "bg-dark border-light/60" : "bg-light border-dark/80"}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="my-auto flex justify-between lg:mx-8">
        <LogoTradimedika />
        <DarkModeToggle />
      </div>
    </motion.header>
  );
}
