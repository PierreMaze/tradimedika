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

vi.mock("react-icons/hi2", () => ({
  HiInformationCircle: (props) => <svg data-testid="info-icon" {...props} />,
}));

describe("RemedyResultDetailsAllergensSection", () => {
  describe("Rendering", () => {
    it("should render allergens section with title and icon", () => {
      const allergens = ["arachides", "lactose"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(
        screen.getByRole("heading", { name: /allergènes potentiels/i }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });

    it("should render all allergens as badges", () => {
      const allergens = ["arachides", "lactose", "gluten"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      expect(screen.getByText("arachides")).toBeInTheDocument();
      expect(screen.getByText("lactose")).toBeInTheDocument();
      expect(screen.getByText("gluten")).toBeInTheDocument();
    });

    it("should render with yellow warning styling", () => {
      const allergens = ["arachides"];

      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={allergens} />,
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass(
        "border-l-4",
        "border-yellow-500",
        "bg-yellow-50",
      );
      expect(section).toHaveClass("dark:bg-yellow-900/20");
    });

    it("should render allergen badges with yellow styling", () => {
      const allergens = ["arachides"];

      render(<RemedyResultDetailsAllergensSection allergens={allergens} />);

      const badge = screen.getByText("arachides");
      expect(badge).toHaveClass("bg-yellow-200", "text-yellow-900");
      expect(badge).toHaveClass("dark:bg-yellow-800", "dark:text-yellow-100");
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

    it("should hide icon from screen readers", () => {
      const allergens = ["arachides"];

      const { container } = render(
        <RemedyResultDetailsAllergensSection allergens={allergens} />,
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
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
