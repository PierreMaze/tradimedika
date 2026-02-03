import { describe, it, expect } from "vitest";
import {
  findMatchingRemedies,
  getRemedyById,
  generateSlug,
  getRemedyBySlug,
} from "./remedyMatcher";

// Mock database pour les tests
const mockDatabase = [
  {
    id: 0,
    name: "Citron",
    symptoms: ["nausée", "fatigue", "digestion"],
    badForSymptoms: [],
  },
  {
    id: 1,
    name: "Thé Vert",
    symptoms: ["fatigue", "stress", "concentration"],
    badForSymptoms: [],
  },
  {
    id: 2,
    name: "Gingembre",
    symptoms: ["nausée", "inflammation", "douleurs articulaires"],
    badForSymptoms: [],
  },
];

// Mock database avec badForSymptoms pour tester les exclusions
const mockDatabaseWithBadSymptoms = [
  {
    id: 0,
    name: "Café noir",
    symptoms: ["fatigue", "mal de tête"],
    badForSymptoms: ["insomnie", "anxiété", "stress"],
  },
  {
    id: 1,
    name: "Camomille",
    symptoms: ["insomnie", "stress", "anxiété"],
    badForSymptoms: [],
  },
  {
    id: 2,
    name: "Menthe poivrée",
    symptoms: ["digestion", "nausée", "mal de tête"],
    badForSymptoms: ["reflux", "brûlures d'estomac"],
  },
  {
    id: 3,
    name: "Riz blanc",
    symptoms: ["diarrhée"],
    badForSymptoms: ["constipation"],
  },
];

describe("findMatchingRemedies", () => {
  it("doit retourner les remèdes qui matchent les symptômes", () => {
    const result = findMatchingRemedies(["nausée", "fatigue"], mockDatabase);

    // Citron et Thé Vert ont "fatigue", Gingembre a "nausée"
    expect(result).toHaveLength(3);
    // Tri par score (2 matches), puis alphabétique
    expect(result[0].remedy.name).toBe("Citron");
    expect(result[0].matchCount).toBe(2);
  });

  it("doit gérer les accents de manière flexible", () => {
    const result = findMatchingRemedies(["nausee", "fatigue"], mockDatabase); // sans accent

    expect(result).toHaveLength(3);
    // matchedSymptoms contient les symptômes de selectedSymptoms, pas de la DB
    expect(result[0].matchedSymptoms).toContain("nausee");
    expect(result[0].matchedSymptoms).toContain("fatigue");
  });

  it("doit trier par score décroissant", () => {
    const result = findMatchingRemedies(
      ["nausée", "fatigue", "stress"],
      mockDatabase,
    );

    expect(result[0].matchCount).toBeGreaterThanOrEqual(result[1].matchCount);
  });

  it("doit trier alphabétiquement en cas de score égal", () => {
    const dbWithSameScore = [
      { id: 0, name: "Zinc", symptoms: ["fatigue"] },
      { id: 1, name: "Citron", symptoms: ["fatigue"] },
      { id: 2, name: "Aloe", symptoms: ["fatigue"] },
    ];

    const result = findMatchingRemedies(["fatigue"], dbWithSameScore);

    expect(result[0].remedy.name).toBe("Aloe");
    expect(result[1].remedy.name).toBe("Citron");
    expect(result[2].remedy.name).toBe("Zinc");
  });

  it("doit retourner un tableau vide si aucun symptôme sélectionné", () => {
    const result = findMatchingRemedies([], mockDatabase);

    expect(result).toEqual([]);
  });

  it("doit retourner un tableau vide si la base de données est vide", () => {
    const result = findMatchingRemedies(["nausée"], []);

    expect(result).toEqual([]);
  });

  it("doit gérer les remèdes sans champ symptoms", () => {
    const dbWithInvalidRemedy = [
      ...mockDatabase,
      { id: 3, name: "Invalid", symptoms: null },
    ];

    const result = findMatchingRemedies(["nausée"], dbWithInvalidRemedy);

    expect(result.every((r) => r.remedy.id !== 3)).toBe(true);
  });

  it("doit retourner un tableau vide si aucun remède ne matche", () => {
    const result = findMatchingRemedies(["symptôme-inexistant"], mockDatabase);

    expect(result).toEqual([]);
  });

  // Tests pour badForSymptoms
  describe("filtrage par badForSymptoms", () => {
    it("doit exclure un remède si un symptôme recherché est dans badForSymptoms", () => {
      // Recherche "fatigue" + "insomnie"
      // Café matche "fatigue" MAIS a "insomnie" dans badForSymptoms → exclu
      const result = findMatchingRemedies(
        ["fatigue", "insomnie"],
        mockDatabaseWithBadSymptoms,
      );

      // Café doit être exclu, Camomille doit apparaître
      expect(result.some((r) => r.remedy.name === "Café noir")).toBe(false);
      expect(result.some((r) => r.remedy.name === "Camomille")).toBe(true);
    });

    it("doit inclure un remède si badForSymptoms est vide", () => {
      const result = findMatchingRemedies(
        ["insomnie"],
        mockDatabaseWithBadSymptoms,
      );

      // Camomille a badForSymptoms: [] donc doit apparaître
      expect(result.some((r) => r.remedy.name === "Camomille")).toBe(true);
    });

    it("doit inclure un remède si aucun symptôme recherché n'est dans badForSymptoms", () => {
      // Recherche "mal de tête" uniquement
      // Café matche "mal de tête" et n'a pas "mal de tête" dans badForSymptoms
      const result = findMatchingRemedies(
        ["mal de tête"],
        mockDatabaseWithBadSymptoms,
      );

      expect(result.some((r) => r.remedy.name === "Café noir")).toBe(true);
      expect(result.some((r) => r.remedy.name === "Menthe poivrée")).toBe(true);
    });

    it("doit exclure même si le remède matche plusieurs symptômes positifs", () => {
      // Recherche "fatigue" + "mal de tête" + "anxiété"
      // Café matche 2 symptômes (fatigue, mal de tête) MAIS "anxiété" est dans badForSymptoms
      const result = findMatchingRemedies(
        ["fatigue", "mal de tête", "anxiété"],
        mockDatabaseWithBadSymptoms,
      );

      expect(result.some((r) => r.remedy.name === "Café noir")).toBe(false);
    });

    it("doit gérer le matching flexible des accents dans badForSymptoms", () => {
      // Recherche "brulures d'estomac" (sans accent)
      // Menthe a "brûlures d'estomac" dans badForSymptoms → doit être exclu
      const result = findMatchingRemedies(
        ["digestion", "brulures d'estomac"],
        mockDatabaseWithBadSymptoms,
      );

      expect(result.some((r) => r.remedy.name === "Menthe poivrée")).toBe(
        false,
      );
    });

    it("doit gérer les remèdes sans champ badForSymptoms", () => {
      const dbWithoutBadSymptoms = [
        { id: 0, name: "Test", symptoms: ["fatigue"] },
      ];

      const result = findMatchingRemedies(["fatigue"], dbWithoutBadSymptoms);

      expect(result).toHaveLength(1);
      expect(result[0].remedy.name).toBe("Test");
    });

    it("exemple réel: diarrhée + constipation ne doit pas retourner Riz blanc", () => {
      // Cas réel: quelqu'un cherche "diarrhée" + "constipation"
      // Riz blanc est bon pour diarrhée MAIS mauvais pour constipation
      const result = findMatchingRemedies(
        ["diarrhée", "constipation"],
        mockDatabaseWithBadSymptoms,
      );

      expect(result.some((r) => r.remedy.name === "Riz blanc")).toBe(false);
    });
  });

  // Tests pour isRecommended et tri par verifiedByProfessional
  describe("isRecommended et tri par verifiedByProfessional", () => {
    const mockDatabaseWithVerified = [
      {
        id: 0,
        name: "Citron",
        symptoms: ["fatigue", "nausée"],
        verifiedByProfessional: false,
      },
      {
        id: 1,
        name: "Gingembre",
        symptoms: ["fatigue", "nausée"],
        verifiedByProfessional: true,
      },
      {
        id: 2,
        name: "Thé Vert",
        symptoms: ["fatigue"],
        verifiedByProfessional: true,
      },
    ];

    it("doit marquer le premier résultat avec isRecommended: true", () => {
      const result = findMatchingRemedies(["fatigue"], mockDatabase);

      expect(result[0].isRecommended).toBe(true);
    });

    it("doit marquer les autres résultats avec isRecommended: false", () => {
      const result = findMatchingRemedies(["fatigue"], mockDatabase);

      // Tous sauf le premier doivent avoir isRecommended: false
      result.slice(1).forEach((r) => {
        expect(r.isRecommended).toBe(false);
      });
    });

    it("doit prioriser verifiedByProfessional en cas d'égalité de matchCount", () => {
      // Citron et Gingembre ont 2 matches chacun
      // Gingembre est verified donc doit être premier
      const result = findMatchingRemedies(
        ["fatigue", "nausée"],
        mockDatabaseWithVerified,
      );

      expect(result[0].remedy.name).toBe("Gingembre");
      expect(result[0].remedy.verifiedByProfessional).toBe(true);
      expect(result[0].isRecommended).toBe(true);

      expect(result[1].remedy.name).toBe("Citron");
      expect(result[1].remedy.verifiedByProfessional).toBe(false);
      expect(result[1].isRecommended).toBe(false);
    });

    it("doit trier par matchCount d'abord, puis verifiedByProfessional", () => {
      // Citron: 2 matches, non vérifié
      // Gingembre: 2 matches, vérifié
      // Thé Vert: 1 match, vérifié
      // Ordre attendu: Gingembre (2, vérifié) > Citron (2, non vérifié) > Thé Vert (1, vérifié)
      const result = findMatchingRemedies(
        ["fatigue", "nausée"],
        mockDatabaseWithVerified,
      );

      expect(result[0].remedy.name).toBe("Gingembre");
      expect(result[0].matchCount).toBe(2);

      expect(result[1].remedy.name).toBe("Citron");
      expect(result[1].matchCount).toBe(2);

      expect(result[2].remedy.name).toBe("Thé Vert");
      expect(result[2].matchCount).toBe(1);
    });

    it("doit trier alphabétiquement en cas d'égalité de matchCount et verifiedByProfessional", () => {
      const dbSameScoreAndVerified = [
        {
          id: 0,
          name: "Zinc",
          symptoms: ["fatigue"],
          verifiedByProfessional: true,
        },
        {
          id: 1,
          name: "Aloe",
          symptoms: ["fatigue"],
          verifiedByProfessional: true,
        },
        {
          id: 2,
          name: "Citron",
          symptoms: ["fatigue"],
          verifiedByProfessional: true,
        },
      ];

      const result = findMatchingRemedies(["fatigue"], dbSameScoreAndVerified);

      expect(result[0].remedy.name).toBe("Aloe");
      expect(result[1].remedy.name).toBe("Citron");
      expect(result[2].remedy.name).toBe("Zinc");
      expect(result[0].isRecommended).toBe(true);
    });

    it("doit retourner un tableau vide avec aucun isRecommended si aucun match", () => {
      const result = findMatchingRemedies(
        ["symptôme-inexistant"],
        mockDatabaseWithVerified,
      );

      expect(result).toEqual([]);
    });

    it("doit gérer les remèdes sans verifiedByProfessional (traité comme false)", () => {
      const dbMixedVerified = [
        {
          id: 0,
          name: "Sans Champ",
          symptoms: ["fatigue"],
          // pas de verifiedByProfessional
        },
        {
          id: 1,
          name: "Vérifié",
          symptoms: ["fatigue"],
          verifiedByProfessional: true,
        },
      ];

      const result = findMatchingRemedies(["fatigue"], dbMixedVerified);

      // Vérifié doit être premier car verifiedByProfessional: true
      expect(result[0].remedy.name).toBe("Vérifié");
      expect(result[1].remedy.name).toBe("Sans Champ");
    });
  });

  // Tests pour isRecommended et exclusion des allergies utilisateur
  describe("isRecommended avec allergies utilisateur", () => {
    const mockDatabaseWithAllergens = [
      {
        id: 0,
        name: "Citron",
        symptoms: ["fatigue", "nausée"],
        allergens: ["citrus"],
        verifiedByProfessional: true,
      },
      {
        id: 1,
        name: "Gingembre",
        symptoms: ["fatigue", "nausée"],
        allergens: [],
        verifiedByProfessional: false,
      },
      {
        id: 2,
        name: "Thé Vert",
        symptoms: ["fatigue"],
        allergens: ["caffeine"],
        verifiedByProfessional: true,
      },
      {
        id: 3,
        name: "Camomille",
        symptoms: ["fatigue"],
        allergens: ["pollen"],
        verifiedByProfessional: true,
      },
    ];

    it("doit attribuer isRecommended au premier remède sans allergène utilisateur", () => {
      // Citron a allergen "citrus" donc exclu de isRecommended
      // Gingembre n'a pas d'allergène donc doit être isRecommended
      const result = findMatchingRemedies(
        ["fatigue", "nausée"],
        mockDatabaseWithAllergens,
        ["citrus"],
      );

      // Citron est premier (vérifié) mais contient "citrus" → pas recommandé
      expect(result[0].remedy.name).toBe("Citron");
      expect(result[0].isRecommended).toBe(false);

      // Gingembre est second mais sans allergène → recommandé
      expect(result[1].remedy.name).toBe("Gingembre");
      expect(result[1].isRecommended).toBe(true);
    });

    it("doit fonctionner sans allergies (comportement par défaut)", () => {
      const result = findMatchingRemedies(
        ["fatigue", "nausée"],
        mockDatabaseWithAllergens,
      );

      // Sans allergies, le premier est recommandé normalement
      expect(result[0].remedy.name).toBe("Citron");
      expect(result[0].isRecommended).toBe(true);
    });

    it("doit fonctionner avec tableau d'allergies vide", () => {
      const result = findMatchingRemedies(
        ["fatigue", "nausée"],
        mockDatabaseWithAllergens,
        [],
      );

      expect(result[0].remedy.name).toBe("Citron");
      expect(result[0].isRecommended).toBe(true);
    });

    it("doit sauter plusieurs remèdes allergènes pour trouver le recommandé", () => {
      // L'utilisateur est allergique à citrus ET caffeine
      // Citron (citrus) et Thé Vert (caffeine) sont exclus
      const result = findMatchingRemedies(
        ["fatigue"],
        mockDatabaseWithAllergens,
        ["citrus", "caffeine"],
      );

      // Tous matchent "fatigue", triés par verified puis alphabétique
      // Citron: verified, a citrus → pas recommandé
      // Thé Vert: verified, a caffeine → pas recommandé
      // Camomille: verified, a pollen (pas dans allergies) → RECOMMANDÉ
      // Gingembre: non verified, pas d'allergène → pas recommandé (camomille déjà recommandé)

      const citron = result.find((r) => r.remedy.name === "Citron");
      const theVert = result.find((r) => r.remedy.name === "Thé Vert");
      const camomille = result.find((r) => r.remedy.name === "Camomille");
      const gingembre = result.find((r) => r.remedy.name === "Gingembre");

      expect(citron.isRecommended).toBe(false);
      expect(theVert.isRecommended).toBe(false);
      expect(camomille.isRecommended).toBe(true);
      expect(gingembre.isRecommended).toBe(false);
    });

    it("doit ne recommander aucun remède si tous contiennent des allergènes", () => {
      const dbAllAllergic = [
        {
          id: 0,
          name: "Citron",
          symptoms: ["fatigue"],
          allergens: ["citrus"],
        },
        {
          id: 1,
          name: "Thé Vert",
          symptoms: ["fatigue"],
          allergens: ["caffeine"],
        },
      ];

      const result = findMatchingRemedies(["fatigue"], dbAllAllergic, [
        "citrus",
        "caffeine",
      ]);

      // Tous contiennent des allergènes → aucun n'est recommandé
      expect(result.every((r) => r.isRecommended === false)).toBe(true);
    });

    it("doit gérer les remèdes sans champ allergens", () => {
      const dbMixedAllergens = [
        {
          id: 0,
          name: "Avec Allergène",
          symptoms: ["fatigue"],
          allergens: ["citrus"],
        },
        {
          id: 1,
          name: "Sans Champ",
          symptoms: ["fatigue"],
          // pas de champ allergens
        },
      ];

      const result = findMatchingRemedies(["fatigue"], dbMixedAllergens, [
        "citrus",
      ]);

      // "Avec Allergène" a citrus → pas recommandé
      // "Sans Champ" n'a pas d'allergènes → recommandé
      expect(result[0].isRecommended).toBe(false);
      expect(result[1].remedy.name).toBe("Sans Champ");
      expect(result[1].isRecommended).toBe(true);
    });
  });
});

describe("getRemedyById", () => {
  it("doit retourner le remède avec l'ID correspondant", () => {
    const result = getRemedyById(0, mockDatabase);

    expect(result).toBeDefined();
    expect(result.id).toBe(0);
    expect(result.name).toBe("Citron");
  });

  it("doit accepter un ID en string et le convertir en nombre", () => {
    const result = getRemedyById("1", mockDatabase);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Thé Vert");
  });

  it("doit retourner null si l'ID n'existe pas", () => {
    const result = getRemedyById(999, mockDatabase);

    expect(result).toBeNull();
  });

  it("doit retourner null si l'ID est invalide", () => {
    expect(getRemedyById(null, mockDatabase)).toBeNull();
    expect(getRemedyById(undefined, mockDatabase)).toBeNull();
    expect(getRemedyById("", mockDatabase)).toBeNull();
    expect(getRemedyById("abc", mockDatabase)).toBeNull();
  });

  it("doit retourner null si la base de données est vide", () => {
    const result = getRemedyById(0, []);

    expect(result).toBeNull();
  });
});

describe("generateSlug", () => {
  it("doit générer un slug en lowercase", () => {
    expect(generateSlug("Citron")).toBe("citron");
    expect(generateSlug("THÉ VERT")).toBe("thé-vert");
  });

  it("doit remplacer les espaces par des tirets", () => {
    expect(generateSlug("Jus de Citron")).toBe("jus-de-citron");
    expect(generateSlug("Thé   Vert")).toBe("thé-vert");
  });

  it("doit préserver les accents français", () => {
    expect(generateSlug("Thé Vert")).toBe("thé-vert");
    expect(generateSlug("Élément")).toBe("élément");
    expect(generateSlug("À côté")).toBe("à-côté");
  });

  it("doit supprimer les caractères spéciaux", () => {
    expect(generateSlug("Citron!")).toBe("citron");
    expect(generateSlug("Thé@Vert")).toBe("thévert");
    expect(generateSlug("Test (exemple)")).toBe("test-exemple");
  });

  it("doit supprimer les espaces en début et fin", () => {
    expect(generateSlug("  Citron  ")).toBe("citron");
    expect(generateSlug("Thé Vert ")).toBe("thé-vert");
  });

  it("doit retourner une chaîne vide si le nom est invalide", () => {
    expect(generateSlug(null)).toBe("");
    expect(generateSlug(undefined)).toBe("");
    expect(generateSlug("")).toBe("");
    expect(generateSlug(123)).toBe("");
  });
});

describe("getRemedyBySlug", () => {
  it("doit retourner le remède avec le slug correspondant", () => {
    const result = getRemedyBySlug("citron", mockDatabase);

    expect(result).toBeDefined();
    expect(result.name).toBe("Citron");
  });

  it("doit gérer les slugs avec accents", () => {
    const result = getRemedyBySlug("thé-vert", mockDatabase);

    expect(result).toBeDefined();
    expect(result.name).toBe("Thé Vert");
  });

  it("doit décoder les slugs URL-encodés", () => {
    const result = getRemedyBySlug("th%C3%A9-vert", mockDatabase); // "thé-vert" encodé

    expect(result).toBeDefined();
    expect(result.name).toBe("Thé Vert");
  });

  it("doit retourner null si le slug n'existe pas", () => {
    const result = getRemedyBySlug("slug-inexistant", mockDatabase);

    expect(result).toBeNull();
  });

  it("doit retourner null si le slug est invalide", () => {
    expect(getRemedyBySlug(null, mockDatabase)).toBeNull();
    expect(getRemedyBySlug(undefined, mockDatabase)).toBeNull();
    expect(getRemedyBySlug("", mockDatabase)).toBeNull();
  });

  it("doit retourner null si la base de données est vide", () => {
    const result = getRemedyBySlug("citron", []);

    expect(result).toBeNull();
  });

  it("doit gérer les erreurs de décodage gracieusement", () => {
    const result = getRemedyBySlug("slug%invalide%", mockDatabase);

    expect(result).toBeNull();
  });
});
