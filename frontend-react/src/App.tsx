import { ThemeProvider } from "@/components/ThemeProvider";
import { Suspense, lazy, StrictMode } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Loading from "@/pages/Loading";
import { Toaster } from "@/components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import "./index.css";

const Playground = lazy(() => import("@/pages/Playground"));
const TPSI = lazy(() => import("@/pages/TPSI"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const Home = lazy(() => import("@/pages/Home"));

const App = () => {
  const queryClient = new QueryClient();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/tpsi" element={<TPSI />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
              <Toaster />
            </Suspense>
          </ThemeProvider>
        </Router>
      </QueryClientProvider>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);