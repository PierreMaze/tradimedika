// tradimedika-v1/src/layout/Footer.jsx
import { useTheme } from "../context/ThemeContext";
import LogoTradimedika from "./components/LogoTradimedika";

const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <footer
      className={`w-full transition duration-300 ease-in-out lg:py-4 ${isDarkMode ? "text-light bg-dark" : "text-dark bg-light"}`}
    >
      <div
        className={`mx-auto flex w-full flex-col items-center justify-center border-t-2 border-dashed py-2 transition duration-300 ease-in-out lg:w-3/4 ${isDarkMode ? "border-light/60" : "border-dark/80 "}`}
      >
        {/* Logo */}
        <div className="mb-4">
          <LogoTradimedika />
        </div>

        {/* Links */}
        <div
          className={`mb-4 flex flex-col gap-2 text-center text-xs decoration-1 lg:flex-row lg:gap-6 lg:text-start`}
        >
          <a
            href="/mention-legales"
            rel="noopener noreferrer"
            className={`hover:text-accent font-medium underline underline-offset-2 transition duration-300 ease-in-out hover:font-semibold ${isDarkMode ? "text-light" : "text-dark"}`}
          >
            Mentions Légales
          </a>
          <a
            href="/privacy-policy"
            rel="noopener noreferrer"
            className={`hover:text-accent font-medium underline underline-offset-2 transition duration-300 ease-in-out hover:font-semibold ${isDarkMode ? "text-light" : "text-dark"}`}
          >
            Politique de Confidentialité
          </a>
        </div>

        {/* Copyright */}
        <p
          className={`text-xs text-gray-600 transition duration-300 ease-in-out ${isDarkMode ? "text-neutral-500 " : "text-neutral-600"}`}
        >
          © 2026 - Tous droits réservés - Application Française 🟦​⬜​🟥​
        </p>
      </div>
    </footer>
  );
};

export default Footer;
