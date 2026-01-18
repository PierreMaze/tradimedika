// components/tag/TraditionnalTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TraditionnalTag from "./TraditionnalTag";

describe("TraditionnalTag", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<TraditionnalTag />);
      expect(screen.getByText("Traditionnel")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<TraditionnalTag />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title", () => {
      render(<TraditionnalTag />);
      expect(
        screen.getByTitle(
          "Ce remède n'a pas été approuvé par un professionnel de santé, il est donc considéré comme un remède non prouvé pour son efficacité",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <TraditionnalTag className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<TraditionnalTag />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-lime-100");
      expect(tag).toHaveClass("text-lime-800");
    });
  });

  describe("Icon styling", () => {
    it("should render icon with base size classes", () => {
      const { container } = render(<TraditionnalTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-3", "w-3");
    });

    it("should have responsive icon size classes", () => {
      const { container } = render(<TraditionnalTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("lg:h-4", "lg:w-4");
    });

    it("should have rotation classes", () => {
      const { container } = render(<TraditionnalTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("rotate-90", "rotate-x-180");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<TraditionnalTag />);
      expect(screen.getByText("Traditionnel")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<TraditionnalTag showLabel={false} />);
      expect(screen.queryByText("Traditionnel")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<TraditionnalTag showLabel={true} />);
      expect(screen.getByText("Traditionnel")).toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(<TraditionnalTag showLabel={false} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<TraditionnalTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<TraditionnalTag />);
      const tag = screen.getByTitle(
        "Ce remède n'a pas été approuvé par un professionnel de santé, il est donc considéré comme un remède non prouvé pour son efficacité",
      );
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <TraditionnalTag />
          <TraditionnalTag showLabel={false} />
          <TraditionnalTag showLabel={true} />
        </div>,
      );

      const labels = screen.getAllByText("Traditionnel");
      expect(labels).toHaveLength(2);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });
  });
});
