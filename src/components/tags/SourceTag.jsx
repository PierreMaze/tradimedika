import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  FaBook,
  FaGlobeAmericas,
  FaHospital,
  FaMicroscope,
  FaNewspaper,
  FaStethoscope,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { SiWikipedia } from "react-icons/si";
import ExternalLink from "../ui/links/ExternalLink";

/**
 * SourceTag Component
 *
 * Tag affichant une source (scientifique ou traditionnelle) avec :
 * - Icône du site (favicon ou react-icon)
 * - Nom de la source
 * - Icône lien externe
 * - Couleur sky pour le design
 *
 * Props:
 * - title: Nom de la source (ex: "VIDAL", "Passeport Santé")
 * - url: URL de la source
 * - type: 'scientific' | 'traditional'
 * - className: Classes CSS additionnelles
 */

// Mapping des domaines vers leurs icônes React
const DOMAIN_ICONS = {
  "vidal.fr": FaHospital,
  "who.int": FaGlobeAmericas,
  "pubmed.ncbi.nlm.nih.gov": FaMicroscope,
  "passeportsante.net": FaNewspaper,
  "doctissimo.fr": FaStethoscope,
  "wikipedia.org": SiWikipedia,
  "scholar.google": FaMicroscope,
  "ansm.sante.fr": FaHospital,
  "anses.fr": FaMicroscope,
  "ema.europa.eu": FaGlobeAmericas,
  "cochrane.org": FaMicroscope,
  "wikiphyto.org": FaBook,
  "altheaprovence.com": FaBook,
  "plantes-et-sante.fr": FaNewspaper,
};

// Fonction pour extraire le domaine de l'URL
const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return "";
  }
};

function SourceTag({ title, url, className = "" }) {
  const domain = extractDomain(url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  const iconKey = useMemo(() => {
    const domainLower = domain.toLowerCase();
    for (const [key] of Object.entries(DOMAIN_ICONS)) {
      if (domainLower.includes(key) || key.includes(domainLower)) {
        return key;
      }
    }
    return "default";
  }, [domain]);

  const colorClasses =
    "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200";

  const iconClassName = "h-4 w-4 lg:h-5 lg:w-5";
  const iconStyle = { display: "none" };

  return (
    <ExternalLink
      href={url}
      siteName={title}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition duration-300 lg:text-sm 2xl:text-base ${colorClasses} ${className}`}
      title={`Consulter sur ${title}`}
      data-testid="source-tag"
    >
      {/* Favicon avec fallback sur icône React */}
      <span className="flex h-4 w-4 items-center justify-center lg:h-5 lg:w-5">
        <img
          src={faviconUrl}
          alt=""
          className="h-full w-full object-contain"
          onError={(e) => {
            // Si le favicon ne charge pas, afficher l'icône React à la place
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
          aria-hidden="true"
        />
        {iconKey === "vidal.fr" && (
          <FaHospital
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "who.int" && (
          <FaGlobeAmericas
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "pubmed.ncbi.nlm.nih.gov" && (
          <FaMicroscope
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "passeportsante.net" && (
          <FaNewspaper
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "doctissimo.fr" && (
          <FaStethoscope
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "wikipedia.org" && (
          <SiWikipedia
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "scholar.google" && (
          <FaMicroscope
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "ansm.sante.fr" && (
          <FaHospital
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "anses.fr" && (
          <FaMicroscope
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "ema.europa.eu" && (
          <FaGlobeAmericas
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "cochrane.org" && (
          <FaMicroscope
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {(iconKey === "wikiphyto.org" || iconKey === "altheaprovence.com") && (
          <FaBook
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "plantes-et-sante.fr" && (
          <FaNewspaper
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
        {iconKey === "default" && (
          <FaBook
            className={iconClassName}
            style={iconStyle}
            aria-hidden="true"
          />
        )}
      </span>

      <span>{title}</span>
      <FiExternalLink className="h-3 w-3 lg:h-4 lg:w-4" aria-hidden="true" />
    </ExternalLink>
  );
}

SourceTag.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["scientific", "traditional"]),
  className: PropTypes.string,
};

export default SourceTag;
