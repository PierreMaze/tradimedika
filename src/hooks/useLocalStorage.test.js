// hooks/useLocalStorage.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    window.localStorage.clear();
    // Réinitialiser tous les mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Initialization", () => {
    it("should return initial value when localStorage is empty", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      expect(result.current[0]).toBe("initial");
    });

    it("should return value from localStorage when it exists", () => {
      window.localStorage.setItem("test-key", JSON.stringify("stored"));

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      expect(result.current[0]).toBe("stored");
    });

    it("should handle objects as initial value", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", { count: 0 }),
      );

      expect(result.current[0]).toEqual({ count: 0 });
    });

    it("should handle arrays as initial value", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", [1, 2, 3]),
      );

      expect(result.current[0]).toEqual([1, 2, 3]);
    });

    it("should handle null as initial value", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", null));

      expect(result.current[0]).toBeNull();
    });

    it("should handle boolean as initial value", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", true));

      expect(result.current[0]).toBe(true);
    });

    it("should handle number as initial value", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", 42));

      expect(result.current[0]).toBe(42);
    });
  });

  describe("setValue", () => {
    it("should update state and localStorage with new value", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        result.current[1]("updated");
      });

      expect(result.current[0]).toBe("updated");
      expect(window.localStorage.getItem("test-key")).toBe(
        JSON.stringify("updated"),
      );
    });

    it("should handle function updater (like useState)", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", 0));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);
      expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify(1));
    });

    it("should update object value", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", { count: 0 }),
      );

      act(() => {
        result.current[1]({ count: 5 });
      });

      expect(result.current[0]).toEqual({ count: 5 });
      expect(window.localStorage.getItem("test-key")).toBe(
        JSON.stringify({ count: 5 }),
      );
    });

    it("should update array value", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", []));

      act(() => {
        result.current[1]([1, 2, 3]);
      });

      expect(result.current[0]).toEqual([1, 2, 3]);
      expect(window.localStorage.getItem("test-key")).toBe(
        JSON.stringify([1, 2, 3]),
      );
    });

    it("should handle multiple updates", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", 0));

      act(() => {
        result.current[1](1);
      });
      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1](2);
      });
      expect(result.current[0]).toBe(2);

      act(() => {
        result.current[1]((prev) => prev + 3);
      });
      expect(result.current[0]).toBe(5);
    });
  });

  describe("Error handling", () => {
    it("should return initial value when localStorage.getItem throws", () => {
      vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
        throw new Error("localStorage error");
      });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "fallback"),
      );

      expect(result.current[0]).toBe("fallback");
    });

    it("should return initial value when JSON.parse fails", () => {
      window.localStorage.setItem("test-key", "invalid-json{");

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "fallback"),
      );

      expect(result.current[0]).toBe("fallback");
    });

    it("should handle localStorage.setItem errors gracefully", () => {
      vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        result.current[1]("new value");
      });

      // L'état devrait être mis à jour même si localStorage échoue
      expect(result.current[0]).toBe("new value");
    });
  });

  describe("Different keys", () => {
    it("should handle multiple instances with different keys", () => {
      const { result: result1 } = renderHook(() =>
        useLocalStorage("key1", "value1"),
      );
      const { result: result2 } = renderHook(() =>
        useLocalStorage("key2", "value2"),
      );

      expect(result1.current[0]).toBe("value1");
      expect(result2.current[0]).toBe("value2");

      act(() => {
        result1.current[1]("updated1");
      });

      expect(result1.current[0]).toBe("updated1");
      expect(result2.current[0]).toBe("value2");
    });

    it("should sync same key across different hook instances", () => {
      window.localStorage.setItem("shared-key", JSON.stringify("shared"));

      const { result: result1 } = renderHook(() =>
        useLocalStorage("shared-key", "initial"),
      );
      const { result: result2 } = renderHook(() =>
        useLocalStorage("shared-key", "initial"),
      );

      expect(result1.current[0]).toBe("shared");
      expect(result2.current[0]).toBe("shared");
    });
  });

  describe("Complex data types", () => {
    it("should handle nested objects", () => {
      const complexObj = {
        user: {
          name: "Test",
          settings: {
            theme: "dark",
            notifications: true,
          },
        },
      };

      const { result } = renderHook(() =>
        useLocalStorage("test-key", complexObj),
      );

      expect(result.current[0]).toEqual(complexObj);

      act(() => {
        result.current[1]({
          ...complexObj,
          user: { ...complexObj.user, name: "Updated" },
        });
      });

      expect(result.current[0].user.name).toBe("Updated");
    });

    it("should handle arrays of objects", () => {
      const symptoms = [
        { id: 1, name: "fatigue" },
        { id: 2, name: "stress" },
      ];

      const { result } = renderHook(() =>
        useLocalStorage("symptoms", symptoms),
      );

      expect(result.current[0]).toEqual(symptoms);

      act(() => {
        result.current[1]([...symptoms, { id: 3, name: "insomnie" }]);
      });

      expect(result.current[0]).toHaveLength(3);
    });
  });
});
