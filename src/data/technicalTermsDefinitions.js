/**
 * Base de données centralisée des définitions de termes techniques
 * Utilisée par les popovers TermPopover pour afficher les explications
 *
 * Format : IDs en kebab-case pour cohérence avec les slugs
 * Catégories : properties, allergens, medical (un terme peut avoir plusieurs catégories)
 * Structure : { name, definition, wikipediaUrl, categories: ["cat1", "cat2"] }
 */

export const TECHNICAL_TERMS_DATA = {
  // ==================== PROPRIÉTÉS THÉRAPEUTIQUES ====================

  antioxydant: {
    name: "Antioxydant",
    definition:
      "Molécule qui protège les cellules contre les dommages causés par les radicaux libres (molécules instables produites par le métabolisme).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Antioxydant",
    categories: ["properties"],
  },

  "anti-inflammatoire": {
    name: "Anti-inflammatoire",
    definition:
      "Substance qui réduit l'inflammation en diminuant les rougeurs, douleurs, chaleur et gonflements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Anti-inflammatoire",
    categories: ["properties"],
  },

  antimicrobien: {
    name: "Antimicrobien",
    definition:
      "Substance capable de tuer ou d'inhiber la croissance de micro-organismes (bactéries, virus, champignons).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Antimicrobien",
    categories: ["properties"],
  },

  antiseptique: {
    name: "Antiseptique",
    definition:
      "Agent qui prévient les infections en détruisant ou inhibant les micro-organismes sur les tissus vivants.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Antiseptique",
    categories: ["properties"],
  },

  antispasmodique: {
    name: "Antispasmodique",
    definition:
      "Substance qui soulage les crampes et contractions musculaires involontaires, notamment dans le système digestif.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Antispasmodique",
    categories: ["properties"],
  },

  carminatif: {
    name: "Carminatif",
    definition:
      "Aide à expulser les gaz intestinaux et réduit les ballonnements et flatulences.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Carminatif",
    categories: ["properties"],
  },

  "vitamine-c": {
    name: "Vitamine C",
    definition:
      "Vitamine essentielle, puissant antioxydant nécessaire à la synthèse du collagène et au fonctionnement du système immunitaire.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Vitamine_C",
    categories: ["properties"],
  },

  immunostimulant: {
    name: "Immunostimulant",
    definition:
      "Substance qui renforce et stimule les défenses naturelles du système immunitaire.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Immunostimulant",
    categories: ["properties"],
  },

  probiotique: {
    name: "Probiotique",
    definition:
      "Micro-organismes vivants bénéfiques pour la santé intestinale et la flore digestive (comme les lactobacilles).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Probiotique",
    categories: ["properties"],
  },

  laxatif: {
    name: "Laxatif",
    definition:
      "Substance qui facilite l'évacuation des selles et soulage la constipation.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Laxatif",
    categories: ["properties"],
  },

  digestif: {
    name: "Digestif",
    definition:
      "Aide à la digestion en stimulant la production d'enzymes digestives et en facilitant le transit intestinal.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Digestion",
    categories: ["properties"],
  },

  apaisant: {
    name: "Apaisant",
    definition:
      "Calme, relaxe et réduit l'irritation ou l'inconfort physique et nerveux.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Anxiolytique",
    categories: ["properties"],
  },

  stimulant: {
    name: "Stimulant",
    definition:
      "Augmente l'activité physique ou mentale, réduit la fatigue et améliore la vigilance.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Stimulant",
    categories: ["properties"],
  },

  analgesique: {
    name: "Analgésique",
    definition: "Réduit ou supprime la douleur sans perte de conscience.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Analgésique",
    categories: ["properties"],
  },

  protecteur: {
    name: "Protecteur",
    definition:
      "Protège les tissus (peau, muqueuses) contre les agressions externes et favorise leur cicatrisation.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Cicatrisation",
    categories: ["properties"],
  },

  "anti-douleur": {
    name: "Anti-douleur",
    definition:
      "Synonyme d'analgésique, soulage ou élimine la sensation de douleur.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Analgésique",
    categories: ["properties"],
  },

  "anti-nausee": {
    name: "Anti-nausée",
    definition: "Réduit ou prévient les nausées et les vomissements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Antiémétique",
    categories: ["properties"],
  },

  fibres: {
    name: "Fibres",
    definition:
      "Composants végétaux non digestibles qui facilitent le transit intestinal et nourrissent la flore intestinale.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Fibre_alimentaire",
    categories: ["properties"],
  },

  potassium: {
    name: "Potassium",
    definition:
      "Minéral essentiel pour le fonctionnement cardiaque, musculaire et nerveux, aide à réguler la pression artérielle.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Potassium",
    categories: ["properties"],
  },

  attenuer: {
    name: "Atténuer",
    definition: "Diminue l'intensité des symptômes ou de l'inconfort.",
    wikipediaUrl: null,
    categories: ["properties"],
  },

  calment: {
    name: "Calmant",
    definition: "Apaise et réduit l'agitation, l'anxiété ou l'irritation.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Sédatif",
    categories: ["properties"],
  },

  desinfectant: {
    name: "Désinfectant",
    definition:
      "Détruit les micro-organismes pathogènes sur les surfaces inertes ou les tissus.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Désinfectant",
    categories: ["properties"],
  },

  energie: {
    name: "Énergie",
    definition:
      "Apporte de l'énergie via des glucides, lipides ou stimulants naturels.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Énergie_(nutrition)",
    categories: ["properties"],
  },

  // ==================== ALLERGÈNES ET SENSIBILITÉS ====================

  agrumes: {
    name: "Agrumes",
    definition:
      "Famille de fruits comprenant citrons, oranges, pamplemousses. Allergies croisées fréquentes avec pollens.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Agrume",
    categories: ["allergens"],
  },

  allium: {
    name: "Allium",
    definition:
      "Famille botanique incluant ail, oignon, poireau, échalote. Peut causer intolérances digestives et allergies.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Allium",
    categories: ["allergens"],
  },

  fodmap: {
    name: "FODMAP",
    definition:
      "Glucides fermentescibles (Fermentable Oligosaccharides, Disaccharides, Monosaccharides And Polyols) pouvant causer ballonnements et troubles digestifs chez les personnes sensibles.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/FODMAP",
    categories: ["allergens"],
  },

  sulfites: {
    name: "Sulfites",
    definition:
      "Conservateurs alimentaires (E220-E228) pouvant déclencher réactions allergiques, notamment asthme chez personnes sensibles.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Sulfite",
    categories: ["allergens"],
  },

  eugenol: {
    name: "Eugénol",
    definition:
      "Composé aromatique présent dans le clou de girofle, pouvant causer allergies de contact et irritations.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Eugénol",
    categories: ["allergens"],
  },

  propolis: {
    name: "Propolis",
    definition:
      "Résine produite par les abeilles, risque d'allergie croisée avec pollens et venin d'abeille.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Propolis",
    categories: ["allergens"],
  },

  "latex-fruit": {
    name: "Syndrome latex-fruit",
    definition:
      "Allergie croisée entre latex et certains fruits (banane, avocat, kiwi, châtaigne) partageant des protéines similaires.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Syndrome_latex-fruit",
    categories: ["allergens"],
  },

  zingiberacees: {
    name: "Zingibéracées",
    definition:
      "Famille botanique incluant gingembre, curcuma, cardamome. Allergies croisées possibles entre membres.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Zingiberaceae",
    categories: ["allergens"],
  },

  asteracees: {
    name: "Astéracées",
    definition:
      "Famille botanique (ex-composées) incluant camomille, arnica, chrysanthème. Risque élevé d'allergies croisées avec pollens.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Asteraceae",
    categories: ["allergens"],
  },

  lamiacees: {
    name: "Lamiacées",
    definition:
      "Famille botanique (ex-labiées) incluant menthe, thym, basilic, lavande. Huiles essentielles puissantes pouvant irriter.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Lamiaceae",
    categories: ["allergens"],
  },

  menthol: {
    name: "Menthol",
    definition:
      "Composé de la menthe créant sensation de froid. Peut irriter muqueuses et déclencher bronchospasmes chez asthmatiques.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Menthol",
    categories: ["allergens"],
  },

  caféine: {
    name: "Caféine",
    definition:
      "Stimulant pouvant causer palpitations, anxiété, insomnie. Interactions avec médicaments et sensibilité variable selon individus.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Caféine",
    categories: ["allergens"],
  },

  lactose: {
    name: "lactose",
    definition:
      "Sucre du lait pouvant causer intolérances (déficit en lactase) avec ballonnements, diarrhées chez 65% de la population mondiale adulte.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Lactose",
    categories: ["allergens", "medical"],
  },

  bromelaine: {
    name: "Bromélaïne",
    definition:
      "Enzyme protéolytique de l'ananas, peut causer allergies, irritations buccales et interactions médicamenteuses (anticoagulants).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Bromélaïne",
    categories: ["allergens"],
  },

  rosacees: {
    name: "Rosacées",
    definition:
      "Famille botanique incluant pruneau, pomme, pêche, amande. Allergies croisées fréquentes avec pollens de bouleau.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Rosaceae",
    categories: ["allergens"],
  },

  sorbitol: {
    name: "Sorbitol",
    definition:
      "Polyol (sucre-alcool) FODMAP présent dans pruneaux et fruits à noyau, effet laxatif, peut causer ballonnements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Sorbitol",
    categories: ["allergens"],
  },

  latex: {
    name: "Latex",
    definition:
      "Caoutchouc naturel, allergies croisées avec fruits (banane, avocat, kiwi) via syndrome latex-fruit.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Latex",
    categories: ["allergens"],
  },

  aloine: {
    name: "Aloïne",
    definition:
      "Composé laxatif puissant de l'aloe vera (gel extérieur jaune), toxique à forte dose, contre-indiqué grossesse/allaitement.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Aloïne",
    categories: ["allergens"],
  },

  apiacees: {
    name: "apiacées",
    definition:
      "Famille botanique (ex-ombellifères) incluant fenouil, carotte, céleri, anis, persil. Risque d'allergies croisées et FODMAP.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Apiaceae",
    categories: ["allergens"],
  },

  // ==================== TERMES MÉDICAUX ====================

  "ulceres-gastriques": {
    name: "Ulcères gastriques",
    definition:
      "Plaies dans la paroi de l'estomac causées par l'acide gastrique. Les aliments acides peuvent aggraver les symptômes.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Ulcère_gastro-duodénal",
    categories: ["medical"],
  },

  "reflux-gastro-oesophagien": {
    name: "Reflux gastro-œsophagien (RGO)",
    definition:
      "Remontée d'acide de l'estomac vers l'œsophage causant brûlures et irritations. Certains aliments relaxent le sphincter œsophagien et aggravent les symptômes.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Reflux_gastro-œsophagien",
    categories: ["medical"],
  },

  "sensibilite-acide": {
    name: "Sensibilité acide",
    definition:
      "Intolérance aux aliments acides (agrumes, tomates, vinaigre) causant irritations gastriques, reflux ou brûlures.",
    wikipediaUrl: null,
    categories: ["medical"],
  },

  "troubles-digestifs": {
    name: "Troubles digestifs",
    definition:
      "Ensemble de symptômes affectant la digestion : ballonnements, douleurs abdominales, diarrhées, constipation.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Trouble_digestif",
    categories: ["medical"],
  },

  "irritations-gastriques": {
    name: "Irritations gastriques",
    definition:
      "Inflammation ou irritation de la muqueuse de l'estomac causant douleurs, nausées, inconfort digestif.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Gastrite",
    categories: ["medical"],
  },

  botulisme: {
    name: "Botulisme",
    definition:
      "Intoxication grave causée par la bactérie Clostridium botulinum. Le miel peut contenir des spores dangereuses pour les bébés de moins d'1 an (RISQUE MORTEL).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Botulisme",
    categories: ["medical"],
  },

  diabete: {
    name: "Diabète",
    definition:
      "Maladie chronique où le corps ne régule pas correctement le taux de sucre dans le sang (glycémie). Attention aux aliments riches en sucres.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Diabète",
    categories: ["medical"],
  },

  anticoagulants: {
    name: "Anticoagulants",
    definition:
      "Médicaments qui fluidifient le sang pour prévenir caillots. Certains aliments (gingembre, ail) peuvent amplifier l'effet et causer saignements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Anticoagulant",
    categories: ["medical"],
  },

  "troubles-coagulation": {
    name: "Troubles de la coagulation",
    definition:
      "Anomalies de la coagulation sanguine (hémophilie, etc.). Certains aliments peuvent aggraver le risque de saignements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Coagulation",
    categories: ["medical"],
  },

  "constipation-chronique": {
    name: "Constipation chronique",
    definition:
      "Difficulté persistante à évacuer les selles. Certains aliments (riz, banane) peuvent aggraver en ralentissant le transit.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Constipation",
    categories: ["medical"],
  },

  "calculs-biliaires": {
    name: "Calculs biliaires",
    definition:
      "Petits cailloux formés dans la vésicule biliaire. Certains aliments stimulent contractions de la vésicule et peuvent déclencher coliques.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Lithiase_biliaire",
    categories: ["medical"],
  },

  "obstruction-biliaire": {
    name: "Obstruction biliaire",
    definition:
      "Blocage des voies biliaires empêchant l'écoulement de la bile. Éviter les stimulants biliaires (curcuma, gingembre).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Cholestase",
    categories: ["medical"],
  },

  allaitement: {
    name: "Allaitement",
    definition:
      "Période où certains composés passent dans le lait maternel et peuvent affecter le bébé (stimulants, laxatifs, allergènes).",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Allaitement",
    categories: ["medical"],
  },

  "hernie-hiatale": {
    name: "Hernie hiatale",
    definition:
      "Une partie de l'estomac remonte à travers le diaphragme. Les aliments relaxant le sphincter œsophagien (menthe) aggravent le reflux.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Hernie_hiatale",
    categories: ["medical"],
  },

  asthme: {
    name: "Asthme",
    definition:
      "Maladie respiratoire chronique avec bronchospasmes. Le menthol et certains allergènes peuvent déclencher crises.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Asthme",
    categories: ["medical"],
  },

  hypertension: {
    name: "Hypertension",
    definition:
      "Pression artérielle élevée. Attention à la caféine et au sel qui peuvent aggraver les symptômes.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Hypertension_artérielle",
    categories: ["medical"],
  },

  hypotension: {
    name: "Hypotension",
    definition:
      "Pression artérielle basse. Certains aliments (gingembre, ail) peuvent abaisser davantage la tension.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Hypotension_artérielle",
    categories: ["medical"],
  },

  "syndrome-intestin-irritable": {
    name: "Syndrome de l'intestin irritable (SII)",
    definition:
      "Troubles fonctionnels digestifs chroniques avec douleurs, ballonnements, diarrhées/constipation. Sensibilité aux FODMAP.",
    wikipediaUrl:
      "https://fr.wikipedia.org/wiki/Syndrome_de_l%27intestin_irritable",
    categories: ["medical"],
  },

  epilepsie: {
    name: "Épilepsie",
    definition:
      "Maladie neurologique avec crises convulsives. Certaines huiles essentielles (menthe, eucalyptus) peuvent abaisser le seuil épileptogène.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Épilepsie",
    categories: ["medical"],
  },

  "insuffisance-renale": {
    name: "Insuffisance rénale",
    definition:
      "Les reins ne filtrent plus correctement. Attention au potassium (banane) et certaines plantes toxiques pour les reins.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Insuffisance_rénale",
    categories: ["medical"],
  },

  "insuffisance-hepatique": {
    name: "Insuffisance hépatique",
    definition:
      "Le foie ne fonctionne plus correctement. Éviter les plantes hépatotoxiques et les interactions médicamenteuses.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Insuffisance_hépatique",
    categories: ["medical"],
  },

  "intervention-chirurgicale": {
    name: "Intervention chirurgicale",
    definition:
      "Opération médicale nécessitant anesthésie. Arrêter anticoagulants naturels (ail, gingembre) 2 semaines avant pour éviter saignements.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Chirurgie",
    categories: ["medical"],
  },

  palpitations: {
    name: "Palpitations",
    definition:
      "Battements cardiaques anormalement perçus (rapides, irréguliers). La caféine peut aggraver les symptômes.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Palpitation",
    categories: ["medical"],
  },

  insomnie: {
    name: "Insomnie",
    definition: "Difficulté à s'endormir ou à rester endormi.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Insomnie",
    categories: ["medical"],
  },
  intolérance: {
    name: "Intolérance",
    definition: "Difficulté à digérer un aliment ou une substance.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Intol%C3%A9rance_alimentaire",
    categories: ["medical"],
  },
  protéines: {
    name: "Protéines",
    definition:
      "Une protéine est une grosse molécule fabriquée par le corps (ou apportée par l’alimentation) qui sert à construire, réparer et faire fonctionner nos cellules.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Prot%C3%A9ine",
    categories: ["medical"],
  },
  hémophilie: {
    name: "hémophilie",
    definition: "Maladie génétique qui affecte la capacité du sang à coaguler.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Hémophilie",
    categories: ["medical"],
  },
  "brûlures-gastriques": {
    name: "brûlures gastriques",
    definition: "Douleur ou brûlure dans l'estomac, souvent due à l'acidité.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Brûlure_gastrique",
    categories: ["medical"],
  },
  "troubles-cardiovasculaires": {
    name: "troubles cardiovasculaires",
    definition: "Problème affectant le cœur ou les vaisseaux sanguins.",
    wikipediaUrl: "https://fr.wikipedia.org/wiki/Maladie_cardiovasculaire",
    categories: ["medical"],
  },
};

/**
 * Configuration des catégories pour l'affichage organisé
 * (Utile si on ajoute un popover modal avec accordéons plus tard)
 */
export const TECHNICAL_TERMS_CATEGORIES = [
  {
    id: "properties",
    label: "Propriétés thérapeutiques",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("properties"))
      .map(([id, data]) => ({ id, ...data })),
  },
  {
    id: "allergens",
    label: "Allergènes et sensibilités",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("allergens"))
      .map(([id, data]) => ({ id, ...data })),
  },
  {
    id: "medical",
    label: "Symptômes et conditions",
    terms: Object.entries(TECHNICAL_TERMS_DATA)
      .filter(([_, data]) => data.categories.includes("medical"))
      .map(([id, data]) => ({ id, ...data })),
  },
];
