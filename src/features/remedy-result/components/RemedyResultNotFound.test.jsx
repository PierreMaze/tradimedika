import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RemedyResultNotFound from "./RemedyResultNotFound";

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("RemedyResultNotFound", () => {
  describe("No results variant", () => {
    it("should render no-results message", () => {
      renderWithRouter(<RemedyResultNotFound variant="no-results" />);
      expect(
        screen.getByText("Aucun remède trouvé pour ces symptômes"),
      ).toBeInTheDocument();
    });

    it("should display search icon", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      // Icon is now a React Icon SVG component
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should show description", () => {
      renderWithRouter(<RemedyResultNotFound variant="no-results" />);
      expect(
        screen.getByText(/Essayez d'autres symptômes/i),
      ).toBeInTheDocument();
    });

    it("should have status role", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      expect(container.firstChild).toHaveAttribute("role", "status");
    });

    it("should have aria-live polite", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      expect(container.firstChild).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("No filter match variant", () => {
    it("should render no-filter-match message", () => {
      renderWithRouter(<RemedyResultNotFound variant="no-filter-match" />);
      expect(
        screen.getByText("Aucun remède ne correspond au filtre sélectionné"),
      ).toBeInTheDocument();
    });

    it("should display warning icon", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-filter-match" />,
      );
      // Icon is now a React Icon SVG component
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should show filter description", () => {
      renderWithRouter(<RemedyResultNotFound variant="no-filter-match" />);
      expect(
        screen.getByText(/Essayez de sélectionner un autre tag/i),
      ).toBeInTheDocument();
    });
  });

  describe("Home button", () => {
    it("should not show home button by default", () => {
      renderWithRouter(<RemedyResultNotFound variant="no-results" />);
      expect(
        screen.queryByRole("link", { name: /Retour à l'accueil/i }),
      ).not.toBeInTheDocument();
    });

    it("should show home button when showHomeButton is true", () => {
      renderWithRouter(
        <RemedyResultNotFound variant="no-results" showHomeButton />,
      );
      expect(
        screen.getByRole("link", { name: /Retour à l'accueil/i }),
      ).toBeInTheDocument();
    });

    it("should link to home page", () => {
      renderWithRouter(
        <RemedyResultNotFound variant="no-results" showHomeButton />,
      );
      const link = screen.getByRole("link", { name: /Retour à l'accueil/i });
      expect(link).toHaveAttribute("href", "/");
    });

    it("should have home button icon", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" showHomeButton />,
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have dashed border", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      expect(container.firstChild?.className).toContain("border-dashed");
    });

    it("should have rounded corners", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      expect(container.firstChild?.className).toContain("rounded-lg");
    });

    it("should support dark mode", () => {
      const { container } = renderWithRouter(
        <RemedyResultNotFound variant="no-results" />,
      );
      expect(container.firstChild?.className).toContain("dark:bg-dark");
    });
  });

  describe("Default variant", () => {
    it("should default to no-results when no variant provided", () => {
      renderWithRouter(<RemedyResultNotFound />);
      expect(
        screen.getByText("Aucun remède trouvé pour ces symptômes"),
      ).toBeInTheDocument();
    });

    it("should handle invalid variant gracefully", () => {
      renderWithRouter(<RemedyResultNotFound variant="invalid" />);
      expect(
        screen.getByText("Aucun remède trouvé pour ces symptômes"),
      ).toBeInTheDocument();
    });
  });
});
