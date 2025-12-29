// components/seo/SEO.test.jsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";

// Helper pour wrapper avec HelmetProvider
const renderWithHelmet = (ui) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe("SEO Component", () => {
  it("should render without crashing with required props", () => {
    expect(() => {
      renderWithHelmet(<SEO title="Test Page" />);
    }).not.toThrow();
  });

  it("should render without crashing with all props", () => {
    expect(() => {
      renderWithHelmet(
        <SEO
          title="Test Page"
          description="Test Description"
          canonical="/test"
          image="https://example.com/image.jpg"
          type="article"
          siteName="Custom Site"
          additionalMeta={{ author: "John Doe" }}
        />,
      );
    }).not.toThrow();
  });

  it("should render without crashing with empty description", () => {
    expect(() => {
      renderWithHelmet(<SEO title="Test" description="" />);
    }).not.toThrow();
  });

  it("should render without crashing with relative canonical URL", () => {
    expect(() => {
      renderWithHelmet(<SEO title="Test" canonical="/test-page" />);
    }).not.toThrow();
  });

  it("should render without crashing with absolute canonical URL", () => {
    expect(() => {
      renderWithHelmet(
        <SEO title="Test" canonical="https://example.com/test" />,
      );
    }).not.toThrow();
  });

  it("should render without crashing with custom image", () => {
    expect(() => {
      renderWithHelmet(
        <SEO title="Test" image="https://example.com/image.jpg" />,
      );
    }).not.toThrow();
  });

  it("should render without crashing with additional meta tags", () => {
    expect(() => {
      renderWithHelmet(
        <SEO
          title="Test"
          additionalMeta={{
            author: "John Doe",
            keywords: "react, testing",
          }}
        />,
      );
    }).not.toThrow();
  });

  it("should accept type prop for Open Graph", () => {
    expect(() => {
      renderWithHelmet(<SEO title="Test" type="article" />);
    }).not.toThrow();
  });

  it("should accept custom siteName prop", () => {
    expect(() => {
      renderWithHelmet(<SEO title="Test" siteName="Custom Site" />);
    }).not.toThrow();
  });

  it("should handle null/undefined optional props gracefully", () => {
    expect(() => {
      renderWithHelmet(
        <SEO
          title="Test"
          description={undefined}
          canonical={undefined}
          image={undefined}
        />,
      );
    }).not.toThrow();
  });
});
