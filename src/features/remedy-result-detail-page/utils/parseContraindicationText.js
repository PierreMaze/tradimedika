/**
 * Parser pour détecter et wrapper automatiquement les termes médicaux
 * dans le texte libre des contre-indications
 *
 * Retourne un tableau de segments :
 * [{ text: string, termId: string | null, isTerm: boolean }]
 */

/**
 * Map des termes médicaux reconnus dans le texte
 * Clé : texte tel qu'il apparaît dans db.json (insensible à la casse)
 * Valeur : ID kebab-case du terme dans technicalTermsDefinitions.js
 */
const MEDICAL_TERMS_MAP = {
  // Termes exacts
  "ulcères gastriques": "ulceres-gastriques",
  ulcères: "ulceres-gastriques",
  "ulcère gastrique": "ulceres-gastriques",
  "reflux gastro-œsophagien": "reflux-gastro-oesophagien",
  "reflux gastro-oesophagien": "reflux-gastro-oesophagien",
  rgo: "reflux-gastro-oesophagien",
  reflux: "reflux-gastro-oesophagien",
  "sensibilité acide": "sensibilite-acide",
  "troubles digestifs": "troubles-digestifs",
  "irritations gastriques": "irritations-gastriques",
  "irritation gastrique": "irritations-gastriques",
  gastrite: "irritations-gastriques",
  botulisme: "botulisme",
  diabète: "diabete",
  anticoagulants: "anticoagulants",
  anticoagulant: "anticoagulants",
  "troubles de la coagulation": "troubles-coagulation",
  "trouble de la coagulation": "troubles-coagulation",
  "constipation chronique": "constipation-chronique",
  constipation: "constipation-chronique",
  "calculs biliaires": "calculs-biliaires",
  "calcul biliaire": "calculs-biliaires",
  "obstruction biliaire": "obstruction-biliaire",
  grossesse: "grossesse",
  allaitement: "allaitement",
  "hernie hiatale": "hernie-hiatale",
  asthme: "asthme",
  hypertension: "hypertension",
  hypotension: "hypotension",
  "syndrome de l'intestin irritable": "syndrome-intestin-irritable",
  "intestin irritable": "syndrome-intestin-irritable",
  sii: "syndrome-intestin-irritable",
  épilepsie: "epilepsie",
  epilepsie: "epilepsie",
  "antécédents épileptiques": "epilepsie",
  "insuffisance rénale": "insuffisance-renale",
  "insuffisance renale": "insuffisance-renale",
  "insuffisance hépatique": "insuffisance-hepatique",
  "insuffisance hepatique": "insuffisance-hepatique",
  "intervention chirurgicale": "intervention-chirurgicale",
  chirurgie: "intervention-chirurgicale",
  opération: "intervention-chirurgicale",
  palpitations: "palpitations",
  palpitation: "palpitations",
  anxiété: "anxiete",
  anxiete: "anxiete",
  insomnie: "insomnie",
  insomnies: "insomnie",
  lactose: "lactose",
  intolérance: "intolérance",
  protéines: "protéines",
  hémophilie: "hémophilie",
  "brûlures gastriques": "brûlures-gastriques",
  apiacées: "apiacees",
  "troubles cardiovasculaires": "troubles-cardiovasculaires",
};

/**
 * Parse un texte de contre-indication et identifie les termes médicaux
 *
 * @param {string} text - Texte de contre-indication
 * @returns {Array<{text: string, termId: string | null, isTerm: boolean}>}
 *
 * @example
 * parseContraindicationText("ulcères gastriques et reflux gastro-œsophagien")
 * // Returns:
 * // [
 * //   { text: "ulcères gastriques", termId: "ulceres-gastriques", isTerm: true },
 * //   { text: " et ", termId: null, isTerm: false },
 * //   { text: "reflux gastro-œsophagien", termId: "reflux-gastro-oesophagien", isTerm: true }
 * // ]
 */
export function parseContraindicationText(text) {
  if (!text || typeof text !== "string") {
    return [{ text: text || "", termId: null, isTerm: false }];
  }

  // Trier les termes par longueur décroissante pour éviter matches partiels
  // Exemple : "reflux gastro-œsophagien" avant "reflux"
  const sortedTerms = Object.keys(MEDICAL_TERMS_MAP).sort(
    (a, b) => b.length - a.length,
  );

  const segments = [];
  let remainingText = text;
  let currentIndex = 0;

  while (currentIndex < text.length) {
    let matchFound = false;

    // Chercher le prochain terme médical
    for (const term of sortedTerms) {
      const lowerRemainingText = remainingText.toLowerCase();
      const termLower = term.toLowerCase();
      const matchIndex = lowerRemainingText.indexOf(termLower);

      if (matchIndex !== -1) {
        // Ajouter le texte avant le match (si existe)
        if (matchIndex > 0) {
          segments.push({
            text: remainingText.substring(0, matchIndex),
            termId: null,
            isTerm: false,
          });
        }

        // Ajouter le terme médical trouvé
        const matchedText = remainingText.substring(
          matchIndex,
          matchIndex + term.length,
        );
        segments.push({
          text: matchedText,
          termId: MEDICAL_TERMS_MAP[term],
          isTerm: true,
        });

        // Avancer dans le texte
        currentIndex += matchIndex + term.length;
        remainingText = remainingText.substring(matchIndex + term.length);
        matchFound = true;
        break;
      }
    }

    // Si aucun terme trouvé, ajouter le reste du texte
    if (!matchFound) {
      if (remainingText.length > 0) {
        segments.push({
          text: remainingText,
          termId: null,
          isTerm: false,
        });
      }
      break;
    }
  }

  // Si aucun segment créé, retourner le texte original
  if (segments.length === 0) {
    return [{ text, termId: null, isTerm: false }];
  }

  return segments;
}

/**
 * Vérifie si un texte contient des termes médicaux
 * @param {string} text - Texte à analyser
 * @returns {boolean}
 */
export function hasMedicalTerms(text) {
  if (!text || typeof text !== "string") return false;

  const lowerText = text.toLowerCase();
  return Object.keys(MEDICAL_TERMS_MAP).some((term) =>
    lowerText.includes(term.toLowerCase()),
  );
}
