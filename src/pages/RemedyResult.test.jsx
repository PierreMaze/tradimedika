import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RemedyResult from "./RemedyResult";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock react-router-dom hooks
const mockLocation = {
  search: "?symptoms=fatigue,toux",
  state: { symptoms: ["fatigue", "toux"] },
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

// Mock components
vi.mock("../components/tooltip/TagsInfoTooltip", () => ({
  default: () => <div data-testid="tags-info-tooltip">Tags Info</div>,
}));

vi.mock("../features/allergens-search", () => ({
  AllergyFilterInfo: () => (
    <div data-testid="allergy-filter-info">Allergy Filter Info</div>
  ),
  useAllergies: () => ({
    canUseRemedy: () => true,
    userAllergies: [],
  }),
}));

vi.mock("../features/remedy-result", () => ({
  FilterRemedyResult: () => (
    <div data-testid="filter-remedy-result">Filter</div>
  ),
  RemedyResultList: () => (
    <div data-testid="remedy-result-list">Remedy Result List</div>
  ),
  findMatchingRemedies: () => [],
}));

// Mock validation utils
vi.mock("../utils/validation", () => ({
  parseAndValidateSymptoms: (symptomsString) => {
    return symptomsString ? symptomsString.split(",") : [];
  },
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <HelmetProvider>{component}</HelmetProvider>
    </BrowserRouter>,
  );
};

describe("RemedyResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render page title", () => {
      renderWithProviders(<RemedyResult />);

      expect(screen.getByText("Résultats des Remèdes")).toBeInTheDocument();
    });

    it("should render selected symptoms", () => {
      renderWithProviders(<RemedyResult />);

      expect(screen.getByText(/Remèdes naturels pour :/i)).toBeInTheDocument();
    });

    it("should render TagsInfoTooltip", () => {
      renderWithProviders(<RemedyResult />);

      expect(screen.getByTestId("tags-info-tooltip")).toBeInTheDocument();
    });

    it("should render RemedyResultList", () => {
      renderWithProviders(<RemedyResult />);

      expect(screen.getByTestId("remedy-result-list")).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("should render back to home link at top", () => {
      renderWithProviders(<RemedyResult />);

      const links = screen.getAllByRole("link", { name: /accueil/i });
      expect(links.length).toBeGreaterThan(0);
    });

    it("should have correct href for home links", () => {
      renderWithProviders(<RemedyResult />);

      const links = screen.getAllByRole("link", { name: /accueil/i });
      links.forEach((link) => {
        expect(link).toHaveAttribute("href", "/");
      });
    });
  });

  describe("SEO - Helmet Integration", () => {
    it("should render with Helmet provider", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      // Verify the component renders without errors
      expect(container).toBeInTheDocument();
    });

    it("should render page content", () => {
      renderWithProviders(<RemedyResult />);

      // Verify main content is rendered
      expect(screen.getByText("Résultats des Remèdes")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have proper heading hierarchy", () => {
      renderWithProviders(<RemedyResult />);

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Résultats des Remèdes");
    });

    it("should apply text center alignment", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const textContainer = container.querySelector(".text-center");
      expect(textContainer).toBeInTheDocument();
    });

    it("should apply flex column layout", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const flexContainer = container.querySelector(".flex.flex-col");
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label on back links", () => {
      renderWithProviders(<RemedyResult />);

      const backLinks = screen.getAllByLabelText(/Retour/i);
      expect(backLinks.length).toBeGreaterThan(0);
    });

    it("should have semantic heading", () => {
      renderWithProviders(<RemedyResult />);

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
  });

  describe("Dark Mode Support", () => {
    it("should apply dark mode text classes", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const darkTextElements = container.querySelectorAll(".dark\\:text-light");
      expect(darkTextElements.length).toBeGreaterThan(0);
    });

    it("should have transition classes", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const transitionElements = container.querySelectorAll(".transition");
      expect(transitionElements.length).toBeGreaterThan(0);
    });
  });

  describe("Button Styling", () => {
    it("should have emerald background on action buttons", () => {
      renderWithProviders(<RemedyResult />);

      const buttons = screen.getAllByRole("link", { name: /accueil/i });
      buttons.forEach((button) => {
        expect(button).toHaveClass("bg-emerald-600");
      });
    });

    it("should have rounded corners on buttons", () => {
      renderWithProviders(<RemedyResult />);

      const buttons = screen.getAllByRole("link", { name: /accueil/i });
      buttons.forEach((button) => {
        expect(button).toHaveClass("rounded-lg");
      });
    });

    it("should have shadow on buttons", () => {
      renderWithProviders(<RemedyResult />);

      const buttons = screen.getAllByRole("link", { name: /accueil/i });
      buttons.forEach((button) => {
        expect(button).toHaveClass("shadow-md");
      });
    });
  });

  describe("Icons", () => {
    it("should render SVG icons in back buttons", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive Design", () => {
    it("should apply responsive text sizes", () => {
      renderWithProviders(<RemedyResult />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-3xl", "lg:text-4xl");
    });

    it("should have responsive gap classes", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const gapContainer = container.querySelector(".gap-y-4");
      expect(gapContainer).toBeInTheDocument();
    });
  });

  describe("Color Scheme", () => {
    it("should use emerald color theme", () => {
      renderWithProviders(<RemedyResult />);

      const emeraldElements = screen.getAllByRole("link", { name: /accueil/i });
      expect(emeraldElements.length).toBeGreaterThan(0);
      emeraldElements.forEach((element) => {
        expect(element.className).toContain("emerald");
      });
    });

    it("should apply neutral text colors", () => {
      const { container } = renderWithProviders(<RemedyResult />);

      const neutralText = container.querySelector(".text-neutral-600");
      expect(neutralText).toBeInTheDocument();
    });
  });
});
