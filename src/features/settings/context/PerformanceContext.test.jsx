import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PerformanceProvider, usePerformance } from "./PerformanceContext";

describe("PerformanceContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("usePerformance hook", () => {
    it("should throw error when used outside PerformanceProvider", () => {
      expect(() => renderHook(() => usePerformance())).toThrow(
        "usePerformance must be used within PerformanceProvider",
      );
    });

    it("should provide default high performance mode", () => {
      const wrapper = ({ children }) => (
        <PerformanceProvider>{children}</PerformanceProvider>
      );

      const { result } = renderHook(() => usePerformance(), { wrapper });

      expect(result.current.performanceMode).toBe("high");
      expect(result.current.isHighPerformance).toBe(true);
    });

    it("should toggle between high and low performance", () => {
      const wrapper = ({ children }) => (
        <PerformanceProvider>{children}</PerformanceProvider>
      );

      const { result } = renderHook(() => usePerformance(), { wrapper });

      act(() => {
        result.current.togglePerformance();
      });

      expect(result.current.performanceMode).toBe("low");
      expect(result.current.isHighPerformance).toBe(false);

      act(() => {
        result.current.togglePerformance();
      });

      expect(result.current.performanceMode).toBe("high");
      expect(result.current.isHighPerformance).toBe(true);
    });

    it("should persist performance mode in localStorage", async () => {
      const wrapper = ({ children }) => (
        <PerformanceProvider>{children}</PerformanceProvider>
      );

      const { result } = renderHook(() => usePerformance(), { wrapper });

      act(() => {
        result.current.togglePerformance();
      });

      // Attendre que la microtask s'exécute
      await new Promise((resolve) => queueMicrotask(resolve));

      const stored = window.localStorage.getItem("tradimedika-performance");
      expect(JSON.parse(stored)).toBe("low");
    });

    it("should load performance mode from localStorage", () => {
      window.localStorage.setItem(
        "tradimedika-performance",
        JSON.stringify("low"),
      );

      const wrapper = ({ children }) => (
        <PerformanceProvider>{children}</PerformanceProvider>
      );

      const { result } = renderHook(() => usePerformance(), { wrapper });

      expect(result.current.performanceMode).toBe("low");
      expect(result.current.isHighPerformance).toBe(false);
    });
  });
});
