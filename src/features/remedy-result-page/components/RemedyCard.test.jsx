// src/features/remedy-result-page/components/RemedyCard.test.jsx
import { render, screen, within } from "@testing-library/react";
import PropTypes from "prop-types";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import * as useTruncateHook from "../hooks/useTruncatePropertiesItems";
import RemedyCard from "./RemedyCard";

// ------------------------------
// Mocks
// ------------------------------

// Mock du hook useVisibleItems
vi.spyOn(useTruncateHook, "useVisibleItems").mockImplementation((items) => ({
  containerRef: { current: null },
  itemRefs: { current: [] },
  counterRef: { current: null },
  visibleCount: items.length,
}));

// Mock des composants tags
vi.mock("../../../components/tags", () => {
  const ClickableTag = ({ children }) => (
    <div data-testid="clickable-tag">{children}</div>
  );

  ClickableTag.propTypes = {
    children: PropTypes.node.isRequired,
  };

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
    ClickableTag,
    ProuvedTag: () => <div data-testid="verified-tag" />,
    TraditionnalTag: () => <div data-testid="traditional-tag" />,
    PregnancyTag: PregnancyTagMock,
    ChildrenAgeTag: ChildrenAgeTagMock,
    RecommendedTag: () => <div data-testid="recommended-tag" />,
  };
});

// Mock TagsAccordionPopover et TagsInfoButton
vi.mock("../../../components/ui/helper", () => ({
  TagsAccordionPopover: () => null,
  TagsInfoButton: () => null,
}));

// ------------------------------
// Props simulées
// ------------------------------

const mockRemedy = {
  id: 1,
  name: "Remède Test",
  type: "Plante",
  description: "Description du remède test",
  properties: [
    { name: "B1", score: 8, category: "Vitamine" },
    { name: "Fibres", score: 5, category: "Nutriment" },
  ],
  image: "/test.jpg",
  pregnancySafe: true,
  childrenAge: 3,
  verifiedByProfessional: true,
};

const mockSymptoms = ["maux de tête", "fatigue"];
const mockMatchedSymptoms = ["maux de tête"];

// ------------------------------
// Tests
// ------------------------------

describe("RemedyCard Component", () => {
  it("rend correctement le composant avec toutes les props", () => {
    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          isFiltered={false}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockRemedy.name)).toBeInTheDocument();
    expect(screen.getByText(mockRemedy.type)).toBeInTheDocument();
    expect(screen.getByText(mockRemedy.description)).toBeInTheDocument();
    expect(screen.getAllByText("B1")[0]).toBeInTheDocument();

    const img = screen.getByAltText(
      `${mockRemedy.name} - remède naturel traditionnel de type ${mockRemedy.type}`,
    );
    expect(img).toHaveAttribute("src", mockRemedy.image);

    expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
    expect(screen.getByTestId("children-tag")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain("/remedes/");
  });

  it("affiche le badge allergène quand isFiltered est true", () => {
    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          isFiltered={true}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Allergène/i)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      expect.stringContaining("(contient des allergènes)"),
    );
  });

  it("gère les remèdes sans image et sans description", () => {
    const remedyNoImageDesc = { ...mockRemedy, image: null, description: "" };

    render(
      <MemoryRouter>
        <RemedyCard
          remedy={remedyNoImageDesc}
          selectedSymptoms={mockSymptoms}
        />
      </MemoryRouter>,
    );

    expect(
      screen.queryByAltText(
        `${mockRemedy.name} - remède naturel traditionnel de type ${mockRemedy.type}`,
      ),
    ).toBeNull();

    expect(screen.queryByText(mockRemedy.description)).toBeNull();
  });

  it("rend correctement les propriétés visibles selon useVisibleItems", () => {
    vi.spyOn(useTruncateHook, "useVisibleItems").mockReturnValueOnce({
      containerRef: { current: null },
      itemRefs: { current: [] },
      counterRef: { current: null },
      visibleCount: 1,
    });

    render(
      <MemoryRouter>
        <RemedyCard remedy={mockRemedy} selectedSymptoms={mockSymptoms} />
      </MemoryRouter>,
    );

    const container = screen.getByTestId("properties-container");
    const { queryByText } = within(container);

    expect(queryByText("B1")).toBeInTheDocument();
    expect(queryByText("Fibres")).toBeNull();
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("applique correctement les classes grayscale quand isFiltered", () => {
    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          isFiltered={true}
        />
      </MemoryRouter>,
    );

    const nameElement = screen.getByText(mockRemedy.name);
    expect(nameElement.className).toMatch(/grayscale/);
  });

  it("génère un slug valide pour le Link", () => {
    render(
      <MemoryRouter>
        <RemedyCard remedy={mockRemedy} selectedSymptoms={mockSymptoms} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringMatching(/^\/remedes\//));
  });

  it("affiche les badges de symptômes matchés en overlay", () => {
    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          matchedSymptoms={mockMatchedSymptoms}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Maux de tête")).toBeInTheDocument();
  });

  it("n'affiche pas de badges quand matchedSymptoms est vide", () => {
    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          matchedSymptoms={[]}
        />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Maux de tête")).toBeNull();
  });

  it("affiche plusieurs badges de symptômes matchés", () => {
    const multipleMatched = ["maux de tête", "fatigue", "nausée"];

    render(
      <MemoryRouter>
        <RemedyCard
          remedy={mockRemedy}
          selectedSymptoms={mockSymptoms}
          matchedSymptoms={multipleMatched}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Maux de tête")).toBeInTheDocument();
    expect(screen.getByText("Fatigue")).toBeInTheDocument();
    expect(screen.getByText("Nausée")).toBeInTheDocument();
  });

  it("fonctionne sans prop matchedSymptoms (par défaut)", () => {
    render(
      <MemoryRouter>
        <RemedyCard remedy={mockRemedy} selectedSymptoms={mockSymptoms} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Maux de tête")).toBeNull();
  });

  describe("isRecommended", () => {
    it("affiche le tag Recommandé quand isRecommended est true", () => {
      render(
        <MemoryRouter>
          <RemedyCard
            remedy={mockRemedy}
            selectedSymptoms={mockSymptoms}
            isRecommended={true}
          />
        </MemoryRouter>,
      );

      expect(screen.getByTestId("recommended-tag")).toBeInTheDocument();
    });

    it("n'affiche pas le tag Recommandé quand isRecommended est false", () => {
      render(
        <MemoryRouter>
          <RemedyCard
            remedy={mockRemedy}
            selectedSymptoms={mockSymptoms}
            isRecommended={false}
          />
        </MemoryRouter>,
      );

      expect(screen.queryByTestId("recommended-tag")).toBeNull();
    });

    it("n'affiche pas le tag Recommandé par défaut (sans prop)", () => {
      render(
        <MemoryRouter>
          <RemedyCard remedy={mockRemedy} selectedSymptoms={mockSymptoms} />
        </MemoryRouter>,
      );

      expect(screen.queryByTestId("recommended-tag")).toBeNull();
    });
  });
});
