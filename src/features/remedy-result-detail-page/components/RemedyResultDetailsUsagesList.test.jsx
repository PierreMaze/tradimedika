import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsUsagesList from "./RemedyResultDetailsUsagesList";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
  },
}));

vi.mock("../utils/formatUsageFrequency", () => ({
  formatUsageFrequency: vi.fn((frequency) => {
    if (!frequency || !frequency.value) return "";
    return `${frequency.value} fois par ${frequency.unit}`;
  }),
}));

describe("RemedyResultDetailsUsagesList", () => {
  describe("Rendering", () => {
    it("should render usages section with title", () => {
      const uses = [
        {
          form: ["infusion"],
          dose: { value: 1, unit: "tasse" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);

      const heading = screen.getByRole("heading", { name: /utilisations/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("should render icon in the heading", () => {
      const uses = [
        {
          form: ["infusion"],
        },
      ];

      const { container } = render(
        <RemedyResultDetailsUsagesList uses={uses} />,
      );
      const icon = container.querySelector("svg"); // react-icons rend un <svg>
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should render form when provided", () => {
      const uses = [
        {
          form: ["infusion", "décoction"],
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("infusion, décoction")).toBeInTheDocument();
    });

    it("should render dose when provided", () => {
      const uses = [
        {
          dose: { value: 2, unit: "cuillères à soupe" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText(/2 cuillères à soupe/)).toBeInTheDocument();
    });

    it("should render frequency when provided", () => {
      const uses = [
        {
          frequency: { value: 3, unit: "jour" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText(/3 fois par jour/)).toBeInTheDocument();
    });

    it("should render duration when provided", () => {
      const uses = [
        {
          duration: { value: 7, unit: "jours" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText(/Pendant 7 jours/)).toBeInTheDocument();
    });

    it("should render description when provided", () => {
      const uses = [
        {
          description: "Boire chaud de préférence",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Boire chaud de préférence")).toBeInTheDocument();
    });

    it("should render complete usage with all fields", () => {
      const uses = [
        {
          form: ["infusion"],
          dose: { value: 1, unit: "tasse" },
          frequency: { value: 3, unit: "jour" },
          duration: { value: 5, unit: "jours" },
          description: "Boire chaud",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("infusion")).toBeInTheDocument();
      expect(screen.getByText(/1 tasse/)).toBeInTheDocument();
      expect(screen.getByText(/3 fois par jour/)).toBeInTheDocument();
      expect(screen.getByText(/Pendant 5 jours/)).toBeInTheDocument();
      expect(screen.getByText("Boire chaud")).toBeInTheDocument();
    });

    it("should call formatUsageFrequency utility for frequency formatting", () => {
      const uses = [
        {
          frequency: { value: 2, unit: "jour" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText(/2 fois par jour/)).toBeInTheDocument();
    });

    it("should render multiple usages", () => {
      const uses = [
        { form: ["infusion"], description: "Usage 1" },
        { form: ["décoction"], description: "Usage 2" },
        { form: ["cataplasme"], description: "Usage 3" },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Usage 1")).toBeInTheDocument();
      expect(screen.getByText("Usage 2")).toBeInTheDocument();
      expect(screen.getByText("Usage 3")).toBeInTheDocument();
    });

    it("should render separators between fields", () => {
      const uses = [
        {
          form: ["infusion"],
          dose: { value: 1, unit: "tasse" },
          frequency: { value: 2, unit: "jour" },
        },
      ];

      const { container } = render(
        <RemedyResultDetailsUsagesList uses={uses} />,
      );

      const separators = container.querySelectorAll(".text-neutral-400");
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should return null when uses is null", () => {
      const { container } = render(
        <RemedyResultDetailsUsagesList uses={null} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should return null when uses is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsUsagesList uses={undefined} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should return null when uses is an empty array", () => {
      const { container } = render(<RemedyResultDetailsUsagesList uses={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("should handle usage without form", () => {
      const uses = [
        {
          dose: { value: 1, unit: "tasse" },
          description: "Test",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle usage with empty form array", () => {
      const uses = [
        {
          form: [],
          description: "Test",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle usage without dose value", () => {
      const uses = [
        {
          dose: { unit: "tasse" },
          description: "Test",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle usage without frequency value", () => {
      const uses = [
        {
          frequency: { unit: "jour" },
          description: "Test",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle usage without duration value", () => {
      const uses = [
        {
          duration: { unit: "jours" },
          description: "Test",
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle usage without description", () => {
      const uses = [
        {
          form: ["infusion"],
          dose: { value: 1, unit: "tasse" },
        },
      ];

      render(<RemedyResultDetailsUsagesList uses={uses} />);
      expect(screen.getByText("infusion")).toBeInTheDocument();
      expect(screen.getByText(/1 tasse/)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const uses = [{ description: "test" }];
      const { container } = render(
        <RemedyResultDetailsUsagesList uses={uses} />,
      );
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const uses = [{ description: "test" }];
      render(<RemedyResultDetailsUsagesList uses={uses} />);
      const heading = screen.getByRole("heading", { name: /utilisations/i });
      expect(heading.tagName).toBe("H2");
    });

    it("should use unordered list for usages", () => {
      const uses = [{ description: "test1" }, { description: "test2" }];
      render(<RemedyResultDetailsUsagesList uses={uses} />);
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
    });

    it("should have emerald border for visual distinction", () => {
      const uses = [{ description: "test" }];
      const { container } = render(
        <RemedyResultDetailsUsagesList uses={uses} />,
      );
      const listItem = container.querySelector("li");
      expect(listItem).toHaveClass("border-l-4", "border-emerald-600");
    });
  });
});
