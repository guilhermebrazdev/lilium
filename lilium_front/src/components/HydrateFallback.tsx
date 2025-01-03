import { useGlobalProvider } from "@/hooks/useGlobalProvider";
import { useEffect } from "react";

export const DefaultFallBack = () => {
  const { setGlobalLoading } = useGlobalProvider();

  useEffect(() => {
    setGlobalLoading(true);
    return () => setGlobalLoading(false);
  }, []);

  return null;
};
