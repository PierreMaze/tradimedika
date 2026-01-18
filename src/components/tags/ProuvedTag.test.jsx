// components/tag/ProuvedTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProuvedTag from "./ProuvedTag";

describe("ProuvedTag", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<ProuvedTag />);
      expect(screen.getByText("Validé")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title", () => {
      render(<ProuvedTag />);
      expect(
        screen.getByTitle(
          "Ce remède été approué par un professionnel de santé, il est donc considéré comme un remède validé et sûr",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<ProuvedTag className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<ProuvedTag />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-sky-100");
      expect(tag).toHaveClass("text-sky-800");
    });
  });

  describe("Size prop", () => {
    it("should render with small size by default", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should render with medium size when specified", () => {
      const { container } = render(<ProuvedTag size="md" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("should render with small size when explicitly specified", () => {
      const { container } = render(<ProuvedTag size="sm" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<ProuvedTag />);
      expect(screen.getByText("Validé")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<ProuvedTag showLabel={false} />);
      expect(screen.queryByText("Validé")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<ProuvedTag showLabel={true} />);
      expect(screen.getByText("Validé")).toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(<ProuvedTag showLabel={false} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<ProuvedTag />);
      const tag = screen.getByTitle(
        "Ce remède été approué par un professionnel de santé, il est donc considéré comme un remède validé et sûr",
      );
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <ProuvedTag />
          <ProuvedTag showLabel={false} />
          <ProuvedTag size="md" />
        </div>,
      );

      const labels = screen.getAllByText("Validé");
      expect(labels).toHaveLength(2);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });
  });
});
