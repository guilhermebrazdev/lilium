import { DefaultFallBack } from "@/components/HydrateFallback";
import { RouteObjectExtended } from "./interfaces/RouteObjectExtended";

export const routes: RouteObjectExtended[] = [
  {
    meta: {
      title: "Home",
    },
    path: "/",
    lazy: async () => {
      const { UsersPage: page } = await import("@/features");
      return { Component: page };
    },
    HydrateFallback: DefaultFallBack,
  },
];
