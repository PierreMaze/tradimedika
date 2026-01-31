import { FiInfo } from "react-icons/fi";
import { HiExclamationTriangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ExternalLink from "../components/ui/links/ExternalLink";
import { COOKIE_CATEGORIES } from "../features/cookie-consent/constants/cookieConfig";
export default function GestionCookies() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <nav aria-label="Fil d'ariane" className="mb-6">
        <ol className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <li>
            <Link
              to="/"
              className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            className="text-neutral-900 dark:text-neutral-100"
          >
            Gestion des Cookies
          </li>
        </ol>
      </nav>

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Gestion des Cookies
      </h1>

      <p className="mb-6 text-sm text-neutral-600 italic dark:text-neutral-400">
        Dernière mise à jour : 27 janvier 2026
      </p>

      <nav
        aria-label="Sommaire"
        className="mb-8 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
      >
        <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Sommaire
        </h2>
        <div className="h-full max-h-fit border-l-4 border-emerald-600 pl-4 dark:border-emerald-500">
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#definition"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                1. Qu&apos;est-ce qu&apos;un cookie ?
              </a>
            </li>
            <li>
              <a
                href="#liste"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                2. Liste des cookies utilisés
              </a>
            </li>
            <li>
              <a
                href="#localstorage"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                3. Distinction cookies / localStorage
              </a>
            </li>
            <li>
              <a
                href="#choix"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                4. Vos choix concernant les cookies
              </a>
            </li>
            <li>
              <a
                href="#durees"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                5. Durées de conservation
              </a>
            </li>
            <li>
              <a
                href="#liens"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                6. Pour en savoir plus
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="definition" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          1. Qu&apos;est-ce qu&apos;un cookie ?
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Un cookie est un petit fichier texte déposé sur votre appareil
          (ordinateur, tablette, smartphone) lors de la visite d&apos;un site
          web. Les cookies permettent de reconnaître votre navigateur et de
          mémoriser certaines informations.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          Le site TRADIMEDIKA utilise des cookies pour améliorer votre
          expérience de navigation et analyser l&apos;utilisation du site de
          manière anonyme.
        </p>
      </section>

      <section id="liste" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          2. Liste des cookies utilisés
        </h2>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          2.1. Cookies strictement nécessaires
        </h3>
        <div className="mb-6 rounded-lg border-2 border-dashed border-sky-600 bg-sky-50 p-4 dark:bg-sky-900/20">
          <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
            <FiInfo
              className="inline-flex h-5 w-5 shrink-0 text-sky-600 transition duration-300 ease-in-out lg:h-6 lg:w-6 dark:text-sky-400"
              aria-hidden="true"
            />
            Information importante
          </p>
          <p className="mt-2 text-sm text-sky-800 dark:text-sky-200">
            Ce site n&apos;utilise <strong>AUCUN</strong> cookie strictement
            nécessaire. Toutes les préférences utilisateur sont stockées
            localement sur votre appareil (localStorage) et ne sont jamais
            transmises à nos serveurs.
          </p>
        </div>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          2.2. Cookies de statistiques (consentement requis)
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Ces cookies nécessitent votre consentement explicite avant d&apos;être
          déposés :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Liste des cookies de statistiques
            </caption>
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Nom du cookie
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Durée
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Finalité
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Éditeur
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_CATEGORIES.analytics.cookies.map((cookie) => (
                <tr key={cookie.name}>
                  <th
                    scope="row"
                    className="border border-neutral-300 p-3 text-left font-mono text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                  >
                    {cookie.name}
                  </th>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    2 ans
                  </td>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    {cookie.purpose}
                  </td>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    Google Analytics 4 (Google LLC, États-Unis)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Ces cookies sont déposés par Google Analytics 4 pour mesurer
          l&apos;audience du site de manière anonyme. Les données collectées
          sont conformes au RGPD.
        </p>
      </section>

      <section id="historique" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          2.3. Historique de recherche (optionnel - localStorage)
        </h2>
        <div className="mb-4 rounded-lg border-2 border-dashed border-amber-600 bg-amber-50 px-4 py-3 dark:border-amber-400/60 dark:bg-amber-950/80">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
            <HiExclamationTriangle
              className="mr-2 inline-flex h-4 w-4 shrink-0 text-amber-700 transition duration-300 ease-in-out lg:h-6 lg:w-6 dark:text-amber-400"
              aria-hidden="true"
            />{" "}
            Fonctionnalité désactivée par défaut
          </p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            L&apos;historique de recherche nécessite votre{" "}
            <strong>consentement explicite</strong> et peut être activé dans
            Paramètres &gt; Gestion des cookies.
          </p>
        </div>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Cette fonctionnalité facultative sauvegarde vos 10 dernières
          recherches localement sur votre appareil pour faciliter votre
          navigation. Aucune donnée n&apos;est transmise à nos serveurs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Liste des données d&apos;historique optionnel
            </caption>
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Clé
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Finalité
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Éditeur
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_CATEGORIES.history.cookies.map((cookie) => (
                <tr key={cookie.name}>
                  <th
                    scope="row"
                    className="border border-neutral-300 p-3 text-left font-mono text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                  >
                    {cookie.name}
                  </th>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    {cookie.purpose}
                  </td>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    TRADIMEDIKA (stockage local)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          En activant cette fonctionnalité, vous acceptez explicitement que vos
          recherches soient sauvegardées conformément à notre{" "}
          <Link
            to="/politique-confidentialite"
            className="text-emerald-700 underline transition hover:text-emerald-800 dark:text-emerald-500 dark:hover:text-emerald-400"
          >
            Politique de Confidentialité
          </Link>
          .
        </p>
      </section>

      <section id="localstorage" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          3. Distinction cookies / localStorage
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          TRADIMEDIKA utilise principalement le <strong>localStorage</strong>{" "}
          pour stocker vos préférences. Le localStorage est une technologie
          différente des cookies :
        </p>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-2 border-dashed border-neutral-200 p-4 dark:border-neutral-700">
            <h3 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
              Cookies
            </h3>
            <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
              <li>✓ Envoyés au serveur à chaque requête</li>
              <li>✓ Ont une date d&apos;expiration</li>
              <li>✓ Soumis à la réglementation RGPD</li>
              <li>✓ Peuvent être tiers (Google Analytics)</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-dashed border-emerald-600 bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <h3 className="mb-2 font-semibold text-emerald-900 dark:text-emerald-100">
              localStorage (utilisé sur ce site)
            </h3>
            <ul className="space-y-1 text-sm text-emerald-800 dark:text-emerald-200">
              <li>✓ Restent UNIQUEMENT sur votre appareil</li>
              <li>✓ Jamais envoyés au serveur</li>
              <li>✓ Pas de date d&apos;expiration automatique</li>
              <li>✓ Exempts de consentement RGPD</li>
            </ul>
          </div>
        </div>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Données stockées en localStorage
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Liste des données en localStorage
            </caption>
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Clé
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Finalité
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Éditeur
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_CATEGORIES.necessary.cookies.map((cookie) => (
                <tr key={cookie.name}>
                  <th
                    scope="row"
                    className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                  >
                    {cookie.name}
                  </th>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    {cookie.purpose}
                  </td>
                  <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                    TRADIMEDIKA (stockage local)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Note : Ces données restent uniquement sur votre appareil et ne sont
          jamais transmises à nos serveurs. Elles ne sont pas considérées comme
          des cookies au sens de la directive ePrivacy et ne nécessitent pas de
          consentement explicite.
        </p>
      </section>

      <section id="choix" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          4. Vos choix concernant les cookies
        </h2>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          4.1. Accepter ou refuser les cookies via notre bandeau
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Lors de votre première visite, un bandeau d&apos;information vous
          permet de :
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Accepter tous les cookies (y compris Google Analytics)</li>
          <li>Refuser les cookies non essentiels</li>
          <li>
            Personnaliser vos choix en cliquant sur &quot;Personnaliser mes
            préférences&quot;
          </li>
        </ul>
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          Vous pouvez modifier vos préférences à tout moment en cliquant sur le
          bouton{" "}
          <Link
            to="/gestion-cookies"
            className="font-medium text-emerald-700 underline dark:text-emerald-500"
          >
            &quot;Paramètres des cookies&quot;
          </Link>{" "}
          disponible en bas de chaque page.
        </p>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          4.2. Paramétrage de votre navigateur
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Vous pouvez également configurer votre navigateur pour :
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Bloquer tous les cookies</li>
          <li>Être notifié à chaque dépôt de cookie</li>
          <li>Supprimer les cookies existants</li>
        </ul>

        <div className="space-y-3">
          <details className="rounded-lg border-2 border-dashed border-neutral-200 p-4 dark:border-neutral-700">
            <summary className="cursor-pointer font-semibold text-neutral-900 dark:text-neutral-100">
              Google Chrome
            </summary>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Paramètres → Confidentialité et sécurité → Cookies et autres
              données de sites
            </p>
          </details>

          <details className="rounded-lg border-2 border-dashed border-neutral-200 p-4 dark:border-neutral-700">
            <summary className="cursor-pointer font-semibold text-neutral-900 dark:text-neutral-100">
              Mozilla Firefox
            </summary>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Paramètres → Vie privée et sécurité → Cookies et données de sites
            </p>
          </details>

          <details className="rounded-lg border-2 border-dashed border-neutral-200 p-4 dark:border-neutral-700">
            <summary className="cursor-pointer font-semibold text-neutral-900 dark:text-neutral-100">
              Safari
            </summary>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Préférences → Confidentialité → Cookies et données de sites web
            </p>
          </details>

          <details className="rounded-lg border-2 border-dashed border-neutral-200 p-4 dark:border-neutral-700">
            <summary className="cursor-pointer font-semibold text-neutral-900 dark:text-neutral-100">
              Microsoft Edge
            </summary>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Paramètres → Cookies et autorisations de site → Gérer et supprimer
              les cookies
            </p>
          </details>
        </div>

        <h3 className="mt-6 mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          4.3. Conséquences du refus des cookies
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Le refus des cookies de statistiques (Google Analytics) n&apos;affecte
          pas votre navigation sur le site. Cependant, cela nous empêche de
          mesurer l&apos;audience et d&apos;améliorer nos contenus en fonction
          de vos besoins.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          Le blocage du localStorage peut affecter la mémorisation de vos
          préférences (thème sombre, niveau de performance des animations).
        </p>
      </section>

      <section id="durees" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          5. Durées de conservation
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Conformément aux recommandations de la CNIL :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Durées de conservation des données
            </caption>
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Type de donnée
                </th>
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Durée de conservation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Cookies Google Analytics
                </th>
                <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                  2 ans maximum (durée par défaut)
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Données collectées via GA4
                </th>
                <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                  14 mois maximum (paramétré dans notre propriété)
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Consentement cookies
                </th>
                <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                  12 mois (puis redemande)
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  localStorage
                </th>
                <td className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100">
                  Jusqu&apos;à suppression manuelle par l&apos;utilisateur
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Le consentement que vous nous donnez pour le dépôt de cookies est
          valable 12 mois. Passé ce délai, nous vous redemanderons votre
          consentement.
        </p>
      </section>

      <section
        id="liens"
        className="rounded-lg border-2 border-dashed border-sky-700/60 bg-sky-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-sky-400/60 dark:bg-sky-950/80"
      >
        <h2 className="mb-4 text-xl font-semibold text-sky-900 dark:text-sky-100">
          6. Pour en savoir plus
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <ExternalLink
              href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies"
              siteName="CNIL"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Recommandations CNIL sur les cookies
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://support.google.com/analytics/answer/11397207?hl=fr"
              siteName="Google Analytics"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Documentation Google Analytics 4 sur les cookies
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://support.google.com/analytics/answer/6004245?hl=fr"
              siteName="Google Analytics"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Protection des données Google Analytics
            </ExternalLink>
          </li>
        </ul>
      </section>

      <div className="mt-8 rounded-lg bg-emerald-50 p-6 dark:bg-emerald-900/20">
        <h3 className="mb-3 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          Des questions sur les cookies ?
        </h3>
        <p className="mb-4 text-emerald-800 dark:text-emerald-200">
          Pour toute question concernant l&apos;utilisation des cookies sur
          notre site, vous pouvez nous contacter :
        </p>
        <ExternalLink
          href="https://tally.so/r/q4RN95"
          siteName="Tally"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          Nous contacter
        </ExternalLink>
      </div>
    </div>
  );
}
