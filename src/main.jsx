// Self-hosted fonts (Poppins) - loaded before other imports for performance
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semibold
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/900.css"; // Black (for logo)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ErrorFallback } from "./components/ui/animation";
import "./index.css";
import { AppProviders } from "./providers";
import router from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppProviders>
          <RouterProvider router={router} />
        </AppProviders>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
