import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsPropertiesSection from "./RemedyResultDetailsPropertiesSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

// CORRECTION: Déplacer le mock component INSIDE le factory pour éviter TDZ
vi.mock("../../../components/ui/popover/", () => {
  const TermPopover = function ({ children, variant }) {
    return <div data-testid={`term-popover-${variant}`}>{children}</div>;
  };
  TermPopover.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string.isRequired,
  };
  return { TermPopover };
});

describe("RemedyResultDetailsPropertiesSection", () => {
  describe("Rendering", () => {
    it("should render properties section with title", () => {
      const properties = [
        { name: "anti-inflammatoire" },
        { name: "antibactérien" },
      ];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      expect(
        screen.getByRole("heading", { name: /propriétés/i }),
      ).toBeInTheDocument();
    });

    it("should render all properties as badges", () => {
      const properties = [
        { name: "anti-inflammatoire" },
        { name: "antibactérien" },
        { name: "antioxydant" },
      ];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      expect(screen.getByText("anti-inflammatoire")).toBeInTheDocument();
      expect(screen.getByText("antibactérien")).toBeInTheDocument();
      expect(screen.getByText("antioxydant")).toBeInTheDocument();
    });

    it("should render properties with emerald styling", () => {
      const properties = [{ name: "anti-inflammatoire" }];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      const badge = screen.getByText("anti-inflammatoire");
      expect(badge).toHaveClass("bg-emerald-100", "text-emerald-800");
      expect(badge).toHaveClass("dark:bg-emerald-900", "dark:text-emerald-200");
    });

    it("should apply capitalize class to property badges", () => {
      const properties = [{ name: "antioxydant" }];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      const badge = screen.getByText("antioxydant");
      expect(badge).toHaveClass("capitalize");
    });
  });

  describe("Edge Cases", () => {
    it("should return null when properties is null", () => {
      const { container } = render(
        <RemedyResultDetailsPropertiesSection properties={null} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when properties is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsPropertiesSection properties={undefined} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when properties is an empty array", () => {
      const { container } = render(
        <RemedyResultDetailsPropertiesSection properties={[]} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle single property", () => {
      const properties = [{ name: "antioxydant" }];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      expect(screen.getByText("antioxydant")).toBeInTheDocument();
    });

    it("should handle many properties", () => {
      const properties = Array.from({ length: 10 }, (_, i) => ({
        name: `property-${i}`,
      }));

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      properties.forEach((prop) => {
        expect(screen.getByText(prop.name)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const properties = [{ name: "antioxydant" }];

      const { container } = render(
        <RemedyResultDetailsPropertiesSection properties={properties} />,
      );

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const properties = [{ name: "antioxydant" }];

      render(<RemedyResultDetailsPropertiesSection properties={properties} />);

      const heading = screen.getByRole("heading", { name: /propriétés/i });
      expect(heading.tagName).toBe("H2");
    });
  });
});
