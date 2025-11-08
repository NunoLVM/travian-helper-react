import { useTropas } from "./useTropas";
import { useState } from "react";

function ZerarStocks({ idioma }) {
  const { tropas } = useTropas();
  const [tropaSelecionada, setTropaSelecionada] = useState("");
  const [stock, setStock] = useState({ madeira: "", barro: "", ferro: "" });

  const textos = {
    pt: {
      titulo: "Zerar Stocks",
      selecione: "Selecione uma tropa",
      madeira: "Madeira",
      barro: "Barro",
      ferro: "Ferro",
      resultado: "Recursos em falta para zerar",
      limpar: "Limpar",
    },
    en: {
      titulo: "Zero Stocks",
      selecione: "Select a troop",
      madeira: "Wood",
      barro: "Clay",
      ferro: "Iron",
      resultado: "Missing resources to zero out",
      limpar: "Clear",
    },
    fr: {
      titulo: "Vider les stocks",
      selecione: "Sélectionnez une troupe",
      madeira: "Bois",
      barro: "Argile",
      ferro: "Fer",
      resultado: "Ressources manquantes pour vider",
      limpar: "Effacer",
    },
  };

  const t = textos[idioma] || textos.pt;
  const tropa = tropas.find((t) => t.id === Number(tropaSelecionada));

  const tropasPossiveis = tropa
    ? Math.max(
        Math.floor(Number(stock.madeira) / tropa.custos.madeira),
        Math.floor(Number(stock.barro) / tropa.custos.barro),
        Math.floor(Number(stock.ferro) / tropa.custos.ferro)
      )
    : 0;

  const totalNecessario = tropa
    ? {
        madeira: tropasPossiveis * tropa.custos.madeira,
        barro: tropasPossiveis * tropa.custos.barro,
        ferro: tropasPossiveis * tropa.custos.ferro,
      }
    : { madeira: 0, barro: 0, ferro: 0 };

  const faltam = {
    madeira: Math.max(0, totalNecessario.madeira - Number(stock.madeira)),
    barro: Math.max(0, totalNecessario.barro - Number(stock.barro)),
    ferro: Math.max(0, totalNecessario.ferro - Number(stock.ferro)),
  };

  const limpar = () => {
    setTropaSelecionada("");
    setStock({ madeira: "", barro: "", ferro: "" });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
      <h2 className="text-4xl font-extrabold text-red-700 animate-fade-in">
        {t.titulo}
      </h2>

      {/* Seleção de tropa */}
      <div className="space-y-4 animate-fade-in">
        <select
          value={tropaSelecionada}
          onChange={(e) => setTropaSelecionada(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-sm mx-auto"
        >
          <option value="">{t.selecione}</option>
          {tropas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Inputs de stock atual */}
      <div className="grid grid-cols-3 gap-6 mt-6 animate-fade-in">
        {["madeira", "barro", "ferro"].map((r) => (
          <div key={r} className="flex flex-col gap-1">
            <label className="text-sm font-medium capitalize text-gray-700">
              {t[r]}
            </label>
            <input
              type="number"
              value={stock[r]}
              onChange={(e) => setStock({ ...stock, [r]: e.target.value })}
              placeholder={`Stock de ${t[r]}`}
              className="w-full h-12 px-4 rounded-md border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Botão limpar */}
      <div className="flex justify-center mt-4 animate-fade-in">
        <button
          onClick={limpar}
          className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-6 py-2 rounded-full shadow transition"
        >
          🧹 {t.limpar}
        </button>
      </div>

      {/* Resultado */}
      {tropaSelecionada && (
        <div className="mt-6 rounded-lg overflow-hidden shadow-md border animate-fade-in">
          <div className="bg-red-700 text-white px-6 py-3 text-lg font-bold">
            {t.resultado}
          </div>
          <div className="bg-red-50 px-6 py-6 grid grid-cols-3 gap-6 text-lg">
            <div>
              <span className="text-yellow-700 font-bold">{t.madeira}:</span> {faltam.madeira}
            </div>
            <div>
              <span className="text-orange-700 font-bold">{t.barro}:</span> {faltam.barro}
            </div>
            <div>
              <span className="text-gray-800 font-bold">{t.ferro}:</span> {faltam.ferro}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZerarStocks;
