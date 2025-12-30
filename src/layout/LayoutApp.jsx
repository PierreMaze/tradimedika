// tradimedika-v1/src/layout/LayoutApp.jsx
import { Outlet, ScrollRestoration } from "react-router-dom";
import LeafFall from "../components/LeafFall";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Disclaimer from "../components/disclaimer/Disclaimer";

function LayoutApp() {
  return (
    <div className="bg-light dark:bg-dark relative flex h-screen flex-col items-center justify-between transition duration-300 ease-in-out">
      <LeafFall />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
        <Header />
        <Disclaimer />
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default LayoutApp;
