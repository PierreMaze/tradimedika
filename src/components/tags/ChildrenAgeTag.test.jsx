// components/tag/ChildrenAgeTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ChildrenAgeTag from "./ChildrenAgeTag";

describe("ChildrenAgeTag", () => {
  describe("Rendering", () => {
    it("should render with age limit (number)", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should render with no age limit (null)", () => {
      render(<ChildrenAgeTag age={null} />);
      expect(screen.getByText("Tout public")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title with age limit", () => {
      render(<ChildrenAgeTag age={6} />);
      expect(
        screen.getByTitle(
          "Ce remède peut être utilisé chez l’enfant à partir de 6 ans, dans le respect des doses recommandées.",
        ),
      ).toBeInTheDocument();
    });

    it("should have tooltip title with no age limit", () => {
      render(<ChildrenAgeTag age={null} />);
      expect(
        screen.getByTitle(
          "Ce remède peut être utilisé chez l’enfant sans limite d’âge, dans le respect des doses recommandées.",
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
      expect(tag).toHaveClass("bg-amber-100");
      expect(tag).toHaveClass("text-amber-800");
    });
  });

  describe("Age prop variants", () => {
    it("should display age in label when age is number", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should display 'Tout public' when age is null", () => {
      render(<ChildrenAgeTag age={null} />);
      expect(screen.getByText("Tout public")).toBeInTheDocument();
    });

    it("should not display 'Tout public' when age is number", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.queryByText("Tout public")).not.toBeInTheDocument();
    });

    it("should not display age limit when age is null", () => {
      render(<ChildrenAgeTag age={null} />);
      expect(screen.queryByText(/Enfants \+\d+ ans/)).not.toBeInTheDocument();
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
          "Ce remède peut être utilisé chez l’enfant à partir de 3 ans, dans le respect des doses recommandées.",
        ),
      ).toBeInTheDocument();

      rerender(<ChildrenAgeTag age={10} />);
      expect(
        screen.getByTitle(
          "Ce remède peut être utilisé chez l’enfant à partir de 10 ans, dans le respect des doses recommandées.",
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

  describe("Color styling variants", () => {
    it("should have green styling when age is null (no limit)", () => {
      const { container } = render(<ChildrenAgeTag age={null} />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("bg-green-100");
      expect(tag).toHaveClass("text-green-800");
      expect(tag).toHaveClass("dark:bg-green-900");
      expect(tag).toHaveClass("dark:text-green-200");
    });

    it("should have amber styling when age is number (with limit)", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("bg-amber-100");
      expect(tag).toHaveClass("text-amber-800");
      expect(tag).toHaveClass("dark:bg-amber-900");
      expect(tag).toHaveClass("dark:text-amber-200");
    });

    it("should not have green styling when age is number", () => {
      const { container } = render(<ChildrenAgeTag age={6} />);
      const tag = container.firstChild;
      expect(tag).not.toHaveClass("bg-green-100");
      expect(tag).not.toHaveClass("text-green-800");
    });

    it("should not have amber styling when age is null", () => {
      const { container } = render(<ChildrenAgeTag age={null} />);
      const tag = container.firstChild;
      expect(tag).not.toHaveClass("bg-amber-100");
      expect(tag).not.toHaveClass("text-amber-800");
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

    it("should render checkmark icon when age is null", () => {
      const { container } = render(<ChildrenAgeTag age={null} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // IoMdCheckmarkCircleOutline a un viewBox différent de FiInfo
    });

    it("should render info icon when age is number", () => {
      const { container } = render(<ChildrenAgeTag age={3} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      // FiInfo est l'icône utilisée pour les limites d'âge
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default with age limit", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByText("Enfants +3 ans")).toBeInTheDocument();
    });

    it("should show label by default with no age limit", () => {
      render(<ChildrenAgeTag age={null} />);
      expect(screen.getByText("Tout public")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false (age limit)", () => {
      render(<ChildrenAgeTag age={3} showLabel={false} />);
      expect(screen.queryByText("Enfants +3 ans")).not.toBeInTheDocument();
    });

    it("should hide label when showLabel is false (no age limit)", () => {
      render(<ChildrenAgeTag age={null} showLabel={false} />);
      expect(screen.queryByText("Tout public")).not.toBeInTheDocument();
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

    it("should have tooltip with descriptive text (age limit)", () => {
      render(<ChildrenAgeTag age={5} />);
      const tag = screen.getByTitle(
        "Ce remède peut être utilisé chez l’enfant à partir de 5 ans, dans le respect des doses recommandées.",
      );
      expect(tag).toBeInTheDocument();
    });

    it("should have tooltip with descriptive text (no age limit)", () => {
      render(<ChildrenAgeTag age={null} />);
      const tag = screen.getByTitle(
        "Ce remède peut être utilisé chez l’enfant sans limite d’âge, dans le respect des doses recommandées.",
      );
      expect(tag).toBeInTheDocument();
    });

    it("should have data-testid attribute", () => {
      render(<ChildrenAgeTag age={3} />);
      expect(screen.getByTestId("children-tag")).toBeInTheDocument();
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

    it("should render with all props customized (age limit)", () => {
      const { container } = render(
        <ChildrenAgeTag age={12} showLabel={true} className="custom" />,
      );

      expect(screen.getByText("Enfants +12 ans")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with all props customized (no age limit)", () => {
      const { container } = render(
        <ChildrenAgeTag age={null} showLabel={true} className="custom" />,
      );

      expect(screen.getByText("Tout public")).toBeInTheDocument();
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

    it("should render mixed instances with and without age limits", () => {
      const { container } = render(
        <div>
          <ChildrenAgeTag age={null} />
          <ChildrenAgeTag age={6} />
        </div>,
      );

      expect(screen.getByText("Tout public")).toBeInTheDocument();
      expect(screen.getByText("Enfants +6 ans")).toBeInTheDocument();

      const tags = container.querySelectorAll('[data-testid="children-tag"]');
      expect(tags).toHaveLength(2);
    });
  });
});
