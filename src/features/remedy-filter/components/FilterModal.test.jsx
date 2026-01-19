import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FilterModal from "./FilterModal";

/* -------------------------------------------------------------------------- */
/*                                   Mocks                                    */
/* -------------------------------------------------------------------------- */

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");

  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  };
});

vi.mock("../../settings/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

vi.mock("../utils/filterRemedies", () => ({
  FILTER_CATEGORIES: [
    { id: "category-1", label: "Category 1" },
    { id: "category-2", label: "Category 2" },
  ],
}));

vi.mock("./FilterAccordion", () => ({
  default: ({ category }) => (
    <div data-testid="filter-accordion">{category.label}</div>
  ),
}));

/* -------------------------------------------------------------------------- */

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  tempFilters: {
    "category-1": [],
    "category-2": [],
  },
  onToggleTempFilter: vi.fn(),
  onResetTempFilters: vi.fn(),
  onApplyFilters: vi.fn(),
};

describe("FilterModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  /* ------------------------------------------------------------------------ */
  /*                               Rendering                                  */
  /* ------------------------------------------------------------------------ */

  it("should not render anything when isOpen is false", () => {
    render(<FilterModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render the modal when isOpen is true", () => {
    render(<FilterModal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /filtrer les remèdes/i }),
    ).toBeInTheDocument();
  });

  it("should render all filter categories", () => {
    render(<FilterModal {...defaultProps} />);

    const accordions = screen.getAllByTestId("filter-accordion");
    expect(accordions).toHaveLength(2);
  });

  /* ------------------------------------------------------------------------ */
  /*                              Accessibility                                */
  /* ------------------------------------------------------------------------ */

  it("should have correct dialog accessibility attributes", () => {
    render(<FilterModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "filter-modal-title");
  });

  it("should focus the modal when opened", () => {
    render(<FilterModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveFocus();
  });

  /* ------------------------------------------------------------------------ */
  /*                              Interactions                                */
  /* ------------------------------------------------------------------------ */

  it("should call onClose when clicking the close button", async () => {
    const user = userEvent.setup();
    render(<FilterModal {...defaultProps} />);

    await user.click(screen.getByLabelText(/fermer/i));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking the backdrop", () => {
    const { container } = render(<FilterModal {...defaultProps} />);

    const backdrop = container.querySelector(".bg-black\\/60");
    fireEvent.click(backdrop);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when pressing Escape", () => {
    render(<FilterModal {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onResetTempFilters when clicking reset button", async () => {
    const user = userEvent.setup();
    render(<FilterModal {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /réinitialiser/i }));

    expect(defaultProps.onResetTempFilters).toHaveBeenCalledTimes(1);
  });

  it("should call onApplyFilters when clicking apply button", async () => {
    const user = userEvent.setup();
    render(<FilterModal {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /appliquer/i }));

    expect(defaultProps.onApplyFilters).toHaveBeenCalledTimes(1);
  });

  /* ------------------------------------------------------------------------ */
  /*                              Side effects                                */
  /* ------------------------------------------------------------------------ */

  it("should disable body scroll when modal is open", () => {
    render(<FilterModal {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body scroll when modal is closed", () => {
    const { rerender } = render(<FilterModal {...defaultProps} />);

    rerender(<FilterModal {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe("");
  });

  /* ------------------------------------------------------------------------ */
  /*                               Edge cases                                 */
  /* ------------------------------------------------------------------------ */

  it("should not close when pressing Escape if modal is closed", () => {
    render(<FilterModal {...defaultProps} isOpen={false} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });
});
