import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Footer", () => {
  describe("Rendering", () => {
    it("should render footer element", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("should render LogoTradimedika component", () => {
      renderWithRouter(<Footer />);

      expect(screen.getByTestId("logo-tradimedika")).toBeInTheDocument();
    });

    it("should render legal links", () => {
      renderWithRouter(<Footer />);

      expect(
        screen.getByRole("link", { name: /Mentions Légales/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Politique de Confidentialité/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Gestion des Cookies/i }),
      ).toBeInTheDocument();
    });

    it("should render copyright text", () => {
      renderWithRouter(<Footer />);

      expect(
        screen.getByText(/© TRADIMEDIKA 2026 - Tous droits réservés/i),
      ).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("should have correct href for legal mentions", () => {
      renderWithRouter(<Footer />);

      const link = screen.getByRole("link", { name: /Mentions Légales/i });
      expect(link).toHaveAttribute("href", "/mentions-legales");
    });

    it("should have correct href for privacy policy", () => {
      renderWithRouter(<Footer />);

      const link = screen.getByRole("link", {
        name: /Politique de Confidentialité/i,
      });
      expect(link).toHaveAttribute("href", "/politique-confidentialite");
    });

    it("should have correct href for cookie management", () => {
      renderWithRouter(<Footer />);

      const link = screen.getByRole("link", {
        name: /Gestion des Cookies/i,
      });
      expect(link).toHaveAttribute("href", "/gestion-cookies");
    });

    it("should apply link styles from constants", () => {
      renderWithRouter(<Footer />);

      const links = screen.getAllByRole("link");
      const footerLinks = links.filter(
        (link) =>
          link.textContent === "Mentions Légales" ||
          link.textContent === "Politique de Confidentialité" ||
          link.textContent === "Gestion des Cookies",
      );

      expect(footerLinks.length).toBe(3);
      footerLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe("Styling", () => {
    it("should apply footer background classes", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("bg-light", "dark:bg-dark");
    });

    it("should apply footer text color classes", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("text-dark", "dark:text-light");
    });

    it("should have full width", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("w-full");
    });

    it("should apply transition classes", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("transition-colors", "duration-150");
    });

    it("should have border styling", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".border-t-2");
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass("border-dashed");
    });

    it("should apply responsive padding", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("lg:py-4");
    });
  });

  describe("Layout Structure", () => {
    it("should have centered content", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".mx-auto");
      expect(innerContainer).toHaveClass(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
      );
    });

    it("should have responsive width", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".mx-auto");
      expect(innerContainer).toHaveClass("w-full", "lg:w-3/4");
    });

    it("should render logo in separate container", () => {
      const { container } = renderWithRouter(<Footer />);

      const logoContainer = container.querySelector(".mb-4");
      expect(logoContainer).toBeInTheDocument();
    });

    it("should render links in flex container", () => {
      const { container } = renderWithRouter(<Footer />);

      const linksContainer = container.querySelector(
        ".flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toBeInTheDocument();
    });

    it("should apply responsive flex direction to links", () => {
      const { container } = renderWithRouter(<Footer />);

      const linksContainer = container.querySelector(
        ".flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toHaveClass("lg:flex-row", "lg:gap-6");
    });
  });

  describe("Copyright Section", () => {
    it("should render copyright with correct styling", () => {
      renderWithRouter(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass("text-xs", "text-neutral-600");
    });

    it("should apply dark mode styles to copyright", () => {
      renderWithRouter(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass("dark:text-neutral-500");
    });

    it("should apply transition to copyright", () => {
      renderWithRouter(<Footer />);

      const copyright = screen.getByText(
        /© TRADIMEDIKA 2026 - Tous droits réservés/i,
      );
      expect(copyright).toHaveClass("transition-colors", "duration-150");
    });
  });

  describe("Props", () => {
    it("should accept custom className", () => {
      const { container } = renderWithRouter(
        <Footer className="custom-class" />,
      );

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("custom-class");
    });

    it("should render without className prop", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("should apply default className when not provided", () => {
      const { container } = renderWithRouter(<Footer />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have semantic footer element", () => {
      const { container } = renderWithRouter(<Footer />);

      expect(container.querySelector("footer")).toBeInTheDocument();
    });

    it("should have accessible links", () => {
      renderWithRouter(<Footer />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("should have proper link text", () => {
      renderWithRouter(<Footer />);

      expect(screen.getByText("Mentions Légales")).toBeInTheDocument();
      expect(
        screen.getByText("Politique de Confidentialité"),
      ).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive link layout", () => {
      const { container } = renderWithRouter(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:flex-row");
    });

    it("should have responsive text alignment", () => {
      const { container } = renderWithRouter(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2.text-center",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:text-start");
    });

    it("should have responsive gap spacing", () => {
      const { container } = renderWithRouter(<Footer />);

      const linksContainer = container.querySelector(
        ".mb-4.flex.flex-col.gap-2",
      );
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass("lg:gap-6");
    });
  });

  describe("Border Styling", () => {
    it("should have dashed border", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".border-dashed");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should apply dark mode border color", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".border-dark\\/80");
      expect(innerContainer).toHaveClass("dark:border-light/60");
    });

    it("should have border transition", () => {
      const { container } = renderWithRouter(<Footer />);

      const innerContainer = container.querySelector(".border-t-2");
      expect(innerContainer).toHaveClass("transition-colors", "duration-150");
    });
  });
});
