import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ErrorFallback } from "./components/ui/animation";
import { ExternalLinkProvider } from "./features/external-link/context/ExternalLinkContext";
import { PerformanceProvider, ThemeProvider } from "./features/settings";
import "./index.css";
import router from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>
          <PerformanceProvider>
            <ExternalLinkProvider>
              <RouterProvider router={router} />
            </ExternalLinkProvider>
          </PerformanceProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
