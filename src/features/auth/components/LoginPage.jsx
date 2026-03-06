import { useState } from "react";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="mt-40 flex h-full items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border-2 border-dashed border-emerald-700/30 bg-white p-8 shadow-lg dark:border-emerald-400/30 dark:bg-neutral-800">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <IoLockClosedOutline className="text-3xl text-emerald-700 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
              Tradimedika Pro
            </h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Espace professionnel — Accès restreint
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email
              </label>
              <div className="relative">
                <IoMailOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-800 transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Mot de passe
              </label>
              <div className="relative">
                <IoLockClosedOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-lg text-neutral-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-800 transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-emerald-400"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
            Prototype — Accès réservé aux professionnels de santé
          </p>
        </div>
      </div>
    </div>
  );
}
