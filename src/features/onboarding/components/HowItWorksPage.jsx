import PropTypes from "prop-types";
import { FaDisease, FaHandHoldingMedical, FaRssSquare } from "react-icons/fa";
import {
  IoBookOutline,
  IoChatbubblesOutline,
  IoCheckmarkCircleOutline,
  IoCompassOutline,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoFlaskSharp,
  IoLeafOutline,
  IoLibraryOutline,
  IoListOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoRocketOutline,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineCompareArrows } from "react-icons/md";

import { Link } from "react-router-dom";

const VALUES = [
  {
    icon: IoShieldCheckmarkOutline,
    title: "Transparence",
    description:
      "Chaque information est sourcée et vérifiable. Nous indiquons systématiquement le niveau de preuve scientifique associé à chaque propriété.",
  },
  {
    icon: IoLibraryOutline,
    title: "Rigueur scientifique",
    description:
      "Notre base de données s'appuie sur la littérature scientifique et les organismes de référence (OMS, EMA, ANSES). Aucune allégation sans fondement.",
  },
  {
    icon: IoPeopleOutline,
    title: "Accessibilité",
    description:
      "Les informations sont présentées de manière claire et compréhensible, aussi bien pour les professionnels de santé que pour les étudiants en médecine.",
  },
];

const TUTORIAL_STEPS = [
  {
    step: 1,
    icon: IoListOutline,
    title: "Parcourir le catalogue",
    description:
      "Accédez à la liste complète des produits naturels par ordre alphabétique. Utilisez la recherche pour trouver rapidement un produit spécifique. Chaque fiche affiche le type de produit, ses propriétés principales et les tags de sécurité (grossesse, enfants, vérification professionnelle).",
    link: { to: "/products", label: "Catalogue" },
    prototype: true,
    instable: true,
  },
  {
    step: 2,
    icon: IoSearchOutline,
    title: "Recherche avancée",
    description:
      "Utilisez les filtres avancés pour affiner vos résultats : type de produit, catégorie thérapeutique, propriétés spécifiques, compatibilité grossesse, âge enfant, allergènes et niveau de preuve scientifique. Combinez plusieurs critères pour des recherches précises adaptées à vos besoins cliniques.",
    link: { to: "/dashboard/recherche-avancee", label: "Recherche avancée" },
    prototype: true,
    instable: true,
  },
  {
    step: 3,
    icon: IoBookOutline,
    title: "Consulter les fiches détaillées",
    description:
      "Chaque produit dispose d'une fiche complète avec propriétés thérapeutiques, symptômes associés, contre-indications, allergènes, conseils d'utilisation et sources scientifiques référencées. Les scores d'efficacité seront ajoutés prochainement.",
    prototype: true,
    instable: true,
  },
  {
    step: 4,
    icon: IoEyeOutline,
    title: "Vérifier les niveaux de preuve",
    description:
      "Consultez la méthodologie des niveaux de preuve scientifique pour évaluer la fiabilité des données. Chaque propriété est classée selon le système GRADE : de A (preuve scientifique solide) à D (usage traditionnel uniquement). Cette page explique comment interpréter ces niveaux.",
    link: { to: "/dashboard/preuves", label: "Niveaux de preuve" },
    prototype: true,
    instable: true,
  },
];

const UPCOMING_FEATURES = [
  {
    icon: MdOutlineCompareArrows,
    title: "Interactions",
    description:
      "Vérifier les interactions entre produits naturels et médicaments.",
  },
  {
    icon: FaDisease,
    title: "Recherche par pathogène",
    description:
      "Rechercher des produits naturels spécifiques pour un pathogène donné.",
  },
  {
    icon: IoDocumentTextOutline,
    title: "Exports PDF",
    description: "Générer des fiches d'information pour vos patients.",
  },

  {
    icon: IoStarOutline,
    title: "Favoris",
    description: "Sauvegarder et organiser vos produits favoris.",
  },
  {
    icon: FaHandHoldingMedical,
    title: "Protocoles naturels",
    description: "Créer des recommandations naturelles pour vos patients.",
  },

  {
    icon: IoTimeOutline,
    title: "Historique de recherche",
    description:
      "Consulter l'historique de vos recherches et consultations (catalogue, fiches produits, recherche avancée, niveaux de preuve).",
  },
  {
    icon: IoPersonOutline,
    title: "Espace patient simplifié",
    description:
      "Interface adaptée et sécurisée (RGPD) pour les patients avec fonctionnalités essentielles.",
  },
  {
    icon: IoFlaskSharp,
    title: "Espace scientifique",
    description:
      "Accéder aux fiches scientifiques détaillées et publications pour chaque produit.",
  },

  {
    icon: FaRssSquare,
    title: "Veille médicale",
    description:
      "Suivre les nouvelles études sur les médecines naturelles avec un flux RSS personnalisé.",
  },
  {
    icon: IoPeopleOutline,
    title: "Contribution scientifique",
    description:
      "Proposer des corrections et enrichissements de la base de données.",
  },

  {
    icon: IoChatbubblesOutline,
    title: "Forum médical",
    description:
      "Échanger avec d'autres professionnels sur les produits naturels, interactions et retours d'expérience.",
  },
];

function SectionTitle({ icon: Icon, children, color = "emerald" }) {
  const colorClasses = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    sky: "text-sky-600 dark:text-sky-400",
  };

  return (
    <h2
      className={`flex items-center gap-2 text-xl font-bold lg:text-2xl ${colorClasses[color]}`}
    >
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
      {children}
    </h2>
  );
}

SectionTitle.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["emerald", "emerald", "sky"]),
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-neutral-800 lg:text-3xl dark:text-white">
          Comment ça marche ?
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Découvrez les valeurs, le fonctionnement et la direction de
          Tradimedika.
        </p>
      </div>

      {/* Les valeurs */}
      <section>
        <SectionTitle icon={IoLeafOutline} color="emerald">
          Nos valeurs
        </SectionTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20"
              >
                <Icon
                  className="mb-3 text-2xl text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-neutral-800 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tutoriel */}
      <section>
        <SectionTitle icon={IoCompassOutline} color="emerald">
          Comment utiliser l&apos;application
        </SectionTitle>
        <div className="mt-4 space-y-4">
          {TUTORIAL_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="flex gap-4 rounded-xl border-2 border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {step.step}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-white">
                      <Icon
                        className="text-lg text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      {step.title}
                    </h3>
                    {step.prototype && (
                      <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Prototype
                      </span>
                    )}
                    {step.instable && (
                      <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-200">
                        Instable
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                  {step.link && (
                    <Link
                      to={step.link.to}
                      className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      {step.link.label} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fonctionnalités à venir */}
      <section>
        <SectionTitle icon={IoRocketOutline} color="sky">
          Fonctionnalités à venir
        </SectionTitle>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Ces fonctionnalités sont en cours de développement et seront
          disponibles prochainement.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {UPCOMING_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 p-4 dark:border-sky-600/40 dark:bg-sky-900/10"
              >
                <Icon
                  className="mt-0.5 shrink-0 text-lg text-sky-600 dark:text-sky-400"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-white">
                      {feature.title}
                    </h3>
                    <span className="rounded bg-sky-200 px-1.5 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-800/40 dark:text-sky-300">
                      Prochainement
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direction du projet */}
      <section className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-900/20">
        <SectionTitle icon={IoCheckmarkCircleOutline} color="emerald">
          Direction du projet
        </SectionTitle>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Tradimedika a pour vocation de devenir{" "}
            <strong>l&apos;outil de référence</strong> pour les professionnels
            de santé souhaitant intégrer les médecines naturelles dans leur
            pratique, de manière informée et sécurisée.
          </p>
          <p>
            Notre approche repose sur un{" "}
            <strong>enrichissement continu des données</strong>, validé par des
            sources scientifiques reconnues. Chaque produit est documenté avec
            son niveau de preuve, ses contre-indications et ses interactions
            connues.
          </p>
          <p>
            À terme, avec des fondations solides et une communauté active, la
            plateforme proposera des{" "}
            <strong>partenariats avec des laboratoires</strong> et des{" "}
            <strong>organismes de formation</strong> pour enrichir la base de
            données et offrir des outils toujours plus adaptés aux besoins des
            praticiens.
          </p>
          <p>
            Nous ne proposons pas de produits, mais un{" "}
            <strong>outil d&apos;information</strong> pour les professionnels de
            santé.{" "}
            <strong>
              Les fonctionnalités actuelles (Catalogue, Recherche avancée,
              Niveaux de preuve) sont des prototypes et ne remplacent pas un
              avis médical professionnel.
            </strong>
          </p>
        </div>
      </section>

      {/* CTA retour */}
      <div className="text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
