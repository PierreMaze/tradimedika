// src/features/settings/components/SettingsButton.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropTypes from "prop-types";
import { describe, expect, it } from "vitest";
import { PerformanceProvider } from "../context/PerformanceContext";
import { SettingsModalProvider } from "../context/SettingsModalContext"; // ajouté
import { ThemeProvider } from "../context/ThemeContext";
import SettingsButton from "./SettingsButton";

// Wrapper avec tous les providers nécessaires
function TestWrapper({ children }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <SettingsModalProvider>{children}</SettingsModalProvider>
      </PerformanceProvider>
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

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SettingsButton />
      </TestWrapper>,
    );

    const settingsButton = screen.getByRole("button", { name: /paramètres/i });
    await user.click(settingsButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

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
        <SettingsButton />
      </TestWrapper>,
    );

    const settingsButton = screen.getByRole("button", { name: /paramètres/i });
    await user.click(settingsButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

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
