import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import { describe, expect, it } from "vitest";
import { ExternalLinkProvider } from "../../../features/external-link/context/ExternalLinkContext";
import FeedbackLink from "./FeedbackLink";

function TestWrapper({ children }) {
  return <ExternalLinkProvider>{children}</ExternalLinkProvider>;
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("FeedbackLink", () => {
  it("renders the feedback message", () => {
    render(<FeedbackLink />, { wrapper: TestWrapper });
    expect(
      screen.getByText(
        /Le projet vous plaît, vous avez trouvé un bug \? Faites-le nous savoir !/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the feedback link with correct attributes", () => {
    render(<FeedbackLink />, { wrapper: TestWrapper });
    const link = screen.getByRole("link", { name: /feedback/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://tally.so/r/3x0O8o");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the feedback button text", () => {
    render(<FeedbackLink />, { wrapper: TestWrapper });
    expect(screen.getByText(/Envoyer votre feedback/i)).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<FeedbackLink className="custom-class" />, {
      wrapper: TestWrapper,
    });
    const feedbackDiv = container.firstChild;
    expect(feedbackDiv).toHaveClass("custom-class");
  });

  it("has accessible aria-label on the link", () => {
    render(<FeedbackLink />, { wrapper: TestWrapper });
    const link = screen.getByRole("link", { name: /feedback/i });
    expect(link).toHaveAttribute(
      "aria-label",
      "Donner votre feedback (ouvre dans une nouvelle fenêtre)",
    );
  });

  it("renders the MdFeedback icon with aria-hidden", () => {
    const { container } = render(<FeedbackLink />, { wrapper: TestWrapper });
    const icon = container.querySelector('svg[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });
});
