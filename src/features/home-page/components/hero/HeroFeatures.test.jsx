import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroFeatures from "./HeroFeatures";

describe("HeroFeatures", () => {
  const DEFAULT_FEATURES = [
    "+100 produits naturels",
    "Source référencée",
    "Recherche simplifié",
    "Respect de vos données",
  ];

  describe("Rendering with default features", () => {
    it("should render all default features", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should render 4 features by default", () => {
      const { container } = render(<HeroFeatures />);

      const features = container.querySelectorAll(".flex.items-center.gap-2");
      expect(features.length).toBe(4);
    });

    it("should render checkmark icon for each feature", () => {
      const { container } = render(<HeroFeatures />);

      // FaCheck icons - one per feature
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBe(4);
    });
  });

  describe("Rendering with custom features", () => {
    it("should render custom features", () => {
      const customFeatures = ["Feature 1", "Feature 2", "Feature 3"];
      render(<HeroFeatures features={customFeatures} />);

      customFeatures.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should not render default features when custom provided", () => {
      const customFeatures = ["Custom 1", "Custom 2"];
      render(<HeroFeatures features={customFeatures} />);

      DEFAULT_FEATURES.forEach((feature) => {
        expect(screen.queryByText(feature)).not.toBeInTheDocument();
      });
    });

    it("should render single feature", () => {
      render(<HeroFeatures features={["Single feature"]} />);

      expect(screen.getByText("Single feature")).toBeInTheDocument();
    });

    it("should render many features", () => {
      const manyFeatures = Array.from(
        { length: 10 },
        (_, i) => `Feature ${i + 1}`,
      );
      render(<HeroFeatures features={manyFeatures} />);

      manyFeatures.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should handle empty features array", () => {
      const { container } = render(<HeroFeatures features={[]} />);

      const features = container.querySelectorAll(".flex.items-center.gap-2");
      expect(features.length).toBe(0);
    });
  });

  describe("Icon rendering", () => {
    it("should render checkmark icon for each feature", () => {
      const { container } = render(<HeroFeatures />);

      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBe(DEFAULT_FEATURES.length);
    });

    it("should apply icon styles", () => {
      const { container } = render(<HeroFeatures />);

      const icons = container.querySelectorAll("svg");
      icons.forEach((icon) => {
        expect(icon).toHaveClass("text-emerald-600/80");
        expect(icon).toHaveClass("dark:text-emerald-500/80");
      });
    });
  });

  describe("Layout and styling", () => {
    it("should have flex wrapper with proper classes", () => {
      const { container } = render(<HeroFeatures />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex");
      expect(wrapper).toHaveClass("flex-wrap");
      expect(wrapper).toHaveClass("justify-center");
    });

    it("should have proper gap classes", () => {
      const { container } = render(<HeroFeatures />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("gap-4");
      expect(wrapper).toHaveClass("lg:gap-6");
    });

    it("should apply feature text styles", () => {
      render(<HeroFeatures />);

      const firstFeature = screen.getByText(DEFAULT_FEATURES[0]);
      expect(firstFeature).toHaveClass("text-sm");
      expect(firstFeature).toHaveClass("font-semibold");
      expect(firstFeature).toHaveClass("text-neutral-600");
    });

    it("should apply dark mode classes", () => {
      render(<HeroFeatures />);

      const firstFeature = screen.getByText(DEFAULT_FEATURES[0]);
      expect(firstFeature).toHaveClass("dark:text-neutral-400");
    });

    it("should apply responsive text sizing", () => {
      render(<HeroFeatures />);

      const firstFeature = screen.getByText(DEFAULT_FEATURES[0]);
      expect(firstFeature).toHaveClass("text-sm");
      expect(firstFeature).toHaveClass("lg:text-base");
    });
  });

  describe("Feature items layout", () => {
    it("should render each feature with icon and text", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        const featureText = screen.getByText(feature);
        const featureContainer = featureText.parentElement;

        // Should have both icon and text
        expect(featureContainer.querySelector("svg")).toBeInTheDocument();
        expect(featureText).toBeInTheDocument();
      });
    });

    it("should have flex layout for each feature item", () => {
      const { container } = render(<HeroFeatures />);

      const featureItems = container.querySelectorAll(
        ".flex.items-center.gap-2",
      );
      featureItems.forEach((item) => {
        expect(item).toHaveClass("flex");
        expect(item).toHaveClass("items-center");
        expect(item).toHaveClass("gap-2");
      });
    });
  });

  describe("Unique keys", () => {
    it("should use feature text as key", () => {
      // Keys are used internally by React
      // We verify by checking that all features render correctly
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should handle duplicate features", () => {
      const duplicateFeatures = ["Feature 1", "Feature 1", "Feature 2"];
      render(<HeroFeatures features={duplicateFeatures} />);

      // Both "Feature 1" should render (React will warn about keys in console)
      const feature1Elements = screen.getAllByText("Feature 1");
      expect(feature1Elements.length).toBe(2);
    });
  });

  describe("Content variations", () => {
    it("should handle features with special characters", () => {
      const features = ["Feature & Co", "100% Natural", "Prix < 10€"];
      render(<HeroFeatures features={features} />);

      features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should handle features with numbers", () => {
      const features = ["+100 items", "24/7 support", "30 days trial"];
      render(<HeroFeatures features={features} />);

      features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should handle long feature text", () => {
      const longFeature = [
        "This is a very long feature description that should still render correctly",
      ];
      render(<HeroFeatures features={longFeature} />);

      expect(screen.getByText(longFeature[0])).toBeInTheDocument();
    });

    it("should handle empty string feature", () => {
      const features = ["Feature 1", "", "Feature 3"];
      render(<HeroFeatures features={features} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 3")).toBeInTheDocument();
      // Empty string still creates an element
      const featureItems = screen.getAllByRole("generic");
      expect(featureItems.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should render text as readable spans", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        const text = screen.getByText(feature);
        expect(text.tagName).toBe("SPAN");
      });
    });

    it("should have visible text content", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should not have hidden content", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        const element = screen.getByText(feature);
        expect(element).not.toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Responsiveness", () => {
    it("should have responsive gap classes", () => {
      const { container } = render(<HeroFeatures />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("gap-4");
      expect(wrapper).toHaveClass("lg:gap-6");
      expect(wrapper).toHaveClass("xl:gap-8");
    });

    it("should wrap features on small screens", () => {
      const { container } = render(<HeroFeatures />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("flex-wrap");
    });
  });

  describe("PropTypes", () => {
    it("should accept features array prop", () => {
      const features = ["Test 1", "Test 2"];
      render(<HeroFeatures features={features} />);

      features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });

    it("should use default features when prop not provided", () => {
      render(<HeroFeatures />);

      DEFAULT_FEATURES.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });
});
