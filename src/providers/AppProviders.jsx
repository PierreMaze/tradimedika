import PropTypes from "prop-types";
import { ConsentProvider } from "../features/consent";
import { ExternalLinkProvider } from "../features/external-link/context/ExternalLinkContext";
import {
  AccessibilityProvider,
  PerformanceProvider,
  ThemeProvider,
} from "../features/settings";

/**
 * AppProviders - Combine tous les context providers de l'application
 *
 * Regroupe les providers suivants pour réduire la profondeur de nesting :
 * - ThemeProvider (dark mode)
 * - PerformanceProvider (animations)
 * - AccessibilityProvider (high contrast)
 * - ExternalLinkProvider (confirmation liens externes)
 * - ConsentProvider (consentement RGPD)
 *
 * Performance: Réduit le nombre de composants dans l'arbre React
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants enfants
 */
export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <AccessibilityProvider>
          <ExternalLinkProvider>
            <ConsentProvider>{children}</ConsentProvider>
          </ExternalLinkProvider>
        </AccessibilityProvider>
      </PerformanceProvider>
    </ThemeProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
