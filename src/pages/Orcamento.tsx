import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import { Button } from '@/components/ui/button';
import SiteFooter from '@/components/SiteFooter';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';
import { isSupabaseConfigured, supabase, type OrcamentoLead } from '@/lib/supabase';

const getLeadSubmitErrorMessage = (code?: string) => {
  if (code === '42501') {
    return 'Não foi possível enviar: o banco bloqueou a inserção (RLS). Verifique as policies da tabela orcamentos.';
  }

  if (code === '42P01') {
    return 'Não foi possível enviar: tabela orcamentos não encontrada no Supabase.';
  }

  return 'Não foi possível enviar agora. Tente novamente em alguns minutos.';
};

const Orcamento = () => {
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const initialState = useMemo<OrcamentoLead>(
    () => ({
      nome: '',
      email: '',
      whatsapp: '',
      empresa: '',
      cidade: 'Praia Grande',
      faturamento: '',
      objetivo: '',
      prazo: '',
      mensagem: '',
      origem_pagina: '/orcamento',
      status: 'novo',
    }),
    []
  );

  const [formData, setFormData] = useState<OrcamentoLead>(initialState);

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/orcamento`;

    document.title = 'Solicitar Orçamento de Site Profissional | JR Marketing';
    setCanonical(canonicalUrl);
    setMetaByName(
      'description',
      'Solicite um orçamento detalhado para criação de site premium com SEO técnico. Análise gratuita e proposta personalizada.'
    );
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'Solicitar Orçamento de Site Profissional  | JR Marketing');
    setMetaByProperty('og:description', 'Receba uma proposta completa para seu projeto digital com foco em conversão.');
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByName('twitter:title', 'Solicitar Orçamento de Site Profissional | JR Marketing');
    setMetaByName('twitter:description', 'Formulário B2B para qualificação e proposta comercial personalizada.');

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto custa um site profissional com SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O investimento varia conforme o escopo, o número de páginas e os recursos de SEO técnico necessários. Preencha o formulário para receber uma proposta personalizada sem compromisso.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual é o prazo médio para criação do site?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Em média entre 3 e 6 semanas, dependendo da complexidade do projeto. Sites mais simples podem ficar prontos em menos de 3 semanas.',
          },
        },
        {
          '@type': 'Question',
          name: 'O diagnóstico inicial é realmente gratuito?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Após o envio do formulário realizamos uma análise da situação digital da sua empresa sem custo e sem compromisso de contratação.',
          },
        },
        {
          '@type': 'Question',
          name: 'Atendem empresas fora de Praia Grande?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Atendemos toda a Baixada Santista e demais regiões do Brasil de forma remota, com reuniões por vídeo e entregas digitais.',
          },
        },
        {
          '@type': 'Question',
          name: 'O site fica ranqueando no Google após entregue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Entregamos o site já com SEO técnico implementado, metadados, schema markup, sitemap e canonical. Para escalar posições a estratégia de conteúdo e link building é discutida junto com o cliente.',
          },
        },
      ],
    };

    let script = document.getElementById('faq-orcamento-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-orcamento-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);

    return () => {
      document.getElementById('faq-orcamento-schema')?.remove();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setSending(true);

    const { error } = await supabase.from('orcamentos').insert({
      ...formData,
      origem_pagina: '/orcamento',
      status: 'novo',
    });

    setSending(false);

    if (error) {
      console.error('Erro ao inserir orçamento no Supabase:', error);
      setErrorMessage(getLeadSubmitErrorMessage(error.code));
      return;
    }

    setSuccessMessage('Solicitação enviada com sucesso. Vamos retornar com a análise gratuita.');
    setFormData(initialState);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#1e2124]">
      <div className="mesh-gradient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      <PublicNavbar />
      <main className="px-5 pb-16 pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto w-full max-w-6xl">
          <section className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
            <article className="glass-surface rounded-3xl p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1e2124]/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#194f45]">
                Formulário B2B
              </p>
              <h1 className="mt-5 font-display text-4xl leading-tight text-[#131518] md:text-5xl">
                Solicitar Orçamento de Site Profissional
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#2f353b]/85">
                Preencha os dados abaixo para receber uma proposta completa, com escopo, prazo e recomendações de SEO técnico para sua empresa.
              </p>

              <div className="mt-8 space-y-3 text-sm text-[#2f353b]/90">
                {[
                  'Diagnóstico inicial gratuito',
                  'Escopo sob medida para seu momento',
                  'Estimativa de prazo e investimento',
                ].map((item) => (
                  <p key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#194f45]" />
                    {item}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  onClick={() =>
                    window.open(
                      'https://wa.me/+5513985994965?text=Olá! Quero receber proposta pelo WhatsApp.',
                      '_blank'
                    )
                  }
                  className="w-full rounded-full bg-[#bf5b2c] px-5 text-sm text-white hover:bg-[#a84f25] sm:w-auto sm:px-6 sm:text-base"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="whitespace-normal text-left sm:whitespace-nowrap">Receber proposta pelo WhatsApp</span>
                </Button>
              </div>
            </article>

            <form onSubmit={handleSubmit} className="glass-surface rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]">
              <h2 className="font-display text-2xl text-[#131518]">Dados para qualificação</h2>
              <p className="mt-2 text-sm text-[#2f353b]/80">
                Preencha com dados reais da empresa para receber uma proposta mais precisa.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  Nome completo *
                  <input
                    required
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>

                <label className="text-sm">
                  Email corporativo *
                  <input
                    type="email"
                    required
                    placeholder="Digite seu melhor email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>

                <label className="text-sm">
                  WhatsApp *
                  <input
                    required
                    placeholder="DDD + número"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>

                <label className="text-sm">
                  Empresa *
                  <input
                    required
                    placeholder="Digite o nome da empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData((prev) => ({ ...prev, empresa: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>

                <label className="text-sm">
                  Cidade principal *
                  <input
                    required
                    placeholder="Ex.: Praia Grande"
                    value={formData.cidade}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cidade: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>

                <label className="text-sm">
                  Faixa de faturamento
                  <input
                    placeholder="Ex.: R$ 30 mil a R$ 80 mil/mês"
                    value={formData.faturamento ?? ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, faturamento: e.target.value }))}
                    className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm">
                Objetivo principal *
                <textarea
                  required
                  placeholder="Ex.: Quero gerar mais leads qualificados e melhorar posicionamento no Google para Praia Grande."
                  value={formData.objetivo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, objetivo: e.target.value }))}
                  className="mt-1 min-h-24 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                />
              </label>

              <label className="mt-4 block text-sm">
                Prazo desejado *
                <input
                  required
                  placeholder="Informe o prazo esperado"
                  value={formData.prazo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, prazo: e.target.value }))}
                  className="mt-1 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                />
              </label>

              <label className="mt-4 block text-sm">
                Observações
                <textarea
                  placeholder="Ex.: Tenho referência do site X, preciso integrar WhatsApp e formulário com CRM."
                  value={formData.mensagem ?? ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mensagem: e.target.value }))}
                  className="mt-1 min-h-24 w-full min-w-0 rounded-xl border border-[#1e2124]/20 px-3 py-2"
                />
              </label>

              {errorMessage ? <p className="mt-4 text-sm text-[#a63f26]">{errorMessage}</p> : null}
              {successMessage ? <p className="mt-4 text-sm text-[#194f45]">{successMessage}</p> : null}

              <Button type="submit" disabled={sending} className="mt-6 rounded-full bg-[#194f45] px-7 text-white hover:bg-[#163f38]">
                {sending ? 'Enviando...' : 'Solicitar análise gratuita agora'}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>

            </form>
          </section>
        </div>

        <section id="faq" className="mx-auto mt-12 w-full max-w-6xl px-0">
          <h2 className="font-display text-3xl text-[#131518]">Perguntas frequentes sobre orçamento</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                q: 'Quanto custa um site profissional com SEO?',
                a: 'O investimento varia conforme o escopo, o número de páginas e os recursos de SEO técnico. Preencha o formulário acima para receber uma proposta personalizada sem compromisso.',
              },
              {
                q: 'Qual é o prazo médio para criação do site?',
                a: 'Em média entre 3 e 6 semanas, dependendo da complexidade do projeto. Sites mais simples podem ficar prontos em menos de 3 semanas.',
              },
              {
                q: 'O diagnóstico inicial é realmente gratuito?',
                a: 'Sim. Após o envio do formulário realizamos uma análise da situação digital da sua empresa sem custo e sem compromisso de contratação.',
              },
              {
                q: 'Atendem empresas fora de Praia Grande?',
                a: 'Sim. Atendemos toda a Baixada Santista e demais regiões do Brasil de forma remota, com reuniões por vídeo e entregas digitais.',
              },
              {
                q: 'O site fica ranqueando no Google após entregue?',
                a: 'Entregamos o site com SEO técnico implementado, metadados, schema markup, sitemap e canonical. A estratégia de conteúdo e link building é discutida junto com o cliente.',
              },
              {
                q: 'Qual a diferença de um site feito por vocês e os de criador de site online?',
                a: 'Nossos projetos são desenvolvidos sob medida com código limpo, performance otimizada e SEO técnico real — não templates genéricos. Isso se reflete diretamente no ranqueamento e na conversão.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="glass-surface rounded-2xl p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)]">
                <h3 className="text-sm font-semibold text-[#131518]">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2f353b]/80">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Orcamento;
