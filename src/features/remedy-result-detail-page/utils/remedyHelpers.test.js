import { describe, it, expect } from "vitest";
import { getTypeColors, generateRemedySEOMeta } from "./remedyHelpers";

describe("remedyHelpers", () => {
  describe("getTypeColors", () => {
    it("should return color classes for all remedy types", () => {
      const colors = getTypeColors();

      expect(colors).toHaveProperty("aliment");
      expect(colors).toHaveProperty("boisson");
      expect(colors).toHaveProperty("épice");
      expect(colors).toHaveProperty("plante");
    });

    it("should return Tailwind CSS classes", () => {
      const colors = getTypeColors();

      expect(colors.aliment).toContain("bg-yellow");
      expect(colors.boisson).toContain("bg-cyan");
      expect(colors.épice).toContain("bg-orange");
      expect(colors.plante).toContain("bg-green");
    });

    it("should include dark mode classes", () => {
      const colors = getTypeColors();

      Object.values(colors).forEach((colorClass) => {
        expect(colorClass).toContain("dark:");
      });
    });
  });

  describe("generateRemedySEOMeta", () => {
    it("should generate SEO meta with description", () => {
      const remedy = {
        name: "Citron",
        type: "aliment",
        description: "Un agrume riche en vitamine C",
      };
      const meta = generateRemedySEOMeta(remedy, "citron");

      expect(meta.pageTitle).toBe("Citron - Remède naturel | TRADIMEDIKA");
      expect(meta.pageDescription).toBe("Un agrume riche en vitamine C");
      expect(meta.canonicalUrl).toBe(
        "https://pierremaze.github.io/tradimedika/remedes/citron",
      );
    });

    it("should generate default description if none provided", () => {
      const remedy = {
        name: "Thé Vert",
        type: "plante",
      };
      const meta = generateRemedySEOMeta(remedy, "the-vert");

      expect(meta.pageTitle).toBe("Thé Vert - Remède naturel | TRADIMEDIKA");
      expect(meta.pageDescription).toContain("Thé Vert");
      expect(meta.pageDescription).toContain("plante");
      expect(meta.canonicalUrl).toContain("the-vert");
    });

    it("should handle special characters in slug", () => {
      const remedy = {
        name: "Thé à la Menthe",
        type: "boisson",
        description: "Une boisson rafraîchissante",
      };
      const meta = generateRemedySEOMeta(remedy, "the-a-la-menthe");

      expect(meta.canonicalUrl).toBe(
        "https://pierremaze.github.io/tradimedika/remedes/the-a-la-menthe",
      );
    });
  });
});
