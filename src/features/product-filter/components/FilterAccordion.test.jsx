import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FilterAccordion from "./FilterAccordion";

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

/* -------------------------------------------------------------------------- */

const categoryMock = {
  id: "effects",
  label: "Effects",
  options: [
    {
      id: "anti-inflammatory",
      label: "Anti-inflammatory",
      description: "Reduces inflammation",
      color: "green",
    },
    {
      id: "pain-relief",
      label: "Pain relief",
      description: "Helps relieve pain",
      color: "red",
    },
  ],
};

const defaultProps = {
  category: categoryMock,
  activeFilters: {},
  onToggle: vi.fn(),
};

/* -------------------------------------------------------------------------- */

describe("FilterAccordion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------------ */
  /*                               Rendering                                  */
  /* ------------------------------------------------------------------------ */

  it("should render the category label", () => {
    render(<FilterAccordion {...defaultProps} />);

    expect(screen.getByText("Effects")).toBeInTheDocument();
  });

  it("should be open by default", () => {
    render(<FilterAccordion {...defaultProps} />);

    expect(screen.getByText("Anti-inflammatory")).toBeInTheDocument();
  });

  it("should be closed by default when isOpenByDefault is false", () => {
    render(<FilterAccordion {...defaultProps} isOpenByDefault={false} />);

    expect(screen.queryByText("Anti-inflammatory")).not.toBeInTheDocument();
  });

  /* ------------------------------------------------------------------------ */
  /*                               Toggle                                    */
  /* ------------------------------------------------------------------------ */

  it("should toggle open and close when header is clicked", async () => {
    const user = userEvent.setup();

    render(<FilterAccordion {...defaultProps} isOpenByDefault={false} />);

    const headerButton = screen.getByRole("button");

    await user.click(headerButton);
    expect(screen.getByText("Anti-inflammatory")).toBeInTheDocument();

    await user.click(headerButton);
    expect(screen.queryByText("Anti-inflammatory")).not.toBeInTheDocument();
  });

  it("should update aria-expanded when toggling", async () => {
    const user = userEvent.setup();

    render(<FilterAccordion {...defaultProps} isOpenByDefault={false} />);

    const headerButton = screen.getByRole("button");

    expect(headerButton).toHaveAttribute("aria-expanded", "false");

    await user.click(headerButton);
    expect(headerButton).toHaveAttribute("aria-expanded", "true");
  });

  /* ------------------------------------------------------------------------ */
  /*                             Checkboxes                                   */
  /* ------------------------------------------------------------------------ */

  it("should render a checkbox for each option", () => {
    render(<FilterAccordion {...defaultProps} />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(2);
  });

  it("should check the checkbox when the option is active", () => {
    render(
      <FilterAccordion
        {...defaultProps}
        activeFilters={{ "anti-inflammatory": true }}
      />,
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).toBeChecked();
  });

  it("should call onToggle with category id and option id when checkbox is clicked", async () => {
    const user = userEvent.setup();

    render(<FilterAccordion {...defaultProps} />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);

    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(
      "effects",
      "anti-inflammatory",
    );
  });

  /* ------------------------------------------------------------------------ */
  /*                           Visual indicators                              */
  /* ------------------------------------------------------------------------ */

  it("should render the color indicator for each option", () => {
    const { container } = render(<FilterAccordion {...defaultProps} />);

    const indicators = container.querySelectorAll(".rounded-full");

    expect(indicators.length).toBeGreaterThanOrEqual(2);
  });

  it("should hide chevron icons from screen readers", () => {
    const { container } = render(<FilterAccordion {...defaultProps} />);

    const icon = container.querySelector('svg[aria-hidden="true"]');

    expect(icon).toBeInTheDocument();
  });
});
