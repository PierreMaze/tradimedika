import PropTypes from "prop-types";
import { createLogger } from "../../../utils/logger";

const logger = createLogger("ErrorFallback");

export default function ErrorFallback({ error, resetErrorBoundary }) {
  // Log l'erreur
  logger.error("React component error caught:", error);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="bg-light dark:bg-dark flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg border border-gray-300 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h1 className="text-dark dark:text-light mb-2 text-3xl font-bold">
            Oups, une erreur s&apos;est produite
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Nous sommes désolés, quelque chose s&apos;est mal passé. Vous pouvez
            essayer de recharger la page ou retourner à l&apos;accueil.
          </p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <h2 className="mb-2 font-mono text-sm font-semibold text-red-800 dark:text-red-400">
              Détails de l&apos;erreur (dev only):
            </h2>
            <pre className="overflow-x-auto text-xs text-red-700 dark:text-red-300">
              {error.toString()}
            </pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-medium text-red-800 dark:text-red-400">
                  Stack trace
                </summary>
                <pre className="mt-2 overflow-x-auto text-xs text-red-700 dark:text-red-300">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={resetErrorBoundary}
            className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800"
          >
            Recharger la page
          </button>
          <button
            onClick={handleGoHome}
            className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
