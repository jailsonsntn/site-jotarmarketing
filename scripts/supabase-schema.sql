-- ================================================================
-- Jota R Marketing – Supabase Schema
-- Execute no SQL Editor do Supabase Dashboard:
-- https://supabase.com/dashboard → SQL Editor → New query
-- ================================================================

-- ----------------------------------------------------------------
-- Tabela: orcamentos (formulários de orçamento)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orcamentos (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          TEXT         NOT NULL,
  email         TEXT         NOT NULL,
  whatsapp      TEXT         NOT NULL,
  empresa       TEXT         NOT NULL,
  cidade        TEXT         NOT NULL DEFAULT 'Praia Grande',
  faturamento   TEXT,
  objetivo      TEXT         NOT NULL,
  prazo         TEXT         NOT NULL,
  mensagem      TEXT,
  origem_pagina TEXT         DEFAULT '/orcamento',
  status        TEXT         DEFAULT 'novo',
  created_at    TIMESTAMPTZ  DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- Tabela: blog_posts (CMS do blog)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT         UNIQUE NOT NULL,
  title       TEXT         NOT NULL,
  excerpt     TEXT,
  hook        TEXT,
  intro       TEXT,
  sections    JSONB        DEFAULT '[]'::jsonb,
  faq         JSONB        DEFAULT '[]'::jsonb,
  cta_text    TEXT,
  seo_focus   TEXT[]       DEFAULT '{}',
  published   BOOLEAN      DEFAULT true,
  created_at  TIMESTAMPTZ  DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- Trigger: atualiza updated_at automaticamente em blog_posts
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ----------------------------------------------------------------
-- Row Level Security (RLS)
-- ----------------------------------------------------------------

ALTER TABLE public.orcamentos  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts  ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------
-- Grants (privilégios de tabela/schema)
-- ----------------------------------------------------------------
-- Em alguns projetos os privilégios podem ter sido revogados manualmente.
-- Estes GRANTs garantem que anon/autenticado tenham acesso coerente com as policies.
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT INSERT ON TABLE public.orcamentos TO anon;
GRANT SELECT, UPDATE ON TABLE public.orcamentos TO authenticated;

GRANT SELECT ON TABLE public.blog_posts TO anon;
GRANT ALL ON TABLE public.blog_posts TO authenticated;

-- orcamentos: anon pode inserir (formulário público)
--             autenticado pode ler e atualizar status
DROP POLICY IF EXISTS "orcamentos_insert_anon"   ON public.orcamentos;
DROP POLICY IF EXISTS "orcamentos_insert_auth"   ON public.orcamentos;
DROP POLICY IF EXISTS "orcamentos_select_auth"   ON public.orcamentos;
DROP POLICY IF EXISTS "orcamentos_update_auth"   ON public.orcamentos;

CREATE POLICY "orcamentos_insert_anon"
  ON public.orcamentos FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "orcamentos_insert_auth"
  ON public.orcamentos FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "orcamentos_select_auth"
  ON public.orcamentos FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "orcamentos_update_auth"
  ON public.orcamentos FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- blog_posts: anon lê apenas posts publicados
--             autenticado tem acesso total (create, read, update, delete)
DROP POLICY IF EXISTS "blog_posts_select_anon" ON public.blog_posts;
DROP POLICY IF EXISTS "blog_posts_all_auth"    ON public.blog_posts;

CREATE POLICY "blog_posts_select_anon"
  ON public.blog_posts FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "blog_posts_all_auth"
  ON public.blog_posts FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ================================================================
-- COMO CRIAR O SUPERADMIN:
-- 1. Acesse: Supabase Dashboard → Authentication → Users
-- 2. Clique em "Add user" → "Create new user"
-- 3. Informe e-mail e senha
-- 4. Use essas credenciais na tela de login do painel /admin
-- ================================================================
