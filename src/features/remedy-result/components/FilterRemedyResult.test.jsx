import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import FilterRemedyResult from "./FilterRemedyResult";

vi.mock("./ListFilterTag", () => ({
  default: ({ tags, activeTag, onTagClick }) => (
    <div
      data-testid="list-filter-tag"
      role="group"
      aria-label="Filtrer les remèdes par symptôme"
    >
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          aria-pressed={tag === activeTag}
        >
          {tag === "all" ? "Tous" : tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
      ))}
    </div>
  ),
}));

describe("FilterRemedyResult - Conditional Rendering", () => {
  describe("Un seul symptôme unique", () => {
    it("should NOT render when only one unique symptom exists", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
      ];

      const { container } = render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Deux symptômes uniques ou plus", () => {
    it("should render when two unique symptoms exist", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 1,
          matchedSymptoms: ["stress"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      expect(
        screen.getByRole("group", { name: /Filtrer les remèdes/i }),
      ).toBeInTheDocument();
    });

    it("should render when multiple unique symptoms exist", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 2,
          matchedSymptoms: ["fatigue", "stress"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 1,
          matchedSymptoms: ["nausée"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      expect(
        screen.getByRole("group", { name: /Filtrer les remèdes/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should NOT render when matchedRemedies is empty", () => {
      const { container } = render(
        <FilterRemedyResult matchedRemedies={[]} onFilterChange={vi.fn()} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should NOT render when all remedies have empty matchedSymptoms", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 0,
          matchedSymptoms: [],
        },
      ];

      const { container } = render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Callback behavior", () => {
    it("should call onFilterChange with all remedies when single symptom", async () => {
      const mockCallback = vi.fn();
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={mockCallback}
        />,
      );

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(matchedRemedies);
      });
    });

    it("should call onFilterChange with all remedies initially when multiple symptoms", async () => {
      const mockCallback = vi.fn();
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 1,
          matchedSymptoms: ["stress"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={mockCallback}
        />,
      );

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(matchedRemedies);
      });
    });
  });

  describe("Symptoms extraction and sorting", () => {
    it("should extract unique symptoms from matchedRemedies", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 2,
          matchedSymptoms: ["fatigue", "stress"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 2,
          matchedSymptoms: ["stress", "nausée"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      expect(screen.getByText("Stress")).toBeInTheDocument();
      expect(screen.getByText("Nausée")).toBeInTheDocument();
    });

    it("should not duplicate symptoms", () => {
      const matchedRemedies = [
        {
          remedy: { id: 1, name: "Citron" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
        {
          remedy: { id: 2, name: "Gingembre" },
          matchCount: 1,
          matchedSymptoms: ["fatigue"],
        },
        {
          remedy: { id: 3, name: "Miel" },
          matchCount: 1,
          matchedSymptoms: ["stress"],
        },
      ];

      render(
        <FilterRemedyResult
          matchedRemedies={matchedRemedies}
          onFilterChange={vi.fn()}
        />,
      );

      const fatigueButtons = screen.getAllByText("Fatigue");
      expect(fatigueButtons).toHaveLength(1);
    });
  });
});
