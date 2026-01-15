import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import LeafFall from "./LeafFall";

vi.mock("../../../../features/settings/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

vi.mock("../../../../features/settings/context/PerformanceContext", () => ({
  usePerformance: vi.fn(() => ({
    isHighPerformance: true,
    performanceMode: "high",
  })),
}));

describe("LeafFall", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("should render the component", () => {
      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      const leafContainer = container.querySelector(
        ".pointer-events-none.absolute.inset-0",
      );
      expect(leafContainer).toBeInTheDocument();
    });

    it("should render falling leaves", () => {
      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      const leaves = container.querySelectorAll("svg");
      expect(leaves.length).toBeGreaterThan(0);
    });

    it("should have correct styling classes", () => {
      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      const leafContainer = container.firstChild;
      expect(leafContainer).toHaveClass("pointer-events-none");
      expect(leafContainer).toHaveClass("absolute");
      expect(leafContainer).toHaveClass("z-0");
    });
  });

  describe("Reduced Motion", () => {
    it("should render even when prefersReducedMotion is true (always-on by default)", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(true);

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      // Feature: LeafFall is always displayed by default
      // TODO: Will be controlled by user toggle button in future
      expect(container.firstChild).not.toBeNull();
    });

    it("should render when prefersReducedMotion is false", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(false);

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe("LocalStorage Override", () => {
    it("should render when force-leaffall is set to true even with prefersReducedMotion", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(true);

      localStorage.setItem("force-leaffall", "true");

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      expect(container.firstChild).not.toBeNull();
    });

    it("should render even when force-leaffall is false and prefersReducedMotion is true (always-on by default)", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(true);

      localStorage.setItem("force-leaffall", "false");

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      // Feature: LeafFall is always displayed by default
      // The localStorage override is stored but not currently used
      expect(container.firstChild).not.toBeNull();
    });

    it("should render even with prefersReducedMotion when force-leaffall is not set (always-on by default)", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(true);

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      // Feature: LeafFall is always displayed by default
      // TODO: Will respect prefersReducedMotion when toggle button is added
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe("Leaf Icons", () => {
    it("should render leaf icons with correct classes", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(false);

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      const leafIcon = container.querySelector("svg");
      expect(leafIcon).toBeInTheDocument();
      expect(leafIcon).toHaveClass("text-emerald-700/75");
      expect(leafIcon).toHaveClass("drop-shadow-lg");
    });

    it("should have dark mode classes", async () => {
      const { useReducedMotion } =
        await import("../../../../features/settings/hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(false);

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });
      const leafIcon = container.querySelector("svg");
      expect(leafIcon).toBeInTheDocument();
      expect(leafIcon).toHaveClass("dark:text-emerald-500/75");
    });
  });

  describe("Performance Mode", () => {
    it("should not render when performance mode is low", async () => {
      const { usePerformance } =
        await import("../../../../features/settings/context/PerformanceContext");
      usePerformance.mockReturnValue({
        isHighPerformance: false,
        performanceMode: "low",
      });

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });

      expect(container.firstChild).toBeNull();
    });

    it("should render when performance mode is high", async () => {
      const { usePerformance } =
        await import("../../../../features/settings/context/PerformanceContext");
      usePerformance.mockReturnValue({
        isHighPerformance: true,
        performanceMode: "high",
      });

      const { container } = render(<LeafFall />);
      act(() => {
        vi.runAllTimers();
      });

      expect(container.firstChild).not.toBeNull();
    });
  });
});
