
import { useEffect, useRef, type MouseEvent } from 'react';
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
import BrandLogo from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';
import { usePageScrollState } from '@/hooks/usePageScrollState';
import { cancelIdle, requestIdle } from '@/lib/idle';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';

const Index = () => {
  const { scrolled, scrollY, scrollProgress } = usePageScrollState(12);
  const homebarRef = useRef<HTMLDivElement | null>(null);
  const homebarRafRef = useRef<number | null>(null);
  const pointerPositionRef = useRef<{ clientX: number; clientY: number } | null>(null);

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
          threshold: 0.2,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      sections.forEach((section) => observer?.observe(section));
    });

    return () => {
      cancelIdle(idleHandle);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = 'JR Marketing | Desenvolvimento de sites';
    setCanonical(SITE_URL);

    setMetaByName(
      'description',
      'JR Marketing: desenvolvimento de sites profissionais, landing pages de alta conversão, SEO técnico e performance para empresas que querem crescer no Google.'
    );
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'JR Marketing | Desenvolvimento de sites');
    setMetaByProperty(
      'og:description',
      'Desenvolvimento de sites profissionais com SEO técnico, performance e foco em geração de negócios.'
    );
    setMetaByProperty('og:url', SITE_URL);
    setMetaByName('twitter:title', 'JR Marketing | Desenvolvimento de sites');
    setMetaByName(
      'twitter:description',
      'Sites profissionais com SEO técnico, performance e foco em geração de negócios.'
    );
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

  const handleHomebarMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    pointerPositionRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    if (homebarRafRef.current !== null) {
      return;
    }

    homebarRafRef.current = requestAnimationFrame(() => {
      const pointerPosition = pointerPositionRef.current;
      const homebarElement = homebarRef.current;
      homebarRafRef.current = null;

      if (!homebarElement || !pointerPosition) {
        return;
      }

      const rect = homebarElement.getBoundingClientRect();
      const x = pointerPosition.clientX - rect.left;
      const y = pointerPosition.clientY - rect.top;

      homebarElement.style.setProperty('--mx', `${x}px`);
      homebarElement.style.setProperty('--my', `${y}px`);
      homebarElement.style.setProperty('--glow-opacity', '1');
    });
  };

  const handleHomebarMouseLeave = () => {
    pointerPositionRef.current = null;

    if (homebarRef.current) {
      homebarRef.current.style.setProperty('--glow-opacity', '0');
    }
  };

  useEffect(() => {
    return () => {
      if (homebarRafRef.current !== null) {
        cancelAnimationFrame(homebarRafRef.current);
      }
    };
  }, []);

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
            ? 'border-b border-[#1e2124]/10 bg-[#f7f6f2]/70 shadow-[0_10px_35px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="navbar-sheen" />
          <button
            onClick={() => scrollToSection('inicio')}
            className="relative z-10 flex items-center"
          >
            <BrandLogo className="h-12 w-auto sm:h-14" fetchPriority="high" />
          </button>

          <nav className="hidden items-center gap-2 rounded-full border border-[#1e2124]/10 bg-white/60 p-1 text-sm font-medium text-[#1e2124]/80 shadow-[0_10px_35px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:flex">
            <button onClick={() => scrollToSection('servicos')} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Soluções
            </button>
            <button onClick={() => scrollToSection('processo')} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Processo
            </button>
            <button onClick={() => scrollToSection('projetos')} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Projetos
            </button>
            <button onClick={() => scrollToSection('contato')} className="rounded-full px-5 py-2.5 transition hover:bg-[#1e2124]/5 hover:text-[#1e2124]">
              Contato
            </button>
          </nav>

          <Button
            onClick={() =>
              window.open(
                'https://wa.me/+5513985994965?text=Olá! Quero um site premium para minha empresa.',
                '_blank'
              )
            }
            className="relative z-10 rounded-full bg-[#1e2124] px-5 text-[#f7f6f2] hover:bg-[#2d3237]"
          >
            Solicitar proposta
          </Button>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden px-5 pb-24 pt-36 lg:px-8 lg:pt-44">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal className="reveal space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1e2124]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1e2124]/80">
                SEO tecnico, design e implementacao sob medida
              </span>

              <h1 className="font-display text-4xl leading-[1.02] text-[#131518] md:text-6xl lg:text-7xl">
                Experiências digitais que elevam sua marca e aceleram vendas.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-[#2f353b]/80">
                Criamos sites sofisticados, rápidos e orientados à conversão para empresas que querem
                crescer com presença digital de alto nível.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => scrollToSection('contato')}
                  className="group rounded-full bg-[#bf5b2c] px-7 py-6 text-base font-semibold text-white hover:bg-[#a84f25]"
                >
                  Quero um site premium
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('servicos')}
                  className="rounded-full border-[#1e2124]/20 bg-white/70 px-7 py-6 text-base text-[#1e2124] hover:bg-white"
                >
                  Ver serviços
                </Button>
              </div>

              <div className="grid max-w-xl grid-cols-3 gap-3">
                {[
                  ['+120', 'Projetos entregues'],
                  ['98%', 'Clientes satisfeitos'],
                  ['< 2.0s', 'Tempo médio de carga'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[#1e2124]/10 bg-white/70 px-4 py-4 backdrop-blur">
                    <p className="font-display text-2xl text-[#131518]">{value}</p>
                    <p className="text-xs text-[#414952]/80">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal reveal-delay-1">
              <div
                className="relative overflow-hidden rounded-[2rem] border border-[#1e2124]/10 bg-[#121417] p-6 text-[#f2f3ed] shadow-[0_30px_80px_-36px_rgba(0,0,0,0.8)]"
                style={{ transform: `translateY(${scrollY * -0.06}px)` }}
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
                  <span className="font-semibold text-[#d4a357]">Codigo sob medida + SEO tecnico</span>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={homebarRef}
            data-reveal
            className="homebar-interactive reveal reveal-delay-2 relative mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#1e2124]/10 bg-white/60 p-3 backdrop-blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.03}px)` }}
            onMouseMove={handleHomebarMouseMove}
            onMouseLeave={handleHomebarMouseLeave}
          >
            <div
              aria-hidden
              className="homebar-mouse-glow pointer-events-none absolute inset-0 rounded-2xl"
            />
            {['UX Premium', 'Parallax Suave', 'SEO Ready', 'Alta Conversão', 'Lighthouse Otimizado'].map((item) => (
              <span
                key={item}
                className="relative z-10 rounded-xl border border-[#1e2124]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1e2124]/80"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="servicos" className="px-5 py-24 lg:px-8" data-deferred-section>
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
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projetos" className="px-5 py-24 lg:px-8" data-deferred-section>
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

        <section id="processo" className="bg-[#121417] px-5 py-24 text-[#f2f3ed] lg:px-8" data-deferred-section>
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

        <section id="contato" className="px-5 py-24 lg:px-8" data-deferred-section>
          <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border border-[#1e2124]/10 bg-white/80 p-8 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.65)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div data-reveal className="reveal">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#194f45]">Vamos construir seu projeto</p>
              <h2 className="font-display text-3xl leading-tight text-[#131518] md:text-5xl">
                Seu site pode se tornar seu melhor vendedor em poucos dias.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#2f353b]/80">
                Conte seu momento atual e os objetivos de crescimento. Montamos uma proposta técnica com
                escopo claro, prazo realista e foco total em resultado.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() =>
                    window.open(
                      'https://wa.me/+5513985994965?text=Olá! Quero um site premium com foco em conversão.',
                      '_blank'
                    )
                  }
                  className="rounded-full bg-[#194f45] px-7 py-6 text-base text-white hover:bg-[#163f38]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar no WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('mailto:falecom.jr.marketing@gmail.com', '_blank')}
                  className="rounded-full border-[#1e2124]/20 bg-transparent px-7 py-6 text-base text-[#1e2124]"
                >
                  Enviar e-mail
                </Button>
              </div>
            </div>

            <div data-reveal className="reveal reveal-delay-1 rounded-3xl bg-[#121417] p-6 text-[#f2f3ed]">
              <h3 className="font-display text-2xl">Resumo da proposta</h3>
              <div className="mt-6 space-y-4 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Prazo estimado</span>
                  <span className="font-semibold text-[#d4a357]">10 a 21 dias</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Entrega</span>
                  <span className="font-semibold text-[#d4a357]">Design + implementacao + publicacao</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span>Suporte inicial</span>
                  <span className="font-semibold text-[#d4a357]">30 dias inclusos</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1e2124]/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm text-[#2f353b]/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jota R Web. Todos os direitos reservados.</p>
          <p className="inline-flex items-center gap-1">
            Feito para empresas que querem escalar com qualidade.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
