// utils/capitalizeFirstLetter.test.js
import { describe, it, expect } from "vitest";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  describe("Basic functionality", () => {
    it("should capitalize first letter of lowercase string", () => {
      expect(capitalizeFirstLetter("hello")).toBe("Hello");
    });

    it("should capitalize first letter of uppercase string", () => {
      expect(capitalizeFirstLetter("WORLD")).toBe("WORLD");
    });

    it("should capitalize first letter of mixed case string", () => {
      expect(capitalizeFirstLetter("hELLO")).toBe("HELLO");
    });

    it("should handle single character string", () => {
      expect(capitalizeFirstLetter("a")).toBe("A");
    });

    it("should handle already capitalized string", () => {
      expect(capitalizeFirstLetter("Hello")).toBe("Hello");
    });
  });

  describe("lowerRest parameter", () => {
    it("should lowercase rest of string when lowerRest is true", () => {
      expect(capitalizeFirstLetter("hELLO wORLD", true)).toBe("Hello world");
    });

    it("should preserve rest of string when lowerRest is false", () => {
      expect(capitalizeFirstLetter("hELLO wORLD", false)).toBe("HELLO wORLD");
    });

    it("should preserve rest of string when lowerRest is not provided (default)", () => {
      expect(capitalizeFirstLetter("hELLO wORLD")).toBe("HELLO wORLD");
    });

    it("should lowercase uppercase string when lowerRest is true", () => {
      expect(capitalizeFirstLetter("ANTIOXYDANT", true)).toBe("Antioxydant");
    });

    it("should preserve uppercase string when lowerRest is false", () => {
      expect(capitalizeFirstLetter("ANTIOXYDANT", false)).toBe("ANTIOXYDANT");
    });
  });

  describe("French characters", () => {
    it("should handle French accents in first letter", () => {
      expect(capitalizeFirstLetter("énergie")).toBe("Énergie");
    });

    it("should handle French accents with lowerRest", () => {
      expect(capitalizeFirstLetter("ÉNERGISANT", true)).toBe("Énergisant");
    });

    it("should handle cedilla", () => {
      expect(capitalizeFirstLetter("ça va")).toBe("Ça va");
    });

    it("should handle accented characters in rest of string", () => {
      expect(capitalizeFirstLetter("thé vert", false)).toBe("Thé vert");
      expect(capitalizeFirstLetter("THÉ VERT", true)).toBe("Thé vert");
    });
  });

  describe("Edge cases", () => {
    it("should handle string with numbers", () => {
      expect(capitalizeFirstLetter("123abc")).toBe("123abc");
    });

    it("should handle string starting with space", () => {
      expect(capitalizeFirstLetter(" hello")).toBe(" hello");
    });

    it("should handle string with special characters", () => {
      expect(capitalizeFirstLetter("anti-inflammatoire", true)).toBe(
        "Anti-inflammatoire",
      );
    });

    it("should handle empty rest (single char)", () => {
      expect(capitalizeFirstLetter("a", true)).toBe("A");
      expect(capitalizeFirstLetter("A", false)).toBe("A");
    });
  });
});
