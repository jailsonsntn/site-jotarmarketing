import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Download, LogOut, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/data/blogPosts';
import { SITE_URL, setCanonical, setMetaByName } from '@/lib/seo';
import { isSupabaseConfigured, supabase, type BlogPost, type OrcamentoLead } from '@/lib/supabase';

// ── helpers ───────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const STATIC_BLOG_PREFIX = 'static:';

function toLeadKey(lead: OrcamentoLead) {
  return lead.id ?? `${lead.email}-${lead.created_at ?? lead.nome}`;
}

function toStaticBlogPost() {
  return BLOG_POSTS.map((post) => ({
    id: `${STATIC_BLOG_PREFIX}${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    hook: post.hook,
    intro: post.intro,
    sections: post.sections,
    faq: post.faq,
    cta_text: post.ctaText,
    seo_focus: post.seoFocus,
    published: true,
  })) as BlogPost[];
}

function getWhatsappHref(value?: string) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '#';
  const normalized = digits.startsWith('55') ? digits : `55${digits}`;
  return `https://wa.me/${normalized}`;
}

type EditorState = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  hook: string;
  intro: string;
  cta_text: string;
  seo_focus: string;
  sections_json: string;
  faq_json: string;
  published: boolean;
};

const EMPTY_EDITOR: EditorState = {
  slug: '',
  title: '',
  excerpt: '',
  hook: '',
  intro: '',
  cta_text: '',
  seo_focus: '',
  sections_json: '[]',
  faq_json: '[{"question": "Pergunta aqui?", "answer": "Resposta aqui."}]',
  published: true,
};

function postToEditor(post: BlogPost): EditorState {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    hook: post.hook ?? '',
    intro: post.intro ?? '',
    cta_text: post.cta_text ?? '',
    seo_focus: (post.seo_focus ?? []).join(', '),
    sections_json: JSON.stringify(post.sections ?? [], null, 2),
    faq_json: JSON.stringify(post.faq ?? [], null, 2),
    published: post.published ?? true,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'blog' | 'leads'>('blog');

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState('');
  const [blogSourceMessage, setBlogSourceMessage] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editor, setEditor] = useState<EditorState>(EMPTY_EDITOR);
  const [editorError, setEditorError] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Leads state
  const [leads, setLeads] = useState<OrcamentoLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState('');
  const [searchLeads, setSearchLeads] = useState('');
  const [selectedLeadKey, setSelectedLeadKey] = useState('');
  const [updatingLeadKey, setUpdatingLeadKey] = useState('');
  const [deletingLeadKey, setDeletingLeadKey] = useState('');

  useEffect(() => {
    document.title = 'Admin | JR Marketing';
    setCanonical(`${SITE_URL}/admin`);
    setMetaByName('robots', 'noindex,nofollow');
  }, []);

  // Auth listener
  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      void loadBlogPosts();
      void loadLeads();
    }
  }, [session]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const signIn = async () => {
    if (!supabase) return;
    setAuthError('');
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (error) setAuthError('E-mail ou senha incorretos.');
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  // ── Blog ──────────────────────────────────────────────────────────────────

  const loadBlogPosts = async () => {
    if (!supabase) return;
    setBlogLoading(true);
    setBlogError('');
    setBlogSourceMessage('');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setBlogLoading(false);
    if (error) { setBlogError('Erro ao carregar posts. Verifique as policies RLS.'); return; }

    const dbPosts = (data ?? []) as BlogPost[];
    if (dbPosts.length > 0) {
      setBlogPosts(dbPosts);
      return;
    }

    setBlogPosts(toStaticBlogPost());
    setBlogSourceMessage('Nenhum post encontrado no banco. Exibindo posts locais do projeto.');
  };

  const openNewPost = () => {
    setEditor(EMPTY_EDITOR);
    setEditorError('');
    setShowEditor(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditor(postToEditor(post));
    setEditorError('');
    setShowEditor(true);
  };

  const savePost = async () => {
    if (!supabase) return;
    setEditorError('');

    let sections: unknown, faq: unknown;
    try { sections = JSON.parse(editor.sections_json); } catch { setEditorError('Sections: JSON inválido. Corrija e tente novamente.'); return; }
    try { faq = JSON.parse(editor.faq_json); } catch { setEditorError('FAQ: JSON inválido. Corrija e tente novamente.'); return; }

    if (!editor.title.trim() || !editor.slug.trim()) {
      setEditorError('Título e slug são obrigatórios.');
      return;
    }

    const payload = {
      slug: editor.slug.trim(),
      title: editor.title.trim(),
      excerpt: editor.excerpt.trim() || null,
      hook: editor.hook.trim() || null,
      intro: editor.intro.trim() || null,
      cta_text: editor.cta_text.trim() || null,
      seo_focus: editor.seo_focus
        ? editor.seo_focus.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      sections,
      faq,
      published: editor.published,
    };

    setSavingPost(true);
    const isStaticPost = Boolean(editor.id?.startsWith(STATIC_BLOG_PREFIX));
    const res = editor.id && !isStaticPost
      ? await supabase.from('blog_posts').update(payload).eq('id', editor.id)
      : await supabase.from('blog_posts').upsert(payload, { onConflict: 'slug' });
    setSavingPost(false);

    if (res.error) {
      setEditorError(
        res.error.code === '23505'
          ? 'Já existe um post com esse slug. Use um slug diferente.'
          : 'Erro ao salvar. Verifique os campos e tente novamente.'
      );
      return;
    }

    setShowEditor(false);
    void loadBlogPosts();
  };

  const deletePost = async (id: string) => {
    if (!supabase || !window.confirm('Excluir este post permanentemente?')) return;
    if (id.startsWith(STATIC_BLOG_PREFIX)) {
      setBlogError('Este é um post local. Para remover, edite src/data/blogPosts.ts.');
      return;
    }
    setDeletingId(id);
    await supabase.from('blog_posts').delete().eq('id', id);
    setDeletingId(null);
    void loadBlogPosts();
  };

  // ── Leads ─────────────────────────────────────────────────────────────────

  const loadLeads = async () => {
    if (!supabase) return;
    setLeadsLoading(true);
    setLeadsError('');
    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    setLeadsLoading(false);
    if (error) { setLeadsError('Erro ao carregar formulários. Verifique as policies RLS.'); return; }
    setLeads((data ?? []) as OrcamentoLead[]);
  };

  const filteredLeads = useMemo(() => {
    const term = searchLeads.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter((r) =>
      [r.nome, r.email, r.empresa, r.cidade, r.whatsapp].some((v) =>
        String(v ?? '').toLowerCase().includes(term)
      )
    );
  }, [leads, searchLeads]);

  useEffect(() => {
    if (filteredLeads.length === 0) {
      setSelectedLeadKey('');
      return;
    }

    const exists = filteredLeads.some((lead) => toLeadKey(lead) === selectedLeadKey);
    if (!exists) {
      setSelectedLeadKey(toLeadKey(filteredLeads[0]));
    }
  }, [filteredLeads, selectedLeadKey]);

  const selectedLead = useMemo(() => {
    if (!selectedLeadKey) return null;
    return filteredLeads.find((lead) => toLeadKey(lead) === selectedLeadKey) ?? null;
  }, [filteredLeads, selectedLeadKey]);

  const updateLeadStatus = async (lead: OrcamentoLead, status: string) => {
    const key = toLeadKey(lead);
    setUpdatingLeadKey(key);
    setLeadsError('');

    if (!supabase || !lead.id) {
      setLeads((prev) => prev.map((row) => (toLeadKey(row) === key ? { ...row, status } : row)));
      setUpdatingLeadKey('');
      return;
    }

    const { error } = await supabase.from('orcamentos').update({ status }).eq('id', lead.id);

    if (error) {
      setLeadsError('Não foi possível atualizar o status deste lead agora.');
      setUpdatingLeadKey('');
      return;
    }

    setLeads((prev) => prev.map((row) => (row.id === lead.id ? { ...row, status } : row)));
    setUpdatingLeadKey('');
  };

  const deleteLead = async (lead: OrcamentoLead) => {
    if (!window.confirm(`Excluir lead de ${lead.nome}? Esta ação não pode ser desfeita.`)) return;

    const key = toLeadKey(lead);
    setDeletingLeadKey(key);
    setLeadsError('');

    if (!supabase || !lead.id) {
      setLeads((prev) => prev.filter((row) => toLeadKey(row) !== key));
      setDeletingLeadKey('');
      return;
    }

    const { error } = await supabase.from('orcamentos').delete().eq('id', lead.id);

    if (error) {
      setLeadsError('Não foi possível excluir este lead agora.');
      setDeletingLeadKey('');
      return;
    }

    setLeads((prev) => prev.filter((row) => row.id !== lead.id));
    setDeletingLeadKey('');
  };

  const exportCsv = () => {
    const header = ['created_at', 'nome', 'email', 'whatsapp', 'empresa', 'cidade', 'faturamento', 'objetivo', 'prazo', 'status', 'origem_pagina'];
    const lines = filteredLeads.map((r) =>
      [r.created_at ?? '', r.nome, r.email, r.whatsapp, r.empresa, r.cidade, r.faturamento ?? '', r.objetivo, r.prazo, r.status ?? '', r.origem_pagina ?? '']
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(',')
    );
    const csv = [header.join(','), ...lines].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ── Render: carregando ────────────────────────────────────────────────────

  if (authLoading) return <div className="min-h-screen bg-[#f7f6f2]" />;

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#1e2124]/10 bg-white p-8 text-center">
          <h1 className="font-display text-2xl text-[#131518]">Supabase não configurado</h1>
          <p className="mt-3 text-sm text-[#2f353b]/80">
            Defina <code className="rounded bg-[#f1efe7] px-1">VITE_SUPABASE_URL</code> e{' '}
            <code className="rounded bg-[#f1efe7] px-1">VITE_SUPABASE_ANON_KEY</code> no arquivo <code className="rounded bg-[#f1efe7] px-1">.env</code>.
          </p>
          <Link to="/" className="mt-5 inline-block text-sm text-[#194f45] underline">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Render: login ─────────────────────────────────────────────────────────

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#1e2124]/10 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#194f45]">Painel interno</p>
          <h1 className="mt-2 font-display text-3xl text-[#131518]">Admin</h1>
          <p className="mt-2 text-sm text-[#2f353b]/70">
            Acesse com o e-mail e senha cadastrados no Supabase.
          </p>

          <label className="mt-6 block text-sm">
            E-mail
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void signIn()}
              className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
            />
          </label>

          <label className="mt-4 block text-sm">
            Senha
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void signIn()}
              className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
            />
          </label>

          {authError ? <p className="mt-3 text-sm text-[#a63f26]">{authError}</p> : null}

          <Button
            onClick={() => void signIn()}
            disabled={signingIn}
            className="mt-5 w-full rounded-full bg-[#194f45] text-white hover:bg-[#163f38]"
          >
            {signingIn ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="mt-5 text-xs text-[#2f353b]/50">
            Para criar o superadmin: Supabase Dashboard → Authentication → Users → Add user.
          </p>
          <Link to="/" className="mt-2 block text-xs text-[#194f45] underline">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Render: painel ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1e2124]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#1e2124]/10 bg-white/95 px-5 py-3 backdrop-blur lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <span className="font-display text-xl text-[#131518]">Admin — JR Marketing</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#2f353b]/50 sm:block">{session.user.email}</span>
            <Button
              onClick={() => void signOut()}
              variant="outline"
              size="sm"
              className="rounded-full border-[#1e2124]/20 text-sm"
            >
              <LogOut className="mr-1 h-3 w-3" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="px-5 py-8 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Tabs */}
          <div className="mb-6 flex gap-2">
            {(['blog', 'leads'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowEditor(false); }}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1e2124] text-white'
                    : 'border border-[#1e2124]/20 bg-white text-[#1e2124] hover:bg-[#f1efe7]'
                }`}
              >
                {tab === 'blog' ? 'Blog' : 'Formulários'}
              </button>
            ))}
          </div>

          {/* ── BLOG: lista ─────────────────────────────────────────────── */}
          {activeTab === 'blog' && !showEditor && (
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-[#131518]">Posts do Blog</h2>
                <div className="flex gap-2">
                  <Button
                    onClick={() => void loadBlogPosts()}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-[#1e2124]/20"
                    title="Atualizar lista"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={openNewPost}
                    className="rounded-full bg-[#194f45] text-white hover:bg-[#163f38]"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Novo post
                  </Button>
                </div>
              </div>

              {blogLoading && <p className="text-sm text-[#2f353b]/70">Carregando...</p>}
              {blogError && <p className="text-sm text-[#a63f26]">{blogError}</p>}
              {blogSourceMessage && <p className="text-sm text-[#2f353b]/70">{blogSourceMessage}</p>}

              {!blogLoading && blogPosts.length === 0 && !blogError && (
                <div className="rounded-3xl border border-dashed border-[#1e2124]/20 p-12 text-center">
                  <p className="text-sm text-[#2f353b]/50">
                    Nenhum post ainda. Clique em "Novo post" para criar o primeiro.
                  </p>
                </div>
              )}

              {blogPosts.length > 0 && (
                <div className="overflow-hidden rounded-3xl border border-[#1e2124]/10 bg-white">
                  <div className="overflow-auto">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead className="bg-[#f1efe7] text-left text-[#1e2124]">
                        <tr>
                          <th className="px-4 py-3">Título</th>
                          <th className="px-4 py-3">Slug</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Criado em</th>
                          <th className="px-4 py-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts.map((post) => (
                          <tr
                            key={post.id}
                            className="border-t border-[#1e2124]/10 hover:bg-[#f7f6f2]"
                          >
                            <td className="max-w-xs truncate px-4 py-3 font-medium">
                              {post.title}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-[#2f353b]/60">
                              {post.slug}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  post.published
                                    ? 'bg-[#d4f4ed] text-[#194f45]'
                                    : 'bg-[#f4e4d4] text-[#bf5b2c]'
                                }`}
                              >
                                {post.published ? 'Publicado' : 'Rascunho'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-[#2f353b]/50">
                              {post.created_at
                                ? new Date(post.created_at).toLocaleDateString('pt-BR')
                                : post.id?.startsWith(STATIC_BLOG_PREFIX)
                                ? 'Post local'
                                : '-'}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1">
                                <a
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Ver post publicado"
                                  className="inline-flex items-center rounded-lg px-2 py-1 text-xs text-[#194f45] hover:bg-[#f1efe7]"
                                >
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEditPost(post)}
                                  className="h-auto rounded-lg border-[#1e2124]/20 px-2 py-1 text-xs"
                                  title="Editar"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => void deletePost(post.id!)}
                                  disabled={deletingId === post.id || post.id?.startsWith(STATIC_BLOG_PREFIX)}
                                  className="h-auto rounded-lg border-[#a63f26]/30 px-2 py-1 text-xs text-[#a63f26] hover:bg-[#fdf0ec]"
                                  title="Excluir"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── BLOG: editor ────────────────────────────────────────────── */}
          {activeTab === 'blog' && showEditor && (
            <section>
              <div className="mb-6 flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditor(false)}
                  className="rounded-full border-[#1e2124]/20 text-sm"
                >
                  ← Voltar
                </Button>
                <h2 className="font-display text-2xl text-[#131518]">
                  {editor.id ? 'Editar post' : 'Novo post'}
                </h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Coluna esquerda: campos principais */}
                <div className="space-y-4 rounded-3xl border border-[#1e2124]/10 bg-white p-6">
                  <h3 className="font-semibold text-[#131518]">Informações principais</h3>

                  <label className="block text-sm">
                    Título *
                    <input
                      value={editor.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setEditor((prev) => ({
                          ...prev,
                          title,
                          slug: prev.id ? prev.slug : slugify(title),
                        }));
                      }}
                      placeholder="Título do post"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    Slug * <span className="text-[#2f353b]/50">(URL: /blog/slug)</span>
                    <input
                      value={editor.slug}
                      onChange={(e) => setEditor((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="meu-post-exemplo"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2 font-mono text-sm"
                    />
                  </label>

                  <label className="block text-sm">
                    Resumo (excerpt)
                    <textarea
                      value={editor.excerpt}
                      onChange={(e) => setEditor((prev) => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      placeholder="Breve descrição que aparece na listagem e nos meta tags"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    Hook (frase de abertura)
                    <textarea
                      value={editor.hook}
                      onChange={(e) => setEditor((prev) => ({ ...prev, hook: e.target.value }))}
                      rows={2}
                      placeholder="Frase impactante no início do artigo"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    Introdução
                    <textarea
                      value={editor.intro}
                      onChange={(e) => setEditor((prev) => ({ ...prev, intro: e.target.value }))}
                      rows={5}
                      placeholder="Parágrafo introdutório do artigo"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    Texto do CTA (botão de conversão)
                    <input
                      value={editor.cta_text}
                      onChange={(e) => setEditor((prev) => ({ ...prev, cta_text: e.target.value }))}
                      placeholder="ex: Quero um site que aparece no Google"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="block text-sm">
                    SEO Focus{' '}
                    <span className="text-[#2f353b]/50">(palavras separadas por vírgula)</span>
                    <input
                      value={editor.seo_focus}
                      onChange={(e) => setEditor((prev) => ({ ...prev, seo_focus: e.target.value }))}
                      placeholder="ex: seo local, site profissional, praia grande"
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editor.published}
                      onChange={(e) =>
                        setEditor((prev) => ({ ...prev, published: e.target.checked }))
                      }
                      className="rounded"
                    />
                    Publicado (visível no blog)
                  </label>
                </div>

                {/* Coluna direita: conteúdo avançado */}
                <div className="space-y-4 rounded-3xl border border-[#1e2124]/10 bg-white p-6">
                  <h3 className="font-semibold text-[#131518]">Conteúdo avançado (JSON)</h3>
                  <p className="text-xs text-[#2f353b]/60">
                    Edite como JSON. Cada section tem: heading, intro?, subsections?, bullets?
                  </p>

                  <label className="block text-sm">
                    Seções do artigo (JSON)
                    <textarea
                      value={editor.sections_json}
                      onChange={(e) =>
                        setEditor((prev) => ({ ...prev, sections_json: e.target.value }))
                      }
                      rows={12}
                      spellCheck={false}
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2 font-mono text-xs leading-relaxed"
                    />
                  </label>

                  <label className="block text-sm">
                    FAQ (JSON)
                    <textarea
                      value={editor.faq_json}
                      onChange={(e) =>
                        setEditor((prev) => ({ ...prev, faq_json: e.target.value }))
                      }
                      rows={8}
                      spellCheck={false}
                      className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2 font-mono text-xs leading-relaxed"
                    />
                    <span className="mt-1 block text-xs text-[#2f353b]/50">
                      {`[{"question": "Pergunta?", "answer": "Resposta."}]`}
                    </span>
                  </label>
                </div>
              </div>

              {editorError ? (
                <p className="mt-4 text-sm text-[#a63f26]">{editorError}</p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => void savePost()}
                  disabled={savingPost}
                  className="rounded-full bg-[#194f45] px-8 text-white hover:bg-[#163f38]"
                >
                  {savingPost
                    ? 'Salvando...'
                    : editor.id
                    ? 'Salvar alterações'
                    : 'Publicar post'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditor(false)}
                  className="rounded-full border-[#1e2124]/20"
                >
                  Cancelar
                </Button>
              </div>
            </section>
          )}

          {/* ── LEADS ───────────────────────────────────────────────────── */}
          {activeTab === 'leads' && (
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-[#131518]">
                  Formulários recebidos{' '}
                  {leads.length > 0 && (
                    <span className="ml-2 rounded-full bg-[#f1efe7] px-2 py-0.5 text-sm font-normal text-[#2f353b]/70">
                      {leads.length}
                    </span>
                  )}
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={() => void loadLeads()}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-[#1e2124]/20"
                    title="Atualizar"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={exportCsv}
                    className="rounded-full bg-[#bf5b2c] text-white hover:bg-[#a84f25]"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Exportar CSV
                  </Button>
                </div>
              </div>

              <input
                placeholder="Buscar por nome, email, empresa ou cidade"
                value={searchLeads}
                onChange={(e) => setSearchLeads(e.target.value)}
                className="mb-4 w-full max-w-md rounded-xl border border-[#1e2124]/20 bg-white px-3 py-2 text-sm"
              />

              {leadsLoading && <p className="text-sm text-[#2f353b]/70">Carregando...</p>}
              {leadsError && <p className="text-sm text-[#a63f26]">{leadsError}</p>}

              {!leadsLoading && filteredLeads.length === 0 && !leadsError && (
                <p className="text-sm text-[#2f353b]/50">Nenhum formulário encontrado.</p>
              )}

              {filteredLeads.length > 0 && (
                <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
                  <aside className="max-h-[70vh] overflow-auto rounded-3xl border border-[#1e2124]/10 bg-white p-3">
                    <p className="px-2 pb-2 text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Pipeline de leads</p>
                    <div className="space-y-2">
                      {filteredLeads.map((lead) => {
                        const key = toLeadKey(lead);
                        const active = selectedLeadKey === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedLeadKey(key)}
                            className={`w-full rounded-2xl border px-3 py-3 text-left transition-colors ${
                              active
                                ? 'border-[#194f45]/35 bg-[#eef7f4]'
                                : 'border-[#1e2124]/10 bg-white hover:bg-[#f7f6f2]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="line-clamp-1 text-sm font-semibold text-[#131518]">{lead.nome}</p>
                              <span className="rounded-full bg-[#f1efe7] px-2 py-0.5 text-[11px] text-[#2f353b]/80">
                                {lead.status ?? 'novo'}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-1 text-xs text-[#2f353b]/80">{lead.empresa} • {lead.cidade}</p>
                            <p className="mt-2 text-[11px] text-[#2f353b]/60">
                              {lead.created_at ? new Date(lead.created_at).toLocaleString('pt-BR') : '-'}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </aside>

                  <article className="rounded-3xl border border-[#1e2124]/10 bg-white p-6">
                    {!selectedLead ? (
                      <p className="text-sm text-[#2f353b]/70">Selecione um lead para visualizar os detalhes.</p>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#1e2124]/10 pb-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Lead</p>
                            <h3 className="font-display text-3xl text-[#131518]">{selectedLead.nome}</h3>
                            <p className="mt-1 text-sm text-[#2f353b]/80">{selectedLead.empresa} • {selectedLead.cidade}</p>
                          </div>

                          <label className="text-sm">
                            Status
                            <select
                              value={selectedLead.status ?? 'novo'}
                              disabled={updatingLeadKey === toLeadKey(selectedLead)}
                              onChange={(e) => void updateLeadStatus(selectedLead, e.target.value)}
                              className="ml-2 rounded-xl border border-[#1e2124]/20 bg-white px-3 py-2 text-sm"
                            >
                              {['novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-[#1e2124]/10 bg-[#f7f6f2] p-4">
                            <p className="text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Contato</p>
                            <p className="mt-2 text-sm"><strong>Email:</strong> {selectedLead.email}</p>
                            <p className="mt-1 text-sm"><strong>WhatsApp:</strong> {selectedLead.whatsapp}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a
                                href={`mailto:${selectedLead.email}`}
                                className="rounded-full border border-[#1e2124]/20 px-3 py-1 text-xs hover:bg-white"
                              >
                                Enviar email
                              </a>
                              <a
                                href={getWhatsappHref(selectedLead.whatsapp)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-[#1e2124]/20 px-3 py-1 text-xs hover:bg-white"
                              >
                                Abrir WhatsApp
                              </a>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-[#1e2124]/10 bg-[#f7f6f2] p-4">
                            <p className="text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Qualificação</p>
                            <p className="mt-2 text-sm"><strong>Faturamento:</strong> {selectedLead.faturamento ?? '-'}</p>
                            <p className="mt-1 text-sm"><strong>Prazo:</strong> {selectedLead.prazo}</p>
                            <p className="mt-1 text-sm"><strong>Origem:</strong> {selectedLead.origem_pagina ?? '-'}</p>
                            <p className="mt-1 text-sm">
                              <strong>Data:</strong>{' '}
                              {selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString('pt-BR') : '-'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-[#1e2124]/10 bg-[#f7f6f2] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Objetivo</p>
                          <p className="mt-2 text-sm leading-relaxed text-[#1e2124]">{selectedLead.objetivo}</p>
                        </div>

                        <div className="mt-4 rounded-2xl border border-[#1e2124]/10 bg-[#f7f6f2] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[#2f353b]/60">Mensagem</p>
                          <p className="mt-2 text-sm leading-relaxed text-[#1e2124]">{selectedLead.mensagem || 'Sem observações adicionais.'}</p>
                        </div>

                        <div className="mt-5 flex justify-end">
                          <Button
                            variant="outline"
                            disabled={deletingLeadKey === toLeadKey(selectedLead)}
                            onClick={() => void deleteLead(selectedLead)}
                            className="rounded-full border-[#a63f26]/35 text-[#a63f26] hover:bg-[#fdf0ec]"
                          >
                            {deletingLeadKey === toLeadKey(selectedLead) ? 'Excluindo...' : 'Excluir lead'}
                          </Button>
                        </div>
                      </>
                    )}
                  </article>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
