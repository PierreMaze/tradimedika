// hooks/useSymptomTags.test.js
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSymptomTags } from "./useSymptomTags";

describe("useSymptomTags", () => {
  describe("Initialization", () => {
    it("should initialize with empty array", () => {
      const { result } = renderHook(() => useSymptomTags());

      expect(result.current.selectedSymptoms).toEqual([]);
      expect(result.current.isAtLimit).toBe(false);
    });
  });

  describe("addSymptom", () => {
    it("should add a symptom to the list", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);
    });

    it("should add multiple symptoms separately", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });
      act(() => {
        result.current.addSymptom("stress");
      });
      act(() => {
        result.current.addSymptom("insomnie");
      });

      expect(result.current.selectedSymptoms).toContain("fatigue");
      expect(result.current.selectedSymptoms).toContain("stress");
      expect(result.current.selectedSymptoms).toContain("insomnie");
      expect(result.current.selectedSymptoms).toHaveLength(3);
    });

    it("should normalize symptom for display (lowercase with accents)", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("NAUSÉE");
      });

      expect(result.current.selectedSymptoms).toEqual(["nausée"]);
    });

    it("should trim whitespace from symptom", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("  fatigue  ");
      });

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);
    });
  });

  describe("Duplicate detection", () => {
    it("should not add duplicate symptoms (exact match)", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });
      act(() => {
        result.current.addSymptom("fatigue");
      });

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);
      expect(result.current.selectedSymptoms).toHaveLength(1);
    });

    it("should detect duplicates regardless of case", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });
      act(() => {
        result.current.addSymptom("FATIGUE");
      });
      act(() => {
        result.current.addSymptom("Fatigue");
      });

      expect(result.current.selectedSymptoms).toHaveLength(1);
    });
  });

  describe("Symptom limit", () => {
    it("should allow adding up to 5 symptoms", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });
      act(() => {
        result.current.addSymptom("stress");
      });
      act(() => {
        result.current.addSymptom("insomnie");
      });
      act(() => {
        result.current.addSymptom("anxiété");
      });
      act(() => {
        result.current.addSymptom("nausée");
      });

      expect(result.current.selectedSymptoms).toHaveLength(5);
      expect(result.current.isAtLimit).toBe(true);
    });

    it("should not add more than 5 symptoms", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("symptom1");
      });
      act(() => {
        result.current.addSymptom("symptom2");
      });
      act(() => {
        result.current.addSymptom("symptom3");
      });
      act(() => {
        result.current.addSymptom("symptom4");
      });
      act(() => {
        result.current.addSymptom("symptom5");
      });
      act(() => {
        result.current.addSymptom("symptom6"); // 6ème, devrait être ignoré
      });

      expect(result.current.selectedSymptoms).toHaveLength(5);
      expect(result.current.selectedSymptoms).not.toContain("symptom6");
    });

    it("should update isAtLimit correctly", () => {
      const { result } = renderHook(() => useSymptomTags());

      expect(result.current.isAtLimit).toBe(false);

      act(() => {
        result.current.addSymptom("symptom1");
      });
      act(() => {
        result.current.addSymptom("symptom2");
      });
      act(() => {
        result.current.addSymptom("symptom3");
      });
      act(() => {
        result.current.addSymptom("symptom4");
      });

      expect(result.current.isAtLimit).toBe(false);

      act(() => {
        result.current.addSymptom("symptom5");
      });

      expect(result.current.isAtLimit).toBe(true);
    });
  });

  describe("removeSymptom", () => {
    it("should remove a symptom from the list", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });
      act(() => {
        result.current.addSymptom("stress");
      });

      expect(result.current.selectedSymptoms).toHaveLength(2);

      act(() => {
        result.current.removeSymptom("fatigue");
      });

      expect(result.current.selectedSymptoms).toEqual(["stress"]);
      expect(result.current.selectedSymptoms).toHaveLength(1);
    });

    it("should update isAtLimit after removing symptom", () => {
      const { result } = renderHook(() => useSymptomTags());

      // Ajouter 5 symptômes
      act(() => {
        result.current.addSymptom("s1");
      });
      act(() => {
        result.current.addSymptom("s2");
      });
      act(() => {
        result.current.addSymptom("s3");
      });
      act(() => {
        result.current.addSymptom("s4");
      });
      act(() => {
        result.current.addSymptom("s5");
      });

      expect(result.current.isAtLimit).toBe(true);

      act(() => {
        result.current.removeSymptom("s5");
      });

      expect(result.current.isAtLimit).toBe(false);
      expect(result.current.selectedSymptoms).toHaveLength(4);
    });

    it("should handle removing non-existent symptom gracefully", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("fatigue");
      });

      act(() => {
        result.current.removeSymptom("stress"); // N'existe pas
      });

      expect(result.current.selectedSymptoms).toEqual(["fatigue"]);
    });
  });

  describe("French characters", () => {
    it("should handle French accents correctly", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("nausée");
      });
      act(() => {
        result.current.addSymptom("anxiété");
      });

      expect(result.current.selectedSymptoms).toContain("nausée");
      expect(result.current.selectedSymptoms).toContain("anxiété");
    });

    it("should handle apostrophes", () => {
      const { result } = renderHook(() => useSymptomTags());

      act(() => {
        result.current.addSymptom("perte d'appétit");
      });

      expect(result.current.selectedSymptoms).toEqual(["perte d'appétit"]);
    });
  });

  describe("Complete workflow", () => {
    it("should allow adding symptom after removing when at limit", () => {
      const { result } = renderHook(() => useSymptomTags());

      // Remplir jusqu'à la limite
      act(() => result.current.addSymptom("s1"));
      act(() => result.current.addSymptom("s2"));
      act(() => result.current.addSymptom("s3"));
      act(() => result.current.addSymptom("s4"));
      act(() => result.current.addSymptom("s5"));

      expect(result.current.isAtLimit).toBe(true);

      // Tenter d'ajouter un 6ème (devrait échouer)
      act(() => result.current.addSymptom("s6"));
      expect(result.current.selectedSymptoms).toHaveLength(5);

      // Retirer un symptôme
      act(() => result.current.removeSymptom("s1"));
      expect(result.current.isAtLimit).toBe(false);

      // Maintenant on peut ajouter à nouveau
      act(() => result.current.addSymptom("s6"));
      expect(result.current.selectedSymptoms).toContain("s6");
      expect(result.current.selectedSymptoms).toHaveLength(5);
    });
  });
});
