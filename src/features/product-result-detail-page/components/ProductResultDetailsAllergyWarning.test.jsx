import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsAllergyWarning from "./RemedyResultDetailsAllergyWarning";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe("RemedyResultDetailsAllergyWarning", () => {
  const mockAllergenNames = "agrumes, pollen";

  describe("Rendering", () => {
    it("should render warning banner with allergen names", () => {
      render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      expect(
        screen.getByText(/Ce remède contient vos allergènes/i),
      ).toBeInTheDocument();
      expect(screen.getByText(mockAllergenNames)).toBeInTheDocument();
    });

    it("should render professional consultation message", () => {
      render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      expect(
        screen.getByText(/Consultez un professionnel de santé/i),
      ).toBeInTheDocument();
    });

    it("should render alert icon", () => {
      const { container } = render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Accessibility", () => {
    it("should have role alert", () => {
      const { container } = render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it("should have aria-live assertive", () => {
      const { container } = render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      const alert = container.querySelector('[aria-live="assertive"]');
      expect(alert).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have correct container classes", () => {
      const { container } = render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      const alert = container.firstChild;
      expect(alert.className).toContain("border-dashed");
      expect(alert.className).toContain("bg-amber-50");
      expect(alert.className).toContain("rounded-lg");
    });

    it("should include dark mode classes", () => {
      const { container } = render(
        <RemedyResultDetailsAllergyWarning allergenNames={mockAllergenNames} />,
      );

      const alert = container.firstChild;
      expect(alert.className).toContain("dark:bg-amber-950");
      expect(alert.className).toContain("dark:border-amber-400/60");
    });
  });

  describe("Edge cases", () => {
    it("should handle single allergen", () => {
      render(<RemedyResultDetailsAllergyWarning allergenNames="agrumes" />);

      expect(screen.getByText("agrumes")).toBeInTheDocument();
    });

    it("should handle multiple allergens separated by commas", () => {
      render(
        <RemedyResultDetailsAllergyWarning allergenNames="agrumes, pollen, astéracées" />,
      );

      expect(
        screen.getByText("agrumes, pollen, astéracées"),
      ).toBeInTheDocument();
    });

    it("should render with prefersReducedMotion true", () => {
      render(
        <RemedyResultDetailsAllergyWarning
          allergenNames={mockAllergenNames}
          prefersReducedMotion={true}
        />,
      );

      expect(
        screen.getByText(/Ce remède contient vos allergènes/i),
      ).toBeInTheDocument();
    });
  });
});
