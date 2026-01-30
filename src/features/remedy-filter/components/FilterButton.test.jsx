import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FilterButton from "./FilterButton";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");

  return {
    ...actual,
    motion: {
      button: ({ children, ...props }) => (
        <button {...props}>{children}</button>
      ),
    },
  };
});

describe("FilterButton", () => {
  describe("Initial render", () => {
    it("should render the button with the text 'Filters'", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      expect(
        screen.getByRole("button", { name: /Ouvrir les filtres/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("Filtres")).toBeInTheDocument();
    });

    it("should have the correct aria-label", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Ouvrir les filtres",
      );
    });

    it("should have type='button'", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render the filter icon", () => {
      const { container } = render(
        <FilterButton onClick={vi.fn()} activeFiltersCount={0} />,
      );

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Counter badge", () => {
    it("should not render the badge when there are no active filters", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      expect(
        screen.queryByLabelText(/active filters/i),
      ).not.toBeInTheDocument();
    });

    it("should render the badge with the correct count", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={3} />);

      // Le badge a un role="status" avec aria-live="polite"
      const badge = screen.getByRole("status");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("3 filtres actifs");
      expect(badge).toHaveTextContent("3");
    });

    it("should apply correct position and style classes to the badge", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={2} />);

      const badge = screen.getByText("2");
      expect(badge).toHaveClass(
        "absolute",
        "-top-1",
        "-right-1",
        "bg-red-600",
        "text-white",
        "rounded-full",
      );
    });
  });

  describe("Conditional styles", () => {
    it("should apply inactive styles when there are no active filters", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-neutral-200", "text-neutral-900");
    });

    it("should apply active styles when filters are active", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={1} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-emerald-600", "text-white");
    });
  });

  describe("User interaction", () => {
    it("should call onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<FilterButton onClick={onClick} activeFiltersCount={0} />);
      await user.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should support multiple clicks", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<FilterButton onClick={onClick} activeFiltersCount={0} />);
      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Accessibility", () => {
    it("should be focusable", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);

      const button = screen.getByRole("button");
      button.focus();

      expect(button).toHaveFocus();
    });

    it("should hide the icon from screen readers", () => {
      const { container } = render(
        <FilterButton onClick={vi.fn()} activeFiltersCount={0} />,
      );

      expect(
        container.querySelector('svg[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle a high number of active filters", () => {
      render(<FilterButton onClick={vi.fn()} activeFiltersCount={99} />);

      expect(screen.getByText("99")).toBeInTheDocument();
    });

    it("should correctly handle transition from 0 to 1 active filter", () => {
      const { rerender } = render(
        <FilterButton onClick={vi.fn()} activeFiltersCount={0} />,
      );

      rerender(<FilterButton onClick={vi.fn()} activeFiltersCount={1} />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should correctly handle transition from 1 to 0 active filters", () => {
      const { rerender } = render(
        <FilterButton onClick={vi.fn()} activeFiltersCount={1} />,
      );

      rerender(<FilterButton onClick={vi.fn()} activeFiltersCount={0} />);
      expect(screen.queryByText("1")).not.toBeInTheDocument();
    });
  });
});
