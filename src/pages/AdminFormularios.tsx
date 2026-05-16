import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SITE_URL, setCanonical, setMetaByName } from '@/lib/seo';
import { isSupabaseConfigured, supabase, type OrcamentoLead } from '@/lib/supabase';

const AdminFormularios = () => {
  const [accessKey, setAccessKey] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState<OrcamentoLead[]>([]);

  const expectedAccessKey = import.meta.env.VITE_ADMIN_ACCESS_KEY as string | undefined;

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/admin/formularios`;

    document.title = 'Admin de Formulários | JR Marketing';
    setCanonical(canonicalUrl);
    setMetaByName('description', 'Painel interno de leads recebidos via formulário de orçamento.');
    setMetaByName('robots', 'noindex,nofollow');
  }, []);

  const loadRows = async () => {
    if (!supabase || !isSupabaseConfigured) {
      setErrorMessage('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300);

    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao carregar formulários. Verifique permissão da tabela orcamentos.');
      return;
    }

    setRows((data ?? []) as OrcamentoLead[]);
  };

  useEffect(() => {
    if (authorized) {
      void loadRows();
    }
  }, [authorized]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return rows;
    }

    return rows.filter((item) => {
      return [item.nome, item.email, item.empresa, item.cidade, item.whatsapp]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [rows, searchTerm]);

  const exportCsv = () => {
    const header = [
      'created_at',
      'nome',
      'email',
      'whatsapp',
      'empresa',
      'cidade',
      'faturamento',
      'objetivo',
      'prazo',
      'status',
      'origem_pagina',
    ];

    const lines = filteredRows.map((row) =>
      [
        row.created_at ?? '',
        row.nome,
        row.email,
        row.whatsapp,
        row.empresa,
        row.cidade,
        row.faturamento ?? '',
        row.objetivo,
        row.prazo,
        row.status ?? '',
        row.origem_pagina ?? '',
      ]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(',')
    );

    const csvContent = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'formularios-orcamento.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const unlockPanel = () => {
    if (!expectedAccessKey) {
      setAuthorized(true);
      return;
    }

    if (accessKey === expectedAccessKey) {
      setAuthorized(true);
      setErrorMessage('');
      return;
    }

    setErrorMessage('Chave de acesso inválida.');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] px-5 py-16 lg:px-8">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-[#1e2124]/10 bg-white p-8">
          <h1 className="font-display text-3xl text-[#131518]">Admin de Formulários</h1>
          <p className="mt-3 text-sm text-[#2f353b]/80">
            Esta área é interna e está marcada como noindex para mecanismos de busca.
          </p>

          <label className="mt-6 block text-sm">
            Chave de acesso
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#1e2124]/20 px-3 py-2"
            />
          </label>

          <Button onClick={unlockPanel} className="mt-5 rounded-full bg-[#194f45] px-6 text-white hover:bg-[#163f38]">
            Acessar painel
          </Button>

          {errorMessage ? <p className="mt-4 text-sm text-[#a63f26]">{errorMessage}</p> : null}

          <p className="mt-4 text-xs text-[#2f353b]/70">
            Defina VITE_ADMIN_ACCESS_KEY para ativar proteção por senha no cliente.
          </p>

          <p className="mt-4 text-xs text-[#2f353b]/70">
            Para segurança completa, proteja esta rota no backend e use policies RLS no Supabase.
          </p>

          <p className="mt-4 text-xs text-[#2f353b]/70">
            <Link to="/" className="underline">
              Voltar para Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1e2124] px-5 py-10 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-[#2f353b]/80">
            <li>
              <Link to="/" className="hover:text-[#1e2124] hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1e2124]">Admin Formulários</li>
          </ol>
        </nav>

        <header className="rounded-3xl border border-[#1e2124]/10 bg-white p-6">
          <h1 className="font-display text-3xl text-[#131518]">Leads de Orçamento</h1>
          <p className="mt-2 text-sm text-[#2f353b]/80">
            Visualização de formulários recebidos via página de orçamento.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input
              placeholder="Buscar por nome, email, empresa ou cidade"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-w-72 flex-1 rounded-xl border border-[#1e2124]/20 px-3 py-2 text-sm"
            />
            <Button onClick={loadRows} variant="outline" className="rounded-full border-[#1e2124]/20 bg-white">
              Atualizar
            </Button>
            <Button onClick={exportCsv} className="rounded-full bg-[#bf5b2c] text-white hover:bg-[#a84f25]">
              Exportar CSV
            </Button>
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#1e2124]/10 bg-white">
          {loading ? <p className="p-5 text-sm text-[#2f353b]/80">Carregando...</p> : null}
          {errorMessage ? <p className="p-5 text-sm text-[#a63f26]">{errorMessage}</p> : null}
          {!loading && !errorMessage && filteredRows.length === 0 ? (
            <p className="p-5 text-sm text-[#2f353b]/80">Nenhum formulário encontrado.</p>
          ) : null}

          {!loading && filteredRows.length > 0 ? (
            <div className="overflow-auto">
              <table className="w-full min-w-[920px] text-sm">
                <thead className="bg-[#f1efe7] text-left text-[#1e2124]">
                  <tr>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3">Empresa</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">WhatsApp</th>
                    <th className="px-4 py-3">Cidade</th>
                    <th className="px-4 py-3">Origem</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={`${row.email}-${row.created_at}`} className="border-t border-[#1e2124]/10">
                      <td className="px-4 py-3">{row.created_at ? new Date(row.created_at).toLocaleString('pt-BR') : '-'}</td>
                      <td className="px-4 py-3">{row.nome}</td>
                      <td className="px-4 py-3">{row.empresa}</td>
                      <td className="px-4 py-3">{row.email}</td>
                      <td className="px-4 py-3">{row.whatsapp}</td>
                      <td className="px-4 py-3">{row.cidade}</td>
                      <td className="px-4 py-3">{row.origem_pagina ?? '-'}</td>
                      <td className="px-4 py-3">{row.status ?? 'novo'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default AdminFormularios;
