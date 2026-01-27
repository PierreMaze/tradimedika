import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PolitiqueConfidentialite() {
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
            Politique de Confidentialité
          </li>
        </ol>
      </nav>

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Politique de Confidentialité
      </h1>

      <p className="mb-6 text-sm text-neutral-600 italic dark:text-neutral-400">
        Dernière mise à jour : 27 janvier 2026
      </p>

      <div className="mb-8 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
        <p className="text-sm text-emerald-800 dark:text-emerald-200">
          Cette politique de confidentialité vous informe sur la manière dont
          nous collectons, utilisons et protégeons vos données personnelles
          conformément au Règlement Général sur la Protection des Données (RGPD)
          et à la loi Informatique et Libertés.
        </p>
      </div>

      <nav
        aria-label="Sommaire"
        className="mb-8 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
      >
        <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Sommaire
        </h2>
        <div className="h-full max-h-fit border-l-4 border-emerald-600 pl-4 dark:border-emerald-500">
          <motion.ul
            className="space-y-2 pl-2 text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#responsable"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                1. Responsable du traitement
              </a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#donnees"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                2. Données collectées et finalités
              </a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#ga4"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                3. Google Analytics 4 et transfert de données
              </a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#securite"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                4. Sécurité des données
              </a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#modifications"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                5. Modifications
              </a>
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-sm leading-relaxed font-medium text-black 2xl:text-base dark:text-white"
            >
              <a
                href="#contact"
                className="text-emerald-600 transition hover:underline dark:text-emerald-500"
              >
                6. Contact
              </a>
            </motion.li>
          </motion.ul>
        </div>
      </nav>

      <section id="responsable" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          1. Responsable du traitement des données
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Le responsable du traitement des données personnelles est :
        </p>
        <div className="rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
          <p className="mb-2 text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Nom :</span> Pierre MAZELAYGUE
          </p>
          <p className="mb-2 text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Email :</span>{" "}
            <a
              href="mailto:promazelaygue@gmail.com"
              className="text-emerald-600 transition hover:underline dark:text-emerald-500"
            >
              promazelaygue@gmail.com
            </a>
          </p>
        </div>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300">
          Le responsable du traitement s&pos;engage à protéger les données
          personnelles conformément au Règlement (UE) 2016/679 du 27 avril 2016
          (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978
          modifiée.
        </p>
      </section>

      <section id="donnees" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          2. Données collectées et finalités
        </h2>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          2.1. Tableau récapitulatif
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="mb-3 text-left font-semibold text-neutral-900 dark:text-neutral-100">
              Données personnelles collectées sur TRADIMEDIKA
            </caption>
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th
                  scope="col"
                  className="border border-neutral-300 p-3 text-left text-neutral-900 dark:border-neutral-600 dark:text-neutral-100"
                >
                  Donnée collectée
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
                  Base légale
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
                  className="border border-neutral-300 p-3 font-mono text-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                >
                  Adresse IP (via GA4)
                </th>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Statistiques d&apos;audience, amélioration UX
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Consentement (cookies analytiques)
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  14 mois maximum
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 font-mono text-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                >
                  Données de navigation
                </th>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Analyse comportement utilisateur
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Consentement
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  14 mois maximum
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 font-mono text-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                >
                  Préférences utilisateur (thème, performance)
                </th>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Amélioration expérience utilisateur
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Intérêt légitime
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Jusqu&apos;à suppression par l&apos;utilisateur
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border border-neutral-300 p-3 font-mono text-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                >
                  Historique de recherche (optionnel)
                </th>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Sauvegarde vos 10 dernières recherches
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Consentement explicite (désactivé par défaut)
                </td>
                <td className="border border-neutral-300 p-3 text-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
                  Jusqu&apos;à suppression par l&apos;utilisateur
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          2.2. Détail des collectes
        </h3>

        <h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
          Données de navigation (Google Analytics 4)
        </h4>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Avec votre consentement explicite, nous collectons :
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Adresse IP anonymisée</li>
          <li>Pages visitées et durée de visite</li>
          <li>Appareil et navigateur utilisés</li>
          <li>Localisation géographique approximative</li>
        </ul>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          <strong>Finalité :</strong> Mesurer l&pos;audience du site, comprendre
          le comportement des visiteurs et améliorer notre contenu.
          <br />
          <strong>Base légale :</strong> Votre consentement explicite via le
          bandeau cookies.
        </p>

        <h4 className="mt-6 mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
          Historique de recherche (optionnel - désactivé par défaut)
        </h4>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          L&apos;historique de vos recherches peut être sauvegardé localement
          sur votre appareil pour faciliter votre navigation.{" "}
          <strong>Cette fonctionnalité est optionnelle</strong> et désactivée
          par défaut pour respecter votre vie privée.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          <strong>Données collectées :</strong>
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Vos symptômes recherchés (10 dernières recherches maximum)</li>
          <li>Date et heure de chaque recherche</li>
          <li>Nombre de résultats trouvés</li>
        </ul>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          <strong>Stockage et conservation :</strong> Ces données sont stockées{" "}
          <strong>uniquement sur votre appareil</strong>
          (localStorage) et ne sont jamais transmises à nos serveurs. Vous
          pouvez les supprimer à tout moment depuis les Paramètres &gt; Gestion
          des cookies &gt; Réinitialisation des cookies.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          <strong>Activation et désactivation :</strong> Vous pouvez activer ou
          désactiver cette fonctionnalité à tout moment dans Paramètres &gt;
          Gestion des cookies &gt; Historique de recherche.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          <strong>Base légale :</strong> Votre consentement explicite. En
          activant l&apos;historique, vous acceptez que vos recherches soient
          sauvegardées conformément à cette politique de confidentialité.
        </p>

        <h4 className="mt-6 mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
          Données stockées localement (localStorage - essentielles)
        </h4>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Les données suivantes restent sur votre appareil et ne sont jamais
          transmises à nos serveurs :
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Préférence de thème (mode sombre/clair)</li>
          <li>Préférences de performance (animations)</li>
          <li>Historique des symptômes recherchés</li>
          <li>Choix de consentement aux cookies</li>
        </ul>
        <p className="text-neutral-700 dark:text-neutral-300">
          <strong>Finalité :</strong> Personnaliser votre expérience et
          mémoriser vos préférences.
          <br />
          <strong>Base légale :</strong> Intérêt légitime (amélioration UX) et
          stockage local uniquement (pas de transmission).
        </p>

        <div className="mt-6 rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100">
            💡 Aucune donnée sensible
          </p>
          <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
            Nous ne collectons <strong>AUCUNE</strong> donnée sensible au sens
            du RGPD : pas de données de santé, pas de compte utilisateur, pas
            d&apos;identification personnelle directe.
          </p>
        </div>
      </section>

      <section id="ga4" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          3. Google Analytics 4 et transfert de données
        </h2>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          3.1. Utilisation de Google Analytics 4
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Ce site utilise Google Analytics 4, un service d&apos;analyse web
          fourni par Google LLC (&quot;Google&quot;).
        </p>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          3.2. Transfert de données vers les États-Unis
        </h3>
        <div className="mb-4 rounded-lg border-2 border-dashed border-amber-600 bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="font-semibold text-amber-900 dark:text-amber-100">
            ⚠️ Important
          </p>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
            Google Analytics 4 implique un transfert de données personnelles
            vers les États-Unis. Ce transfert est effectué sur la base de votre
            consentement explicite et des clauses contractuelles types de la
            Commission européenne. Google s&apos;engage à respecter le EU-US
            Data Privacy Framework.
          </p>
        </div>

        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          3.3. Cookies utilisés par GA4
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Les cookies Google Analytics ont une durée de conservation de 2 ans
          maximum et nous avons configuré une durée de rétention des données de
          14 mois maximum dans notre propriété GA4.
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>
            <strong>_ga</strong> : Identifiant unique, durée 2 ans
          </li>
          <li>
            <strong>_ga_[ID]</strong> : État de session, durée 2 ans
          </li>
        </ul>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Pour plus d&apos;informations sur la protection des données par Google
          :{" "}
          <a
            href="https://support.google.com/analytics/answer/6004245?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 transition hover:underline dark:text-emerald-500"
          >
            Google Analytics Privacy
          </a>
        </p>
      </section>

      <section id="securite" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          4. Sécurité des données
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Nous mettons en œuvre des mesures techniques et organisationnelles
          appropriées pour protéger vos données :
        </p>
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>Hébergement sécurisé sur GitHub Pages (HTTPS)</li>
          <li>Pas de base de données centralisée</li>
          <li>Stockage local uniquement pour les préférences utilisateur</li>
          <li>Anonymisation des adresses IP dans Google Analytics 4</li>
          <li>Pas de collecte d&apos;identifiants personnels</li>
        </ul>
        <p className="text-neutral-700 dark:text-neutral-300">
          Cependant, aucune méthode de transmission sur Internet n&apos;est 100%
          sécurisée. Nous ne pouvons garantir une sécurité absolue.
        </p>
      </section>

      <section id="modifications" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          5. Modifications de cette politique
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Toute modification sera publiée sur
          cette page avec une date de mise à jour.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          Nous vous encourageons à consulter régulièrement cette page pour
          rester informé de la manière dont nous protégeons vos données.
        </p>
      </section>

      <section id="contact" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          6. Contact
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Pour toute question concernant cette politique de confidentialité ou
          pour exercer vos droits :
        </p>
        <div className="rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
          <p className="text-neutral-700 dark:text-neutral-300">
            Email :{" "}
            <a
              href="mailto:promazelaygue@gmail.com"
              className="font-medium text-emerald-600 transition hover:underline dark:text-emerald-500"
            >
              promazelaygue@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section className="rounded-lg border-2 border-dashed border-sky-700/60 bg-sky-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-sky-400/60 dark:bg-sky-950/80">
        <h2 className="mb-4 text-xl font-semibold text-sky-900 dark:text-sky-100">
          Textes de référence
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Règlement (UE) 2016/679 (RGPD)
            </a>
          </li>
          <li>
            <a
              href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Loi Informatique et Libertés
            </a>
          </li>
          <li>
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Commission Nationale de l&pos;Informatique et des Libertés (CNIL)
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
