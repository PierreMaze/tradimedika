import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AllergiesProvider } from "../../allergens-search";
import { CookieConsentProvider } from "../../cookie-consent";
import { useRemedyAllergyCheck } from "./useRemedyAllergyCheck";

vi.mock("../../../data/allergensList.json", () => ({
  default: [
    { id: "citron", name: "Citron", description: "", remedies: [] },
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
    const remedy = { allergens: ["citron"] };

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
    localStorage.setItem("tradimedika-allergies", JSON.stringify(["citron"]));
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(true),
    );

    const remedy = { allergens: ["citron", "pollen"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(true);
    expect(result.current.matchingAllergens).toEqual(["citron"]);
    expect(result.current.allergenNames).toBe("citron");
  });

  it("should return false when filtering is disabled", () => {
    localStorage.setItem("tradimedika-allergies", JSON.stringify(["citron"]));
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(false),
    );

    const remedy = { allergens: ["citron"] };

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
      JSON.stringify(["citron", "pollen"]),
    );
    localStorage.setItem(
      "tradimedika-allergies-filtering-enabled",
      JSON.stringify(true),
    );

    const remedy = { allergens: ["citron", "pollen", "asteraceae"] };

    const { result } = renderHook(() => useRemedyAllergyCheck(remedy), {
      wrapper,
    });

    expect(result.current.hasUserAllergens).toBe(true);
    expect(result.current.matchingAllergens).toEqual(["citron", "pollen"]);
    expect(result.current.allergenNames).toBe("citron, pollen");
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
