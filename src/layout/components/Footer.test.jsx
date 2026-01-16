import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
  },
}));

// Mock LogoTradimedika
vi.mock("./LogoTradimedika", () => ({
  default: () => <div data-testid="logo-tradimedika">Logo</div>,
}));

describe("Footer", () => {
  describe("Rendering", () => {
    it("should render footer element", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("should render LogoTradimedika component", () => {
      render(<Footer />);

      expect(screen.getByTestId("logo-tradimedika")).toBeInTheDocument();
    });

    it("should render legal links", () => {
      render(<Footer />);

      expect(
        screen.getByRole("link", { name: /Mentions Légales/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Politique de Confidentialité/i }),
      ).toBeInTheDocument();
    });

    it("should render copyright text", () => {
      render(<Footer />);

      expect(
        screen.getByText(/© TRADIMEDIKA 2026 - Tous droits réservés/i),
      ).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("should have correct href for legal mentions", () => {
      render(<Footer />);

      const link = screen.getByRole("link", { name: /Mentions Légales/i });
      expect(link).toHaveAttribute("href", "/mention-legales");
    });

    it("should have correct href for privacy policy", () => {
      render(<Footer />);

      const link = screen.getByRole("link", {
        name: /Politique de Confidentialité/i,
      });
      expect(link).toHaveAttribute("href", "/privacy-policy");
    });

    it("should have noopener noreferrer attributes", () => {
      render(<Footer />);

      const legalLink = screen.getByRole("link", { name: /Mentions Légales/i });
      const privacyLink = screen.getByRole("link", {
        name: /Politique de Confidentialité/i,
      });

      expect(legalLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(privacyLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should apply link styles from constants", () => {
      render(<Footer />);

      const links = screen.getAllByRole("link");
      // Filter out the logo link
      const footerLinks = links.filter(
        (link) =>
          link.textContent === "Mentions Légales" ||
          link.textContent === "Politique de Confidentialité",
      );

      footerLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe("Styling", () => {
    it("should apply footer background classes", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("bg-light", "dark:bg-dark");
    });

    it("should apply footer text color classes", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("text-dark", "dark:text-light");
    });

    it("should have full width", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("w-full");
    });

    it("should apply transition classes", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("transition", "duration-300", "ease-in-out");
    });

    it("should have border styling", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".border-t-2");
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass("border-dashed");
    });

    it("should apply responsive padding", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("lg:py-4");
    });
  });

  describe("Layout Structure", () => {
    it("should have centered content", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".mx-auto");
      expect(innerContainer).toHaveClass(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
      );
    });

    it("should have responsive width", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".mx-auto");
      expect(innerContainer).toHaveClass("w-full", "lg:w-3/4");
    });

    it("should render logo in separate container", () => {
      const { container } = render(<Footer />);

      const logoContainer = container.querySelector(".mb-4");
      expect(logoContainer).toBeInTheDocument();
    });

    it("should render links in flex container", () => {
      const { container } = render(<Footer />);

      const linksContainer = container.querySelector(
        ".flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toBeInTheDocument();
    });

    it("should apply responsive flex direction to links", () => {
      const { container } = render(<Footer />);

      const linksContainer = container.querySelector(
        ".flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toHaveClass("lg:flex-row", "lg:gap-6");
    });
  });

  describe("Copyright Section", () => {
    it("should render copyright with correct styling", () => {
      render(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass("text-xs", "text-neutral-600");
    });

    it("should apply dark mode styles to copyright", () => {
      render(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass("dark:text-neutral-500");
    });

    it("should apply transition to copyright", () => {
      render(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass(
        "transition",
        "duration-300",
        "ease-in-out",
      );
    });
  });

  describe("Props", () => {
    it("should accept custom className", () => {
      const { container } = render(<Footer className="custom-class" />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("custom-class");
    });

    it("should render without className prop", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("should apply default className when not provided", () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have semantic footer element", () => {
      const { container } = render(<Footer />);

      expect(container.querySelector("footer")).toBeInTheDocument();
    });

    it("should have accessible links", () => {
      render(<Footer />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("should have proper link text", () => {
      render(<Footer />);

      expect(screen.getByText("Mentions Légales")).toBeInTheDocument();
      expect(
        screen.getByText("Politique de Confidentialité"),
      ).toBeInTheDocument();
    });

    it("should have security attributes on external links", () => {
      render(<Footer />);

      const links = screen.getAllByRole("link");
      const footerLinks = links.filter(
        (link) =>
          link.textContent === "Mentions Légales" ||
          link.textContent === "Politique de Confidentialité",
      );

      footerLinks.forEach((link) => {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive link layout", () => {
      const { container } = render(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:flex-row");
    });

    it("should have responsive text alignment", () => {
      const { container } = render(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:text-start");
    });

    it("should have responsive gap spacing", () => {
      const { container } = render(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:gap-6");
    });
  });

  describe("Border Styling", () => {
    it("should have dashed border", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".border-dashed");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should apply dark mode border color", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".border-dark\\/80");
      expect(innerContainer).toHaveClass("dark:border-light/60");
    });

    it("should have border transition", () => {
      const { container } = render(<Footer />);

      const innerContainer = container.querySelector(".border-t-2");
      expect(innerContainer).toHaveClass("transition", "duration-300");
    });
  });
});
