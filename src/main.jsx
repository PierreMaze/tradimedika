import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import ErrorFallback from "./components/animation/fallback/ErrorFallback";
import { PerformanceProvider } from "./context/PerformanceContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import router from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>
          <PerformanceProvider>
            <RouterProvider router={router} />
          </PerformanceProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
