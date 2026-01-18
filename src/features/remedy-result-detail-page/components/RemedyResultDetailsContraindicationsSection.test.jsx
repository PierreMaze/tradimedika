import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsContraindicationsSection from "./RemedyResultDetailsContraindicationsSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
  },
}));

vi.mock("react-icons/ri", () => ({
  RiAlarmWarningFill: (props) => <svg data-testid="warning-icon" {...props} />,
}));

vi.mock("../../../utils/capitalizeFirstLetter", () => ({
  capitalizeFirstLetter: vi.fn(
    (text) => text.charAt(0).toUpperCase() + text.slice(1),
  ),
}));

describe("RemedyResultDetailsContraindicationsSection", () => {
  describe("Rendering", () => {
    it("should render contraindications section with title and icon", () => {
      const contraindications = [
        "femmes enceintes",
        "enfants de moins de 3 ans",
      ];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      expect(
        screen.getByRole("heading", { name: /contraindications/i }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
    });

    it("should render all contraindications as list items", () => {
      const contraindications = [
        "femmes enceintes",
        "enfants de moins de 3 ans",
        "personnes allergiques",
      ];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      expect(screen.getByText("Femmes enceintes")).toBeInTheDocument();
      expect(screen.getByText("Enfants de moins de 3 ans")).toBeInTheDocument();
      expect(screen.getByText("Personnes allergiques")).toBeInTheDocument();
    });

    it("should capitalize contraindications using capitalizeFirstLetter utility", () => {
      const contraindications = ["femmes enceintes"];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      // Verify the capitalized output is rendered
      expect(screen.getByText("Femmes enceintes")).toBeInTheDocument();
    });

    it("should render with red warning styling", () => {
      const contraindications = ["test"];

      const { container } = render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass(
        "rounded-lg",
        "border",
        "border-neutral-200",
        "bg-white",
      );
      expect(section).toHaveClass(
        "dark:border-neutral-700",
        "dark:bg-neutral-800",
      );
    });

    it("should render list items with capitalized text", () => {
      const contraindications = ["test"];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      const listItem = screen.getByText("Test");
      expect(listItem).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should return null when contraindications is null", () => {
      const { container } = render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={null}
        />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when contraindications is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={undefined}
        />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when contraindications is an empty array", () => {
      const { container } = render(
        <RemedyResultDetailsContraindicationsSection contraindications={[]} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle single contraindication", () => {
      const contraindications = ["femmes enceintes"];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      expect(screen.getByText("Femmes enceintes")).toBeInTheDocument();
    });

    it("should handle many contraindications", () => {
      const contraindications = Array.from(
        { length: 10 },
        (_, i) => `contraindication ${i}`,
      );

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      contraindications.forEach((contraindication) => {
        const capitalized =
          contraindication.charAt(0).toUpperCase() + contraindication.slice(1);
        expect(screen.getByText(capitalized)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const contraindications = ["test"];

      const { container } = render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const contraindications = ["test"];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      const heading = screen.getByRole("heading", {
        name: /contraindications/i,
      });
      expect(heading.tagName).toBe("H2");
    });

    it("should use unordered list for contraindications", () => {
      const contraindications = ["test1", "test2"];

      render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should hide icon from screen readers", () => {
      const contraindications = ["test"];

      const { container } = render(
        <RemedyResultDetailsContraindicationsSection
          contraindications={contraindications}
        />,
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
