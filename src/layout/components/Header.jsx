// tradimedika-v1/src/layout/Header.jsx
import { motion } from "framer-motion";
import DarkModeToggle from "../components/btn/DarkModeToggle";
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
  return (
    <motion.header
      className="bg-light dark:bg-dark sticky top-0 right-0 left-0 z-50 h-auto w-full transition duration-300 ease-in-out"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="border-out border-dark/80 dark:border-light/60 mx-auto flex h-20 w-full items-center border-b-2 border-dashed transition duration-300 ease-in-out lg:w-3/4 2xl:w-2/3">
        <div className="mx-4 flex w-full items-center justify-between py-6 lg:mx-8">
          <LogoTradimedika />
          <DarkModeToggle />
        </div>
      </div>
    </motion.header>
  );
}
