import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AllergyFilterInfo from "./AllergyFilterInfo";

describe("AllergyFilterInfo", () => {
  it("should render when remedies are filtered", () => {
    render(
      <AllergyFilterInfo
        filteredCount={3}
        userAllergies={["citron", "miel"]}
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
        userAllergies={["citron", "miel"]}
      />,
    );

    // Vérifier que les noms des allergènes sont affichés
    expect(screen.getByText(/citron, miel/i)).toBeInTheDocument();
  });

  it("should handle singular form when only one remedy is filtered", () => {
    render(<AllergyFilterInfo filteredCount={1} userAllergies={["miel"]} />);

    // Vérifier le singulier
    expect(screen.getByText("1", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/remède masqué/i)).toBeInTheDocument();
    expect(screen.getByText(/Il contient vos allergènes/i)).toBeInTheDocument();
  });

  it("should handle plural form when multiple remedies are filtered", () => {
    render(<AllergyFilterInfo filteredCount={5} userAllergies={["citron"]} />);

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
      <AllergyFilterInfo filteredCount={0} userAllergies={["citron"]} />,
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
        userAllergies={["citron", "miel"]}
      />,
    );

    const statusElement = screen.getByRole("status");
    expect(statusElement).toHaveAttribute("aria-live", "polite");
  });

  it("should display multiple allergen names separated by comma", () => {
    render(
      <AllergyFilterInfo
        filteredCount={4}
        userAllergies={["citron", "miel"]}
      />,
    );

    // Vérifier que tous les allergènes sont listés
    expect(screen.getByText(/citron, miel/i)).toBeInTheDocument();
  });

  it("should filter out invalid allergen IDs gracefully", () => {
    render(
      <AllergyFilterInfo
        filteredCount={2}
        userAllergies={["citron", "invalid-id", "miel"]}
      />,
    );

    // Devrait afficher uniquement les allergènes valides
    expect(screen.getByText(/citron, miel/i)).toBeInTheDocument();
    expect(screen.queryByText(/invalid-id/i)).not.toBeInTheDocument();
  });
});
