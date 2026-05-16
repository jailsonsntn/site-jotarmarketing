export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogSubsection = {
  subtitle: string;
  paragraphs: string[];
};

export type BlogSection = {
  heading: string;
  intro?: string;
  subsections?: BlogSubsection[];
  bullets?: string[];
};

export type BlogPostContent = {
  slug: string;
  title: string;
  excerpt: string;
  seoFocus: string[];
  hook: string;
  intro: string;
  sections: BlogSection[];
  faq: BlogFaqItem[];
  ctaText: string;
};

export const BLOG_POSTS: BlogPostContent[] = [
  {
    slug: 'site-profissional-essencial-empresas-2026',
    title: 'Por que ter um site profissional é essencial para empresas em 2026?',
    excerpt:
      'Entenda por que a presença digital deixou de ser opcional e como um site profissional se tornou o ativo mais importante para gerar credibilidade e vendas.',
    seoFocus: ['importância de ter site', 'site profissional 2026', 'presença digital para empresas'],
    hook: 'Se sua empresa não aparece no Google, ela perde espaço todos os dias.',
    intro:
      'Em 2026, o consumidor pesquisa antes de comprar. Mesmo quando a indicação vem de um amigo, a decisão final costuma passar por uma busca no Google. Por isso, ter um site profissional não é apenas ter um cartão de visita online: é garantir que sua empresa seja encontrada, entendida e escolhida.',
    sections: [
      {
        heading: 'Mudança no comportamento do cliente',
        intro:
          'A jornada de compra ficou mais digital e mais rápida. Em cidades como Praia Grande, Santos e São Vicente, o cliente compara opções no celular e decide em minutos.',
        bullets: [
          'A primeira busca normalmente acontece no Google.',
          'A avaliação da empresa acontece antes do primeiro contato.',
          'Quem comunica melhor online ganha vantagem na concorrência local.',
        ],
      },
      {
        heading: 'Google como principal canal de descoberta',
        subsections: [
          {
            subtitle: 'Aparecer nas pesquisas locais',
            paragraphs: [
              'Quando alguém procura por serviço na região, o Google prioriza empresas com presença digital clara. Um site bem estruturado aumenta as chances de aparecer com destaque.',
            ],
          },
          {
            subtitle: 'Autoridade para converter',
            paragraphs: [
              'Um site com páginas bem organizadas, prova social e CTA objetivo transmite segurança e reduz a dúvida do cliente.',
            ],
          },
        ],
      },
      {
        heading: 'Redes sociais não são suficientes',
        intro:
          'Instagram e WhatsApp ajudam, mas não substituem um site profissional.',
        bullets: [
          'Rede social é canal alugado: as regras podem mudar a qualquer momento.',
          'Conteúdos se perdem no feed e dificultam a navegação.',
          'Sem site, a empresa depende demais de um único canal para vender.',
        ],
      },
      {
        heading: 'Site como vendedor 24 horas',
        intro:
          'Com SEO técnico, velocidade e comunicação clara, o site trabalha enquanto você atende clientes e toca a operação.',
        bullets: [
          'Capta contatos fora do horário comercial.',
          'Responde objeções com FAQ e páginas de serviço.',
          'Leva o cliente para o próximo passo com CTA estratégico.',
        ],
      },
    ],
    faq: [
      {
        question: 'Ter apenas Instagram resolve para pequenas empresas?',
        answer:
          'Não. O Instagram ajuda na descoberta, mas o site organiza informações, fortalece autoridade e melhora o ranqueamento no Google.',
      },
      {
        question: 'Site profissional ajuda a vender mesmo sem anúncio pago?',
        answer:
          'Sim. Com SEO local e conteúdo estratégico, o site atrai buscas orgânicas e gera contato qualificado continuamente.',
      },
    ],
    ctaText: 'Solicitar análise gratuita do meu site',
  },
  {
    slug: 'google-2026-empresas-locais-mais-clientes',
    title: 'Google em 2026: como empresas locais estão conseguindo mais clientes',
    excerpt:
      'Veja como Perfil da Empresa no Google, SEO local e integração com o site estão gerando mais contatos para negócios em cidades da Baixada Santista.',
    seoFocus: ['aparecer no Google', 'Google Meu Negócio', 'SEO local 2026', 'empresa no Google Maps'],
    hook: 'Seu concorrente pode estar recebendo clientes apenas por aparecer primeiro no Google.',
    intro:
      'Negócios locais que aparecem bem no Google recebem mais ligações, mais mensagens e mais visitas. A combinação de Perfil da Empresa, site otimizado e estratégia de SEO local virou um diferencial decisivo em 2026.',
    sections: [
      {
        heading: 'Importância do Perfil da Empresa no Google',
        intro:
          'O antigo Google Meu Negócio segue sendo um dos ativos mais fortes para empresas locais.',
        bullets: [
          'Mostra telefone, horário, localização e avaliação em destaque.',
          'Aumenta a confiança de quem está pesquisando na região.',
          'Gera contato rápido para empresas de Praia Grande, Santos e Guarujá.',
        ],
      },
      {
        heading: 'Integração entre site e Google Maps',
        subsections: [
          {
            subtitle: 'Coerência de informações (NAP)',
            paragraphs: [
              'Nome, endereço e telefone devem ser iguais no site e no perfil do Google. Essa consistência reforça sinais de confiança para o algoritmo.',
            ],
          },
          {
            subtitle: 'Páginas locais para cada cidade',
            paragraphs: [
              'Criar páginas por cidade, com conteúdo real da região, melhora a relevância para buscas do tipo "serviço + cidade".',
            ],
          },
        ],
      },
      {
        heading: 'Como os clientes encontram empresas hoje',
        intro:
          'A jornada mais comum passa por busca local no celular, análise de reputação e comparação rápida de opções.',
        bullets: [
          'Busca por região (ex.: "site profissional em Praia Grande").',
          'Leitura de avaliações e validação de credibilidade.',
          'Clique no WhatsApp ou formulário para contato imediato.',
        ],
      },
    ],
    faq: [
      {
        question: 'Aparecer no Google Maps depende só do perfil?',
        answer:
          'Não. O perfil ajuda muito, mas a integração com um site otimizado aumenta relevância e melhora resultados de longo prazo.',
      },
      {
        question: 'SEO local funciona para empresas de serviço?',
        answer:
          'Sim. Empresas de serviço se beneficiam fortemente de buscas por bairro, cidade e região quando possuem estrutura local bem feita.',
      },
    ],
    ctaText: 'Quero aparecer melhor no Google da minha cidade',
  },
  {
    slug: '5-erros-empresas-perdem-clientes-internet-2026',
    title: '5 erros que fazem empresas perderem clientes na internet em 2026',
    excerpt:
      'Conheça os erros mais comuns de presença digital que afastam clientes e aprenda como corrigir cada ponto de forma prática.',
    seoFocus: ['erros em sites', 'empresas sem site', 'marketing digital para empresas', 'presença digital ruim'],
    hook: 'Muitas empresas boas continuam invisíveis na internet por erros simples.',
    intro:
      'Nem sempre o problema é o serviço prestado. Em muitos casos, a empresa perde clientes por falhas de presença digital que poderiam ser resolvidas rapidamente com estratégia e execução técnica.',
    sections: [
      {
        heading: 'Erro 1: não ter site',
        intro:
          'Sem site, a empresa depende de canais externos e perde controle da jornada de compra.',
      },
      {
        heading: 'Erro 2: site lento',
        intro:
          'Se a página demora, o usuário sai. Em mobile, cada segundo pesa na conversão.',
      },
      {
        heading: 'Erro 3: não funcionar no celular',
        intro:
          'A maior parte das buscas locais acontece no smartphone. Site ruim no mobile significa perda direta de oportunidades.',
      },
      {
        heading: 'Erro 4: não aparecer no Google',
        intro:
          'Sem SEO técnico e sem página local, a empresa fica invisível para quem já está procurando exatamente aquele serviço.',
      },
      {
        heading: 'Erro 5: depender só do Instagram',
        intro:
          'Rede social é importante, mas não pode ser o único pilar. O ideal é integrar Instagram, Google e site.',
      },
      {
        heading: 'Como corrigir na prática',
        bullets: [
          'Criar ou atualizar site com estrutura profissional.',
          'Melhorar velocidade e experiência mobile.',
          'Aplicar SEO local em páginas e metadados.',
          'Usar CTA claro para WhatsApp e formulário.',
        ],
      },
    ],
    faq: [
      {
        question: 'Qual erro mais prejudica empresas locais?',
        answer:
          'A combinação de não aparecer no Google com site ruim no celular costuma ser a mais crítica para perda de clientes.',
      },
      {
        question: 'Dá para melhorar sem refazer tudo?',
        answer:
          'Sim. Muitas vezes, ajustes de performance, SEO e CTA já aumentam significativamente a geração de contatos.',
      },
    ],
    ctaText: 'Quero corrigir os erros do meu site',
  },
  {
    slug: 'site-profissional-fortalece-marca-e-confianca',
    title: 'Como um site profissional fortalece a marca e aumenta a confiança dos clientes',
    excerpt:
      'Descubra como primeira impressão digital, prova de autoridade e integração com canais de contato elevam a confiança antes da compra.',
    seoFocus: ['autoridade digital', 'fortalecimento de marca', 'site para empresas', 'confiança online'],
    hook: 'Antes de entrar em contato, o cliente já pesquisou sua empresa no Google.',
    intro:
      'A marca começa na percepção. E hoje essa percepção nasce no ambiente digital. Quando o cliente encontra um site profissional, ele entende que existe estrutura, seriedade e compromisso com resultado.',
    sections: [
      {
        heading: 'Primeira impressão digital',
        intro:
          'Design, clareza e navegação influenciam diretamente a confiança. Em segundos, o cliente decide se continua ou sai da página.',
      },
      {
        heading: 'Profissionalismo e credibilidade',
        subsections: [
          {
            subtitle: 'Mensagem clara de posicionamento',
            paragraphs: [
              'Um bom site explica o que a empresa faz, para quem faz e por que é diferente. Isso reduz dúvidas e acelera a decisão.',
            ],
          },
          {
            subtitle: 'Prova social e autoridade',
            paragraphs: [
              'Depoimentos, casos e portfólio ajudam a mostrar consistência e experiência real.',
            ],
          },
        ],
      },
      {
        heading: 'Integração com WhatsApp e Google',
        intro:
          'Quando o cliente confia, ele quer um caminho fácil para contato. Integrar site com WhatsApp e presença no Google aumenta conversão.',
        bullets: [
          'CTA objetivo para iniciar conversa.',
          'Dados da empresa visíveis em todas as páginas.',
          'Páginas locais para cidades-chave, como Praia Grande e Santos.',
        ],
      },
      {
        heading: 'Como clientes analisam empresas antes de comprar',
        bullets: [
          'Pesquisam no Google e conferem reputação.',
          'Comparam apresentação e clareza das ofertas.',
          'Escolhem quem transmite mais segurança e profissionalismo.',
        ],
      },
    ],
    faq: [
      {
        question: 'Site realmente influencia confiança na marca?',
        answer:
          'Sim. A qualidade da presença digital influencia diretamente a percepção de autoridade e profissionalismo.',
      },
      {
        question: 'Qual o papel do WhatsApp no processo?',
        answer:
          'Ele funciona como canal de conversão imediata. Com CTA claro no site, o cliente avança mais rápido para o contato.',
      },
    ],
    ctaText: 'Fortalecer minha marca com um site profissional',
  },
];

export const BLOG_POSTS_BY_SLUG = Object.fromEntries(BLOG_POSTS.map((post) => [post.slug, post]));
