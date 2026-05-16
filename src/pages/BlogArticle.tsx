import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS_BY_SLUG, type BlogPostContent } from '@/data/blogPosts';
import { SITE_URL, setCanonical, setMetaByName, setMetaByProperty } from '@/lib/seo';
import { isSupabaseConfigured, supabase, type BlogPost } from '@/lib/supabase';

function dbPostToContent(p: BlogPost): BlogPostContent {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    seoFocus: p.seo_focus ?? [],
    hook: p.hook ?? '',
    intro: p.intro ?? '',
    sections: (p.sections ?? []) as BlogPostContent['sections'],
    faq: (p.faq ?? []) as BlogPostContent['faq'],
    ctaText: p.cta_text ?? 'Solicitar análise gratuita agora',
  };
}

const BlogArticle = () => {
  const { slug } = useParams();
  const staticPost = slug ? BLOG_POSTS_BY_SLUG[slug] : null;
  const [dbPost, setDbPost] = useState<BlogPostContent | null>(null);
  const [dbLoading, setDbLoading] = useState(!staticPost && Boolean(slug));
  const [notFound, setNotFound] = useState(false);
  const [dbErrorMessage, setDbErrorMessage] = useState('');

  useEffect(() => {
    if (staticPost || !slug || !supabase || !isSupabaseConfigured) {
      setDbLoading(false);
      return;
    }
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error('Erro ao carregar artigo do blog no site público:', error);
          setDbErrorMessage('Não foi possível carregar este artigo agora.');
          setDbLoading(false);
          return;
        }

        setDbErrorMessage('');
        if (data) {
          setDbPost(dbPostToContent(data as BlogPost));
        } else {
          setNotFound(true);
        }
        setDbLoading(false);
      });
  }, [slug, staticPost]);

  const post = staticPost ?? dbPost;

  useEffect(() => {
    if (!post) {
      return;
    }

    const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

    document.title = `${post.title} | JR Marketing`;
    setCanonical(canonicalUrl);
    setMetaByName('description', post.excerpt);
    setMetaByName('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMetaByProperty('og:title', `${post.title} | JR Marketing`);
    setMetaByProperty('og:description', post.excerpt);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:type', 'article');
    setMetaByName('twitter:title', `${post.title} | JR Marketing`);
    setMetaByName('twitter:description', post.excerpt);

    const oldScript = document.getElementById('blog-post-jsonld');
    if (oldScript) {
      oldScript.remove();
    }

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          mainEntityOfPage: canonicalUrl,
          author: {
            '@type': 'Organization',
            name: 'JR Marketing',
          },
          publisher: {
            '@type': 'Organization',
            name: 'JR Marketing',
          },
          inLanguage: 'pt-BR',
          keywords: post.seoFocus?.join(', '),
        },
        {
          '@type': 'FAQPage',
          mainEntity: post.faq?.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    };

    const script = document.createElement('script');
    script.id = 'blog-post-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('blog-post-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [post, dbLoading]);

  if (dbLoading) {
    return <div className="min-h-screen bg-[#f7f6f2]" />;
  }

  if (!post || notFound) {
    if (dbErrorMessage) {
      return (
        <div className="min-h-screen bg-[#f7f6f2] px-5 py-20 text-[#1e2124] lg:px-8">
          <div className="mx-auto w-full max-w-3xl rounded-3xl border border-[#1e2124]/10 bg-white p-8">
            <h1 className="font-display text-3xl text-[#131518]">Erro ao carregar artigo</h1>
            <p className="mt-3 text-sm text-[#a63f26]">{dbErrorMessage}</p>
            <p className="mt-4 text-sm text-[#2f353b]/80">
              Verifique as policies RLS da tabela blog_posts para leitura pública de posts publicados.
            </p>
            <Link to="/blog" className="mt-6 inline-flex text-sm font-semibold text-[#bf5b2c] hover:underline">
              Voltar para o blog
            </Link>
          </div>
        </div>
      );
    }

    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1e2124]">
      <PublicNavbar />
      <main className="px-5 pb-16 pt-24 lg:px-8 lg:pt-28">
        <article className="mx-auto w-full max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#2f353b]/80">
              <li>
                <Link to="/" className="hover:text-[#1e2124] hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="hover:text-[#1e2124] hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-[#1e2124]">Artigo</li>
            </ol>
          </nav>

          <header className="glass-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#194f45]">Blog JR Marketing</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-[#131518] md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-[#2f353b]/85">{post.hook}</p>
            <p className="mt-4 text-base leading-relaxed text-[#2f353b]/85">{post.intro}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.seoFocus.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-[#1e2124]/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#2f353b]/80"
                >
                  {term}
                </span>
              ))}
            </div>
          </header>

          <section className="mt-8 space-y-5">
            {post.sections.map((section) => (
              <section key={section.heading} className="glass-surface rounded-3xl p-8">
                <h2 className="font-display text-3xl text-[#131518]">{section.heading}</h2>

                {section.intro ? <p className="mt-4 text-base leading-relaxed text-[#2f353b]/85">{section.intro}</p> : null}

                {section.subsections?.map((sub) => (
                  <div key={sub.subtitle} className="mt-5">
                    <h3 className="font-display text-2xl text-[#131518]">{sub.subtitle}</h3>
                    <div className="mt-3 space-y-3">
                      {sub.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-relaxed text-[#2f353b]/85">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-2 text-base text-[#2f353b]/90">
                    {section.bullets.map((item) => (
                      <li key={item} className="list-inside list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </section>

          <section className="glass-surface mt-8 rounded-3xl p-8">
            <h2 className="font-display text-3xl text-[#131518]">Perguntas frequentes</h2>
            <div className="mt-5 space-y-4">
              {post.faq.map((item) => (
                <div key={item.question} className="glass-surface rounded-2xl p-4">
                  <h3 className="text-base font-semibold text-[#131518]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2f353b]/85">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#1e2124]/10 bg-[#121417] p-8 text-[#f2f3ed]">
            <h2 className="font-display text-3xl">Pronto para melhorar sua presença digital?</h2>
            <p className="mt-3 text-sm text-white/80">
              Receba um plano objetivo de SEO local e conversão para sua empresa em Praia Grande, Santos e região.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#bf5b2c] text-white hover:bg-[#a84f25]">
                <Link to="/orcamento">
                  {post.ctaText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    'https://wa.me/+5513985994965?text=Olá! Li o artigo do blog e quero uma análise da minha presença digital.',
                    '_blank'
                  )
                }
                variant="outline"
                className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar no WhatsApp
              </Button>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogArticle;
