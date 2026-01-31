import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExternalLinkProvider } from "../../../features/external-link/context/ExternalLinkContext";
import { useExternalLink } from "../../../features/external-link/hooks/useExternalLink";
import ExternalLink from "./ExternalLink";

vi.mock("../../../features/external-link/hooks/useExternalLink");

describe("ExternalLink", () => {
  it("should render correctly with href and children", () => {
    const mockOpenConfirmation = vi.fn();
    useExternalLink.mockReturnValue({ openConfirmation: mockOpenConfirmation });

    render(
      <ExternalLinkProvider>
        <ExternalLink href="https://example.com">Click me</ExternalLink>
      </ExternalLinkProvider>,
    );

    const link = screen.getByText("Click me");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("should call preventDefault and openConfirmation on click", async () => {
    const mockOpenConfirmation = vi.fn();
    useExternalLink.mockReturnValue({ openConfirmation: mockOpenConfirmation });
    const user = userEvent.setup();

    render(
      <ExternalLinkProvider>
        <ExternalLink href="https://example.com" siteName="Example">
          Click me
        </ExternalLink>
      </ExternalLinkProvider>,
    );

    const link = screen.getByText("Click me");
    await user.click(link);

    expect(mockOpenConfirmation).toHaveBeenCalledWith(
      "https://example.com",
      "Example",
    );
  });

  it("should extract siteName from URL if not provided", async () => {
    const mockOpenConfirmation = vi.fn();
    useExternalLink.mockReturnValue({ openConfirmation: mockOpenConfirmation });
    const user = userEvent.setup();

    render(
      <ExternalLinkProvider>
        <ExternalLink href="https://www.example.com/path">
          Click me
        </ExternalLink>
      </ExternalLinkProvider>,
    );

    const link = screen.getByText("Click me");
    await user.click(link);

    expect(mockOpenConfirmation).toHaveBeenCalledWith(
      "https://www.example.com/path",
      "example.com",
    );
  });

  it("should pass className and other props", () => {
    const mockOpenConfirmation = vi.fn();
    useExternalLink.mockReturnValue({ openConfirmation: mockOpenConfirmation });

    render(
      <ExternalLinkProvider>
        <ExternalLink
          href="https://example.com"
          className="custom-class"
          data-testid="external-link"
        >
          Click me
        </ExternalLink>
      </ExternalLinkProvider>,
    );

    const link = screen.getByTestId("external-link");
    expect(link).toHaveClass("custom-class");
  });

  it("should include rel='noopener noreferrer'", () => {
    const mockOpenConfirmation = vi.fn();
    useExternalLink.mockReturnValue({ openConfirmation: mockOpenConfirmation });

    render(
      <ExternalLinkProvider>
        <ExternalLink href="https://example.com">Click me</ExternalLink>
      </ExternalLinkProvider>,
    );

    const link = screen.getByText("Click me");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
