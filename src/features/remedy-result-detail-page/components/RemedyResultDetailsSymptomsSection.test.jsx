import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsSymptomsSection from "./RemedyResultDetailsSymptomsSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

vi.mock("../../../utils/capitalizeFirstLetter", () => ({
  capitalizeFirstLetter: vi.fn(
    (text) => text.charAt(0).toUpperCase() + text.slice(1),
  ),
}));

describe("RemedyResultDetailsSymptomsSection", () => {
  describe("Rendering", () => {
    it("should render symptoms section with title", () => {
      const symptoms = ["mal de tête", "fièvre"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      expect(
        screen.getByRole("heading", { name: /symptômes traités/i }),
      ).toBeInTheDocument();
    });

    it("should render all symptoms as badges", () => {
      const symptoms = ["mal de tête", "fièvre", "toux"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      expect(screen.getByText("Mal de tête")).toBeInTheDocument();
      expect(screen.getByText("Fièvre")).toBeInTheDocument();
      expect(screen.getByText("Toux")).toBeInTheDocument();
    });

    it("should capitalize symptoms using capitalizeFirstLetter utility", () => {
      const symptoms = ["mal de tête"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      // Verify the capitalized output is rendered
      expect(screen.getByText("Mal de tête")).toBeInTheDocument();
    });

    it("should render symptoms with orange/yellow styling", () => {
      const symptoms = ["fièvre"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      const badge = screen.getByText("Fièvre");
      expect(badge).toHaveClass("bg-orange-100", "text-yellow-800");
      expect(badge).toHaveClass("dark:bg-yellow-700", "dark:text-yellow-100");
    });
  });

  describe("Edge Cases", () => {
    it("should return null when symptoms is null", () => {
      const { container } = render(
        <RemedyResultDetailsSymptomsSection symptoms={null} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when symptoms is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsSymptomsSection symptoms={undefined} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when symptoms is an empty array", () => {
      const { container } = render(
        <RemedyResultDetailsSymptomsSection symptoms={[]} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle single symptom", () => {
      const symptoms = ["fièvre"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      expect(screen.getByText("Fièvre")).toBeInTheDocument();
    });

    it("should handle many symptoms", () => {
      const symptoms = Array.from({ length: 10 }, (_, i) => `symptom ${i}`);

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      symptoms.forEach((symptom) => {
        const capitalized = symptom.charAt(0).toUpperCase() + symptom.slice(1);
        expect(screen.getByText(capitalized)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const symptoms = ["fièvre"];

      const { container } = render(
        <RemedyResultDetailsSymptomsSection symptoms={symptoms} />,
      );

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const symptoms = ["fièvre"];

      render(<RemedyResultDetailsSymptomsSection symptoms={symptoms} />);

      const heading = screen.getByRole("heading", {
        name: /symptômes traités/i,
      });
      expect(heading.tagName).toBe("H2");
    });
  });
});
