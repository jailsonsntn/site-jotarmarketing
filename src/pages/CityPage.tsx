import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, Building2, CheckCircle2, MapPin, MessageCircle, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { CITY_PAGES } from "@/data/cityPages";
import { usePageScrollState } from "@/hooks/usePageScrollState";
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from "@/lib/seo";

type CityPageProps = {
  cityKey: keyof typeof CITY_PAGES;
};

const CityPage = ({ cityKey }: CityPageProps) => {
  const content = CITY_PAGES[cityKey];
  const { scrolled, scrollY, scrollProgress } = usePageScrollState(10);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!content) {
      return;
    }

    const canonicalUrl = `${SITE_URL}/${content.slug}`;

    document.title = `${content.title} | SEO Local`;
    setMetaByName("description", content.description);
    setMetaByName("robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");

    setMetaByProperty("og:title", content.title);
    setMetaByProperty("og:description", content.description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:locale", "pt_BR");

    setMetaByName("twitter:title", content.title);
    setMetaByName("twitter:description", content.description);

    setCanonical(canonicalUrl);

    const oldScript = document.getElementById("city-seo-jsonld");
    if (oldScript) {
      oldScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `Criacao de Sites em ${content.cityName}`,
          serviceType: "Sites institucionais, landing pages e paginas sob medida",
          provider: {
            "@type": "ProfessionalService",
            name: "Jota R Web",
            url: SITE_URL,
          },
          areaServed: {
            "@type": "City",
            name: content.cityName,
          },
          url: canonicalUrl,
          description: content.description,
          termsOfService: `${SITE_URL}/`,
        },
        {
          "@type": "FAQPage",
          mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.id = "city-seo-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("city-seo-jsonld");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [content]);

  if (!content) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-transparent text-[#1e2124]">
      <div className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-black/5">
        <div
          className="h-full bg-[linear-gradient(90deg,#194f45_0%,#bf5b2c_45%,#d4a357_100%)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mesh-gradient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="mesh-orb mesh-orb-1"
          style={{ transform: `translate3d(${scrollY * -0.04}px, ${scrollY * 0.08}px, 0)` }}
        />
        <div
          className="mesh-orb mesh-orb-2"
          style={{ transform: `translate3d(${scrollY * 0.05}px, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="mesh-orb mesh-orb-3"
          style={{ transform: `translate3d(${scrollY * -0.03}px, ${scrollY * 0.04}px, 0)` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#1e2124]/10 bg-[#f7f6f2]/70 shadow-[0_10px_35px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button onClick={() => scrollToSection("topo")} className="flex items-center">
            <BrandLogo className="h-12 w-auto sm:h-14" fetchPriority="high" />
          </button>

          <nav className="hidden items-center gap-2 rounded-full border border-[#1e2124]/10 bg-white/60 p-1 text-sm font-medium text-[#1e2124]/80 shadow-[0_10px_35px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:flex">
            <button onClick={() => scrollToSection("servicos")} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Servicos
            </button>
            <button onClick={() => scrollToSection("bairros")} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Regiao
            </button>
            <button onClick={() => scrollToSection("faq")} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden rounded-full border-[#1e2124]/20 bg-white/50 px-5 text-[#1e2124] sm:inline-flex">
              <Link to="/">Voltar a home</Link>
            </Button>
            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/+5513985994965?text=Ola! Quero um site profissional para ${content.cityName}.`,
                  "_blank"
                )
              }
              className="rounded-full bg-[#1e2124] px-5 text-[#f7f6f2] hover:bg-[#2d3237]"
            >
              Solicitar proposta
            </Button>
          </div>
        </div>
      </header>

      <main id="topo" className="px-5 pb-16 pt-36 lg:px-8 lg:pt-44">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[2rem] border border-[#1e2124]/10 bg-white/80 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.7)] backdrop-blur lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2124]/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#194f45]">
              <MapPin className="h-3.5 w-3.5" />
              SEO local em {content.fullName}
            </p>

            <h1 className="mt-5 font-display text-4xl leading-tight text-[#131518] md:text-6xl">
              {content.heading}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#2f353b]/85">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {content.seoFocus.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-[#1e2124]/10 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1e2124]/75"
                >
                  {term}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/+5513985994965?text=Ola! Quero um site com SEO local para ${content.cityName}.`,
                    "_blank"
                  )
                }
                className="group rounded-full bg-[#bf5b2c] px-7 text-white hover:bg-[#a84f25]"
              >
                Falar sobre {content.cityName}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[#1e2124]/20 bg-white/70 px-7 text-[#1e2124]">
                <Link to="/">Ver portfolio completo</Link>
              </Button>
            </div>
          </article>

          <aside
            id="servicos"
            className="rounded-[2rem] border border-[#1e2124]/10 bg-[#121417] p-6 text-[#f2f3ed] shadow-[0_30px_80px_-36px_rgba(0,0,0,0.8)]"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-2xl">Plano local avancado</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Cidade ativa</span>
            </div>

            <div className="space-y-3">
              {[
                "Pagina local exclusiva com conteudo proprio",
                "Arquitetura semantica para buscas regionais",
                "Meta tags e dados estruturados por cidade",
                "Implementacao sob medida com SEO local especializado",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="flex items-start gap-3 text-sm text-white/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a357]" />
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
              <p className="flex items-center gap-2 text-[#d4a357]">
                <Sparkles className="h-4 w-4" />
                Foco em presenca forte em {content.cityName}
              </p>
            </div>
          </aside>
        </section>

        <section id="bairros" className="mx-auto mt-8 grid w-full max-w-7xl gap-6 lg:grid-cols-2" data-deferred-section>
          <article className="rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur">
            <h2 className="font-display text-3xl text-[#131518]">Atendimento na regiao</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#2f353b]/80">
              Atuamos em {content.cityName} com estrategia digital para empresas locais que desejam aumentar
              visibilidade, autoridade e geracao de contatos qualificados.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-[#2f353b]/90 sm:grid-cols-2">
              {content.neighborhoods.map((n) => (
                <li key={n} className="rounded-xl border border-[#1e2124]/10 bg-white/80 px-3 py-2">
                  {n}
                </li>
              ))}
            </ul>
          </article>

          <article id="faq" className="rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur">
            <h2 className="font-display text-3xl text-[#131518]">Perguntas frequentes</h2>
            <div className="mt-6 space-y-4">
              {content.faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-[#1e2124]/10 bg-white/85 p-4">
                  <h3 className="text-sm font-semibold text-[#131518]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2f353b]/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mx-auto mt-8 w-full max-w-7xl rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur lg:p-10" data-deferred-section>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#194f45]">Proximo passo</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-[#131518] md:text-4xl">
                Leve sua empresa em {content.cityName} para outro nivel no digital.
              </h2>
            </div>
            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/+5513985994965?text=Ola! Quero criar um projeto premium para ${content.cityName}.`,
                  "_blank"
                )
              }
              className="rounded-full bg-[#194f45] px-8 text-white hover:bg-[#163f38]"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Iniciar projeto
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1e2124]/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm text-[#2f353b]/85 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Jota R Web - Estrategia local para {content.cityName}
          </p>
          <p>© {new Date().getFullYear()} Jota R Web. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CityPage;
