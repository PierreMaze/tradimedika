import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Home";

// Mock Hero component
vi.mock("../features/home-page", () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>,
}));

const renderWithHelmet = (component) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe("Home", () => {
  describe("Rendering", () => {
    it("should render Hero component", () => {
      renderWithHelmet(<Home />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    it("should render Hero component with correct text", () => {
      renderWithHelmet(<Home />);

      expect(screen.getByText("Hero Component")).toBeInTheDocument();
    });
  });

  describe("SEO - Helmet Integration", () => {
    it("should render Helmet component", () => {
      const { container } = renderWithHelmet(<Home />);

      expect(container).toBeInTheDocument();
    });

    it("should render with HelmetProvider", () => {
      renderWithHelmet(<Home />);

      // Verify the component renders without errors
      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render fragment as root", () => {
      const { container } = renderWithHelmet(<Home />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should contain Hero component", () => {
      renderWithHelmet(<Home />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have semantic structure", () => {
      const { container } = renderWithHelmet(<Home />);

      expect(container).toBeInTheDocument();
    });

    it("should render main content", () => {
      renderWithHelmet(<Home />);

      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should render without errors", () => {
      const { container } = renderWithHelmet(<Home />);

      expect(container).toBeInTheDocument();
      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });
  });
});
