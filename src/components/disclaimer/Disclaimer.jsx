import { HiExclamationTriangle } from "react-icons/hi2";

function Disclaimer() {
  return (
    <div
      className={`z-40 mt-20 w-full border-b-2 border-dashed border-amber-700/60 bg-amber-50 px-4 py-3 transition-all duration-300 ease-in-out lg:w-3/4 dark:border-amber-400/60 dark:bg-amber-950/80`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 lg:gap-4">
        <HiExclamationTriangle
          className="transition-color flex h-5 w-5 shrink-0 text-amber-700 duration-150 ease-in-out lg:h-6 lg:w-6 dark:text-amber-400"
          aria-hidden="true"
        />
        <p className="transition-color text-sm font-medium tracking-wider text-amber-900 duration-150 ease-in-out lg:text-base dark:text-amber-50">
          Les informations présentées sont fournies à{" "}
          <span className="font-semibold text-amber-700 dark:text-amber-400">
            titre informatif et ne remplacent pas un avis/traitement médical
            professionnel
          </span>
          . Consultez{" "}
          <span className="font-bold text-amber-700 dark:text-amber-400">
            TOUJOURS
          </span>{" "}
          un médecin en cas de doute.
        </p>
      </div>
    </div>
  );
}
export default Disclaimer;
