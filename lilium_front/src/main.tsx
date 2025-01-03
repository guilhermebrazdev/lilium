import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import { routes } from "@/routes/Routes.tsx";
import { LiliumStylesTheme } from "./styles/mui-theme.ts";
import "./styles/index.css";

const router = createBrowserRouter([{ element: <App />, children: routes }]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={LiliumStylesTheme()}>
      <CssBaseline />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} containerClassName="toast-container" />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
