/**
 * Configuration des catégories de filtres pour la modal
 * Utilisé pour générer les accordéons et checkboxes
 */
export const TAG_LABELS_CATEGORIES = [
  {
    id: "verified",
    label: "Usage",
    icon: "verified",
    options: [
      {
        id: "verified",
        label: "Reconnu",
        description: "Soutenu scientifiquement ou par des professionnels",
        color: "green",
      },
      {
        id: "traditional",
        label: "Traditionnel",
        description:
          "Usage traditionnel sans soutien scientifique (remède de grand-mère)",
        color: "amber",
      },
    ],
  },
  {
    id: "pregnancy",
    label: "Grossesse",
    icon: "pregnancy",
    options: [
      {
        id: "ok",
        label: "Sans danger",
        description: "Compatible avec la grossesse",
        color: "green",
      },
      {
        id: "variant",
        label: "À vérifier",
        description: "Données insuffisantes ou usage conditionnel",
        color: "amber",
      },
      {
        id: "interdit",
        label: "Non recommandé",
        description: "Contre-indiqué pendant la grossesse",
        color: "red",
      },
    ],
  },
  {
    id: "ageLimit",
    label: "Limite d'âge",
    icon: "age",
    options: [
      {
        id: "allAges",
        label: "Tout âge",
        description: "Utilisable chez l'enfant sans limite d'âge",
        color: "green",
      },
      {
        id: "withLimit",
        label: "Avec limite d'âge",
        description: "Limite d'âge minimum requise",
        color: "amber",
      },
      {
        id: "adultOnly",
        label: "Adultes uniquement",
        description:
          "Réservé uniquement aux adultes, ne pas utiliser chez l'enfant",
        color: "red",
      },
    ],
  },
];
