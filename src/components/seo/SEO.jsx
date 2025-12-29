// components/seo/SEO.jsx
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * Composant SEO réutilisable pour gérer les meta tags
 * Encapsule React Helmet avec des props standardisées
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Titre de la page (apparaît dans l'onglet)
 * @param {string} [props.description] - Description de la page (meta description)
 * @param {string} [props.canonical] - URL canonique de la page
 * @param {string} [props.image] - URL de l'image pour Open Graph
 * @param {string} [props.type="website"] - Type de contenu Open Graph
 * @param {string} [props.siteName="TRADIMEDIKA"] - Nom du site
 * @param {Object} [props.additionalMeta] - Meta tags additionnels
 *
 * @example
 * <SEO
 *   title="Remèdes naturels - TRADIMEDIKA"
 *   description="Découvrez nos remèdes naturels"
 *   canonical="https://example.com/remedies"
 *   image="https://example.com/og-image.jpg"
 *   type="website"
 * />
 */
export default function SEO({
  title,
  description = "",
  canonical = "",
  image = "",
  type = "website",
  siteName = "TRADIMEDIKA",
  additionalMeta = {},
}) {
  // URL de base (peut être configurée via env variable)
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://pierremaze.github.io/tradimedika";

  // Construire l'URL canonique complète si relative
  const fullCanonical = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : "";

  // Image par défaut si non fournie
  const fullImage = image || `${baseUrl}/og-default.jpg`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta tags standards */}
      {description && <meta name="description" content={description} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {image && <meta property="og:image" content={fullImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {fullCanonical && <meta name="twitter:url" content={fullCanonical} />}
      {image && <meta name="twitter:image" content={fullImage} />}

      {/* Meta tags additionnels */}
      {Object.entries(additionalMeta).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  siteName: PropTypes.string,
  additionalMeta: PropTypes.objectOf(PropTypes.string),
};
