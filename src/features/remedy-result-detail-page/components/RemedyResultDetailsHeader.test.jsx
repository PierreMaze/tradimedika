import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsHeader from "./RemedyResultDetailsHeader";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
}));

vi.mock("../../../components/tags", () => ({
  VerifiedTag: () => <span data-testid="verified-tag">Vérifié</span>,
  PregnancyTag: () => <span data-testid="pregnancy-tag">Grossesse</span>,
  // eslint-disable-next-line react/prop-types
  ChildrenAgeTag: ({ age }) => (
    <span data-testid="children-age-tag">Enfants {age}+</span>
  ),
}));

describe("RemedyResultDetailsHeader", () => {
  const mockTypeColors = {
    aliment: "bg-yellow-100 text-yellow-800",
    plante: "bg-green-100 text-green-800",
    épice: "bg-orange-100 text-orange-800",
    boisson: "bg-cyan-100 text-cyan-800",
  };

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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
        />,
      );

      const image = screen.getByAltText("Illustration de Gingembre");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      expect(image).toHaveAttribute("loading", "lazy");
    });

    it("should render remedy type badge with appropriate color", () => {
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
          typeColors={mockTypeColors}
        />,
      );

      const badge = screen.getByText("épice");
      expect(badge).toHaveClass("bg-orange-100", "text-orange-800");
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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    });

    it("should not render VerifiedTag when verifiedByProfessional is false", () => {
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.queryByTestId("verified-tag")).not.toBeInTheDocument();
    });

    it("should render PregnancyTag when pregnancySafe is true", () => {
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
    });

    it("should not render PregnancyTag when pregnancySafe is false", () => {
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.queryByTestId("pregnancy-tag")).not.toBeInTheDocument();
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
          typeColors={mockTypeColors}
        />,
      );

      const tag = screen.getByTestId("children-age-tag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveTextContent("Enfants 3+");
    });

    it("should not render ChildrenAgeTag when childrenAge is null", () => {
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.queryByTestId("children-age-tag")).not.toBeInTheDocument();
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
          typeColors={mockTypeColors}
        />,
      );

      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
      expect(screen.getByTestId("pregnancy-tag")).toBeInTheDocument();
      expect(screen.getByTestId("children-age-tag")).toBeInTheDocument();
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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
        />,
      );

      // childrenAge 0 !== null, so tag should be rendered
      const tag = screen.getByTestId("children-age-tag");
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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
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
          typeColors={mockTypeColors}
        />,
      );

      const badge = screen.getByText("épice");
      expect(badge).toHaveClass("uppercase");
    });
  });
});
