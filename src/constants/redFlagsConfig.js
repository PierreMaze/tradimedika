export const RED_FLAGS_QUESTIONS = [
  {
    id: "intensity",
    question: "Quelle est l'intensité de la douleur ?",
    options: [
      { id: "faible", label: "Faible", isRedFlag: false },
      { id: "moyenne", label: "Moyenne", isRedFlag: false },
      { id: "forte", label: "Forte ou très forte", isRedFlag: true },
    ],
  },
  {
    id: "duration",
    question: "Depuis combien de temps avez-vous ces symptômes ?",
    options: [
      { id: "hours", label: "Quelques heures", isRedFlag: false },
      { id: "days", label: "1-2 jours", isRedFlag: false },
      {
        id: "persistent",
        label: "Plus de 48h sans amélioration",
        isRedFlag: true,
      },
    ],
  },
  {
    id: "fever",
    question: "Avez-vous de la fièvre ?",
    options: [
      { id: "no", label: "Non", isRedFlag: false },
      { id: "yes", label: "Oui", isRedFlag: true },
    ],
  },
  {
    id: "vomiting",
    question: "Avez-vous des vomissements sévères ou persistants ?",
    options: [
      { id: "no", label: "Non", isRedFlag: false },
      { id: "yes", label: "Oui", isRedFlag: true },
    ],
  },
];

export const EMERGENCY_CONTACTS = [
  {
    name: "SAMU",
    phone: "15",
    description: "Urgence médicale",
  },
  {
    name: "Pompiers",
    phone: "18",
    description: "Secours d'urgence",
  },
  {
    name: "Numéro d'urgence européen",
    phone: "112",
    description: "Urgences",
  },
  {
    name: "SOS Médecins",
    phone: "3624",
    description: "Visite médicale à domicile",
  },
];
