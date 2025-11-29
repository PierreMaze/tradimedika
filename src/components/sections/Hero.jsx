// tradimedika-v1/src/components/sections/Hero.jsx
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiSprout } from "react-icons/gi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdArrowForward } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";
import LeafFall from "../LeafFall";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Logique de recherche à implémenter
    console.log("Recherche:", searchValue);
  };
  return (
    <div className="container mx-auto mt-8 mb-4 flex flex-col items-center justify-center px-4">
      {/* 🌿 Explosion de plantes en arrière-plan */}
      <Suspense fallback={null}>
        <LeafFall />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-20 flex flex-col items-center justify-center gap-y-3"
      >
        {/* Tag "Medecine douce & naturelle" */}
        <div className="mx-auto w-fit">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 transition duration-300 ease-in-out ${
              isDarkMode
                ? "bg-accent/20 border-emerald-500/60 text-emerald-500"
                : "bg-light border-dark/60 text-dark"
            } `}
          >
            <GiSprout
              className={`text-lg transition duration-300 ease-in-out ${
                isDarkMode ? "text-emerald-500" : "text-emerald-500"
              }`}
            />
            <span className="font-sans text-sm font-semibold">
              Medecine douce & naturelle
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
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            <span
              className={`${isDarkMode ? "text-light" : "text-dark"} transition duration-300 ease-in-out`}
            >
              Soulagez vos symptomes
            </span>
            <br />
            <span
              className={`${isDarkMode ? "text-emerald-500" : "text-emerald-600"} transition duration-300 ease-in-out`}
            >
              naturellement
            </span>
          </h1>
        </motion.div>

        {/* Texte descriptif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${isDarkMode ? "text-light/70" : "text-dark/70"} mb-4 max-w-2xl text-center text-base transition duration-300 ease-in-out md:text-lg lg:mb-8`}
        >
          Les bienfaits de la médecine douce pour traiter vos maux du quotidien.
        </motion.p>

        {/* Champ de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-2 w-5/6 max-w-2xl"
        >
          <div
            className={`"border-dark/10 relative flex items-center rounded-lg border shadow-sm`}
          >
            <HiMagnifyingGlass
              className={`absolute left-4 text-xl transition duration-300 ease-in-out ${isDarkMode ? "text-light/60" : "text-dark/60"}`}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Entrez vos symptomes (ex: maux de tete, fatigue...)"
              className={`transition duration-300 ease-in-out ${isDarkMode ? "ring-light/40 text-light bg-light/10 focus:ring-emerald-500" : "ring-dark/50 text-dark bg-white focus:ring-emerald-600"} w-full rounded-lg py-4 pr-4 pl-12 text-sm ring-2 focus:outline-none lg:text-base`}
            />
          </div>
        </motion.div>

        {/* Bouton CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={handleSearch}
          className={`transition duration-300 ease-in-out ${isDarkMode ? "bg-emerald-500 hover:bg-emerald-500/90" : "bg-emerald-600 hover:bg-emerald-600/90"} flex items-center gap-2 rounded-lg px-8 py-4 font-semibold text-white shadow-lg transition-colors`}
        >
          <span>Decouvrir mes solutions</span>
          <IoMdArrowForward className="text-xl" />
        </motion.button>

        {/* Liste des features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-6"
        >
          {[
            "+100 plantes & aliments",
            "Santé naturelle",
            "Gratuit",
            "Ne stock pas vos données",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <FaCheck
                className={`${isDarkMode ? "text-emerald-500/80" : "text-emerald-600/80"} text-sm`}
              />
              <span
                className={`text-sm font-semibold transition duration-300 ease-in-out ${isDarkMode ? "text-light/80" : "text-dark/60"} `}
              >
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
