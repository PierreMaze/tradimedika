import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { ExternalLinkProvider } from "../../../features/external-link/context/ExternalLinkContext";
import { useExternalLink } from "../../../features/external-link/hooks/useExternalLink";
import Button from "./Button";

vi.mock("../../../features/external-link/hooks/useExternalLink");

describe("Button", () => {
  describe("Rendering", () => {
    it("should render as HTML button by default", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Click me");
    });

    it("should render with primary variant by default", () => {
      const { container } = render(<Button>Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("bg-emerald-600");
    });

    it("should render with secondary variant", () => {
      const { container } = render(
        <Button variant="secondary">Click me</Button>,
      );
      const button = container.querySelector("button");
      expect(button?.className).toContain("border-emerald-600");
      expect(button?.className).toContain("bg-transparent");
    });

    it("should render with danger variant", () => {
      const { container } = render(<Button variant="danger">Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("border-red-700");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Button className="custom-class">Click me</Button>,
      );
      const button = container.querySelector("button");
      expect(button?.className).toContain("custom-class");
    });

    it("should have minimum height of 44px (WCAG 2.2)", () => {
      const { container } = render(<Button>Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("min-h-[44px]");
    });
  });

  describe("Type: button (HTML)", () => {
    it("should have button type by default", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should support submit type", () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should call onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={onClick} disabled>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(onClick).not.toHaveBeenCalled();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Type: link (React Router)", () => {
    it("should render as Link when as='link'", () => {
      render(
        <BrowserRouter>
          <Button as="link" to="/test">
            Click me
          </Button>
        </BrowserRouter>,
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
    });

    it("should pass state to Link", () => {
      render(
        <BrowserRouter>
          <Button as="link" to="/test" state={{ from: "home" }}>
            Click me
          </Button>
        </BrowserRouter>,
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("should apply variant classes to Link", () => {
      const { container } = render(
        <BrowserRouter>
          <Button as="link" to="/test" variant="secondary">
            Click me
          </Button>
        </BrowserRouter>,
      );

      const link = container.querySelector("a");
      expect(link?.className).toContain("border-emerald-600");
    });
  });

  describe("Type: external", () => {
    it("should render as ExternalLink when as='external'", () => {
      const mockOpenConfirmation = vi.fn();
      useExternalLink.mockReturnValue({
        openConfirmation: mockOpenConfirmation,
      });

      render(
        <ExternalLinkProvider>
          <Button as="external" href="https://example.com" siteName="Example">
            Click me
          </Button>
        </ExternalLinkProvider>,
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("should call openConfirmation on click", async () => {
      const mockOpenConfirmation = vi.fn();
      useExternalLink.mockReturnValue({
        openConfirmation: mockOpenConfirmation,
      });
      const user = userEvent.setup();

      render(
        <ExternalLinkProvider>
          <Button as="external" href="https://example.com" siteName="Example">
            Click me
          </Button>
        </ExternalLinkProvider>,
      );

      const link = screen.getByRole("link");
      await user.click(link);

      expect(mockOpenConfirmation).toHaveBeenCalledWith(
        "https://example.com",
        "Example",
      );
    });
  });

  describe("Icon support", () => {
    it("should render icon on left by default", () => {
      const { container } = render(<Button icon={HiArrowLeft}>Back</Button>);

      const button = container.querySelector("button");
      const svg = button?.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass("h-5", "w-5");
    });

    it("should render icon on right when iconPosition='right'", () => {
      const { container } = render(
        <Button icon={HiArrowLeft} iconPosition="right">
          Next
        </Button>,
      );

      const button = container.querySelector("button");
      const svg = button?.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should have aria-hidden on icon", () => {
      const { container } = render(<Button icon={HiArrowLeft}>Back</Button>);

      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Loading state", () => {
    it("should show spinner when isLoading=true", () => {
      const { container } = render(<Button isLoading>Click me</Button>);

      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("should show loadingText when isLoading=true", () => {
      render(
        <Button isLoading loadingText="En cours...">
          Click me
        </Button>,
      );

      expect(screen.getByText("En cours...")).toBeInTheDocument();
      expect(screen.queryByText("Click me")).not.toBeInTheDocument();
    });

    it("should disable button when isLoading=true", () => {
      render(<Button isLoading>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should have aria-busy=true when loading", () => {
      render(<Button isLoading>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("should not call onClick when loading", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={onClick} isLoading>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should support aria-label", () => {
      render(<Button ariaLabel="Custom label">X</Button>);
      const button = screen.getByLabelText("Custom label");
      expect(button).toBeInTheDocument();
    });

    it("should have focus ring classes", () => {
      const { container } = render(<Button>Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("focus:ring-2");
      expect(button?.className).toContain("focus:outline-none");
    });

    it("should have disabled cursor when disabled", () => {
      const { container } = render(<Button disabled>Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("disabled:cursor-not-allowed");
      expect(button?.className).toContain("disabled:opacity-50");
    });
  });

  describe("Dark mode", () => {
    it("should have dark mode classes for primary variant", () => {
      const { container } = render(<Button variant="primary">Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("dark:bg-emerald-800");
    });

    it("should have dark mode classes for secondary variant", () => {
      const { container } = render(
        <Button variant="secondary">Click me</Button>,
      );
      const button = container.querySelector("button");
      expect(button?.className).toContain("dark:text-emerald-500");
    });

    it("should have dark mode classes for danger variant", () => {
      const { container } = render(<Button variant="danger">Click me</Button>);
      const button = container.querySelector("button");
      expect(button?.className).toContain("dark:bg-red-900/30");
    });
  });
});
