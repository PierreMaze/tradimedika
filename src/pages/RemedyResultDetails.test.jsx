import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RemedyResultDetails from "./RemedyResultDetails";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    article: ({ children, ...props }) => (
      <article {...props}>{children}</article>
    ),
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
  },
}));

// Mock react-router-dom hooks
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ slug: "invalid-slug" }),
    useLocation: () => ({ state: { symptoms: [] } }),
  };
});

// Mock components
vi.mock("../components/tags", () => ({
  ChildrenAgeTag: () => <span>ChildrenAgeTag</span>,
  PregnancyTag: () => <span>PregnancyTag</span>,
  VerifiedTag: () => <span>VerifiedTag</span>,
}));

vi.mock("../components/tooltip/TagsInfoTooltip", () => ({
  default: () => <div data-testid="tags-info-tooltip">Tags Info</div>,
}));

vi.mock("../features/allergens-search", () => ({
  useAllergies: () => ({
    userAllergies: [],
    isFilteringEnabled: false,
  }),
}));

vi.mock("../features/remedy-result", () => ({
  RemedyResultNotFound: () => (
    <div data-testid="remedy-not-found">remedy-not-found</div>
  ),
  getRemedyBySlug: () => null,
}));

vi.mock("../features/settings", () => ({
  useReducedMotion: () => false,
}));

vi.mock("../data/allergensList.json", () => ({
  default: [],
}));

vi.mock("../data/db.json", () => ({
  default: [],
}));

vi.mock("../utils/capitalizeFirstLetter", () => ({
  capitalizeFirstLetter: (str) => str,
}));

vi.mock("../utils/formatFrequency", () => ({
  formatFrequency: () => "",
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <HelmetProvider>{component}</HelmetProvider>
    </BrowserRouter>,
  );
};

describe("RemedyResultDetails", () => {
  describe("Not Found State", () => {
    it("should render not found component when remedy doesn't exist", () => {
      renderWithProviders(<RemedyResultDetails />);

      expect(screen.getByTestId("remedy-not-found")).toBeInTheDocument();
    });

    it("should render not found variant", () => {
      renderWithProviders(<RemedyResultDetails />);

      const notFound = screen.getByTestId("remedy-not-found");
      expect(notFound).toHaveTextContent("remedy-not-found");
    });
  });

  describe("Component Rendering", () => {
    it("should render without errors", () => {
      const { container } = renderWithProviders(<RemedyResultDetails />);

      expect(container).toBeInTheDocument();
    });

    it("should render main content when remedy not found", () => {
      renderWithProviders(<RemedyResultDetails />);

      // When remedy doesn't exist, it shows RemedyResultNotFound
      expect(screen.getByTestId("remedy-not-found")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should have proper container", () => {
      const { container } = renderWithProviders(<RemedyResultDetails />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
