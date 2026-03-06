import PropTypes from "prop-types";
import ExternalLink from "../../../components/ui/links/ExternalLink";

/**
 * ImageCredit Component
 *
 * Affiche le crédit d'une image avec un lien externe discret.
 * Style volontairement discret (texte grisé, petit) pour ne pas attirer
 * l'attention tout en respectant les obligations de crédit.
 *
 * Props:
 * - imageCredit: Objet { author, source, url }
 */
function ImageCredit({ imageCredit }) {
  if (!imageCredit || !imageCredit.author || !imageCredit.url) {
    return null;
  }

  const { author, source, url } = imageCredit;

  const creditText = source
    ? `Icons created by ${author} - ${source}`
    : `Icons created by ${author}`;

  return (
    <div className="mt-2" data-testid="image-credit">
      <ExternalLink
        href={url}
        siteName={source || author}
        className="text-xs text-neutral-600 transition-colors duration-150 hover:text-emerald-700 hover:underline hover:underline-offset-2 dark:text-neutral-400 dark:hover:text-emerald-500 dark:hover:underline dark:hover:underline-offset-2"
        title={`Voir les crédits sur ${source || author}`}
      >
        {creditText}
      </ExternalLink>
    </div>
  );
}

ImageCredit.propTypes = {
  imageCredit: PropTypes.shape({
    author: PropTypes.string.isRequired,
    source: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
};

export default ImageCredit;
