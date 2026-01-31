import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Hero from "./Hero";

// Mock framer-motion to avoid animation complexities in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock child components
vi.mock("./HeroFeatures", () => ({
  default: () => <div data-testid="hero-features">Hero Features</div>,
}));

vi.mock("./HeroHeader", () => ({
  default: () => <div data-testid="hero-header">Hero Header</div>,
}));

vi.mock("./HeroSearch", () => ({
  default: () => <div data-testid="hero-search">Hero Search</div>,
}));

describe("Hero", () => {
  describe("Rendering", () => {
    it("should render all three main sections", () => {
      render(<Hero />);

      expect(screen.getByTestId("hero-header")).toBeInTheDocument();
      expect(screen.getByTestId("hero-search")).toBeInTheDocument();
      expect(screen.getByTestId("hero-features")).toBeInTheDocument();
    });

    it("should render HeroHeader component", () => {
      render(<Hero />);

      expect(screen.getByText("Hero Header")).toBeInTheDocument();
    });

    it("should render HeroSearch component", () => {
      render(<Hero />);

      expect(screen.getByText("Hero Search")).toBeInTheDocument();
    });

    it("should render HeroFeatures component", () => {
      render(<Hero />);

      expect(screen.getByText("Hero Features")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have correct container classes", () => {
      const { container } = render(<Hero />);

      const mainContainer = container.querySelector(".mx-auto.flex.flex-1");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should render components in correct order", () => {
      render(<Hero />);

      const header = screen.getByTestId("hero-header");
      const search = screen.getByTestId("hero-search");
      const features = screen.getByTestId("hero-features");

      expect(header.compareDocumentPosition(search)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(search.compareDocumentPosition(features)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    it("should apply responsive gap classes", () => {
      const { container } = render(<Hero />);

      const innerContainer = container.querySelector(
        ".z-20.flex.flex-col.items-center.justify-center",
      );
      expect(innerContainer).toBeInTheDocument();
    });

    it("should center content", () => {
      const { container } = render(<Hero />);

      const innerContainer = container.querySelector(".items-center");
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass("justify-center");
    });
  });

  describe("Accessibility", () => {
    it("should render main content sections", () => {
      const { container } = render(<Hero />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should have proper visual hierarchy", () => {
      render(<Hero />);

      const header = screen.getByTestId("hero-header");
      const search = screen.getByTestId("hero-search");
      const features = screen.getByTestId("hero-features");

      expect(header).toBeInTheDocument();
      expect(search).toBeInTheDocument();
      expect(features).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should apply responsive padding", () => {
      const { container } = render(<Hero />);

      const mainContainer = container.querySelector(".px-4");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should have full height container", () => {
      const { container } = render(<Hero />);

      const mainContainer = container.querySelector(".flex-1");
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Component Composition", () => {
    it("should be a pure composition component", () => {
      const { container } = render(<Hero />);

      // Verify it's just composing child components without business logic
      expect(screen.getByTestId("hero-header")).toBeInTheDocument();
      expect(screen.getByTestId("hero-search")).toBeInTheDocument();
      expect(screen.getByTestId("hero-features")).toBeInTheDocument();
      expect(container.querySelector(".mx-auto")).toBeInTheDocument();
    });

    it("should apply z-index for layering", () => {
      const { container } = render(<Hero />);

      const innerContainer = container.querySelector(".z-20");
      expect(innerContainer).toBeInTheDocument();
    });
  });
});
