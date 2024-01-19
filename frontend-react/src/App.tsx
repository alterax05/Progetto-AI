import { ThemeProvider } from "@/components/theme-provider"
 
import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import TPSI from "./pages/TPSI";
import Playground from "./pages/Playground";
import Home from "@/pages/Home.tsx";

interface AppProps {
  children?: ReactNode; // 'children' is optional and can be any valid React node
}

const App: React.FC<AppProps> = ({ children }) => {

  

  return (<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/tpsi" element={<TPSI />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    {children}
  </ThemeProvider>
)};

export default App;