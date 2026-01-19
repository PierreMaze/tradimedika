import { describe, it, expect } from "vitest";
import {
  filterRemediesByTags,
  INITIAL_FILTERS,
  FILTER_CATEGORIES,
} from "./filterRemedies";

describe("filterRemedies", () => {
  // Données de test
  const mockRemedies = [
    {
      remedy: {
        name: "Gingembre",
        pregnancySafe: true,
        verifiedByProfessional: true,
        childrenAge: null,
      },
    },
    {
      remedy: {
        name: "Thym",
        pregnancySafe: null,
        verifiedByProfessional: false,
        childrenAge: null,
      },
    },
    {
      remedy: {
        name: "Persil",
        pregnancySafe: false,
        verifiedByProfessional: true,
        childrenAge: 12,
      },
    },
    {
      remedy: {
        name: "Camomille",
        pregnancySafe: true,
        verifiedByProfessional: false,
        childrenAge: null,
      },
    },
    {
      remedy: {
        name: "Sauge",
        pregnancySafe: false,
        verifiedByProfessional: false,
        childrenAge: 18,
      },
    },
    {
      remedy: {
        name: "Miel",
        pregnancySafe: true,
        verifiedByProfessional: true,
        childrenAge: 12,
      },
    },
  ];

  describe("filterRemediesByTags", () => {
    describe("Sans filtres actifs", () => {
      it("devrait retourner tous les remèdes si aucun filtre n'est actif", () => {
        const result = filterRemediesByTags(mockRemedies, INITIAL_FILTERS);

        expect(result).toHaveLength(mockRemedies.length);
        expect(result).toEqual(mockRemedies);
      });
    });

    describe("Filtres de grossesse (OU logique)", () => {
      it("devrait filtrer les remèdes avec pregnancy ok", () => {
        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(3); // Gingembre, Camomille, Miel
        expect(result.every((r) => r.remedy.pregnancySafe === true)).toBe(true);
      });

      it("devrait filtrer les remèdes avec pregnancy variant", () => {
        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: false,
            variant: true,
            interdit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(1); // Thym
        expect(result[0].remedy.pregnancySafe).toBe(null);
      });

      it("devrait filtrer les remèdes avec pregnancy interdit", () => {
        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: false,
            variant: false,
            interdit: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(2); // Persil, Sauge
        expect(result.every((r) => r.remedy.pregnancySafe === false)).toBe(
          true,
        );
      });

      it("devrait filtrer avec plusieurs filtres de grossesse (OU logique)", () => {
        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: true,
            variant: true,
            interdit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(4); // Gingembre, Thym, Camomille, Miel
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === true ||
              r.remedy.pregnancySafe === null,
          ),
        ).toBe(true);
      });

      it("devrait filtrer avec tous les filtres de grossesse actifs (OU logique)", () => {
        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: true,
            variant: true,
            interdit: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(mockRemedies.length);
      });
    });

    describe("Filtres de reconnaissance (OU logique)", () => {
      it("devrait filtrer les remèdes reconnus", () => {
        const filters = {
          ...INITIAL_FILTERS,
          verified: {
            verified: true,
            traditional: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(3); // Gingembre, Persil, Miel
        expect(
          result.every((r) => r.remedy.verifiedByProfessional === true),
        ).toBe(true);
      });

      it("devrait filtrer les remèdes traditionnels", () => {
        const filters = {
          ...INITIAL_FILTERS,
          verified: {
            verified: false,
            traditional: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(3); // Thym, Camomille, Sauge
        expect(
          result.every((r) => r.remedy.verifiedByProfessional === false),
        ).toBe(true);
      });

      it("devrait filtrer avec plusieurs filtres de reconnaissance (OU logique)", () => {
        const filters = {
          ...INITIAL_FILTERS,
          verified: {
            verified: true,
            traditional: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(mockRemedies.length);
      });
    });

    describe("Filtres d'âge enfants (OU logique)", () => {
      it("devrait filtrer les remèdes tous âges", () => {
        const filters = {
          ...INITIAL_FILTERS,
          children: {
            allAges: true,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(3); // Gingembre, Thym, Camomille
        expect(result.every((r) => r.remedy.childrenAge === null)).toBe(true);
      });

      it("devrait filtrer les remèdes avec limite d'âge", () => {
        const filters = {
          ...INITIAL_FILTERS,
          children: {
            allAges: false,
            withLimit: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(3); // Persil, Sauge, Miel
        expect(result.every((r) => r.remedy.childrenAge !== null)).toBe(true);
      });

      it("devrait filtrer avec plusieurs filtres d'âge (OU logique)", () => {
        const filters = {
          ...INITIAL_FILTERS,
          children: {
            allAges: true,
            withLimit: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(mockRemedies.length);
      });
    });

    describe("Combinaisons de catégories (ET logique)", () => {
      it("devrait combiner grossesse ok ET reconnu", () => {
        const filters = {
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
          verified: {
            verified: true,
            traditional: false,
          },
          children: {
            allAges: false,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(2); // Gingembre, Miel
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === true &&
              r.remedy.verifiedByProfessional === true,
          ),
        ).toBe(true);
      });

      it("devrait combiner grossesse interdit ET traditionnel", () => {
        const filters = {
          pregnancy: {
            ok: false,
            variant: false,
            interdit: true,
          },
          verified: {
            verified: false,
            traditional: true,
          },
          children: {
            allAges: false,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(1); // Sauge
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === false &&
              r.remedy.verifiedByProfessional === false,
          ),
        ).toBe(true);
      });

      it("devrait combiner grossesse ok ET tous âges", () => {
        const filters = {
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
          verified: {
            verified: false,
            traditional: false,
          },
          children: {
            allAges: true,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(2); // Gingembre, Camomille
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === true && r.remedy.childrenAge === null,
          ),
        ).toBe(true);
      });

      it("devrait combiner les trois catégories (ET logique)", () => {
        const filters = {
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
          verified: {
            verified: true,
            traditional: false,
          },
          children: {
            allAges: true,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(1); // Gingembre
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === true &&
              r.remedy.verifiedByProfessional === true &&
              r.remedy.childrenAge === null,
          ),
        ).toBe(true);
      });

      it("devrait retourner vide si aucune correspondance", () => {
        const filters = {
          pregnancy: {
            ok: false,
            variant: true,
            interdit: false,
          },
          verified: {
            verified: true,
            traditional: false,
          },
          children: {
            allAges: false,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(0);
      });
    });

    describe("Cas complexes avec OU au sein des catégories", () => {
      it("devrait combiner (grossesse ok OU variant) ET reconnu", () => {
        const filters = {
          pregnancy: {
            ok: true,
            variant: true,
            interdit: false,
          },
          verified: {
            verified: true,
            traditional: false,
          },
          children: {
            allAges: false,
            withLimit: false,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(2); // Gingembre, Miel
        expect(
          result.every(
            (r) =>
              (r.remedy.pregnancySafe === true ||
                r.remedy.pregnancySafe === null) &&
              r.remedy.verifiedByProfessional === true,
          ),
        ).toBe(true);
      });

      it("devrait combiner grossesse ok ET (reconnu OU traditionnel) ET avec limite", () => {
        const filters = {
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
          verified: {
            verified: true,
            traditional: true,
          },
          children: {
            allAges: false,
            withLimit: true,
          },
        };

        const result = filterRemediesByTags(mockRemedies, filters);

        expect(result).toHaveLength(1); // Miel
        expect(
          result.every(
            (r) =>
              r.remedy.pregnancySafe === true && r.remedy.childrenAge !== null,
          ),
        ).toBe(true);
      });
    });

    describe("Edge cases", () => {
      it("devrait gérer un tableau vide", () => {
        const result = filterRemediesByTags([], INITIAL_FILTERS);

        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
      });

      it("devrait gérer des remèdes avec des valeurs undefined", () => {
        const remediesWithUndefined = [
          {
            remedy: {
              name: "Test",
              pregnancySafe: undefined,
              verifiedByProfessional: undefined,
              childrenAge: undefined,
            },
          },
        ];

        const filters = {
          ...INITIAL_FILTERS,
          pregnancy: {
            ok: true,
            variant: false,
            interdit: false,
          },
        };

        const result = filterRemediesByTags(remediesWithUndefined, filters);

        expect(result).toHaveLength(0);
      });
    });
  });

  describe("INITIAL_FILTERS", () => {
    it("devrait avoir tous les filtres désactivés", () => {
      expect(INITIAL_FILTERS.pregnancy.ok).toBe(false);
      expect(INITIAL_FILTERS.pregnancy.variant).toBe(false);
      expect(INITIAL_FILTERS.pregnancy.interdit).toBe(false);
      expect(INITIAL_FILTERS.verified.verified).toBe(false);
      expect(INITIAL_FILTERS.verified.traditional).toBe(false);
      expect(INITIAL_FILTERS.children.allAges).toBe(false);
      expect(INITIAL_FILTERS.children.withLimit).toBe(false);
    });

    it("devrait avoir la structure attendue", () => {
      expect(INITIAL_FILTERS).toHaveProperty("pregnancy");
      expect(INITIAL_FILTERS).toHaveProperty("verified");
      expect(INITIAL_FILTERS).toHaveProperty("children");
    });
  });

  describe("FILTER_CATEGORIES", () => {
    it("devrait avoir 3 catégories", () => {
      expect(FILTER_CATEGORIES).toHaveLength(3);
    });

    it("devrait avoir les IDs corrects", () => {
      const ids = FILTER_CATEGORIES.map((cat) => cat.id);
      expect(ids).toEqual(["pregnancy", "verified", "children"]);
    });

    it("chaque catégorie devrait avoir les propriétés requises", () => {
      FILTER_CATEGORIES.forEach((category) => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("label");
        expect(category).toHaveProperty("icon");
        expect(category).toHaveProperty("options");
        expect(Array.isArray(category.options)).toBe(true);
      });
    });

    it("chaque option devrait avoir les propriétés requises", () => {
      FILTER_CATEGORIES.forEach((category) => {
        category.options.forEach((option) => {
          expect(option).toHaveProperty("id");
          expect(option).toHaveProperty("label");
          expect(option).toHaveProperty("description");
          expect(option).toHaveProperty("color");
        });
      });
    });

    it("la catégorie pregnancy devrait avoir 3 options", () => {
      const pregnancy = FILTER_CATEGORIES.find((cat) => cat.id === "pregnancy");
      expect(pregnancy.options).toHaveLength(3);
    });

    it("la catégorie verified devrait avoir 2 options", () => {
      const verified = FILTER_CATEGORIES.find((cat) => cat.id === "verified");
      expect(verified.options).toHaveLength(2);
    });

    it("la catégorie children devrait avoir 2 options", () => {
      const children = FILTER_CATEGORIES.find((cat) => cat.id === "children");
      expect(children.options).toHaveLength(2);
    });
  });
});
