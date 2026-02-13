import { describe, expect, it } from "vitest";
import {
  hasMedicalTerms,
  parseContraindicationText,
} from "./parseContraindicationText";

describe("parseContraindicationText", () => {
  describe("Parsing basique", () => {
    it("devrait parser un terme simple", () => {
      const result = parseContraindicationText("ulcères gastriques");

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        text: "ulcères gastriques",
        termId: "ulceres-gastriques",
        isTerm: true,
      });
    });

    it("devrait parser plusieurs termes séparés", () => {
      const result = parseContraindicationText("ulcères gastriques et reflux");

      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        text: "ulcères gastriques",
        termId: "ulceres-gastriques",
        isTerm: true,
      });
      expect(result[1]).toMatchObject({
        text: " et ",
        termId: null,
        isTerm: false,
      });
      expect(result[2]).toMatchObject({
        text: "reflux",
        termId: "reflux-gastro-oesophagien",
        isTerm: true,
      });
    });

    it("devrait retourner texte simple si aucun terme médical", () => {
      const text = "ceci est un texte sans terme médical";
      const result = parseContraindicationText(text);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        text: text,
        termId: null,
        isTerm: false,
      });
    });
  });

  describe("Prioritisation des termes longs", () => {
    it("devrait matcher le terme complet avant le terme court", () => {
      const result = parseContraindicationText("reflux gastro-œsophagien");

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe("reflux-gastro-oesophagien");
      expect(result[0].text).toBe("reflux gastro-œsophagien");
    });

    it("devrait matcher 'syndrome de l'intestin irritable' avant 'intestin irritable'", () => {
      const result = parseContraindicationText(
        "syndrome de l'intestin irritable",
      );

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe("syndrome-intestin-irritable");
      expect(result[0].text).toBe("syndrome de l'intestin irritable");
    });

    it("devrait matcher 'troubles de la coagulation' complet", () => {
      const result = parseContraindicationText("troubles de la coagulation");

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe("troubles-coagulation");
    });
  });

  describe("Insensibilité à la casse", () => {
    it("devrait détecter terme en majuscules", () => {
      const result = parseContraindicationText("DIABÈTE");

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe("diabete");
      expect(result[0].isTerm).toBe(true);
    });

    it("devrait détecter terme en minuscules", () => {
      const result = parseContraindicationText("diabète");

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe("diabete");
    });

    it("devrait détecter terme en casse mixte", () => {
      const result1 = parseContraindicationText("Diabète");
      const result2 = parseContraindicationText("DiAbÈtE");

      expect(result1[0].termId).toBe("diabete");
      expect(result2[0].termId).toBe("diabete");
    });
  });

  describe("Edge cases", () => {
    it("devrait gérer texte vide", () => {
      const result = parseContraindicationText("");

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        text: "",
        termId: null,
        isTerm: false,
      });
    });

    it("devrait gérer null", () => {
      const result = parseContraindicationText(null);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        text: "",
        termId: null,
        isTerm: false,
      });
    });

    it("devrait gérer undefined", () => {
      const result = parseContraindicationText(undefined);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        text: "",
        termId: null,
        isTerm: false,
      });
    });

    it("devrait gérer type non-string (nombre)", () => {
      const result = parseContraindicationText(12345);

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe(null);
      expect(result[0].isTerm).toBe(false);
      // Le code retourne le paramètre tel quel si non-string
    });

    it("devrait gérer type non-string (objet)", () => {
      const result = parseContraindicationText({ test: "value" });

      expect(result).toHaveLength(1);
      expect(result[0].termId).toBe(null);
      expect(result[0].isTerm).toBe(false);
      // Le code retourne le paramètre tel quel si non-string
    });

    it("devrait matcher terme au début de phrase", () => {
      const result = parseContraindicationText("Diabète non contrôlé");

      const diabeteTerm = result.find((seg) => seg.termId === "diabete");
      expect(diabeteTerm).toBeDefined();
      expect(diabeteTerm.isTerm).toBe(true);
    });

    it("devrait matcher terme à la fin de phrase", () => {
      const result = parseContraindicationText("éviter en cas de diabète");

      expect(result).toHaveLength(2);
      expect(result[1].termId).toBe("diabete");
      expect(result[1].isTerm).toBe(true);
    });

    it("devrait matcher terme au milieu de phrase", () => {
      const result = parseContraindicationText(
        "contre-indiqué si diabète non contrôlé",
      );

      const diabeteTerm = result.find((seg) => seg.termId === "diabete");
      expect(diabeteTerm).toBeDefined();
      expect(diabeteTerm.isTerm).toBe(true);
    });

    it("devrait gérer plusieurs occurrences du même terme", () => {
      const result = parseContraindicationText(
        "diabète et complications du diabète",
      );

      const diabeteTerms = result.filter((seg) => seg.termId === "diabete");
      expect(diabeteTerms).toHaveLength(2);
    });

    it("devrait gérer texte sans séparateurs valides entre termes", () => {
      // Note : Le parser utilise indexOf() et nécessite des séparateurs clairs
      // Ce test vérifie que le comportement est prévisible même sans séparateurs
      const result = parseContraindicationText("textesansespaces");

      expect(result).toHaveLength(1);
      expect(result[0].isTerm).toBe(false);
    });
  });

  describe("Parsing complexe", () => {
    it("devrait parser phrase complète avec plusieurs termes", () => {
      const result = parseContraindicationText(
        "contre-indiqué en cas de diabète non contrôlé",
      );

      const diabeteMatch = result.find((seg) => seg.termId === "diabete");
      expect(diabeteMatch).toBeDefined();
      expect(diabeteMatch.isTerm).toBe(true);
    });

    it("devrait conserver l'ordre des segments", () => {
      const result = parseContraindicationText("éviter en cas de diabète");

      expect(result[0].text).toBe("éviter en cas de ");
      expect(result[0].isTerm).toBe(false);
      expect(result[1].text).toBe("diabète");
      expect(result[1].isTerm).toBe(true);
    });

    it("devrait gérer variantes du même terme", () => {
      // Test ulcère vs ulcères
      const result1 = parseContraindicationText("ulcère gastrique");
      const result2 = parseContraindicationText("ulcères gastriques");

      expect(result1[0].termId).toBe("ulceres-gastriques");
      expect(result2[0].termId).toBe("ulceres-gastriques");
    });

    it("devrait gérer abréviations", () => {
      const result = parseContraindicationText("RGO non contrôlé");

      expect(result[0].termId).toBe("reflux-gastro-oesophagien");
      expect(result[0].text).toBe("RGO");
    });
  });
});

describe("hasMedicalTerms", () => {
  it("devrait retourner true si terme médical détecté", () => {
    expect(hasMedicalTerms("éviter en cas de diabète")).toBe(true);
    expect(hasMedicalTerms("ulcères gastriques")).toBe(true);
    expect(hasMedicalTerms("reflux gastro-œsophagien")).toBe(true);
  });

  it("devrait retourner false si aucun terme médical", () => {
    expect(hasMedicalTerms("texte sans terme médical")).toBe(false);
    expect(hasMedicalTerms("lorem ipsum dolor sit amet")).toBe(false);
  });

  it("devrait gérer valeurs nulles", () => {
    expect(hasMedicalTerms(null)).toBe(false);
    expect(hasMedicalTerms(undefined)).toBe(false);
    expect(hasMedicalTerms("")).toBe(false);
  });

  it("devrait gérer types non-string", () => {
    expect(hasMedicalTerms(123)).toBe(false);
    expect(hasMedicalTerms({ test: "value" })).toBe(false);
    expect(hasMedicalTerms([])).toBe(false);
  });

  it("devrait être insensible à la casse", () => {
    expect(hasMedicalTerms("DIABÈTE")).toBe(true);
    expect(hasMedicalTerms("diabète")).toBe(true);
    expect(hasMedicalTerms("Diabète")).toBe(true);
  });

  it("devrait détecter termes au milieu du texte", () => {
    expect(hasMedicalTerms("contre-indiqué si diabète non contrôlé")).toBe(
      true,
    );
    expect(hasMedicalTerms("attention au lactose")).toBe(true);
  });

  it("devrait détecter plusieurs termes", () => {
    expect(hasMedicalTerms("diabète et hypertension")).toBe(true);
    expect(
      hasMedicalTerms("ulcères gastriques et reflux gastro-œsophagien"),
    ).toBe(true);
  });
});
