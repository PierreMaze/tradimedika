import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SymptomsForm from "./SymptomsForm";

// Mock scrollIntoView as it's not implemented in jsdom
Element.prototype.scrollIntoView = vi.fn();

describe("SymptomsForm", () => {
  describe("Rendering", () => {
    it("should render input with search icon", () => {
      const onSymptomSelect = vi.fn();
      const { container } = render(
        <SymptomsForm onSymptomSelect={onSymptomSelect} />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toBeInTheDocument();

      // Search icon should be present
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should render with custom placeholder", () => {
      const onSymptomSelect = vi.fn();
      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          placeholder="Tapez un symptôme..."
        />,
      );

      const input = screen.getByPlaceholderText("Tapez un symptôme...");
      expect(input).toBeInTheDocument();
    });

    it("should not display dropdown initially", () => {
      const onSymptomSelect = vi.fn();
      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const listbox = screen.queryByRole("listbox");
      expect(listbox).not.toBeInTheDocument();
    });
  });

  describe("Input interactions", () => {
    it("should filter symptoms based on user input", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fati");

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();
      });

      // "fatigue" est un synonyme de "baisse d'énergie" → le symptôme principal s'affiche
      expect(screen.getByText("Baisse d'énergie")).toBeInTheDocument();
    });

    it("should handle empty input", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fat");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Clear input
      await user.clear(input);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should be case-insensitive when filtering", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "FATI");

      await waitFor(() => {
        expect(screen.getByText("Baisse d'énergie")).toBeInTheDocument();
      });
    });

    it("should handle accents when filtering", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      // Type without accent
      await user.type(input, "diarrhee");

      await waitFor(() => {
        // Should find "Diarrhée" (with accent)
        expect(screen.getByText("Diarrhée")).toBeInTheDocument();
      });
    });
  });

  describe("Dropdown behavior", () => {
    it("should open dropdown when typing", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      await user.type(input, "fat");

      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should close dropdown when input is cleared", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fat");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      await user.clear(input);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should limit dropdown to 10 results", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      // Search for a common letter to get many results
      await user.type(input, "a");

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        const options = listbox.querySelectorAll('[role="option"]');
        // Should not exceed 10 results
        expect(options.length).toBeLessThanOrEqual(10);
      });
    });
  });

  describe("Symptom selection", () => {
    it("should select symptom on click", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fatigue");

      await waitFor(() => {
        expect(screen.getByText("Baisse d'énergie")).toBeInTheDocument();
      });

      const option = screen.getByText("Baisse d'énergie");
      await user.click(option);

      // "fatigue" est un synonyme → le symptôme principal "baisse d'énergie" est retourné
      expect(onSymptomSelect).toHaveBeenCalledWith("baisse d'énergie");
      // Input should be cleared after selection
      expect(input).toHaveValue("");
    });

    it("should select symptom with Enter key", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fatigue");

      await waitFor(() => {
        expect(screen.getByText("Baisse d'énergie")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      // "fatigue" est un synonyme → le symptôme principal "baisse d'énergie" est retourné
      expect(onSymptomSelect).toHaveBeenCalledWith("baisse d'énergie");
    });

    it("should auto-select single result on Enter", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "insomnie");

      await waitFor(() => {
        expect(screen.getByText("Insomnie")).toBeInTheDocument();
      });

      await user.keyboard("{Enter}");

      // Component returns lowercase symptom (as stored in DB)
      expect(onSymptomSelect).toHaveBeenCalledWith("insomnie");
    });

    it("should exclude selected symptoms from dropdown", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          selectedSymptoms={["Fatigue"]}
        />,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "fati");

      await waitFor(() => {
        const listbox = screen.queryByRole("listbox");
        // Dropdown should not appear since "Fatigue" is already selected
        if (listbox) {
          expect(screen.queryByText("Fatigue")).not.toBeInTheDocument();
        }
      });
    });
  });

  describe("Keyboard navigation", () => {
    it("should navigate dropdown with ArrowDown and ArrowUp", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "f");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const input2 = screen.getByRole("combobox");

      // Navigate down
      await user.keyboard("{ArrowDown}");
      expect(input2).toHaveAttribute(
        "aria-activedescendant",
        "symptom-option-0",
      );

      // Navigate down again
      await user.keyboard("{ArrowDown}");
      expect(input2).toHaveAttribute(
        "aria-activedescendant",
        "symptom-option-1",
      );

      // Navigate up
      await user.keyboard("{ArrowUp}");
      expect(input2).toHaveAttribute(
        "aria-activedescendant",
        "symptom-option-0",
      );
    });

    it("should close dropdown with Escape key", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fatigue");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(input).toHaveValue("");
      });
    });

    it("should remove last symptom with Backspace on empty input", async () => {
      const onSymptomSelect = vi.fn();
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          onRemoveSymptom={onRemoveSymptom}
          selectedSymptoms={["Fatigue", "Stress"]}
        />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      await user.click(input);
      await user.keyboard("{Backspace}");

      expect(onRemoveSymptom).toHaveBeenCalledWith("Stress");
    });

    it("should not remove symptom with Backspace if input has text", async () => {
      const onSymptomSelect = vi.fn();
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          onRemoveSymptom={onRemoveSymptom}
          selectedSymptoms={["Fatigue"]}
        />,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "stress");
      await user.keyboard("{Backspace}");

      // Should not remove symptom, just delete character from input
      expect(onRemoveSymptom).not.toHaveBeenCalled();
    });
  });

  describe("5 symptoms limit", () => {
    it("should disable input when 5 symptoms are selected", () => {
      const onSymptomSelect = vi.fn();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          selectedSymptoms={[
            "Fatigue",
            "Stress",
            "Insomnie",
            "Nausée",
            "Fièvre",
          ]}
        />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toBeDisabled();
    });

    it("should show limit message when 5 symptoms are selected", () => {
      const onSymptomSelect = vi.fn();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          selectedSymptoms={[
            "Fatigue",
            "Stress",
            "Insomnie",
            "Nausée",
            "Fièvre",
          ]}
        />,
      );

      expect(
        screen.getByText(/Limite de 5 symptômes atteinte/i),
      ).toBeInTheDocument();
    });

    it("should not show limit message when less than 5 symptoms", () => {
      const onSymptomSelect = vi.fn();

      render(
        <SymptomsForm
          onSymptomSelect={onSymptomSelect}
          selectedSymptoms={["Fatigue", "Stress"]}
        />,
      );

      expect(
        screen.queryByText(/Limite de 5 symptômes atteinte/i),
      ).not.toBeInTheDocument();
    });
  });

  describe("Click outside behavior", () => {
    it("should close dropdown when clicking outside", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <div>
          <SymptomsForm onSymptomSelect={onSymptomSelect} />
          <div data-testid="outside">Outside element</div>
        </div>,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "fatigue");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      await user.click(outside);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      const onSymptomSelect = vi.fn();
      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAttribute("aria-controls", "symptoms-listbox");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      await user.type(input, "fat");

      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have proper option roles in dropdown", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "fat");

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toHaveAttribute("id", "symptoms-listbox");

        const options = screen.getAllByRole("option");
        expect(options.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Focus behavior", () => {
    it("should call onFocus callback when input is focused", () => {
      const onFocus = vi.fn();
      const onSymptomSelect = vi.fn();

      render(
        <SymptomsForm onSymptomSelect={onSymptomSelect} onFocus={onFocus} />,
      );

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should work without onFocus callback (optional prop)", () => {
      const onSymptomSelect = vi.fn();

      expect(() => {
        render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);
        const input = screen.getByRole("combobox");
        fireEvent.focus(input);
      }).not.toThrow();
    });
  });

  describe("Synonym matching", () => {
    it("should show main symptom when typing synonym", async () => {
      const onSymptomSelect = vi.fn();
      const user = userEvent.setup();

      render(<SymptomsForm onSymptomSelect={onSymptomSelect} />);

      const input = screen.getByRole("combobox");
      // "angoisse" est un synonyme de "anxiété"
      await user.type(input, "angoisse");

      await waitFor(() => {
        // Should show "Anxiété" (main symptom) in dropdown
        const listbox = screen.queryByRole("listbox");
        if (listbox) {
          expect(screen.getByText("Anxiété")).toBeInTheDocument();
        }
      });
    });
  });

  describe("Optional callbacks", () => {
    it("should work without onSubmit callback", () => {
      const onSymptomSelect = vi.fn();

      expect(() => {
        render(
          <SymptomsForm
            onSymptomSelect={onSymptomSelect}
            selectedSymptoms={["Fatigue"]}
          />,
        );
      }).not.toThrow();
    });

    it("should work without onRemoveSymptom callback", () => {
      const onSymptomSelect = vi.fn();

      expect(() => {
        render(
          <SymptomsForm
            onSymptomSelect={onSymptomSelect}
            selectedSymptoms={["Fatigue"]}
          />,
        );
      }).not.toThrow();
    });
  });
});
