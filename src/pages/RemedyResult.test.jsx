import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RemedyResult from "./RemedyResult";
/* -----------------------------------------
 * framer-motion full mock (REQUIRED)
 * ---------------------------------------- */

vi.mock("framer-motion", async () => {
  const MotionDiv = ({ children, ...props }) => (
    <div {...props}>{children}</div>
  );

  MotionDiv.propTypes = {
    children: PropTypes.node,
  };

  const AnimatePresence = ({ children, ...props }) => (
    <div {...props}>{children}</div>
  );

  AnimatePresence.propTypes = {
    children: PropTypes.node,
  };

  return {
    motion: {
      div: MotionDiv,
    },
    AnimatePresence,
  };
});

/* -----------------------------------------
 * react-router-dom
 * ---------------------------------------- */
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

/* -----------------------------------------
 * Helper components
 * ---------------------------------------- */
vi.mock("../components/ui/helper/RemedyTagsHelper", () => ({
  default: () => <div data-testid="remedy-tags-helper">Remedy Tags Helper</div>,
}));

/* -----------------------------------------
 * Allergies
 * ---------------------------------------- */
vi.mock("../features/allergens-search", () => ({
  AllergyFilterInfo: () => (
    <div data-testid="allergy-filter-info">Allergy Filter Info</div>
  ),
  useAllergies: () => ({
    canUseRemedy: () => true,
    userAllergies: [],
  }),
}));

/* -----------------------------------------
 * Remedy result page logic
 * ---------------------------------------- */
vi.mock("../features/remedy-result-page", () => ({
  FilterRemedyResult: () => (
    <div data-testid="filter-remedy-result">Filter</div>
  ),
  RemedyResultList: () => (
    <div data-testid="remedy-result-list">Remedy Result List</div>
  ),
  findMatchingRemedies: () => [
    {
      remedy: { id: 1, name: "Ginger" },
      score: 1,
    },
  ],
}));

/* -----------------------------------------
 * Symptom validation (correct path)
 * ---------------------------------------- */
vi.mock("../features/symptom-search/utils/validationSymptom", () => ({
  parseAndValidateSymptoms: (value) => (value ? value.split(",") : []),
}));

/* -----------------------------------------
 * Test helper
 * ---------------------------------------- */
const renderWithProviders = (ui) =>
  render(
    <BrowserRouter>
      <HelmetProvider>{ui}</HelmetProvider>
    </BrowserRouter>,
  );

/* -----------------------------------------
 * Tests
 * ---------------------------------------- */
describe("RemedyResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders main page title", () => {
      renderWithProviders(<RemedyResult />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Résultats des Remèdes",
      );
    });

    it("renders selected symptoms text", () => {
      renderWithProviders(<RemedyResult />);
      expect(screen.getByText(/Remèdes naturels pour/i)).toBeInTheDocument();
    });

    it("renders RemedyTagsHelper", () => {
      renderWithProviders(<RemedyResult />);
      expect(screen.getByTestId("remedy-tags-helper")).toBeInTheDocument();
    });

    it("renders RemedyResultList", () => {
      renderWithProviders(<RemedyResult />);
      expect(screen.getByTestId("remedy-result-list")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("renders back to home links", () => {
      renderWithProviders(<RemedyResult />);
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => expect(link).toHaveAttribute("href", "/"));
    });
  });

  describe("Accessibility", () => {
    it("has aria-label on back buttons", () => {
      renderWithProviders(<RemedyResult />);
      expect(screen.getAllByLabelText(/Retour/i).length).toBeGreaterThan(0);
    });
  });

  describe("Layout & styles", () => {
    it("uses flex column layout", () => {
      const { container } = renderWithProviders(<RemedyResult />);
      expect(container.querySelector(".flex.flex-col")).toBeInTheDocument();
    });

    it("applies dark mode classes", () => {
      const { container } = renderWithProviders(<RemedyResult />);
      expect(container.querySelector(".dark\\:text-light")).toBeInTheDocument();
    });

    it("renders SVG icons", () => {
      const { container } = renderWithProviders(<RemedyResult />);
      expect(container.querySelector("svg")).toBeTruthy();
    });
  });
});
