// components/tag/VerifiedTag.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VerifiedTag from "./VerifiedTag";

describe("VerifiedTag", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<VerifiedTag />);
      expect(screen.getByText("Vérifié")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<VerifiedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title", () => {
      render(<VerifiedTag />);
      expect(
        screen.getByTitle("Vérifié par un professionnel de santé"),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<VerifiedTag className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<VerifiedTag />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-sky-100");
      expect(tag).toHaveClass("text-sky-800");
    });
  });

  describe("Size prop", () => {
    it("should render with small size by default", () => {
      const { container } = render(<VerifiedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should render with medium size when specified", () => {
      const { container } = render(<VerifiedTag size="md" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("should render with small size when explicitly specified", () => {
      const { container } = render(<VerifiedTag size="sm" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<VerifiedTag />);
      expect(screen.getByText("Vérifié")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<VerifiedTag showLabel={false} />);
      expect(screen.queryByText("Vérifié")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<VerifiedTag showLabel={true} />);
      expect(screen.getByText("Vérifié")).toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(<VerifiedTag showLabel={false} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<VerifiedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<VerifiedTag />);
      const tag = screen.getByTitle("Vérifié par un professionnel de santé");
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <VerifiedTag />
          <VerifiedTag showLabel={false} />
          <VerifiedTag size="md" />
        </div>,
      );

      const labels = screen.getAllByText("Vérifié");
      expect(labels).toHaveLength(2);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });
  });
});
