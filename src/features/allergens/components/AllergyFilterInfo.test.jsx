import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AllergyFilterInfo from "./AllergyFilterInfo";

describe("AllergyFilterInfo", () => {
  it("should render when remedies are filtered", () => {
    render(
      <AllergyFilterInfo
        filteredCount={3}
        userAllergies={["citrus", "pollen"]}
      />,
    );

    // Vérifier que le message est affiché
    expect(screen.getByText("3", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/remède/i)).toBeInTheDocument();
    expect(screen.getByText(/masqué/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ils contiennent vos allergènes/i),
    ).toBeInTheDocument();
  });

  it("should display allergen names correctly", () => {
    render(
      <AllergyFilterInfo
        filteredCount={2}
        userAllergies={["citrus", "asteraceae"]}
      />,
    );

    // Vérifier que les noms des allergènes sont affichés
    expect(screen.getByText(/agrumes, astéracées/i)).toBeInTheDocument();
  });

  it("should handle singular form when only one remedy is filtered", () => {
    render(<AllergyFilterInfo filteredCount={1} userAllergies={["pollen"]} />);

    // Vérifier le singulier
    expect(screen.getByText("1", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/remède masqué/i)).toBeInTheDocument();
    expect(screen.getByText(/Il contient vos allergènes/i)).toBeInTheDocument();
  });

  it("should handle plural form when multiple remedies are filtered", () => {
    render(
      <AllergyFilterInfo filteredCount={5} userAllergies={["bee-venom"]} />,
    );

    // Vérifier le pluriel
    expect(screen.getByText("5", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/remède/i)).toBeInTheDocument();
    expect(screen.getByText(/masqué/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ils contiennent vos allergènes/i),
    ).toBeInTheDocument();
  });

  it("should not render when filteredCount is 0", () => {
    const { container } = render(
      <AllergyFilterInfo filteredCount={0} userAllergies={["citrus"]} />,
    );

    // Le composant ne devrait rien afficher
    expect(container.firstChild).toBeNull();
  });

  it("should not render when userAllergies is empty", () => {
    const { container } = render(
      <AllergyFilterInfo filteredCount={3} userAllergies={[]} />,
    );

    // Le composant ne devrait rien afficher
    expect(container.firstChild).toBeNull();
  });

  it("should have proper ARIA attributes for accessibility", () => {
    render(
      <AllergyFilterInfo
        filteredCount={2}
        userAllergies={["citrus", "pollen"]}
      />,
    );

    const statusElement = screen.getByRole("status");
    expect(statusElement).toHaveAttribute("aria-live", "polite");
  });

  it("should display multiple allergen names separated by comma", () => {
    render(
      <AllergyFilterInfo
        filteredCount={4}
        userAllergies={["citrus", "pollen", "asteraceae", "bee-venom"]}
      />,
    );

    // Vérifier que tous les allergènes sont listés
    expect(
      screen.getByText(/agrumes, pollen, astéracées, venin d'abeille/i),
    ).toBeInTheDocument();
  });

  it("should handle single allergen without comma", () => {
    render(
      <AllergyFilterInfo filteredCount={2} userAllergies={["pollen-olive"]} />,
    );

    // Vérifier qu'il n'y a pas de virgule
    const text = screen.getByText(/pollen d'olivier/i);
    expect(text.textContent).not.toContain(",");
  });

  it("should filter out invalid allergen IDs gracefully", () => {
    render(
      <AllergyFilterInfo
        filteredCount={2}
        userAllergies={["citrus", "invalid-id", "pollen"]}
      />,
    );

    // Devrait afficher uniquement les allergènes valides
    expect(screen.getByText(/agrumes, pollen/i)).toBeInTheDocument();
    expect(screen.queryByText(/invalid-id/i)).not.toBeInTheDocument();
  });
});
