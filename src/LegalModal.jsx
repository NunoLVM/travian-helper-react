import { useState } from "react";

const LegalModal = ({ idioma }) => {
  const [aberto, setAberto] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animacao, setAnimacao] = useState("");

  const textos = {
    pt: {
      titulo: "Informações legais",
      conteudo: `Esta ferramenta foi criada por Nuno António como jogador de Travian. Não tem qualquer afiliação com Travian Games GmbH. “Travian” é uma marca registada dos seus respetivos proprietários. Este projeto é open-source e está sob a licença MIT.`,
      abrir: "Informações legais",
      fechar: "Fechar",
    },
    en: {
      titulo: "Legal information",
      conteudo: `This tool was created by Nuno António as a Travian player. It is not affiliated with Travian Games GmbH. “Travian” is a registered trademark of its respective owners. This project is open-source and licensed under MIT.`,
      abrir: "Legal info",
      fechar: "Close",
    },
    fr: {
      titulo: "Mentions légales",
      conteudo: `Cet outil a été créé par Nuno António en tant que joueur de Travian. Il n'est pas affilié à Travian Games GmbH. “Travian” est une marque déposée de ses propriétaires respectifs. Ce projet est open-source et sous licence MIT.`,
      abrir: "Mentions légales",
      fermer: "Fermer",
    },
  };

  const abrirModal = () => {
    setIsVisible(true);
    setAnimacao("animate-fade-in");
    setAberto(true);
  };

  const fecharModal = () => {
    setAnimacao("animate-fade-out");
    setTimeout(() => {
      setAberto(false);
      setIsVisible(false);
    }, 400); // igual à duração do fadeOutZoom
  };

  return (
    <>
      <button onClick={abrirModal} className="text-blue-600 hover:underline text-xs">
        {textos[idioma].abrir}
      </button>

      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white max-w-md w-full p-6 rounded shadow-lg text-sm text-gray-800 ${animacao}`}>
            <h2 className="text-lg font-bold mb-4">{textos[idioma].titulo}</h2>
            <p className="mb-6 whitespace-pre-line">{textos[idioma].conteudo}</p>
            <button onClick={fecharModal} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {idioma === "fr" ? textos.fr.fermer : textos[idioma].fechar}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LegalModal;
