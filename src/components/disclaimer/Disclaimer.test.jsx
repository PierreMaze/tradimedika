import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Disclaimer from "./Disclaimer";

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
        screen.getByText(/ne remplacent pas un avis\/traitement médical/i),
      ).toBeInTheDocument();
    });

    it("should have default styling classes", () => {
      const { container } = render(<Disclaimer />);
      const disclaimer = container.firstChild;
      expect(disclaimer).toHaveClass("bg-amber-50");
      expect(disclaimer).toHaveClass("border-amber-700/60");
      expect(disclaimer).toHaveClass("dark:bg-amber-950/80");
      expect(disclaimer).toHaveClass("z-40");
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
    it("should have amber color scheme for info", () => {
      const { container } = render(<Disclaimer />);
      const disclaimer = container.firstChild;
      expect(disclaimer).toHaveClass("bg-amber-50");

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-amber-700");
    });

    it("should have dashed border style", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveClass("border-dashed");
    });

    it("should have responsive text sizing", () => {
      render(<Disclaimer />);
      const text = screen.getByText(/Les informations présentées/i);
      expect(text).toHaveClass("text-sm");
      expect(text).toHaveClass("lg:text-base");
    });

    it("should have dark mode classes", () => {
      const { container } = render(<Disclaimer />);
      expect(container.firstChild).toHaveClass(
        "dark:bg-amber-950/80",
        "dark:border-amber-400/60",
      );
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <Disclaimer />
          <Disclaimer />
          <Disclaimer />
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
