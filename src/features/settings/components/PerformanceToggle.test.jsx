import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PerformanceToggle from "./PerformanceToggle";
import * as PerformanceContextModule from "../context/PerformanceContext";

describe("PerformanceToggle", () => {
  let mockTogglePerformance;

  beforeEach(() => {
    mockTogglePerformance = vi.fn();
  });

  it("should render toggle button", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button", {
      name: /basculer entre mode économie et performance élevée/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should display correct styles when in low performance mode", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");
    // Le bouton doit avoir les classes correspondant au mode économie
    expect(button).toHaveClass("justify-start");
    expect(button).toHaveClass("bg-white");
  });

  it("should display correct styles when in high performance mode", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: true,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");
    // Le bouton doit avoir les classes correspondant au mode performance élevée
    expect(button).toHaveClass("justify-end");
    expect(button).toHaveClass("bg-emerald-500");
  });

  it("should call togglePerformance when clicked", async () => {
    const user = userEvent.setup();

    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockTogglePerformance).toHaveBeenCalledTimes(1);
  });

  it("should have correct aria-label", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "aria-label",
      "Basculer entre mode économie et performance élevée",
    );
  });

  it("should apply hover styles", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("group");
  });

  it("should toggle multiple times", async () => {
    const user = userEvent.setup();

    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    render(<PerformanceToggle />);

    const button = screen.getByRole("button");

    // Premier clic
    await user.click(button);
    expect(mockTogglePerformance).toHaveBeenCalledTimes(1);

    // Deuxième clic
    await user.click(button);
    expect(mockTogglePerformance).toHaveBeenCalledTimes(2);

    // Troisième clic
    await user.click(button);
    expect(mockTogglePerformance).toHaveBeenCalledTimes(3);
  });

  it("should show glow effect when high performance is enabled", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: true,
      togglePerformance: mockTogglePerformance,
    });

    const { container } = render(<PerformanceToggle />);

    // Chercher l'élément de glow
    const glowElement = container.querySelector(".bg-emerald-500.opacity-30");
    expect(glowElement).toBeInTheDocument();
  });

  it("should not show glow effect when low performance is enabled", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    const { container } = render(<PerformanceToggle />);

    // Chercher l'élément de glow (opacity-0)
    const glowElement = container.querySelector(".opacity-0");
    expect(glowElement).toBeInTheDocument();
  });

  it("should render magic wand icon", () => {
    vi.spyOn(PerformanceContextModule, "usePerformance").mockReturnValue({
      isHighPerformance: false,
      togglePerformance: mockTogglePerformance,
    });

    const { container } = render(<PerformanceToggle />);

    // L'icône FaWandMagicSparkles est rendue comme SVG
    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
  });
});
