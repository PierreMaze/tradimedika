import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CookieConsentProvider } from "../../cookie-consent";
import { AllergiesProvider, useAllergies } from "./AllergiesContext";

describe("AllergiesContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("useAllergies hook", () => {
    it("should throw error when used outside AllergiesProvider", () => {
      expect(() => renderHook(() => useAllergies())).toThrow(
        "useAllergies must be used within AllergiesProvider",
      );
    });

    it("should provide empty array as default", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.userAllergies).toEqual([]);
      expect(Array.isArray(result.current.userAllergies)).toBe(true);
      expect(result.current.isFilteringEnabled).toBe(false); // Filtrage désactivé par défaut
    });

    it("should toggle allergen (add and remove)", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter un allergène
      act(() => {
        result.current.toggleAllergen("citron");
      });

      expect(result.current.userAllergies).toEqual(["citron"]);
      expect(result.current.hasAllergen("citron")).toBe(true);

      // Ajouter un deuxième allergène
      act(() => {
        result.current.toggleAllergen("miel");
      });

      expect(result.current.userAllergies).toEqual(["citron", "miel"]);
      expect(result.current.hasAllergen("miel")).toBe(true);

      // Retirer le premier allergène
      act(() => {
        result.current.toggleAllergen("citron");
      });

      expect(result.current.userAllergies).toEqual(["miel"]);
      expect(result.current.hasAllergen("citron")).toBe(false);
      expect(result.current.hasAllergen("miel")).toBe(true);
    });

    it("should set allergies with validation", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Remplacer avec un nouveau tableau
      act(() => {
        result.current.setAllergies(["citron", "asteraceae", "miel"]);
      });

      expect(result.current.userAllergies).toEqual([
        "citron",
        "asteraceae",
        "miel",
      ]);

      // Filtrer les valeurs invalides
      act(() => {
        result.current.setAllergies(["citron", "", null, "miel", 123]);
      });

      expect(result.current.userAllergies).toEqual(["citron", "miel"]);
    });

    it("should clear all allergies", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter des allergènes
      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      expect(result.current.userAllergies).toEqual(["citron", "miel"]);

      // Effacer tout
      act(() => {
        result.current.clearAllergies();
      });

      expect(result.current.userAllergies).toEqual([]);
    });

    it("should check if allergen is active with hasAllergen", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      expect(result.current.hasAllergen("citron")).toBe(true);
      expect(result.current.hasAllergen("miel")).toBe(true);
      expect(result.current.hasAllergen("asteraceae")).toBe(false);
      expect(result.current.hasAllergen("bee-venom")).toBe(false);
    });

    it("should correctly determine if remedy is safe with canUseRemedy", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies utilisateur et activer le filtrage
      act(() => {
        result.current.setAllergies(["citron", "miel"]);
        result.current.enableFiltering();
      });

      // Remède sans allergènes = safe
      const safeRemedy1 = { name: "Riz", allergens: [] };
      expect(result.current.canUseRemedy(safeRemedy1)).toBe(true);

      // Remède avec allergènes différents = safe
      const safeRemedy2 = { name: "Camomille", allergens: ["asteraceae"] };
      expect(result.current.canUseRemedy(safeRemedy2)).toBe(true);

      // Remède avec un allergène commun = dangereux
      const dangerousRemedy1 = { name: "Citron", allergens: ["citron"] };
      expect(result.current.canUseRemedy(dangerousRemedy1)).toBe(false);

      // Remède avec plusieurs allergènes dont un commun = dangereux
      const dangerousRemedy2 = {
        name: "Ananas",
        allergens: ["miel-olive", "bee-venom", "miel"],
      };
      expect(result.current.canUseRemedy(dangerousRemedy2)).toBe(false);

      // Remède avec tous les allergènes communs = dangereux
      const dangerousRemedy3 = {
        name: "Test",
        allergens: ["citron", "miel"],
      };
      expect(result.current.canUseRemedy(dangerousRemedy3)).toBe(false);
    });

    it("should return true for all remedies when no allergies set", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Pas d'allergies = tout est safe
      const remedy1 = { name: "Citron", allergens: ["citron"] };
      const remedy2 = { name: "Miel", allergens: ["miel"] };
      const remedy3 = { name: "Riz", allergens: ["riz"] };

      expect(result.current.canUseRemedy(remedy1)).toBe(true);
      expect(result.current.canUseRemedy(remedy2)).toBe(true);
      expect(result.current.canUseRemedy(remedy3)).toBe(true);
    });

    it("should persist allergies in localStorage", async () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = window.localStorage.getItem("tradimedika-allergies");
      expect(JSON.parse(stored)).toEqual(["citron", "miel"]);
    });

    it("should load allergies from localStorage", () => {
      window.localStorage.setItem(
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
      window.localStorage.setItem(
        "tradimedika-allergies",
        JSON.stringify(["citron", "miel"]),
      );

      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.userAllergies).toEqual(["citron", "miel"]);
      expect(result.current.hasAllergen("citron")).toBe(true);
      expect(result.current.hasAllergen("miel")).toBe(true);
    });

    it("should handle invalid input gracefully", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // toggleAllergen avec input invalide (ne devrait pas crasher)
      act(() => {
        result.current.toggleAllergen("");
        result.current.toggleAllergen(null);
        result.current.toggleAllergen(undefined);
      });

      expect(result.current.userAllergies).toEqual([]);

      // setAllergies avec non-array (ne devrait pas crasher)
      act(() => {
        result.current.setAllergies("not-an-array");
        result.current.setAllergies(null);
        result.current.setAllergies(undefined);
      });

      expect(result.current.userAllergies).toEqual([]);
    });

    it("should handle corrupted localStorage data", () => {
      // Simuler des données corrompues dans localStorage
      window.localStorage.setItem("tradimedika-allergies", "not-valid-json");

      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Devrait fallback sur initialValue (array vide)
      expect(result.current.userAllergies).toEqual([]);
    });
  });

  describe("Filtering enabled/disabled", () => {
    it("should have filtering disabled by default", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.isFilteringEnabled).toBe(false);
    });

    it("should disable and enable filtering", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(false);

      // Réactiver le filtrage
      act(() => {
        result.current.enableFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(true);
    });

    it("should toggle filtering", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Par défaut: disabled (false)
      expect(result.current.isFilteringEnabled).toBe(false);

      // Toggle 1: enabled
      act(() => {
        result.current.toggleFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(true);

      // Toggle 2: disabled
      act(() => {
        result.current.toggleFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(false);
    });

    it("should not filter remedies when filtering is disabled", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies
      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      // Tous les remèdes devraient être safe (même avec allergènes)
      const remedyWithCitrus = { name: "Citron", allergens: ["citron"] };
      const remedyWithPollen = { name: "Miel", allergens: ["miel"] };

      expect(result.current.canUseRemedy(remedyWithCitrus)).toBe(true);
      expect(result.current.canUseRemedy(remedyWithPollen)).toBe(true);
    });

    it("should filter remedies when filtering is enabled", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies
      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      // Activer le filtrage (déjà activé par défaut mais on le fait explicitement)
      act(() => {
        result.current.enableFiltering();
      });

      // Les remèdes avec allergènes devraient être dangereux
      const remedyWithCitrus = { name: "Citron", allergens: ["citron"] };
      const remedyWithPollen = { name: "Miel", allergens: ["miel"] };
      const safeRemedy = { name: "Riz", allergens: [] };

      expect(result.current.canUseRemedy(remedyWithCitrus)).toBe(false);
      expect(result.current.canUseRemedy(remedyWithPollen)).toBe(false);
      expect(result.current.canUseRemedy(safeRemedy)).toBe(true);
    });

    it("should persist filtering state in localStorage", async () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = window.localStorage.getItem(
        "tradimedika-allergies-filtering-enabled",
      );
      expect(JSON.parse(stored)).toBe(false);
    });

    it("should load filtering state from localStorage", () => {
      window.localStorage.setItem(
        "tradimedika-allergies-filtering-enabled",
        JSON.stringify(false),
      );

      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.isFilteringEnabled).toBe(false);
    });

    it("should keep allergies in memory when filtering is disabled", () => {
      const wrapper = ({ children }) => (
        <CookieConsentProvider>
          <AllergiesProvider>{children}</AllergiesProvider>
        </CookieConsentProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter des allergies
      act(() => {
        result.current.setAllergies(["citron", "miel"]);
      });

      expect(result.current.userAllergies).toEqual(["citron", "miel"]);

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      // Les allergies doivent toujours être là
      expect(result.current.userAllergies).toEqual(["citron", "miel"]);
      expect(result.current.isFilteringEnabled).toBe(false);

      // Réactiver le filtrage
      act(() => {
        result.current.enableFiltering();
      });

      // Les allergies doivent toujours être là
      expect(result.current.userAllergies).toEqual(["citron", "miel"]);
      expect(result.current.isFilteringEnabled).toBe(true);
    });
  });
});
