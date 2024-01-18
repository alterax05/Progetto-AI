import React from "react";
import ReactDOM from "react-dom/client";
import Home from "@/pages/Home.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TPSI from "./pages/TPSI";
import GestioneProgetto from "./pages/GestioneProgetto";
import Playground from "./pages/Playground";
import { ChakraProvider } from "@chakra-ui/react";
import App from "@/App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tpsi",
    element: <TPSI />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/progetto",
    element: <GestioneProgetto />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/playground",
    element: <Playground />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(  
  <React.StrictMode>
    <ChakraProvider>
      <App >
        <RouterProvider router={router} />
      </App>
    </ChakraProvider>
  </React.StrictMode>
);
