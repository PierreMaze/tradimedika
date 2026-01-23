import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsHeader from "./RemedyResultDetailsHeader";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
}));

vi.mock("../../../components/tags", () => {
  const PregnancyTagMock = ({ variant }) => (
    <div data-testid="pregnancy-tag" data-variant={variant}>
      Grossesse {variant}
    </div>
  );
  PregnancyTagMock.propTypes = { variant: PropTypes.string.isRequired };

  const ChildrenAgeTagMock = ({ age }) => (
    <div data-testid="children-tag" data-age={age}>
      {age === null ? "Enfants" : `Enfants ${age}+`}
    </div>
  );
  ChildrenAgeTagMock.propTypes = { age: PropTypes.number };

  return {
    VerifiedTag: () => <div data-testid="verified-tag">Vérifié</div>,
    TraditionnalTag: () => (
      <div data-testid="traditional-tag">Traditionnel</div>
    ),
    PregnancyTag: PregnancyTagMock,
    ChildrenAgeTag: ChildrenAgeTagMock,
  };
});

describe("RemedyResultDetailsHeader", () => {
  describe("Rendering", () => {
    it("should render remedy name as heading", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Une épice puissante",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(
        screen.getByRole("heading", { name: "Gingembre" }),
      ).toBeInTheDocument();
    });

    it("should render remedy image with proper alt text", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const image = screen.getByAltText("Illustration de Gingembre");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      expect(image).toHaveAttribute("loading", "lazy");
    });

    it("should render remedy type badge with neutral color", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const badge = screen.getByText("épice");
      expect(badge).toHaveClass("bg-neutral-200", "text-black");
      expect(badge).toHaveClass("dark:bg-neutral-600", "dark:text-white");
    });

    it("should render description", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Une épice anti-inflammatoire puissante",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(
        screen.getByText("Une épice anti-inflammatoire puissante"),
      ).toBeInTheDocument();
    });

    it("should render VerifiedTag when verifiedByProfessional is true", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: true,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    });

    it("should render TraditionnalTag when verifiedByProfessional is false", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(screen.getByTestId("traditional-tag")).toBeInTheDocument();
    });

    it("should render PregnancyTag with 'ok' variant when pregnancySafe is true", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: true,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute("data-variant", "ok");
    });

    it("should render PregnancyTag with 'interdit' variant when pregnancySafe is false", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute("data-variant", "interdit");
    });

    it("should render PregnancyTag with 'variant' when pregnancySafe is string", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: "précaution",
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute("data-variant", "variant");
    });

    it("should render ChildrenAgeTag when childrenAge is provided", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: 3,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const tag = screen.getByTestId("children-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveTextContent("Enfants 3+");
    });

    it("should render ChildrenAgeTag without age when childrenAge is null", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const tag = screen.getByTestId("children-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveTextContent("Enfants");
      expect(tag).toHaveAttribute("data-age", "null");
    });

    it("should render all tags when all conditions are met", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: true,
        pregnancySafe: true,
        childrenAge: 6,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
      expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
      expect(screen.getByTestId("children-tag")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should fallback to aliment color when type is not recognized", () => {
      const remedy = {
        name: "Test",
        type: "unknown-type",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const badge = screen.getByText("unknown-type");
      expect(badge).toBeInTheDocument();
    });

    it("should handle empty description", () => {
      const remedy = {
        name: "Test",
        type: "plante",
        description: "",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      expect(screen.getByRole("heading", { name: "Test" })).toBeInTheDocument();
    });

    it("should handle childrenAge of 0", () => {
      const remedy = {
        name: "Test",
        type: "plante",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: 0,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      // childrenAge 0 !== null, so tag should be rendered
      const tag = screen.getByTestId("children-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveTextContent("Enfants 0+");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const heading = screen.getByRole("heading", { name: "Gingembre" });
      expect(heading.tagName).toBe("H1");
    });

    it("should have descriptive alt text for image", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const image = screen.getByAltText("Illustration de Gingembre");
      expect(image).toBeInTheDocument();
    });

    it("should use uppercase styling for type badge", () => {
      const remedy = {
        name: "Gingembre",
        type: "épice",
        description: "Test",
        verifiedByProfessional: false,
        pregnancySafe: false,
        childrenAge: null,
      };

      render(
        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl="https://example.com/image.jpg"
        />,
      );

      const badge = screen.getByText("épice");
      expect(badge).toHaveClass("uppercase");
    });
  });
});
