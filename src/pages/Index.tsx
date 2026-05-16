
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Gauge,
  Layers3,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePageScrollState } from '@/hooks/usePageScrollState';
import { cancelIdle, requestIdle } from '@/lib/idle';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';

const HOME_FAQ = [
  {
    question: 'Em quanto tempo um site profissional fica pronto?',
    answer:
      'A entrega costuma acontecer entre 10 e 21 dias, conforme escopo, volume de páginas e integrações.',
  },
  {
    question: 'Vocês fazem SEO técnico desde o início do projeto?',
    answer:
      'Sim. A estrutura é planejada com semântica, metadados e performance para melhorar indexação e conversão.',
  },
  {
    question: 'O projeto inclui versão otimizada para celular?',
    answer:
      'Sim. Todo projeto é desenvolvido com foco mobile-first para navegação fluida e melhor experiência em dispositivos móveis.',
  },
];

const HOME_FEATURE_WORDS = [
  'UX Premium',
  'Parallax Suave',
  'SEO Ready',
  'Alta Conversão',
  'Lighthouse Otimizado',
  'Desenvolvimento de Sites',
  'Site Institucional',
  'Landing Page',
  'SEO Local',
  'SEO Técnico',
  'Perfil da Empresa no Google',
  'Google Meu Negócio',
  'Presença no Google Maps',
  'Velocidade de Carregamento',
  'Core Web Vitals',
  'Arquitetura de Informação',
  'Copy para Conversão',
  'CTA Estratégico',
  'Geração de Leads',
  'Experiência Mobile',
];

const Index = () => {
  const isMobile = useIsMobile();
  const { scrollY, scrollProgress } = usePageScrollState(12, !isMobile);
  const tickerWords = isMobile ? HOME_FEATURE_WORDS.slice(0, 12) : HOME_FEATURE_WORDS;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const sections = Array.from(document.querySelectorAll('[data-reveal]'));
    const idleHandle = requestIdle(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
            }
          });
        },
        {
          threshold: isMobile ? 0.08 : 0.2,
          rootMargin: isMobile ? '0px 0px -4% 0px' : '0px 0px -10% 0px',
        }
      );

      sections.forEach((section) => observer?.observe(section));
    });

    return () => {
      cancelIdle(idleHandle);
      observer?.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    document.title = 'Criação de Sites Premium e SEO Técnico | JR Marketing';
    setCanonical(SITE_URL);

    setMetaByName(
      'description',
      'JR Marketing: desenvolvimento de sites profissionais, landing pages de alta conversão, SEO técnico e performance para empresas que querem crescer no Google.'
    );
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'Criação de Sites Premium e SEO Técnico | JR Marketing');
    setMetaByProperty(
      'og:description',
      'Desenvolvimento de sites profissionais com SEO técnico, performance e foco em geração de negócios.'
    );
    setMetaByProperty('og:url', SITE_URL);
    setMetaByName('twitter:title', 'Criação de Sites Premium e SEO Técnico | JR Marketing');
    setMetaByName(
      'twitter:description',
      'Sites profissionais com SEO técnico, performance e foco em geração de negócios.'
    );

    const oldScript = document.getElementById('home-faq-jsonld');
    if (oldScript) {
      oldScript.remove();
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.id = 'home-faq-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('home-faq-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: 'Site Institucional Premium',
      description: 'Arquitetura clara, identidade forte e páginas que traduzem autoridade da sua marca.',
      icon: Layers3,
    },
    {
      title: 'Landing Pages de Conversão',
      description: 'Copy orientada à ação, microinterações e estrutura otimizada para captação de leads.',
      icon: Rocket,
    },
    {
      title: 'Performance e Core Web Vitals',
      description: 'Estrutura leve, carregamento rápido e boas práticas para reduzir abandono.',
      icon: Gauge,
    },
    {
      title: 'Design Responsivo Real',
      description: 'Experiência consistente em mobile, tablet e desktop com navegação fluida.',
      icon: Smartphone,
    },
    {
      title: 'SEO Técnico de Base',
      description: 'Estrutura semântica, metadata e fundamentos técnicos para crescer no orgânico.',
      icon: Sparkles,
    },
    {
      title: 'Manutenção e Evolução',
      description: 'Roadmap contínuo de melhorias para manter o site competitivo após o lançamento.',
      icon: ShieldCheck,
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico Estratégico',
      text: 'Mapeamos objetivos de negócio, público e posicionamento digital.',
    },
    {
      step: '02',
      title: 'UX e Direção Visual',
      text: 'Definimos estrutura, wireframes e linguagem visual premium.',
    },
    {
      step: '03',
      title: 'Implementação e QA',
      text: 'Implementação sob medida com foco em SEO, performance, acessibilidade e confiabilidade.',
    },
    {
      step: '04',
      title: 'Lançamento e Iteração',
      text: 'Publicação assistida e melhorias orientadas por dados reais de uso.',
    },
  ];

  const recentProjects = [
    { name: 'Master Piscinas Litoral', url: 'https://masterpiscinaslitoral.com.br/' },
    { name: 'ACM Construcao e Reformas', url: 'https://www.acmconstrucaoereformas.com.br/' },
    { name: 'Joao Colussi Advocacia', url: 'https://joaocolussiadvocacia.com.br/' },
    { name: 'Correa House', url: 'https://www.correahousesmobiliados.com.br/' },
    { name: 'TV Decor', url: 'https://www.tvdecor.com.py/' },
    { name: 'Construtora Santos', url: 'https://construtorasantos.vercel.app/' },
  ];

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

      <main>
        <section id="inicio" className="relative overflow-hidden px-5 pb-10 pt-28 lg:px-8 lg:pb-14 lg:pt-44">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal className="reveal space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1e2124]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1e2124]/80">
                SEO técnico, design e implementação sob medida
              </span>

              <h1 className="font-display text-4xl leading-[1.02] text-[#131518] md:text-6xl lg:text-7xl">
                Criação de Sites com SEO Técnico para vender mais.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-[#2f353b]/80">
                Criamos sites sofisticados, rápidos e orientados à conversão para empresas que querem
                crescer com presença digital de alto nível.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <Button
                  onClick={() => scrollToSection('contato')}
                  className="group rounded-full bg-[#bf5b2c] px-5 py-4 text-sm font-semibold text-white hover:bg-[#a84f25] sm:px-7 sm:py-6 sm:text-base"
                >
                  Quero um site que vende
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                <Button asChild variant="outline" className="rounded-full border-[#1e2124]/20 bg-white/70 px-5 py-4 text-sm text-[#1e2124] hover:bg-white sm:px-7 sm:py-6 sm:text-base">
                  <Link to="/orcamento">Ir para Orçamento</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('servicos')}
                  className="rounded-full border-[#1e2124]/20 bg-white/70 px-5 py-4 text-sm text-[#1e2124] hover:bg-white sm:px-7 sm:py-6 sm:text-base"
                >
                  Ver serviços
                </Button>
              </div>

              <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['+120', 'Projetos entregues'],
                  ['98%', 'Clientes satisfeitos'],
                  ['< 2.0s', 'Tempo médio de carga'],
                ].map(([value, label]) => (
                  <div key={label} className="glass-surface rounded-2xl px-4 py-4">
                    <p className="font-display text-2xl text-[#131518]">{value}</p>
                    <p className="text-xs text-[#414952]/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal reveal-delay-1">
              <div
                className="relative overflow-hidden rounded-[2rem] border border-[#1e2124]/10 bg-[#121417] p-6 text-[#f2f3ed] shadow-[0_30px_80px_-36px_rgba(0,0,0,0.8)]"
                style={isMobile ? undefined : { transform: `translateY(${scrollY * -0.06}px)` }}
              >
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-display text-lg">Preview de Entrega</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Projeto ativo</span>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-[#d4a357]">Arquitetura</p>
                    <p className="mt-1 text-sm text-white/80">
                      Estrutura modular para escalar páginas e integrar funis de marketing.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-[#d4a357]">Experiência</p>
                    <p className="mt-1 text-sm text-white/80">
                      Fluxo claro de navegação para reduzir fricção e elevar conversão em cada etapa.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-[#d4a357]">Performance</p>
                    <p className="mt-1 text-sm text-white/80">
                      Otimização para carregamento rápido e nota alta em Core Web Vitals.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <span>Estrutura recomendada</span>
                  <span className="font-semibold text-[#d4a357]">Código sob medida + SEO técnico</span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="reveal reveal-delay-2 glass-surface mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-2xl p-3"
            style={isMobile ? undefined : { transform: `translateY(${scrollY * -0.02}px)` }}
          >
            <div className="feature-ticker">
              {[...tickerWords, ...tickerWords].map((item, idx) => (
                <span
                  key={`${item}-${idx}`}
                  className="glass-chip mr-2 inline-flex rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1e2124]/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="px-5 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-12">
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="reveal mb-12 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#194f45]">Soluções completas</p>
              <h2 className="font-display text-3xl leading-tight text-[#131518] md:text-5xl">
                Do conceito ao lançamento: tudo para seu site performar no nível premium.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    data-reveal
                    className={`reveal rounded-3xl border border-[#1e2124]/10 bg-white/80 p-6 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.65)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
                      idx > 0 ? `reveal-delay-${Math.min(idx, 3)}` : ''
                    }`}
                  >
                    <span className="mb-4 inline-flex rounded-xl bg-[#1e2124] p-2.5 text-[#f7f6f2]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mb-2 font-display text-2xl text-[#131518]">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-[#2f353b]/80">{service.description}</p>
                    <div className="mt-5">
                      <Button
                        variant="outline"
                        onClick={() => scrollToSection('contato')}
                        className="rounded-full border-[#1e2124]/20 bg-white/70 px-5 text-[#1e2124] hover:bg-white"
                      >
                        Solicitar análise gratuita agora
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-16 lg:px-8 lg:py-24" data-deferred-section>
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="reveal mb-12 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#194f45]">FAQ</p>
              <h2 className="font-display text-3xl leading-tight text-[#131518] md:text-5xl">
                Perguntas frequentes sobre criação de sites e SEO técnico.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {HOME_FAQ.map((item, idx) => (
                <article
                  key={item.question}
                  data-reveal
                  className={`reveal rounded-3xl border border-[#1e2124]/10 bg-white/80 p-6 backdrop-blur ${
                    idx > 0 ? `reveal-delay-${Math.min(idx, 3)}` : ''
                  }`}
                >
                  <h3 className="font-display text-xl text-[#131518]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2f353b]/85">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="px-5 py-16 lg:px-8 lg:py-24" data-deferred-section>
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="reveal mb-12 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#194f45]">Portfólio em produção</p>
              <h2 className="font-display text-3xl leading-tight text-[#131518] md:text-5xl">
                Projetos lançados recentemente para nossos clientes.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentProjects.map((project, idx) => {
                return (
                  <a
                    key={project.url}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                    className={`reveal group rounded-3xl border border-[#1e2124]/10 bg-white/80 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.75)] ${
                      idx > 0 ? `reveal-delay-${Math.min(idx, 3)}` : ''
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-[#194f45]">Projeto publicado</p>
                    <p className="mt-2 font-display text-xl text-[#131518]">{project.name}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#bf5b2c]">
                      Visitar site
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="processo" className="bg-[#121417] px-5 py-16 text-[#f2f3ed] lg:px-8 lg:py-24" data-deferred-section>
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="reveal mb-14 max-w-3xl">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d4a357]">Método</p>
              <h2 className="font-display text-3xl leading-tight md:text-5xl">
                Processo inteligente para reduzir risco e acelerar entrega.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {process.map((item, idx) => (
                <article
                  key={item.step}
                  data-reveal
                  className={`reveal rounded-3xl border border-white/10 bg-white/5 p-6 ${
                    idx > 0 ? `reveal-delay-${Math.min(idx, 3)}` : ''
                  }`}
                >
                  <p className="text-sm text-[#d4a357]">Etapa {item.step}</p>
                  <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="px-5 py-16 lg:px-8 lg:py-24" data-deferred-section>
          <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border border-[#1e2124]/10 bg-white/80 p-5 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.65)] backdrop-blur sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div data-reveal className="reveal">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#194f45]">Vamos construir seu projeto</p>
              <h2 className="max-w-[14ch] font-display text-2xl leading-tight text-[#131518] sm:max-w-none sm:text-3xl md:text-5xl">
                Seu site pode se tornar seu melhor vendedor em poucos dias.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#2f353b]/80 sm:mt-5 sm:text-base">
                Conte seu momento atual e os objetivos de crescimento. Montamos uma proposta técnica com
                escopo claro, prazo realista e foco total em resultado.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() =>
                    window.open(
                      'https://wa.me/+5513985994965?text=Olá! Quero um site premium com foco em conversão.',
                      '_blank'
                    )
                  }
                  className="w-full rounded-full bg-[#194f45] px-5 py-5 text-sm text-white hover:bg-[#163f38] sm:w-auto sm:px-7 sm:py-6 sm:text-base"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="whitespace-normal text-left sm:whitespace-nowrap">Receber proposta pelo WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('mailto:falecom@jotarmarketing.com.br', '_blank')}
                  className="w-full rounded-full border-[#1e2124]/20 bg-transparent px-5 py-5 text-sm text-[#1e2124] sm:w-auto sm:px-7 sm:py-6 sm:text-base"
                >
                  Enviar e-mail
                </Button>
              </div>
            </div>

            <div data-reveal className="reveal reveal-delay-1 rounded-3xl bg-[#121417] p-5 text-[#f2f3ed] sm:p-6">
              <h3 className="font-display text-xl leading-tight sm:text-2xl">Resumo da proposta</h3>
              <div className="mt-5 space-y-4 text-sm text-white/80">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="min-w-0 break-words">Prazo estimado</span>
                  <span className="shrink-0 text-right font-semibold text-[#d4a357]">10 a 21 dias</span>
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="min-w-0 break-words">Entrega</span>
                  <span className="max-w-[58%] text-right font-semibold leading-tight text-[#d4a357]">Design + implementação + publicação</span>
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="min-w-0 break-words">Suporte inicial</span>
                  <span className="shrink-0 text-right font-semibold text-[#d4a357]">30 dias inclusos</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
