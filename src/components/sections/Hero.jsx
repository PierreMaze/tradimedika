// tradimedika-v1/src/components/sections/Hero.jsx
import { motion } from "framer-motion";
import { Suspense } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiSprout } from "react-icons/gi";
import { IoMdArrowForward } from "react-icons/io";
import { useSymptomTags } from "../../hooks/useSymptomTags";
import LeafFall from "../LeafFall";
import SymptomsSelector from "../input/SymptomsSelector";
import ListSymptomTag from "../tag/ListSymptomTag";

/**
 * Composant wrapper pour isoler le state des symptômes
 * Défini en dehors de Hero pour éviter re-création à chaque render
 */
function SymptomsSection() {
  const { selectedSymptoms, addSymptom, removeSymptom } = useSymptomTags();

  return (
    <div className="flex w-full flex-col gap-y-2">
      <SymptomsSelector
        onSymptomSelect={addSymptom}
        onRemoveSymptom={removeSymptom}
        selectedSymptoms={selectedSymptoms}
        placeholder="Entrez vos symptômes (ex: fatigue, digestion...)"
      />
      <ListSymptomTag
        symptoms={selectedSymptoms}
        onRemoveSymptom={removeSymptom}
      />
    </div>
  );
}

export default function Hero() {
  const handleSearch = () => {
    // TODO: Implémenter logique de recherche avec symptômes sélectionnés
  };

  return (
    <div className="container mx-auto mt-8 mb-4 flex flex-col items-center justify-center px-4">
      {/* 🌿 Chute de plantes en arrière-plan */}
      <Suspense fallback={null}>
        <LeafFall />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-20 flex flex-col items-center justify-center gap-y-8 lg:gap-y-12 xl:gap-y-16 2xl:gap-y-20"
      >
        <div className="flex flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
          {/* Tag "Medecine douce & naturelle" */}
          <div className="mx-auto w-fit">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-dark/60 text-dark flex items-center gap-2 rounded-lg border-2 bg-white px-4 py-2 shadow-md transition duration-300 ease-in-out dark:border-emerald-500/60 dark:bg-emerald-950 dark:text-emerald-500"
            >
              <GiSprout className="text-lg text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-500" />
              <span className="font-sans text-sm font-semibold lg:text-base 2xl:text-lg">
                Méthode Douce & Naturelle
              </span>
            </motion.div>
          </div>
          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
              <span className="text-dark dark:text-light transition duration-300 ease-in-out">
                Soulagez vos symptômes
              </span>
              <br />
              <span className="text-emerald-600 transition duration-300 ease-in-out dark:text-emerald-500">
                naturellement
              </span>
            </h1>
          </motion.div>

          {/* Texte descriptif */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl text-center text-base text-neutral-600 transition duration-300 ease-in-out lg:text-lg 2xl:max-w-4xl 2xl:text-2xl dark:text-neutral-400"
          >
            Les bienfaits de la méthode douce pour traiter vos maux du
            quotidien.
          </motion.p>
        </div>

        {/* GROUP 2: Search Input + CTA Button */}
        <div className="flex w-full flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
          {/* Champ de recherche avec autocomplete + tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <SymptomsSection />
          </motion.div>

          {/* Bouton CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={handleSearch}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-emerald-600/90 lg:text-base 2xl:text-lg dark:bg-emerald-700"
          >
            <span>Découvrir nos solutions</span>
            <IoMdArrowForward className="text-xl" />
          </motion.button>
        </div>

        {/* GROUP 3: Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-12"
        >
          {[
            "+100 plantes & aliments",
            "Santé naturelle",
            "Gratuit",
            "Ne stocke pas vos données",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <FaCheck className="text-sm text-emerald-600/80 dark:text-emerald-500/80" />
              <span className="text-sm font-semibold text-neutral-600 transition duration-300 ease-in-out lg:text-base 2xl:text-lg dark:text-neutral-400">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
