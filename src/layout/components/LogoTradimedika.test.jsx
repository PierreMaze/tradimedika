import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LogoTradimedika from "./LogoTradimedika";

describe("LogoTradimedika", () => {
  describe("Rendering", () => {
    it("should render logo link", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toBeInTheDocument();
    });

    it("should render logo text", () => {
      render(<LogoTradimedika />);

      expect(screen.getByText("TRADIMEDIKA")).toBeInTheDocument();
    });

    it("should render leaf icon", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Link Attributes", () => {
    it("should link to home page", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveAttribute("href", "/tradimedika/");
    });

    it("should have alt attribute", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveAttribute("alt", "Logo Tradimedika");
    });

    it("should have title attribute", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveAttribute("title", "Logo Tradimedika");
    });

    it("should have aria-label", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveAttribute("aria-label", "Logo Tradimedika");
    });
  });

  describe("Styling", () => {
    it("should apply flex layout to link", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveClass("flex", "items-center", "gap-2");
    });

    it("should apply emerald color to icon", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-emerald-600");
    });

    it("should apply dark mode color to icon", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("dark:text-emerald-500");
    });

    it("should apply text styles to brand name", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("text-2xl", "font-black", "tracking-wide");
    });

    it("should apply dark mode styles to text", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("dark:text-light");
    });

    it("should apply rotation to icon", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("rotate-90", "rotate-x-180");
    });

    it("should apply responsive text sizes", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("lg:text-3xl", "2xl:text-4xl");
    });

    it("should apply responsive icon sizes", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-xl", "lg:text-3xl");
    });

    it("should apply transition effects", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      const brandName = screen.getByText("TRADIMEDIKA");

      expect(icon).toHaveClass("transition", "duration-300", "ease-in-out");
      expect(brandName).toHaveClass(
        "transition",
        "duration-300",
        "ease-in-out",
      );
    });
  });

  describe("Structure", () => {
    it("should render icon before text", () => {
      const { container } = render(<LogoTradimedika />);

      const link = container.querySelector("a");
      const children = Array.from(link?.children || []);

      // First child should contain the icon
      expect(children[0].querySelector("svg")).toBeInTheDocument();
      // Second child should contain the text
      expect(children[1].textContent).toBe("TRADIMEDIKA");
    });

    it("should wrap icon in span", () => {
      const { container } = render(<LogoTradimedika />);

      const iconSpan = container.querySelector("span");
      expect(iconSpan).toBeInTheDocument();
      expect(iconSpan?.querySelector("svg")).toBeInTheDocument();
    });

    it("should wrap text in span", () => {
      render(<LogoTradimedika />);

      const textSpan = screen.getByText("TRADIMEDIKA");
      expect(textSpan.tagName).toBe("SPAN");
    });
  });

  describe("Accessibility", () => {
    it("should have accessible link text", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link");
      expect(link).toHaveAccessibleName();
    });

    it("should be keyboard navigable", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
    });

    it("should have proper ARIA attributes", () => {
      render(<LogoTradimedika />);

      const link = screen.getByRole("link", { name: /Logo Tradimedika/i });
      expect(link).toHaveAttribute("aria-label");
    });
  });

  describe("Icon Component", () => {
    it("should render GiFallingLeaf icon", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should have correct icon size classes", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-xl");
    });
  });

  describe("Brand Text", () => {
    it("should render text in uppercase", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName.textContent).toBe("TRADIMEDIKA");
    });

    it("should have bold font weight", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("font-black");
    });

    it("should have letter spacing", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("tracking-wide");
    });
  });

  describe("Responsive Design", () => {
    it("should scale appropriately on different screen sizes", () => {
      render(<LogoTradimedika />);

      const brandName = screen.getByText("TRADIMEDIKA");
      expect(brandName).toHaveClass("text-2xl", "lg:text-3xl", "2xl:text-4xl");
    });

    it("should scale icon appropriately", () => {
      const { container } = render(<LogoTradimedika />);

      const icon = container.querySelector("svg");
      expect(icon).toHaveClass("text-xl", "lg:text-3xl");
    });
  });
});
