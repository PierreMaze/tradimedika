// tradimedika-v1/src/App.jsx
import Hero from "./components/sections/Hero";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  return (
    <div className="bg-light dark:bg-dark flex h-screen flex-col items-center justify-between transition duration-300 ease-in-out">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
