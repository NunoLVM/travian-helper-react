import { useEffect, useState } from "react";

export default function Relogio({ cidade, timeZone }) {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      const formatada = agora.toLocaleTimeString("pt-PT", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setHora(formatada);
    };

    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, [timeZone]);

  return (
    <div className="bg-white rounded-md shadow p-2 text-center text-gray-800 dark:bg-gray-800 dark:text-gray-100 transition-colors text-sm">
      <h3 className="font-semibold">{cidade}</h3>
      <p className="text-base" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{hora}</p>
    </div>
  );
}
