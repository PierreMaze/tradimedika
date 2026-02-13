import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock global pour useAccessibility
vi.mock(
  "../features/settings/context/AccessibilityContext",
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useAccessibility: vi.fn(() => ({
        isHighContrast: false,
        toggleHighContrast: vi.fn(),
        isExternalLinkConfirmEnabled: true,
        toggleExternalLinkConfirm: vi.fn(),
      })),
    };
  },
);
