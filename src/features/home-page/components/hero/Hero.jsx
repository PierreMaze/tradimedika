import { motion } from "framer-motion";

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
 * @returns {JSX.Element}
 */
export default function Hero() {
  return (
    <>
      <div className="mx-auto mt-8 mb-4 flex h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 flex flex-col items-center justify-center gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16 2xl:gap-y-20"
        >
          {/* En-tête : Badge + Titre + Description */}
          <HeroHeader />

          {/* Formulaire de recherche de symptômes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <HeroSearch />
          </motion.div>

          {/* Liste des fonctionnalités */}
          <HeroFeatures />
        </motion.div>
      </div>
    </>
  );
}
