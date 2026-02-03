import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { AllergiesProvider } from "../../allergens-search";
import { CookieConsentProvider } from "../../cookie-consent";
import { useRemedyAllergyCheck } from "./useRemedyAllergyCheck";

vi.mock("../../../data/allergensList.json", () => ({
  default: [
    { id: "citrus", name: "Agrumes", description: "", remedies: [] },
    { id: "pollen", name: "Pollen", description: "", remedies: [] },
    { id: "asteraceae", name: "Astéracées", description: "", remedies: [] },
  ],
}));

describe("useRemedyAllergyCheck", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => (
    <CookieConsentProvider>
      <AllergiesProvider>{children}</AllergiesProvider>
    </CookieConsentProvider>
  );

  it("should return false when no allergens match", () => {
    const remedy = { allergens: ["citrus"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(false);
    expect(result.current.matchingAllergens).toEqual([]);
    expect(result.current.allergenNames).toBe("");
  });

  it("should return true when allergens match and filtering enabled", () => {
    localStorage.setItem(
      "tradimedika-cookie-consent",
      JSON.stringify({
        version: 1,
        accepted: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
        categories: {
          analytics: true,
          functional: true,
          history: true,
          allergies: true,
        },
      }),
    );
    localStorage.setItem("tradimedika-allergies", JSON.stringify(["citrus"]));
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(true),
    );

    const remedy = { allergens: ["citrus", "pollen"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(true);
    expect(result.current.matchingAllergens).toEqual(["citrus"]);
    expect(result.current.allergenNames).toBe("agrumes");
  });

  it("should return false when filtering is disabled", () => {
    localStorage.setItem("tradimedika-allergies", JSON.stringify(["citrus"]));
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(false),
    );

    const remedy = { allergens: ["citrus"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(false);
  });

  it("should handle multiple matching allergens", () => {
    localStorage.setItem(
      "tradimedika-cookie-consent",
      JSON.stringify({
        version: 1,
        accepted: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
        categories: {
          analytics: true,
          functional: true,
          history: true,
          allergies: true,
        },
      }),
    );
    localStorage.setItem(
      "tradimedika-allergies",
      JSON.stringify(["citrus", "pollen"]),
    );
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(true),
    );

    const remedy = { allergens: ["citrus", "pollen", "asteraceae"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(true);
    expect(result.current.matchingAllergens).toEqual(["citrus", "pollen"]);
    expect(result.current.allergenNames).toBe("agrumes, pollen");
  });

  it("should handle remedy without allergens field", () => {
    const remedy = {};

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(false);
    expect(result.current.matchingAllergens).toEqual([]);
  });

  it("should handle null remedy", () => {
    const { result } = renderHook(() => useRemedyAllergyCheck(null), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(false);
    expect(result.current.matchingAllergens).toEqual([]);
  });

  it("should handle allergen not found in allergensList", () => {
    localStorage.setItem(
      "tradimedika-cookie-consent",
      JSON.stringify({
        version: 1,
        accepted: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
        categories: {
          analytics: true,
          functional: true,
          history: true,
          allergies: true,
        },
      }),
    );
    localStorage.setItem(
      "tradimedika-allergies",
      JSON.stringify(["unknown-allergen"]),
    );
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(true),
    );

    const remedy = { allergens: ["unknown-allergen"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.matchingAllergens).toEqual(["unknown-allergen"]);
    expect(result.current.allergenNames).toBe("");
  });
});
