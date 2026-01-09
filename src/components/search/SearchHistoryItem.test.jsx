// components/search/SearchHistoryItem.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchHistoryItem from "./SearchHistoryItem";

// Mock useReducedMotion hook
vi.mock("../../hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe("SearchHistoryItem", () => {
  const mockSearch = {
    id: "123-abc",
    symptoms: ["fatigue", "stress"],
    timestamp: Date.now() - 5 * 60 * 1000, // 5 minutes ago
    resultCount: 3,
  };

  const mockOnClick = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render search history item", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should display all symptoms as pills", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      expect(screen.getByText("Stress")).toBeInTheDocument();
    });

    it("should capitalize symptom names", () => {
      const search = {
        id: "456",
        symptoms: ["mal de tête", "diarrhée"],
        timestamp: Date.now(),
        resultCount: 2,
      };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText("Mal de tête")).toBeInTheDocument();
      expect(screen.getByText("Diarrhée")).toBeInTheDocument();
    });

    it("should display result count", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText(/3 résultats/)).toBeInTheDocument();
    });

    it("should display singular form for 1 result", () => {
      const search = { ...mockSearch, resultCount: 1 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText(/1 résultat/)).toBeInTheDocument();
    });

    it("should handle undefined resultCount", () => {
      const search = { ...mockSearch, resultCount: undefined };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      // Result count section should not be rendered
      expect(screen.queryByText(/résultat/)).not.toBeInTheDocument();
    });

    it("should display relative time", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      // 5 minutes ago (with space between number and unit)
      expect(screen.getByText(/il y a 5 min/)).toBeInTheDocument();
    });

    it("should format time correctly for different durations", () => {
      const testCases = [
        { offset: 1000, expected: /à l'instant/ }, // 1 second
        { offset: 2 * 60 * 1000, expected: /il y a 2 min/ }, // 2 minutes (with space)
        { offset: 3 * 60 * 60 * 1000, expected: /il y a 3h/ }, // 3 hours (no space)
        { offset: 2 * 24 * 60 * 60 * 1000, expected: /il y a 2j/ }, // 2 days (no space)
      ];

      testCases.forEach(({ offset, expected }) => {
        const search = { ...mockSearch, timestamp: Date.now() - offset };
        const { unmount } = render(
          <SearchHistoryItem
            search={search}
            onClick={mockOnClick}
            onRemove={mockOnRemove}
          />,
        );

        expect(screen.getByText(expected)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Interactions", () => {
    it("should call onClick when item is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const button = screen.getByLabelText(/Relancer la recherche/);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(mockSearch);
    });

    it("should call onRemove when delete button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const deleteButton = screen.getByLabelText(/Supprimer cette recherche/);
      await user.click(deleteButton);

      expect(mockOnRemove).toHaveBeenCalledTimes(1);
      expect(mockOnRemove).toHaveBeenCalledWith(mockSearch.id);
      expect(mockOnClick).not.toHaveBeenCalled(); // Should not trigger onClick
    });

    it("should prevent onClick when delete button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const deleteButton = screen.getByLabelText(/Supprimer cette recherche/);
      await user.click(deleteButton);

      // Only onRemove should be called, not onClick
      expect(mockOnRemove).toHaveBeenCalledTimes(1);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA label for main button", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const button = screen.getByLabelText(
        "Relancer la recherche : fatigue, stress",
      );
      expect(button).toBeInTheDocument();
    });

    it("should have proper ARIA label for delete button", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const deleteButton = screen.getByLabelText("Supprimer cette recherche");
      expect(deleteButton).toBeInTheDocument();
    });

    it("should have semantic time element", () => {
      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const timeElement = screen.getByText(/il y a/).closest("time");
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveAttribute("dateTime");
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const mainButton = screen.getByLabelText(/Relancer la recherche/);
      const deleteButton = screen.getByLabelText(/Supprimer cette recherche/);

      // Tab to delete button (first in DOM)
      await user.tab();
      expect(deleteButton).toHaveFocus();

      // Press Enter to trigger onRemove
      await user.keyboard("{Enter}");
      expect(mockOnRemove).toHaveBeenCalledTimes(1);

      // Tab to main button
      await user.tab();
      expect(mainButton).toHaveFocus();

      // Press Enter to trigger onClick
      await user.keyboard("{Enter}");
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Filtered Count Display", () => {
    it("should display filtered count when present", () => {
      const search = { ...mockSearch, resultCount: 5, filteredCount: 2 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText(/5 résultats/)).toBeInTheDocument();
      expect(screen.getByText("2 remèdes masqués")).toBeInTheDocument();
    });

    it("should display singular form for 1 filtered remedy", () => {
      const search = { ...mockSearch, resultCount: 3, filteredCount: 1 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText("1 remède masqué")).toBeInTheDocument();
    });

    it("should not display filtered count when zero", () => {
      const search = { ...mockSearch, resultCount: 5, filteredCount: 0 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.queryByText(/remède masqué/)).not.toBeInTheDocument();
      expect(screen.queryByText(/remèdes masqués/)).not.toBeInTheDocument();
    });

    it("should not display filtered count when undefined", () => {
      const search = {
        ...mockSearch,
        resultCount: 5,
        filteredCount: undefined,
      };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.queryByText(/remède masqué/)).not.toBeInTheDocument();
      expect(screen.queryByText(/remèdes masqués/)).not.toBeInTheDocument();
    });

    it("should use yellow color for filtered count", () => {
      const search = { ...mockSearch, resultCount: 5, filteredCount: 2 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      const filteredText = screen.getByText("2 remèdes masqués");
      expect(filteredText).toHaveClass("text-yellow-600");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty symptoms array", () => {
      const search = { ...mockSearch, symptoms: [] };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should handle very long symptom names", () => {
      const search = {
        ...mockSearch,
        symptoms: [
          "symptôme très très très long qui pourrait dépasser la largeur",
        ],
      };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(
        screen.getByText(/Symptôme très très très long/),
      ).toBeInTheDocument();
    });

    it("should handle many symptoms", () => {
      const search = {
        ...mockSearch,
        symptoms: ["symptom1", "symptom2", "symptom3", "symptom4", "symptom5"],
      };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText("Symptom1")).toBeInTheDocument();
      expect(screen.getByText("Symptom2")).toBeInTheDocument();
      expect(screen.getByText("Symptom3")).toBeInTheDocument();
      expect(screen.getByText("Symptom4")).toBeInTheDocument();
      expect(screen.getByText("Symptom5")).toBeInTheDocument();
    });

    it("should handle zero results", () => {
      const search = { ...mockSearch, resultCount: 0 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText(/0 résultat/)).toBeInTheDocument();
    });

    it("should handle very large result counts", () => {
      const search = { ...mockSearch, resultCount: 999 };

      render(
        <SearchHistoryItem
          search={search}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      expect(screen.getByText(/999 résultats/)).toBeInTheDocument();
    });
  });

  describe("Animations", () => {
    it("should apply motion animations by default", () => {
      const { container } = render(
        <SearchHistoryItem
          search={mockSearch}
          onClick={mockOnClick}
          onRemove={mockOnRemove}
        />,
      );

      // Check if motion.li is rendered (has data-projection-id from Framer Motion)
      const listItem = container.querySelector("li");
      expect(listItem).toBeInTheDocument();
    });
  });
});
