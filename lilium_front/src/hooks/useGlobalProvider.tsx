import { useContext } from "react";
import { globalContext } from "../contexts/GlobalProvider";

export const useGlobalProvider = () => useContext(globalContext);
