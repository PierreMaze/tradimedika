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
  visibleCount: items.length, // simplification : afficher tous les items
}));

// Mock des composants tags pour éviter erreurs de rendu
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
    ProuvedTag: () => <div data-testid="verified-tag" />,
    TraditionnalTag: () => <div data-testid="traditional-tag" />,
    PregnancyTag: PregnancyTagMock,
    ChildrenAgeTag: ChildrenAgeTagMock,
  };
});

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

    // Nom et type
    expect(screen.getByText(mockRemedy.name)).toBeInTheDocument();
    expect(screen.getByText(mockRemedy.type)).toBeInTheDocument();

    // Description
    expect(screen.getByText(mockRemedy.description)).toBeInTheDocument();

    // Propriétés (on peut juste vérifier la présence de B1 ici)
    expect(screen.getAllByText("B1")[0]).toBeInTheDocument();

    // Image
    const img = screen.getByAltText(`Illustration de ${mockRemedy.name}`);
    expect(img).toHaveAttribute("src", mockRemedy.image);

    // Tags
    expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
    expect(screen.getByTestId("children-tag")).toBeInTheDocument();

    // Lien
    const link = screen.getByRole("link", {
      name: `Voir les détails de ${mockRemedy.name}`,
    });
    expect(link).toHaveAttribute("href", `/remedes/remède-test`);
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

    // L'image ne doit pas être rendue
    expect(
      screen.queryByAltText(`Illustration de ${mockRemedy.name}`),
    ).toBeNull();
    // La description ne doit pas être rendue
    expect(screen.queryByText(mockRemedy.description)).toBeNull();
  });

  it("rend correctement les propriétés visibles selon useVisibleItems", () => {
    // Mock du hook pour ne montrer qu'une seule propriété
    vi.spyOn(useTruncateHook, "useVisibleItems").mockReturnValue({
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

    // Récupère uniquement le container visible des propriétés
    const container = screen.getByTestId("properties-container");
    const { queryByText } = within(container);

    // Vérifie que la première propriété est visible
    expect(queryByText("B1")).toBeInTheDocument();

    // Vérifie que "Fibres" n'est pas visible
    expect(queryByText("Fibres")).toBeNull();

    // Vérifie que le badge +1 apparaît pour les propriétés restantes
    expect(
      screen.getByText(`+${mockRemedy.properties.length - 1}`),
    ).toBeInTheDocument();
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

  it("génère le slug correct pour le Link", () => {
    render(
      <MemoryRouter>
        <RemedyCard remedy={mockRemedy} selectedSymptoms={mockSymptoms} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/remedes/remède-test`);
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
});
