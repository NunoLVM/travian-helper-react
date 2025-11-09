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
    <footer className="w-full bg-white border-t shadow-sm px-4 py-4 mt-12">
      <div className="max-w-6xl mx-auto text-center text-xs text-gray-500">
        <p className="mb-2">{textos[idioma]}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <AboutModal idioma={idioma} />
          <span>|</span>
          <LegalModal idioma={idioma} />
          <span>|</span>
          <ContactModal idioma={idioma} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
