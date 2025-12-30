import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SymptomsSelector from "./SymptomsSelector";

describe("SymptomsSelector - Focus behavior", () => {
  it("should call onFocus callback when input is focused", () => {
    const onFocus = vi.fn();
    const onSymptomSelect = vi.fn();

    render(
      <SymptomsSelector onSymptomSelect={onSymptomSelect} onFocus={onFocus} />,
    );

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(expect.any(Object)); // Event object
  });

  it("should work without onFocus callback (optional prop)", () => {
    const onSymptomSelect = vi.fn();

    expect(() => {
      render(<SymptomsSelector onSymptomSelect={onSymptomSelect} />);
      const input = screen.getByRole("combobox");
      fireEvent.focus(input);
    }).not.toThrow();
  });
});
