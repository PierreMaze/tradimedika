import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AllergyTag from "./AllergyTag";

describe("AllergyTag", () => {
  const defaultProps = {
    label: "Test Tag",
    isActive: false,
    onClick: vi.fn(),
  };

  describe("Rendering", () => {
    it("should render the tag label", () => {
      render(<AllergyTag {...defaultProps} />);
      expect(screen.getByText("Test Tag")).toBeInTheDocument();
    });

    it("should have button type", () => {
      render(<AllergyTag {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should have aria-label", () => {
      render(<AllergyTag {...defaultProps} />);
      expect(screen.getByLabelText("Filtrer par Test Tag")).toBeInTheDocument();
    });
  });

  describe("Active state", () => {
    it("should have aria-pressed true when active", () => {
      render(<AllergyTag {...defaultProps} isActive={true} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("should have aria-pressed false when inactive", () => {
      render(<AllergyTag {...defaultProps} isActive={false} />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "false");
    });

    it("should apply primary styles when active", () => {
      const { container } = render(<AllergyTag {...defaultProps} isActive />);
      const button = container.querySelector("button");
      expect(button?.className).toContain("cursor-pointer");
    });

    it("should apply neutral styles when inactive", () => {
      const { container } = render(<AllergyTag {...defaultProps} />);
      const button = container.querySelector("button");
      expect(button?.className).toContain("bg-neutral-200");
    });
  });

  describe("Interactions", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<AllergyTag {...defaultProps} onClick={onClick} />);

      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<AllergyTag {...defaultProps} onClick={onClick} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("Styling", () => {
    it("should have rounded corners", () => {
      const { container } = render(<AllergyTag {...defaultProps} />);
      const button = container.querySelector("button");
      expect(button?.className).toContain("rounded-md");
    });

    it("should have shadow", () => {
      const { container } = render(<AllergyTag {...defaultProps} />);
      const button = container.querySelector("button");
      expect(button?.className).toContain("shadow-md");
    });

    it("should have responsive text size", () => {
      const { container } = render(<AllergyTag {...defaultProps} />);
      const button = container.querySelector("button");
      expect(button?.className).toContain("text-sm");
      expect(button?.className).toContain("lg:text-base");
    });
  });
});
