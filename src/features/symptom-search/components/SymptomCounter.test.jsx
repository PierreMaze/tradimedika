import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SymptomCounter from "./SymptomCounter";

describe("SymptomCounter", () => {
  describe("Rendering", () => {
    it("should not render when count is 0", () => {
      const { container } = render(<SymptomCounter count={0} />);

      expect(container.firstChild).toBeNull();
    });

    it("should render when count > 0", () => {
      render(<SymptomCounter count={1} />);

      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should display correct count", () => {
      render(<SymptomCounter count={3} />);

      expect(
        screen.getByText("3/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should use default max of 5", () => {
      render(<SymptomCounter count={2} />);

      expect(
        screen.getByText("2/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should use custom max value", () => {
      render(<SymptomCounter count={2} max={10} />);

      expect(
        screen.getByText("2/10 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });
  });

  describe("Text formatting", () => {
    it("should display singular when count is 1", () => {
      render(<SymptomCounter count={1} />);

      // French uses plural even with 1
      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should display plural when count > 1", () => {
      render(<SymptomCounter count={2} />);

      expect(
        screen.getByText("2/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should display when at maximum", () => {
      render(<SymptomCounter count={5} max={5} />);

      expect(
        screen.getByText("5/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have correct text styling classes", () => {
      render(<SymptomCounter count={1} />);

      const text = screen.getByText("1/5 symptômes sélectionnés");
      expect(text).toHaveClass("text-sm");
      expect(text).toHaveClass("font-medium");
      expect(text).toHaveClass("text-neutral-600");
    });

    it("should have dark mode classes", () => {
      render(<SymptomCounter count={1} />);

      const text = screen.getByText("1/5 symptômes sélectionnés");
      expect(text).toHaveClass("dark:text-neutral-400");
    });

    it("should have transition classes", () => {
      render(<SymptomCounter count={1} />);

      const text = screen.getByText("1/5 symptômes sélectionnés");
      expect(text).toHaveClass("transition");
      expect(text).toHaveClass("duration-300");
    });

    it("should be centered", () => {
      const { container } = render(<SymptomCounter count={1} />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("text-center");
    });
  });

  describe("State changes", () => {
    it("should appear when count changes from 0 to 1", () => {
      const { rerender } = render(<SymptomCounter count={0} />);

      expect(
        screen.queryByText(/symptômes sélectionnés/),
      ).not.toBeInTheDocument();

      rerender(<SymptomCounter count={1} />);

      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should disappear when count changes from 1 to 0", async () => {
      const { rerender } = render(<SymptomCounter count={1} />);

      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();

      rerender(<SymptomCounter count={0} />);

      // Wait for exit animation to complete
      await waitFor(() => {
        expect(
          screen.queryByText(/symptômes sélectionnés/),
        ).not.toBeInTheDocument();
      });
    });

    it("should update count value", () => {
      const { rerender } = render(<SymptomCounter count={1} />);

      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();

      rerender(<SymptomCounter count={3} />);

      expect(
        screen.getByText("3/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("1/5 symptômes sélectionnés"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle count equal to max", () => {
      render(<SymptomCounter count={5} max={5} />);

      expect(
        screen.getByText("5/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should handle count exceeding max", () => {
      render(<SymptomCounter count={7} max={5} />);

      expect(
        screen.getByText("7/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should handle max of 1", () => {
      render(<SymptomCounter count={1} max={1} />);

      expect(
        screen.getByText("1/1 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should handle large max value", () => {
      render(<SymptomCounter count={5} max={100} />);

      expect(
        screen.getByText("5/100 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should handle negative count gracefully", () => {
      const { container } = render(<SymptomCounter count={-1} />);

      // Should not render for negative values (count <= 0)
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Animation presence", () => {
    it("should render within AnimatePresence wrapper", () => {
      render(<SymptomCounter count={1} />);

      // Component should exist after AnimatePresence mount
      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should handle rapid count changes", () => {
      const { rerender } = render(<SymptomCounter count={1} />);

      rerender(<SymptomCounter count={2} />);
      rerender(<SymptomCounter count={3} />);
      rerender(<SymptomCounter count={4} />);

      expect(
        screen.getByText("4/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render text as plain span", () => {
      render(<SymptomCounter count={3} />);

      const text = screen.getByText("3/5 symptômes sélectionnés");
      expect(text.tagName).toBe("SPAN");
    });

    it("should be readable by screen readers", () => {
      render(<SymptomCounter count={3} />);

      const text = screen.getByText("3/5 symptômes sélectionnés");
      expect(text).toBeInTheDocument();
      expect(text).not.toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("PropTypes validation", () => {
    it("should require count prop", () => {
      // This will work but count is required in PropTypes
      render(<SymptomCounter count={1} />);
      expect(
        screen.getByText("1/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should accept optional max prop", () => {
      render(<SymptomCounter count={2} max={10} />);
      expect(
        screen.getByText("2/10 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });

    it("should work without max prop (use default)", () => {
      render(<SymptomCounter count={2} />);
      expect(
        screen.getByText("2/5 symptômes sélectionnés"),
      ).toBeInTheDocument();
    });
  });
});
