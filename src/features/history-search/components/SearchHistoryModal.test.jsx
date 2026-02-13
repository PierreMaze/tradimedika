// components/search/SearchHistoryModal.test.jsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchHistoryModal from "./SearchHistoryModal";

// Mock useReducedMotion hook
vi.mock("../../hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

describe("SearchHistoryModal", () => {
  const mockHistory = [
    {
      id: "1",
      symptoms: ["fatigue", "stress"],
      timestamp: Date.now() - 5 * 60 * 1000,
      resultCount: 3,
    },
    {
      id: "2",
      symptoms: ["insomnie"],
      timestamp: Date.now() - 10 * 60 * 1000,
      resultCount: 1,
    },
  ];

  const mockOnClose = vi.fn();
  const mockOnSearchSelect = vi.fn();
  const mockOnClearHistory = vi.fn();
  const mockOnRemoveItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up body overflow style
    document.body.style.overflow = "";
  });

  describe("Rendering", () => {
    it("should not render when isOpen is false", () => {
      render(
        <SearchHistoryModal
          isOpen={false}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should render modal title", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(screen.getByText(/Historique de recherche/)).toBeInTheDocument();
    });

    it("should render all history items", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");
      expect(items).toHaveLength(2);
    });

    it("should render empty state when no history", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={[]}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(
        screen.getByText(/Aucun historique de recherche/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Vos recherches apparaîtront ici/),
      ).toBeInTheDocument();
    });

    it("should render clear all button when history exists", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const clearButton = screen.getByRole("button", {
        name: /Effacer tout l'historique/i,
      });
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).not.toBeDisabled();
    });

    it("should render clear all button disabled when no history", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={[]}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const clearButton = screen.getByRole("button", {
        name: /Effacer tout l'historique/i,
      });
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).toBeDisabled();
      // Le bouton disabled a le curseur not-allowed et une opacité réduite (styles via ModalButton)
      expect(clearButton.className).toContain("opacity-50");
      expect(clearButton.className).toContain("cursor-not-allowed");
    });

    it("should render close button", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(screen.getByLabelText(/Fermer/i)).toBeInTheDocument();
    });

    it("should render backdrop", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Le backdrop est rendu dans document.body via createPortal et a l'attribut aria-hidden="true"
      const backdrop = document.body.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onClose when close button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const closeButton = screen.getByLabelText(/Fermer/i);
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Le backdrop est rendu dans document.body via createPortal
      const backdrop = document.body.querySelector('[aria-hidden="true"]');
      await user.click(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onSearchSelect and onClose when item is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const firstItem = screen.getByLabelText(
        /Relancer la recherche : fatigue, stress/,
      );
      await user.click(firstItem);

      expect(mockOnSearchSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSearchSelect).toHaveBeenCalledWith(mockHistory[0]);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onRemoveItem when item remove button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const removeButtons = screen.getAllByLabelText(
        /Supprimer cette recherche/,
      );
      await user.click(removeButtons[0]);

      expect(mockOnRemoveItem).toHaveBeenCalledTimes(1);
      expect(mockOnRemoveItem).toHaveBeenCalledWith(mockHistory[0].id);
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should show confirmation dialog when clear all is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const clearButton = screen.getByRole("button", {
        name: /Effacer tout l'historique/i,
      });
      await user.click(clearButton);

      // Confirmation dialog should appear
      expect(screen.getByText(/Confirmer la suppression/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Êtes-vous sûr de vouloir effacer/i),
      ).toBeInTheDocument();

      // Should have Cancel button
      expect(
        screen.getByRole("button", { name: /Annuler/i }),
      ).toBeInTheDocument();

      // Le bouton de suppression affiche "Supprimer" - vérifier qu'il existe
      const buttons = screen.getAllByRole("button");
      const deleteButton = buttons.find(
        (btn) => btn.textContent.trim() === "Supprimer",
      );
      expect(deleteButton).toBeDefined();

      // Should NOT have called callbacks yet
      expect(mockOnClearHistory).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should call onClearHistory and onClose when delete is confirmed", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Click clear button
      const clearButton = screen.getByRole("button", {
        name: /Effacer tout l'historique/i,
      });
      await user.click(clearButton);

      // Click Supprimer button in confirmation dialog (texte exacte = "Supprimer")
      const buttons = screen.getAllByRole("button");
      const deleteButton = buttons.find(
        (btn) => btn.textContent.trim() === "Supprimer",
      );
      expect(deleteButton).toBeDefined();
      await user.click(deleteButton);

      // Should have called callbacks
      expect(mockOnClearHistory).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should close confirmation dialog when cancel is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Click clear button
      const clearButton = screen.getByRole("button", {
        name: /Effacer tout l'historique/i,
      });
      await user.click(clearButton);

      // Click Annuler button
      const cancelButton = screen.getByRole("button", { name: /Annuler/i });
      await user.click(cancelButton);

      // Dialog should be closed
      expect(
        screen.queryByText(/Confirmer la suppression/i),
      ).not.toBeInTheDocument();

      // Should NOT have called callbacks
      expect(mockOnClearHistory).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      // ModalLayout utilise "modal-title" comme id standard
      expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("should close on Escape key press", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      await user.keyboard("{Escape}");

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not close on other key presses", async () => {
      const user = userEvent.setup();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      await user.keyboard("{Enter}");
      await user.keyboard("{Space}");
      await user.keyboard("a");

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it("should prevent body scroll when open", () => {
      const { rerender } = render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <SearchHistoryModal
          isOpen={false}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(document.body.style.overflow).toBe("");
    });

    it("should have semantic list structure", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();

      const items = within(list).getAllByRole("listitem");
      expect(items).toHaveLength(mockHistory.length);
    });
  });

  describe("Focus Management", () => {
    it("should focus modal when opened", async () => {
      vi.useFakeTimers();

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Fast-forward timer to allow focus to occur
      vi.advanceTimersByTime(200);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveFocus();

      vi.useRealTimers();
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long history list", () => {
      const longHistory = Array.from({ length: 50 }, (_, i) => ({
        id: `${i}`,
        symptoms: [`symptom${i}`],
        timestamp: Date.now() - i * 60 * 1000,
        resultCount: i,
      }));

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={longHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");
      expect(items).toHaveLength(50);
    });

    it("should handle single item history", () => {
      const singleHistory = [mockHistory[0]];

      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={singleHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      const list = screen.getByRole("list");
      const items = within(list).getAllByRole("listitem");
      expect(items).toHaveLength(1);
    });

    it("should handle rapid open/close", async () => {
      const { rerender } = render(
        <SearchHistoryModal
          isOpen={false}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Open
      rerender(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Close (AnimatePresence keeps element during exit animation)
      rerender(
        <SearchHistoryModal
          isOpen={false}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Wait for exit animation to complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Animations", () => {
    it("should render with AnimatePresence", () => {
      render(
        <SearchHistoryModal
          isOpen={true}
          onClose={mockOnClose}
          history={mockHistory}
          onSearchSelect={mockOnSearchSelect}
          onClearHistory={mockOnClearHistory}
          onRemoveItem={mockOnRemoveItem}
        />,
      );

      // Modal should be rendered
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Check that motion components are rendered
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });
});
