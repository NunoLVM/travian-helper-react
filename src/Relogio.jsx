import { useEffect, useState } from "react";

export default function Relogio({ cidade, timeZone, codigo, cidadeLocal }) {
  const [hora, setHora] = useState("");
  const [data, setData] = useState("");
  const [icone, setIcone] = useState("🌞");
  const [abreviacao, setAbreviacao] = useState("");
  const [offset, setOffset] = useState("");

  const siglasOficiais = {
    "Europe/Lisbon": "WET",
    "Europe/London": "GMT",
    "Europe/Paris": "CET",
    "Europe/Prague": "CET",
    "Asia/Dubai": "GST",
    "Asia/Tokyo": "JST",
    "Australia/Sydney": "AEDT",
    "America/New_York": "EST",
    "America/Sao_Paulo": "BRT",
  };

  useEffect(() => {
    const atualizarTempo = () => {
      const agora = new Date();

      const horaFormatada = agora.toLocaleTimeString("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const dataFormatada = agora.toLocaleDateString("en-GB", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const horaNum = Number(
        agora.toLocaleTimeString("en-GB", {
          timeZone,
          hour: "2-digit",
          hour12: false,
        })
      );

      const agoraUTC = Date.UTC(
        agora.getUTCFullYear(),
        agora.getUTCMonth(),
        agora.getUTCDate(),
        agora.getUTCHours(),
        agora.getUTCMinutes(),
        agora.getUTCSeconds()
      );

      const tzDate = new Date(agora.toLocaleString("en-US", { timeZone }));
      const tzLocal = tzDate.getTime();
      const tzOffsetMin = Math.round((tzLocal - agoraUTC) / 60000);
      const sign = tzOffsetMin >= 0 ? "+" : "-";
      const hours = Math.floor(Math.abs(tzOffsetMin) / 60);
      const minutes = Math.abs(tzOffsetMin) % 60;
      const formattedOffset = `UTC${sign}${hours}${minutes !== 0 ? `:${minutes.toString().padStart(2, "0")}` : ""}`;
      setOffset(formattedOffset);

      setAbreviacao(siglasOficiais[timeZone] || "—");
      setIcone(horaNum >= 6 && horaNum < 18 ? "🌞" : "🌙");
      setHora(horaFormatada);
      setData(dataFormatada);
    };

    atualizarTempo();
    const intervalo = setInterval(atualizarTempo, 1000);
    return () => clearInterval(intervalo);
  }, [timeZone]);

  const destaque = cidade === cidadeLocal ? "border-2 border-blue-500" : "";
  const corTimezone = icone === "🌞" ? "text-yellow-700" : "text-blue-400";

  return (
    <div
      className={`bg-white rounded-md shadow p-2 text-center text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-sm ${destaque}`}
      style={{
        width: "160px",
        minWidth: "160px",
        maxWidth: "160px",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div className="font-semibold flex items-center justify-center gap-2">
        <span className={`fi fi-${codigo}`}></span>
        <span>{cidade}</span>
      </div>
      <p style={{ fontFamily: "'Share Tech Mono', monospace" }}>{data}</p>
      <p style={{ fontFamily: "'Share Tech Mono', monospace" }}>{icone} {hora}</p>
      <p className={`text-xs ${corTimezone}`}>{abreviacao} ({offset})</p>
    </div>
  );
}
