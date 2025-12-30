import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Disclaimer from "./Disclaimer";

vi.mock("../../hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe("Disclaimer", () => {
  describe("Rendering", () => {
    it("should render the disclaimer message", () => {
      render(<Disclaimer />);
      expect(
        screen.getByText(/Les informations présentées/i),
      ).toBeInTheDocument();
    });

    it("should render the warning icon", () => {
      const { container } = render(<Disclaimer />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should render medical disclaimer warning", () => {
      render(<Disclaimer />);
      expect(
        screen.getByText(/ne remplacent pas un avis médical professionnel/i),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Disclaimer className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<Disclaimer />);
      const disclaimer = container.firstChild;
      expect(disclaimer).toHaveClass("bg-emerald-50");
      expect(disclaimer).toHaveClass("border-emerald-700/60");
      expect(disclaimer).toHaveClass("dark:bg-emerald-950");
    });
  });

  describe("Accessibility", () => {
    it("should have role='alert' attribute", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveAttribute("role", "alert");
    });

    it("should have aria-live='polite' attribute", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveAttribute("aria-live", "polite");
    });

    it("should have aria-hidden on icon", () => {
      const { container } = render(<Disclaimer />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Styling", () => {
    it("should have emerald color scheme for info", () => {
      const { container } = render(<Disclaimer />);
      const disclaimer = container.firstChild;
      expect(disclaimer).toHaveClass("bg-emerald-50");

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-emerald-600");
    });

    it("should have dashed border style", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveClass("border-dashed");
    });

    it("should have responsive text sizing", () => {
      render(<Disclaimer />);
      const text = screen.getByText(/Les informations présentées/i);
      expect(text).toHaveClass("text-xs");
      expect(text).toHaveClass("lg:text-sm");
    });

    it("should have dark mode classes", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveClass(
        "dark:bg-emerald-950",
        "dark:border-emerald-400/60",
      );
    });
  });

  describe("Animation with useReducedMotion", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should render with animation when reduced motion is disabled", async () => {
      const { useReducedMotion } = await import("../../hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(false);

      render(<Disclaimer />);
      const disclaimer = screen.getByRole("alert");
      expect(disclaimer).toBeInTheDocument();
    });

    it("should render without animation when reduced motion is enabled", async () => {
      const { useReducedMotion } = await import("../../hooks/useReducedMotion");
      useReducedMotion.mockReturnValue(true);

      render(<Disclaimer />);
      const disclaimer = screen.getByRole("alert");
      expect(disclaimer).toBeInTheDocument();
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <Disclaimer />
          <Disclaimer className="custom-1" />
          <Disclaimer className="custom-2" />
        </div>,
      );

      const disclaimers = container.querySelectorAll("[role='alert']");
      expect(disclaimers).toHaveLength(3);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });
  });

  describe("Content", () => {
    it("should display complete disclaimer text", () => {
      render(<Disclaimer />);
      expect(
        screen.getByText(/titre informatif et ne remplacent pas/i),
      ).toBeInTheDocument();
    });

    it("should mention consulting a doctor", () => {
      render(<Disclaimer />);
      expect(screen.getByText(/Consultez/i)).toBeInTheDocument();
      expect(screen.getByText(/TOUJOURS/i)).toBeInTheDocument();
    });
  });
});
