import { Outlet } from "react-router-dom";
import { RoutesNavigation } from "./routes/RoutesNavigation.tsx";
import { GlobalProvider } from "./contexts/GlobalProvider.tsx";

export const App = () => {
  return (
    <GlobalProvider>
      <RoutesNavigation>
        <Outlet />
      </RoutesNavigation>
    </GlobalProvider>
  );
};
