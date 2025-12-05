// tradimedika-v1/src/components/sections/Hero.jsx
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GiSprout } from "react-icons/gi";
import { IoMdArrowForward } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";
import LeafFall from "../LeafFall";
import SymptomsSelector from "../symptoms/SymptomsSelector";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSymptomSelect = (symptom) => {
    // Vérifier la limite de 5 symptômes
    if (selectedSymptoms.length >= 5) {
      console.warn("Limite de 5 symptômes atteinte");
      return;
    }

    // Vérifier si le symptôme n'est pas déjà dans la liste (anti-doublon)
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      console.log("Symptôme ajouté:", symptom, "Liste:", [
        ...selectedSymptoms,
        symptom,
      ]);
    } else {
      console.log("Symptôme déjà sélectionné:", symptom);
    }
  };

  const handleSearch = () => {
    // Logique de recherche à implémenter
    console.log("Recherche pour symptômes:", selectedSymptoms);
    // TODO: Filtrer db.json par selectedSymptoms
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
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 shadow-md transition duration-300 ease-in-out ${
                isDarkMode
                  ? "border-emerald-500/60 bg-emerald-950 text-emerald-500"
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
        <div className="flex w-full max-w-2xl flex-col items-center gap-y-4 lg:gap-y-6 2xl:gap-y-8">
          {/* Champ de recherche avec autocomplete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <SymptomsSelector
              onSymptomSelect={handleSymptomSelect}
              selectedSymptoms={selectedSymptoms}
              placeholder="Entrez vos symptômes (ex: fatigue, digestion...)"
            />
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
