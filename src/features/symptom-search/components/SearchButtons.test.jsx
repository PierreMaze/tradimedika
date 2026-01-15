import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchButtons from "./SearchButtons";

describe("SearchButtons", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isDisabled: false,
    isLoading: false,
    hasSubmitted: false,
    onHistoryOpen: vi.fn(),
    historyCount: 0,
  };

  describe("Rendering", () => {
    it("should render search button with default text", () => {
      render(<SearchButtons {...defaultProps} />);

      expect(screen.getByText("Découvrir nos solutions")).toBeInTheDocument();
    });

    it("should render history button", () => {
      render(<SearchButtons {...defaultProps} />);

      expect(screen.getByText("Historique")).toBeInTheDocument();
    });

    it("should render both buttons in a flex container", () => {
      const { container } = render(<SearchButtons {...defaultProps} />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
    });
  });

  describe("Search button states", () => {
    it("should display loading state", () => {
      render(<SearchButtons {...defaultProps} isLoading />);

      expect(screen.getByText("Recherche en cours...")).toBeInTheDocument();
      expect(
        screen.queryByText("Découvrir nos solutions"),
      ).not.toBeInTheDocument();
    });

    it("should display completed state with checkmark", () => {
      render(<SearchButtons {...defaultProps} hasSubmitted />);

      expect(screen.getByText("Recherche effectuée")).toBeInTheDocument();
      expect(
        screen.queryByText("Découvrir nos solutions"),
      ).not.toBeInTheDocument();
    });

    it("should show loading spinner when isLoading is true", () => {
      const { container } = render(
        <SearchButtons {...defaultProps} isLoading />,
      );

      // Spinner is a div with border classes
      const spinner = container.querySelector(".border-t-transparent");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("should disable button when isDisabled is true", () => {
      render(<SearchButtons {...defaultProps} isDisabled />);

      const button = screen.getByRole("button", {
        name: /Sélectionnez au moins un symptôme/i,
      });
      expect(button).toBeDisabled();
    });

    it("should disable button when isLoading is true", () => {
      render(<SearchButtons {...defaultProps} isLoading />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes naturels/i,
      });
      expect(button).toBeDisabled();
    });

    it("should apply disabled styles when disabled", () => {
      const { container } = render(
        <SearchButtons {...defaultProps} isDisabled />,
      );

      const button = container.querySelector("button");
      expect(button).toHaveClass("opacity-50");
    });

    it("should not be disabled when neither isDisabled nor isLoading", () => {
      render(<SearchButtons {...defaultProps} />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes/i,
      });
      expect(button).not.toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("should call onSubmit when search button clicked", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();

      render(<SearchButtons {...defaultProps} onSubmit={onSubmit} />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes/i,
      });
      await user.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should not call onSubmit when disabled", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <SearchButtons {...defaultProps} onSubmit={onSubmit} isDisabled />,
      );

      const button = screen.getByRole("button", { name: /Sélectionnez/i });
      await user.click(button);

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("should not call onSubmit when loading", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();

      render(<SearchButtons {...defaultProps} onSubmit={onSubmit} isLoading />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes naturels/i,
      });
      await user.click(button);

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("should call onHistoryOpen when history button clicked", async () => {
      const onHistoryOpen = vi.fn();
      const user = userEvent.setup();

      render(<SearchButtons {...defaultProps} onHistoryOpen={onHistoryOpen} />);

      const button = screen.getByRole("button", { name: /Historique/i });
      await user.click(button);

      expect(onHistoryOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe("History counter badge", () => {
    it("should not show badge when historyCount is 0", () => {
      render(<SearchButtons {...defaultProps} historyCount={0} />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("should show badge when historyCount > 0", () => {
      render(<SearchButtons {...defaultProps} historyCount={5} />);

      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should display correct count in badge", () => {
      render(<SearchButtons {...defaultProps} historyCount={12} />);

      expect(screen.getByText("12")).toBeInTheDocument();
    });

    it("should apply badge styles", () => {
      render(<SearchButtons {...defaultProps} historyCount={3} />);

      const badge = screen.getByText("3");
      expect(badge).toHaveClass("rounded-full");
      expect(badge).toHaveClass("bg-emerald-600");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label when enabled", () => {
      render(<SearchButtons {...defaultProps} />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes naturels/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("should have proper aria-label when disabled", () => {
      render(<SearchButtons {...defaultProps} isDisabled />);

      const button = screen.getByRole("button", {
        name: /Sélectionnez au moins un symptôme/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("should have aria-busy when loading", () => {
      render(<SearchButtons {...defaultProps} isLoading />);

      const button = screen.getByRole("button", {
        name: /Découvrir les remèdes naturels/i,
      });
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("should have aria-disabled when disabled", () => {
      render(<SearchButtons {...defaultProps} isDisabled />);

      const button = screen.getByRole("button", { name: /Sélectionnez/i });
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should include history count in aria-label", () => {
      render(<SearchButtons {...defaultProps} historyCount={5} />);

      const button = screen.getByRole("button", {
        name: /Historique - 5 recherches/i,
      });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("should render arrow icon in default state", () => {
      const { container } = render(<SearchButtons {...defaultProps} />);

      // IoMdArrowForward icon is present
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should render checkmark icon in completed state", () => {
      const { container } = render(
        <SearchButtons {...defaultProps} hasSubmitted />,
      );

      // FaCheck icon is present (checkmark)
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should render history icon in history button", () => {
      render(<SearchButtons {...defaultProps} />);

      // RiHistoryLine icon is present
      const historyButton = screen.getByRole("button", { name: /Historique/i });
      const icon = historyButton.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply primary button styles when enabled", () => {
      const { container } = render(<SearchButtons {...defaultProps} />);

      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-emerald-600");
    });

    it("should apply secondary button styles to history button", () => {
      render(<SearchButtons {...defaultProps} />);

      const button = screen.getByRole("button", { name: /Historique/i });
      expect(button).toHaveClass("ring-2");
      expect(button).toHaveClass("ring-emerald-600");
    });

    it("should have min-width on both buttons", () => {
      const { container } = render(<SearchButtons {...defaultProps} />);

      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("min-w-[280px]");
      });
    });

    it("should have shadow and rounded corners", () => {
      const { container } = render(<SearchButtons {...defaultProps} />);

      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("shadow-lg");
        expect(button).toHaveClass("rounded-lg");
      });
    });
  });

  describe("State transitions", () => {
    it("should transition from default to loading", () => {
      const { rerender } = render(<SearchButtons {...defaultProps} />);

      expect(screen.getByText("Découvrir nos solutions")).toBeInTheDocument();

      rerender(<SearchButtons {...defaultProps} isLoading />);

      expect(screen.getByText("Recherche en cours...")).toBeInTheDocument();
      expect(
        screen.queryByText("Découvrir nos solutions"),
      ).not.toBeInTheDocument();
    });

    it("should transition from loading to completed", () => {
      const { rerender } = render(
        <SearchButtons {...defaultProps} isLoading />,
      );

      expect(screen.getByText("Recherche en cours...")).toBeInTheDocument();

      rerender(<SearchButtons {...defaultProps} hasSubmitted />);

      expect(screen.getByText("Recherche effectuée")).toBeInTheDocument();
      expect(
        screen.queryByText("Recherche en cours..."),
      ).not.toBeInTheDocument();
    });

    it("should transition from completed back to default", () => {
      const { rerender } = render(
        <SearchButtons {...defaultProps} hasSubmitted />,
      );

      expect(screen.getByText("Recherche effectuée")).toBeInTheDocument();

      rerender(<SearchButtons {...defaultProps} />);

      expect(screen.getByText("Découvrir nos solutions")).toBeInTheDocument();
      expect(screen.queryByText("Recherche effectuée")).not.toBeInTheDocument();
    });
  });
});
