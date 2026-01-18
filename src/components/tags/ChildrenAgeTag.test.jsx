// components/tag/ChildrenAgeTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChildrenAgeTag from "./ChildrenAgeTag";

describe("ChildrenAgeTag", () => {
  describe("Rendering", () => {
    it("should render with required age prop", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title with age", () => {
      render(<ChildrenAgeTag age={6} />);
      expect(
        screen.getByTitle(
          "Ce remède est strictement adapté aux enfants de plus de 6 ans",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <ChildrenAgeTag age={3} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-teal-100");
      expect(tag).toHaveClass("text-teal-800");
    });
  });

  describe("Age prop", () => {
    it("should display age in label", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should display different ages correctly", () => {
      const { rerender } = render(<ChildrenAgeTag age={6} />);
      expect(screen.getByText("Enfants +6 ans")).toBeInTheDocument();

      rerender(<ChildrenAgeTag age={12} />);
      expect(screen.getByText("Enfants +12 ans")).toBeInTheDocument();

      rerender(<ChildrenAgeTag age={2} />);
      expect(screen.getByText("Enfants +2 ans")).toBeInTheDocument();
    });

    it("should update tooltip title when age changes", () => {
      const { rerender } = render(<ChildrenAgeTag age={3} />);
      expect(
        screen.getByTitle(
          "Ce remède est strictement adapté aux enfants de plus de 3 ans",
        ),
      ).toBeInTheDocument();

      rerender(<ChildrenAgeTag age={10} />);
      expect(
        screen.getByTitle(
          "Ce remède est strictement adapté aux enfants de plus de 10 ans",
        ),
      ).toBeInTheDocument();
    });

    it("should handle single digit ages", () => {
      render(<ChildrenAgeTag age={1} />);
      expect(screen.getByText("Enfants +1 ans")).toBeInTheDocument();
    });

    it("should handle double digit ages", () => {
      render(<ChildrenAgeTag age={15} />);
      expect(screen.getByText("Enfants +15 ans")).toBeInTheDocument();
    });
  });

  describe("Icon styling", () => {
    it("should render icon with base size classes", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should have responsive icon size classes", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("lg:h-5", "lg:w-5");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<ChildrenAgeTag age={3} showLabel={false} />);
      expect(screen.queryByText("Enfants +3 ans")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<ChildrenAgeTag age={3} showLabel={true} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(
        <ChildrenAgeTag age={3} showLabel={false} />,
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<ChildrenAgeTag age={5} />);
      const tag = screen.getByTitle(
        "Ce remède est strictement adapté aux enfants de plus de 5 ans",
      );
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Combined props", () => {
    it("should render with custom className and specific age", () => {
      const { container } = render(
        <ChildrenAgeTag age={8} className="custom" />,
      );

      expect(screen.getByText("Enfants +8 ans")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with all props customized", () => {
      const { container } = render(
        <ChildrenAgeTag age={12} showLabel={true} className="custom" />,
      );

      expect(screen.getByText("Enfants +12 ans")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances with different ages", () => {
      render(
        <div>
          <ChildrenAgeTag age={3} />
          <ChildrenAgeTag age={6} />
          <ChildrenAgeTag age={12} />
        </div>,
      );

      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
      expect(screen.getByText("Enfants +6 ans")).toBeInTheDocument();
      expect(screen.getByText("Enfants +12 ans")).toBeInTheDocument();
    });
  });
});
