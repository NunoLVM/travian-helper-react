import AboutModal from "./AboutModal";
import LegalModal from "./LegalModal";
import ContactModal from "./ContactModal";

const Footer = ({ idioma }) => {
  const ano = new Date().getFullYear();

  const textos = {
    pt: `© ${ano} Nuno António — Ferramenta pessoal criada como jogador de Travian.`,
    en: `© ${ano} Nuno António — Personal tool built as a Travian player.`,
    fr: `© ${ano} Nuno António — Outil personnel créé en tant que joueur de Travian.`,
  };

  const linkContacto = idioma === "pt" ? "Contactar-me" : idioma === "fr" ? "Me contacter" : "Contact me";

  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 text-center text-xs text-gray-500 bg-white border-t border-gray-200 z-50">
      <p className="mb-1">{textos[idioma]}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <AboutModal idioma={idioma} />
        <span>|</span>
        <LegalModal idioma={idioma} />
        <span>|</span>
        <ContactModal idioma={idioma} />
      </div>
    </footer>
  );
};

export default Footer;
