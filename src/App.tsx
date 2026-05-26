import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
const CityPage = lazy(() => import("./pages/CityPage"));
const Orcamento = lazy(() => import("./pages/Orcamento"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const AdminFormularios = lazy(() => import("./pages/AdminFormularios"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    let attempt = 0;
    let timeoutId: number | undefined;

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (!element) {
        if (attempt < 8) {
          attempt += 1;
          timeoutId = window.setTimeout(tryScroll, 90);
        }
        return;
      }

      const y = element.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

      // Reforça o posicionamento após o layout terminar de estabilizar.
      if (attempt < 3) {
        attempt += 1;
        timeoutId = window.setTimeout(tryScroll, 140);
      }
    };

    tryScroll();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToHash />
    <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/praiagrande" element={<CityPage cityKey="praiagrande" />} />
          <Route path="/santos" element={<CityPage cityKey="santos" />} />
          <Route path="/saovicente" element={<CityPage cityKey="saovicente" />} />
          <Route path="/cubatao" element={<CityPage cityKey="cubatao" />} />
          <Route path="/guaruja" element={<CityPage cityKey="guaruja" />} />
          <Route path="/bertioga" element={<CityPage cityKey="bertioga" />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/admin/formularios" element={<AdminFormularios />} />
                    <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
