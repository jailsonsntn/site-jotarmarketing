import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, MapPin, MessageCircle, Sparkles } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { CITY_PAGES } from "@/data/cityPages";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePageScrollState } from "@/hooks/usePageScrollState";
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from "@/lib/seo";

type CityPageProps = {
  cityKey: keyof typeof CITY_PAGES;
};

const CityPage = ({ cityKey }: CityPageProps) => {
  const content = CITY_PAGES[cityKey];
  const faqItems = content?.faq ?? [];
  const isMobile = useIsMobile();
  const { scrollY, scrollProgress } = usePageScrollState(10, !isMobile);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!faqItems.length) {
      setExpandedFaqs({});
      return;
    }

    setExpandedFaqs(Object.fromEntries(faqItems.map((_, index) => [index, index === 0])));
  }, [faqItems]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  const toggleAllFaqs = () => {
    const shouldExpandAll = !faqItems.every((_, index) => expandedFaqs[index]);
    setExpandedFaqs(Object.fromEntries(faqItems.map((_, index) => [index, shouldExpandAll])));
  };

  useEffect(() => {
    if (!content) {
      return;
    }

    const canonicalUrl = `${SITE_URL}/${content.slug}`;

    document.title = content.title;
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
          name: `Criação de Sites em ${content.cityName}`,
          serviceType: "Sites institucionais, landing pages e páginas sob medida",
          provider: {
            "@type": "ProfessionalService",
            name: "JR Marketing",
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
      {!isMobile ? (
        <div className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-black/5">
          <div
            className="h-full bg-[linear-gradient(90deg,#194f45_0%,#bf5b2c_45%,#d4a357_100%)] transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      ) : null}

      <div className="mesh-gradient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="mesh-orb mesh-orb-1"
          style={isMobile ? undefined : { transform: `translate3d(${scrollY * -0.04}px, ${scrollY * 0.08}px, 0)` }}
        />
        <div
          className="mesh-orb mesh-orb-2"
          style={isMobile ? undefined : { transform: `translate3d(${scrollY * 0.05}px, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="mesh-orb mesh-orb-3"
          style={isMobile ? undefined : { transform: `translate3d(${scrollY * -0.03}px, ${scrollY * 0.04}px, 0)` }}
        />
      </div>

      <PublicNavbar transparent />

      <main id="topo" className="px-5 pb-16 pt-28 lg:px-8 lg:pt-44">
        <nav aria-label="Breadcrumb" className="mx-auto mb-6 w-full max-w-7xl">
          <ol className="flex items-center gap-2 text-sm text-[#2f353b]/80">
            <li>
              <Link to="/" className="hover:text-[#1e2124] hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1e2124]">{content.cityName}</li>
          </ol>
        </nav>

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
                    `https://wa.me/+5513985994965?text=Olá! Quero um site com SEO local para ${content.cityName}.`,
                    "_blank"
                  )
                }
                className="group rounded-full bg-[#bf5b2c] px-7 text-white hover:bg-[#a84f25]"
              >
                Falar sobre {content.cityName}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[#1e2124]/20 bg-white/70 px-7 text-[#1e2124]">
                <Link to="/">Ver portfólio completo</Link>
              </Button>
            </div>
          </article>

          <aside
            id="servicos"
            className="rounded-[2rem] border border-[#1e2124]/10 bg-[#121417] p-6 text-[#f2f3ed] shadow-[0_30px_80px_-36px_rgba(0,0,0,0.8)]"
            style={isMobile ? undefined : { transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-2xl">Plano local avançado</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Cidade ativa</span>
            </div>

            <div className="space-y-3">
              {[
                "Página local exclusiva com conteúdo próprio",
                "Arquitetura semântica para buscas regionais",
                "Meta tags e dados estruturados por cidade",
                "Implementação sob medida com SEO local especializado",
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
                Foco em presença forte em {content.cityName}
              </p>
            </div>
          </aside>
        </section>

        <section id="bairros" className="mx-auto mt-8 grid w-full max-w-7xl gap-6 lg:grid-cols-2" data-deferred-section>
          <article className="rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur">
            <h2 className="font-display text-3xl text-[#131518]">Atendimento na região</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#2f353b]/80">
              Atuamos em {content.cityName} com estratégia digital para empresas locais que desejam aumentar
              visibilidade, autoridade e geração de contatos qualificados.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-[#2f353b]/90 sm:grid-cols-2">
              {content.neighborhoods.map((n) => (
                <li key={n} className="rounded-xl border border-[#1e2124]/10 bg-white/80 px-3 py-2">
                  {n}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
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
                    `https://wa.me/+5513985994965?text=Olá! Quero um diagnóstico gratuito para ${content.cityName}.`,
                    "_blank"
                  )
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Diagnóstico pelo WhatsApp
              </Button>
            </div>
          </article>

          <article id="faq" className="rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-3xl text-[#131518]">Perguntas frequentes</h2>
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="rounded-full border border-[#1e2124]/10 bg-[#194f45]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#194f45] transition hover:bg-[#194f45]/10"
              >
                {content.faq.every((_, index) => expandedFaqs[index]) ? "Recolher tudo" : "Expandir tudo"}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {faqItems.map((item, index) => {
                const isExpanded = Boolean(expandedFaqs[index]);

                return (
                  <div key={item.question} className="overflow-hidden rounded-2xl border border-[#1e2124]/10 bg-white/85">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-3 p-4 text-left"
                      aria-expanded={isExpanded}
                    >
                      <h3 className="text-sm font-semibold text-[#131518]">{item.question}</h3>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1e2124]/10 bg-[#194f45]/5 text-lg font-medium text-[#194f45]">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {isExpanded ? <p className="border-t border-[#1e2124]/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-[#2f353b]/80">{item.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="mx-auto mt-8 w-full max-w-7xl rounded-3xl border border-[#1e2124]/10 bg-white/80 p-8 backdrop-blur lg:p-10" data-deferred-section>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#194f45]">Próximo passo</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-[#131518] md:text-4xl">
                Leve sua empresa em {content.cityName} para outro nível no digital.
              </h2>
            </div>
            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/+5513985994965?text=Olá! Quero criar um projeto premium para ${content.cityName}.`,
                  "_blank"
                )
              }
              className="rounded-full bg-[#194f45] px-8 text-white hover:bg-[#163f38]"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Receber proposta pelo WhatsApp
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CityPage;
