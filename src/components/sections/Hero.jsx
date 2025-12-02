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
      {/* 🌿 Chute de plantes en arrière-plan */}
      <Suspense fallback={null}>
        <LeafFall />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-20 flex flex-col items-center justify-center gap-y-4 lg:gap-y-8 xl:gap-y-16 2xl:gap-y-20"
      >
        <div className="flex flex-col items-center gap-y-2 lg:gap-y-4 2xl:gap-y-8">
          {/* Tag "Medecine douce & naturelle" */}
          <div className="mx-auto w-fit">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 shadow-md transition duration-300 ease-in-out ${
                isDarkMode
                  ? "bg-dark border-emerald-500/60 text-emerald-500"
                  : "border-dark/60 text-dark bg-white"
              } `}
            >
              <GiSprout
                className={`text-lg transition duration-300 ease-in-out ${
                  isDarkMode ? "text-emerald-500" : "text-emerald-600"
                }`}
              />
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
            <h1 className="text-4xl font-semibold lg:text-6xl 2xl:text-8xl">
              <span
                className={`${isDarkMode ? "text-light" : "text-dark"} transition duration-300 ease-in-out`}
              >
                Soulagez vos symptômes
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
            className={`${isDarkMode ? "text-neutral-400" : "text-neutral-600"} max-w-2xl text-center text-base transition duration-300 ease-in-out lg:text-lg 2xl:max-w-4xl 2xl:text-2xl`}
          >
            Les bienfaits de la méthode douce pour traiter vos maux du
            quotidien.
          </motion.p>
        </div>

        {/* GROUP 2: Search Input + CTA Button */}
        <div className="flex w-full max-w-2xl flex-col items-center gap-y-2 lg:gap-y-4 2xl:gap-y-8">
          {/* Champ de recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <div
              className={`"border-dark/10 relative flex items-center rounded-lg border shadow-sm`}
            >
              <HiMagnifyingGlass
                className={`absolute left-4 text-xl transition duration-300 ease-in-out ${isDarkMode ? "text-light" : "text-dark/60"}`}
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Entrez vos symptômes (ex: maux de tête, fatigue...)"
                className={`transition duration-300 ease-in-out ${isDarkMode ? "text-light bg-dark placeholder-neutral-400 ring-neutral-500 focus:ring-emerald-500" : "text-dark bg-white placeholder-neutral-700 ring-neutral-600 focus:ring-emerald-600"} w-full rounded-lg py-4 pr-4 pl-12 text-sm ring-2 focus:outline-none lg:text-base 2xl:text-lg`}
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
            className={`transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${isDarkMode ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-600 hover:bg-emerald-600/90"} flex items-center gap-2 rounded-lg px-8 py-4 font-semibold text-white shadow-lg transition-colors`}
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
              <FaCheck
                className={`${isDarkMode ? "text-emerald-500/80" : "text-emerald-600/80"} text-sm`}
              />
              <span
                className={`text-sm font-semibold transition duration-300 ease-in-out lg:text-base 2xl:text-lg ${isDarkMode ? "text-neutral-400" : "text-neutral-600"} `}
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
