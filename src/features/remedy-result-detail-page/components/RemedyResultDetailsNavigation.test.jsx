import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RemedyResultDetailsNavigation from "./RemedyResultDetailsNavigation";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("RemedyResultDetailsNavigation", () => {
  const mockSymptoms = ["fatigue", "stress"];

  describe("Rendering - top variant", () => {
    it("should render back button with symptoms state", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="top"
        />,
      );

      const backLink = screen.getByRole("link", {
        name: /retour aux résultats/i,
      });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute("href", "/remedes");
    });

    it("should not render home button in top variant", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="top"
        />,
      );

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(1);
    });

    it("should render with default top variant when not specified", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation selectedSymptoms={mockSymptoms} />,
      );

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(1);
    });
  });

  describe("Rendering - bottom variant", () => {
    it("should render both back and home buttons", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="bottom"
        />,
      );

      const backLink = screen.getByRole("link", {
        name: /retour aux résultats/i,
      });
      const homeLink = screen.getByRole("link", {
        name: /retour à l'accueil/i,
      });

      expect(backLink).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
    });

    it("should render home link with correct href", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="bottom"
        />,
      );

      const homeLink = screen.getByRole("link", {
        name: /retour à l'accueil/i,
      });
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should have correct button text", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="bottom"
        />,
      );

      expect(screen.getByText("Nouvelle recherche")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-labels on all links", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={mockSymptoms}
          variant="bottom"
        />,
      );

      const backLink = screen.getByRole("link", {
        name: /retour aux résultats/i,
      });
      const homeLink = screen.getByRole("link", {
        name: /retour à l'accueil/i,
      });

      expect(backLink).toHaveAttribute("aria-label");
      expect(homeLink).toHaveAttribute("aria-label");
    });

    it("should have aria-hidden on icon", () => {
      const { container } = renderWithRouter(
        <RemedyResultDetailsNavigation selectedSymptoms={mockSymptoms} />,
      );

      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty symptoms array", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation selectedSymptoms={[]} variant="top" />,
      );

      const backLink = screen.getByRole("link", {
        name: /retour aux résultats/i,
      });
      expect(backLink).toBeInTheDocument();
    });

    it("should handle undefined symptoms", () => {
      renderWithRouter(
        <RemedyResultDetailsNavigation
          selectedSymptoms={undefined}
          variant="bottom"
        />,
      );

      expect(screen.getByText("Nouvelle recherche")).toBeInTheDocument();
    });
  });
});
