import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
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
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.userAllergies).toEqual([]);
      expect(Array.isArray(result.current.userAllergies)).toBe(true);
      expect(result.current.isFilteringEnabled).toBe(true); // Filtrage activé par défaut
    });

    it("should toggle allergen (add and remove)", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter un allergène
      act(() => {
        result.current.toggleAllergen("citrus");
      });

      expect(result.current.userAllergies).toEqual(["citrus"]);
      expect(result.current.hasAllergen("citrus")).toBe(true);

      // Ajouter un deuxième allergène
      act(() => {
        result.current.toggleAllergen("pollen");
      });

      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);
      expect(result.current.hasAllergen("pollen")).toBe(true);

      // Retirer le premier allergène
      act(() => {
        result.current.toggleAllergen("citrus");
      });

      expect(result.current.userAllergies).toEqual(["pollen"]);
      expect(result.current.hasAllergen("citrus")).toBe(false);
      expect(result.current.hasAllergen("pollen")).toBe(true);
    });

    it("should set allergies with validation", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Remplacer avec un nouveau tableau
      act(() => {
        result.current.setAllergies(["citrus", "asteraceae", "pollen"]);
      });

      expect(result.current.userAllergies).toEqual([
        "citrus",
        "asteraceae",
        "pollen",
      ]);

      // Filtrer les valeurs invalides
      act(() => {
        result.current.setAllergies(["citrus", "", null, "pollen", 123]);
      });

      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);
    });

    it("should clear all allergies", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter des allergènes
      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);

      // Effacer tout
      act(() => {
        result.current.clearAllergies();
      });

      expect(result.current.userAllergies).toEqual([]);
    });

    it("should check if allergen is active with hasAllergen", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      expect(result.current.hasAllergen("citrus")).toBe(true);
      expect(result.current.hasAllergen("pollen")).toBe(true);
      expect(result.current.hasAllergen("asteraceae")).toBe(false);
      expect(result.current.hasAllergen("bee-venom")).toBe(false);
    });

    it("should correctly determine if remedy is safe with canUseRemedy", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies utilisateur
      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      // Remède sans allergènes = safe
      const safeRemedy1 = { name: "Riz", allergens: [] };
      expect(result.current.canUseRemedy(safeRemedy1)).toBe(true);

      // Remède avec allergènes différents = safe
      const safeRemedy2 = { name: "Camomille", allergens: ["asteraceae"] };
      expect(result.current.canUseRemedy(safeRemedy2)).toBe(true);

      // Remède avec un allergène commun = dangereux
      const dangerousRemedy1 = { name: "Citron", allergens: ["citrus"] };
      expect(result.current.canUseRemedy(dangerousRemedy1)).toBe(false);

      // Remède avec plusieurs allergènes dont un commun = dangereux
      const dangerousRemedy2 = {
        name: "Ananas",
        allergens: ["pollen-olive", "bee-venom", "pollen"],
      };
      expect(result.current.canUseRemedy(dangerousRemedy2)).toBe(false);

      // Remède avec tous les allergènes communs = dangereux
      const dangerousRemedy3 = {
        name: "Test",
        allergens: ["citrus", "pollen"],
      };
      expect(result.current.canUseRemedy(dangerousRemedy3)).toBe(false);
    });

    it("should return true for all remedies when no allergies set", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Pas d'allergies = tout est safe
      const remedy1 = { name: "Citron", allergens: ["citrus"] };
      const remedy2 = { name: "Miel", allergens: ["pollen"] };
      const remedy3 = { name: "Riz", allergens: [] };

      expect(result.current.canUseRemedy(remedy1)).toBe(true);
      expect(result.current.canUseRemedy(remedy2)).toBe(true);
      expect(result.current.canUseRemedy(remedy3)).toBe(true);
    });

    it("should persist allergies in localStorage", async () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = window.localStorage.getItem("tradimedika-allergies");
      expect(JSON.parse(stored)).toEqual(["citrus", "pollen"]);
    });

    it("should load allergies from localStorage", () => {
      window.localStorage.setItem(
        "tradimedika-allergies",
        JSON.stringify(["asteraceae", "bee-venom"]),
      );

      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.userAllergies).toEqual(["asteraceae", "bee-venom"]);
      expect(result.current.hasAllergen("asteraceae")).toBe(true);
      expect(result.current.hasAllergen("bee-venom")).toBe(true);
    });

    it("should handle invalid input gracefully", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
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
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Devrait fallback sur initialValue (array vide)
      expect(result.current.userAllergies).toEqual([]);
    });
  });

  describe("Filtering enabled/disabled", () => {
    it("should have filtering enabled by default", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.isFilteringEnabled).toBe(true);
    });

    it("should disable and enable filtering", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
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
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Par défaut: enabled (true)
      expect(result.current.isFilteringEnabled).toBe(true);

      // Toggle 1: disabled
      act(() => {
        result.current.toggleFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(false);

      // Toggle 2: enabled
      act(() => {
        result.current.toggleFiltering();
      });

      expect(result.current.isFilteringEnabled).toBe(true);
    });

    it("should not filter remedies when filtering is disabled", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies
      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      // Tous les remèdes devraient être safe (même avec allergènes)
      const remedyWithCitrus = { name: "Citron", allergens: ["citrus"] };
      const remedyWithPollen = { name: "Miel", allergens: ["pollen"] };

      expect(result.current.canUseRemedy(remedyWithCitrus)).toBe(true);
      expect(result.current.canUseRemedy(remedyWithPollen)).toBe(true);
    });

    it("should filter remedies when filtering is enabled", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Définir allergies
      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      // Activer le filtrage (déjà activé par défaut mais on le fait explicitement)
      act(() => {
        result.current.enableFiltering();
      });

      // Les remèdes avec allergènes devraient être dangereux
      const remedyWithCitrus = { name: "Citron", allergens: ["citrus"] };
      const remedyWithPollen = { name: "Miel", allergens: ["pollen"] };
      const safeRemedy = { name: "Riz", allergens: [] };

      expect(result.current.canUseRemedy(remedyWithCitrus)).toBe(false);
      expect(result.current.canUseRemedy(remedyWithPollen)).toBe(false);
      expect(result.current.canUseRemedy(safeRemedy)).toBe(true);
    });

    it("should persist filtering state in localStorage", async () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
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
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      expect(result.current.isFilteringEnabled).toBe(false);
    });

    it("should keep allergies in memory when filtering is disabled", () => {
      const wrapper = ({ children }) => (
        <AllergiesProvider>{children}</AllergiesProvider>
      );

      const { result } = renderHook(() => useAllergies(), { wrapper });

      // Ajouter des allergies
      act(() => {
        result.current.setAllergies(["citrus", "pollen"]);
      });

      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);

      // Désactiver le filtrage
      act(() => {
        result.current.disableFiltering();
      });

      // Les allergies doivent toujours être là
      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);
      expect(result.current.isFilteringEnabled).toBe(false);

      // Réactiver le filtrage
      act(() => {
        result.current.enableFiltering();
      });

      // Les allergies doivent toujours être là
      expect(result.current.userAllergies).toEqual(["citrus", "pollen"]);
      expect(result.current.isFilteringEnabled).toBe(true);
    });
  });
});
