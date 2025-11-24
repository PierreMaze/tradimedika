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
      className="bg-light sticky top-0 right-0 left-0 z-50 h-20 w-full border-b-2 border-dashed px-6 py-4 lg:w-2/3"
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
