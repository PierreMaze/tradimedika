// hooks/useReducedMotion.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  let matchMediaMock;

  beforeEach(() => {
    // Mock window.matchMedia
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return false when prefers-reduced-motion is not set", () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return true when prefers-reduced-motion is set to reduce", () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should update when media query changes", () => {
    let changeHandler;
    const addEventListener = vi.fn((event, handler) => {
      changeHandler = handler;
    });
    const removeEventListener = vi.fn();

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener,
    });

    const { result, rerender } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simuler changement de préférence
    if (changeHandler) {
      changeHandler({ matches: true });
    }

    rerender();

    expect(result.current).toBe(true);
  });

  it("should handle browsers without matchMedia support", () => {
    // Simuler navigateur sans support matchMedia
    window.matchMedia = undefined;

    const { result } = renderHook(() => useReducedMotion());

    // Devrait retourner false par défaut
    expect(result.current).toBe(false);
  });

  it("should cleanup event listener on unmount", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener,
    });

    const { unmount } = renderHook(() => useReducedMotion());

    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("should use addListener fallback for older browsers", () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();

    matchMediaMock.mockReturnValue({
      matches: false,
      // Pas de addEventListener (ancien navigateur)
      addEventListener: undefined,
      addListener,
      removeListener,
    });

    const { unmount } = renderHook(() => useReducedMotion());

    expect(addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();

    expect(removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
