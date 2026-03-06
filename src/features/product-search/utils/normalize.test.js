import { describe, it, expect } from "vitest";
import { normalizeSymptom, normalizeForMatching } from "./normalizeSymptom";

describe("normalizeSymptom", () => {
  it("doit convertir en minuscules", () => {
    expect(normalizeSymptom("DIARRHÉE")).toBe("diarrhée");
    expect(normalizeSymptom("Mal de Tête")).toBe("mal de tête");
    expect(normalizeSymptom("FATIGUE")).toBe("fatigue");
  });

  it("doit conserver les accents français", () => {
    expect(normalizeSymptom("diarrhée")).toBe("diarrhée");
    expect(normalizeSymptom("immunité")).toBe("immunité");
    expect(normalizeSymptom("fièvre")).toBe("fièvre");
    expect(normalizeSymptom("nausée")).toBe("nausée");
  });

  it("doit remplacer les tirets par des espaces", () => {
    expect(normalizeSymptom("mal-de-tête")).toBe("mal de tête");
    expect(normalizeSymptom("éruption-cutanée")).toBe("éruption cutanée");
  });

  it("doit remplacer les underscores par des espaces", () => {
    expect(normalizeSymptom("mal_de_tête")).toBe("mal de tête");
    expect(normalizeSymptom("perte_de_cheveux")).toBe("perte de cheveux");
  });

  it("doit normaliser les espaces multiples en un seul", () => {
    expect(normalizeSymptom("mal   de   tête")).toBe("mal de tête");
    expect(normalizeSymptom("diarrhée    aiguë")).toBe("diarrhée aiguë");
  });

  it("doit supprimer les espaces en début et fin", () => {
    expect(normalizeSymptom("  diarrhée  ")).toBe("diarrhée");
    expect(normalizeSymptom(" mal de tête ")).toBe("mal de tête");
  });

  it("doit gérer les chaînes vides", () => {
    expect(normalizeSymptom("")).toBe("");
    expect(normalizeSymptom("   ")).toBe("");
  });

  it("doit retourner une chaîne vide si le type n'est pas string", () => {
    expect(normalizeSymptom(null)).toBe("");
    expect(normalizeSymptom(undefined)).toBe("");
    expect(normalizeSymptom(123)).toBe("");
    expect(normalizeSymptom({})).toBe("");
  });

  it("doit gérer les cas complexes combinant plusieurs règles", () => {
    expect(normalizeSymptom("  MAL-DE-TÊTE  ")).toBe("mal de tête");
    expect(normalizeSymptom("ÉRUPTION_CUTANÉE")).toBe("éruption cutanée");
    expect(normalizeSymptom("  DIARRHÉE   AIGUË  ")).toBe("diarrhée aiguë");
  });
});

describe("normalizeForMatching", () => {
  it("doit convertir en minuscules", () => {
    expect(normalizeForMatching("DIARRHÉE")).toBe("diarrhee");
    expect(normalizeForMatching("Mal de Tête")).toBe("mal de tete");
    expect(normalizeForMatching("FATIGUE")).toBe("fatigue");
  });

  it("doit supprimer les accents français", () => {
    expect(normalizeForMatching("diarrhée")).toBe("diarrhee");
    expect(normalizeForMatching("immunité")).toBe("immunite");
    expect(normalizeForMatching("fièvre")).toBe("fievre");
    expect(normalizeForMatching("nausée")).toBe("nausee");
    expect(normalizeForMatching("tête")).toBe("tete");
    expect(normalizeForMatching("à")).toBe("a");
    expect(normalizeForMatching("è")).toBe("e");
    expect(normalizeForMatching("ô")).toBe("o");
    expect(normalizeForMatching("ù")).toBe("u");
  });

  it("doit permettre le matching flexible (avec et sans accents)", () => {
    const withAccent = normalizeForMatching("diarrhée");
    const withoutAccent = normalizeForMatching("diarrhee");

    expect(withAccent).toBe(withoutAccent);
    expect(withAccent).toBe("diarrhee");
  });

  it("doit remplacer les tirets par des espaces", () => {
    expect(normalizeForMatching("mal-de-tête")).toBe("mal de tete");
    expect(normalizeForMatching("éruption-cutanée")).toBe("eruption cutanee");
  });

  it("doit remplacer les underscores par des espaces", () => {
    expect(normalizeForMatching("mal_de_tête")).toBe("mal de tete");
    expect(normalizeForMatching("perte_de_cheveux")).toBe("perte de cheveux");
  });

  it("doit normaliser les espaces multiples en un seul", () => {
    expect(normalizeForMatching("mal   de   tête")).toBe("mal de tete");
    expect(normalizeForMatching("diarrhée    aiguë")).toBe("diarrhee aigue");
  });

  it("doit supprimer les espaces en début et fin", () => {
    expect(normalizeForMatching("  diarrhée  ")).toBe("diarrhee");
    expect(normalizeForMatching(" mal de tête ")).toBe("mal de tete");
  });

  it("doit gérer les chaînes vides", () => {
    expect(normalizeForMatching("")).toBe("");
    expect(normalizeForMatching("   ")).toBe("");
  });

  it("doit retourner une chaîne vide si le type n'est pas string", () => {
    expect(normalizeForMatching(null)).toBe("");
    expect(normalizeForMatching(undefined)).toBe("");
    expect(normalizeForMatching(123)).toBe("");
    expect(normalizeForMatching({})).toBe("");
  });

  it("doit gérer les cas complexes combinant plusieurs règles", () => {
    expect(normalizeForMatching("  MAL-DE-TÊTE  ")).toBe("mal de tete");
    expect(normalizeForMatching("ÉRUPTION_CUTANÉE")).toBe("eruption cutanee");
    expect(normalizeForMatching("  DIARRHÉE   AIGUË  ")).toBe("diarrhee aigue");
  });

  it("doit gérer tous les accents français courants", () => {
    expect(normalizeForMatching("àâäéèêëïîôùûüÿç")).toBe("aaaeeeeiiouuuyc");
  });
});

describe("Différence entre normalizeSymptom et normalizeForMatching", () => {
  it("normalizeSymptom doit conserver les accents", () => {
    const result = normalizeSymptom("Diarrhée");
    expect(result).toBe("diarrhée");
    expect(result).toContain("é");
  });

  it("normalizeForMatching doit supprimer les accents", () => {
    const result = normalizeForMatching("Diarrhée");
    expect(result).toBe("diarrhee");
    expect(result).not.toContain("é");
  });

  it("les deux fonctions doivent gérer les tirets/underscores identiquement", () => {
    const input = "mal-de_tête";
    const display = normalizeSymptom(input);
    const matching = normalizeForMatching(input);

    // normalizeSymptom conserve les accents, normalizeForMatching les supprime
    expect(display).toBe("mal de tête");
    expect(matching).toBe("mal de tete");
  });
});
