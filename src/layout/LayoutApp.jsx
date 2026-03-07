// tradimedika-v1/src/layout/LayoutApp.jsx
import { Outlet, ScrollRestoration } from "react-router-dom";
import Disclaimer from "../components/disclaimer/Disclaimer";
import CookieBanner from "../features/cookie-consent/components/CookieBanner";
import ExternalLinkConfirmationModal from "../features/external-link/components/ExternalLinkConfirmationModal";
import { SettingsModalProvider } from "../features/settings";
import SettingsModal from "../features/settings/components/SettingsModal";
import Footer from "./components/Footer";
import Header from "./components/Header";

function LayoutApp() {
  return (
    <SettingsModalProvider>
      <div className="flex min-h-screen flex-col items-center">
        <Header />
        <Disclaimer />
        <ScrollRestoration />
        <main className="flex w-full flex-1 flex-col">
          <Outlet />
        </main>
        <Footer className="mt-auto" />
        <CookieBanner />
        <ExternalLinkConfirmationModal />
        <SettingsModal />
      </div>
    </SettingsModalProvider>
  );
}

export default LayoutApp;
