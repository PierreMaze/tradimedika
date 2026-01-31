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

  // Extraction sécurisée des tableaux avec valeur par défaut
  const scientificSources = sources.scientific || [];
  const traditionalSources = sources.traditional || [];

  // Vérification explicite de l'existence des sources
  const hasScientificSources = scientificSources.length > 0;
  const hasTraditionalSources = traditionalSources.length > 0;

  return (
    <section className={`space-y-3 ${className}`} data-testid="sources-section">
      <div className="space-y-2">
        <h4 className="mt-3 text-xs font-bold text-gray-700 lg:text-sm 2xl:text-base dark:text-gray-300">
          Sources
        </h4>
        <div className="flex flex-wrap gap-2">
          {/* Rendu conditionnel AVANT le map() pour éviter undefined.map() */}
          {hasScientificSources && (
            <>
              {scientificSources.map((source, index) => (
                <SourceTag
                  key={`scientific-${index}`}
                  title={source.title}
                  url={source.url}
                />
              ))}
            </>
          )}

          {/* Rendu conditionnel AVANT le map() pour éviter undefined.map() */}
          {hasTraditionalSources && (
            <>
              {traditionalSources.map((source, index) => (
                <SourceTag
                  key={`traditional-${index}`}
                  title={source.title}
                  url={source.url}
                  type="traditional"
                />
              ))}
            </>
          )}
        </div>
      </div>
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
