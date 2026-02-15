import { LiaBalanceScaleSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Button from "../components/ui/button/Button";
import ExternalLink from "../components/ui/links/ExternalLink";

export default function MentionsLegales() {
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
            Mentions Légales
          </li>
        </ol>
      </nav>

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Mentions Légales
      </h1>

      <p className="mb-6 text-sm text-neutral-600 italic dark:text-neutral-400">
        Dernière mise à jour : 25 janvier 2026
      </p>

      <nav
        aria-label="Sommaire"
        className="mb-8 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
      >
        <h2 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Sommaire
        </h2>
        <div className="h-full max-h-fit border-l-4 border-emerald-600 pl-4 dark:border-emerald-500">
          <ul className="space-y-2 pl-2">
            <li className="animate-fade-in-up text-sm leading-relaxed font-medium text-black delay-300 motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white">
              <a
                href="#editeur"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                1. Éditeur du site
              </a>
            </li>
            <li className="animate-fade-in-up text-sm leading-relaxed font-medium text-black delay-350 motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white">
              <a
                href="#hebergeur"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                2. Hébergement
              </a>
            </li>
            <li className="animate-fade-in-up text-sm leading-relaxed font-medium text-black delay-400 motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white">
              <a
                href="#directeur"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                3. Directeur de publication
              </a>
            </li>
            <li className="animate-fade-in-up text-sm leading-relaxed font-medium text-black delay-450 motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white">
              <a
                href="#propriete"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                4. Propriété intellectuelle
              </a>
            </li>
            <li className="animate-fade-in-up text-sm leading-relaxed font-medium text-black delay-500 motion-reduce:animate-none motion-reduce:opacity-100 2xl:text-base dark:text-white">
              <a
                href="#responsabilite"
                className="text-emerald-700 transition hover:underline dark:text-emerald-500"
              >
                5. Limitation de responsabilité
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="editeur" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          1. Éditeur du site
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004
          pour la confiance dans l&apos;économie numérique (LCEN), les
          informations suivantes sont portées à la connaissance des utilisateurs
          :
        </p>
        <div className="rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
          <p className="mb-2 text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Nom :</span> Pierre MAZELAYGUE
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Email :</span>{" "}
            <a
              href="mailto:promazelaygue@gmail.com"
              className="text-emerald-600 transition hover:underline dark:text-emerald-500"
            >
              promazelaygue@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section id="hebergeur" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          2. Hébergement
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Le site TRADIMEDIKA est hébergé par :
        </p>
        <div className="rounded-lg border-2 border-dashed border-emerald-700/60 bg-emerald-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-emerald-400/60 dark:bg-emerald-950/80">
          <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
            GitHub, Inc.
          </p>
          <p className="mb-2 text-neutral-700 dark:text-neutral-300">
            88 Colin P Kelly Jr Street
            <br />
            San Francisco, CA 94107
            <br />
            États-Unis
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Site web :{" "}
            <ExternalLink
              href="https://www.github.com"
              siteName="GitHub"
              className="text-emerald-600 transition hover:underline dark:text-emerald-500"
            >
              https://www.github.com
            </ExternalLink>
          </p>
        </div>
      </section>

      <section id="directeur" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          3. Directeur de publication
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Le directeur de la publication est :{" "}
          <strong>Pierre MAZELAYGUE</strong>
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          Contact :{" "}
          <a
            href="mailto:promazelaygue@gmail.com"
            className="text-emerald-600 transition hover:underline dark:text-emerald-500"
          >
            promazelaygue@gmail.com
          </a>
        </p>
      </section>

      <section id="propriete" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          4. Propriété intellectuelle
        </h2>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          L&apos;ensemble de ce site (structure, textes, logos, images, éléments
          graphiques) relève de la législation française et internationale sur
          le droit d&apos;auteur et la propriété intellectuelle.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Tous les droits de reproduction sont réservés, y compris pour les
          documents téléchargeables et les représentations iconographiques et
          photographiques. Toute reproduction, totale ou partielle, est
          interdite sans l&apos;autorisation expresse de l&apos;éditeur.
        </p>
        <div className="rounded-lg border-2 border-dashed border-amber-700/60 bg-amber-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-amber-400/60 dark:bg-amber-950/80">
          <p className="font-semibold text-amber-900 dark:text-amber-100">
            <LiaBalanceScaleSolid
              className="mr-2 inline-flex h-5 w-5 shrink-0 text-amber-700 transition duration-300 ease-in-out lg:h-6 lg:w-6 dark:text-amber-400"
              aria-hidden="true"
            />
            Important
          </p>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
            Les contenus proposés sur ce site (produits naturels, informations
            médicales) sont fournis à titre informatif uniquement et ne
            constituent pas un avis médical professionnel. Consultez toujours un
            professionnel de santé qualifié avant d&apos;utiliser tout produit.
          </p>
        </div>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Référence :{" "}
          <ExternalLink
            href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006069414"
            siteName="Légifrance"
            className="text-emerald-600 transition hover:underline dark:text-emerald-500"
          >
            Code de la propriété intellectuelle
          </ExternalLink>
        </p>
      </section>

      <section id="responsabilite" className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          5. Limitation de responsabilité
        </h2>
        <h3 className="mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          5.1. Informations médicales
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Les informations contenues sur ce site concernant les produits
          naturels sont fournies à titre indicatif et éducatif uniquement. Elles
          ne sauraient engager la responsabilité de l&apos;éditeur et ne peuvent
          en aucun cas se substituer à une consultation médicale
          professionnelle.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          L&apos;éditeur ne garantit pas l&apos;exactitude, la complétude ou
          l&apos;actualité des informations diffusées sur le site.
          L&apos;utilisation des produits proposés se fait sous la seule
          responsabilité de l&apos;utilisateur.
        </p>

        <h3 className="mt-6 mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          5.2. Disponibilité du site
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          L&apos;éditeur s&apos;efforce d&apos;assurer la disponibilité du site
          24h/24, 7j/7. Toutefois, il se réserve le droit d&apos;interrompre
          temporairement l&apos;accès au site pour des opérations de
          maintenance, de mise à jour ou pour toute autre raison technique, sans
          préavis ni indemnité.
        </p>

        <h3 className="mt-6 mb-3 text-lg font-medium text-neutral-900 dark:text-neutral-100">
          5.3. Liens externes
        </h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Le site peut contenir des liens vers des sites externes.
          L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et décline
          toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section className="rounded-lg border-2 border-dashed border-sky-700/60 bg-sky-50 px-4 py-3 transition-all duration-300 ease-in-out dark:border-sky-400/60 dark:bg-sky-950/80">
        <h2 className="mb-4 text-xl font-semibold text-sky-900 dark:text-sky-100">
          Textes de référence
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <ExternalLink
              href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164"
              siteName="Légifrance"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Loi n° 2004-575 du 21 juin 2004 pour la confiance dans
              l&apos;économie numérique (LCEN)
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006069414"
              siteName="Légifrance"
              className="text-sky-600 transition hover:underline dark:text-sky-500"
            >
              Code de la propriété intellectuelle
            </ExternalLink>
          </li>
        </ul>
      </section>

      <div className="mt-8 rounded-lg bg-emerald-50 p-6 dark:bg-emerald-900/20">
        <h3 className="mb-3 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          Une question ?
        </h3>
        <p className="mb-4 text-emerald-800 dark:text-emerald-200">
          Pour toute question concernant ces mentions légales, vous pouvez nous
          contacter :
        </p>
        <Button
          as="external"
          href="https://tally.so/r/q4RN95"
          siteName="Tally"
          variant="primary"
        >
          Nous contacter
        </Button>
      </div>
    </div>
  );
}
