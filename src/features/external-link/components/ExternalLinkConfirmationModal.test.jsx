import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useExternalLink } from "../hooks/useExternalLink";
import ExternalLinkConfirmationModal from "./ExternalLinkConfirmationModal";

vi.mock("../hooks/useExternalLink");

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

vi.mock("../../settings/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

describe("ExternalLinkConfirmationModal", () => {
  const mockCloseConfirmation = vi.fn();
  const mockConfirmAndNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  it("should not render when isOpen is false", () => {
    useExternalLink.mockReturnValue({
      isOpen: false,
      siteName: "",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const { container } = render(<ExternalLinkConfirmationModal />);
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("should render modal when isOpen is true", () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    render(<ExternalLinkConfirmationModal />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Vous quittez TradiMedika")).toBeInTheDocument();
  });

  it("should display siteName in message", () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    render(<ExternalLinkConfirmationModal />);

    expect(screen.getByText(/Example Site/i)).toBeInTheDocument();
  });

  it("should have correct ARIA attributes", () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    render(<ExternalLinkConfirmationModal />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("should call closeConfirmation when cancel button is clicked", async () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const user = userEvent.setup();
    render(<ExternalLinkConfirmationModal />);

    const cancelButton = screen.getByText("Annuler");
    await user.click(cancelButton);

    expect(mockCloseConfirmation).toHaveBeenCalledTimes(1);
  });

  it("should call confirmAndNavigate when continue button is clicked", async () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const user = userEvent.setup();
    render(<ExternalLinkConfirmationModal />);

    const continueButton = screen.getByText("Continuer");
    await user.click(continueButton);

    expect(mockConfirmAndNavigate).toHaveBeenCalledTimes(1);
  });

  it("should call closeConfirmation when backdrop is clicked", async () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const user = userEvent.setup();
    const { container } = render(<ExternalLinkConfirmationModal />);

    const backdrop = container.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      await user.click(backdrop);
      expect(mockCloseConfirmation).toHaveBeenCalled();
    }
  });

  it("should call closeConfirmation when Escape key is pressed", async () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const user = userEvent.setup();
    render(<ExternalLinkConfirmationModal />);

    await user.keyboard("{Escape}");

    expect(mockCloseConfirmation).toHaveBeenCalledTimes(1);
  });

  it("should block body scroll when modal is open", () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    render(<ExternalLinkConfirmationModal />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body scroll when modal is closed", () => {
    const { rerender } = render(<ExternalLinkConfirmationModal />);

    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    rerender(<ExternalLinkConfirmationModal />);
    expect(document.body.style.overflow).toBe("hidden");

    useExternalLink.mockReturnValue({
      isOpen: false,
      siteName: "",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    rerender(<ExternalLinkConfirmationModal />);
    expect(document.body.style.overflow).toBe("");
  });

  it("should display close button with accessible label", () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    render(<ExternalLinkConfirmationModal />);

    const closeButton = screen.getByLabelText(
      "Fermer la fenêtre de confirmation",
    );
    expect(closeButton).toBeInTheDocument();
  });

  it("should call closeConfirmation when close button is clicked", async () => {
    useExternalLink.mockReturnValue({
      isOpen: true,
      siteName: "Example Site",
      closeConfirmation: mockCloseConfirmation,
      confirmAndNavigate: mockConfirmAndNavigate,
    });

    const user = userEvent.setup();
    render(<ExternalLinkConfirmationModal />);

    const closeButton = screen.getByLabelText(
      "Fermer la fenêtre de confirmation",
    );
    await user.click(closeButton);

    expect(mockCloseConfirmation).toHaveBeenCalledTimes(1);
  });
});
