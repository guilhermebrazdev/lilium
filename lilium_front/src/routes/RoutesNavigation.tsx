import { TopBar } from "@/components/layout/TopBar/TopBar";
import { LiliumLoader } from "@/components/LiliumLoader";
import { useGlobalProvider } from "@/hooks/useGlobalProvider";
import { Stack } from "@mui/material";
import { ReactNode } from "react";

import { lilium_background } from "@/assets";

interface RoutesNavigationProps {
  children: ReactNode;
}

export const RoutesNavigation = ({ children }: RoutesNavigationProps) => {
  const { globalLoading } = useGlobalProvider();

  return (
    <>
      {globalLoading && <LiliumLoader translucent size={80} />}
      <Stack
        width={"100vw"}
        height={"100vh"}
        sx={{
          background: `url(${lilium_background}), linear-gradient(90deg, #e6e2f9, #fdfdff 25%, #fff 75%, #d4e0f7)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TopBar />
        <Stack height={"100%"} overflow={"auto"}>
          {children}
        </Stack>
      </Stack>
    </>
  );
};
