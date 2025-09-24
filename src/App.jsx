import { useState } from "react";
import Recursos from "./Recursos";
import Tropas from "./Tropas";
import Relogio from "./Relogio";

function App() {
  const [aba, setAba] = useState("recursos");
  const [idioma, setIdioma] = useState("pt");

  const textos = {
    pt: {
      titulo: "Travian Helper",
      recursos: "Recursos",
      tropas: "Tropas",
    },
    en: {
      titulo: "Travian Helper",
      recursos: "Resources",
      tropas: "Troops",
    },
    fr: {
      titulo: "Assistant Travian",
      recursos: "Ressources",
      tropas: "Troupes",
    },
  };

  const idiomasDisponiveis = [
    { code: "pt", label: "Português", src: "/flags/pt.svg" },
    { code: "en", label: "English", src: "/flags/gb.svg" },
    { code: "fr", label: "Français", src: "/flags/fr.svg" },
  ];

  return (
    <div className="relative min-h-screen bg-travian overflow-x-hidden">
      {/* Relógios no topo esquerdo — visíveis apenas em lg+ */}
      <div className="absolute top-4 left-4 lg:flex flex-col gap-2 max-h-[90vh] overflow-y-auto w-[180px] hidden z-10">
        <Relogio cidade="Lisboa" timeZone="Europe/Lisbon" />
        <Relogio cidade="Paris" timeZone="Europe/Paris" />
        <Relogio cidade="Nova Iorque" timeZone="America/New_York" />
        <Relogio cidade="São Paulo" timeZone="America/Sao_Paulo" />
        <Relogio cidade="Londres" timeZone="Europe/London" />
        <Relogio cidade="Tóquio" timeZone="Asia/Tokyo" />
        <Relogio cidade="Sydney" timeZone="Australia/Sydney" />
        <Relogio cidade="Dubai" timeZone="Asia/Dubai" />
      </div>

      {/* Conteúdo principal */}
      <div className="p-6 max-w-3xl mx-auto pt-32 z-0">
        {/* Toggle de idioma com bandeiras SVG compactas */}
        <div className="flex justify-center gap-3 mb-6">
          {idiomasDisponiveis.map(({ code, label, src }) => (
            <button
              key={code}
              onClick={() => setIdioma(code)}
              className={`flex flex-col items-center px-2 py-2 rounded-md shadow-sm transition border ${
                idioma === code
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <img src={src} alt={label} className="w-6 h-4 object-cover rounded-sm mb-1" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          {textos[idioma].titulo}
        </h1>

        {/* Botões de navegação */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 w-full max-w-full">
          <button
            onClick={() => setAba("recursos")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "recursos"
                ? "bg-emerald-600 text-white border-emerald-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {textos[idioma].recursos}
          </button>

          <button
            onClick={() => setAba("tropas")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "tropas"
                ? "bg-indigo-600 text-white border-indigo-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {textos[idioma].tropas}
          </button>
        </div>

        {/* Conteúdo das abas */}
        {aba === "recursos" && <Recursos idioma={idioma} />}
        {aba === "tropas" && <Tropas idioma={idioma} />}
      </div>
    </div>
  );
}

export default App;

