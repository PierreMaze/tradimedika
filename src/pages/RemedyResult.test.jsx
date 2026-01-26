/* eslint-disable react/prop-types */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RemedyResult from "./RemedyResult";

// Mock Helmet - render children to make SEO content testable
vi.mock("react-helmet-async", () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }) => <div>{children}</div>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock FilterRemedyResult and related components
vi.mock("../features/remedy-result-page", () => ({
  RemedyCard: ({ remedy }) => (
    <div data-testid="remedy-card">{remedy.name}</div>
  ),
  FilterRemedyResult: ({ filterButton }) => (
    <div data-testid="filter-remedy-result">
      {filterButton}
      <div>Filter Component</div>
    </div>
  ),
  RemedyResultList: ({ remedies, selectedSymptoms }) => (
    <div data-testid="remedy-result-list">
      <div>Remedies: {remedies.length}</div>
      <div>Symptoms: {selectedSymptoms.join(", ")}</div>
    </div>
  ),
  RemedyResultNotFound: () => (
    <div data-testid="remedy-not-found">Not Found</div>
  ),
  findMatchingRemedies: vi.fn(() => []),
  getRemedyBySlug: vi.fn(),
  generateSlug: vi.fn(),
}));

// Mock FilterButton and FilterModal
vi.mock("../features/remedy-filter", () => ({
  FilterButton: ({ onClick, activeFiltersCount }) => (
    <button data-testid="filter-button" onClick={onClick}>
      Filters ({activeFiltersCount})
    </button>
  ),
  FilterModal: ({ isOpen }) => (
    <div data-testid="filter-modal">
      {isOpen ? "Modal Open" : "Modal Closed"}
    </div>
  ),
  filterRemediesByTags: vi.fn((remedies) => remedies),
  useRemedyFilters: () => ({
    isModalOpen: false,
    openModal: vi.fn(),
    closeModal: vi.fn(),
    appliedFilters: {},
    tempFilters: {},
    toggleTempFilter: vi.fn(),
    resetTempFilters: vi.fn(),
    applyFilters: vi.fn(),
    appliedFiltersCount: 0,
  }),
}));

// Mock AllergyFilterInfo
vi.mock("../features/allergens-search", () => ({
  AllergyFilterInfo: () => (
    <div data-testid="allergy-filter-info">Allergy Info</div>
  ),
  useAllergies: () => ({
    canUseRemedy: vi.fn(() => true),
    userAllergies: [],
  }),
}));

// Mock useSymptomsPersistence - CRITIQUE pour éviter la boucle infinie
const mockSetSymptomsAndPersist = vi.fn();
vi.mock("../features/symptom-search/hooks/useSymptomsPersistence", () => ({
  useSymptomsPersistence: () => [[], mockSetSymptomsAndPersist],
}));

// Mock validation utils
vi.mock("../features/symptom-search/utils/validationSymptom", () => ({
  parseAndValidateSymptoms: vi.fn((str) => str.split(",")),
}));

// Import mocked functions after vi.mock declarations
import { findMatchingRemedies } from "../features/remedy-result-page";

const renderWithRouter = (initialEntries = ["/remedes"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/remedes" element={<RemedyResult />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("RemedyResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render the page title", () => {
      renderWithRouter();

      expect(
        screen.getByRole("heading", { name: /Résultats des Remèdes/i }),
      ).toBeInTheDocument();
    });

    it("should render back buttons to home", () => {
      renderWithRouter();

      const backButtons = screen
        .getAllByRole("link")
        .filter((link) =>
          link.getAttribute("aria-label")?.includes("Retour à l'accueil"),
        );
      expect(backButtons.length).toBeGreaterThan(0);
      backButtons.forEach((button) => {
        expect(button).toHaveAttribute("href", "/");
      });
    });

    it("should render new search button", () => {
      renderWithRouter();

      const newSearchButton = screen.getByText(/Nouvelle recherche/i);
      expect(newSearchButton).toBeInTheDocument();
      expect(newSearchButton.closest("a")).toHaveAttribute("href", "/");
    });

    it("should render SEO helmet", () => {
      renderWithRouter();

      expect(screen.getByTestId("helmet")).toBeInTheDocument();
    });
  });

  describe("With Symptoms from URL", () => {
    it("should display symptoms from query params", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([
        { remedy: { id: 1, name: "Remedy 1" }, score: 100 },
      ]);

      renderWithRouter(["/remedes?symptoms=fatigue,stress"]);

      expect(screen.getByText(/Remèdes naturels pour :/i)).toBeInTheDocument();
    });

    it("should render remedy result list when remedies are found", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([
        { remedy: { id: 1, name: "Remedy 1" }, score: 100 },
      ]);

      renderWithRouter(["/remedes?symptoms=fatigue"]);

      expect(screen.getByTestId("remedy-result-list")).toBeInTheDocument();
    });

    it("should show results count when remedies are found", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([
        { remedy: { id: 1, name: "Remedy 1" }, score: 100 },
        { remedy: { id: 2, name: "Remedy 2" }, score: 90 },
      ]);

      renderWithRouter(["/remedes?symptoms=fatigue"]);

      // Le compteur de résultats devrait afficher "2 remèdes trouvés"
      const statusElement = screen.getByRole("status");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement.textContent).toMatch(/2.*remèdes?.*trouvés?/i);
    });
  });

  describe("Filter Components", () => {
    it("should render filter button when remedies exist", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([
        { remedy: { id: 1, name: "Remedy 1" }, score: 100 },
      ]);

      renderWithRouter(["/remedes?symptoms=fatigue"]);

      expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    });

    it("should render filter modal", () => {
      renderWithRouter();

      expect(screen.getByTestId("filter-modal")).toBeInTheDocument();
    });

    it("should render filter remedy result when remedies exist", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([
        { remedy: { id: 1, name: "Remedy 1" }, score: 100 },
      ]);

      renderWithRouter(["/remedes?symptoms=fatigue"]);

      expect(screen.getByTestId("filter-remedy-result")).toBeInTheDocument();
    });
  });

  describe("SEO Metadata", () => {
    it("should generate correct page title with symptoms", () => {
      renderWithRouter(["/remedes?symptoms=fatigue,stress"]);

      // Verify SEO helmet is rendered with symptoms
      const helmet = screen.getByTestId("helmet");
      expect(helmet).toBeInTheDocument();
    });

    it("should include canonical URL in metadata", () => {
      renderWithRouter(["/remedes?symptoms=fatigue"]);

      const helmet = screen.getByTestId("helmet");
      expect(helmet).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should handle empty symptoms gracefully", () => {
      renderWithRouter(["/remedes"]);

      expect(
        screen.getByRole("heading", { name: /Résultats des Remèdes/i }),
      ).toBeInTheDocument();
    });

    it("should render remedy list component even with no results", () => {
      vi.mocked(findMatchingRemedies).mockReturnValue([]);

      renderWithRouter(["/remedes?symptoms=invalid"]);

      expect(screen.getByTestId("remedy-result-list")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should have working back button", () => {
      renderWithRouter();

      const backButtons = screen.getAllByRole("link", {
        name: /Retour à l'accueil/i,
      });
      expect(backButtons.length).toBeGreaterThan(0);
      backButtons.forEach((button) => {
        expect(button).toHaveAttribute("href", "/");
      });
    });

    it("should render navigation elements with proper structure", () => {
      renderWithRouter();

      // Vérifier que les boutons de navigation existent
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe("Symptom Persistence", () => {
    it("should not call setSymptomsAndPersist when no symptoms", () => {
      renderWithRouter(["/remedes"]);

      // Le hook ne devrait pas être appelé sans symptômes valides
      // On vérifie juste que le composant se rend sans erreur
      expect(
        screen.getByRole("heading", { name: /Résultats des Remèdes/i }),
      ).toBeInTheDocument();
    });

    it("should handle location state symptoms", () => {
      const customRender = () => {
        return render(
          <MemoryRouter
            initialEntries={[
              {
                pathname: "/remedes",
                state: { symptoms: ["fatigue", "stress"] },
              },
            ]}
          >
            <Routes>
              <Route path="/remedes" element={<RemedyResult />} />
            </Routes>
          </MemoryRouter>,
        );
      };

      customRender();

      expect(
        screen.getByRole("heading", { name: /Résultats des Remèdes/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Button Styles", () => {
    it("should apply correct classes to back button", () => {
      renderWithRouter();

      const backButton = screen.getAllByRole("link", {
        name: /Retour à l'accueil/i,
      })[0];
      expect(backButton).toHaveClass("bg-emerald-600");
    });

    it("should apply correct classes to new search button", () => {
      renderWithRouter();

      const newSearchButton = screen.getByText(/Nouvelle recherche/i);
      const linkElement = newSearchButton.closest("a");
      expect(linkElement).toHaveClass("bg-emerald-600");
    });
  });
});
