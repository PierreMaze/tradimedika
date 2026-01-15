import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  let mockHandler;
  let container;

  beforeEach(() => {
    mockHandler = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  describe("Basic functionality", () => {
    it("should call handler when clicking outside element", () => {
      const TestComponent = () => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler);
        return null;
      };

      renderHook(() => TestComponent());

      // Simulate click outside
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      expect(mockHandler).toHaveBeenCalledTimes(1);

      document.body.removeChild(outsideElement);
    });

    it("should not call handler when clicking inside element", () => {
      const TestComponent = () => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler);
        return null;
      };

      renderHook(() => TestComponent());

      // Simulate click inside
      container.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      expect(mockHandler).not.toHaveBeenCalled();
    });

    it("should not call handler when clicking on child element", () => {
      const child = document.createElement("span");
      container.appendChild(child);

      const TestComponent = () => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler);
        return null;
      };

      renderHook(() => TestComponent());

      // Simulate click on child
      child.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe("isActive parameter", () => {
    it("should not add listener when isActive is false", () => {
      const TestComponent = () => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler, false);
        return null;
      };

      renderHook(() => TestComponent());

      // Simulate click outside
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      expect(mockHandler).not.toHaveBeenCalled();

      document.body.removeChild(outsideElement);
    });

    it("should add listener when isActive becomes true", () => {
      const TestComponent = ({ active }) => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler, active);
        return null;
      };
      TestComponent.propTypes = { active: PropTypes.bool };

      const { rerender } = renderHook(
        ({ active }) => TestComponent({ active }),
        {
          initialProps: { active: false },
        },
      );

      // Click while inactive
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );
      expect(mockHandler).not.toHaveBeenCalled();

      // Activate and click again
      rerender({ active: true });
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );
      expect(mockHandler).toHaveBeenCalledTimes(1);

      document.body.removeChild(outsideElement);
    });
  });

  describe("Cleanup", () => {
    it("should remove listener on unmount", () => {
      const TestComponent = () => {
        const ref = useRef(container);
        useClickOutside(ref, mockHandler);
        return null;
      };

      const { unmount } = renderHook(() => TestComponent());

      unmount();

      // Click after unmount
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      expect(mockHandler).not.toHaveBeenCalled();

      document.body.removeChild(outsideElement);
    });

    it("should update listener when handler changes", () => {
      const newHandler = vi.fn();

      const TestComponent = ({ handler }) => {
        const ref = useRef(container);
        useClickOutside(ref, handler);
        return null;
      };
      TestComponent.propTypes = { handler: PropTypes.func };

      const { rerender } = renderHook(
        ({ handler }) => TestComponent({ handler }),
        {
          initialProps: { handler: mockHandler },
        },
      );

      // Click with first handler
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );
      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(newHandler).not.toHaveBeenCalled();

      // Change handler and click again
      rerender({ handler: newHandler });
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );
      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(newHandler).toHaveBeenCalledTimes(1);

      document.body.removeChild(outsideElement);
    });
  });

  describe("Edge cases", () => {
    it("should handle null ref gracefully", () => {
      const TestComponent = () => {
        const ref = useRef(null);
        useClickOutside(ref, mockHandler);
        return null;
      };

      renderHook(() => TestComponent());

      // Click anywhere
      document.body.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      // Should not crash, handler should not be called
      expect(mockHandler).not.toHaveBeenCalled();
    });

    it("should handle multiple elements correctly", () => {
      const element1 = document.createElement("div");
      const element2 = document.createElement("div");
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const TestComponent1 = () => {
        const ref = useRef(element1);
        useClickOutside(ref, handler1);
        return null;
      };

      const TestComponent2 = () => {
        const ref = useRef(element2);
        useClickOutside(ref, handler2);
        return null;
      };

      renderHook(() => TestComponent1());
      renderHook(() => TestComponent2());

      // Click on element1
      element1.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledTimes(1);

      // Click on element2
      element2.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      document.body.removeChild(element1);
      document.body.removeChild(element2);
    });
  });
});
