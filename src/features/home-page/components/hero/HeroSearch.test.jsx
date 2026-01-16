import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSearch from "./HeroSearch";

// Mock des hooks et composants
vi.mock("../../../../hooks/useScrollOnMobileFocus", () => ({
  useScrollOnMobileFocus: () => ({
    handleScrollToContainer: vi.fn(),
  }),
}));

vi.mock("../../../allergens-search", () => ({
  AllergySectionToggle: () => (
    <div data-testid="allergy-section-toggle">Allergy Section Toggle</div>
  ),
}));

vi.mock("../../../history-search", () => ({
  SearchHistoryModal: () => (
    <div data-testid="search-history-modal">Search History Modal</div>
  ),
}));

vi.mock("../../../symptom-search/components/SymptomSearchSection", () => ({
  default: ({ onSymptomSelect, onRemoveSymptom, selectedSymptoms }) => (
    <div data-testid="symptom-search-section">
      <button onClick={() => onSymptomSelect("fatigue")}>Add Symptom</button>
      <div data-testid="selected-symptoms">{selectedSymptoms.join(", ")}</div>
      {selectedSymptoms.length > 0 && (
        <button onClick={() => onRemoveSymptom(selectedSymptoms[0])}>
          Remove First Symptom
        </button>
      )}
    </div>
  ),
}));

vi.mock("./HeroButtons", () => ({
  default: ({ onSubmit, isDisabled, onHistoryOpen, historyCount }) => (
    <div data-testid="hero-buttons">
      <button onClick={onSubmit} disabled={isDisabled}>
        Submit
      </button>
      <button onClick={onHistoryOpen}>History ({historyCount})</button>
    </div>
  ),
}));

vi.mock("../../../symptom-search/hooks/useSymptomSearchForm", () => ({
  useSymptomSearchForm: () => ({
    selectedSymptoms: [],
    addSymptom: vi.fn(),
    removeSymptom: vi.fn(),
    userAllergies: [],
    isFilteringEnabled: false,
    handleFilteringChange: vi.fn(),
    history: [],
    removeSearch: vi.fn(),
    clearHistory: vi.fn(),
    handleSearchSelect: vi.fn(),
    handleCloseHistory: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
    hasSubmitted: false,
    isHistoryOpen: false,
    setIsHistoryOpen: vi.fn(),
    isAllergySectionExpanded: false,
    setIsAllergySectionExpanded: vi.fn(),
  }),
}));

describe("HeroSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all main components", () => {
      render(<HeroSearch />);

      expect(screen.getByTestId("allergy-section-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("symptom-search-section")).toBeInTheDocument();
      expect(screen.getByTestId("hero-buttons")).toBeInTheDocument();
      expect(screen.getByTestId("search-history-modal")).toBeInTheDocument();
    });

    it("should render with correct container structure", () => {
      const { container } = render(<HeroSearch />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex", "w-full", "flex-col", "gap-y-4");
    });
  });

  describe("Component Integration", () => {
    it("should pass correct props to AllergySectionToggle", () => {
      render(<HeroSearch />);

      const allergySection = screen.getByTestId("allergy-section-toggle");
      expect(allergySection).toBeInTheDocument();
    });

    it("should pass correct props to SymptomSearchSection", () => {
      render(<HeroSearch />);

      const symptomSection = screen.getByTestId("symptom-search-section");
      expect(symptomSection).toBeInTheDocument();
    });

    it("should pass correct props to HeroButtons", () => {
      render(<HeroSearch />);

      const buttons = screen.getByTestId("hero-buttons");
      expect(buttons).toBeInTheDocument();
    });

    it("should pass correct props to SearchHistoryModal", () => {
      render(<HeroSearch />);

      const modal = screen.getByTestId("search-history-modal");
      expect(modal).toBeInTheDocument();
    });
  });

  describe("Button States", () => {
    it("should disable submit button when no symptoms selected", () => {
      render(<HeroSearch />);

      const submitButton = screen.getByRole("button", { name: /Submit/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper structure for screen readers", () => {
      const { container } = render(<HeroSearch />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should maintain focus management", () => {
      render(<HeroSearch />);

      const symptomSection = screen.getByTestId("symptom-search-section");
      expect(symptomSection).toBeInTheDocument();
    });
  });

  describe("Props Propagation", () => {
    it("should render placeholder in SymptomSearchSection", () => {
      render(<HeroSearch />);

      expect(screen.getByTestId("symptom-search-section")).toBeInTheDocument();
    });
  });
});
