import { useContext } from "react";
import { TropasContext } from "./TropasContext";

export function useTropas() {
  return useContext(TropasContext);
}
