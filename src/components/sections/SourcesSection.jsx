import PropTypes from "prop-types";
import SourceTag from "../tags/SourceTag";

/**
 * SourcesSection Component
 *
 * Section affichant les sources scientifiques et traditionnelles d'un remède.
 * Affiche deux sous-sections si les sources existent :
 * - Sources scientifiques (icône microscope)
 * - Sources traditionnelles (icône livre)
 *
 * Props:
 * - sources: Objet contenant { scientific: [], traditional: [] }
 * - className: Classes CSS additionnelles
 */

function SourcesSection({ sources, className = "" }) {
  // Si pas de sources du tout, ne rien afficher
  if (
    !sources ||
    (!sources.scientific?.length && !sources.traditional?.length)
  ) {
    return null;
  }

  const hasSources =
    (sources.traditional && sources.traditional.length > 0) ||
    (sources.scientific && sources.scientific.length > 0);
  return (
    <section className={`space-y-3 ${className}`} data-testid="sources-section">
      {/* Sources scientifiques */}
      {hasSources && (
        <div className="space-y-2">
          <h4 className="mt-3 text-xs font-bold text-gray-700 lg:text-sm 2xl:text-base dark:text-gray-300">
            Sources
          </h4>
          <div className="flex flex-wrap gap-2">
            {/* Sources reconnue */}
            {sources.scientific.map((source, index) => (
              <SourceTag
                key={`scientific-${index}`}
                title={source.title}
                url={source.url}
              />
            ))}

            {/* Sources traditionnelles */}
            {sources.traditional.map((source, index) => (
              <SourceTag
                key={`traditional-${index}`}
                title={source.title}
                url={source.url}
                type="traditional"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

SourcesSection.propTypes = {
  sources: PropTypes.shape({
    scientific: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
    traditional: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
  }),
  className: PropTypes.string,
};

export default SourcesSection;
