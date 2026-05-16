import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/data/blogPosts';
import { isSupabaseConfigured, supabase, type BlogPost } from '@/lib/supabase';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';

const Blog = () => {
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);
  const [dbErrorMessage, setDbErrorMessage] = useState('');

    useEffect(() => {
      if (!supabase || !isSupabaseConfigured) return;
      supabase
        .from('blog_posts')
        .select('id,slug,title,excerpt,published,created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error('Erro ao carregar blog_posts no site público:', error);
            setDbErrorMessage('Não foi possível carregar os posts do banco agora.');
            return;
          }

          setDbErrorMessage('');
          if (data && data.length > 0) setDbPosts(data as BlogPost[]);
        });
    }, []);

    // Mescla: posts do Supabase primeiro, depois os estáticos que não existem no Supabase
    const allPosts = [
      ...dbPosts,
      ...BLOG_POSTS.filter((p) => !dbPosts.some((d) => d.slug === p.slug)),
    ];

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/blog`;

    document.title = 'Blog de SEO Local e Conversão | JR Marketing';
    setCanonical(canonicalUrl);
    setMetaByName('description', 'Artigos sobre SEO local, conversão e performance para empresas de Praia Grande e região.');
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', 'Blog de SEO Local e Conversão | JR Marketing');
    setMetaByProperty('og:description', 'Conteúdos práticos para ranquear melhor e converter mais no digital.');
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByName('twitter:title', 'Blog de SEO Local e Conversão | JR Marketing');
    setMetaByName('twitter:description', 'Guias, comparativos e checklists para crescimento orgânico.');
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-[#1e2124]">
      <div className="mesh-gradient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      <PublicNavbar />
      <main className="px-5 pb-16 pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <header className="glass-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#194f45]">Conteúdo para ranqueamento</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-[#131518] md:text-5xl">
              Guias práticos de SEO local, conversão e performance.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#2f353b]/85">
              Conteúdo pensado para ajudar sua empresa a ganhar visibilidade no Google e transformar visitas em contatos qualificados.
            </p>

            <div className="mt-6">
              <Button
                onClick={() => window.open('https://wa.me/+5513985994965?text=Olá! Quero um checklist gratuito para melhorar meu site.', '_blank')}
                className="rounded-full bg-[#bf5b2c] px-6 text-white hover:bg-[#a84f25]"
              >
                Baixar checklist gratuito
              </Button>
            </div>
          </header>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            {allPosts.map((post) => (
              <article key={post.slug} className="glass-surface rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[#194f45]">Post publicado</p>
                <h2 className="mt-2 font-display text-2xl text-[#131518]">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#2f353b]/85">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-[#bf5b2c]">
                  Ler artigo
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            ))}
          </section>

          {dbErrorMessage ? (
            <p className="mt-4 text-sm text-[#a63f26]">{dbErrorMessage}</p>
          ) : null}

          <section className="mt-8 rounded-3xl border border-[#1e2124]/10 bg-[#121417] p-8 text-[#f2f3ed] lg:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#d4a357]">Próximo passo</p>
                <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
                  Quer um site que aparece no Google e converte visitas em clientes?
                </h2>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full bg-[#bf5b2c] px-7 text-white hover:bg-[#a84f25]">
                  <Link to="/orcamento">
                    Solicitar análise gratuita
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Blog;
