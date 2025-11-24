import { PiPlantFill } from "react-icons/pi";
import { HiMoon } from "react-icons/hi2";
import { motion } from "framer-motion";
import DarkModeToggle from "../components/btn/DarkModeToggle";
const Header = () => {
  return (
    <header className="flex w-full h-20 px-6 border-b-2 border-dashed items-center justify-between lg:w-2/3">
      {/* Logo */}
      <a
        href="/"
        alt="Logo Tradimedika"
        title="Logo Tradimedika"
        aria-label="Logo Tradimedika"
        className="flex self-center gap-2"
      >
        <span>
          <PiPlantFill className="text-3xl text-accent lg:text-4xl" />
        </span>
        <span className="text-2xl font-black lg:text-3xl">TRADIMEDIKA</span>
      </a>
      {/* Bouton dark mode */}
      <DarkModeToggle />
    </header>
  );
};

export default Header;
