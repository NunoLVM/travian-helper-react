import { useState, useEffect } from "react";
import { TropasContext } from "./TropasContext";

export function TropasProvider({ children }) {
  const [tropas, setTropas] = useState(() => {
    try {
      const salvas = JSON.parse(localStorage.getItem("tropas"));
      return salvas || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tropas", JSON.stringify(tropas));
  }, [tropas]);

  return (
    <TropasContext.Provider value={{ tropas, setTropas }}>
      {children}
    </TropasContext.Provider>
  );
}
