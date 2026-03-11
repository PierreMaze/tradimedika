import {
  IoPersonCircleOutline,
  IoMailOutline,
  IoLogOutOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "..";

export default function ProfilPage() {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold text-neutral-800 dark:text-white">
        Mon profil
      </h1>

      {/* Profile card */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <IoPersonCircleOutline className="text-4xl text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-neutral-800 dark:text-white">
              Professionnel de santé
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <IoMailOutline className="shrink-0" />
              <span className="truncate">{userEmail}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 dark:bg-emerald-900/20">
          <IoShieldCheckmarkOutline className="shrink-0 text-lg text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Accès professionnel actif
          </span>
        </div>
      </div>

      {/* Prototype notice */}
      <div className="mt-6 rounded-lg border-2 border-dashed border-amber-400/60 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-900/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
          Prototype — La gestion de profil sera enrichie prochainement.
        </p>
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
          Fonctionnalités à venir :
        </p>
        <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-amber-700 dark:text-amber-400">
          <li>
            Informations professionnelles (n° RPPS, spécialité, adresse cabinet)
          </li>
          <li>Modification du mot de passe et email</li>
          <li>Préférences de notifications</li>
          <li>Historique de connexion et activité</li>
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
      >
        <IoLogOutOutline className="text-lg" />
        Se déconnecter
      </button>
    </div>
  );
}
