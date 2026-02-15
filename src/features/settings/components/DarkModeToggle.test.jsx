import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as AccessibilityContextModule from "../hooks/useAccessibility";
import * as ThemeContextModule from "../context/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

describe("DarkModeToggle", () => {
  let mockToggleDarkMode;

  beforeEach(() => {
    mockToggleDarkMode = vi.fn();

    // Mock useAccessibility pour tous les tests
    vi.spyOn(AccessibilityContextModule, "useAccessibility").mockReturnValue({
      isHighContrast: false,
      toggleHighContrast: vi.fn(),
      isExternalLinkConfirmEnabled: true,
      toggleExternalLinkConfirm: vi.fn(),
    });
  });

  it("should render toggle button", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button", {
      name: /activer le mode sombre/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should display moon icon when in light mode", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button");
    // Le bouton doit avoir les classes correspondant au mode clair
    expect(button).toHaveClass("justify-start");
    expect(button).toHaveClass(
      "bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700",
    );
  });

  it("should display sun icon when in dark mode", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button");
    // Le bouton doit avoir les classes correspondant au mode sombre
    expect(button).toHaveClass("justify-end");
    expect(button).toHaveClass("bg-emerald-500");
  });

  it("should call toggleDarkMode when clicked", async () => {
    const user = userEvent.setup();

    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it("should have correct aria-label", () => {
    // Test mode clair → label "Activer le mode sombre"
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    const { rerender } = render(<DarkModeToggle />);

    let button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Activer le mode sombre");
    expect(button).toHaveAttribute("aria-pressed", "false");

    // Test mode sombre → label "Désactiver le mode sombre"
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    rerender(<DarkModeToggle />);

    button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Désactiver le mode sombre");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("should apply hover styles", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("group");
  });

  it("should toggle multiple times", async () => {
    const user = userEvent.setup();

    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByRole("button");

    // Premier clic
    await user.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);

    // Deuxième clic
    await user.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(2);

    // Troisième clic
    await user.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(3);
  });

  it("should show glow effect when dark mode is enabled", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    const { container } = render(<DarkModeToggle />);

    // Chercher l'élément de glow
    const glowElement = container.querySelector(".bg-emerald-500.opacity-30");
    expect(glowElement).toBeInTheDocument();
  });

  it("should not show glow effect when light mode is enabled", () => {
    vi.spyOn(ThemeContextModule, "useTheme").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });

    const { container } = render(<DarkModeToggle />);

    // Chercher l'élément de glow
    const glowElement = container.querySelector(".opacity-0");
    expect(glowElement).toBeInTheDocument();
  });
});
