import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollOnMobileFocus } from "./useScrollOnMobileFocus";

describe("useScrollOnMobileFocus", () => {
  beforeEach(() => {
    // Mock window.matchMedia pour useMediaQuery et useReducedMotion
    window.matchMedia = vi.fn();
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    // Mock window.scrollTo pour fallback
    window.scrollTo = vi.fn();
    // Utiliser fake timers pour tester le délai
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should detect mobile correctly (isMobile = true)", () => {
    // Mock matchMedia pour retourner mobile
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());

    expect(result.current.isMobile).toBe(true);
  });

  it("should not scroll on desktop (isMobile = false)", () => {
    // Mock matchMedia pour retourner desktop
    window.matchMedia.mockImplementation((query) => ({
      matches: false, // Pas mobile
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());
    const element = document.createElement("div");
    element.scrollIntoView = vi.fn();

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    // Avancer le temps
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(element.scrollIntoView).not.toHaveBeenCalled();
    expect(result.current.isMobile).toBe(false);
  });

  it("should scroll on mobile with 300ms delay", () => {
    // Mock matchMedia pour mobile, pas de reduced motion
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());
    const element = document.createElement("div");
    element.scrollIntoView = vi.fn();

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    // scrollIntoView ne doit PAS encore être appelé
    expect(element.scrollIntoView).not.toHaveBeenCalled();

    // Avancer le temps de 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Maintenant scrollIntoView doit être appelé
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("should respect prefers-reduced-motion (instant vs smooth)", () => {
    // Mock matchMedia pour mobile ET reduced motion
    window.matchMedia.mockImplementation((query) => {
      if (query === "(max-width: 1023px)") {
        return {
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        };
      }
      if (query === "(prefers-reduced-motion: reduce)") {
        return {
          matches: true, // Reduced motion activé
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        };
      }
      return {
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => useScrollOnMobileFocus());
    const element = document.createElement("div");
    element.scrollIntoView = vi.fn();

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Doit utiliser "instant" au lieu de "smooth"
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "instant",
      block: "start",
      inline: "nearest",
    });
  });

  it("should use custom options (behavior, block, delay)", () => {
    // Mock matchMedia pour mobile
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const customOptions = {
      behavior: "auto",
      block: "center",
      inline: "start",
      keyboardDelay: 500,
    };

    const { result } = renderHook(() => useScrollOnMobileFocus(customOptions));
    const element = document.createElement("div");
    element.scrollIntoView = vi.fn();

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    // Delay custom de 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "center",
      inline: "start",
    });
  });

  it("should handle null element without crash", () => {
    // Mock matchMedia pour mobile
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());

    // Ne doit pas crash avec null
    expect(() => {
      act(() => {
        result.current.handleScrollToContainer(null);
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });
    }).not.toThrow();
  });

  it("should fallback to window.scrollTo if scrollIntoView is unavailable", () => {
    // Mock matchMedia pour mobile
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());
    const element = document.createElement("div");

    // Supprimer scrollIntoView pour forcer le fallback
    element.scrollIntoView = undefined;

    // Mock getBoundingClientRect
    element.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }));

    // Mock window.pageYOffset
    Object.defineProperty(window, "pageYOffset", {
      value: 50,
      writable: true,
    });

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Doit utiliser window.scrollTo
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 130, // 100 (top) + 50 (pageYOffset) - 20 (offset)
      behavior: "smooth",
    });
  });

  it("should handle timeout correctly", () => {
    // Mock matchMedia pour mobile
    window.matchMedia.mockImplementation((query) => ({
      matches: query === "(max-width: 1023px)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useScrollOnMobileFocus());
    const element = document.createElement("div");
    element.scrollIntoView = vi.fn();

    act(() => {
      result.current.handleScrollToContainer(element);
    });

    // Pas encore appelé
    expect(element.scrollIntoView).not.toHaveBeenCalled();

    // Avancer de 100ms (pas assez)
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(element.scrollIntoView).not.toHaveBeenCalled();

    // Avancer de 200ms supplémentaires (total 300ms)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(element.scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
