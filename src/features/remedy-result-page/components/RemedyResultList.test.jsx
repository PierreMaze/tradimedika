import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RemedyResultList from "./RemedyResultList";

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const mockRemedies = [
  {
    remedy: {
      id: 1,
      name: "Citron",
      type: "plante",
      symptoms: ["nausée"],
      pregnancySafe: true,
      childrenAge: 0,
    },
    matchCount: 1,
    matchedSymptoms: ["nausée"],
  },
  {
    remedy: {
      id: 2,
      name: "Gingembre",
      type: "plante",
      symptoms: ["nausée", "fatigue"],
      pregnancySafe: true,
      childrenAge: 3,
    },
    matchCount: 2,
    matchedSymptoms: ["nausée", "fatigue"],
  },
];

describe("RemedyResultList", () => {
  const defaultProps = {
    remedies: mockRemedies,
    hasMatchingRemedies: true,
    selectedSymptoms: ["nausée"],
  };

  describe("Rendering with results", () => {
    it("should render remedy cards", () => {
      renderWithRouter(<RemedyResultList {...defaultProps} />);
      expect(screen.getByText("Citron")).toBeInTheDocument();
      expect(screen.getByText("Gingembre")).toBeInTheDocument();
    });

    it("should render correct number of cards", () => {
      renderWithRouter(<RemedyResultList {...defaultProps} />);
      expect(screen.getAllByText(/plante/i)).toHaveLength(2);
    });

    it("should have grid layout", () => {
      const { container } = renderWithRouter(
        <RemedyResultList {...defaultProps} />,
      );
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("should have responsive grid columns", () => {
      const { container } = renderWithRouter(
        <RemedyResultList {...defaultProps} />,
      );
      const grid = container.querySelector(".grid");
      expect(grid?.className).toContain("grid-cols-1");
      expect(grid?.className).toContain("md:grid-cols-2");
      expect(grid?.className).toContain("lg:grid-cols-3");
    });
  });

  describe("Empty state - no results", () => {
    it("should show no-results variant when no remedies and no matches", () => {
      renderWithRouter(
        <RemedyResultList
          remedies={[]}
          hasMatchingRemedies={false}
          selectedSymptoms={["symptôme-invalide"]}
        />,
      );
      expect(
        screen.getByText("Aucun remède trouvé pour ces symptômes"),
      ).toBeInTheDocument();
    });

    it("should show home button when no results", () => {
      renderWithRouter(
        <RemedyResultList
          remedies={[]}
          hasMatchingRemedies={false}
          selectedSymptoms={["symptôme-invalide"]}
        />,
      );
      expect(
        screen.getByRole("link", { name: /Retour à l'accueil/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Empty state - filter mismatch", () => {
    it("should show no-filter-match variant when has matches but filter excludes all", () => {
      renderWithRouter(
        <RemedyResultList
          remedies={[]}
          hasMatchingRemedies={true}
          selectedSymptoms={["nausée"]}
        />,
      );
      expect(
        screen.getByText("Aucun remède ne correspond au filtre sélectionné"),
      ).toBeInTheDocument();
    });

    it("should not show home button when filter mismatch", () => {
      renderWithRouter(
        <RemedyResultList
          remedies={[]}
          hasMatchingRemedies={true}
          selectedSymptoms={["nausée"]}
        />,
      );
      expect(
        screen.queryByRole("link", { name: /Retour à l'accueil/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Single remedy", () => {
    it("should render with single remedy", () => {
      renderWithRouter(
        <RemedyResultList
          remedies={[mockRemedies[0]]}
          hasMatchingRemedies={true}
          selectedSymptoms={["nausée"]}
        />,
      );
      expect(screen.getByText("Citron")).toBeInTheDocument();
      expect(screen.queryByText("Gingembre")).not.toBeInTheDocument();
    });
  });

  describe("Layout and spacing", () => {
    it("should have gap between cards", () => {
      const { container } = renderWithRouter(
        <RemedyResultList {...defaultProps} />,
      );
      const grid = container.querySelector(".grid");
      expect(grid?.className).toContain("gap-6");
    });

    it("should have horizontal margins", () => {
      const { container } = renderWithRouter(
        <RemedyResultList {...defaultProps} />,
      );
      const grid = container.querySelector(".grid");
      expect(grid?.className).toContain("mx-4");
    });
  });

  describe("Props handling", () => {
    it("should pass selectedSymptoms to remedy cards", () => {
      renderWithRouter(
        <RemedyResultList
          {...defaultProps}
          selectedSymptoms={["nausée", "fatigue"]}
        />,
      );
      expect(screen.getByText("Citron")).toBeInTheDocument();
    });

    it("should handle empty selectedSymptoms", () => {
      renderWithRouter(
        <RemedyResultList {...defaultProps} selectedSymptoms={[]} />,
      );
      expect(screen.getByText("Citron")).toBeInTheDocument();
    });
  });
});
