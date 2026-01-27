import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsentProvider } from "../../cookie-consent";
import { PerformanceProvider } from "../context/PerformanceContext";
import {
  SettingsModalProvider,
  useSettingsModal,
} from "../context/SettingsModalContext";
import { ThemeProvider } from "../context/ThemeContext";
import SettingsModal from "./SettingsModal";

// Wrapper avec tous les providers nécessaires
function TestWrapper({ children }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <CookieConsentProvider>
          <SettingsModalProvider>{children}</SettingsModalProvider>
        </CookieConsentProvider>
      </PerformanceProvider>
    </ThemeProvider>
  );
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// Petit contrôleur pour ouvrir/fermer la modal via le provider
function OpenSettingsButton() {
  const { openSettings, openSettingsWithCookies, closeSettings } =
    useSettingsModal();
  return (
    <>
      <button onClick={openSettings}>open-settings</button>
      <button onClick={openSettingsWithCookies}>
        open-settings-with-cookies
      </button>
      <button onClick={closeSettings}>close-settings</button>
    </>
  );
}

describe("SettingsModal", () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = "";
  });

  afterEach(() => {
    // Cleanup
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(
      <TestWrapper>
        <SettingsModal />
      </TestWrapper>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when opened via provider", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should have correct aria attributes", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "settings-modal-title");
  });

  it("should display modal title", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));
    expect(screen.getByText("Paramètres")).toBeInTheDocument();
  });

  it("should display auto-save message", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));
    expect(
      screen.getByText("Vos préférences sont sauvegardées automatiquement"),
    ).toBeInTheDocument();
  });

  it("should display theme section", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    expect(screen.getByText("Thème")).toBeInTheDocument();
    expect(screen.getByText("Activer le mode sombre")).toBeInTheDocument();
  });

  it("should display performance section", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    expect(screen.getByText("Animations")).toBeInTheDocument();
  });

  it("should display performance mode description", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    // Par défaut, isHighPerformance = true (provider default)
    expect(screen.getByText(/activées/i)).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("should close modal when Escape key is pressed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    await user.keyboard("{Escape}");

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("should call close when backdrop is clicked", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    const backdrop = container.querySelector(".bg-black\\/60");
    expect(backdrop).toBeInTheDocument();

    await user.click(backdrop);

    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("should set body overflow to hidden when modal is open", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body overflow when modal is closed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));
    expect(document.body.style.overflow).toBe("hidden");

    // Fermer la modal via close button
    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    await waitFor(
      () => {
        expect(document.body.style.overflow).toBe("");
      },
      { timeout: 1000 },
    );
  });

  it("should focus modal when opened", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(document.activeElement).toBe(dialog);
    });
  });

  it("should restore focus to previous element when closed", async () => {
    const user = userEvent.setup();

    // Créer un bouton pour tester le focus
    const button = document.createElement("button");
    button.textContent = "Test Button";
    document.body.appendChild(button);
    button.focus();

    const previouslyFocused = document.activeElement;

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    // Ouvrir puis fermer
    await user.click(screen.getByText("open-settings"));

    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    // Accept either the original previouslyFocused element OR the provider's open-settings button
    const openBtn = screen.getByText("open-settings");

    await waitFor(
      () => {
        expect([previouslyFocused, openBtn]).toContain(document.activeElement);
      },
      { timeout: 1000 },
    );

    // Cleanup
    document.body.removeChild(button);
  });

  it("should render DarkModeToggle component", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    expect(
      screen.getByRole("button", {
        name: /(activer|désactiver) le mode sombre/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render PerformanceToggle component", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    expect(
      screen.getByRole("button", {
        name: /passer en mode (performance élevée|économie de performance)/i,
      }),
    ).toBeInTheDocument();
  });

  it("should have settings icon in header", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <TestWrapper>
        <OpenSettingsButton />
        <SettingsModal />
      </TestWrapper>,
    );

    await user.click(screen.getByText("open-settings"));

    // L'icône IoMdSettings est rendue comme SVG
    const svgIcons = container.querySelectorAll("svg");
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
