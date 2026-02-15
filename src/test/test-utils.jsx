import { render } from "@testing-library/react";
import PropTypes from "prop-types";
import { AccessibilityProvider } from "../features/settings/context/AccessibilityContext";
import { ThemeProvider } from "../features/settings/context/ThemeContext";

// Wrapper avec tous les providers nécessaires pour les tests
export function AllTheProviders({ children }) {
  return (
    <ThemeProvider>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </ThemeProvider>
  );
}

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom render qui inclut les providers
// eslint-disable-next-line react-refresh/only-export-components
export function renderWithProviders(ui, options) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
