// components/tag/SymptomTag.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SymptomTag from "./SymptomTag";

describe("SymptomTag", () => {
  describe("Rendering", () => {
    it("should render with symptom text", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      expect(screen.getByText("Fatigue")).toBeInTheDocument();
    });

    it("should capitalize first letter of symptom", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="nausée" onRemove={onRemove} />);
      expect(screen.getByText("Nausée")).toBeInTheDocument();
    });

    it("should render close icon", () => {
      const onRemove = vi.fn();
      const { container } = render(
        <SymptomTag symptom="stress" onRemove={onRemove} />,
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have button role", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render as a button element", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Accessibility", () => {
    it("should have accessible aria-label", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      expect(screen.getByLabelText("Supprimer fatigue")).toBeInTheDocument();
    });

    it("should have aria-label with original symptom text", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="nausée" onRemove={onRemove} />);
      expect(screen.getByLabelText("Supprimer nausée")).toBeInTheDocument();
    });

    it("should be keyboard accessible", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });
  });

  describe("Interaction", () => {
    it("should call onRemove when clicked", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");

      await user.click(button);

      expect(onRemove).toHaveBeenCalledWith("fatigue");
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it("should call onRemove with correct symptom", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(<SymptomTag symptom="nausée" onRemove={onRemove} />);
      const button = screen.getByRole("button");

      await user.click(button);

      expect(onRemove).toHaveBeenCalledWith("nausée");
    });

    it("should call onRemove on keyboard Enter", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(<SymptomTag symptom="stress" onRemove={onRemove} />);
      const button = screen.getByRole("button");

      button.focus();
      await user.keyboard("{Enter}");

      expect(onRemove).toHaveBeenCalledWith("stress");
    });

    it("should call onRemove on keyboard Space", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");

      button.focus();
      await user.keyboard(" ");

      expect(onRemove).toHaveBeenCalledWith("fatigue");
    });

    it("should handle multiple clicks", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(onRemove).toHaveBeenCalledTimes(3);
    });
  });

  describe("Text capitalization", () => {
    it("should capitalize lowercase symptom", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      expect(screen.getByText("Fatigue")).toBeInTheDocument();
    });

    it("should capitalize symptom starting with uppercase", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="Stress" onRemove={onRemove} />);
      expect(screen.getByText("Stress")).toBeInTheDocument();
    });

    it("should handle French accents correctly", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="état de fatigue" onRemove={onRemove} />);
      expect(screen.getByText("État de fatigue")).toBeInTheDocument();
    });

    it("should handle single character symptom", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="a" onRemove={onRemove} />);
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("should preserve rest of text after first character", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="FATIGUE" onRemove={onRemove} />);
      expect(screen.getByText("FATIGUE")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have cursor-pointer class", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("cursor-pointer");
    });

    it("should have flex layout", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("flex");
    });

    it("should have rounded styling", () => {
      const onRemove = vi.fn();
      render(<SymptomTag symptom="fatigue" onRemove={onRemove} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-md");
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple tags independently", () => {
      const onRemove = vi.fn();

      render(
        <div>
          <SymptomTag symptom="fatigue" onRemove={onRemove} />
          <SymptomTag symptom="stress" onRemove={onRemove} />
          <SymptomTag symptom="nausée" onRemove={onRemove} />
        </div>,
      );

      expect(screen.getByText("Fatigue")).toBeInTheDocument();
      expect(screen.getByText("Stress")).toBeInTheDocument();
      expect(screen.getByText("Nausée")).toBeInTheDocument();

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("should call onRemove with correct symptom for each tag", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();

      render(
        <div>
          <SymptomTag symptom="fatigue" onRemove={onRemove} />
          <SymptomTag symptom="stress" onRemove={onRemove} />
        </div>,
      );

      const buttons = screen.getAllByRole("button");

      await user.click(buttons[0]);
      expect(onRemove).toHaveBeenCalledWith("fatigue");

      await user.click(buttons[1]);
      expect(onRemove).toHaveBeenCalledWith("stress");
    });
  });
});
