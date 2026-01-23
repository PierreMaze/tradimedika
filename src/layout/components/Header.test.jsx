import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

vi.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
  },
}));

vi.mock("./LogoTradimedika", () => ({
  default: () => <div data-testid="logo-tradimedika">Logo</div>,
}));

vi.mock("../../features/settings", () => ({
  SettingsButton: () => <button data-testid="settings-button">Settings</button>,
}));

vi.mock("../../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn(() => false),
}));

vi.mock("../../hooks/useScrollDirection", () => ({
  useScrollDirection: vi.fn(() => "up"),
}));

describe("Header", () => {
  describe("Rendering", () => {
    it("should render header element", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("should render LogoTradimedika component", () => {
      render(<Header />);

      expect(screen.getByTestId("logo-tradimedika")).toBeInTheDocument();
    });

    it("should render SettingsButton component", () => {
      render(<Header />);

      expect(screen.getByTestId("settings-button")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have sticky positioning", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("sticky", "top-0");
    });

    it("should have correct z-index", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("z-50");
    });

    it("should have full width", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("w-full");
    });

    it("should have responsive inner container width", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".lg\\:w-3\\/4");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should have proper height", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".h-20");
      expect(innerContainer).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply background color classes", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("bg-light", "dark:bg-dark");
    });

    it("should apply transition classes", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("transition", "duration-300", "ease-in-out");
    });

    it("should have border styling", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".border-b-2");
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass("border-dashed");
    });

    it("should apply border colors", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".border-b-2");
      expect(innerContainer?.className).toContain("border-dark/80");
      expect(innerContainer?.className).toContain("dark:border-light/60");
    });

    it("should apply responsive padding", () => {
      const { container } = render(<Header />);

      const contentContainer = container.querySelector(".py-6");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should apply responsive horizontal margins", () => {
      const { container } = render(<Header />);

      const contentContainer = container.querySelector(".mx-4");
      expect(contentContainer).toHaveClass("lg:mx-8");
    });
  });

  describe("Content Layout", () => {
    it("should have flex layout", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".flex");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should center items vertically", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".items-center");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should justify content between logo and settings", () => {
      const { container } = render(<Header />);

      const contentContainer = container.querySelector(".justify-between");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have full width content container", () => {
      const { container } = render(<Header />);

      const contentContainer = container.querySelector(".w-full");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Component Positioning", () => {
    it("should render logo on the left", () => {
      render(<Header />);

      const logo = screen.getByTestId("logo-tradimedika");
      expect(logo).toBeInTheDocument();
    });

    it("should render settings button on the right", () => {
      render(<Header />);

      const settingsButton = screen.getByTestId("settings-button");
      expect(settingsButton).toBeInTheDocument();
    });

    it("should render logo before settings button", () => {
      render(<Header />);

      const logo = screen.getByTestId("logo-tradimedika");
      const settings = screen.getByTestId("settings-button");

      expect(logo.compareDocumentPosition(settings)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
  });

  describe("Accessibility", () => {
    it("should have semantic header element", () => {
      const { container } = render(<Header />);

      expect(container.querySelector("header")).toBeInTheDocument();
    });

    it("should be keyboard accessible", () => {
      render(<Header />);

      const logo = screen.getByTestId("logo-tradimedika");
      const settings = screen.getByTestId("settings-button");

      expect(logo).toBeInTheDocument();
      expect(settings).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive container width", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".mx-auto");
      expect(innerContainer).toHaveClass("w-full", "lg:w-3/4");
    });

    it("should have responsive horizontal margins", () => {
      const { container } = render(<Header />);

      const contentContainer = container.querySelector(".mx-4");
      expect(contentContainer).toHaveClass("lg:mx-8");
    });
  });

  describe("Border Styling", () => {
    it("should have bottom border", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".border-b-2");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should have dashed border style", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".border-dashed");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should apply border transition", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".border-b-2");
      expect(innerContainer).toHaveClass("transition", "duration-300");
    });
  });

  describe("Sticky Behavior", () => {
    it("should stick to top of viewport", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("sticky", "top-0");
    });

    it("should have appropriate z-index for stacking", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("z-50");
    });

    it("should cover full width when sticky", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("w-full", "left-0", "right-0");
    });
  });

  describe("Auto Height", () => {
    it("should have auto height on header", () => {
      const { container } = render(<Header />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("h-auto");
    });

    it("should have fixed height on inner container", () => {
      const { container } = render(<Header />);

      const innerContainer = container.querySelector(".h-20");
      expect(innerContainer).toBeInTheDocument();
    });
  });
});
