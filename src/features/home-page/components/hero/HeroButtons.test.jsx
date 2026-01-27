import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCookieConsent } from "../../../cookie-consent";
import HeroButtons from "./HeroButtons";

// 🔴 MOCK CRITIQUE
vi.mock("../../../cookie-consent", () => ({
  useCookieConsent: vi.fn(),
}));

describe("HeroButtons", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isDisabled: false,
    isLoading: false,
    hasSubmitted: false,
    onHistoryOpen: vi.fn(),
    historyCount: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useCookieConsent.mockReturnValue({
      isHistoryAccepted: true,
    });
  });

  describe("Rendering", () => {
    it("renders search button with default text", () => {
      render(<HeroButtons {...defaultProps} />);
      expect(screen.getByText("Découvrir nos solutions")).toBeInTheDocument();
    });

    it("renders history button", () => {
      render(<HeroButtons {...defaultProps} />);
      expect(screen.getByText("Historique")).toBeInTheDocument();
    });
  });

  describe("Search button states", () => {
    it("displays loading state", () => {
      render(<HeroButtons {...defaultProps} isLoading />);
      expect(screen.getByText("Recherche en cours...")).toBeInTheDocument();
    });

    it("displays completed state", () => {
      render(<HeroButtons {...defaultProps} hasSubmitted />);
      expect(screen.getByText("Recherche effectuée")).toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("disables button when isDisabled is true", () => {
      render(<HeroButtons {...defaultProps} isDisabled />);
      const button = screen.getByRole("button", {
        name: /Sélectionnez au moins un symptôme/i,
      });
      expect(button).toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("calls onSubmit when search button clicked", async () => {
      const user = userEvent.setup();
      render(<HeroButtons {...defaultProps} />);
      await user.click(
        screen.getByRole("button", {
          name: /Découvrir les remèdes naturels/i,
        }),
      );
      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });

    it("calls onHistoryOpen when history is accepted", async () => {
      const user = userEvent.setup();
      render(<HeroButtons {...defaultProps} />);
      await user.click(screen.getByRole("button", { name: /Historique/i }));
      expect(defaultProps.onHistoryOpen).toHaveBeenCalledTimes(1);
    });

    it("disables history action when history is not accepted", () => {
      useCookieConsent.mockReturnValue({
        isHistoryAccepted: false,
      });

      render(<HeroButtons {...defaultProps} />);

      const button = screen.getByRole("button", { name: /Historique/i });

      expect(button).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("History badge", () => {
    it("shows badge when historyCount > 0 and accepted", () => {
      render(<HeroButtons {...defaultProps} historyCount={5} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("does not show badge when history is not accepted", () => {
      useCookieConsent.mockReturnValueOnce({
        isHistoryAccepted: false,
      });

      render(<HeroButtons {...defaultProps} historyCount={5} />);
      expect(screen.queryByText("5")).not.toBeInTheDocument();
    });
  });
});
