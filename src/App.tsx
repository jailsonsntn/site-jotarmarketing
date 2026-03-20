import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/praiagrande" element={<CityPage cityKey="praiagrande" />} />
          <Route path="/santos" element={<CityPage cityKey="santos" />} />
          <Route path="/saovicente" element={<CityPage cityKey="saovicente" />} />
          <Route path="/cubatao" element={<CityPage cityKey="cubatao" />} />
          <Route path="/guaruja" element={<CityPage cityKey="guaruja" />} />
          <Route path="/bertioga" element={<CityPage cityKey="bertioga" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
