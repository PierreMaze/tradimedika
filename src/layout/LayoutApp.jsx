// tradimedika-v1/src/layout/LayoutApp.jsx
import { Outlet, ScrollRestoration } from "react-router-dom";
import Disclaimer from "../components/disclaimer/Disclaimer";
import { LeafFall } from "../components/ui/animation";
import CookieBanner from "../features/cookie-consent/components/CookieBanner";
import ExternalLinkConfirmationModal from "../features/external-link/components/ExternalLinkConfirmationModal";
import { SettingsModalProvider } from "../features/settings";
import Footer from "./components/Footer";
import Header from "./components/Header";

function LayoutApp() {
  return (
    <SettingsModalProvider>
      <div className="bg-light dark:bg-dark relative flex min-h-screen flex-col items-center transition duration-300 ease-in-out">
        {/* LeafFall global - animation d'arrière-plan sur toutes les pages */}
        {/* NE PAS dupliquer dans les composants enfants (Hero, etc.) */}
        <LeafFall />
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
