import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';
import { useEffect } from 'react';

const SOBRE_HIGHLIGHTS = [
  'Atendimento em Praia Grande e toda a Baixada Santista',
  'Projetos sob medida para negócios locais e empresas de serviço',
  'Foco em SEO técnico, performance e geração de oportunidades',
  'Processo claro: diagnóstico, direção visual, implementação e evolução',
  'Suporte próximo no pós-lançamento para manter crescimento contínuo',
];

const Sobre = () => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/sobre`;

    document.title = 'Sobre a JR Marketing | Criação de Sites em Praia Grande';
    setCanonical(canonicalUrl);
    setMetaByName(
      'description',
      'Conheça a história da JR Marketing, agência de criação de sites em Praia Grande com foco em SEO técnico, performance e conversão.'
    );
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'Sobre a JR Marketing | Criação de Sites em Praia Grande');
    setMetaByProperty(
      'og:description',
      'Nossa história, posicionamento e atuação na Baixada Santista para desenvolvimento de sites sob medida.'
    );
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByName('twitter:title', 'Sobre a JR Marketing | Criação de Sites em Praia Grande');
    setMetaByName(
      'twitter:description',
      'Entenda como trabalhamos com estratégia, design e implementação para gerar resultados digitais reais.'
    );
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#1e2124]">
      <PublicNavbar transparent />

      <main className="px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-44">
        <section className="mx-auto w-full max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#2f353b]/80">
              <li>
                <Link to="/" className="hover:text-[#1e2124] hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-[#1e2124]">Sobre Nós</li>
            </ol>
          </nav>

          <div className="grid gap-8 rounded-[2rem] border border-[#1e2124]/10 bg-white/80 p-8 shadow-[0_20px_55px_-28px_rgba(0,0,0,0.7)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
            <article>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2124]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#194f45]">
                <MapPin className="h-3.5 w-3.5" />
                Praia Grande - SP
              </p>
              <h1 className="mt-5 font-display text-4xl leading-tight text-[#131518] md:text-6xl">
                Sobre a JR Marketing
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[#2f353b]/90">
                A JR Marketing nasceu para ajudar empresas a transformarem sua presença digital em um canal previsível de
                geração de oportunidades. Em vez de entregar apenas páginas bonitas, desenvolvemos sites com estratégia de
                negócio, estrutura semântica e experiência focada em conversão.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#2f353b]/90">
                Atuamos a partir de Praia Grande, com projetos na Baixada Santista e em outras regiões. Nossa proposta é
                combinar posicionamento, clareza de oferta e SEO técnico para que cada empresa tenha uma base sólida para
                campanhas, tráfego orgânico e relacionamento comercial.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-[#bf5b2c] text-white hover:bg-[#a84f25]">
                  <Link to="/orcamento">Solicitar proposta personalizada</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-[#1e2124]/20 bg-white/70 text-[#1e2124]">
                  <Link to="/contato">Falar com a equipe</Link>
                </Button>
              </div>
            </article>

            <aside className="rounded-3xl border border-[#1e2124]/10 bg-[#121417] p-6 text-[#f2f3ed]">
              <h2 className="font-display text-2xl">Diferenciais da nossa atuação</h2>
              <div className="mt-5 space-y-3">
                {SOBRE_HIGHLIGHTS.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a357]" />
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Sobre;