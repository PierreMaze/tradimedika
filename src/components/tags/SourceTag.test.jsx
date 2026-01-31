import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { describe, expect, it } from "vitest";
import { ExternalLinkProvider } from "../../features/external-link/context/ExternalLinkContext";
import SourceTag from "./SourceTag";

function TestWrapper({ children }) {
  return <ExternalLinkProvider>{children}</ExternalLinkProvider>;
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("SourceTag", () => {
  describe("Rendering", () => {
    it("should render with title and url props", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      expect(screen.getByText("VIDAL")).toBeInTheDocument();
    });

    it("should render external link icon", () => {
      const { container } = render(
        <SourceTag title="VIDAL" url="https://www.vidal.fr" />,
        { wrapper: TestWrapper },
      );
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should have data-testid attribute", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      expect(screen.getByTestId("source-tag")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <SourceTag
          title="VIDAL"
          url="https://www.vidal.fr"
          className="custom-class"
        />,
        { wrapper: TestWrapper },
      );
      const link = screen.getByTestId("source-tag");
      expect(link).toHaveClass("custom-class");
    });
  });

  describe("Link attributes", () => {
    it("should have correct href", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://www.vidal.fr");
    });

    it("should have rel='noopener noreferrer'", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should have tooltip title", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      expect(screen.getByTitle("Consulter sur VIDAL")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have sky color classes", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      const link = screen.getByTestId("source-tag");
      expect(link).toHaveClass("bg-sky-100", "text-sky-800");
    });

    it("should have inline-flex layout", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      const link = screen.getByTestId("source-tag");
      expect(link).toHaveClass("inline-flex", "items-center", "gap-2");
    });

    it("should have rounded styling", () => {
      render(<SourceTag title="VIDAL" url="https://www.vidal.fr" />, {
        wrapper: TestWrapper,
      });
      const link = screen.getByTestId("source-tag");
      expect(link).toHaveClass("rounded-md");
    });
  });

  describe("Favicon and icons", () => {
    it("should render favicon image", () => {
      const { container } = render(
        <SourceTag title="VIDAL" url="https://www.vidal.fr" />,
        { wrapper: TestWrapper },
      );
      const faviconImg = container.querySelector("img");
      expect(faviconImg).toBeInTheDocument();
      expect(faviconImg).toHaveAttribute("src");
      expect(faviconImg.getAttribute("src")).toContain(
        "google.com/s2/favicons",
      );
    });

    it("should have aria-hidden on icons", () => {
      const { container } = render(
        <SourceTag title="VIDAL" url="https://www.vidal.fr" />,
        { wrapper: TestWrapper },
      );
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Different sources", () => {
    it("should render with WHO url", () => {
      render(<SourceTag title="WHO" url="https://www.who.int" />, {
        wrapper: TestWrapper,
      });
      expect(screen.getByText("WHO")).toBeInTheDocument();
    });

    it("should render with PubMed url", () => {
      render(
        <SourceTag
          title="PubMed"
          url="https://pubmed.ncbi.nlm.nih.gov/12345"
        />,
        { wrapper: TestWrapper },
      );
      expect(screen.getByText("PubMed")).toBeInTheDocument();
    });

    it("should render with Passeport Santé url", () => {
      render(
        <SourceTag
          title="Passeport Santé"
          url="https://www.passeportsante.net"
        />,
        { wrapper: TestWrapper },
      );
      expect(screen.getByText("Passeport Santé")).toBeInTheDocument();
    });
  });
});
