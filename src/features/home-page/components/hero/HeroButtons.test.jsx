// src/features/home-page/components/hero/HeroButtons.test.jsx
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Mocks MUST be declared before importing modules that use them.
 * - on mocke le hook de cookie-consent utilisé par le composant.
 * - on mocke useSettingsModal pour éviter l'erreur "must be used within SettingsModalProvider"
 *   (le composant testé ne dépend pas du provider dans ces tests unitaires).
 */
vi.mock("../../../cookie-consent", () => ({
  useCookieConsent: vi.fn(),
}));

vi.mock("../../../settings/context/SettingsModalContext", () => ({
  // retourner des fonctions factices ; le test n'a pas besoin de logique réelle du provider
  useSettingsModal: vi.fn(() => ({
    isOpen: false,
    shouldOpenCookieSection: false,
    openSettings: vi.fn(),
    openSettingsWithCookies: vi.fn(),
    closeSettings: vi.fn(),
    resetCookieSectionFlag: vi.fn(),
  })),
  // exporter un provider passthrough si un test veut entourer (non utilisé ici mais sûr)
  SettingsModalProvider: ({ children }) => children,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCookieConsent } from "../../../cookie-consent";
import HeroButtons from "./HeroButtons";

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
    // reset des mocks entre tests
    vi.clearAllMocks();

    // Par défaut, autoriser l'historique dans la plupart des tests
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
      expect(button).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Interactions", () => {
    it("calls onSubmit when search button clicked", async () => {
      const user = userEvent.setup();
      render(<HeroButtons {...defaultProps} />);

      // Le bouton a un aria-label "Découvrir les remèdes naturels" quand il est activé
      const searchButton = screen.getByRole("button", {
        name: /Découvrir les remèdes naturels/i,
      });
      await user.click(searchButton);

      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });

    it("calls onHistoryOpen when history is accepted", async () => {
      const user = userEvent.setup();
      render(<HeroButtons {...defaultProps} />);

      const historyButton = screen.getByRole("button", { name: /Historique/i });
      await user.click(historyButton);

      expect(defaultProps.onHistoryOpen).toHaveBeenCalledTimes(1);
    });

    it("disables history action when history is not accepted", () => {
      // override mock pour ce test
      useCookieConsent.mockReturnValue({
        isHistoryAccepted: false,
      });

      render(<HeroButtons {...defaultProps} />);

      const button = screen.getByRole("button", { name: /Historique/i });

      // On vérifie l'attribut aria-disabled (le bouton visuel reste un <button>,
      // mais on s'attend à aria-disabled="true" quand history est désactivé)
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
