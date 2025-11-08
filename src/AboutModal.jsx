import { useState, useEffect } from "react";

const AboutModal = ({ idioma }) => {
  const [aberto, setAberto] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animacao, setAnimacao] = useState("");

  const textos = {
    pt: {
      titulo: "Sobre o projeto",
      conteudo: `Ferramenta criada por Nuno António como jogador de Travian. Permite gerir tropas e recursos, calcular custos de treino e guardar tudo no navegador com localStorage.\n\nFeita com React + Vite + TailwindCSS, e hospedada gratuitamente no Vercel.`,
      botao: "Sobre",
      fechar: "Fechar",
      link: "Ver README no GitHub",
    },
    en: {
      titulo: "About the project",
      conteudo: `Tool created by Nuno António as a Travian player. It helps manage troops and resources, calculate training costs, and store everything locally using localStorage.\n\nBuilt with React + Vite + TailwindCSS, and hosted for free on Vercel.`,
      botao: "About",
      fechar: "Close",
      link: "View README on GitHub",
    },
    fr: {
      titulo: "À propos du projet",
      conteudo: `Outil créé par Nuno António en tant que joueur de Travian. Il permet de gérer les troupes et les ressources, de calculer les coûts d'entraînement et de tout sauvegarder localement via localStorage.\n\nDéveloppé avec React + Vite + TailwindCSS, et hébergé gratuitement sur Vercel.`,
      botao: "À propos",
      fermer: "Fermer",
      link: "Voir le README sur GitHub",
    },
  };

  const links = {
    pt: "https://github.com/NunoLVM/travian-helper-react/blob/main/README.md",
    en: "https://github.com/NunoLVM/travian-helper-react/blob/main/README.en.md",
    fr: "https://github.com/NunoLVM/travian-helper-react/blob/main/README.fr.md",
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
      <button onClick={abrirModal} className="text-xs text-blue-600 hover:underline">
        {textos[idioma].botao}
      </button>

      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white max-w-md w-full p-6 rounded shadow-lg text-sm text-gray-800 ${animacao}`}>
            <h2 className="text-lg font-bold mb-4">{textos[idioma].titulo}</h2>
            <p className="mb-6 whitespace-pre-line">{textos[idioma].conteudo}</p>
            <div className="flex flex-col items-center">
              <a
                href={links[idioma]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-black text-white border border-gray-800 rounded hover:bg-gray-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.996.107-.775.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.922.43.37.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {textos[idioma].link}
              </a>
              <button onClick={fecharModal} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {idioma === "fr" ? textos.fr.fermer : textos[idioma].fechar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutModal;
