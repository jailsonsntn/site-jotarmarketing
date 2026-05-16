import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 | Página não encontrada | Jota R Marketing";

    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensureMeta("robots", "noindex,nofollow");

    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-[#1e2124]">
      <main className="flex flex-1 flex-col justify-center px-5 pb-16 pt-24 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#2f353b]/80">
              <li>
                <Link to="/" className="hover:text-[#1e2124] hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-[#1e2124]">Página não encontrada</li>
            </ol>
          </nav>

          <article className="rounded-3xl border border-[#1e2124]/10 bg-white p-10 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)] text-center">
            <p className="font-display text-8xl font-bold text-[#1e2124]/10 select-none">404</p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-[#131518] md:text-4xl">
              Página não encontrada
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#2f353b]/80">
              O endereço que você acessou não existe ou foi removido.
              Volte para a home ou fale conosco para descobrir como podemos ajudar o seu negócio.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full bg-[#194f45] px-7 text-white hover:bg-[#163f38]">
                <Link to="/">
                  Voltar para a Home
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="rounded-full bg-[#bf5b2c] px-7 text-white hover:bg-[#a84f25]">
                <Link to="/orcamento">
                  Solicitar análise gratuita agora
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-[#1e2124]/20 bg-white/70 px-7 text-[#1e2124]"
                onClick={() =>
                  window.open(
                    "https://wa.me/+5513985994965?text=Olá! Preciso de ajuda com o site.",
                    "_blank"
                  )
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar pelo WhatsApp
              </Button>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default NotFound;
