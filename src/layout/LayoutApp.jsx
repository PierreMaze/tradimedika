// tradimedika-v1/src/layout/LayoutApp.jsx
import { Outlet, ScrollRestoration } from "react-router-dom";
import Disclaimer from "../components/disclaimer/Disclaimer";
import LeafFall from "../components/LeafFall";
import Footer from "./components/Footer";
import Header from "./components/Header";

function LayoutApp() {
  return (
    <div className="bg-light dark:bg-dark relative flex h-screen flex-col items-center transition duration-300 ease-in-out">
      {/* LeafFall global - animation d'arrière-plan sur toutes les pages */}
      {/* NE PAS dupliquer dans les composants enfants (Hero, etc.) */}
      <LeafFall />
      <div className="relative z-10 flex h-full w-full flex-col items-center">
        <Header />
        <Disclaimer />
        <ScrollRestoration />
        <Outlet />
        <Footer className="mt-auto" />
      </div>
    </div>
  );
}

export default LayoutApp;
