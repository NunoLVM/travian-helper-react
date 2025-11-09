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
      cereal: "Céréale",
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

  const t = Object.prototype.hasOwnProperty.call(textos, idioma)
    ? textos[idioma]
    : textos["pt"];

  const { tropas, setTropas } = useTropas();
  const [nome, setNome] = useState("");
  const [custos, setCustos] = useState({
    madeira: "",
    barro: "",
    ferro: "",
    cereal: "",
  });
  const [quantidade, setQuantidade] = useState("");
  const [tropaSelecionada, setTropaSelecionada] = useState("");
  const [resultado, setResultado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(null);

  const adicionarTropa = () => {
    if (!nome) return;

    if (modoEdicao) {
      const atualizadas = tropas.map((t) =>
        t.id === modoEdicao
          ? {
              ...t,
              nome,
              custos: {
                madeira: Number(custos.madeira) || 0,
                barro: Number(custos.barro) || 0,
                ferro: Number(custos.ferro) || 0,
                cereal: Number(custos.cereal) || 0,
              },
            }
          : t
      );
      setTropas(atualizadas);
      setModoEdicao(null);
    } else {
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
    }

    setNome("");
    setCustos({ madeira: "", barro: "", ferro: "", cereal: "" });
  };

  const apagarTropa = (id) => {
    setTropas(tropas.filter((t) => t.id !== id));
  };

  const editarTropa = (id) => {
    const tropa = tropas.find((t) => t.id === id);
    if (!tropa) return;
    setNome(tropa.nome);
    setCustos(tropa.custos);
    setModoEdicao(id);
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
      <h2 className="text-3xl font-extrabold text-indigo-700 animate-fade-in">
        {t.titulo}
      </h2>

      {/* Formulário de cadastro */}
      <div className="p-6 bg-indigo-50 rounded-lg shadow-md space-y-4 animate-fade-in">
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
          className="mt-4 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded shadow"
        >
          {t.cadastrar}
        </button>
      </div>

      {/* Lista de tropas */}
      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-indigo-700 animate-fade-in">
          {t.cadastradas}
        </h2>

        {tropas.length === 0 ? (
          <p className="text-gray-500">{t.nenhuma}</p>
        ) : (
          <table className="w-full border-collapse table-fixed text-sm bg-white rounded shadow">
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
                <tr key={t.id} className="border-b hover:bg-indigo-50">
                  <td className="px-2 py-2 break-words">{t.nome}</td>
                  <td className="px-2 py-2 break-words">{t.custos.madeira}</td>
                  <td className="px-2 py-2 break-words">{t.custos.barro}</td>
                  <td className="px-2 py-2 break-words">{t.custos.ferro}</td>
                  <td className="px-2 py-2 break-words">{t.custos.cereal}</td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editarTropa(t.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => apagarTropa(t.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Cálculo */}
      <div className="p-6 bg-slate-50 rounded-lg shadow-md space-y-4 animate-fade-in">
        <h3 className="text-xl font-bold text-slate-800">{t.calcular}</h3>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <select
            value={tropaSelecionada}
            onChange={(e) => setTropaSelecionada(e.target.value)}
            className="border rounded px-3 py-2"
          >
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

          <button
            onClick={calcular}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow"
          >
            {t.calcular}
          </button>
        </div>
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="mt-4 p-4 bg-white border rounded">
          <h4 className="font-bold mb-2">
            {resultado.quantidade}x {resultado.nome}
          </h4>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-700">
              {t.madeira}: {resultado.total.madeira}
            </div>
            <div className="flex items-center gap-1 text-orange-700">
              {t.barro}: {resultado.total.barro}
            </div>
            <div className="flex items-center gap-1 text-gray-800">
              {t.ferro}: {resultado.total.ferro}
            </div>
            <div className="flex items-center gap-1 text-green-700">
              {t.cereal}: {resultado.total.cereal}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tropas;
