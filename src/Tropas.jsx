import { useState } from "react";
import { useTropas } from "./useTropas";

function Tropas({ idioma }) {
  const textos = {
    pt: {
      titulo: "Tropas",
      adicionar: "Adicionar nova tropa",
      nome: "Nome da tropa",
      madeira: "Madeira",
      barro: "Barro",
      ferro: "Ferro",
      cereal: "Cereal",
      cadastrar: "Adicionar tropa",
      cadastradas: "Tropas cadastradas",
      nenhuma: "Nenhuma tropa adicionada ainda.",
      acoes: "Ações",
      apagar: "Apagar",
      calcular: "Calcular recursos",
      selecione: "Selecione uma tropa",
      quantidade: "Quantidade",
      resultado: "Resultado",
    },
    en: {
      titulo: "Troops",
      adicionar: "Add new troop",
      nome: "Troop name",
      madeira: "Wood",
      barro: "Clay",
      ferro: "Iron",
      cereal: "Crop",
      cadastrar: "Add troop",
      cadastradas: "Registered troops",
      nenhuma: "No troops added yet.",
      acoes: "Actions",
      apagar: "Delete",
      calcular: "Calculate resources",
      selecione: "Select a troop",
      quantidade: "Quantity",
      resultado: "Result",
    },
    fr: {
      titulo: "Troupes",
      adicionar: "Ajouter une nouvelle troupe",
      nome: "Nom de la troupe",
      madeira: "Bois",
      barro: "Argile",
      ferro: "Fer",
      cereal: "Céréales",
      cadastrar: "Ajouter la troupe",
      cadastradas: "Troupes enregistrées",
      nenhuma: "Aucune troupe ajoutée pour l'instant.",
      acoes: "Actions",
      apagar: "Supprimer",
      calcular: "Calculer les ressources",
      selecione: "Sélectionnez une troupe",
      quantidade: "Quantité",
      resultado: "Résultat",
    },
  };

  const t = textos[idioma];
  const { tropas, setTropas } = useTropas();
  const [nome, setNome] = useState("");
  const [custos, setCustos] = useState({ madeira: "", barro: "", ferro: "", cereal: "" });
  const [quantidade, setQuantidade] = useState("");
  const [tropaSelecionada, setTropaSelecionada] = useState("");
  const [resultado, setResultado] = useState(null);

  const adicionarTropa = () => {
    if (!nome) return;
    const nova = {
      id: Date.now(),
      nome,
      custos: {
        madeira: Number(custos.madeira) || 0,
        barro: Number(custos.barro) || 0,
        ferro: Number(custos.ferro) || 0,
        cereal: Number(custos.cereal) || 0,
      },
    };
    setTropas([...tropas, nova]);
    setNome("");
    setCustos({ madeira: "", barro: "", ferro: "", cereal: "" });
  };

  const apagarTropa = (id) => {
    setTropas(tropas.filter((t) => t.id !== id));
  };

  const calcular = () => {
    const tropa = tropas.find((t) => t.id === Number(tropaSelecionada));
    if (!tropa || !quantidade) return;
    const total = {
      madeira: tropa.custos.madeira * quantidade,
      barro: tropa.custos.barro * quantidade,
      ferro: tropa.custos.ferro * quantidade,
      cereal: tropa.custos.cereal * quantidade,
    };
    setResultado({ nome: tropa.nome, quantidade, total });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-4 overflow-x-hidden">
      <h2 className="text-3xl font-extrabold text-indigo-700">{t.titulo}</h2>

      <div className="p-6 bg-indigo-50 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-bold text-indigo-800">{t.adicionar}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder={t.nome}
            className="col-span-1 border rounded px-3 py-2"
          />
          <input
            type="number"
            value={custos.madeira}
            onChange={(e) => setCustos({ ...custos, madeira: e.target.value })}
            placeholder={t.madeira}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={custos.barro}
            onChange={(e) => setCustos({ ...custos, barro: e.target.value })}
            placeholder={t.barro}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={custos.ferro}
            onChange={(e) => setCustos({ ...custos, ferro: e.target.value })}
            placeholder={t.ferro}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={custos.cereal}
            onChange={(e) => setCustos({ ...custos, cereal: e.target.value })}
            placeholder={t.cereal}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          onClick={adicionarTropa}
          className="mt-4 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded shadow">
          {t.cadastrar}
        </button>
      </div>

      <div className="p-6 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t.cadastradas}</h3>
        {tropas.length === 0 ? (
          <p className="text-gray-500">{t.nenhuma}</p>
        ) : (
          <table className="w-full border-collapse table-fixed text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-2 py-2">{t.nome}</th>
                <th className="px-2 py-2 text-yellow-700">{t.madeira}</th>
                <th className="px-2 py-2 text-orange-700">{t.barro}</th>
                <th className="px-2 py-2 text-gray-800">{t.ferro}</th>
                <th className="px-2 py-2 text-green-700">{t.cereal}</th>
                <th className="px-2 py-2">{t.acoes}</th>
              </tr>
            </thead>
            <tbody>
              {tropas.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2 break-words">{t.nome}</td>
                  <td className="px-2 py-2 break-words">{t.custos.madeira}</td>
                  <td className="px-2 py-2 break-words">{t.custos.barro}</td>
                  <td className="px-2 py-2 break-words">{t.custos.ferro}</td>
                  <td className="px-2 py-2 break-words">{t.custos.cereal}</td>
                  <td className="px-2 py-2">
                    <button onClick={() => apagarTropa(t.id)} className="text-red-600 hover:underline">
                      {t.apagar}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-6 bg-slate-50 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-bold text-slate-800">{t.calcular}</h3>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <select
            value={tropaSelecionada}
            onChange={(e) => setTropaSelecionada(e.target.value)}
            className="border rounded px-3 py-2">
            <option value="">{t.selecione}</option>
            {tropas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder={t.quantidade}
            className="border rounded px-3 py-2"
          />

          <button onClick={calcular} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow">
            {t.calcular}
          </button>
        </div>

        {resultado && (
          <div className="mt-4 p-4 bg-white border rounded">
            <h4 className="font-bold mb-2">
              {resultado.quantidade}x {resultado.nome}
            </h4>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-yellow-700" viewBox="0 0 24 24">
                  <path d="M12 2L15 8H9l3-6zm0 20l-3-6h6l-3 6zM2 12l6-3v6l-6-3zm20 0l-6-3v6l6-3z" />
                </svg>
                {t.madeira}: {resultado.total.madeira}
              </div>
              <div className="flex items-center gap-1 text-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-orange-700" viewBox="0 0 24 24">
                  <path d="M3 9h18v6H3V9zm0 8h8v2H3v-2zm10 0h8v2h-8v-2z" />
                </svg>
                {t.barro}: {resultado.total.barro}
              </div>
              <div className="flex items-center gap-1 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-gray-800" viewBox="0 0 24 24">
                  <path d="M2 17l5-9h10l5 9H2zm3 2h14v2H5v-2z" />
                </svg>
                {t.ferro}: {resultado.total.ferro}
              </div>
              <div className="flex items-center gap-1 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-green-700" viewBox="0 0 24 24">
                  <path d="M12 2c-2 4-2 8 0 12 2-4 2-8 0-12zm0 6c-1 2-1 4 0 6 1-2 1-4 0-6zm-6 2c0 4 2 8 6 10-2-4-2-8-6-10zm12 0c-4 2-4 6-6 10 4-2 6-6 6-10z" />
                </svg>
                {t.cereal}: {resultado.total.cereal}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tropas;
