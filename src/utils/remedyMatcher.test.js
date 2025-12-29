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
  },
  {
    id: 1,
    name: "Thé Vert",
    symptoms: ["fatigue", "stress", "concentration"],
  },
  {
    id: 2,
    name: "Gingembre",
    symptoms: ["nausée", "inflammation", "douleurs articulaires"],
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
