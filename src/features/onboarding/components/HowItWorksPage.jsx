import PropTypes from "prop-types";
import {
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoCompassOutline,
  IoEyeOutline,
  IoFlaskOutline,
  IoGlobeOutline,
  IoHelpCircleOutline,
  IoLeafOutline,
  IoLibraryOutline,
  IoListOutline,
  IoPeopleOutline,
  IoRocketOutline,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
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
      "Les informations sont présentées de manière claire et compréhensible, aussi bien pour les professionnels de santé que pour le grand public.",
  },
];

const TUTORIAL_STEPS = [
  {
    step: 1,
    icon: IoListOutline,
    title: "Parcourir le catalogue",
    description:
      "Accédez à la liste complète des produits naturels référencés, classés par ordre alphabétique. Chaque fiche affiche le type de produit, ses propriétés principales et les tags de sécurité (grossesse, enfants, vérification professionnelle).",
    link: { to: "/products", label: "Voir le catalogue" },
  },
  {
    step: 2,
    icon: IoSearchOutline,
    title: "Utiliser la recherche avancée",
    description:
      "Filtrez les produits par type, catégorie thérapeutique, propriétés, compatibilité grossesse, âge enfant, allergènes et niveau de preuve. Combinez plusieurs critères pour affiner vos résultats selon les besoins de votre patient.",
    link: { to: "/dashboard/recherche-avancee", label: "Recherche avancée" },
    roles: "pro",
  },
  {
    step: 3,
    icon: IoBookOutline,
    title: "Consulter les fiches détaillées",
    description:
      "Chaque produit dispose d'une fiche complète : propriétés thérapeutiques avec scores, symptômes associés, contre-indications, allergènes, conseils d'utilisation et sources scientifiques.",
  },
  {
    step: 4,
    icon: IoEyeOutline,
    title: "Vérifier les niveaux de preuve",
    description:
      "Consultez la page dédiée aux niveaux de preuve scientifique pour comprendre la fiabilité des données. Chaque propriété est classée de A (preuve solide) à D (usage traditionnel).",
    link: { to: "/dashboard/preuves", label: "Niveaux de preuve" },
    roles: "pro",
  },
];

const UPCOMING_FEATURES = [
  {
    icon: IoFlaskOutline,
    title: "Interactions médicamenteuses",
    description:
      "Base de données des interactions entre produits naturels et médicaments, avec niveaux de sévérité.",
  },
  {
    icon: IoCompassOutline,
    title: "Protocoles naturels",
    description:
      "Création de recommandations personnalisées pour vos patients à partir de la base de données.",
  },
  {
    icon: IoRocketOutline,
    title: "Exports PDF",
    description:
      "Génération de fiches d'information formatées à remettre à vos patients.",
  },
  {
    icon: IoPeopleOutline,
    title: "Contribution médicale",
    description:
      "Possibilité pour les professionnels de proposer des corrections et enrichissements de la base.",
  },
  {
    icon: IoGlobeOutline,
    title: "Veille scientifique",
    description:
      "Suivi des nouvelles publications et études sur les médecines naturelles.",
  },
];

function SectionTitle({ icon: Icon, children, color = "emerald" }) {
  const colorClasses = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
    amber: "text-amber-600 dark:text-amber-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
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
  color: PropTypes.oneOf(["emerald", "cyan", "amber", "indigo"]),
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-neutral-800 lg:text-3xl dark:text-white">
          <IoHelpCircleOutline
            className="h-8 w-8 text-cyan-600 dark:text-cyan-400"
            aria-hidden="true"
          />
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
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20"
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
        <SectionTitle icon={IoCompassOutline} color="cyan">
          Comment utiliser l&apos;application
        </SectionTitle>
        <div className="mt-4 space-y-4">
          {TUTORIAL_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                  {step.step}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-white">
                    <Icon
                      className="text-lg text-cyan-600 dark:text-cyan-400"
                      aria-hidden="true"
                    />
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                  {step.link && (
                    <Link
                      to={step.link.to}
                      className="mt-2 inline-block text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
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
        <SectionTitle icon={IoRocketOutline} color="amber">
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
                className="flex items-start gap-3 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 dark:border-amber-600/40 dark:bg-amber-900/10"
              >
                <Icon
                  className="mt-0.5 shrink-0 text-lg text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-white">
                      {feature.title}
                    </h3>
                    <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-800/40 dark:text-amber-300">
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
      <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-900/20">
        <SectionTitle icon={IoCheckmarkCircleOutline} color="indigo">
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
            À terme, la plateforme proposera des{" "}
            <strong>partenariats avec des laboratoires</strong> et des{" "}
            <strong>organismes de formation</strong> pour enrichir la base de
            données et offrir des outils toujours plus adaptés aux besoins des
            praticiens.
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
