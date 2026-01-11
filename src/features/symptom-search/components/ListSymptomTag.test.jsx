// components/tag/ListSymptomTag.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListSymptomTag from "./ListSymptomTag";

describe("ListSymptomTag", () => {
  describe("Rendering", () => {
    it("should render nothing when symptoms array is empty", () => {
      const { container } = render(
        <ListSymptomTag symptoms={[]} onRemoveSymptom={vi.fn()} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render all symptoms", () => {
      const onRemoveSymptom = vi.fn();
      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress", "nausée"]}
          onRemoveSymptom={onRemoveSymptom}
        />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      expect(screen.getByText("Stress")).toBeInTheDocument();
      expect(screen.getByText("Nausée")).toBeInTheDocument();
    });

    it("should render correct number of tags", () => {
      const symptoms = ["fatigue", "stress", "nausée"];
      render(<ListSymptomTag symptoms={symptoms} onRemoveSymptom={vi.fn()} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("should render single symptom", () => {
      render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });

    it("should render many symptoms", () => {
      const symptoms = ["fatigue", "stress", "nausée", "douleur", "insomnie"];
      render(<ListSymptomTag symptoms={symptoms} onRemoveSymptom={vi.fn()} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });
  });

  describe("Interaction", () => {
    it("should call onRemoveSymptom with correct symptom", async () => {
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress"]}
          onRemoveSymptom={onRemoveSymptom}
        />,
      );

      const buttons = screen.getAllByRole("button");
      await user.click(buttons[0]);

      expect(onRemoveSymptom).toHaveBeenCalledWith("fatigue");
      expect(onRemoveSymptom).toHaveBeenCalledTimes(1);
    });

    it("should call onRemoveSymptom for different symptoms", async () => {
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress", "nausée"]}
          onRemoveSymptom={onRemoveSymptom}
        />,
      );

      const buttons = screen.getAllByRole("button");

      await user.click(buttons[1]);
      expect(onRemoveSymptom).toHaveBeenCalledWith("stress");

      await user.click(buttons[2]);
      expect(onRemoveSymptom).toHaveBeenCalledWith("nausée");
    });

    it("should handle multiple removals", async () => {
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress"]}
          onRemoveSymptom={onRemoveSymptom}
        />,
      );

      const buttons = screen.getAllByRole("button");
      await user.click(buttons[0]);
      await user.click(buttons[1]);

      expect(onRemoveSymptom).toHaveBeenCalledTimes(2);
    });
  });

  describe("Key prop handling", () => {
    it("should handle list with unique symptoms", async () => {
      const { rerender } = render(
        <ListSymptomTag
          symptoms={["fatigue", "stress"]}
          onRemoveSymptom={vi.fn()}
        />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      expect(screen.getByText("Stress")).toBeInTheDocument();

      rerender(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByText("Stress")).not.toBeInTheDocument();
      });
    });

    it("should update when symptoms list changes", async () => {
      const { rerender } = render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();

      rerender(
        <ListSymptomTag
          symptoms={["stress", "nausée"]}
          onRemoveSymptom={vi.fn()}
        />,
      );

      await waitFor(() => {
        expect(screen.queryByText("Fatigue")).not.toBeInTheDocument();
      });
      expect(screen.getByText("Stress")).toBeInTheDocument();
      expect(screen.getByText("Nausée")).toBeInTheDocument();
    });
  });

  describe("Empty state", () => {
    it("should return null for empty array", () => {
      const { container } = render(
        <ListSymptomTag symptoms={[]} onRemoveSymptom={vi.fn()} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should not render any DOM when empty", () => {
      const { container } = render(
        <ListSymptomTag symptoms={[]} onRemoveSymptom={vi.fn()} />,
      );

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Styling", () => {
    it("should have flex layout", () => {
      const { container } = render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
    });

    it("should have flex-wrap class", () => {
      const { container } = render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex-wrap");
    });

    it("should have centered alignment on mobile", () => {
      const { container } = render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("justify-center");
    });

    it("should have gap between items", () => {
      const { container } = render(
        <ListSymptomTag symptoms={["fatigue"]} onRemoveSymptom={vi.fn()} />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("gap-2");
    });
  });

  describe("Accessibility", () => {
    it("should render accessible buttons for each symptom", () => {
      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress"]}
          onRemoveSymptom={vi.fn()}
        />,
      );

      expect(screen.getByLabelText("Supprimer fatigue")).toBeInTheDocument();
      expect(screen.getByLabelText("Supprimer stress")).toBeInTheDocument();
    });

    it("should have proper aria-labels", () => {
      render(
        <ListSymptomTag symptoms={["nausée"]} onRemoveSymptom={vi.fn()} />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Supprimer nausée");
    });
  });

  describe("Edge cases", () => {
    it("should handle symptoms with special characters", () => {
      render(
        <ListSymptomTag
          symptoms={["état de fatigue", "mal-être"]}
          onRemoveSymptom={vi.fn()}
        />,
      );

      expect(screen.getByText("État de fatigue")).toBeInTheDocument();
      expect(screen.getByText("Mal-être")).toBeInTheDocument();
    });

    it("should handle very long symptom lists", () => {
      const longList = Array.from({ length: 20 }, (_, i) => `symptom${i}`);
      render(<ListSymptomTag symptoms={longList} onRemoveSymptom={vi.fn()} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(20);
    });

    it("should preserve symptom order", () => {
      render(
        <ListSymptomTag
          symptoms={["premier", "deuxième", "troisième"]}
          onRemoveSymptom={vi.fn()}
        />,
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveTextContent("Premier");
      expect(buttons[1]).toHaveTextContent("Deuxième");
      expect(buttons[2]).toHaveTextContent("Troisième");
    });
  });

  describe("Component isolation", () => {
    it("should pass onRemoveSymptom to each SymptomTag", async () => {
      const onRemoveSymptom = vi.fn();
      const user = userEvent.setup();

      render(
        <ListSymptomTag
          symptoms={["fatigue", "stress"]}
          onRemoveSymptom={onRemoveSymptom}
        />,
      );

      const buttons = screen.getAllByRole("button");

      await user.click(buttons[0]);
      expect(onRemoveSymptom).toHaveBeenCalledWith("fatigue");

      await user.click(buttons[1]);
      expect(onRemoveSymptom).toHaveBeenCalledWith("stress");
    });

    it("should render SymptomTag for each symptom", () => {
      const symptoms = ["a", "b", "c"];
      render(<ListSymptomTag symptoms={symptoms} onRemoveSymptom={vi.fn()} />);

      expect(screen.getAllByRole("button")).toHaveLength(3);
    });
  });
});
