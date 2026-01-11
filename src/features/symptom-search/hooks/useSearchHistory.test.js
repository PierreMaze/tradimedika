// hooks/useSearchHistory.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchHistory } from "./useSearchHistory";

describe("useSearchHistory", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with empty history", () => {
      const { result } = renderHook(() => useSearchHistory());

      expect(result.current.history).toEqual([]);
    });

    it("should load existing history from localStorage", () => {
      const existingHistory = [
        {
          id: "123-abc",
          symptoms: ["fatigue", "stress"],
          timestamp: 1735123456789,
          resultCount: 3,
        },
      ];

      window.localStorage.setItem(
        "tradimedika-search-history",
        JSON.stringify(existingHistory),
      );

      const { result } = renderHook(() => useSearchHistory());

      expect(result.current.history).toEqual(existingHistory);
    });

    it("should filter out invalid entries from localStorage", () => {
      const invalidHistory = [
        {
          id: "valid-123",
          symptoms: ["fatigue"],
          timestamp: 1735123456789,
        },
        { id: "missing-symptoms" }, // Invalid: no symptoms
        { symptoms: ["stress"] }, // Invalid: no id
        null, // Invalid: null
        "invalid", // Invalid: string
      ];

      window.localStorage.setItem(
        "tradimedika-search-history",
        JSON.stringify(invalidHistory),
      );

      const { result } = renderHook(() => useSearchHistory());

      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].id).toBe("valid-123");
    });
  });

  describe("addSearch", () => {
    it("should add a new search to history", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue", "stress"], 5);
      });

      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]).toMatchObject({
        symptoms: ["fatigue", "stress"],
        resultCount: 5,
      });
      expect(result.current.history[0].id).toBeDefined();
      expect(result.current.history[0].timestamp).toBeDefined();
    });

    it("should add multiple searches in chronological order (newest first)", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      const firstTimestamp = result.current.history[0].timestamp;

      // Simuler un délai minimal pour garantir un timestamp différent
      vi.useFakeTimers();
      act(() => {
        vi.advanceTimersByTime(1);
        result.current.addSearch(["stress"], 2);
      });
      vi.useRealTimers();

      expect(result.current.history).toHaveLength(2);
      expect(result.current.history[0].symptoms).toEqual(["stress"]);
      expect(result.current.history[1].symptoms).toEqual(["fatigue"]);
      expect(result.current.history[0].timestamp).toBeGreaterThanOrEqual(
        firstTimestamp,
      );
    });

    it("should deduplicate and move existing search to top", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      act(() => {
        result.current.addSearch(["stress"], 2);
      });

      act(() => {
        result.current.addSearch(["insomnie"], 1);
      });

      expect(result.current.history).toHaveLength(3);
      expect(result.current.history[0].symptoms).toEqual(["insomnie"]);

      // Ajouter à nouveau "fatigue" (déjà en position 2)
      act(() => {
        result.current.addSearch(["fatigue"], 5);
      });

      expect(result.current.history).toHaveLength(3);
      expect(result.current.history[0].symptoms).toEqual(["fatigue"]);
      expect(result.current.history[0].resultCount).toBe(5); // Updated result count
    });

    it("should detect duplicates regardless of symptom order", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue", "stress", "insomnie"], 5);
      });

      expect(result.current.history).toHaveLength(1);

      // Ajouter les mêmes symptômes dans un ordre différent
      act(() => {
        result.current.addSearch(["stress", "insomnie", "fatigue"], 3);
      });

      // Devrait être dédupliqué (toujours 1 entrée)
      // Les symptômes gardent l'ordre de la première entrée
      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].symptoms).toEqual([
        "fatigue",
        "stress",
        "insomnie",
      ]);
      expect(result.current.history[0].resultCount).toBe(3); // Updated result count
    });

    it("should detect duplicates ignoring accents", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["diarrhée", "fièvre"], 2);
      });

      expect(result.current.history).toHaveLength(1);

      // Ajouter sans accents (devrait être détecté comme doublon)
      act(() => {
        result.current.addSearch(["diarrhee", "fievre"], 4);
      });

      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].resultCount).toBe(4);
    });

    it("should limit history to 10 entries (FIFO)", () => {
      const { result } = renderHook(() => useSearchHistory());

      // Ajouter 11 recherches différentes
      act(() => {
        result.current.addSearch(["symptom1"], 1);
      });
      act(() => {
        result.current.addSearch(["symptom2"], 2);
      });
      act(() => {
        result.current.addSearch(["symptom3"], 3);
      });
      act(() => {
        result.current.addSearch(["symptom4"], 4);
      });
      act(() => {
        result.current.addSearch(["symptom5"], 5);
      });
      act(() => {
        result.current.addSearch(["symptom6"], 6);
      });
      act(() => {
        result.current.addSearch(["symptom7"], 7);
      });
      act(() => {
        result.current.addSearch(["symptom8"], 8);
      });
      act(() => {
        result.current.addSearch(["symptom9"], 9);
      });
      act(() => {
        result.current.addSearch(["symptom10"], 10);
      });
      act(() => {
        result.current.addSearch(["symptom11"], 11);
      });

      expect(result.current.history).toHaveLength(10);
      expect(result.current.history[0].symptoms).toEqual(["symptom11"]);
      expect(result.current.history[9].symptoms).toEqual(["symptom2"]);
      // "symptom1" devrait avoir été supprimé (FIFO)
    });

    it("should handle resultCount as optional", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"]);
      });

      expect(result.current.history[0].resultCount).toBe(0);
    });

    it("should clone symptoms array to avoid mutation", () => {
      const { result } = renderHook(() => useSearchHistory());

      const symptoms = ["fatigue", "stress"];
      act(() => {
        result.current.addSearch(symptoms, 3);
      });

      // Modifier l'array original ne devrait pas affecter l'historique
      symptoms.push("insomnie");

      expect(result.current.history[0].symptoms).toEqual(["fatigue", "stress"]);
    });

    it("should ignore empty array", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch([], 0);
      });

      expect(result.current.history).toHaveLength(0);
    });

    it("should ignore non-array symptoms", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch("fatigue", 1);
      });

      expect(result.current.history).toHaveLength(0);

      act(() => {
        result.current.addSearch(null, 1);
      });

      expect(result.current.history).toHaveLength(0);

      act(() => {
        result.current.addSearch(undefined, 1);
      });

      expect(result.current.history).toHaveLength(0);
    });
  });

  describe("removeSearch", () => {
    it("should remove a search by id", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });
      act(() => {
        result.current.addSearch(["stress"], 2);
      });
      act(() => {
        result.current.addSearch(["insomnie"], 1);
      });

      expect(result.current.history).toHaveLength(3);

      const idToRemove = result.current.history[1].id; // "stress"

      act(() => {
        result.current.removeSearch(idToRemove);
      });

      expect(result.current.history).toHaveLength(2);
      expect(
        result.current.history.find((e) => e.id === idToRemove),
      ).toBeUndefined();
    });

    it("should handle removing non-existent id gracefully", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      expect(result.current.history).toHaveLength(1);

      act(() => {
        result.current.removeSearch("non-existent-id");
      });

      expect(result.current.history).toHaveLength(1);
    });

    it("should ignore non-string id", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      expect(result.current.history).toHaveLength(1);

      act(() => {
        result.current.removeSearch(null);
      });

      expect(result.current.history).toHaveLength(1);

      act(() => {
        result.current.removeSearch(123);
      });

      expect(result.current.history).toHaveLength(1);
    });
  });

  describe("clearHistory", () => {
    it("should clear all history", async () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });
      act(() => {
        result.current.addSearch(["stress"], 2);
      });
      act(() => {
        result.current.addSearch(["insomnie"], 1);
      });

      expect(result.current.history).toHaveLength(3);

      act(() => {
        result.current.clearHistory();
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      expect(result.current.history).toEqual([]);
      expect(window.localStorage.getItem("tradimedika-search-history")).toBe(
        JSON.stringify([]),
      );
    });

    it("should work when history is already empty", () => {
      const { result } = renderHook(() => useSearchHistory());

      expect(result.current.history).toEqual([]);

      act(() => {
        result.current.clearHistory();
      });

      expect(result.current.history).toEqual([]);
    });
  });

  describe("Integration with localStorage", () => {
    it("should persist history to localStorage on add", async () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue", "stress"], 5);
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = JSON.parse(
        window.localStorage.getItem("tradimedika-search-history"),
      );

      expect(stored).toHaveLength(1);
      expect(stored[0].symptoms).toEqual(["fatigue", "stress"]);
    });

    it("should persist history to localStorage on remove", async () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });
      act(() => {
        result.current.addSearch(["stress"], 2);
      });

      const idToRemove = result.current.history[1].id;

      act(() => {
        result.current.removeSearch(idToRemove);
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = JSON.parse(
        window.localStorage.getItem("tradimedika-search-history"),
      );

      expect(stored).toHaveLength(1);
    });

    it("should sync across multiple hook instances", () => {
      window.localStorage.setItem(
        "tradimedika-search-history",
        JSON.stringify([
          {
            id: "existing-123",
            symptoms: ["fatigue"],
            timestamp: 1735123456789,
            resultCount: 2,
          },
        ]),
      );

      const { result: result1 } = renderHook(() => useSearchHistory());
      const { result: result2 } = renderHook(() => useSearchHistory());

      expect(result1.current.history).toEqual(result2.current.history);
      expect(result1.current.history).toHaveLength(1);
    });
  });

  describe("Error handling", () => {
    it("should handle localStorage errors gracefully", () => {
      vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      // L'historique en mémoire devrait être mis à jour même si localStorage échoue
      expect(result.current.history).toHaveLength(1);
    });

    it("should recover from corrupted localStorage data", () => {
      window.localStorage.setItem(
        "tradimedika-search-history",
        "invalid-json{",
      );

      const { result } = renderHook(() => useSearchHistory());

      expect(result.current.history).toEqual([]);

      // Devrait pouvoir ajouter de nouvelles recherches après récupération
      act(() => {
        result.current.addSearch(["fatigue"], 3);
      });

      expect(result.current.history).toHaveLength(1);
    });
  });

  describe("Edge cases", () => {
    it("should handle symptoms with special characters", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["mal de tête", "diarrhée"], 2);
      });

      expect(result.current.history[0].symptoms).toEqual([
        "mal de tête",
        "diarrhée",
      ]);
    });

    it("should handle very long symptom arrays", () => {
      const { result } = renderHook(() => useSearchHistory());

      const manySymptoms = Array.from({ length: 100 }, (_, i) => `symptom${i}`);

      act(() => {
        result.current.addSearch(manySymptoms, 10);
      });

      expect(result.current.history[0].symptoms).toEqual(manySymptoms);
    });

    it("should generate unique IDs for each entry", () => {
      const { result } = renderHook(() => useSearchHistory());

      act(() => {
        result.current.addSearch(["symptom1"], 1);
      });
      act(() => {
        result.current.addSearch(["symptom2"], 2);
      });
      act(() => {
        result.current.addSearch(["symptom3"], 3);
      });

      const ids = result.current.history.map((entry) => entry.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(3); // All IDs should be unique
    });
  });
});
