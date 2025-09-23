import { useState } from "react";
import Recursos from "./Recursos";
import Tropas from "./Tropas";

function App() {
  const [aba, setAba] = useState("recursos");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Travian Helper</h1>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setAba("recursos")}
          className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
            aba === "recursos"
              ? "bg-emerald-600 text-white border-emerald-700"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Recursos
        </button>

        <button
          onClick={() => setAba("tropas")}
          className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
            aba === "tropas"
              ? "bg-indigo-600 text-white border-indigo-700"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Tropas
        </button>
      </div>

      {aba === "recursos" && <Recursos />}
      {aba === "tropas" && <Tropas />}
    </div>
  );
}

export default App;
