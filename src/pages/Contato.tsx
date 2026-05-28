import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';

const Contato = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/contato`;

    document.title = 'Contato | JR Marketing em Praia Grande';
    setCanonical(canonicalUrl);
    setMetaByName(
      'description',
      'Entre em contato com a JR Marketing em Praia Grande. Solicite análise gratuita para criação de site, SEO técnico e geração de leads.'
    );
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'Contato | JR Marketing em Praia Grande');
    setMetaByProperty(
      'og:description',
      'Fale com nossa equipe para projetos de criação de sites, SEO técnico e presença digital local.'
    );
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByName('twitter:title', 'Contato | JR Marketing em Praia Grande');
    setMetaByName(
      'twitter:description',
      'Canal direto para atendimento, orçamento e diagnóstico estratégico da sua presença digital.'
    );
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

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
              <li className="font-medium text-[#1e2124]">Contato</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-[2rem] border border-[#1e2124]/10 bg-white/80 p-8 shadow-[0_20px_55px_-28px_rgba(0,0,0,0.7)] backdrop-blur">
              <h1 className="font-display text-4xl leading-tight text-[#131518] md:text-5xl">Contato JR Marketing</h1>
              <p className="mt-5 text-base leading-relaxed text-[#2f353b]/90">
                Se você busca criação de sites em Praia Grande, SEO técnico ou uma estrutura digital para gerar mais contatos,
                fale com nossa equipe. Você pode enviar sua necessidade no formulário abaixo ou chamar diretamente no WhatsApp.
              </p>

              <div className="mt-8 space-y-3 text-sm text-[#2f353b]/90">
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#194f45]" />
                  <a href="tel:+5513985994965" className="font-semibold text-[#194f45] hover:underline">
                    +55 13 98599-4965
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-[#194f45]" />
                  <a
                    href="https://wa.me/+5513985994965?text=Olá! Vim pela página de contato e quero falar sobre meu projeto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#194f45] hover:underline"
                  >
                    Atendimento via WhatsApp
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#194f45]" />
                  Praia Grande - SP (atendimento para Baixada Santista e todo Brasil)
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <Input required name="nome" placeholder="Seu nome" className="bg-white/90" />
                <Input required name="email" type="email" placeholder="Seu melhor e-mail" className="bg-white/90" />
                <Input name="telefone" placeholder="WhatsApp" className="bg-white/90" />
                <Textarea
                  required
                  name="mensagem"
                  placeholder="Conte rapidamente o objetivo do seu projeto"
                  className="min-h-28 bg-white/90"
                />
                <Button type="submit" className="w-full rounded-full bg-[#bf5b2c] text-white hover:bg-[#a84f25]">
                  Enviar mensagem
                </Button>
              </form>

              {isSubmitted ? (
                <p className="mt-4 rounded-xl border border-[#194f45]/25 bg-[#194f45]/10 px-4 py-3 text-sm text-[#194f45]">
                  Mensagem registrada. Para acelerar, chame agora no WhatsApp e mencione seu segmento.
                </p>
              ) : null}
            </article>

            <aside className="rounded-[2rem] border border-[#1e2124]/10 bg-[#121417] p-5 text-[#f2f3ed] shadow-[0_26px_70px_-34px_rgba(0,0,0,0.8)] lg:p-8">
              <h2 className="font-display text-3xl">Atendimento e localização</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Nossa base está em Praia Grande e os projetos são conduzidos com atendimento consultivo. A reunião inicial é
                dedicada a entender meta comercial, público e contexto competitivo para montar a solução ideal.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Mapa de Praia Grande SP"
                  src="https://www.google.com/maps?q=Praia+Grande+SP&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p className="font-semibold text-[#d4a357]">Horário de atendimento</p>
                <p className="mt-2">Segunda a sexta: 09h às 18h</p>
                <p>Atendimento online para todo Brasil</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contato;