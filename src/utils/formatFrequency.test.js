import { describe, it, expect } from "vitest";
import { formatFrequency } from "./formatFrequency";

describe("formatFrequency", () => {
  describe("Formats standards - fois par jour", () => {
    it("doit formater '1 fois par jour'", () => {
      expect(formatFrequency({ value: 1, unit: "fois par jour" })).toBe(
        "1 fois par jour",
      );
    });

    it("doit formater '2 fois par jour'", () => {
      expect(formatFrequency({ value: 2, unit: "fois par jour" })).toBe(
        "2 fois par jour",
      );
    });

    it("doit formater '3 fois par jour'", () => {
      expect(formatFrequency({ value: 3, unit: "fois par jour" })).toBe(
        "3 fois par jour",
      );
    });
  });

  describe('Cas spécial - "jour" simple', () => {
    it('doit convertir "1 jour" en "1 fois par jour"', () => {
      expect(formatFrequency({ value: 1, unit: "jour" })).toBe(
        "1 fois par jour",
      );
    });

    it('doit convertir "2 jour" en "2 fois par jour"', () => {
      expect(formatFrequency({ value: 2, unit: "jour" })).toBe(
        "2 fois par jour",
      );
    });
  });

  describe('Cas spécial - "heures (espacer)"', () => {
    it('doit formater "3 heures (espacer)" en "Toutes les 3 heures"', () => {
      expect(formatFrequency({ value: 3, unit: "heures (espacer)" })).toBe(
        "Toutes les 3 heures",
      );
    });

    it("doit gérer 2 heures", () => {
      expect(formatFrequency({ value: 2, unit: "heures (espacer)" })).toBe(
        "Toutes les 2 heures",
      );
    });

    it("doit gérer 4 heures", () => {
      expect(formatFrequency({ value: 4, unit: "heures (espacer)" })).toBe(
        "Toutes les 4 heures",
      );
    });

    it("doit gérer 6 heures", () => {
      expect(formatFrequency({ value: 6, unit: "heures (espacer)" })).toBe(
        "Toutes les 6 heures",
      );
    });
  });

  describe("Cas spécial - unités composées", () => {
    it('doit formater "3 tasses maximum par jour"', () => {
      expect(
        formatFrequency({ value: 3, unit: "tasses maximum par jour" }),
      ).toBe("3 tasses maximum par jour");
    });

    it('doit formater "2 cuillères à café"', () => {
      expect(formatFrequency({ value: 2, unit: "cuillères à café" })).toBe(
        "2 cuillères à café",
      );
    });
  });

  describe("Validation des entrées", () => {
    it("doit retourner '' si frequency est null", () => {
      expect(formatFrequency(null)).toBe("");
    });

    it("doit retourner '' si frequency est undefined", () => {
      expect(formatFrequency(undefined)).toBe("");
    });

    it("doit retourner '' si frequency n'est pas un objet", () => {
      expect(formatFrequency("invalid")).toBe("");
      expect(formatFrequency(123)).toBe("");
      expect(formatFrequency(true)).toBe("");
    });

    it("doit retourner '' si value est manquant", () => {
      expect(formatFrequency({ unit: "jour" })).toBe("");
    });

    it("doit retourner '' si unit est manquant", () => {
      expect(formatFrequency({ value: 1 })).toBe("");
    });

    it("doit retourner '' si value est null", () => {
      expect(formatFrequency({ value: null, unit: "jour" })).toBe("");
    });

    it("doit retourner '' si value est 0", () => {
      expect(formatFrequency({ value: 0, unit: "jour" })).toBe("");
    });

    it("doit retourner '' si unit est vide", () => {
      expect(formatFrequency({ value: 1, unit: "" })).toBe("");
    });
  });

  describe("Extensibilité - formats futurs", () => {
    it("doit gérer 'capsules par repas' sans modification", () => {
      expect(formatFrequency({ value: 2, unit: "capsules par repas" })).toBe(
        "2 capsules par repas",
      );
    });

    it("doit gérer 'gouttes (avant repas)' automatiquement", () => {
      expect(formatFrequency({ value: 5, unit: "gouttes (avant repas)" })).toBe(
        "5 gouttes (avant repas)",
      );
    });

    it("doit gérer 'ml par prise' automatiquement", () => {
      expect(formatFrequency({ value: 10, unit: "ml par prise" })).toBe(
        "10 ml par prise",
      );
    });
  });
});
