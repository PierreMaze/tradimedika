import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BreadCrumb from "./BreadCrumb";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
};

describe("BreadCrumb", () => {
  describe("Rendering", () => {
    it("should not render on home page", () => {
      const { container } = renderWithRouter(<BreadCrumb />, { route: "/" });
      expect(container.firstChild).toBeNull();
    });

    it("should render breadcrumb navigation", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(
        screen.getByRole("navigation", { name: "Fil d'Ariane" }),
      ).toBeInTheDocument();
    });

    it("should display 'Accueil' link", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(screen.getByText("Accueil")).toBeInTheDocument();
    });

    it("should display 'Remèdes' for /remedes route", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(screen.getByText("Remèdes")).toBeInTheDocument();
    });
  });

  describe("Navigation links", () => {
    it("should render links for non-last segments", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      const accueilLink = screen.getByRole("link", { name: /Accueil/i });
      expect(accueilLink).toHaveAttribute("href", "/");
    });

    it("should render last segment as text", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      const remedesText = screen.getByText("Remèdes");
      expect(remedesText.tagName).toBe("SPAN");
      expect(remedesText).toHaveAttribute("aria-current", "page");
    });

    it("should have correct aria-label on links", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(
        screen.getByLabelText("Naviguer vers Accueil"),
      ).toBeInTheDocument();
    });
  });

  describe("Path segments", () => {
    it("should display chevron separators", () => {
      const { container } = renderWithRouter(<BreadCrumb />, {
        route: "/remedes",
      });
      const chevrons = container.querySelectorAll("svg");
      expect(chevrons.length).toBeGreaterThan(0);
    });

    it("should handle multiple segments", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes/citron" });
      expect(screen.getByText("Accueil")).toBeInTheDocument();
      expect(screen.getByText("Remèdes")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have navigation landmark", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should have list structure", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("should mark current page with aria-current", () => {
      renderWithRouter(<BreadCrumb />, { route: "/remedes" });
      const currentPage = screen.getByText("Remèdes");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Styling", () => {
    it("should have responsive text sizing", () => {
      const { container } = renderWithRouter(<BreadCrumb />, {
        route: "/remedes",
      });
      const list = container.querySelector("ol");
      expect(list?.className).toContain("text-xs");
      expect(list?.className).toContain("sm:text-sm");
    });

    it("should have gap between items", () => {
      const { container } = renderWithRouter(<BreadCrumb />, {
        route: "/remedes",
      });
      const list = container.querySelector("ol");
      expect(list?.className).toContain("gap-2");
    });
  });
});
