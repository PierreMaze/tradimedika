import LogoTradimedika from "./components/LogoTradimedika";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full py-8 text-dark bg-neutral-100 justify-center items-center">
      {/* Logo */}
      <div className="mb-4">
        <LogoTradimedika />
      </div>

      {/* Links */}
      <div className="flex flex-col mb-4 text-xs gap-2 decoration-1 sm:flex-row sm:gap-6">
        <a
          href="/mention-legales"
          rel="noopener noreferrer"
          className="font-semibold transition-colors underline underline-offset-2 hover:text-accent duration-200"
        >
          Mentions Légales
        </a>
        <a
          href="/privacy-policy"
          rel="noopener noreferrer"
          className="font-semibold transition-colors underline underline-offset-2 hover:text-accent duration-200"
        >
          Politique de Confidentialité
        </a>
        <a
          href="/contact"
          rel="noopener noreferrer"
          className="font-semibold transition-colors underline underline-offset-2 hover:text-accent duration-200"
        >
          Contact
        </a>
      </div>

      {/* Socials */}
      <div className="flex mb-4 text-black transition-colors gap-4 duration-200">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-600">
        © 2026 - Tous droits réservés - Site Français 🟦​⬜​🟥​
      </p>
    </footer>
  );
};

export default Footer;
