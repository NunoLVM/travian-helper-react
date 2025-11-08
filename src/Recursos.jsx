import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

function Campo({ label, value, onChange, placeholder, color }) {
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-sm font-medium ${color}`}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-md border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Recursos({ idioma }) {
  const textos = {
    pt: {
      titulo: "Recursos",
      atuais: "Recursos atuais da aldeia",
      necessarios: "Recursos necessários para ação",
      calcular: "Calcular recursos em falta",
      resultado: "Resultado",
      madeira: "Madeira",
      barro: "Barro",
      ferro: "Ferro",
      cereal: "Cereal",
    },
    en: {
      titulo: "Resources",
      atuais: "Current village resources",
      necessarios: "Resources needed for action",
      calcular: "Calculate missing resources",
      resultado: "Result",
      madeira: "Wood",
      barro: "Clay",
      ferro: "Iron",
      cereal: "Crop",
    },
    fr: {
      titulo: "Ressources",
      atuais: "Ressources actuelles du village",
      necessarios: "Ressources nécessaires pour l'action",
      calcular: "Calculer les ressources manquantes",
      resultado: "Résultat",
      madeira: "Bois",
      barro: "Argile",
      ferro: "Fer",
      cereal: "Céréales",
    },
  };

  const [atuais, setAtuais] = useState({ madeira: "", barro: "", ferro: "", cereal: "" });
  const [necessarios, setNecessarios] = useState({ madeira: "", barro: "", ferro: "", cereal: "" });
  const [faltam, setFaltam] = useState(null);

  const t = textos[idioma];

  const calcularFaltam = () => {
    const resultado = {
      madeira: Math.max(0, Number(necessarios.madeira) - Number(atuais.madeira)),
      barro: Math.max(0, Number(necessarios.barro) - Number(atuais.barro)),
      ferro: Math.max(0, Number(necessarios.ferro) - Number(atuais.ferro)),
      cereal: Math.max(0, Number(necessarios.cereal) - Number(atuais.cereal)),
    };
    setFaltam(resultado);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10">
<h2 className="text-4xl font-extrabold text-green-700 animate-fade-in">{t.titulo}</h2>

<div className="rounded-lg overflow-hidden shadow-lg border animate-fade-in">
  <div className="bg-emerald-700 text-white px-6 py-3 text-xl font-bold">{t.atuais}</div>
</div>

        <div className="bg-emerald-50 px-6 py-6 grid grid-cols-4 gap-8">
          <Campo
            label={`${t.madeira} atual`}
            value={atuais.madeira}
            onChange={(v) => setAtuais({ ...atuais, madeira: v })}
            placeholder="Ex: 1200"
            color="text-yellow-700"
          />
          <Campo
            label={`${t.barro} atual`}
            value={atuais.barro}
            onChange={(v) => setAtuais({ ...atuais, barro: v })}
            placeholder="Ex: 800"
            color="text-orange-700"
          />
          <Campo
            label={`${t.ferro} atual`}
            value={atuais.ferro}
            onChange={(v) => setAtuais({ ...atuais, ferro: v })}
            placeholder="Ex: 950"
            color="text-gray-800"
          />
          <Campo
            label={`${t.cereal} atual`}
            value={atuais.cereal}
            onChange={(v) => setAtuais({ ...atuais, cereal: v })}
            placeholder="Ex: 700"
            color="text-green-700"
          />
        </div>
      </div>

{/* Bloco: necessários */}
<div className="rounded-lg overflow-hidden shadow-lg border animate-fade-in">
  <div className="bg-emerald-700 text-white px-6 py-3 text-xl font-bold">
    {t.necessarios}
  </div>
</div>

        <div className="bg-indigo-50 px-6 py-6 grid grid-cols-4 gap-8">
          <Campo
            label={`${t.madeira} necessária`}
            value={necessarios.madeira}
            onChange={(v) => setNecessarios({ ...necessarios, madeira: v })}
            placeholder="Ex: 2000"
            color="text-yellow-700"
          />
          <Campo
            label={`${t.barro} necessário`}
            value={necessarios.barro}
            onChange={(v) => setNecessarios({ ...necessarios, barro: v })}
            placeholder="Ex: 1500"
            color="text-orange-700"
          />
          <Campo
            label={`${t.ferro} necessário`}
            value={necessarios.ferro}
            onChange={(v) => setNecessarios({ ...necessarios, ferro: v })}
            placeholder="Ex: 1800"
            color="text-gray-800"
          />
          <Campo
            label={`${t.cereal} necessário`}
            value={necessarios.cereal}
            onChange={(v) => setNecessarios({ ...necessarios, cereal: v })}
            placeholder="Ex: 1200"
            color="text-green-700"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={calcularFaltam}
          className="flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl transition">
          <FaCalculator />
          {t.calcular}
        </button>
      </div>

      {faltam && (
<div className="rounded-lg overflow-hidden shadow-md border animate-fade-in">
  <div className="bg-slate-700 text-white px-6 py-3 text-lg font-bold">{t.resultado}</div>

          <div className="bg-slate-50 px-6 py-6 grid grid-cols-2 gap-6 text-lg">
            <div>
              <span className="text-yellow-700 font-bold">{t.madeira}:</span> {faltam.madeira}
            </div>
            <div>
              <span className="text-orange-700 font-bold">{t.barro}:</span> {faltam.barro}
            </div>
            <div>
              <span className="text-gray-800 font-bold">{t.ferro}:</span> {faltam.ferro}
            </div>
            <div>
              <span className="text-green-700 font-bold">{t.cereal}:</span> {faltam.cereal}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recursos;
