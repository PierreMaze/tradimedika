import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutRemedyResult from "./LayoutRemedyResult";

// Mock BreadCrumb
vi.mock("../components/navigation/BreadCrumb", () => ({
  default: () => <nav data-testid="breadcrumb">BreadCrumb</nav>,
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={component} />
      </Routes>
    </BrowserRouter>,
  );
};

describe("LayoutRemedyResult", () => {
  describe("Rendering", () => {
    it("should render BreadCrumb component", () => {
      renderWithRouter(<LayoutRemedyResult />);

      expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    });

    it("should render breadcrumb text", () => {
      renderWithRouter(<LayoutRemedyResult />);

      expect(screen.getByText("BreadCrumb")).toBeInTheDocument();
    });

    it("should render Outlet for nested routes", () => {
      const TestChild = () => <div data-testid="test-child">Test Child</div>;

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<TestChild />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have container with proper classes", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".container");
      expect(layoutContainer).toBeInTheDocument();
      expect(layoutContainer).toHaveClass("mx-auto", "w-full", "grow");
    });

    it("should apply responsive padding", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".px-4");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should apply vertical padding", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".py-8");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should have grow class for flex layouts", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".grow");
      expect(layoutContainer).toBeInTheDocument();
    });
  });

  describe("Component Order", () => {
    it("should render BreadCrumb before Outlet content", () => {
      const TestChild = () => <div data-testid="test-child">Test Child</div>;

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<TestChild />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      const breadcrumb = screen.getByTestId("breadcrumb");
      const child = screen.getByTestId("test-child");

      expect(breadcrumb.compareDocumentPosition(child)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
  });

  describe("Container Sizing", () => {
    it("should have full width", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".w-full");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should center content with mx-auto", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".mx-auto");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should use container class for responsive width", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".container");
      expect(layoutContainer).toBeInTheDocument();
    });
  });

  describe("Nested Routes Integration", () => {
    it("should render nested route content in Outlet", () => {
      const NestedPage = () => (
        <div data-testid="nested-page">Nested Page Content</div>
      );

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<NestedPage />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(screen.getByTestId("nested-page")).toBeInTheDocument();
      expect(screen.getByText("Nested Page Content")).toBeInTheDocument();
    });

    it("should maintain breadcrumb when route changes", () => {
      const Page1 = () => <div data-testid="page-1">Page 1</div>;
      const Page2 = () => <div data-testid="page-2">Page 2</div>;

      const { rerender } = render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<Page1 />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();

      rerender(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<Page2 />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      renderWithRouter(<LayoutRemedyResult />);

      const breadcrumb = screen.getByTestId("breadcrumb");
      expect(breadcrumb.tagName).toBe("NAV");
    });

    it("should render navigation component", () => {
      renderWithRouter(<LayoutRemedyResult />);

      expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    });
  });

  describe("Spacing", () => {
    it("should have horizontal padding", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".px-4");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should have vertical padding", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".py-8");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should provide consistent spacing for all nested pages", () => {
      const TestPage = () => <div>Test Page</div>;

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<TestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      const container = screen.getByTestId("breadcrumb").parentElement;
      expect(container).toHaveClass("px-4", "py-8");
    });
  });

  describe("Page Content Container", () => {
    it("should wrap Outlet in proper container", () => {
      const TestChild = () => <div data-testid="test-child">Content</div>;

      const { container } = render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutRemedyResult />}>
              <Route index element={<TestChild />} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      // Check that the container has the proper classes
      const layoutContainer = container.querySelector(".container");
      expect(layoutContainer).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should apply responsive container width", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".container");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should maintain padding on all screen sizes", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".px-4.py-8");
      expect(layoutContainer).toBeInTheDocument();
    });
  });

  describe("Layout Flexibility", () => {
    it("should grow to fill available space", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".grow");
      expect(layoutContainer).toBeInTheDocument();
    });

    it("should work within parent flex containers", () => {
      const { container } = renderWithRouter(<LayoutRemedyResult />);

      const layoutContainer = container.querySelector(".grow");
      expect(layoutContainer).toBeInTheDocument();
    });
  });
});
