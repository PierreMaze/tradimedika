import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RemedyCard from "./RemedyCard";

/* -------------------------------------------------------------------------- */
/*                                   Mocks                                    */
/* -------------------------------------------------------------------------- */

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  };
});

vi.mock("../hooks/useTruncatePropertiesItems", () => ({
  useVisibleItems: vi.fn((items) => ({
    containerRef: { current: null },
    itemRefs: { current: [] },
    counterRef: { current: null },
    visibleCount: Math.min(items.length, 3),
  })),
}));

vi.mock("../../../components/tags", () => {
  const PregnancyTagMock = ({ variant }) => (
    <div data-testid="pregnancy-tag">{variant}</div>
  );
  PregnancyTagMock.propTypes = {
    variant: PropTypes.string.isRequired,
  };

  const ChildrenAgeTagMock = ({ age }) =>
    age ? <div data-testid="children-tag">{age}</div> : null;
  ChildrenAgeTagMock.propTypes = {
    age: PropTypes.number,
  };

  return {
    VerifiedTag: () => <div data-testid="verified-tag" />,
    TraditionnalTag: () => <div data-testid="traditional-tag" />,
    PregnancyTag: PregnancyTagMock,
    ChildrenAgeTag: ChildrenAgeTagMock,
  };
});

/* -------------------------------------------------------------------------- */

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

const minimalRemedy = {
  id: 1,
  name: "Citron",
  type: "Fruit",
  description: "Description citron",
  properties: [],
  pregnancySafe: false,
  childrenAge: null,
  verifiedByProfessional: false,
};

const fullRemedy = {
  id: 2,
  name: "Thé vert",
  type: "Plante",
  description: "Description thé vert",
  properties: [
    { name: "antioxydant", score: 5, category: "prop" },
    { name: "énergisant", score: 4, category: "prop" },
    { name: "détoxifiant", score: 3, category: "prop" },
    { name: "anti-inflammatoire", score: 2, category: "prop" },
  ],
  image: "/the.jpg",
  pregnancySafe: true,
  childrenAge: 12,
  verifiedByProfessional: true,
};

/* -------------------------------------------------------------------------- */

describe("RemedyCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------------ */
  /*                                Rendering                                 */
  /* ------------------------------------------------------------------------ */

  it("should render name, type and description", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.getByText("Citron")).toBeInTheDocument();
    expect(screen.getByText("Fruit")).toBeInTheDocument();
    expect(screen.getByText("Description citron")).toBeInTheDocument();
  });

  it("should render image when provided", () => {
    renderWithRouter(<RemedyCard remedy={fullRemedy} selectedSymptoms={[]} />);

    const img = screen.getByAltText("Illustration de Thé vert");
    expect(img).toHaveAttribute("src", "/the.jpg");
  });

  it("should not render image block when image is missing", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.queryByAltText(/illustration/i)).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------------------ */
  /*                               Properties                                 */
  /* ------------------------------------------------------------------------ */

  it("should render up to 3 visible properties", () => {
    renderWithRouter(<RemedyCard remedy={fullRemedy} selectedSymptoms={[]} />);

    expect(screen.getByText("Antioxydant")).toBeInTheDocument();
    expect(screen.getByText("Énergisant")).toBeInTheDocument();
    expect(screen.getByText("Détoxifiant")).toBeInTheDocument();
  });

  it("should render a +N counter when properties exceed visible count", () => {
    renderWithRouter(<RemedyCard remedy={fullRemedy} selectedSymptoms={[]} />);

    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("should not render properties section when empty", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.queryByText(/propriétés/i)).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------------------ */
  /*                                  Labels                                  */
  /* ------------------------------------------------------------------------ */

  it("should render VerifiedTag when verifiedByProfessional is true", () => {
    renderWithRouter(<RemedyCard remedy={fullRemedy} selectedSymptoms={[]} />);

    expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
  });

  it("should render TraditionnalTag when verifiedByProfessional is false", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.getByTestId("traditional-tag")).toBeInTheDocument();
  });

  it("should always render PregnancyTag with correct variant", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.getByTestId("pregnancy-tag")).toHaveTextContent("interdit");
  });

  it("should render ChildrenAgeTag only when age is provided", () => {
    renderWithRouter(<RemedyCard remedy={fullRemedy} selectedSymptoms={[]} />);

    expect(screen.getByTestId("children-tag")).toHaveTextContent("12");
  });

  /* ------------------------------------------------------------------------ */
  /*                             Filtered state                               */
  /* ------------------------------------------------------------------------ */

  it("should render allergen badge when isFiltered is true", () => {
    renderWithRouter(
      <RemedyCard remedy={fullRemedy} selectedSymptoms={[]} isFiltered />,
    );

    expect(screen.getByText("Allergène")).toBeInTheDocument();
  });

  it("should update link aria-label when filtered", () => {
    renderWithRouter(
      <RemedyCard remedy={fullRemedy} selectedSymptoms={[]} isFiltered />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Voir les détails de Thé vert (contient des allergènes)",
    );
  });

  /* ------------------------------------------------------------------------ */
  /*                                Navigation                                */
  /* ------------------------------------------------------------------------ */

  it("should generate correct link slug", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/remedes/citron");
  });

  it("should always render the 'Voir plus' indicator", () => {
    renderWithRouter(
      <RemedyCard remedy={minimalRemedy} selectedSymptoms={[]} />,
    );

    expect(screen.getByText("Voir plus")).toBeInTheDocument();
  });
});
