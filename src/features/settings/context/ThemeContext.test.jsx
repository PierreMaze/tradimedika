import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import * as useDarkModeModule from "../hooks/useDarkMode.js";

// Test component that uses useTheme
function TestComponent() {
  const { isDarkMode, toggleDarkMode, enableDark, disableDark } = useTheme();

  return (
    <div>
      <p data-testid="dark-mode">{isDarkMode ? "dark" : "light"}</p>
      <button onClick={toggleDarkMode} data-testid="toggle-btn">
        Toggle
      </button>
      <button onClick={enableDark} data-testid="enable-dark-btn">
        Enable Dark
      </button>
      <button onClick={disableDark} data-testid="disable-dark-btn">
        Disable Dark
      </button>
    </div>
  );
}

describe("ThemeContext", () => {
  let mockToggleDarkMode;
  let mockEnableDark;
  let mockDisableDark;

  beforeEach(() => {
    mockToggleDarkMode = vi.fn();
    mockEnableDark = vi.fn();
    mockDisableDark = vi.fn();

    // Mock useDarkMode hook
    vi.spyOn(useDarkModeModule, "useDarkMode").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
      enableDark: mockEnableDark,
      disableDark: mockDisableDark,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ThemeProvider", () => {
    it("should render children", () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Child Content</div>
        </ThemeProvider>,
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Child Content")).toBeInTheDocument();
    });

    it("should provide theme context to children", () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("dark-mode")).toHaveTextContent("light");
    });

    it("should provide dark mode state when isDarkMode is true", () => {
      useDarkModeModule.useDarkMode.mockReturnValue({
        isDarkMode: true,
        toggleDarkMode: mockToggleDarkMode,
        enableDark: mockEnableDark,
        disableDark: mockDisableDark,
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("dark-mode")).toHaveTextContent("dark");
    });
  });

  describe("useTheme hook", () => {
    it("should throw error when used outside ThemeProvider", () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow("useTheme must be used within ThemeProvider");

      console.error = originalError;
    });

    it("should return theme context when used inside ThemeProvider", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current).toHaveProperty("isDarkMode");
      expect(result.current).toHaveProperty("toggleDarkMode");
      expect(result.current).toHaveProperty("enableDark");
      expect(result.current).toHaveProperty("disableDark");
    });

    it("should return correct isDarkMode value", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.isDarkMode).toBe(false);
    });

    it("should call toggleDarkMode when toggle function is invoked", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it("should call enableDark when enable function is invoked", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.enableDark();
      });

      expect(mockEnableDark).toHaveBeenCalledTimes(1);
    });

    it("should call disableDark when disable function is invoked", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.disableDark();
      });

      expect(mockDisableDark).toHaveBeenCalledTimes(1);
    });
  });

  describe("Context value memoization", () => {
    it("should memoize context value to prevent unnecessary re-renders", () => {
      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result, rerender } = renderHook(() => useTheme(), { wrapper });

      const firstValue = result.current;

      // Force rerender
      rerender();

      // Context value should be the same reference if nothing changed
      expect(result.current).toBe(firstValue);
    });

    it("should update context value when dark mode changes", () => {
      useDarkModeModule.useDarkMode.mockReturnValue({
        isDarkMode: false,
        toggleDarkMode: mockToggleDarkMode,
        enableDark: mockEnableDark,
        disableDark: mockDisableDark,
      });

      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result, rerender } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.isDarkMode).toBe(false);

      // Change dark mode
      useDarkModeModule.useDarkMode.mockReturnValue({
        isDarkMode: true,
        toggleDarkMode: mockToggleDarkMode,
        enableDark: mockEnableDark,
        disableDark: mockDisableDark,
      });

      rerender();

      expect(result.current.isDarkMode).toBe(true);
    });
  });

  describe("Integration with useDarkMode", () => {
    it("should call useDarkMode on mount", () => {
      render(
        <ThemeProvider>
          <div>Test</div>
        </ThemeProvider>,
      );

      expect(useDarkModeModule.useDarkMode).toHaveBeenCalled();
    });

    it("should pass through all useDarkMode return values", () => {
      const mockValues = {
        isDarkMode: true,
        toggleDarkMode: vi.fn(),
        enableDark: vi.fn(),
        disableDark: vi.fn(),
      };

      useDarkModeModule.useDarkMode.mockReturnValue(mockValues);

      const wrapper = ({ children }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.isDarkMode).toBe(mockValues.isDarkMode);
      expect(result.current.toggleDarkMode).toBe(mockValues.toggleDarkMode);
      expect(result.current.enableDark).toBe(mockValues.enableDark);
      expect(result.current.disableDark).toBe(mockValues.disableDark);
    });
  });
});
