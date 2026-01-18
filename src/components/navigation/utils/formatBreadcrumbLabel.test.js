import { describe, it, expect } from "vitest";
import { formatBreadcrumbLabel } from "./formatBreadcrumbLabel";

describe("formatBreadcrumbLabel", () => {
  describe("Basic transformations", () => {
    it("should replace hyphens with spaces", () => {
      expect(formatBreadcrumbLabel("huile-de-coco")).toBe("Huile De Coco");
      expect(formatBreadcrumbLabel("menthe-poivree")).toBe("Menthe Poivree");
      expect(formatBreadcrumbLabel("the-vert")).toBe("The Vert");
    });

    it("should capitalize first letter of each word", () => {
      expect(formatBreadcrumbLabel("gingembre")).toBe("Gingembre");
      expect(formatBreadcrumbLabel("cafe-noir")).toBe("Cafe Noir");
      expect(formatBreadcrumbLabel("miel-bio")).toBe("Miel Bio");
    });

    it("should handle single word", () => {
      expect(formatBreadcrumbLabel("gingembre")).toBe("Gingembre");
      expect(formatBreadcrumbLabel("camomille")).toBe("Camomille");
    });

    it("should handle multiple hyphens", () => {
      expect(formatBreadcrumbLabel("huile-de-noix-de-coco")).toBe(
        "Huile De Noix De Coco",
      );
    });
  });

  describe("URI decoding", () => {
    it("should decode URI encoded characters", () => {
      // %C3%A9 = é
      expect(formatBreadcrumbLabel("th%C3%A9-vert")).toBe("Thé Vert");
      // %C3%A9e = ée
      expect(formatBreadcrumbLabel("menthe-poivr%C3%A9e")).toBe(
        "Menthe Poivrée",
      );
    });

    it("should decode complex URI characters", () => {
      // %C3%A0 = à
      expect(formatBreadcrumbLabel("graines-%C3%A0-caf%C3%A9")).toBe(
        "Graines À Café",
      );
    });

    it("should handle already decoded strings", () => {
      expect(formatBreadcrumbLabel("thé-vert")).toBe("Thé Vert");
      expect(formatBreadcrumbLabel("café-noir")).toBe("Café Noir");
    });
  });

  describe("Edge cases", () => {
    it("should return empty string for null", () => {
      expect(formatBreadcrumbLabel(null)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(formatBreadcrumbLabel(undefined)).toBe("");
    });

    it("should return empty string for empty string", () => {
      expect(formatBreadcrumbLabel("")).toBe("");
    });

    it("should return empty string for non-string types", () => {
      expect(formatBreadcrumbLabel(123)).toBe("");
      expect(formatBreadcrumbLabel({})).toBe("");
      expect(formatBreadcrumbLabel([])).toBe("");
    });

    it("should handle malformed URI gracefully", () => {
      // Invalid URI encoding should not crash
      const result = formatBreadcrumbLabel("test%invalide%");
      expect(result).toBeTruthy(); // Should return something
      expect(result).toBe("Test%invalide%"); // Fallback without URI decoding
    });

    it("should handle segment with only hyphens", () => {
      expect(formatBreadcrumbLabel("---")).toBe("   ");
    });

    it("should handle segment with spaces already present", () => {
      expect(formatBreadcrumbLabel("test test")).toBe("Test Test");
    });
  });

  describe("Special characters", () => {
    it("should handle accented characters", () => {
      expect(formatBreadcrumbLabel("café")).toBe("Café");
      expect(formatBreadcrumbLabel("thé")).toBe("Thé");
      expect(formatBreadcrumbLabel("épice")).toBe("Épice");
    });

    it("should handle mixed case input", () => {
      expect(formatBreadcrumbLabel("THE-VERT")).toBe("THE VERT");
      expect(formatBreadcrumbLabel("Cafe-Noir")).toBe("Cafe Noir");
    });

    it("should preserve numbers", () => {
      expect(formatBreadcrumbLabel("vitamine-b12")).toBe("Vitamine B12");
      expect(formatBreadcrumbLabel("omega-3")).toBe("Omega 3");
    });
  });

  describe("Real-world examples", () => {
    it("should format remedy slugs correctly", () => {
      expect(formatBreadcrumbLabel("gingembre-frais")).toBe("Gingembre Frais");
      expect(formatBreadcrumbLabel("huile-essentielle-lavande")).toBe(
        "Huile Essentielle Lavande",
      );
      expect(formatBreadcrumbLabel("miel-de-manuka")).toBe("Miel De Manuka");
    });

    it("should format symptom slugs correctly", () => {
      expect(formatBreadcrumbLabel("mal-de-tete")).toBe("Mal De Tete");
      expect(formatBreadcrumbLabel("douleurs-articulaires")).toBe(
        "Douleurs Articulaires",
      );
      expect(formatBreadcrumbLabel("trouble-du-sommeil")).toBe(
        "Trouble Du Sommeil",
      );
    });

    it("should format page names correctly", () => {
      expect(formatBreadcrumbLabel("a-propos")).toBe("A Propos");
      expect(formatBreadcrumbLabel("conditions-utilisation")).toBe(
        "Conditions Utilisation",
      );
    });
  });

  describe("Performance", () => {
    it("should handle long segments", () => {
      const longSegment =
        "this-is-a-very-long-segment-with-many-words-and-hyphens-to-test-performance";
      const result = formatBreadcrumbLabel(longSegment);
      expect(result).toContain("This");
      expect(result).toContain("Performance");
      expect(result.split(" ").length).toBeGreaterThan(5);
    });

    it("should handle repeated transformations", () => {
      const segment = "test-segment";
      const result1 = formatBreadcrumbLabel(segment);
      const result2 = formatBreadcrumbLabel(segment);
      expect(result1).toBe(result2);
      expect(result1).toBe("Test Segment");
    });
  });

  describe("Multiple spaces handling", () => {
    it("should handle multiple consecutive hyphens", () => {
      expect(formatBreadcrumbLabel("test--double")).toBe("Test  Double");
    });

    it("should not crash on segment with trailing hyphen", () => {
      expect(formatBreadcrumbLabel("test-")).toBe("Test ");
    });

    it("should not crash on segment with leading hyphen", () => {
      expect(formatBreadcrumbLabel("-test")).toBe(" Test");
    });
  });
});
