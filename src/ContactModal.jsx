import { useState, useEffect } from "react";

const ContactModal = ({ idioma }) => {
  const [aberto, setAberto] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animacao, setAnimacao] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [erros, setErros] = useState({});
  const [contador, setContador] = useState(5);
  const [aEnviar, setAEnviar] = useState(false);

  const textos = {
    pt: {
      abrir: "Contactar",
      titulo: "Fala comigo",
      nome: "Nome",
      email: "Email",
      mensagem: "Mensagem",
      enviar: "Enviar",
      aEnviar: "A enviar…",
      fechar: "Fechar",
      sucesso: "Mensagem enviada com sucesso!",
      erroEmail: "Email inválido.",
      erroCampos: "Preenche todos os campos.",
      contador: "Fecha em",
      caracteres: "caracteres",
    },
    en: {
      abrir: "Contact",
      titulo: "Get in touch",
      nome: "Name",
      email: "Email",
      mensagem: "Message",
      enviar: "Send",
      aEnviar: "Sending…",
      fechar: "Close",
      sucesso: "Message sent successfully!",
      erroEmail: "Invalid email.",
      erroCampos: "Please fill in all fields.",
      contador: "Closes in",
      caracteres: "characters",
    },
    fr: {
      abrir: "Contact",
      titulo: "Me contacter",
      nome: "Nom",
      email: "Email",
      mensagem: "Message",
      envoyer: "Envoyer",
      aEnvoyer: "Envoi…",
      fermer: "Fermer",
      succes: "Message envoyé avec succès !",
      erreurEmail: "Email invalide.",
      erreurChamps: "Veuillez remplir tous les champs.",
      compteur: "Fermeture dans",
      caracteres: "caractères",
    },
  };

  const abrirModal = () => {
    setIsVisible(true);
    setAnimacao("animate-fade-in");
    setAberto(true);
    setEnviado(false);
    setFormData({ nome: "", email: "", mensagem: "" });
    setErros({});
    setContador(5);
    setAEnviar(false);
  };

  const fecharModal = () => {
    setAnimacao("animate-fade-out");
    setTimeout(() => {
      setAberto(false);
      setIsVisible(false);
    }, 400);
  };

  const endpoint = "https://formspree.io/f/xnngkdob";

  const validar = () => {
    const novosErros = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome || !formData.email || !formData.mensagem) {
      novosErros.campos = true;
    }
    if (!emailRegex.test(formData.email)) {
      novosErros.email = true;
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setAEnviar(true);

    const form = new FormData();
    form.append("email", formData.email);
    form.append("message", formData.mensagem);
    form.append("name", formData.nome);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: form,
      });

      const texto = await res.text();
      console.log("Resposta do Formspree:", texto);

      if (res.ok && texto.includes("form submitted")) {
        setEnviado(true);
      } else {
        alert("Erro ao enviar. Tenta mais tarde.");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      alert("Erro de rede. Tenta mais tarde.");
    } finally {
      setAEnviar(false);
    }
  };

  useEffect(() => {
    if (enviado && contador > 0) {
      const timer = setTimeout(() => setContador(contador - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (enviado && contador === 0) {
      fecharModal();
    }
  }, [enviado, contador]);

  return (
    <>
      <button onClick={abrirModal} className="text-blue-600 hover:underline text-xs">
        {textos[idioma].abrir}
      </button>

      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white max-w-md w-full p-6 rounded shadow-lg text-sm text-gray-800 relative ${animacao}`}>
            <h2 className="text-lg font-bold mb-4">{textos[idioma].titulo}</h2>

            {enviado ? (
              <div className="text-center">
                <button
                  onClick={fecharModal}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl">
                  ×
                </button>
                <p className="mb-4 text-green-600 font-medium">{textos[idioma].sucesso}</p>
                <p className="text-xs text-gray-500">
                  {idioma === "fr"
                    ? `${textos.fr.compteur} ${contador} s…`
                    : idioma === "en"
                    ? `${textos.en.contador} ${contador}s…`
                    : `${textos.pt.contador} ${contador}s…`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="nome"
                  placeholder={textos[idioma].nome}
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className={`border px-3 py-2 rounded ${erros.campos ? "border-red-500" : ""}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={textos[idioma].email}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`border px-3 py-2 rounded ${erros.email ? "border-red-500" : ""}`}
                />
                <textarea
                  name="mensagem"
                  placeholder={textos[idioma].mensagem}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  rows="4"
                  maxLength={1000}
                  className={`border px-3 py-2 rounded resize-none ${erros.campos ? "border-red-500" : ""}`}
                />
                <p className="text-xs text-gray-500 text-right">
                  {formData.mensagem.length}/1000{" "}
                  {idioma === "fr"
                    ? textos.fr.caracteres
                    : idioma === "en"
                    ? textos.en.caracteres
                    : textos.pt.caracteres}
                </p>
                {erros.campos && (
                  <p className="text-red-500 text-xs">
                    {idioma === "fr"
                      ? textos.fr.erreurChamps
                      : idioma === "en"
                      ? textos.en.erroCampos
                      : textos.pt.erroCampos}
                  </p>
                )}
                {erros.email && (
                  <p className="text-red-500 text-xs">
                    {idioma === "fr"
                      ? textos.fr.erreurEmail
                      : idioma === "en"
                      ? textos.en.erroEmail
                      : textos.pt.erroEmail}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={aEnviar}
                  className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                    aEnviar ? "opacity-50 cursor-not-allowed" : ""
                  }`}>
                  {aEnviar
                    ? idioma === "fr"
                      ? textos.fr.aEnvoyer
                      : idioma === "en"
                      ? textos.en.aEnviar
                      : textos.pt.aEnviar
                    : idioma === "fr"
                    ? textos.fr.envoyer
                    : idioma === "en"
                    ? textos.en.enviar
                    : textos.pt.enviar}
                </button>
              </form>
            )}

            {!enviado && (
              <button
                onClick={fecharModal}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                {idioma === "fr" ? textos.fr.fermer : idioma === "en" ? textos.en.fechar : textos.pt.fechar}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
