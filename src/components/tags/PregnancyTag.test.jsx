// components/tag/PregnancyTag.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PregnancyTag from "./PregnancyTag";

describe("PregnancyTag", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<PregnancyTag />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<PregnancyTag />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title", () => {
      render(<PregnancyTag />);
      expect(
        screen.getByTitle(
          "Ce remède peut être utilisé sans danger pendant la grossesse",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<PregnancyTag className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<PregnancyTag />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-lime-100");
      expect(tag).toHaveClass("text-lime-800");
    });
  });

  describe("Variant prop", () => {
    it("should display default variant text", () => {
      render(<PregnancyTag />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should display default variant when explicitly specified", () => {
      render(<PregnancyTag variant="default" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should display ok variant text", () => {
      render(<PregnancyTag variant="ok" />);
      expect(screen.getByText("Grossesse OK")).toBeInTheDocument();
    });

    it("should not display ok variant text when default variant is used", () => {
      render(<PregnancyTag variant="default" />);
      expect(screen.queryByText("Grossesse OK")).not.toBeInTheDocument();
    });
  });

  describe("Size prop", () => {
    it("should render with small size by default", () => {
      const { container } = render(<PregnancyTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should render with medium size when specified", () => {
      const { container } = render(<PregnancyTag size="md" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("should render with small size when explicitly specified", () => {
      const { container } = render(<PregnancyTag size="sm" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<PregnancyTag />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<PregnancyTag showLabel={false} />);
      expect(screen.queryByText("Grossesse")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<PregnancyTag showLabel={true} />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should hide ok variant label when showLabel is false", () => {
      render(<PregnancyTag variant="ok" showLabel={false} />);
      expect(screen.queryByText("Grossesse OK")).not.toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(<PregnancyTag showLabel={false} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<PregnancyTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<PregnancyTag />);
      const tag = screen.getByTitle(
        "Ce remède peut être utilisé sans danger pendant la grossesse",
      );
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Combined props", () => {
    it("should render medium size with ok variant", () => {
      const { container } = render(<PregnancyTag variant="ok" size="md" />);
      const icon = container.querySelector("svg");

      expect(screen.getByText("Grossesse OK")).toBeInTheDocument();
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("should render with all props customized", () => {
      const { container } = render(
        <PregnancyTag
          variant="ok"
          size="md"
          showLabel={true}
          className="custom"
        />,
      );

      expect(screen.getByText("Grossesse OK")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-5", "w-5");
    });
  });
});
