import { describe, it, expect } from "vitest";
import { formatSegmentLabel } from "./formatSegmentLabel";

describe("formatSegmentLabel", () => {
  describe("Basic transformations", () => {
    it("should replace hyphens with spaces", () => {
      expect(formatSegmentLabel("huile-de-coco")).toBe("Huile De Coco");
      expect(formatSegmentLabel("menthe-poivree")).toBe("Menthe Poivree");
      expect(formatSegmentLabel("the-vert")).toBe("The Vert");
    });

    it("should capitalize first letter of each word", () => {
      expect(formatSegmentLabel("gingembre")).toBe("Gingembre");
      expect(formatSegmentLabel("cafe-noir")).toBe("Cafe Noir");
      expect(formatSegmentLabel("miel-bio")).toBe("Miel Bio");
    });

    it("should handle single word", () => {
      expect(formatSegmentLabel("gingembre")).toBe("Gingembre");
      expect(formatSegmentLabel("camomille")).toBe("Camomille");
    });

    it("should handle multiple hyphens", () => {
      expect(formatSegmentLabel("huile-de-noix-de-coco")).toBe(
        "Huile De Noix De Coco",
      );
    });
  });

  describe("URI decoding", () => {
    it("should decode URI encoded characters", () => {
      // %C3%A9 = é
      expect(formatSegmentLabel("th%C3%A9-vert")).toBe("Thé Vert");
      // %C3%A9e = ée
      expect(formatSegmentLabel("menthe-poivr%C3%A9e")).toBe("Menthe Poivrée");
    });

    it("should decode complex URI characters", () => {
      // %C3%A0 = à
      expect(formatSegmentLabel("graines-%C3%A0-caf%C3%A9")).toBe(
        "Graines À Café",
      );
    });

    it("should handle already decoded strings", () => {
      expect(formatSegmentLabel("thé-vert")).toBe("Thé Vert");
      expect(formatSegmentLabel("café-noir")).toBe("Café Noir");
    });
  });

  describe("Edge cases", () => {
    it("should return empty string for null", () => {
      expect(formatSegmentLabel(null)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(formatSegmentLabel(undefined)).toBe("");
    });

    it("should return empty string for empty string", () => {
      expect(formatSegmentLabel("")).toBe("");
    });

    it("should return empty string for non-string types", () => {
      expect(formatSegmentLabel(123)).toBe("");
      expect(formatSegmentLabel({})).toBe("");
      expect(formatSegmentLabel([])).toBe("");
    });

    it("should handle malformed URI gracefully", () => {
      // Invalid URI encoding should not crash
      const result = formatSegmentLabel("test%invalide%");
      expect(result).toBeTruthy(); // Should return something
      expect(result).toBe("Test%invalide%"); // Fallback without URI decoding
    });

    it("should handle segment with only hyphens", () => {
      expect(formatSegmentLabel("---")).toBe("   ");
    });

    it("should handle segment with spaces already present", () => {
      expect(formatSegmentLabel("test test")).toBe("Test Test");
    });
  });

  describe("Special characters", () => {
    it("should handle accented characters", () => {
      expect(formatSegmentLabel("café")).toBe("Café");
      expect(formatSegmentLabel("thé")).toBe("Thé");
      expect(formatSegmentLabel("épice")).toBe("Épice");
    });

    it("should handle mixed case input", () => {
      expect(formatSegmentLabel("THE-VERT")).toBe("THE VERT");
      expect(formatSegmentLabel("Cafe-Noir")).toBe("Cafe Noir");
    });

    it("should preserve numbers", () => {
      expect(formatSegmentLabel("vitamine-b12")).toBe("Vitamine B12");
      expect(formatSegmentLabel("omega-3")).toBe("Omega 3");
    });
  });

  describe("Real-world examples", () => {
    it("should format remedy slugs correctly", () => {
      expect(formatSegmentLabel("gingembre-frais")).toBe("Gingembre Frais");
      expect(formatSegmentLabel("huile-essentielle-lavande")).toBe(
        "Huile Essentielle Lavande",
      );
      expect(formatSegmentLabel("miel-de-manuka")).toBe("Miel De Manuka");
    });

    it("should format symptom slugs correctly", () => {
      expect(formatSegmentLabel("mal-de-tete")).toBe("Mal De Tete");
      expect(formatSegmentLabel("douleurs-articulaires")).toBe(
        "Douleurs Articulaires",
      );
      expect(formatSegmentLabel("trouble-du-sommeil")).toBe(
        "Trouble Du Sommeil",
      );
    });

    it("should format page names correctly", () => {
      expect(formatSegmentLabel("a-propos")).toBe("A Propos");
      expect(formatSegmentLabel("conditions-utilisation")).toBe(
        "Conditions Utilisation",
      );
    });
  });

  describe("Performance", () => {
    it("should handle long segments", () => {
      const longSegment =
        "this-is-a-very-long-segment-with-many-words-and-hyphens-to-test-performance";
      const result = formatSegmentLabel(longSegment);
      expect(result).toContain("This");
      expect(result).toContain("Performance");
      expect(result.split(" ").length).toBeGreaterThan(5);
    });

    it("should handle repeated transformations", () => {
      const segment = "test-segment";
      const result1 = formatSegmentLabel(segment);
      const result2 = formatSegmentLabel(segment);
      expect(result1).toBe(result2);
      expect(result1).toBe("Test Segment");
    });
  });

  describe("Multiple spaces handling", () => {
    it("should handle multiple consecutive hyphens", () => {
      expect(formatSegmentLabel("test--double")).toBe("Test  Double");
    });

    it("should not crash on segment with trailing hyphen", () => {
      expect(formatSegmentLabel("test-")).toBe("Test ");
    });

    it("should not crash on segment with leading hyphen", () => {
      expect(formatSegmentLabel("-test")).toBe(" Test");
    });
  });
});
