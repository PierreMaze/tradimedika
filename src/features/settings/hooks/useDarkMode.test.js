import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import * as useMediaQueryModule from "../../../hooks/useMediaQuery.js";
import * as useLocalStorageModule from "../../../hooks/useLocalStorage";
import { useDarkMode } from "./useDarkMode.js";

describe("useDarkMode", () => {
  let mockSetStoredTheme;

  beforeEach(() => {
    mockSetStoredTheme = vi.fn();

    // Mock useMediaQuery - default to light mode preference
    vi.spyOn(useMediaQueryModule, "useMediaQuery").mockReturnValue(false);

    // Mock useLocalStorage - default to no stored value
    vi.spyOn(useLocalStorageModule, "useLocalStorage").mockReturnValue([
      null,
      mockSetStoredTheme,
    ]);

    // Mock document.documentElement
    document.documentElement.classList.add = vi.fn();
    document.documentElement.classList.remove = vi.fn();
    document.documentElement.setAttribute = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Initial state", () => {
    it("should default to light mode when no stored value and system prefers light", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false); // System prefers light
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        null,
        mockSetStoredTheme,
      ]); // No stored value

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(false);
    });

    it("should default to dark mode when no stored value and system prefers dark", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(true); // System prefers dark
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        null,
        mockSetStoredTheme,
      ]); // No stored value

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(true);
    });

    it("should use stored value 'dark' over system preference", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false); // System prefers light
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "dark",
        mockSetStoredTheme,
      ]); // Stored: dark

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(true);
    });

    it("should use stored value 'light' over system preference", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(true); // System prefers dark
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "light",
        mockSetStoredTheme,
      ]); // Stored: light

      const { result } = renderHook(() => useDarkMode());

      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe("DOM manipulation", () => {
    it("should add 'dark' class when isDarkMode is true", async () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "dark",
        mockSetStoredTheme,
      ]);

      renderHook(() => useDarkMode());

      await waitFor(() => {
        expect(document.documentElement.classList.add).toHaveBeenCalledWith(
          "dark",
        );
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          "data-theme",
          "dark",
        );
      });
    });

    it("should remove 'dark' class when isDarkMode is false", async () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "light",
        mockSetStoredTheme,
      ]);

      renderHook(() => useDarkMode());

      await waitFor(() => {
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
          "dark",
        );
        expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
          "data-theme",
          "light",
        );
      });
    });
  });

  describe("toggleDarkMode", () => {
    it("should toggle from light to dark", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "light",
        mockSetStoredTheme,
      ]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.toggleDarkMode();
      });

      // Should call setStoredTheme with a function
      expect(mockSetStoredTheme).toHaveBeenCalledWith(expect.any(Function));

      // Simulate the function being called with prev value
      const setterFunction = mockSetStoredTheme.mock.calls[0][0];
      const newValue = setterFunction("light");
      expect(newValue).toBe("dark");
    });

    it("should toggle from dark to light", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "dark",
        mockSetStoredTheme,
      ]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(mockSetStoredTheme).toHaveBeenCalledWith(expect.any(Function));

      const setterFunction = mockSetStoredTheme.mock.calls[0][0];
      const newValue = setterFunction("dark");
      expect(newValue).toBe("light");
    });

    it("should toggle from system preference (dark) to light", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(true); // System dark
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        null,
        mockSetStoredTheme,
      ]); // No stored value

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(mockSetStoredTheme).toHaveBeenCalledWith(expect.any(Function));

      const setterFunction = mockSetStoredTheme.mock.calls[0][0];
      const newValue = setterFunction(null);
      expect(newValue).toBe("light");
    });
  });

  describe("enableDark", () => {
    it("should set theme to dark", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "light",
        mockSetStoredTheme,
      ]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.enableDark();
      });

      expect(mockSetStoredTheme).toHaveBeenCalledWith("dark");
    });
  });

  describe("disableDark", () => {
    it("should set theme to light", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        "dark",
        mockSetStoredTheme,
      ]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.disableDark();
      });

      expect(mockSetStoredTheme).toHaveBeenCalledWith("light");
    });
  });

  describe("Return values", () => {
    it("should return all required functions and state", () => {
      useMediaQueryModule.useMediaQuery.mockReturnValue(false);
      useLocalStorageModule.useLocalStorage.mockReturnValue([
        null,
        mockSetStoredTheme,
      ]);

      const { result } = renderHook(() => useDarkMode());

      expect(result.current).toHaveProperty("isDarkMode");
      expect(result.current).toHaveProperty("toggleDarkMode");
      expect(result.current).toHaveProperty("enableDark");
      expect(result.current).toHaveProperty("disableDark");

      expect(typeof result.current.isDarkMode).toBe("boolean");
      expect(typeof result.current.toggleDarkMode).toBe("function");
      expect(typeof result.current.enableDark).toBe("function");
      expect(typeof result.current.disableDark).toBe("function");
    });
  });
});
