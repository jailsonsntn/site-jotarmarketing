import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type OrcamentoLead = {
  id?: string;
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  cidade: string;
  faturamento?: string;
  objetivo: string;
  prazo: string;
  mensagem?: string;
  origem_pagina?: string;
  status?: string;
  created_at?: string;
};

export type DbBlogSection = {
  heading: string;
  intro?: string;
  subsections?: Array<{ subtitle: string; paragraphs: string[] }>;
  bullets?: string[];
};

export type DbBlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  hook?: string;
  intro?: string;
  sections?: DbBlogSection[];
  faq?: DbBlogFaqItem[];
  cta_text?: string;
  seo_focus?: string[];
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};
