import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoadingFallback from "./LoadingFallback";

describe("LoadingFallback", () => {
  describe("Rendering", () => {
    it("should render loading spinner", () => {
      const { container } = render(<LoadingFallback />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("should have centered layout", () => {
      const { container } = render(<LoadingFallback />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("flex");
      expect(wrapper?.className).toContain("items-center");
      expect(wrapper?.className).toContain("justify-center");
    });

    it("should have min-h-screen", () => {
      const { container } = render(<LoadingFallback />);
      const wrapper = container.firstChild;
      expect(wrapper?.className).toContain("min-h-screen");
    });
  });

  describe("Spinner styling", () => {
    it("should have rounded spinner", () => {
      const { container } = render(<LoadingFallback />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner?.className).toContain("rounded-full");
    });

    it("should have border styling", () => {
      const { container } = render(<LoadingFallback />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner?.className).toContain("border-4");
      expect(spinner?.className).toContain("border-emerald-600");
      expect(spinner?.className).toContain("border-t-transparent");
    });

    it("should have correct size", () => {
      const { container } = render(<LoadingFallback />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner?.className).toContain("h-12");
      expect(spinner?.className).toContain("w-12");
    });

    it("should have spin animation", () => {
      const { container } = render(<LoadingFallback />);
      const spinner = container.querySelector(".animate-spin");
      expect(spinner?.className).toContain("animate-spin");
    });
  });

  describe("Component structure", () => {
    it("should render a wrapper div", () => {
      const { container } = render(<LoadingFallback />);
      expect(container.firstChild?.tagName).toBe("DIV");
    });

    it("should have spinner as child", () => {
      const { container } = render(<LoadingFallback />);
      const wrapper = container.firstChild;
      const spinner = wrapper?.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    it("should not have text content", () => {
      const { container } = render(<LoadingFallback />);
      expect(container.textContent).toBe("");
    });
  });

  describe("Visual regression", () => {
    it("should render consistently", () => {
      const { container } = render(<LoadingFallback />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
