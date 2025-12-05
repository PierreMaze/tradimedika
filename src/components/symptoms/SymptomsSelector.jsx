// tradimedika/src/components/symptoms/SymptomsSelector.jsx
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import symptomsData from "../../data/symptoms.json";
import synonymsData from "../../data/synonyms.json";

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
  selectedSymptoms = [],
  placeholder,
}) {
  const { isDarkMode } = useTheme();
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

  // Filtrage en temps réel (case-insensitive, max 10 résultats)
  // Exclut les symptômes déjà sélectionnés ET leurs synonymes
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSymptoms([]);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    const filtered = symptomsData
      .filter((symptom) =>
        symptom.toLowerCase().includes(inputValue.toLowerCase()),
      )
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
    <div className="relative w-full">
      {/* Input avec icône de recherche */}
      <div
        className={`relative flex items-center rounded-lg border shadow-sm ${
          isDarkMode ? "border-neutral-700" : "border-dark/10"
        }`}
      >
        <HiMagnifyingGlass
          className={`absolute left-4 text-xl transition duration-300 ease-in-out ${
            isDarkMode ? "text-light" : "text-dark/60"
          }`}
        />
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
          className={`w-full rounded-lg py-4 pr-4 pl-12 text-sm ring-2 transition duration-300 ease-in-out focus:outline-none lg:text-base 2xl:text-lg ${
            selectedSymptoms.length >= 5 ? "cursor-not-allowed opacity-50" : ""
          } ${
            isDarkMode
              ? "bg-dark text-light placeholder-neutral-400 ring-neutral-500 focus:ring-emerald-500"
              : "text-dark bg-white placeholder-neutral-700 ring-neutral-600 focus:ring-emerald-600"
          }`}
        />
      </div>

      {/* Message de limite atteinte */}
      {selectedSymptoms.length >= 5 && (
        <p
          className={`mt-2 text-sm font-medium ${
            isDarkMode ? "text-amber-400" : "text-amber-600"
          }`}
        >
          Limite de 5 symptômes atteinte. Supprimez-en un pour continuer.
        </p>
      )}

      {/* Dropdown des suggestions */}
      {isOpen && (
        <ul
          ref={listRef}
          id="symptoms-listbox"
          role="listbox"
          className={`absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border shadow-lg transition duration-200 ease-in-out ${
            isDarkMode
              ? "bg-dark border-neutral-700"
              : "border-neutral-200 bg-white"
          }`}
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
                className={`cursor-pointer px-4 py-3 text-sm transition duration-150 ease-in-out lg:text-base 2xl:text-lg ${
                  selectedIndex === index
                    ? isDarkMode
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-600 text-white"
                    : isDarkMode
                      ? "text-light hover:bg-neutral-800"
                      : "text-dark hover:bg-neutral-100"
                }`}
              >
                {capitalizeSymptom(symptom)}
              </li>
            ))
          ) : (
            <li
              className={`px-4 py-3 text-center text-sm italic lg:text-base 2xl:text-lg ${
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
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
  selectedSymptoms: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
};

SymptomsSelector.defaultProps = {
  selectedSymptoms: [],
  placeholder: "Entrez vos symptômes...",
};
