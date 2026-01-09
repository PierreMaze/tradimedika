import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AllergySelector from "./AllergySelector";
import { AllergiesProvider } from "../../context/AllergiesContext";

describe("AllergySelector", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const renderWithProvider = () => {
    return render(
      <AllergiesProvider>
        <AllergySelector />
      </AllergiesProvider>,
    );
  };

  it("should render input with search icon", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox", { name: /allergies/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Rechercher une allergie...");
  });

  it("should render description text", () => {
    renderWithProvider();

    expect(
      screen.getByText(
        /Recherchez et sélectionnez vos allergies pour filtrer les remèdes dangereux/i,
      ),
    ).toBeInTheDocument();
  });

  it("should display dropdown when input is focused and has value", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Input vide → dropdown fermé
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Taper "agr" → dropdown ouvert avec suggestions
    fireEvent.change(input, { target: { value: "agr" } });

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // Vérifier que "Agrumes" apparaît dans les suggestions
    expect(screen.getByText("Agrumes")).toBeInTheDocument();
  });

  it("should filter allergens based on search input", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Rechercher "pollen"
    fireEvent.change(input, { target: { value: "pollen" } });

    // Doit afficher "Pollen" et "Pollen d'olivier"
    expect(screen.getByText("Pollen")).toBeInTheDocument();
    expect(screen.getByText("Pollen d'olivier")).toBeInTheDocument();

    // Ne doit PAS afficher "Agrumes"
    expect(screen.queryByText("Agrumes")).not.toBeInTheDocument();
  });

  it("should select allergen on click", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Rechercher "agrumes"
    fireEvent.change(input, { target: { value: "agr" } });

    // Cliquer sur "Agrumes"
    const agrumesOption = screen.getByText("Agrumes");
    fireEvent.click(agrumesOption);

    // Le dropdown doit se fermer (input vide)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Le pill "Agrumes" doit apparaître
    expect(
      screen.getByRole("button", { name: "Supprimer Agrumes" }),
    ).toBeInTheDocument();
  });

  it("should display pills when allergies are selected", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Pas de pills initialement
    expect(
      screen.queryByRole("button", { name: /Supprimer/i }),
    ).not.toBeInTheDocument();

    // Sélectionner "Agrumes"
    fireEvent.change(input, { target: { value: "agr" } });
    fireEvent.click(screen.getByText("Agrumes"));

    // Pill "Agrumes" apparaît
    expect(
      screen.getByRole("button", { name: "Supprimer Agrumes" }),
    ).toBeInTheDocument();

    // Sélectionner "Pollen"
    fireEvent.change(input, { target: { value: "poll" } });
    fireEvent.click(screen.getByText(/^Pollen$/)); // Exact match pour éviter "Pollen d'olivier"

    // Pills "Agrumes" et "Pollen" visibles
    expect(
      screen.getByRole("button", { name: "Supprimer Agrumes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Supprimer Pollen" }),
    ).toBeInTheDocument();
  });

  it("should handle keyboard navigation (ArrowDown, ArrowUp, Enter)", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Rechercher "pollen"
    fireEvent.change(input, { target: { value: "poll" } });

    // Vérifier que le dropdown est ouvert
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // ArrowDown → sélectionne le premier élément
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const firstOption = screen.getAllByRole("option")[0];
    expect(firstOption).toHaveAttribute("aria-selected", "true");

    // ArrowDown → sélectionne le deuxième élément
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const secondOption = screen.getAllByRole("option")[1];
    expect(secondOption).toHaveAttribute("aria-selected", "true");

    // ArrowUp → retour au premier
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Enter → sélectionne l'élément
    fireEvent.keyDown(input, { key: "Enter" });

    // Dropdown fermé, pill affiché
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Supprimer Pollen/i }),
    ).toBeInTheDocument();
  });

  it("should handle Escape key to close dropdown", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Rechercher "agr"
    fireEvent.change(input, { target: { value: "agr" } });

    // Dropdown ouvert
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Escape → ferme dropdown et vide l'input
    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input.value).toBe("");
  });

  it("should handle Backspace to remove last selected allergen", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Sélectionner "Agrumes"
    fireEvent.change(input, { target: { value: "agr" } });
    fireEvent.click(screen.getByText("Agrumes"));

    // Pill "Agrumes" visible
    expect(
      screen.getByRole("button", { name: "Supprimer Agrumes" }),
    ).toBeInTheDocument();

    // Backspace sur input vide → retire l'allergène
    fireEvent.keyDown(input, { key: "Backspace" });

    // Pill disparaît
    expect(
      screen.queryByRole("button", { name: "Supprimer Agrumes" }),
    ).not.toBeInTheDocument();
  });

  it("should exclude already selected allergens from dropdown", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Sélectionner "Agrumes"
    fireEvent.change(input, { target: { value: "agr" } });
    fireEvent.click(screen.getByText("Agrumes"));

    // Pill "Agrumes" visible
    expect(
      screen.getByRole("button", { name: "Supprimer Agrumes" }),
    ).toBeInTheDocument();

    // Rechercher à nouveau "agr"
    fireEvent.change(input, { target: { value: "agr" } });

    // "Agrumes" ne doit PAS apparaître dans le dropdown (seulement dans le pill)
    const listbox = screen.queryByRole("listbox");
    if (listbox) {
      // Si dropdown ouvert (autres résultats), "Agrumes" ne doit pas être dans les options
      const options = screen.queryAllByRole("option");
      const agrumesOption = options.find((opt) =>
        opt.textContent.includes("Agrumes"),
      );
      expect(agrumesOption).toBeUndefined();
    }
    // Sinon dropdown fermé = pas de résultats, c'est bon aussi
  });

  it("should display allergen description in dropdown", () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");

    // Rechercher "agrumes"
    fireEvent.change(input, { target: { value: "agr" } });

    // Vérifier que la description est affichée
    expect(
      screen.getByText(/Citrons, oranges, pamplemousses/i),
    ).toBeInTheDocument();
  });
});
