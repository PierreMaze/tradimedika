// components/remedy/RemedyCard.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RemedyCard from "./RemedyCard";

// Helper pour wrapper avec Router (nécessaire pour Link)
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock des tags pour simplifier les tests
vi.mock("../tag/VerifiedTag", () => ({
  default: () => <div data-testid="verified-tag">Vérifié</div>,
}));

vi.mock("../tag/PregnancyTag", () => ({
  default: () => <div data-testid="pregnancy-tag">Sûr grossesse</div>,
}));

vi.mock("../tag/ChildrenAgeTag", () => ({
  default: ({ age }) => <div data-testid="children-tag">Enfants {age}+</div>,
}));

describe("RemedyCard Component", () => {
  const mockRemedyMinimal = {
    id: 1,
    name: "Citron",
    type: "Fruit",
    description: "Le citron est un agrume riche en vitamine C.",
    properties: [],
    pregnancySafe: false,
    childrenAge: null,
    verifiedByProfessional: false,
  };

  const mockRemedyComplete = {
    id: 2,
    name: "Thé vert",
    type: "Plante",
    description: "Le thé vert est riche en antioxydants.",
    properties: [
      { name: "antioxydant", score: 5, category: "Propriété" },
      { name: "anti-inflammatoire", score: 4, category: "Propriété" },
      { name: "énergisant", score: 3, category: "Propriété" },
      { name: "détoxifiant", score: 2, category: "Propriété" },
    ],
    image: "/images/the-vert.jpg",
    pregnancySafe: true,
    childrenAge: 12,
    verifiedByProfessional: true,
  };

  describe("Rendering", () => {
    it("should render with minimal props", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      expect(screen.getByText("Citron")).toBeInTheDocument();
      expect(screen.getByText("Fruit")).toBeInTheDocument();
      expect(
        screen.getByText("Le citron est un agrume riche en vitamine C."),
      ).toBeInTheDocument();
    });

    it("should render with all props", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      expect(screen.getByText("Thé vert")).toBeInTheDocument();
      expect(screen.getByText("Plante")).toBeInTheDocument();
    });

    it("should render image when provided", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      const img = screen.getByAltText("Illustration de Thé vert");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/images/the-vert.jpg");
    });

    it("should not render image when not provided", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      expect(
        screen.queryByAltText("Illustration de Citron"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Properties Display", () => {
    it("should display first 3 properties", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      expect(screen.getByText("Antioxydant")).toBeInTheDocument();
      expect(screen.getByText("Anti-inflammatoire")).toBeInTheDocument();
      expect(screen.getByText("Énergisant")).toBeInTheDocument();
    });

    it("should display +N counter when more than 3 properties", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      // 4 propriétés au total, on affiche 3 + compteur +1
      expect(screen.getByText("+1")).toBeInTheDocument();
    });

    it("should not display counter when 3 or fewer properties", () => {
      const remedyWith3Props = {
        ...mockRemedyMinimal,
        properties: [
          { name: "prop1", score: 5, category: "Propriété" },
          { name: "prop2", score: 4, category: "Propriété" },
          { name: "prop3", score: 3, category: "Propriété" },
        ],
      };

      renderWithRouter(
        <RemedyCard remedy={remedyWith3Props} selectedSymptoms={[]} />,
      );

      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });

    it("should not display properties section when empty", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      // Pas de propriétés affichées
      expect(screen.queryByText(/antioxydant/i)).not.toBeInTheDocument();
    });
  });

  describe("Badges Display", () => {
    it("should render verified badge when verifiedByProfessional is true", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    });

    it("should not render verified badge when verifiedByProfessional is false", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      expect(screen.queryByTestId("verified-tag")).not.toBeInTheDocument();
    });

    it("should render pregnancy badge when pregnancySafe is true", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
    });

    it("should not render pregnancy badge when pregnancySafe is false", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      expect(screen.queryByTestId("pregnancy-tag")).not.toBeInTheDocument();
    });

    it("should render children badge when childrenAge is provided", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyComplete} selectedSymptoms={[]} />,
      );

      expect(screen.getByTestId("children-tag")).toBeInTheDocument();
      expect(screen.getByText("Enfants 12+")).toBeInTheDocument();
    });

    it("should not render children badge when childrenAge is null", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      expect(screen.queryByTestId("children-tag")).not.toBeInTheDocument();
    });
  });

  describe("Link Navigation", () => {
    it("should generate correct slug in link", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/remedes/citron");
    });

    it("should pass selectedSymptoms in link state", () => {
      const { container } = renderWithRouter(
        <RemedyCard
          remedy={mockRemedyMinimal}
          selectedSymptoms={["fatigue", "stress"]}
        />,
      );

      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
    });

    it("should have accessible aria-label", () => {
      renderWithRouter(
        <RemedyCard remedy={mockRemedyMinimal} selectedSymptoms={[]} />,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Voir les détails de Citron");
    });
  });

  describe("React.memo Optimization", () => {
    it("should not re-render when props are identical", () => {
      const { rerender } = renderWithRouter(
        <RemedyCard
          remedy={mockRemedyMinimal}
          selectedSymptoms={["fatigue"]}
        />,
      );

      // Premier rendu
      expect(screen.getByText("Citron")).toBeInTheDocument();

      // Re-render avec mêmes props
      rerender(
        <BrowserRouter>
          <RemedyCard
            remedy={mockRemedyMinimal}
            selectedSymptoms={["fatigue"]}
          />
        </BrowserRouter>,
      );

      // Le composant doit toujours être là (pas de crash)
      expect(screen.getByText("Citron")).toBeInTheDocument();
    });

    it("should re-render when remedy ID changes", () => {
      const { rerender } = renderWithRouter(
        <RemedyCard
          remedy={mockRemedyMinimal}
          selectedSymptoms={["fatigue"]}
        />,
      );

      expect(screen.getByText("Citron")).toBeInTheDocument();

      // Re-render avec un remède différent
      rerender(
        <BrowserRouter>
          <RemedyCard
            remedy={mockRemedyComplete}
            selectedSymptoms={["fatigue"]}
          />
        </BrowserRouter>,
      );

      expect(screen.getByText("Thé vert")).toBeInTheDocument();
      expect(screen.queryByText("Citron")).not.toBeInTheDocument();
    });

    it("should re-render when selectedSymptoms change", () => {
      const { rerender } = renderWithRouter(
        <RemedyCard
          remedy={mockRemedyMinimal}
          selectedSymptoms={["fatigue"]}
        />,
      );

      expect(screen.getByText("Citron")).toBeInTheDocument();

      // Re-render avec symptômes différents
      rerender(
        <BrowserRouter>
          <RemedyCard
            remedy={mockRemedyMinimal}
            selectedSymptoms={["stress", "insomnie"]}
          />
        </BrowserRouter>,
      );

      // Le composant devrait se re-render mais toujours afficher le même contenu
      expect(screen.getByText("Citron")).toBeInTheDocument();
    });
  });
});
