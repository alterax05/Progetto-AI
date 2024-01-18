import { ThemeProvider } from "@/components/theme-provider"
 
import React, { ReactNode } from 'react';

interface AppProps {
  children?: ReactNode; // 'children' is optional and can be any valid React node
}

const App: React.FC<AppProps> = ({ children }) => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {children}
  </ThemeProvider>
);

export default App;