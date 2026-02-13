import HeroFeatures from "./HeroFeatures";
import HeroHeader from "./HeroHeader";
import HeroSearch from "./HeroSearch";

/**
 * Composant Hero - Page d'accueil principale
 *
 * Orchestrateur pur qui compose les 3 sections principales :
 * - HeroHeader : Badge, titre et description
 * - HeroSection : Formulaire de recherche de symptômes
 * - HeroFeatures : Liste des fonctionnalités clés
 *
 * Pure component de composition - Ne contient que la structure et la présentation
 * Toute la logique métier est déléguée aux composants enfants
 *
 * Performance: Utilise des animations Tailwind au lieu de Framer Motion pour réduire FCP
 *
 * @returns {JSX.Element}
 */
export default function Hero() {
  return (
    <div className="mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8 lg:py-12">
      <div className="z-20 flex [animation:var(--animate-fade-in-up)] flex-col items-center justify-center gap-y-10 motion-reduce:animate-none motion-reduce:opacity-100 md:gap-y-12 lg:gap-y-14 xl:gap-y-16 2xl:gap-y-20">
        {/* En-tête : Badge + Titre + Description */}
        <HeroHeader />

        {/* Formulaire de recherche de symptômes */}
        <div className="w-full [animation:var(--animate-fade-in-up-delayed)] motion-reduce:animate-none motion-reduce:opacity-100">
          <HeroSearch />
        </div>

        {/* Liste des fonctionnalités */}
        <HeroFeatures />
      </div>
    </div>
  );
}
