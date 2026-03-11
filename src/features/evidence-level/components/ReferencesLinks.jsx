import PropTypes from "prop-types";
import { FiExternalLink } from "react-icons/fi";

/**
 * Composant affichant les références scientifiques avec liens DOI et PubMed
 */
export default function ReferencesLinks({ studyHierarchy }) {
  if (!studyHierarchy || !studyHierarchy.studies) {
    return (
      <span className="text-xs text-neutral-400 italic dark:text-neutral-500">
        Aucune donnée
      </span>
    );
  }

  // Récupérer toutes les références de tous les niveaux d'études
  const allReferences = studyHierarchy.studies
    .filter((study) => study.references && study.references.length > 0)
    .flatMap((study) => study.references);

  if (allReferences.length === 0) {
    return (
      <span className="text-xs text-neutral-400 italic dark:text-neutral-500">
        Aucune source disponible
      </span>
    );
  }

  // Limiter à 3 références principales pour ne pas surcharger le tableau
  const displayedReferences = allReferences.slice(0, 3);

  return (
    <div className="flex flex-col gap-1.5">
      {displayedReferences.map((ref, idx) => (
        <div key={idx} className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            [{ref.year || "N/A"}]
          </span>
          <div className="flex flex-wrap gap-1">
            {ref.doi && (
              <a
                href={`https://doi.org/${ref.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
              >
                DOI <FiExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
            {ref.pmid && (
              <a
                href={ref.link || `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
              >
                PMID: {ref.pmid} <FiExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
          </div>
        </div>
      ))}
      {allReferences.length > 3 && (
        <span className="text-xs text-neutral-500 italic dark:text-neutral-400">
          +{allReferences.length - 3} autre
          {allReferences.length - 3 > 1 ? "s" : ""} référence
          {allReferences.length - 3 > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

ReferencesLinks.propTypes = {
  studyHierarchy: PropTypes.shape({
    studies: PropTypes.arrayOf(
      PropTypes.shape({
        references: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            doi: PropTypes.string,
            pmid: PropTypes.string,
            year: PropTypes.number,
            link: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
};
