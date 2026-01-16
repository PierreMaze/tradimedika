import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ListAllergyTag from "./ListAllergyTag";

describe("ListAllergyTag", () => {
  const defaultProps = {
    tags: ["all", "nausée", "fatigue"],
    activeTag: "all",
    onTagClick: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render all tags", () => {
      render(<ListAllergyTag {...defaultProps} />);
      expect(screen.getByText("Tous")).toBeInTheDocument();
      expect(screen.getByText("Nausée")).toBeInTheDocument();
      expect(screen.getByText("Fatigue")).toBeInTheDocument();
    });

    it("should render nothing when tags array is empty", () => {
      const { container } = render(
        <ListAllergyTag {...defaultProps} tags={[]} />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should have role group", () => {
      render(<ListAllergyTag {...defaultProps} />);
      expect(
        screen.getByRole("group", {
          name: "Filtrer les remèdes par symptôme",
        }),
      ).toBeInTheDocument();
    });

    it("should capitalize symptom labels", () => {
      render(<ListAllergyTag {...defaultProps} />);
      expect(screen.getByText("Nausée")).toBeInTheDocument();
      expect(screen.queryByText("nausée")).not.toBeInTheDocument();
    });

    it("should display 'Tous' for 'all' tag", () => {
      render(<ListAllergyTag {...defaultProps} />);
      expect(screen.getByText("Tous")).toBeInTheDocument();
    });
  });

  describe("Active state", () => {
    it("should mark active tag as pressed", () => {
      render(<ListAllergyTag {...defaultProps} activeTag="nausée" />);
      const buttons = screen.getAllByRole("button");
      const nauseeButton = buttons.find(
        (btn) => btn.getAttribute("aria-label") === "Filtrer par Nausée",
      );
      expect(nauseeButton).toHaveAttribute("aria-pressed", "true");
    });

    it("should mark inactive tags as not pressed", () => {
      render(<ListAllergyTag {...defaultProps} activeTag="nausée" />);
      const buttons = screen.getAllByRole("button");
      const allButton = buttons.find(
        (btn) => btn.getAttribute("aria-label") === "Filtrer par Tous",
      );
      expect(allButton).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Interactions", () => {
    it("should call onTagClick with correct tag when clicked", async () => {
      const user = userEvent.setup();
      const onTagClick = vi.fn();
      render(<ListAllergyTag {...defaultProps} onTagClick={onTagClick} />);

      await user.click(screen.getByText("Nausée"));
      expect(onTagClick).toHaveBeenCalledWith("nausée");
    });

    it("should call onTagClick for 'all' tag", async () => {
      const user = userEvent.setup();
      const onTagClick = vi.fn();
      render(<ListAllergyTag {...defaultProps} onTagClick={onTagClick} />);

      await user.click(screen.getByText("Tous"));
      expect(onTagClick).toHaveBeenCalledWith("all");
    });
  });

  describe("Layout", () => {
    it("should have flex wrap layout", () => {
      const { container } = render(<ListAllergyTag {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("flex-wrap");
    });

    it("should center items", () => {
      const { container } = render(<ListAllergyTag {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("justify-center");
    });

    it("should have gap between tags", () => {
      const { container } = render(<ListAllergyTag {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("gap-2");
    });
  });

  describe("Multiple tags", () => {
    it("should render correct number of buttons", () => {
      render(<ListAllergyTag {...defaultProps} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("should handle single tag", () => {
      render(<ListAllergyTag {...defaultProps} tags={["all"]} />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });
  });
});
