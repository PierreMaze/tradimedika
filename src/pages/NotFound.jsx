// tradimedika-v1/src/pages/NotFound.jsx
import { GiFallingLeaf } from "react-icons/gi";
import Button from "../components/ui/button/Button";

/**
 * NotFound Page - 404 Error Handler
 *
 * Displays when user navigates to an invalid route.
 * Provides navigation back to home page.
 */

function NotFound() {
  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center px-4 py-8">
      <div className="text-dark dark:text-light animate-fade-in-up w-full max-w-2xl text-center transition duration-300 ease-in-out motion-reduce:animate-none motion-reduce:opacity-100">
        {/* 404 Number */}
        <h1 className="mb-4 text-9xl font-bold text-emerald-600 dark:text-emerald-500">
          404
        </h1>

        {/* Error Message */}
        <h2 className="mb-2 text-3xl font-bold lg:text-4xl">
          Page introuvable
        </h2>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>

        {/* Decorative Element */}
        <div className="mb-8">
          <span className="text-6xl">
            <GiFallingLeaf className="mx-auto rotate-90 rotate-x-180 text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-500" />
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button as="link" to="/" variant="primary">
            Retour à l&apos;accueil
          </Button>
          <Button as="link" to="/remedes" variant="secondary">
            Explorer les remèdes
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 text-sm text-neutral-500 dark:text-neutral-500">
          <p>Suggestions :</p>
          <ul className="mt-2 space-y-1">
            <li>Vérifiez l&apos;URL dans la barre d&apos;adresse</li>
            <li>Utilisez le menu de navigation</li>
            <li>Retournez à la page d&apos;accueil</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
