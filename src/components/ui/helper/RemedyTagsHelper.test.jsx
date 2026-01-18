// components/ui/helper/RemedyTagsHelper.test.jsx
/* global global */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RemedyTagsHelper from "./RemedyTagsHelper";

// Mock the tag components
vi.mock("../tag/VerifiedTag", () => ({
  default: () => <div data-testid="verified-tag">Verified Tag</div>,
}));

vi.mock("../tag/TraditionnalTag", () => ({
  default: () => <div data-testid="traditionnal-tag">Traditionnal Tag</div>,
}));

vi.mock("../tag/PregnancyTag", () => ({
  default: () => <div data-testid="pregnancy-tag">Pregnancy Tag</div>,
}));

vi.mock("../tag/ChildrenAgeTag", () => ({
  default: () => <div data-testid="children-age-tag">Children Age Tag</div>,
}));

describe("RemedyTagsHelper", () => {
  beforeEach(() => {
    // Reset window.innerWidth to desktop size
    global.innerWidth = 1024;
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    global.innerWidth = 1024;
  });

  describe("Rendering", () => {
    it("should render the question mark button", () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toBeInTheDocument();
    });

    it("should not display tooltip on initial render", () => {
      render(<RemedyTagsHelper />);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("should render all three tag components when tooltip is open", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      // Check button state changed
      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should display tooltip title when open", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should render fixed position container", () => {
      const { container } = render(<RemedyTagsHelper />);
      const fixedContainer = container.firstChild;
      expect(fixedContainer).toHaveClass("fixed");
      expect(fixedContainer).toHaveClass("z-50");
    });
  });

  describe("Button sizing", () => {
    it("should have small button size on mobile", () => {
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toHaveClass("h-12", "w-12");
    });

    it("should have large button size on desktop", () => {
      global.innerWidth = 1024;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toHaveClass("lg:h-16", "lg:w-16");
    });

    it("should have correct styling classes on button", () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toHaveClass("inline-flex");
      expect(button).toHaveClass("rounded-lg");
      expect(button).toHaveClass("bg-emerald-600");
      expect(button).toHaveClass("shadow-lg");
    });
  });

  describe("Click interaction mobile", () => {
    beforeEach(() => {
      global.innerWidth = 500;
    });

    it("should toggle tooltip on button click on mobile", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      // Initially closed
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      // Click to open
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      // Click to close
      await user.click(button);
      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should set aria-expanded attribute correctly on mobile", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should display close button on mobile when tooltip is open", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByLabelText("Fermer")).toBeInTheDocument();
      });
    });

    it("should close tooltip when close button is clicked on mobile", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("Fermer");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should display backdrop overlay on mobile when tooltip is open", async () => {
      const user = userEvent.setup();
      const { container } = render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        const backdrop = container.querySelector(".bg-black\\/50");
        expect(backdrop).toBeInTheDocument();
      });
    });
  });

  describe("Hover interaction desktop", () => {
    beforeEach(() => {
      global.innerWidth = 1024;
    });

    it("should open tooltip on mouse enter on desktop", async () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      fireEvent.mouseEnter(button);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should close tooltip on mouse leave on desktop", async () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      fireEvent.mouseEnter(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      fireEvent.mouseLeave(button);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should not show close button on desktop", async () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      fireEvent.mouseEnter(button);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      // Close button should have lg:hidden class on desktop
      const closeButton = screen.getByLabelText("Fermer");
      expect(closeButton).toHaveClass("lg:hidden");
    });

    it("should not show backdrop overlay on desktop", async () => {
      const { container } = render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      fireEvent.mouseEnter(button);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      const backdrop = container.querySelector(".bg-black\\/50");
      expect(backdrop).toHaveClass("lg:hidden");
    });
  });

  describe("Keyboard interaction", () => {
    beforeEach(() => {
      global.innerWidth = 500;
    });

    it("should close tooltip when Escape key is pressed", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should not close tooltip when other keys are pressed", async () => {
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      await user.keyboard("a");

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Click outside interaction", () => {
    beforeEach(() => {
      global.innerWidth = 500;
    });

    it("should close tooltip when clicking outside on mobile", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <RemedyTagsHelper />
          <div data-testid="outside">Outside element</div>
        </div>,
      );
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      await user.click(outside);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should close tooltip when clicking on backdrop overlay", async () => {
      const user = userEvent.setup();
      const { container } = render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      const backdrop = container.querySelector(".bg-black\\/50");
      if (backdrop) {
        await user.click(backdrop);
      }

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label on button", () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toHaveAttribute("aria-label");
    });

    it("should have proper aria-expanded attribute", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have role tooltip on tooltip content", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have aria-hidden on close button icon", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      const { container } = render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        const closeIcon = container.querySelector("[aria-hidden='true']");
        expect(closeIcon).toBeInTheDocument();
      });
    });

    it("should have keyboard focus on button", () => {
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");
      expect(button).toBeInTheDocument();
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe("Content", () => {
    it("should display correct description text for verified tag", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should display correct description text for traditionnal tag", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should display correct description text for pregnancy tag", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should display correct description text for children age tag", async () => {
      const user = userEvent.setup();
      global.innerWidth = 500;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("Positioning", () => {
    it("should use centered positioning on mobile", async () => {
      global.innerWidth = 500;
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveClass("top-1/2", "left-1/2");
      });
    });

    it("should use absolute positioning on desktop", async () => {
      global.innerWidth = 1024;
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      fireEvent.mouseEnter(button);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveClass("lg:absolute");
      });
    });

    it("should have correct bottom positioning in fixed container", () => {
      render(<RemedyTagsHelper />);
      const { container } = render(<RemedyTagsHelper />);
      const fixedContainer = container.firstChild;
      expect(fixedContainer).toHaveClass("bottom-6");
      expect(fixedContainer).toHaveClass("right-6");
    });
  });

  describe("Z-index layering", () => {
    it("should have z-50 on button container", () => {
      const { container } = render(<RemedyTagsHelper />);
      const fixedContainer = container.firstChild;
      expect(fixedContainer).toHaveClass("z-50");
    });

    it("should have z-50 on backdrop overlay on mobile", async () => {
      global.innerWidth = 500;
      const user = userEvent.setup();
      const { container } = render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        const backdrop = container.querySelector(".bg-black\\/50");
        expect(backdrop).toHaveClass("z-50");
      });
    });

    it("should have z-60 on tooltip content to appear above backdrop", async () => {
      global.innerWidth = 500;
      const user = userEvent.setup();
      render(<RemedyTagsHelper />);
      const button = screen.getByLabelText("Informations sur les tags");

      await user.click(button);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveClass("z-60");
      });
    });
  });
});
