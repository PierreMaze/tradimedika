import { motion } from "framer-motion";
import { SettingsButton } from "../../features/settings";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import LogoTradimedika from "./LogoTradimedika";

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
  const scrollDirection = useScrollDirection();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const shouldHide = !isDesktop && scrollDirection === "down";

  return (
    <motion.header
      className="bg-light dark:bg-dark sticky top-0 right-0 left-0 z-50 h-auto w-full transition-transform duration-300 ease-in-out"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      style={{
        transform: shouldHide ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="border-out border-dark/80 dark:border-light/60 mx-auto flex h-20 w-full items-center border-b-2 border-dashed transition duration-300 ease-in-out lg:w-3/4">
        <div className="mx-4 flex w-full items-center justify-between py-6 lg:mx-8">
          <LogoTradimedika />
          <SettingsButton />
        </div>
      </div>
    </motion.header>
  );
}
