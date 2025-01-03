import { RouteObject } from "react-router-dom";

export interface navigableRoute {
  meta: {
    title: string;
  };
  path: string;
}

export type RouteObjectExtended = navigableRoute &
  (Omit<RouteObject, "children" | "index"> & { index?: any; children?: RouteObjectExtended[] });
