// tradimedika/src/components/symptoms/SymptomsSelector.jsx
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdWarning } from "react-icons/io";
import symptomsData from "../../data/symptomList.json";
import synonymsData from "../../data/synonymsSymptomList.json";
import { normalizeSymptom } from "../../utils/normalizeSymptom";

// Fonction pour capitaliser la première lettre d'un symptôme
const capitalizeSymptom = (symptom) => {
  return symptom.charAt(0).toUpperCase() + symptom.slice(1);
};

// Fonction helper pour obtenir tous les variants d'un symptôme depuis synonyms.json
const getSynonymGroup = (symptom) => {
  return [symptom, ...(synonymsData[symptom] || [])];
};

// Fonction pour vérifier si un symptôme ou ses synonymes sont déjà sélectionnés
const isSymptomOrSynonymSelected = (symptom, selectedSymptoms) => {
  const synonymGroup = getSynonymGroup(symptom);
  return synonymGroup.some((s) => selectedSymptoms.includes(s));
};

export default function SymptomsSelector({
  onSymptomSelect,
  onRemoveSymptom,
  selectedSymptoms = [],
  placeholder,
  onSubmit,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Validation initiale du JSON (logs de développement)
  useEffect(() => {
    if (!Array.isArray(symptomsData)) {
      console.error(
        "[SymptomsSelector] Error: symptoms.json is not a valid array",
      );
      return;
    }
    if (symptomsData.length === 0) {
      console.warn("[SymptomsSelector] Warning: symptoms.json is empty");
      return;
    }
    console.log(
      `[SymptomsSelector] Successfully loaded ${symptomsData.length} symptoms from symptoms.json`,
    );
  }, []);

  // Filtrage en temps réel (normalisé, max 10 résultats)
  // Exclut les symptômes déjà sélectionnés ET leurs synonymes
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSymptoms([]);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    // Normaliser l'input pour la recherche (les données sont déjà normalisées)
    const normalizedInput = normalizeSymptom(inputValue);

    const filtered = symptomsData
      .filter((symptom) => symptom.includes(normalizedInput))
      .filter(
        (symptom) => !isSymptomOrSynonymSelected(symptom, selectedSymptoms),
      )
      .slice(0, 10);

    setFilteredSymptoms(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [inputValue, selectedSymptoms]);

  // Gestion de la sélection d'un symptôme
  const handleSelectSymptom = (symptom) => {
    setInputValue(""); // Efface l'input après sélection (comportement B)
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSymptomSelect) {
      onSymptomSelect(symptom);
    }
  };

  // Gestion du clavier
  const handleKeyDown = (e) => {
    // Backspace sur input vide → supprime le dernier tag
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedSymptoms.length > 0
    ) {
      e.preventDefault();
      const lastSymptom = selectedSymptoms[selectedSymptoms.length - 1];
      if (onRemoveSymptom) {
        onRemoveSymptom(lastSymptom);
      }
      return;
    }

    if (!isOpen || filteredSymptoms.length === 0) {
      if (e.key === "Escape") {
        setInputValue("");
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSymptoms.length - 1 ? prev + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSymptoms.length - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSymptoms.length) {
          handleSelectSymptom(filteredSymptoms[selectedIndex]);
        } else if (filteredSymptoms.length === 1) {
          handleSelectSymptom(filteredSymptoms[0]);
        } else if (!isOpen && selectedSymptoms.length > 0 && onSubmit) {
          // Si dropdown fermé et symptômes sélectionnés, soumettre
          onSubmit();
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        setInputValue("");
        break;

      case "Tab":
        setIsOpen(false);
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
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Input avec icône de recherche */}
      <div className="border-dark/10 relative flex items-center rounded-lg border shadow-sm dark:border-neutral-700">
        <HiMagnifyingGlass className="text-dark/60 dark:text-light absolute left-4 text-xl transition duration-300 ease-in-out" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={selectedSymptoms.length >= 5}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="symptoms-listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            selectedIndex >= 0 ? `symptom-option-${selectedIndex}` : undefined
          }
          className={`text-dark dark:bg-dark dark:text-light w-full rounded-lg bg-white py-4 pr-4 pl-12 text-sm ring-2 ring-neutral-600 transition duration-300 ease-in-out placeholder:text-neutral-700 focus:ring-emerald-600 focus:outline-none lg:text-base 2xl:text-lg dark:ring-neutral-500 dark:placeholder:text-neutral-400 dark:focus:ring-emerald-500 ${
            selectedSymptoms.length >= 5 ? "cursor-not-allowed opacity-50" : ""
          }`}
        />
      </div>

      {/* Message de limite atteinte avec animation */}
      <AnimatePresence>
        {selectedSymptoms.length >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-2 flex items-center gap-2 rounded-lg border-2 border-amber-500 bg-amber-200/50 px-4 py-2 dark:border-amber-500/80 dark:bg-amber-900/20"
          >
            <IoMdWarning className="text-lg text-amber-600 dark:text-amber-400" />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Limite de 5 symptômes atteinte.
              <span className="font-bold"> Supprimez-en un</span> ou
              <span className="font-bold"> continuer</span>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown des suggestions */}
      {isOpen && (
        <ul
          ref={listRef}
          id="symptoms-listbox"
          role="listbox"
          className="dark:bg-dark absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg transition duration-200 ease-in-out dark:border-neutral-700"
        >
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map((symptom, index) => (
              <li
                key={symptom}
                id={`symptom-option-${index}`}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleSelectSymptom(symptom)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`cursor-pointer px-4 py-3 text-sm tracking-wider transition duration-150 ease-in-out lg:text-base 2xl:text-lg ${
                  selectedIndex === index
                    ? "bg-emerald-600 text-white"
                    : "text-dark dark:text-light hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {capitalizeSymptom(symptom)}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-center text-sm text-neutral-600 italic lg:text-base 2xl:text-lg dark:text-neutral-400">
              Aucun résultat trouvé
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

SymptomsSelector.propTypes = {
  onSymptomSelect: PropTypes.func.isRequired,
  onRemoveSymptom: PropTypes.func,
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
};

SymptomsSelector.defaultProps = {
  selectedSymptoms: [],
  placeholder: "Entrez vos symptômes...",
  onSubmit: null,
};
