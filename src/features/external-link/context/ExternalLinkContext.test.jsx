import { render, renderHook, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { ExternalLinkProvider } from "./ExternalLinkContext";
import { useExternalLink } from "../hooks/useExternalLink";

describe("ExternalLinkContext", () => {
  describe("Provider", () => {
    it("should render children correctly", () => {
      render(
        <ExternalLinkProvider>
          <div>Test</div>
        </ExternalLinkProvider>,
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  describe("useExternalLink hook", () => {
    it("should throw error when used outside Provider", () => {
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useExternalLink());
      }).toThrow("useExternalLink must be used within an ExternalLinkProvider");

      console.error = originalError;
    });

    it("should provide context values when used inside Provider", () => {
      const wrapper = ({ children }) => (
        <ExternalLinkProvider>{children}</ExternalLinkProvider>
      );

      const { result } = renderHook(() => useExternalLink(), { wrapper });

      expect(result.current).toHaveProperty("isOpen");
      expect(result.current).toHaveProperty("targetUrl");
      expect(result.current).toHaveProperty("siteName");
      expect(result.current).toHaveProperty("openConfirmation");
      expect(result.current).toHaveProperty("closeConfirmation");
      expect(result.current).toHaveProperty("confirmAndNavigate");
    });

    it("should have correct initial state", () => {
      const wrapper = ({ children }) => (
        <ExternalLinkProvider>{children}</ExternalLinkProvider>
      );

      const { result } = renderHook(() => useExternalLink(), { wrapper });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.targetUrl).toBe("");
      expect(result.current.siteName).toBe("");
    });

    it("should open confirmation with correct values", () => {
      const wrapper = ({ children }) => (
        <ExternalLinkProvider>{children}</ExternalLinkProvider>
      );

      const { result } = renderHook(() => useExternalLink(), { wrapper });

      act(() => {
        result.current.openConfirmation("https://example.com", "Example Site");
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.targetUrl).toBe("https://example.com");
      expect(result.current.siteName).toBe("Example Site");
    });

    it("should close confirmation and reset state", () => {
      const wrapper = ({ children }) => (
        <ExternalLinkProvider>{children}</ExternalLinkProvider>
      );

      const { result } = renderHook(() => useExternalLink(), { wrapper });

      act(() => {
        result.current.openConfirmation("https://example.com", "Example Site");
      });

      act(() => {
        result.current.closeConfirmation();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.targetUrl).toBe("");
      expect(result.current.siteName).toBe("");
    });

    it("should open new tab and close modal on confirmAndNavigate", () => {
      const windowOpenSpy = vi
        .spyOn(window, "open")
        .mockImplementation(() => null);

      const wrapper = ({ children }) => (
        <ExternalLinkProvider>{children}</ExternalLinkProvider>
      );

      const { result } = renderHook(() => useExternalLink(), { wrapper });

      act(() => {
        result.current.openConfirmation("https://example.com", "Example Site");
      });

      act(() => {
        result.current.confirmAndNavigate();
      });

      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
        "noopener,noreferrer",
      );
      expect(result.current.isOpen).toBe(false);

      windowOpenSpy.mockRestore();
    });
  });
});
