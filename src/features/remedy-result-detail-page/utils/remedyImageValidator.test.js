import { describe, it, expect } from "vitest";
import { isValidImageUrl, getSafeImageUrl } from "./remedyImageValidator";

describe("remedyImageValidator", () => {
  describe("isValidImageUrl", () => {
    it("should return true for valid HTTPS URLs", () => {
      expect(isValidImageUrl("https://example.com/image.jpg")).toBe(true);
      expect(isValidImageUrl("https://cdn.example.com/path/to/image.png")).toBe(
        true,
      );
    });

    it("should return false for HTTP URLs", () => {
      expect(isValidImageUrl("http://example.com/image.jpg")).toBe(false);
    });

    it("should return false for null or empty", () => {
      expect(isValidImageUrl(null)).toBe(false);
      expect(isValidImageUrl(undefined)).toBe(false);
      expect(isValidImageUrl("")).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(isValidImageUrl(123)).toBe(false);
      expect(isValidImageUrl({})).toBe(false);
      expect(isValidImageUrl([])).toBe(false);
    });

    it("should return false for malformed URLs", () => {
      expect(isValidImageUrl("https://")).toBe(false);
      expect(isValidImageUrl("not-a-url")).toBe(false);
    });
  });

  describe("getSafeImageUrl", () => {
    it("should return original URL if valid", () => {
      const url = "https://example.com/image.jpg";
      expect(getSafeImageUrl(url)).toBe(url);
    });

    it("should return placeholder for invalid URLs", () => {
      const placeholder = getSafeImageUrl("http://example.com/image.jpg");
      expect(placeholder).toContain("placeholder");
      expect(placeholder).toContain("Image+non+disponible");
    });

    it("should return placeholder for null or empty", () => {
      expect(getSafeImageUrl(null)).toContain("placeholder");
      expect(getSafeImageUrl("")).toContain("placeholder");
    });
  });
});
