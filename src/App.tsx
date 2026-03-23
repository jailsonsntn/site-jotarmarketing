import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Index = lazy(() => import("./pages/Index"));
const CityPage = lazy(() => import("./pages/CityPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<RouteFallback />}>
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
    </Suspense>
  </BrowserRouter>
);

export default App;
