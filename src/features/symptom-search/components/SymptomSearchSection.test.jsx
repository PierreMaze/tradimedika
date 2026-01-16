import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SymptomSearchSection from "./SymptomSearchSection";

vi.mock("./SymptomsForm", () => ({
  default: ({ onSymptomSelect, onSubmit, onFocus, placeholder }) => (
    <div data-testid="symptoms-form">
      <input
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={(e) => {
          if (e.target.value) {
            onSymptomSelect(e.target.value);
          }
        }}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  ),
}));

vi.mock("./ListSymptomTag", () => ({
  default: ({ symptoms, onRemoveSymptom }) => (
    <div data-testid="list-symptom-tag">
      {symptoms.map((symptom) => (
        <button key={symptom} onClick={() => onRemoveSymptom(symptom)}>
          {symptom} ×
        </button>
      ))}
    </div>
  ),
}));

vi.mock("./SymptomCounter", () => ({
  default: ({ count }) => (
    <div data-testid="symptom-counter">{count}/5 symptômes</div>
  ),
}));

describe("SymptomSearchSection", () => {
  const mockOnSymptomSelect = vi.fn();
  const mockOnRemoveSymptom = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockOnFocus = vi.fn();

  const defaultProps = {
    onSymptomSelect: mockOnSymptomSelect,
    onRemoveSymptom: mockOnRemoveSymptom,
    selectedSymptoms: [],
    onSubmit: mockOnSubmit,
  };

  it("should render all sub-components", () => {
    render(<SymptomSearchSection {...defaultProps} />);

    expect(screen.getByTestId("symptoms-form")).toBeInTheDocument();
    expect(screen.getByTestId("list-symptom-tag")).toBeInTheDocument();
    expect(screen.getByTestId("symptom-counter")).toBeInTheDocument();
  });

  it("should render SymptomsForm with default placeholder", () => {
    render(<SymptomSearchSection {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        "Entrez vos symptômes (ex: fatigue, digestion...)",
      ),
    ).toBeInTheDocument();
  });

  it("should render SymptomsForm with custom placeholder", () => {
    render(
      <SymptomSearchSection
        {...defaultProps}
        placeholder="Rechercher un symptôme"
      />,
    );

    expect(
      screen.getByPlaceholderText("Rechercher un symptôme"),
    ).toBeInTheDocument();
  });

  it("should pass onSymptomSelect callback to SymptomsForm", async () => {
    const user = userEvent.setup();
    render(<SymptomSearchSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      "Entrez vos symptômes (ex: fatigue, digestion...)",
    );
    await user.type(input, "fatigue");

    expect(mockOnSymptomSelect).toHaveBeenCalled();
  });

  it("should pass onSubmit callback to SymptomsForm", async () => {
    const user = userEvent.setup();
    render(<SymptomSearchSection {...defaultProps} />);

    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should pass optional onFocus callback to SymptomsForm", async () => {
    const user = userEvent.setup();
    render(<SymptomSearchSection {...defaultProps} onFocus={mockOnFocus} />);

    const input = screen.getByPlaceholderText(
      "Entrez vos symptômes (ex: fatigue, digestion...)",
    );
    await user.click(input);

    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("should display selected symptoms in ListSymptomTag", () => {
    const selectedSymptoms = ["fatigue", "nausée", "fièvre"];
    render(
      <SymptomSearchSection
        {...defaultProps}
        selectedSymptoms={selectedSymptoms}
      />,
    );

    expect(screen.getByText("fatigue ×")).toBeInTheDocument();
    expect(screen.getByText("nausée ×")).toBeInTheDocument();
    expect(screen.getByText("fièvre ×")).toBeInTheDocument();
  });

  it("should pass onRemoveSymptom callback to ListSymptomTag", async () => {
    const user = userEvent.setup();
    const selectedSymptoms = ["fatigue"];
    render(
      <SymptomSearchSection
        {...defaultProps}
        selectedSymptoms={selectedSymptoms}
      />,
    );

    const removeButton = screen.getByText("fatigue ×");
    await user.click(removeButton);

    expect(mockOnRemoveSymptom).toHaveBeenCalledWith("fatigue");
  });

  it("should display correct symptom count in SymptomCounter", () => {
    const selectedSymptoms = ["fatigue", "nausée"];
    render(
      <SymptomSearchSection
        {...defaultProps}
        selectedSymptoms={selectedSymptoms}
      />,
    );

    expect(screen.getByText("2/5 symptômes")).toBeInTheDocument();
  });

  it("should update symptom count when symptoms change", () => {
    const { rerender } = render(
      <SymptomSearchSection {...defaultProps} selectedSymptoms={[]} />,
    );

    expect(screen.getByText("0/5 symptômes")).toBeInTheDocument();

    rerender(
      <SymptomSearchSection
        {...defaultProps}
        selectedSymptoms={["fatigue", "nausée", "fièvre"]}
      />,
    );

    expect(screen.getByText("3/5 symptômes")).toBeInTheDocument();
  });

  it("should handle empty selectedSymptoms array", () => {
    render(<SymptomSearchSection {...defaultProps} selectedSymptoms={[]} />);

    expect(screen.getByTestId("list-symptom-tag")).toBeInTheDocument();
    expect(screen.getByText("0/5 symptômes")).toBeInTheDocument();
  });

  it("should handle maximum 5 symptoms", () => {
    const selectedSymptoms = [
      "fatigue",
      "nausée",
      "fièvre",
      "toux",
      "maux de tête",
    ];
    render(
      <SymptomSearchSection
        {...defaultProps}
        selectedSymptoms={selectedSymptoms}
      />,
    );

    expect(screen.getByText("5/5 symptômes")).toBeInTheDocument();
    selectedSymptoms.forEach((symptom) => {
      expect(screen.getByText(`${symptom} ×`)).toBeInTheDocument();
    });
  });
});
