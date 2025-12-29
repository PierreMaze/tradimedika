import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorFallback from "./components/errors/ErrorFallback";
import router from "./routes/Router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
