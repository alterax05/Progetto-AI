import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "@/App.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App>
          <Toaster />
        </App>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
