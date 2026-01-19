// components/tag/PregnancyTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PregnancyTag from "./PregnancyTag";

describe("PregnancyTag", () => {
  describe("Rendering", () => {
    it("should render with variant prop", () => {
      render(<PregnancyTag variant="ok" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title for ok variant", () => {
      render(<PregnancyTag variant="ok" />);
      expect(
        screen.getByTitle(
          "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <PregnancyTag variant="ok" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have data-testid attribute", () => {
      render(<PregnancyTag variant="ok" />);
      expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
    });
  });

  describe("Variant prop - ok", () => {
    it("should display Grossesse label", () => {
      render(<PregnancyTag variant="ok" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should have green styling classes", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-green-100");
      expect(tag).toHaveClass("text-green-800");
      expect(tag).toHaveClass("dark:bg-green-900");
      expect(tag).toHaveClass("dark:text-green-200");
    });

    it("should have correct tooltip for ok variant", () => {
      render(<PregnancyTag variant="ok" />);
      expect(
        screen.getByTitle(
          "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
        ),
      ).toBeInTheDocument();
    });

    it("should render checkmark icon", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Variant prop - variant", () => {
    it("should display Grossesse label", () => {
      render(<PregnancyTag variant="variant" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should have amber styling classes", () => {
      const { container } = render(<PregnancyTag variant="variant" />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-amber-100");
      expect(tag).toHaveClass("text-amber-800");
      expect(tag).toHaveClass("dark:bg-amber-900");
      expect(tag).toHaveClass("dark:text-amber-200");
    });

    it("should have correct tooltip for variant variant", () => {
      render(<PregnancyTag variant="variant" />);
      expect(
        screen.getByTitle(
          "Données insuffisantes ou usage conditionnel. Consulter un professionnel de santé avant utilisation.",
        ),
      ).toBeInTheDocument();
    });

    it("should render info icon", () => {
      const { container } = render(<PregnancyTag variant="variant" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Variant prop - interdit", () => {
    it("should display Grossesse label", () => {
      render(<PregnancyTag variant="interdit" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should have red styling classes", () => {
      const { container } = render(<PregnancyTag variant="interdit" />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-red-100");
      expect(tag).toHaveClass("text-red-800");
      expect(tag).toHaveClass("dark:bg-red-900");
      expect(tag).toHaveClass("dark:text-red-50");
    });

    it("should have correct tooltip for interdit variant", () => {
      render(<PregnancyTag variant="interdit" />);
      expect(
        screen.getByTitle(
          "Ce remède est contre-indiqué pendant la grossesse. Ne pas utiliser.",
        ),
      ).toBeInTheDocument();
    });

    it("should render close/times icon", () => {
      const { container } = render(<PregnancyTag variant="interdit" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Icon styling", () => {
    it("should render icon with base size classes for ok variant", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should have responsive icon size classes for ok variant", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("lg:h-5", "lg:w-5");
    });

    it("should render icon with correct size for variant variant", () => {
      const { container } = render(<PregnancyTag variant="variant" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4", "lg:h-5", "lg:w-5");
    });

    it("should render icon with correct size for interdit variant", () => {
      const { container } = render(<PregnancyTag variant="interdit" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4", "lg:h-5", "lg:w-5");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default for ok variant", () => {
      render(<PregnancyTag variant="ok" />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false for ok variant", () => {
      render(<PregnancyTag variant="ok" showLabel={false} />);
      expect(screen.queryByText("Grossesse")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true for variant variant", () => {
      render(<PregnancyTag variant="variant" showLabel={true} />);
      expect(screen.getByText("Grossesse")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false for interdit variant", () => {
      render(<PregnancyTag variant="interdit" showLabel={false} />);
      expect(screen.queryByText("Grossesse")).not.toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(
        <PregnancyTag variant="ok" showLabel={false} />,
      );
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon for ok variant", () => {
      const { container } = render(<PregnancyTag variant="ok" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have aria-hidden on icon for variant variant", () => {
      const { container } = render(<PregnancyTag variant="variant" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have aria-hidden on icon for interdit variant", () => {
      const { container } = render(<PregnancyTag variant="interdit" />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text for each variant", () => {
      const { rerender } = render(<PregnancyTag variant="ok" />);
      expect(
        screen.getByTitle(
          "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
        ),
      ).toBeInTheDocument();

      rerender(<PregnancyTag variant="variant" />);
      expect(
        screen.getByTitle(
          "Données insuffisantes ou usage conditionnel. Consulter un professionnel de santé avant utilisation.",
        ),
      ).toBeInTheDocument();

      rerender(<PregnancyTag variant="interdit" />);
      expect(
        screen.getByTitle(
          "Ce remède est contre-indiqué pendant la grossesse. Ne pas utiliser.",
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Combined props", () => {
    it("should render with custom className and ok variant", () => {
      const { container } = render(
        <PregnancyTag variant="ok" className="custom" />,
      );

      expect(screen.getByText("Grossesse")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with custom className and variant variant", () => {
      const { container } = render(
        <PregnancyTag variant="variant" className="custom" />,
      );

      expect(screen.getByText("Grossesse")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with custom className and interdit variant", () => {
      const { container } = render(
        <PregnancyTag variant="interdit" className="custom" />,
      );

      expect(screen.getByText("Grossesse")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with all props customized for ok variant", () => {
      const { container } = render(
        <PregnancyTag variant="ok" showLabel={true} className="custom" />,
      );

      expect(screen.getByText("Grossesse")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render with all props customized for interdit variant", () => {
      const { container } = render(
        <PregnancyTag variant="interdit" showLabel={true} className="custom" />,
      );

      expect(screen.getByText("Grossesse")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("custom");
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances with different variants", () => {
      render(
        <div>
          <PregnancyTag variant="ok" />
          <PregnancyTag variant="variant" />
          <PregnancyTag variant="interdit" />
        </div>,
      );

      const labels = screen.getAllByText("Grossesse");
      expect(labels).toHaveLength(3);

      expect(
        screen.getByTitle(
          "L'usage de ce remède est considéré comme compatible avec la grossesse aux doses indiquées.",
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByTitle(
          "Données insuffisantes ou usage conditionnel. Consulter un professionnel de santé avant utilisation.",
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByTitle(
          "Ce remède est contre-indiqué pendant la grossesse. Ne pas utiliser.",
        ),
      ).toBeInTheDocument();
    });

    it("should render multiple instances with same variant", () => {
      const { container } = render(
        <div>
          <PregnancyTag variant="ok" />
          <PregnancyTag variant="ok" />
        </div>,
      );

      const labels = screen.getAllByText("Grossesse");
      expect(labels).toHaveLength(2);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(2);
    });
  });
});
