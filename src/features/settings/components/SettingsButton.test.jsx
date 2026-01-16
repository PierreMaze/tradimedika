import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import SettingsButton from "./SettingsButton";
import { ThemeProvider } from "../context/ThemeContext";
import { PerformanceProvider } from "../context/PerformanceContext";

// Wrapper avec tous les providers nécessaires
function TestWrapper({ children }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>{children}</PerformanceProvider>
    </ThemeProvider>
  );
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("SettingsButton", () => {
  it("should render settings button with correct icon", () => {
    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    const button = screen.getByRole("button", { name: /paramètres/i });
    expect(button).toBeInTheDocument();
  });

  it("should have correct aria-label", () => {
    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Ouvrir les paramètres");
  });

  it("should not show modal initially", () => {
    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    // Modal ne doit pas être visible initialement
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should open modal when button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    const button = screen.getByRole("button", { name: /paramètres/i });
    await user.click(button);

    // Modal doit être visible après le clic
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    // Ouvrir la modal
    const settingsButton = screen.getByRole("button", { name: /paramètres/i });
    await user.click(settingsButton);

    // Vérifier que la modal est ouverte
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Cliquer sur le bouton de fermeture
    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    // Attendre que la modal soit fermée (animation Framer Motion)
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
        <SettingsButton />
      </TestWrapper>,
    );

    // Ouvrir la modal
    const settingsButton = screen.getByRole("button", { name: /paramètres/i });
    await user.click(settingsButton);

    // Vérifier que la modal est ouverte
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Presser Escape
    await user.keyboard("{Escape}");

    // Attendre que la modal soit fermée (animation Framer Motion)
    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("should apply hover styles on button", () => {
    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("group");
  });
});
