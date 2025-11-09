import { useState } from "react";
import Recursos from "./Recursos";
import Tropas from "./Tropas";
import Relogio from "./Relogio";
import Footer from "./Footer";
import ZerarStocks from "./ZerarStocks";

function App() {
  const [aba, setAba] = useState("recursos");
  const [idioma, setIdioma] = useState("pt");

  const textos = {
    pt: {
      titulo: "Ajudante Travian",
      recursos: "Recursos",
      tropas: "Tropas",
      zerar: "Zerar Stocks",
    },
    en: {
      titulo: "Travian Helper",
      recursos: "Resources",
      tropas: "Troops",
      zerar: "Zero Stocks",
    },
    fr: {
      titulo: "Assistant Travian",
      recursos: "Ressources",
      tropas: "Troupes",
      zerar: "Vider les stocks",
    },
  };

  const idiomasDisponiveis = [
    { code: "pt", label: "PT", src: "/flags/pt.svg" },
    { code: "en", label: "EN", src: "/flags/gb.svg" },
    { code: "fr", label: "FR", src: "/flags/fr.svg" },
  ];

  const cidadeLocal = "Lisbon";

  const cidades = [
    { cidade: "Lisbon", timeZone: "Europe/Lisbon", codigo: "pt" },
    { cidade: "Prague", timeZone: "Europe/Prague", codigo: "cz" },
    { cidade: "Paris", timeZone: "Europe/Paris", codigo: "fr" },
    { cidade: "New York", timeZone: "America/New_York", codigo: "us" },
    { cidade: "São Paulo", timeZone: "America/Sao_Paulo", codigo: "br" },
    { cidade: "London", timeZone: "Europe/London", codigo: "gb" },
    { cidade: "Tokyo", timeZone: "Asia/Tokyo", codigo: "jp" },
    { cidade: "Sydney", timeZone: "Australia/Sydney", codigo: "au" },
    { cidade: "Dubai", timeZone: "Asia/Dubai", codigo: "ae" },
  ];

  const cidadesOrdenadas = [...cidades].sort((a, b) => {
    const horaA = Number(
      new Date().toLocaleTimeString("en-GB", {
        timeZone: a.timeZone,
        hour: "2-digit",
        hour12: false,
      })
    );
    const horaB = Number(
      new Date().toLocaleTimeString("en-GB", {
        timeZone: b.timeZone,
        hour: "2-digit",
        hour12: false,
      })
    );
    return horaA - horaB;
  });

  return (
    <div className="relative min-h-screen bg-travian overflow-x-hidden">
      {/* Header fixo com título */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-6 py-2 rounded-md shadow-md border">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold transition-colors duration-300 ${
            aba === "recursos"
              ? "text-emerald-700"
              : aba === "tropas"
              ? "text-indigo-700"
              : "text-red-700"
          }`}
        >
          {textos[idioma].titulo}
        </h1>
      </header>

      {/* Seletor de idioma */}
      <div className="fixed top-4 right-4 flex gap-6 z-20">
        {idiomasDisponiveis.map(({ code, label, src }) => (
          <button
            key={code}
            onClick={() => setIdioma(code)}
            className={`flex flex-col items-center px-2 py-2 rounded-md border transition duration-200 ease-in-out ${
              idioma === code
                ? "bg-blue-600 text-white border-blue-700 shadow-lg"
                : "bg-transparent text-gray-800 border-gray-400 shadow-md hover:border-blue-500 hover:shadow-lg"
            }`}
          >
            <img
              src={src}
              alt={label}
              className="w-6 h-4 object-cover rounded-sm mb-1"
            />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Painel de relógios */}
      <div className="fixed top-4 left-4 lg:flex flex-col gap-2 max-h-[90vh] overflow-y-auto w-[180px] hidden z-10">
        {cidadesOrdenadas.map((c) => (
          <Relogio
            key={c.cidade}
            cidade={c.cidade}
            timeZone={c.timeZone}
            codigo={c.codigo}
            cidadeLocal={cidadeLocal}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="p-6 max-w-3xl mx-auto pt-40 pb-24 z-0">
        <p className="text-center text-xs text-red-500 mb-4 sm:hidden">
          ⚠️ Esta ferramenta não está otimizada para telemóvel.
        </p>

        {/* Navegação */}
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

          <button
            onClick={() => setAba("zerar")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "zerar"
                ? "bg-red-600 text-white border-red-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {textos[idioma].zerar}
          </button>
        </div>

        {/* Abas */}
        {aba === "recursos" && <Recursos idioma={idioma} />}
        {aba === "tropas" && <Tropas idioma={idioma} />}
        {aba === "zerar" && <ZerarStocks idioma={idioma} />}
      </div>

      {/* Rodapé */}
      <Footer idioma={idioma} />
    </div>
  );
}

export default App;
