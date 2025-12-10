// tradimedika-v1/src/pages/RemedyResult.jsx

/**
 * RemedyResult Page - Placeholder
 *
 * Future implementation (Issues #41, #43, #38):
 * - Issue #41: RemedyResultList, RemedyCard, RemedyResultNotFound components
 * - Issue #43: FilterRemedyResultTag component for tag-based filtering
 * - Issue #38: BreadCrumb component for navigation
 *
 * This page will display a list of remedy cards matching user-selected symptoms.
 * Layout (container, padding) is handled by LayoutRemedyResult.
 */

function RemedyResult() {
  return (
    <div className="text-dark dark:text-light flex flex-col items-center justify-center text-center transition duration-300 ease-in-out">
      <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
        Résultats des Remèdes
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-lg">
        Cette page affichera la liste des remèdes naturels correspondant à vos
        symptômes.
      </p>

      <div className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 w-full max-w-4xl rounded-lg border-2 border-dashed p-8 transition duration-300 ease-in-out">
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          🚧 Page en construction
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-xs">
          Issue #41 • Issue #43 • Issue #38
        </p>
      </div>
    </div>
  );
}

export default RemedyResult;
