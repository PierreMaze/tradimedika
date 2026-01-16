import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotFound", () => {
  describe("Rendering", () => {
    it("should render 404 error number", () => {
      renderWithRouter(<NotFound />);

      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("should render page title", () => {
      renderWithRouter(<NotFound />);

      expect(screen.getByText("Page introuvable")).toBeInTheDocument();
    });

    it("should render error description", () => {
      renderWithRouter(<NotFound />);

      expect(
        screen.getByText(/Désolé, la page que vous recherchez/i),
      ).toBeInTheDocument();
    });

    it("should render decorative emoji", () => {
      renderWithRouter(<NotFound />);

      expect(screen.getByText("🌿")).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("should render home page link", () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole("link", {
        name: /Retour à l'accueil/i,
      });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should render remedies page link", () => {
      renderWithRouter(<NotFound />);

      const remediesLink = screen.getByRole("link", {
        name: /Explorer les remèdes/i,
      });
      expect(remediesLink).toBeInTheDocument();
      expect(remediesLink).toHaveAttribute("href", "/remedes");
    });

    it("should render both action buttons", () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole("link", {
        name: /Retour à l'accueil/i,
      });
      const remediesLink = screen.getByRole("link", {
        name: /Explorer les remèdes/i,
      });

      expect(homeLink).toBeInTheDocument();
      expect(remediesLink).toBeInTheDocument();
    });
  });

  describe("Helpful Links Section", () => {
    it("should render suggestions header", () => {
      renderWithRouter(<NotFound />);

      expect(screen.getByText("Suggestions :")).toBeInTheDocument();
    });

    it("should render all helpful suggestions", () => {
      renderWithRouter(<NotFound />);

      expect(
        screen.getByText(/Vérifiez l'URL dans la barre d'adresse/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Utilisez le menu de navigation/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Retournez à la page d'accueil/i),
      ).toBeInTheDocument();
    });

    it("should render suggestions as a list", () => {
      const { container } = renderWithRouter(<NotFound />);

      const suggestionsList = container.querySelector("ul");
      expect(suggestionsList).toBeInTheDocument();
      expect(suggestionsList?.children.length).toBe(3);
    });
  });

  describe("Layout and Styling", () => {
    it("should render within main container", () => {
      const { container } = renderWithRouter(<NotFound />);

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("container", "mx-auto");
    });

    it("should apply correct heading styles", () => {
      renderWithRouter(<NotFound />);

      const heading = screen.getByText("404");
      expect(heading).toHaveClass("text-9xl", "font-bold");
    });

    it("should have centered text layout", () => {
      const { container } = renderWithRouter(<NotFound />);

      const textContainer = container.querySelector(".text-center");
      expect(textContainer).toBeInTheDocument();
    });

    it("should apply emerald color to 404 number", () => {
      renderWithRouter(<NotFound />);

      const heading = screen.getByText("404");
      expect(heading).toHaveClass("text-emerald-600");
    });

    it("should apply dark mode classes", () => {
      const { container } = renderWithRouter(<NotFound />);

      const textContainer = container.querySelector(".dark\\:text-light");
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe("Button Styling", () => {
    it("should apply primary button styles to home link", () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole("link", {
        name: /Retour à l'accueil/i,
      });
      expect(homeLink).toHaveClass("bg-emerald-600", "text-white");
    });

    it("should apply secondary button styles to remedies link", () => {
      renderWithRouter(<NotFound />);

      const remediesLink = screen.getByRole("link", {
        name: /Explorer les remèdes/i,
      });
      expect(remediesLink).toHaveClass("border-2", "border-emerald-600");
    });

    it("should have rounded corners on buttons", () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole("link", {
        name: /Retour à l'accueil/i,
      });
      const remediesLink = screen.getByRole("link", {
        name: /Explorer les remèdes/i,
      });

      expect(homeLink).toHaveClass("rounded-lg");
      expect(remediesLink).toHaveClass("rounded-lg");
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML structure", () => {
      const { container } = renderWithRouter(<NotFound />);

      expect(container.querySelector("main")).toBeInTheDocument();
      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelector("h2")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const { container } = renderWithRouter(<NotFound />);

      const h1 = container.querySelector("h1");
      const h2 = container.querySelector("h2");

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it("should render links with proper text", () => {
      renderWithRouter(<NotFound />);

      expect(
        screen.getByRole("link", { name: /Retour à l'accueil/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Explorer les remèdes/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should apply responsive flex classes", () => {
      const { container } = renderWithRouter(<NotFound />);

      const buttonContainer = container.querySelector(
        ".flex.flex-col.gap-4.sm\\:flex-row",
      );
      expect(buttonContainer).toBeInTheDocument();
    });

    it("should apply responsive text sizes", () => {
      renderWithRouter(<NotFound />);

      const subtitle = screen.getByText("Page introuvable");
      expect(subtitle).toHaveClass("text-3xl", "lg:text-4xl");
    });
  });

  describe("Content", () => {
    it("should display error message with proper content", () => {
      renderWithRouter(<NotFound />);

      expect(
        screen.getByText(/la page que vous recherchez n'existe pas/i),
      ).toBeInTheDocument();
    });

    it("should have suggestions section at bottom", () => {
      const { container } = renderWithRouter(<NotFound />);

      const suggestions = container.querySelector(".mt-12");
      expect(suggestions).toBeInTheDocument();
    });
  });
});
