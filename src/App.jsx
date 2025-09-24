import { useState } from "react";
import Recursos from "./Recursos";
import Tropas from "./Tropas";
import Relogio from "./Relogio";

function App() {
  const [aba, setAba] = useState("recursos");

  return (
    <div className="relative min-h-screen bg-travian">
      {/* Relógios no topo esquerdo */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 max-h-[90vh] overflow-y-auto w-[180px]">
        <Relogio cidade="Lisboa" offset={0} />
        <Relogio cidade="Nova Iorque" offset={-4} />
        <Relogio cidade="São Paulo" offset={-3} />
        <Relogio cidade="Londres" offset={1} />
        <Relogio cidade="Paris" offset={2} />
        <Relogio cidade="Tóquio" offset={9} />
        <Relogio cidade="Sydney" offset={10} />
        <Relogio cidade="Dubai" offset={4} />
      </div>

      {/* Conteúdo principal */}
      <div className="p-6 max-w-3xl mx-auto pt-32">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Travian Helper
        </h1>

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
    </div>
  );
}

export default App;
