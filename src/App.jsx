import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <Header />
      <h1 className="text-5xl font-black text-center">
        FUTURE APP TRADIMEDIKA
      </h1>
      <Footer />
    </div>
  );
}

export default App;
