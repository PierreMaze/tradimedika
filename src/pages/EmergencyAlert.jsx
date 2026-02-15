import { Helmet } from "react-helmet-async";
import { PiSealWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button/Button";
import { EMERGENCY_CONTACTS } from "../constants/redFlagsConfig";

function EmergencyAlert() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Urgence Médicale - TRADIMEDIKA</title>
        <meta
          name="description"
          content="Vos symptômes nécessitent l'avis d'un professionnel de santé"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div
          className="animate-fade-in-up mb-6 rounded-lg border-2 border-dashed border-red-600 bg-red-50 p-6 dark:border-red-500 dark:bg-red-950/30"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-4">
            <PiSealWarningFill
              className="mt-1 shrink-0 text-3xl text-red-600 dark:text-red-500"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h1 className="mb-2 text-2xl font-bold text-red-900 dark:text-red-50">
                Nous vous recommandons de consulter immédiatement
              </h1>
              <p className="text-red-800 dark:text-red-200">
                D&apos;après vos réponses, vos symptômes nécessitent l&apos;avis
                d&apos;un professionnel de santé. Les informations disponibles
                sur Tradimedika ne sont pas adaptées à votre situation.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
          <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Contacts d&apos;urgence
          </h2>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            Ces numéros sont disponibles 24h/24 et 7j/7,{" "}
            <span className="font-medium">
              cliquer sur l&apos;un d&apos;eux pour appeler les urgences
            </span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {EMERGENCY_CONTACTS.map((contact) => (
              <a
                key={contact.phone}
                href={`tel:${contact.phone}`}
                className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:border-emerald-500 hover:bg-emerald-50 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    {contact.phone.length <= 3
                      ? contact.phone
                      : contact.phone.slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {contact.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {contact.description}
                  </div>
                  <div className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {contact.phone}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Que faire en attendant ?
          </h2>
          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                •
              </span>
              <span>Restez calme et dans un environnement sûr</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                •
              </span>
              <span>Notez l&apos;évolution de vos symptômes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                •
              </span>
              <span>
                Préparez vos antécédents médicaux et traitements en cours
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-600 dark:text-emerald-400">
                •
              </span>
              <span>
                N&apos;hésitez pas à contacter les services d&apos;urgence si
                nécessaire
              </span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => navigate("/")} variant="primary">
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </>
  );
}

export default EmergencyAlert;
