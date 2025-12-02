// tradimedika-v1/src/layout/Header.jsx
import { motion } from "framer-motion";
import DarkModeToggle from "../components/btn/DarkModeToggle";
import { useTheme } from "../context/ThemeContext";
import LogoTradimedika from "./components/LogoTradimedika";

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
      className={`border-4transition sticky top-0 right-0 left-0 z-50 h-20 w-full duration-300 ease-in-out ${isDarkMode ? "bg-dark" : "bg-light"}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className={`border-out mx-auto flex min-h-full w-full items-center border-b-2 border-dashed transition duration-300 ease-in-out lg:w-3/4 2xl:w-2/3 ${isDarkMode ? "border-light/60" : "border-dark/80 "}`}
      >
        <div className="flex h-auto w-full items-center justify-between lg:mx-8">
          <LogoTradimedika />
          <DarkModeToggle />
        </div>
      </div>
    </motion.header>
  );
}
