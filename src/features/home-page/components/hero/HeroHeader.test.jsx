import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroHeader from "./HeroHeader";

describe("HeroHeader", () => {
  describe("Rendering with default props", () => {
    it("should render with default props", () => {
      render(<HeroHeader />);

      expect(screen.getByText("Version Bêta · v0.54.0")).toBeInTheDocument();
      expect(screen.getByText("Prenez soin de vous")).toBeInTheDocument();
      expect(screen.getByText("naturellement")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Solutions préventives et remèdes pour le quotidien, à votre portée.",
        ),
      ).toBeInTheDocument();
    });

    it("should render badge with icon", () => {
      const { container } = render(<HeroHeader />);

      // Badge text
      expect(screen.getByText("Version Bêta · v0.54.0")).toBeInTheDocument();

      // GiSprout icon is present
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should render main title as h1", () => {
      render(<HeroHeader />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Prenez soin de vousnaturellement");
    });

    it("should render description", () => {
      render(<HeroHeader />);

      const description = screen.getByText(
        "Solutions préventives et remèdes pour le quotidien, à votre portée.",
      );
      expect(description.tagName).toBe("P");
    });
  });

  describe("Rendering with custom props", () => {
    it("should render custom badgeText", () => {
      render(<HeroHeader badgeText="Custom Badge" />);

      expect(screen.getByText("Custom Badge")).toBeInTheDocument();
      expect(
        screen.queryByText("Version Bêta · v0.54.0"),
      ).not.toBeInTheDocument();
    });

    it("should render custom title", () => {
      render(<HeroHeader title="Custom Title" />);

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.queryByText("Prenez soin de vous")).not.toBeInTheDocument();
    });

    it("should render custom titleHighlight", () => {
      render(<HeroHeader titleHighlight="custom highlight" />);

      expect(screen.getByText("custom highlight")).toBeInTheDocument();
      expect(screen.queryByText("naturellement")).not.toBeInTheDocument();
    });

    it("should render custom description", () => {
      render(<HeroHeader description="Custom description text" />);

      expect(screen.getByText("Custom description text")).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Solutions préventives et remèdes pour le quotidien, à votre portée./,
        ),
      ).not.toBeInTheDocument();
    });

    it("should render with all custom props", () => {
      render(
        <HeroHeader
          badgeText="Test Badge"
          title="Test Title"
          titleHighlight="Test Highlight"
          description="Test Description"
        />,
      );

      expect(screen.getByText("Test Badge")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Highlight")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  describe("Structure and layout", () => {
    it("should have main container with correct classes", () => {
      const { container } = render(<HeroHeader />);

      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass("flex");
      expect(mainDiv).toHaveClass("flex-col");
      expect(mainDiv).toHaveClass("items-center");
    });

    it("should render badge in separate container", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      expect(badge.closest("div")).toHaveClass("border-2");
      expect(badge.closest("div")).toHaveClass("rounded-lg");
    });

    it("should have correct heading structure", () => {
      render(<HeroHeader />);

      const heading = screen.getByRole("heading", { level: 1 });
      const spans = heading.querySelectorAll("span");
      expect(spans.length).toBe(2); // One for title, one for titleHighlight
    });
  });

  describe("Styling", () => {
    it("should apply badge styles", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      const badgeContainer = badge.closest("div");

      expect(badgeContainer).toHaveClass("border-2");
      expect(badgeContainer).toHaveClass("rounded-lg");
      expect(badgeContainer).toHaveClass("bg-white");
    });

    it("should apply dark mode classes to badge", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      const badgeContainer = badge.closest("div");

      expect(badgeContainer).toHaveClass("dark:bg-emerald-950");
      expect(badgeContainer).toHaveClass("dark:text-emerald-400");
    });

    it("should apply title highlight color", () => {
      render(<HeroHeader />);

      const highlight = screen.getByText("naturellement");
      expect(highlight).toHaveClass("text-emerald-600");
      expect(highlight).toHaveClass("dark:text-emerald-500");
    });

    it("should apply description styles", () => {
      render(<HeroHeader />);

      const description = screen.getByText(
        /Solutions préventives et remèdes pour le quotidien, à votre portée./,
      );
      expect(description).toHaveClass("text-center");
      expect(description).toHaveClass("text-neutral-600");
      expect(description).toHaveClass("dark:text-neutral-400");
    });

    it("should have responsive text sizes", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      expect(badge).toHaveClass("text-sm");
      expect(badge).toHaveClass("lg:text-base");

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-5xl");
      expect(heading).toHaveClass("lg:text-7xl");

      const description = screen.getByText(
        /Solutions préventives et remèdes pour le quotidien, à votre portée./,
      );
      expect(description).toHaveClass("text-base");
      expect(description).toHaveClass("lg:text-xl");
    });
  });

  describe("Icon", () => {
    it("should render sprout icon in badge", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      const badgeContainer = badge.closest("div");
      const icon = badgeContainer.querySelector("svg");

      expect(icon).toBeInTheDocument();
    });

    it("should apply icon styles", () => {
      render(<HeroHeader />);

      const badge = screen.getByText("Version Bêta · v0.54.0");
      const badgeContainer = badge.closest("div");
      const icon = badgeContainer.querySelector("svg");

      expect(icon).toHaveClass("text-emerald-600");
      expect(icon).toHaveClass("dark:text-emerald-400");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(<HeroHeader />);

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it("should have readable text content", () => {
      render(<HeroHeader />);

      expect(screen.getByText("Version Bêta · v0.54.0")).toBeInTheDocument();
      expect(screen.getByText("Prenez soin de vous")).toBeInTheDocument();
      expect(screen.getByText("naturellement")).toBeInTheDocument();
    });

    it("should have semantic HTML structure", () => {
      const { container } = render(<HeroHeader />);

      const heading = screen.getByRole("heading", { level: 1 });
      const description = container.querySelector("p");

      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("Text content", () => {
    it("should display complete title", () => {
      render(<HeroHeader />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toContain("Prenez soin de vous");
      expect(heading.textContent).toContain("naturellement");
    });

    it("should allow empty strings", () => {
      render(
        <HeroHeader badgeText="" title="" titleHighlight="" description="" />,
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("should handle very long text", () => {
      const longText =
        "This is a very long description that should still render correctly and wrap appropriately within the component's container with proper styling and responsiveness.";

      render(<HeroHeader description={longText} />);

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe("Layout spacing", () => {
    it("should have proper gap classes", () => {
      const { container } = render(<HeroHeader />);

      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass("gap-y-4");
      expect(mainContainer).toHaveClass("lg:gap-y-6");
    });

    it("should have max-width on description", () => {
      render(<HeroHeader />);

      const description = screen.getByText(
        /Solutions préventives et remèdes pour le quotidien, à votre portée./,
      );
      expect(description).toHaveClass("max-w-3xl");
    });
  });
});
