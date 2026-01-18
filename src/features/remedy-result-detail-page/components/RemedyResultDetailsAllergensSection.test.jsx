import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsAllergensSection from "./RemedyResultDetailsAllergensSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
  },
}));

describe("RemedyResultDetailsAllergensSection", () => {
  describe("Rendering", () => {
    it("should render allergens section with title", () => {
      const allergens = ["arachides", "lactose"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(
        screen.getByRole("heading", { name: /allergènes potentiels/i }),
      ).toBeInTheDocument();
    });

    it("should render all allergens as badges", () => {
      const allergens = ["arachides", "lactose", "gluten"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(screen.getByText("arachides")).toBeInTheDocument();
      expect(screen.getByText("lactose")).toBeInTheDocument();
      expect(screen.getByText("gluten")).toBeInTheDocument();
    });

    it("should render with card styling", () => {
      const allergens = ["arachides"];

      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={allergens} />,
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass(
        "rounded-lg",
        "border",
        "border-neutral-200",
        "bg-white",
      );
      expect(section).toHaveClass(
        "dark:border-neutral-700",
        "dark:bg-neutral-800",
      );
    });

    it("should render allergen badges with emerald styling", () => {
      const allergens = ["arachides"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      const badge = screen.getByText("arachides");
      expect(badge).toHaveClass("bg-emerald-100", "text-emerald-800");
      expect(badge).toHaveClass("dark:bg-emerald-900", "dark:text-emerald-200");
    });

    it("should capitalize allergen badges", () => {
      const allergens = ["arachides"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      const badge = screen.getByText("arachides");
      expect(badge).toHaveClass("capitalize");
    });
  });

  describe("Edge Cases", () => {
    it("should return null when allergens is null", () => {
      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={null} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when allergens is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={undefined} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when allergens is an empty array", () => {
      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={[]} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle single allergen", () => {
      const allergens = ["arachides"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(screen.getByText("arachides")).toBeInTheDocument();
    });

    it("should handle many allergens", () => {
      const allergens = Array.from({ length: 10 }, (_, i) => `allergen${i}`);

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      allergens.forEach((allergen) => {
        expect(screen.getByText(allergen)).toBeInTheDocument();
      });
    });

    it("should handle allergens with mixed case", () => {
      const allergens = ["ARACHIDES", "lactose", "GluTeN"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(screen.getByText("ARACHIDES")).toBeInTheDocument();
      expect(screen.getByText("lactose")).toBeInTheDocument();
      expect(screen.getByText("GluTeN")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const allergens = ["arachides"];

      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={allergens} />,
      );

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const allergens = ["arachides"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      const heading = screen.getByRole("heading", {
        name: /allergènes potentiels/i,
      });
      expect(heading.tagName).toBe("H2");
    });

    it("should use flexbox for responsive badge layout", () => {
      const allergens = ["arachides", "lactose"];

      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={allergens} />,
      );

      const badgeContainer = container.querySelector(".flex.flex-wrap");
      expect(badgeContainer).toBeInTheDocument();
    });
  });
});
