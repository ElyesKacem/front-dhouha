import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MusiclPage from "./pages/musiclPage";
import ConcertPage from "./pages/ConcertPage";
import PageNotFound from "./pages/PageNotFound";
import Test from "./pages/Test";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-tailwind/react";
import AuditForm from "./pages/AuditForm";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Test />} />
            <Route path="/musical" element={<MusiclPage />} />
            <Route path="/concert" element={<ConcertPage />} />
            <Route path="/auditform" element={<AuditForm />} />
            {/* <Route index element={<HomePage />} /> */}
          </Routes>
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
