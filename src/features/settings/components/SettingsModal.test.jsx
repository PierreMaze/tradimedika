import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import SettingsModal from "./SettingsModal";
import { ThemeProvider } from "../context/ThemeContext";
import { PerformanceProvider } from "../context/PerformanceContext";

import { CookieConsentProvider } from "../../cookie-consent";

// Wrapper avec tous les providers nécessaires
function TestWrapper({ children }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </PerformanceProvider>
    </ThemeProvider>
  );
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("SettingsModal", () => {
  let mockOnClose;

  beforeEach(() => {
    mockOnClose = vi.fn();
    // Reset body overflow
    document.body.style.overflow = "";
  });

  afterEach(() => {
    // Cleanup
    document.body.style.overflow = "";
  });

  it("should not render when isOpen is false", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={false} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should have correct aria attributes", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "settings-modal-title");
  });

  it("should display modal title", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByText("Paramètres")).toBeInTheDocument();
  });

  it("should display auto-save message", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(
      screen.getByText("Vos préférences sont sauvegardées automatiquement"),
    ).toBeInTheDocument();
  });

  it("should display theme section", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByText("Thème")).toBeInTheDocument();
    expect(screen.getByText("Activer le mode sombre")).toBeInTheDocument();
  });

  it("should display performance section", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByText("Animations")).toBeInTheDocument();
  });

  it("should display performance mode description", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // Par défaut, isHighPerformance = true
    expect(screen.getByText(/activées/i)).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    await user.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // Backdrop a la classe bg-black/60
    const backdrop = container.querySelector(".bg-black\\/60");
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should set body overflow to hidden when modal is open", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body overflow when modal is closed", async () => {
    const { rerender } = render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    // Fermer la modal
    rerender(
      <TestWrapper>
        <SettingsModal isOpen={false} onClose={mockOnClose} />
      </TestWrapper>,
    );

    await waitFor(
      () => {
        expect(document.body.style.overflow).toBe("");
      },
      { timeout: 1000 },
    );
  });

  it("should focus modal when opened", async () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(document.activeElement).toBe(dialog);
    });
  });

  it("should restore focus to previous element when closed", async () => {
    // Créer un bouton pour tester le focus
    const button = document.createElement("button");
    button.textContent = "Test Button";
    document.body.appendChild(button);
    button.focus();

    const previouslyFocused = document.activeElement;

    const { rerender } = render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // Fermer la modal
    rerender(
      <TestWrapper>
        <SettingsModal isOpen={false} onClose={mockOnClose} />
      </TestWrapper>,
    );

    await waitFor(
      () => {
        expect(document.activeElement).toBe(previouslyFocused);
      },
      { timeout: 1000 },
    );

    // Cleanup
    document.body.removeChild(button);
  });

  it("should render DarkModeToggle component", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // DarkModeToggle doit être présent (vérifier via aria-label dynamique)
    expect(
      screen.getByRole("button", {
        name: /(activer|désactiver) le mode sombre/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render PerformanceToggle component", () => {
    render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // PerformanceToggle doit être présent (vérifier via aria-label dynamique)
    expect(
      screen.getByRole("button", {
        name: /passer en mode (performance élevée|économie de performance)/i,
      }),
    ).toBeInTheDocument();
  });

  it("should have settings icon in header", () => {
    const { container } = render(
      <TestWrapper>
        <SettingsModal isOpen={true} onClose={mockOnClose} />
      </TestWrapper>,
    );

    // L'icône IoMdSettings est rendue comme SVG
    const svgIcons = container.querySelectorAll("svg");
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
