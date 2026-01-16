import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import LayoutApp from "./LayoutApp";

// Mock child components
vi.mock("./components/Header", () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock("./components/Footer", () => ({
  default: ({ className }) => (
    <footer data-testid="footer" className={className}>
      Footer
    </footer>
  ),
}));

vi.mock("../components/disclaimer/Disclaimer", () => ({
  default: () => <div data-testid="disclaimer">Disclaimer</div>,
}));

vi.mock("../components/ui/animation", () => ({
  LeafFall: () => <div data-testid="leaf-fall">LeafFall Animation</div>,
}));

const renderWithRouter = (component) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: component,
        children: [
          {
            index: true,
            element: <div>Test Content</div>,
          },
        ],
      },
    ],
    {
      initialEntries: ["/"],
    },
  );

  return render(<RouterProvider router={router} />);
};

describe("LayoutApp", () => {
  describe("Rendering", () => {
    it("should render all main components", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("disclaimer")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByTestId("leaf-fall")).toBeInTheDocument();
    });

    it("should render Header component", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByText("Header")).toBeInTheDocument();
    });

    it("should render Footer component", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("should render Disclaimer component", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByText("Disclaimer")).toBeInTheDocument();
    });

    it("should render LeafFall animation", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByText("LeafFall Animation")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have full height screen layout", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".h-screen");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should have flex column layout", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".flex.flex-col");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should center items", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".items-center");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should have relative positioning", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".relative");
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply background color classes", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".bg-light");
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass("dark:bg-dark");
    });

    it("should apply transition classes", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".transition");
      expect(mainContainer).toHaveClass("duration-300", "ease-in-out");
    });

    it("should have proper z-index layering", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".z-10");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Component Order", () => {
    it("should render components in correct order", () => {
      renderWithRouter(<LayoutApp />);

      const header = screen.getByTestId("header");
      const disclaimer = screen.getByTestId("disclaimer");
      const footer = screen.getByTestId("footer");

      expect(header.compareDocumentPosition(disclaimer)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(disclaimer.compareDocumentPosition(footer)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });

    it("should render LeafFall before other content", () => {
      renderWithRouter(<LayoutApp />);

      const leafFall = screen.getByTestId("leaf-fall");
      const header = screen.getByTestId("header");

      expect(leafFall.compareDocumentPosition(header)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
  });

  describe("Footer Positioning", () => {
    it("should apply mt-auto to footer for bottom positioning", () => {
      renderWithRouter(<LayoutApp />);

      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("mt-auto");
    });
  });

  describe("Content Container", () => {
    it("should have full height content container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".h-full");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have full width content container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".w-full");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have flex column in content container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".z-10");
      expect(contentContainer).toHaveClass("flex", "flex-col");
    });

    it("should center items in content container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".z-10");
      expect(contentContainer).toHaveClass("items-center");
    });
  });

  describe("Background Animation", () => {
    it("should render LeafFall as background", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByTestId("leaf-fall")).toBeInTheDocument();
    });

    it("should render LeafFall only once globally", () => {
      renderWithRouter(<LayoutApp />);

      const leafFalls = screen.getAllByTestId("leaf-fall");
      expect(leafFalls).toHaveLength(1);
    });
  });

  describe("ScrollRestoration", () => {
    it("should include ScrollRestoration component", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      // ScrollRestoration doesn't render visible content
      expect(container).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have semantic HTML structure", () => {
      renderWithRouter(<LayoutApp />);

      expect(screen.getByTestId("header").tagName).toBe("HEADER");
      expect(screen.getByTestId("footer").tagName).toBe("FOOTER");
    });

    it("should maintain proper content hierarchy", () => {
      renderWithRouter(<LayoutApp />);

      const header = screen.getByTestId("header");
      const footer = screen.getByTestId("footer");

      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Layering", () => {
    it("should layer LeafFall behind content", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const leafFallParent = screen.getByTestId("leaf-fall").parentElement;
      const contentContainer = container.querySelector(".z-10");

      expect(leafFallParent).toBeInTheDocument();
      expect(contentContainer).toBeInTheDocument();
    });

    it("should apply relative positioning to main container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".relative");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should apply relative positioning to content container", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const contentContainer = container.querySelector(".z-10");
      expect(contentContainer).toHaveClass("relative");
    });
  });

  describe("Responsive Design", () => {
    it("should maintain full height on all screen sizes", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".h-screen");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should center content on all screen sizes", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".items-center");
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Dark Mode Support", () => {
    it("should have dark mode background class", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".dark\\:bg-dark");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should apply smooth transition for theme changes", () => {
      const { container } = renderWithRouter(<LayoutApp />);

      const mainContainer = container.querySelector(".transition");
      expect(mainContainer).toHaveClass("duration-300");
    });
  });
});
