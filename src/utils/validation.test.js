// utils/validation.test.js
import { describe, it, expect } from "vitest";
import {
  validateSymptom,
  validateSymptoms,
  validateQueryParamLength,
  parseAndValidateSymptoms,
  validateSlugFormat,
} from "./validation";

describe("validation.js - Security Tests", () => {
  describe("validateSymptom", () => {
    it("should accept valid symptoms from symptomList", () => {
      expect(validateSymptom("fatigue")).toBe(true);
      expect(validateSymptom("mal de tête")).toBe(true);
      expect(validateSymptom("nausée")).toBe(true);
    });

    it("should accept valid synonyms", () => {
      expect(validateSymptom("migraine")).toBe(true); // synonyme de "mal de tête"
      expect(validateSymptom("céphalée")).toBe(true);
    });

    it("should reject symptoms with invalid characters", () => {
      expect(validateSymptom("<script>alert('xss')</script>")).toBe(false);
      expect(validateSymptom("'; DROP TABLE--")).toBe(false);
      expect(validateSymptom("symptom<img src=x>")).toBe(false);
    });

    it("should reject symptoms not in whitelist", () => {
      expect(validateSymptom("symptome-invalide-xyz")).toBe(false);
      expect(validateSymptom("random-symptom")).toBe(false);
    });

    it("should handle empty and null inputs", () => {
      expect(validateSymptom("")).toBe(false);
      expect(validateSymptom(null)).toBe(false);
      expect(validateSymptom(undefined)).toBe(false);
    });

    it("should reject too long symptoms", () => {
      const longSymptom = "a".repeat(101);
      expect(validateSymptom(longSymptom)).toBe(false);
    });

    it("should be case insensitive (via normalizeForMatching)", () => {
      expect(validateSymptom("FATIGUE")).toBe(true);
      expect(validateSymptom("Fatigue")).toBe(true);
      expect(validateSymptom("fatigue")).toBe(true);
    });
  });

  describe("validateSymptoms", () => {
    it("should validate array of symptoms", () => {
      const result = validateSymptoms(["fatigue", "nausée", "mal de tête"]);
      expect(result).toHaveLength(3);
      expect(result).toEqual(["fatigue", "nausée", "mal de tête"]);
    });

    it("should filter out invalid symptoms", () => {
      const result = validateSymptoms([
        "fatigue",
        "<script>xss</script>",
        "nausée",
      ]);
      expect(result).toHaveLength(2);
      expect(result).toEqual(["fatigue", "nausée"]);
    });

    it("should limit to 5 symptoms max", () => {
      const result = validateSymptoms([
        "fatigue",
        "nausée",
        "mal de tête",
        "stress",
        "insomnie",
        "anxiété", // 6ème symptôme, devrait être ignoré
      ]);
      expect(result).toHaveLength(5);
    });

    it("should handle empty array", () => {
      expect(validateSymptoms([])).toEqual([]);
    });

    it("should handle non-array input", () => {
      expect(validateSymptoms(null)).toEqual([]);
      expect(validateSymptoms(undefined)).toEqual([]);
      expect(validateSymptoms("not-an-array")).toEqual([]);
    });
  });

  describe("validateQueryParamLength", () => {
    it("should accept query params under 500 chars", () => {
      expect(validateQueryParamLength("fatigue,nausée")).toBe(true);
      expect(validateQueryParamLength("a".repeat(500))).toBe(true);
    });

    it("should reject query params over 500 chars", () => {
      expect(validateQueryParamLength("a".repeat(501))).toBe(false);
    });

    it("should handle non-string inputs", () => {
      expect(validateQueryParamLength(null)).toBe(false);
      expect(validateQueryParamLength(undefined)).toBe(false);
      expect(validateQueryParamLength(123)).toBe(false);
    });
  });

  describe("parseAndValidateSymptoms", () => {
    it("should parse and validate valid query param", () => {
      const result = parseAndValidateSymptoms("fatigue,nausée,mal de tête");
      expect(result).toHaveLength(3);
      expect(result).toEqual(["fatigue", "nausée", "mal de tête"]);
    });

    it("should decode URL-encoded symptoms", () => {
      const result = parseAndValidateSymptoms(
        "fatigue,naus%C3%A9e,mal%20de%20t%C3%AAte",
      );
      expect(result).toHaveLength(3);
      expect(result).toContain("fatigue");
      expect(result).toContain("nausée");
    });

    it("should filter out invalid symptoms from query param", () => {
      const result = parseAndValidateSymptoms(
        "fatigue,<script>xss</script>,nausée",
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(["fatigue", "nausée"]);
    });

    it("should reject query params that are too long", () => {
      const longParam = "a".repeat(501);
      const result = parseAndValidateSymptoms(longParam);
      expect(result).toEqual([]);
    });

    it("should handle malformed URL encoding", () => {
      const result = parseAndValidateSymptoms("fatigue,%E0%A4%A,nausée");
      // Malformed encoding should be skipped, valid ones kept
      expect(result).toContain("fatigue");
      expect(result).toContain("nausée");
    });

    it("should trim whitespace from symptoms", () => {
      const result = parseAndValidateSymptoms(
        "  fatigue  , nausée ,mal de tête",
      );
      expect(result).toHaveLength(3);
      expect(result).toEqual(["fatigue", "nausée", "mal de tête"]);
    });

    it("should filter empty strings", () => {
      const result = parseAndValidateSymptoms("fatigue,,nausée,  ,mal de tête");
      expect(result).toHaveLength(3);
      expect(result).toEqual(["fatigue", "nausée", "mal de tête"]);
    });
  });

  describe("validateSlugFormat", () => {
    it("should accept valid slugs", () => {
      expect(validateSlugFormat("citron")).toBe(true);
      expect(validateSlugFormat("thé-vert")).toBe(true);
      expect(validateSlugFormat("huile-d-olive")).toBe(true);
    });

    it("should accept slugs with French accents", () => {
      expect(validateSlugFormat("thé")).toBe(true);
      expect(validateSlugFormat("café")).toBe(true);
      expect(validateSlugFormat("mélisse")).toBe(true);
    });

    it("should reject slugs with invalid characters", () => {
      expect(validateSlugFormat("slug<script>")).toBe(false);
      expect(validateSlugFormat("slug with spaces")).toBe(false);
      expect(validateSlugFormat("slug/path")).toBe(false);
      expect(validateSlugFormat("slug?query=1")).toBe(false);
    });

    it("should reject slugs with leading/trailing hyphens", () => {
      expect(validateSlugFormat("-slug")).toBe(false);
      expect(validateSlugFormat("slug-")).toBe(false);
      expect(validateSlugFormat("-slug-")).toBe(false);
    });

    it("should reject slugs with double hyphens", () => {
      expect(validateSlugFormat("slug--with--double")).toBe(false);
    });

    it("should handle empty and null inputs", () => {
      expect(validateSlugFormat("")).toBe(false);
      expect(validateSlugFormat(null)).toBe(false);
      expect(validateSlugFormat(undefined)).toBe(false);
    });

    it("should reject too long slugs", () => {
      const longSlug = "a".repeat(101);
      expect(validateSlugFormat(longSlug)).toBe(false);
    });

    it("should reject uppercase letters (slugs must be lowercase)", () => {
      // Le pattern requiert minuscules uniquement (a-z, pas A-Z)
      // Les slugs générés par generateSlug() sont toujours en minuscules
      expect(validateSlugFormat("Citron")).toBe(false); // Majuscule rejetée
      expect(validateSlugFormat("citron")).toBe(true); // Minuscule acceptée
      expect(validateSlugFormat("THÉ-VERT")).toBe(false); // Majuscules rejetées
    });
  });

  describe("Security - XSS Prevention", () => {
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "javascript:alert('XSS')",
      "<img src=x onerror=alert('XSS')>",
      "';DROP TABLE symptoms;--",
      "../../../etc/passwd",
      "%3Cscript%3Ealert('XSS')%3C/script%3E",
    ];

    it("should reject all common XSS payloads in symptoms", () => {
      xssPayloads.forEach((payload) => {
        expect(validateSymptom(payload)).toBe(false);
      });
    });

    it("should reject XSS payloads in query params", () => {
      xssPayloads.forEach((payload) => {
        const result = parseAndValidateSymptoms(payload);
        expect(result).toEqual([]);
      });
    });

    it("should reject XSS payloads in slugs", () => {
      xssPayloads.forEach((payload) => {
        expect(validateSlugFormat(payload)).toBe(false);
      });
    });
  });
});
