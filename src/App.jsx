// tradimedika-v1/src/App.jsx
import Hero from "./components/sections/Hero";
import { useTheme } from "./context/ThemeContext";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${isDarkMode ? "bg-dark" : "bg-light"} flex h-screen flex-col items-center justify-between transition duration-300 ease-in-out`}
    >
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
