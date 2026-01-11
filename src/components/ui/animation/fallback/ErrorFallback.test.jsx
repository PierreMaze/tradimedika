import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorFallback from "./ErrorFallback";

describe("ErrorFallback", () => {
  const mockError = new Error("Test error message");
  mockError.stack = "Error stack trace";
  const mockResetErrorBoundary = vi.fn();

  const defaultProps = {
    error: mockError,
    resetErrorBoundary: mockResetErrorBoundary,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render error message", () => {
      render(<ErrorFallback {...defaultProps} />);
      expect(
        screen.getByText("Oups, une erreur s'est produite"),
      ).toBeInTheDocument();
    });

    it("should render error icon", () => {
      render(<ErrorFallback {...defaultProps} />);
      expect(screen.getByText("⚠️")).toBeInTheDocument();
    });

    it("should render description", () => {
      render(<ErrorFallback {...defaultProps} />);
      expect(
        screen.getByText(/Nous sommes désolés, quelque chose s'est mal passé/i),
      ).toBeInTheDocument();
    });

    it("should render reload button", () => {
      render(<ErrorFallback {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: /Recharger la page/i }),
      ).toBeInTheDocument();
    });

    it("should render home button", () => {
      render(<ErrorFallback {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: /Retour à l'accueil/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Error details in dev mode", () => {
    it("should show error details in dev mode", () => {
      vi.stubEnv("DEV", true);
      render(<ErrorFallback {...defaultProps} />);
      expect(
        screen.getByText(/Détails de l'erreur \(dev only\)/i),
      ).toBeInTheDocument();
    });

    it("should display error message in dev mode", () => {
      vi.stubEnv("DEV", true);
      render(<ErrorFallback {...defaultProps} />);
      expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
    });

    it("should show stack trace details in dev mode", () => {
      vi.stubEnv("DEV", true);
      render(<ErrorFallback {...defaultProps} />);
      expect(screen.getByText("Stack trace")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call resetErrorBoundary when reload button clicked", async () => {
      const user = userEvent.setup();
      render(<ErrorFallback {...defaultProps} />);

      await user.click(
        screen.getByRole("button", { name: /Recharger la page/i }),
      );
      expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
    });

    it("should navigate to home when home button clicked", async () => {
      const user = userEvent.setup();
      delete window.location;
      window.location = { href: "" };

      render(<ErrorFallback {...defaultProps} />);

      await user.click(
        screen.getByRole("button", { name: /Retour à l'accueil/i }),
      );
      expect(window.location.href).toBe("/");
    });
  });

  describe("Styling", () => {
    it("should have centered layout", () => {
      const { container } = render(<ErrorFallback {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("flex");
      expect(wrapper?.className).toContain("items-center");
      expect(wrapper?.className).toContain("justify-center");
    });

    it("should have min-h-screen", () => {
      const { container } = render(<ErrorFallback {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("min-h-screen");
    });

    it("should support dark mode", () => {
      const { container } = render(<ErrorFallback {...defaultProps} />);
      expect(container.innerHTML).toContain("dark:");
    });
  });

  describe("Accessibility", () => {
    it("should have reload button with accessible name", () => {
      render(<ErrorFallback {...defaultProps} />);
      const reloadButton = screen.getByRole("button", {
        name: /Recharger la page/i,
      });
      expect(reloadButton).toBeInTheDocument();
    });

    it("should have home button with accessible name", () => {
      render(<ErrorFallback {...defaultProps} />);
      const homeButton = screen.getByRole("button", {
        name: /Retour à l'accueil/i,
      });
      expect(homeButton).toBeInTheDocument();
    });

    it("should have focus ring on buttons", () => {
      const { container } = render(<ErrorFallback {...defaultProps} />);
      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        expect(button.className).toContain("focus:ring");
      });
    });
  });
});
