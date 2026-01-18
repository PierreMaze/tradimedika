// components/input/AllergyForm.jsx
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { BUTTON_PRIMARY_STYLES } from "../../../constants/buttonStyles";
import allergensList from "../../../data/allergensList.json";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { normalizeForMatching } from "../../symptom-search/utils/normalizeSymptom";
import { useReducedMotion } from "../../settings";
import { useAllergies } from "../context/AllergiesContext";

// Fonction pour capitaliser la première lettre
const capitalizeAllergen = (allergen) => {
  return allergen.charAt(0).toUpperCase() + allergen.slice(1);
};

/**
 * Composant de sélection des allergies avec autocomplétion
 * - Input avec recherche filtrée
 * - Dropdown de suggestions
 * - Navigation clavier (ArrowUp, ArrowDown, Enter, Escape, Backspace)
 * - Design rouge pour différencier des symptômes (verts)
 *
 * @component
 */
export default function AllergyForm({
  placeholder = "Rechercher une allergie...",
}) {
  const { userAllergies, toggleAllergen } = useAllergies();
  const prefersReducedMotion = useReducedMotion();

  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isForcedClosed, setIsForcedClosed] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const dropdownContainerRef = useRef(null); // Ref pour input + dropdown uniquement

  // Filtrage en temps réel avec matching flexible (accents/casse)
  const filteredAllergens = useMemo(() => {
    if (inputValue.trim() === "") {
      // Si input vide, ne rien afficher
      return [];
    }

    const normalizedInput = normalizeForMatching(inputValue);

    // Chercher dans le nom et la description
    const matches = allergensList.filter((allergen) => {
      // FIX: Assurer la comparaison stricte des IDs (string === string)
      if (userAllergies.includes(String(allergen.id))) {
        return false;
      }

      const normalizedName = normalizeForMatching(allergen.name);
      const normalizedDesc = normalizeForMatching(allergen.description);

      return (
        normalizedName.includes(normalizedInput) ||
        normalizedDesc.includes(normalizedInput)
      );
    });

    // Séparer exact matches et partial matches
    const exactMatches = matches.filter(
      (allergen) => normalizeForMatching(allergen.name) === normalizedInput,
    );
    const partialMatches = matches.filter(
      (allergen) => normalizeForMatching(allergen.name) !== normalizedInput,
    );

    return [...exactMatches, ...partialMatches].slice(0, 10);
  }, [inputValue, userAllergies]);

  // Dérive isOpen du nombre de résultats et de l'état de fermeture forcée
  const isOpen = !isForcedClosed && filteredAllergens.length > 0;

  // Réinitialise selectedIndex et réouvre le dropdown quand inputValue change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Réinitialisation intentionnelle de l'état UI
    setSelectedIndex(-1);
    setIsForcedClosed(false);
  }, [inputValue]);

  // Gestion de la sélection d'un allergène
  const handleSelectAllergen = (allergenId) => {
    toggleAllergen(allergenId);
    setInputValue(""); // Efface l'input après sélection
    setSelectedIndex(-1);

    // Refocus l'input pour continuer la saisie
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Gestion de la perte de focus
  const handleBlur = () => {
    // Vérifier si le nouveau focus est en dehors du container
    // setTimeout nécessaire car le relatedTarget n'est pas toujours disponible immédiatement
    setTimeout(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        setIsForcedClosed(true);
        setSelectedIndex(-1);
      }
    }, 0);
  };

  // Gestion du clavier
  const handleKeyDown = (e) => {
    // Backspace sur input vide → retire le dernier allergène sélectionné
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      userAllergies.length > 0
    ) {
      e.preventDefault();
      const lastAllergen = userAllergies[userAllergies.length - 1];
      toggleAllergen(lastAllergen);
      return;
    }

    if (!isOpen || filteredAllergens.length === 0) {
      if (e.key === "Escape") {
        setInputValue("");
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredAllergens.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredAllergens.length - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredAllergens.length) {
          handleSelectAllergen(filteredAllergens[selectedIndex].id);
        } else if (filteredAllergens.length === 1) {
          handleSelectAllergen(filteredAllergens[0].id);
        }
        break;

      case "Escape":
        e.preventDefault();
        setSelectedIndex(-1);
        setInputValue("");
        break;

      case "Tab":
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  // Scroll automatique vers l'élément sélectionné
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (
        selectedElement &&
        typeof selectedElement.scrollIntoView === "function"
      ) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  // FIX: Fermeture au clic extérieur (refactoré avec hook réutilisable)
  useClickOutside(
    dropdownContainerRef,
    () => {
      setIsForcedClosed(true);
      setSelectedIndex(-1);
    },
    true, // Toujours actif
  );

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Description courte */}
      <p className="text-sm text-neutral-600 lg:text-base dark:text-neutral-300">
        Recherchez et sélectionnez vos allergies pour filtrer les remèdes
        dangereux.
      </p>

      {/* Pills des allergies sélectionnées (style symptômes) */}
      {userAllergies.length > 0 && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center gap-2"
        >
          <AnimatePresence mode="popLayout">
            {userAllergies.map((allergenId) => {
              // FIX: Conversion stricte de l'ID pour le matching
              const allergen = allergensList.find(
                (a) => String(a.id) === String(allergenId),
              );
              if (!allergen) return null;

              return (
                <motion.button
                  key={allergenId}
                  initial={
                    prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => toggleAllergen(allergenId)}
                  aria-label={`Supprimer ${allergen.name}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 shadow-md ${BUTTON_PRIMARY_STYLES}`}
                >
                  <span className="text-sm font-medium tracking-wider lg:text-base">
                    {capitalizeAllergen(allergen.name)}
                  </span>
                  <IoMdClose className="text-lg" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      <div ref={dropdownContainerRef} className="relative w-full">
        {/* Input avec icône de recherche */}
        <div className="border-dark/10 relative flex items-center rounded-lg border shadow-sm dark:border-neutral-700">
          <HiMagnifyingGlass className="text-dark/60 dark:text-light absolute left-4 text-xl transition duration-300 ease-in-out" />
          <input
            ref={inputRef}
            type="text"
            name="allergies"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            role="combobox"
            aria-label="Recherche d'allergies"
            aria-expanded={isOpen}
            aria-controls="allergies-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              selectedIndex >= 0
                ? `allergen-option-${selectedIndex}`
                : undefined
            }
            className="text-dark dark:bg-dark dark:text-light w-full appearance-none rounded-lg bg-white py-3 pr-4 pl-12 text-sm accent-emerald-700 ring-2 ring-neutral-600 transition duration-300 ease-in-out placeholder:text-neutral-700 focus:ring-emerald-600 focus:outline-none lg:text-base dark:accent-emerald-500 dark:ring-neutral-500 dark:placeholder:text-neutral-400 dark:focus:ring-emerald-500"
          />
        </div>

        {/* Dropdown des suggestions */}
        {isOpen && (
          <ul
            ref={listRef}
            id="allergies-listbox"
            role="listbox"
            className="dark:bg-dark absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg transition duration-200 ease-in-out dark:border-neutral-700"
          >
            {filteredAllergens.length > 0 ? (
              filteredAllergens.map((allergen, index) => (
                <li
                  key={allergen.id}
                  id={`allergen-option-${index}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Empêche le blur de l'input
                    handleSelectAllergen(allergen.id);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`cursor-pointer px-4 py-3 transition duration-150 ease-in-out ${
                    selectedIndex === index
                      ? "bg-emerald-600 text-white"
                      : "text-dark dark:text-light hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold lg:text-base">
                      {capitalizeAllergen(allergen.name)}
                    </span>
                    <span
                      className={`text-xs lg:text-sm ${
                        selectedIndex === index
                          ? "text-white/80"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {allergen.description}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-center text-sm text-neutral-600 italic lg:text-base dark:text-neutral-400">
                Aucun résultat trouvé
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

AllergyForm.propTypes = {
  placeholder: PropTypes.string,
};
