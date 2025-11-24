import Header from "./layout/Header";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <Header />
      <h1 className="text-5xl font-black text-center">
        FUTURE APP TRADIMEDIKA
      </h1>
      <div className="w-full h-20 text-center text-2xl border-blue-600 border-2">
        <footer>FOOTER</footer>
      </div>
    </div>
  );
}

export default App;
