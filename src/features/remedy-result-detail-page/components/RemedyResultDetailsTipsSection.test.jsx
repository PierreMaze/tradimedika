import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RemedyResultDetailsTipsSection from "./RemedyResultDetailsTipsSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }) => children,
}));

vi.mock("react-icons/md", () => ({
  MdTipsAndUpdates: (props) => <svg data-testid="tips-icon" {...props} />,
}));

describe("RemedyResultDetailsTipsSection", () => {
  describe("Rendering", () => {
    it("should render tips section with title and icon", () => {
      const tips = [
        "Consommer avec du miel pour améliorer le goût",
        "À prendre le matin à jeun",
      ];

      render(<RemedyResultDetailsTipsSection tips={tips} />);

      expect(
        screen.getByRole("heading", { name: /conseils pratiques/i }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("tips-icon")).toBeInTheDocument();
    });

    it("should render all tips as list items", async () => {
      const tips = [
        "Consommer avec du miel",
        "À prendre le matin",
        "Conserver au frais",
      ];

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      expect(screen.getByText("Consommer avec du miel")).toBeInTheDocument();
      expect(screen.getByText("À prendre le matin")).toBeInTheDocument();
      expect(screen.getByText("Conserver au frais")).toBeInTheDocument();
    });

    it("should render with sky blue styling", () => {
      const tips = ["test tip"];

      const { container } = render(
        <RemedyResultDetailsTipsSection tips={tips} />,
      );

      const section = container.querySelector("section");
      expect(section).toHaveClass(
        "rounded-lg",
        "border",
        "border-neutral-200",
        "bg-white",
      );
      expect(section).toHaveClass(
        "dark:border-neutral-700",
        "dark:bg-neutral-800",
      );
    });

    it("should render tips in sky text color", async () => {
      const tips = ["test tip"];

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      const listItem = screen.getByText("test tip");
      expect(listItem).toHaveClass("text-black");
      expect(listItem).toHaveClass("dark:text-white");
    });
  });

  describe("Edge Cases", () => {
    it("should return null when tips is null", () => {
      const { container } = render(
        <RemedyResultDetailsTipsSection tips={null} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when tips is undefined", () => {
      const { container } = render(
        <RemedyResultDetailsTipsSection tips={undefined} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when tips is an empty array", () => {
      const { container } = render(
        <RemedyResultDetailsTipsSection tips={[]} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle single tip", async () => {
      const tips = ["Consommer avec du miel"];

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      expect(screen.getByText("Consommer avec du miel")).toBeInTheDocument();
    });

    it("should handle many tips", async () => {
      const tips = Array.from({ length: 10 }, (_, i) => `tip ${i}`);

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      tips.forEach((tip) => {
        expect(screen.getByText(tip)).toBeInTheDocument();
      });
    });

    it("should handle long tip text", async () => {
      const tips = [
        "Ceci est un conseil très long qui contient beaucoup de détails et d'informations utiles pour l'utilisateur",
      ];

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      expect(screen.getByText(tips[0])).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const tips = ["test"];

      const { container } = render(
        <RemedyResultDetailsTipsSection tips={tips} />,
      );

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      const tips = ["test"];

      render(<RemedyResultDetailsTipsSection tips={tips} />);

      const heading = screen.getByRole("heading", {
        name: /conseils pratiques/i,
      });
      expect(heading.tagName).toBe("H2");
    });

    it("should use unordered list for tips", async () => {
      const tips = ["tip1", "tip2"];

      const user = userEvent.setup();
      render(<RemedyResultDetailsTipsSection tips={tips} />);

      // Click to expand accordion
      await user.click(
        screen.getByRole("button", { name: /conseils pratiques/i }),
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should hide icon from screen readers", () => {
      const tips = ["test"];

      const { container } = render(
        <RemedyResultDetailsTipsSection tips={tips} />,
      );

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
