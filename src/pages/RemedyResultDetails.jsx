// tradimedika-v1/src/pages/RemedyResultDetails.jsx
import { Link, useParams } from "react-router-dom";

/**
 * RemedyResultDetails Page - Placeholder
 *
 * Future implementation (Issues #41, #38):
 * - Issue #41: Detailed remedy information display (properties, uses, contraindications)
 * - Issue #38: BreadCrumb component for navigation
 *
 * This page will display complete information about a specific natural remedy.
 * Layout (container, padding) is handled by LayoutRemedyResult.
 */

function RemedyResultDetails() {
  const { id } = useParams();

  return (
    <div className="text-dark dark:text-light w-full transition duration-300 ease-in-out">
      <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
        Détails du Remède #{id}
      </h1>
      <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        Cette page affichera les informations complètes sur le remède
        sélectionné.
      </p>

      <div className="bg-light dark:bg-dark border-dark/20 dark:border-light/20 z-20 mb-8 rounded-lg border-2 border-dashed p-8 transition duration-300 ease-in-out">
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          🚧 Page en construction
        </p>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          Issue #41 • Issue #38
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/remedies"
          className="rounded-lg bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition duration-200 hover:bg-emerald-700"
        >
          ← Retour aux résultats
        </Link>
        <Link
          to="/"
          className="rounded-lg border-2 border-emerald-600 px-6 py-3 text-center font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
        >
          Nouvelle recherche
        </Link>
      </div>
    </div>
  );
}

export default RemedyResultDetails;
