// components/tag/ProuvedTag.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProuvedTag from "./ProuvedTag";

describe("ProuvedTag", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<ProuvedTag />);
      expect(screen.getByText("Reconnu")).toBeInTheDocument();
    });

    it("should render icon", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have tooltip title", () => {
      render(<ProuvedTag />);
      expect(
        screen.getByTitle(
          "Ce remède est soutenu par des données scientifiques et/ou reconnu par des professionnels de santé dans un cadre d’usage défini.",
        ),
      ).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<ProuvedTag className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should have default styling classes", () => {
      const { container } = render(<ProuvedTag />);
      const tag = container.firstChild;
      expect(tag).toHaveClass("inline-flex");
      expect(tag).toHaveClass("bg-green-100");
      expect(tag).toHaveClass("text-green-800");
    });
  });

  describe("Icon styling", () => {
    it("should render icon with base size classes", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("should have responsive icon size classes", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("lg:h-5", "lg:w-5");
    });
  });

  describe("showLabel prop", () => {
    it("should show label by default", () => {
      render(<ProuvedTag />);
      expect(screen.getByText("Reconnu")).toBeInTheDocument();
    });

    it("should hide label when showLabel is false", () => {
      render(<ProuvedTag showLabel={false} />);
      expect(screen.queryByText("Reconnu")).not.toBeInTheDocument();
    });

    it("should show label when showLabel is true", () => {
      render(<ProuvedTag showLabel={true} />);
      expect(screen.getByText("Reconnu")).toBeInTheDocument();
    });

    it("should still render icon when label is hidden", () => {
      const { container } = render(<ProuvedTag showLabel={false} />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icon", () => {
      const { container } = render(<ProuvedTag />);
      const icon = container.querySelector("svg");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should have tooltip with descriptive text", () => {
      render(<ProuvedTag />);
      const tag = screen.getByTitle(
        "Ce remède est soutenu par des données scientifiques et/ou reconnu par des professionnels de santé dans un cadre d’usage défini.",
      );
      expect(tag).toBeInTheDocument();
    });
  });

  describe("Multiple instances", () => {
    it("should render multiple instances independently", () => {
      const { container } = render(
        <div>
          <ProuvedTag />
          <ProuvedTag showLabel={false} />
          <ProuvedTag showLabel={true} />
        </div>,
      );

      const labels = screen.getAllByText("Reconnu");
      expect(labels).toHaveLength(2);

      const icons = container.querySelectorAll("svg");
      expect(icons).toHaveLength(3);
    });
  });
});
