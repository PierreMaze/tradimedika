import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AllergySearchSection from "./AllergySearchSection";

/* ------------------ Mocks ------------------ */

// framer-motion (sans React.forwardRef)
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }) => children ?? null,
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

// hook useClickOutside
vi.mock("../../../hooks/useClickOutside", () => ({
  useClickOutside: vi.fn(),
}));

// AllergyForm
vi.mock("./AllergyForm", () => ({
  default: () => <div data-testid="allergy-form">AllergyForm</div>,
}));

/* ------------------ Helper ------------------ */

const renderComponent = (overrides = {}) => {
  const props = {
    isFilteringEnabled: false,
    onFilteringChange: vi.fn(),
    userAllergies: [],
    isExpanded: false,
    onExpandChange: vi.fn(),
    ...overrides,
  };

  return {
    props,
    ...render(<AllergySearchSection {...props} />),
  };
};

/* ------------------ Tests ------------------ */

describe("AllergySearchSection", () => {
  it("rend la checkbox avec son label", () => {
    renderComponent();

    expect(
      screen.getByLabelText("Activer le filtrage des allergies"),
    ).toBeInTheDocument();

    expect(screen.getByText("Vous avez des allergies ?")).toBeInTheDocument();
  });

  it("n'affiche pas le bouton dropdown si le filtrage est désactivé", () => {
    renderComponent({ isFilteringEnabled: false });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("active le filtrage et ouvre le dropdown quand on coche", () => {
    const onFilteringChange = vi.fn();
    const onExpandChange = vi.fn();

    renderComponent({ onFilteringChange, onExpandChange });

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onFilteringChange).toHaveBeenCalledWith(true);
    expect(onExpandChange).toHaveBeenCalledWith(true);
  });

  it("désactive le filtrage et ferme le dropdown quand on décoche", () => {
    const onFilteringChange = vi.fn();
    const onExpandChange = vi.fn();

    renderComponent({
      isFilteringEnabled: true,
      isExpanded: true,
      onFilteringChange,
      onExpandChange,
    });

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onFilteringChange).toHaveBeenCalledWith(false);
    expect(onExpandChange).toHaveBeenCalledWith(false);
  });

  it("affiche le badge avec 1 allergie (singulier)", () => {
    renderComponent({
      isFilteringEnabled: true,
      userAllergies: ["gluten"],
    });

    expect(screen.getByText("1 allergie")).toBeInTheDocument();
  });

  it("affiche le badge avec plusieurs allergies (pluriel)", () => {
    renderComponent({
      isFilteringEnabled: true,
      userAllergies: ["gluten", "lactose"],
    });

    expect(screen.getByText("2 allergies")).toBeInTheDocument();
  });

  it("n'affiche pas le badge si aucune allergie", () => {
    renderComponent({
      isFilteringEnabled: true,
      userAllergies: [],
    });

    expect(screen.queryByText(/allergie/)).not.toBeInTheDocument();
  });

  it("toggle le dropdown via le bouton", () => {
    const onExpandChange = vi.fn();

    renderComponent({
      isFilteringEnabled: true,
      isExpanded: false,
      onExpandChange,
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Afficher les allergies" }),
    );

    expect(onExpandChange).toHaveBeenCalledWith(true);
  });

  it("affiche le formulaire quand isExpanded = true", () => {
    renderComponent({
      isFilteringEnabled: true,
      isExpanded: true,
    });

    expect(screen.getByTestId("allergy-form")).toBeInTheDocument();
  });

  it("masque le formulaire quand isExpanded = false", () => {
    renderComponent({
      isFilteringEnabled: true,
      isExpanded: false,
    });

    expect(screen.queryByTestId("allergy-form")).not.toBeInTheDocument();
  });

  it("met à jour aria-expanded correctement", () => {
    renderComponent({
      isFilteringEnabled: true,
      isExpanded: true,
    });

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});
