import { MdThumbUp } from "react-icons/md";

/**
 * RemedyResultDetailsRecommendedBanner Component
 *
 * Bannière indiquant que ce produit est le plus pertinent pour les symptômes recherchés.
 * Affichée en haut de la page de détails si le produit est marqué comme "isRecommended".
 */
function RemedyResultDetailsRecommendedBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in-up mb-6 flex items-start gap-4 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 p-4 transition-colors duration-150 motion-reduce:animate-none motion-reduce:opacity-100 dark:border-emerald-400/60 dark:bg-emerald-950/75"
    >
      <MdThumbUp
        className="mt-0.5 shrink-0 text-lg text-emerald-700 dark:text-emerald-400"
        aria-hidden="true"
      />

      <div className="flex-1 text-start">
        <p className="text-base font-bold text-emerald-700 uppercase dark:text-emerald-400">
          Produit recommandé
        </p>
        <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-50">
          Ce produit est le{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            plus pertinent
          </span>{" "}
          pour vos symptômes.
        </p>
      </div>
    </div>
  );
}

export default RemedyResultDetailsRecommendedBanner;
