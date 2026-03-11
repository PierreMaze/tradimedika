import { useState } from "react";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoMedkitOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCOUNTS } from "../constants/accounts";
import { useAuth } from "../context/AuthContext";

const ACCOUNT_META = {
  pro: {
    icon: IoMedkitOutline,
    label: "Professionnel",
    description: "Toutes les fonctionnalités",
    color:
      "border-emerald-300 bg-emerald-50 hover:border-emerald-400 dark:border-emerald-700 dark:bg-emerald-900/20 dark:hover:border-emerald-600",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  admin: {
    icon: IoShieldCheckmarkOutline,
    label: "Administrateur",
    description: "Gestion complète + CRUD",
    color:
      "border-amber-300 bg-amber-50 hover:border-amber-400 dark:border-amber-700 dark:bg-amber-900/20 dark:hover:border-amber-600",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
};

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

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(account.email, account.password);
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
              Tradimedika
            </h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Connectez-vous à votre espace
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

          {/* Comptes de démonstration */}
          <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <p className="mb-4 text-center text-xs font-semibold tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
              Comptes de démonstration
            </p>
            <div className="space-y-2">
              {ACCOUNTS.filter((account) => account.role !== "admin").map(
                (account) => {
                  const meta = ACCOUNT_META[account.role];
                  const Icon = meta.icon;
                  return (
                    <button
                      key={account.role}
                      onClick={() => handleDemoLogin(account)}
                      disabled={isLoading}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${meta.color}`}
                    >
                      <Icon className={`shrink-0 text-xl ${meta.iconColor}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-800 dark:text-white">
                          {meta.label}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {meta.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-neutral-400 dark:text-neutral-500">
                        {account.email}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
            Prototype — TRADIMEDIKA 2026
          </p>
        </div>
      </div>
    </div>
  );
}
