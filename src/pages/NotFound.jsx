// tradimedika-v1/src/pages/NotFound.jsx
import { motion } from "framer-motion";
import { GiFallingLeaf } from "react-icons/gi";
import { Link } from "react-router-dom";

/**
 * NotFound Page - 404 Error Handler
 *
 * Displays when user navigates to an invalid route.
 * Provides navigation back to home page.
 */

function NotFound() {
  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-dark dark:text-light w-full max-w-2xl text-center transition duration-300 ease-in-out"
      >
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
          <Link
            to="/"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-emerald-700"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            to="/remedes"
            className="rounded-lg border-2 border-emerald-600 px-6 py-3 font-semibold text-emerald-600 transition duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            Explorer les remèdes
          </Link>
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
      </motion.div>
    </main>
  );
}

export default NotFound;
