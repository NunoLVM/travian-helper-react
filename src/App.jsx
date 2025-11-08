import { useState } from "react";
import Recursos from "./Recursos";
import Tropas from "./Tropas";
import Relogio from "./Relogio";
import Footer from "./Footer";
import ZerarStocks from "./ZerarStocks"; // ✅ Adicionado

function App() {
  const [aba, setAba] = useState("recursos");
  const [idioma, setIdioma] = useState("pt");

  const textos = {
    pt: {
      titulo: "Ajudante Travian",
      recursos: "Recursos",
      tropas: "Tropas",
      zerar: "Zerar Stocks", // ✅ Adicionado
    },
    en: {
      titulo: "Travian Helper",
      recursos: "Resources",
      tropas: "Troops",
      zerar: "Zero Stocks", // ✅ Adicionado
    },
    fr: {
      titulo: "Assistant Travian",
      recursos: "Ressources",
      tropas: "Troupes",
      zerar: "Vider les stocks", // ✅ Adicionado
    },
  };

  const idiomasDisponiveis = [
    { code: "pt", label: "PT", src: "/flags/pt.svg" },
    { code: "en", label: "EN", src: "/flags/gb.svg" },
    { code: "fr", label: "FR", src: "/flags/fr.svg" },
  ];

  return (
    <div className="relative min-h-screen bg-travian overflow-x-hidden">
      {/* Seletor de idioma fixo no canto superior direito */}
      <div className="fixed top-4 right-4 flex gap-6 z-20">
        {idiomasDisponiveis.map(({ code, label, src }) => (
          <button
            key={code}
            onClick={() => setIdioma(code)}
            className={`flex flex-col items-center px-2 py-2 rounded-md border transition duration-200 ease-in-out ${
              idioma === code
                ? "bg-blue-600 text-white border-blue-700 shadow-lg"
                : "bg-transparent text-gray-800 border-gray-400 shadow-md hover:border-blue-500 hover:shadow-lg"
            }`}>
            <img src={src} alt={label} className="w-6 h-4 object-cover rounded-sm mb-1" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Relógios fixos no canto superior esquerdo — visíveis apenas em lg+ */}
      <div className="fixed top-4 left-4 lg:flex flex-col gap-2 max-h-[90vh] overflow-y-auto w-[180px] hidden z-10">
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
      <div className="p-6 max-w-3xl mx-auto pt-32 pb-24 z-0">
        {/* Título do site centrado */}
        <h1
          className={`text-center text-3xl font-bold mb-8 transition-colors duration-300 ${
            idioma === "pt" ? "text-blue-700" : idioma === "en" ? "text-indigo-700" : "text-green-700"
          }`}>
          {textos[idioma].titulo}
        </h1>
        <p className="text-center text-xs text-red-500 mb-4 sm:hidden">
          ⚠️ Esta ferramenta não está otimizada para telemóvel.
        </p>

        {/* Botões de navegação */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 w-full max-w-full">
          <button
            onClick={() => setAba("recursos")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "recursos"
                ? "bg-emerald-600 text-white border-emerald-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}>
            {textos[idioma].recursos}
          </button>

          <button
            onClick={() => setAba("tropas")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "tropas"
                ? "bg-indigo-600 text-white border-indigo-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}>
            {textos[idioma].tropas}
          </button>

          {/* ✅ Botão novo */}
          <button
            onClick={() => setAba("zerar")}
            className={`px-6 py-3 rounded-full text-sm font-bold shadow border transition ${
              aba === "zerar"
                ? "bg-red-600 text-white border-red-700"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}>
            {textos[idioma].zerar}
          </button>
        </div>

        {/* Conteúdo das abas */}
        {aba === "recursos" && <Recursos idioma={idioma} />}
        {aba === "tropas" && <Tropas idioma={idioma} />}
        {aba === "zerar" && <ZerarStocks idioma={idioma} />} {/* ✅ Conteúdo novo */}
      </div>

      {/* Footer fixo no fundo */}
      <Footer idioma={idioma} />
    </div>
  );
}

export default App;
