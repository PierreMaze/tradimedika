// tradimedika-v1/src/layout/Footer.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LINK_COOKIES_PAGE } from "../../constants/buttonLabels";
import { LINK_EXTERNAL_STYLES } from "../../constants/linkStyles";
import LogoTradimedika from "./LogoTradimedika";

const Footer = ({ className = "" }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className={`bg-light text-dark dark:bg-dark dark:text-light w-full transition duration-300 ease-in-out lg:py-4 ${className}`}
    >
      <div className="border-dark/80 dark:border-light/60 mx-auto flex w-full flex-col items-center justify-center border-t-2 border-dashed py-4 transition duration-300 ease-in-out lg:w-3/4">
        {/* Logo */}
        <div className="mb-4">
          <LogoTradimedika />
        </div>

        {/* Links */}
        <div className="mb-4 flex flex-col gap-2 text-center text-xs decoration-1 lg:flex-row lg:gap-6 lg:text-start">
          <Link to="/mentions-legales" className={LINK_EXTERNAL_STYLES}>
            Mentions Légales
          </Link>
          <Link
            to="/politique-confidentialite"
            className={LINK_EXTERNAL_STYLES}
          >
            Politique de Confidentialité
          </Link>
          <Link to="/gestion-cookies" className={LINK_EXTERNAL_STYLES}>
            {LINK_COOKIES_PAGE}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-neutral-600 transition duration-300 ease-in-out dark:text-neutral-500">
          © TRADIMEDIKA 2026 - Tous droits réservés
        </p>
      </div>
    </motion.footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
