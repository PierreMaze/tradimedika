// tradimedika-v1/src/layout/LayoutApp.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Disclaimer from "../components/disclaimer/Disclaimer";
import CookieBanner from "../features/cookie-consent/components/CookieBanner";
import ExternalLinkConfirmationModal from "../features/external-link/components/ExternalLinkConfirmationModal";
import { SettingsModalProvider } from "../features/settings";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Lazy load LeafFall to defer loading and improve FCP
const LeafFall = lazy(() =>
  import("../components/ui/animation").then((module) => ({
    default: module.LeafFall,
  })),
);

function LayoutApp() {
  const [showLeafFall, setShowLeafFall] = useState(false);

  useEffect(() => {
    // Defer LeafFall animation by 1 second to improve initial render performance
    const timer = setTimeout(() => {
      setShowLeafFall(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SettingsModalProvider>
      <div className="bg-light dark:bg-dark relative flex min-h-screen flex-col items-center transition-colors duration-150 ease-out">
        {/* LeafFall global - animation d'arrière-plan sur toutes les pages */}
        {/* Lazy-loaded with 1s delay to improve FCP */}
        {/* NE PAS dupliquer dans les composants enfants (Hero, etc.) */}
        {showLeafFall && (
          <Suspense fallback={null}>
            <LeafFall />
          </Suspense>
        )}
        <div className="relative z-10 flex min-h-screen w-full flex-col items-center">
          <Header />
          <Disclaimer />
          <ScrollRestoration />
          <main className="flex w-full flex-1 flex-col">
            <Outlet />
          </main>
          <Footer className="mt-auto" />
          <CookieBanner />
          <ExternalLinkConfirmationModal />
        </div>
      </div>
    </SettingsModalProvider>
  );
}

export default LayoutApp;
