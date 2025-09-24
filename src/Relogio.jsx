import { useEffect, useState } from "react";

export default function Relogio({ cidade, offset }) {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const atualizarHora = () => {
      const utc = new Date();
      const local = new Date(utc.getTime() + offset * 60 * 60 * 1000);
      setHora(local.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }));
    };

    atualizarHora();
    const intervalo = setInterval(atualizarHora, 60000);
    return () => clearInterval(intervalo);
  }, [offset]);

  return (
    <div className="bg-white rounded-md shadow p-2 text-center text-gray-800 dark:bg-gray-800 dark:text-gray-100 transition-colors text-sm">
      <h3 className="font-semibold">{cidade}</h3>
      <p className="font-mono text-base">{hora}</p>
    </div>
  );
}
