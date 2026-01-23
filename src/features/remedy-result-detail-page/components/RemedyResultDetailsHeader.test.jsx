import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RemedyResultDetailsHeader from "./RemedyResultDetailsHeader";

const baseRemedy = {
  name: "Camomille",
  type: "plante",
  description: "Plante utilisée pour favoriser le sommeil.",
  verifiedByProfessional: true,
  pregnancySafe: true,
  childrenAge: null,
};

const renderComponent = (overrides = {}) =>
  render(
    <RemedyResultDetailsHeader
      remedy={{ ...baseRemedy, ...overrides }}
      safeImageUrl="/camomille.png"
    />,
  );

describe("RemedyResultDetailsHeader", () => {
  describe("Rendering", () => {
    it("renders remedy name as h1", () => {
      renderComponent();
      expect(
        screen.getByRole("heading", { level: 1, name: /camomille/i }),
      ).toBeInTheDocument();
    });

    it("renders image with descriptive alt", () => {
      renderComponent();
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("alt", "Illustration de Camomille");
    });

    it("renders description when provided", () => {
      renderComponent();
      expect(screen.getByText(/favoriser le sommeil/i)).toBeInTheDocument();
    });

    it("does not render description text when empty", () => {
      renderComponent({ description: "" });
      expect(
        screen.queryByText(/favoriser le sommeil/i),
      ).not.toBeInTheDocument();
    });

    it("renders type badge text", () => {
      renderComponent();
      expect(screen.getByText("plante")).toBeInTheDocument();
    });
  });

  describe("Verification tag", () => {
    it("renders VerifiedTag when verifiedByProfessional is true", () => {
      renderComponent({ verifiedByProfessional: true });
      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
      expect(screen.getByText("Reconnu")).toBeInTheDocument();
    });

    it("renders TraditionnalTag when verifiedByProfessional is false", () => {
      renderComponent({ verifiedByProfessional: false });
      expect(screen.getByTestId("verified-tag")).toBeInTheDocument();
    });
  });

  describe("Pregnancy tag", () => {
    it("renders pregnancy OK variant when pregnancySafe is true", () => {
      renderComponent({ pregnancySafe: true });
      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toHaveAttribute(
        "title",
        expect.stringContaining("compatible avec la grossesse"),
      );
    });

    it("renders pregnancy interdit variant when pregnancySafe is false", () => {
      renderComponent({ pregnancySafe: false });
      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toHaveAttribute(
        "title",
        expect.stringContaining("contre-indiqué"),
      );
    });

    it("renders pregnancy variant when pregnancySafe is null", () => {
      renderComponent({ pregnancySafe: null });
      const tag = screen.getByTestId("pregnancy-tag");
      expect(tag).toHaveAttribute(
        "title",
        expect.stringContaining("Données insuffisantes"),
      );
    });
  });

  describe("Children age tag", () => {
    it("renders 'Tout public' when childrenAge is null", () => {
      renderComponent({ childrenAge: null });
      expect(screen.getByText("Tout public")).toBeInTheDocument();
      expect(screen.getByTestId("children-tag")).toBeInTheDocument();
    });

    it("renders age limit when childrenAge is a number", () => {
      renderComponent({ childrenAge: 6 });
      expect(screen.getByText("Enfants +6 ans")).toBeInTheDocument();
    });

    it("treats childrenAge = 0 as all ages", () => {
      renderComponent({ childrenAge: 0 });
      expect(screen.getByText("Tout public")).toBeInTheDocument();
    });

    it("renders adult-only variant when age >= 18", () => {
      renderComponent({ childrenAge: 18 });
      expect(screen.getByText("Adultes uniquement")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders exactly one h1", () => {
      renderComponent();
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    });

    it("icons are aria-hidden", () => {
      renderComponent();
      const icons = document.querySelectorAll("svg");
      icons.forEach((icon) =>
        expect(icon).toHaveAttribute("aria-hidden", "true"),
      );
    });
  });
});
